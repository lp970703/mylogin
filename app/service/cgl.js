'use strict';

const BaseService = require('./base.js');

class cglService extends BaseService {
  constructor(...args) {
    super(...args);
    this.AppConfig = this.ctx.app.config.appConfig;

    this.apiGet = this.ctx.helper.ApiGet;

    this.CacheConfig = this.ctx.app.config.CacheConfig;

  }

  get model() {
    return this.app.model;
  }

  /**
   * 工作详情列表
   * @param {*} workParam 
   * @returns 
   */
  async getWorkInfo(workParam) {
    let where = {
      platform: workParam.workPlatform,
    }
    if (workParam.workCompanyName) {
      where.company_name = workParam.workCompanyName
    }
    const res = await this.model.InfoCompanyJob.findAll({
      where: where,
      limit: workParam.workNum ? parseInt(workParam.workNum) : null,
      order: [['publish_time', 'DESC']]
    })
    return res;
  }

  /**
   * 遍历info_company_job中每一条数据，将他们按照平台->公司->职位的顺序用级联选择的方式带出来
   * @returns 
   * 
   * res = [{
   *  value: platform,  // 平台
   *  children: [{
   *    value: company_name,  // 公司
   *    children: [{
   *      value: job,         // 职位
   *      jobInfo: jobInfo    // 职位详情
   *    }]
   *  }]
   * }]
   */
  async getAllCompany() {
    const allCompanyData = await this.model.InfoCompanyJob.findAll();
    const res = allCompanyData.reduce((p, c) => {
      const jobData = {
        value: c.job,
        jobInfo: c,
      }
      const companyData = {
        value: c.company_name,
        children: [],
      }
      const platformData = {
        value: c.platform,
        children: [],
      }
      // 1、先对平台（platform）维度进行去重，
      if (p.some(platform => platform.value == c.platform)) {
        // 1.1 platformItem（object）表示跟c.platform一样平台的数据; platformItem.children(array)表示要遍历平台旗下的公司数据
        const platformItem = p.find(f => f.value == c.platform);
        // 2、对公司（company）维度进行去重
        if (platformItem && platformItem.children.some(company => company.value == c.company_name)) {
          const companyItem = platformItem.children.find(f => f.value == c.company_name);
          // 3、对职位（company）维度进行去重
          if (companyItem && companyItem.children.some(job => job.value == c.job)) {
          } else {
            companyItem.children.push(jobData);
          }
        } else {
          companyData.children.push(jobData);
          platformItem.children.push(companyData);
        }
      } else {
        companyData.children.push(jobData);
        platformData.children.push(companyData);
        p.push(platformData);
      }
      return p;
    }, [])
    return res;
  }

}

module.exports = cglService;
