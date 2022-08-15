/* eslint-disable valid-jsdoc */
'use strict';

const BaseDBDAO = require('../../basedb');
/**
 *  用户登录连接DAO层
 *
 * @class MyLoginDAO
 * @extends {BaseDBDAO}
 */
class MyLoginDAO extends BaseDBDAO {
  constructor(...args) {
    super(...args);
    this.Helper = this.ctx.helper;
    // 必须配置_表名称
    this.BASECONST_TableName = 'mylogin';
    // 必须配置_列名称
    this.BASECONST_ColumnName = [
      'id',
      'memberId',
      'username',
      'password',
      'create_time',
      'phoneNo',
    ];
  }

  /**
   * 创建用户
   * @param {object} body 创建用户的数据
   * @param {string} body.memberId 创建用户姓名
   * @param {string} body.username 创建用户姓名
   * @param {string} body.password 创建用户名密码
   * @param {string} body.PhoneNo 创建用户手机号
   * @param {string} body.create_time 创建时间
   */
  async createUser(body) {
    await this._base_insert(body);
  }

  /**
   * 通过memberId查询用户信息
   * @param {*} body 查询用户的数据
   * @param {string} body.memberId 查询用户
   */
  async selectUserByMemberId(body) {
    const whereCondition = {
      where: {
        memberId: body.memberId,
      },
    };
    const res = await this._base_select(whereCondition);
    return res;
  }

  /**
   * 通过PhoneNo查询用户信息
   * @param {*} body 查询用户的数据
   * @param {string} body.PhoneNo 查询用户
   */
  async selectUserByPhoneNo(body) {
    const whereCondition = {
      where: {
        phone_no: body.PhoneNo,
      },
    };
    const res = await this._base_select(whereCondition);
    return res;
  }

  /**
   * 通过Username查询用户信息
   * @param {*} body 查询用户的数据
   * @param {string} body.username 查询用户
   */
  async selectUserByUsername(body) {
    const whereCondition = {
      where: {
        username: body.username,
      },
    };
    const res = await this._base_select(whereCondition);
    return res;
  }

  /**
   * 通过Username查询用户信息
   * @param {*} lastParam 查询最后的参数
   */
  async selectLastOne(lastParam) {
    const whereCondition = {
      columns: [ `${lastParam}` ],
      orders: [[ `${lastParam}`, 'desc' ]],
      limit: 1,
    };
    const res = await this._base_select(whereCondition);
    return res;
  }

}
module.exports = MyLoginDAO;
