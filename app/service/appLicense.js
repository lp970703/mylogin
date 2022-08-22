'use strict';

const BaseService = require('./base.js');
const crypto = require('crypto');
const CycMobileLicenseDAO = require('../dao/table/user/cyc_mobile_license');
const { v4: uuidv4 } = require('uuid');
// const _ = require('lodash');
// const WXBizDataCrypt = require('../extend/WXBizDataCrypt');
// const moment = require('moment');
class AppLicenseService extends BaseService {
  constructor(...args) {
    super(...args);
    this.AppConfig = this.ctx.app.config.appConfig;

    this.apiGet = this.ctx.helper.ApiGet;

    this.CacheConfig = this.ctx.app.config.CacheConfig;

  }

  get CycMobileLicenseDAO() {
    return this.ctx.dao.table.user.cycMobileLicense;
  }

  get MyLoginDAO() {
    return this.ctx.dao.table.user.mylogin;
  }


  /**
   * 注册应用license
   * @param {object} createAppLicenseInfo 创建的信息
   * @param {string} createAppLicenseInfo.appName app名字
   * @param {string} createAppLicenseInfo.allowUseTime 允许次数
   * @param {string} createAppLicenseInfo.createName 创建者
   * @return
   */
  async createAppLicense(createAppLicenseInfo) {
    // 1.查询创建者是否为注册的人，如果不是抛异常提示请先注册管理员身份
    const selectName = {
      username: createAppLicenseInfo.createName,
    }
    let newAppId = '';
    const createNameInfo = await this.MyLoginDAO.selectUserByUsername(selectName);
    this.ctx.logger.info('createNameInfo => createNameInfo: %j', createNameInfo);
    if (Array.isArray(createNameInfo) && createNameInfo.length > 0) {
      // 2.查询之前有没有相同的应用名称，有的自动注册一个uuid作为appid
      const selectByAppName = await this.CycMobileLicenseDAO.selectByAppName({
        appName: createAppLicenseInfo.appName,
      });
      if (Array.isArray(selectByAppName) && selectByAppName.length > 0) {
        newAppId = selectByAppName[0].appId;
      } else {
        const AppIduuid = uuidv4().split('-').join("");
        this.ctx.logger.info('uuid => uuid: %j', AppIduuid);
        newAppId = AppIduuid;
      }
      // 3.注册新的appLicense
      const appLicense = await this.getNanoid(8);
      const createAppLicense = {
        appId: newAppId,
        appName: createAppLicenseInfo.appName,
        appLicense: appLicense,
        allowUseTime: createAppLicenseInfo.allowUseTime,
        totalUseTime: 0,
        createName: createAppLicenseInfo.createName,
        createTime: new Date(),
      }
      this.ctx.logger.info('createAppLicense => createAppLicense: %j', createAppLicense);
      await this.CycMobileLicenseDAO.createAppLicense(createAppLicense);
      return {appLicense: appLicense, appId: newAppId}
    }
    return '身份验证失败';
  }
  
  /**
   * 获得通过applicense获取剩余次数
   * @param {object} body 查询参数
   * @param {string} body.appName 应用名称
   * @param {string} body.appLicense 应用的license
   */
  async getRemainUseTime(body) {
    const res = await this.CycMobileLicenseDAO.selectByAppLicense(body)
    return res[0];
  }

  /**
   * 增加对应appLicense总运行次数
   * @param {object} body 查询参数
   * @param {string} body.appName 应用名称
   * @param {string} body.appLicense 应用的license
   */
  async updateTotalUseTime(body) {
    const AppLicenseRes = await this.CycMobileLicenseDAO.selectByAppLicense(body)
    if (Array.isArray(AppLicenseRes) && AppLicenseRes.length > 0) {
      let totalUseTime = AppLicenseRes[0].totalUseTime + 1;
      let id = AppLicenseRes[0].id
      await this.CycMobileLicenseDAO.updateTotalUseTimeByLicense({ totalUseTime, id });
    }
  }
}

module.exports = AppLicenseService;
