/* eslint-disable valid-jsdoc */
'use strict';

const BaseDBDAO = require('../../basedb');
class CycMobileLicenseDAO extends BaseDBDAO {
  constructor(...args) {
    super(...args);
    this.Helper = this.ctx.helper;
    // 必须配置_表名称
    this.BASECONST_TableName = 'cyc_mobile_license';
    // 必须配置_列名称
    this.BASECONST_ColumnName = [
      'id',
      'appId',
      'appName',
      'appLicense',
      'allowUseTime',
      'totalUseTime',
      'createName',
      'createTime',
    ];
  }

  /**
   * 创建AppLicense
   * @param {object} body 创建license条件
   * @param {string} body.appId 创建应用id
   * @param {string} body.appName 创建应用名字
   * @param {string} body.appLicense 创建应用applicense
   * @param {string} body.allowUseTime 创建应用使用次数
   * @param {string} body.totalUseTime 创建应用总计使用次数，默认为0
   * @param {string} body.createName 创建者
   * @param {string} body.createTime 创建时间
   */
  async createAppLicense(body) {
    await this._base_insert(body);
  }

  /**
   * 通过appLicense来查询验证码使用次数
   * @param {*} body 
   * @returns 
   */
  async selectByAppLicense(body) {
    const whereCondition = {
      where: {
        appLicense: body.appLicense,
      },
    };
    const res = await this._base_select(whereCondition);
    return res;
  }


  /**
   * 通过appName来查询验证码使用次数
   * @param {*} body 
   * @returns 
   */
  async selectByAppName(body) {
    const whereCondition = {
      where: {
        appName: body.appName,
      },
    };
    const res = await this._base_select(whereCondition);
    return res;
  }

  /**
   * 通过appName来查询验证码使用次数
   * @param {*} body 
   * @returns 
   */
  async updateTotalUseTimeByLicense(body) {
    const res = await this._base_update(body);
    return res;
  }

} 

module.exports = CycMobileLicenseDAO;