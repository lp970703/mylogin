'use strict';

const BaseService = require('./base.js');
const crypto = require('crypto');
const MyLoginDAO = require('../dao/table/user/mylogin');
// const uuidv4 = require('uuid/v4');
// const _ = require('lodash');
// const WXBizDataCrypt = require('../extend/WXBizDataCrypt');
// const moment = require('moment');
class MemberService extends BaseService {
  constructor(...args) {
    super(...args);
    this.AppConfig = this.ctx.app.config.appConfig;

    this.apiGet = this.ctx.helper.ApiGet;

    this.CacheConfig = this.ctx.app.config.CacheConfig;

  }

  get MyLoginDAO() {
    return this.ctx.dao.table.user.mylogin;
  }

  get model() {
    return this.app.model;
  }

  /**
   * 通过用户的memberInfo
   * @param {object} memberInfo
   * @return
   */
  async checklogin(memberInfo) {
    this.ctx.logger.info('memberInfo => memberInfo: %j', memberInfo);
    // console.log(memberInfo);
    const res = await this.MyLoginDAO.selectUserByUsername(memberInfo);
    if (res[0].password && res[0].password === memberInfo.password) {
      return { status: true, memberId: res[0].memberId };
    }
    return { status: false, Info: '用户名密码失败' };
  }

  /**
   * 注册用户
   * @param {*} memberInfo 
   * @return  
   */
  async registerUser(memberInfo) {
    this.ctx.logger.info('memberInfo => memberInfo: %j', memberInfo);
    // console.log(memberInfo);
    const res = await this.MyLoginDAO.selectUserByUsername(memberInfo);
    // const res = await this.model.Mylogin.findAll();
    if (res.length === 0) { // 注册的时候只允许一个用户名唯一
      // 插入会员id、会员id根据数据库表中最后一个数据+1
      const lastone = await this.MyLoginDAO.selectLastOne('memberId');
      memberInfo.memberId = lastone ? lastone[0].memberId + 1 : 1000000000000;
      memberInfo.create_time = new Date();
      await this.MyLoginDAO.createUser(memberInfo);
      this.ctx.logger.info('res => res: %j', res);
      // console.log(res);
      return { status: true, Info: '该用户注册成功' };
    }
    return { status: false, Info: '该用户名已注册' };
  }

  /**
   * 查询用户
   * @param {*} param 查询参数
   * @param {Array} param.colname type指的是要查询的列名
   * @param {Array} param.res res指的是要查询的值（值要与列一一对应）
   * 
   */
  async selectUserByColname(param) {
    const where = param.colname.reduce((p,c) => {
      const index = param.colname.indexOf(c);
      p[c] = param.res[index];
      return p;
    }, {});
    const res = await this.model.Mylogin.findAll({where});
    return res[0];
  }

}

module.exports = MemberService;
