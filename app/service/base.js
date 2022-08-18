/* eslint-disable valid-jsdoc */
'use strict';

const Service = require('egg').Service;

class BaseService extends Service {
  constructor(...args) {
    super(...args);
    this.AppConfig = this.ctx.app.config.appConfig;
    this.Helper = this.ctx.helper;
    this.Enums = this.ctx.app.config.enums;
  }

  _base_buildRes(data, message = '成功', status = 200) {
    return {
      status,
      data,
      message,
    };
  }

  _base_buildIsSuccessRes(isSuccess, message = '成功', status = 200) {
    if (isSuccess || isSuccess >= 1) {
      const result = this._base_buildRes(isSuccess);
      return result;
    }
    const result = this._base_buildRes(isSuccess, message, status);
    return result;
  }

  setResData(res, dataKey = 'data') {
    if (res && res.status === 200) {
      return res[dataKey];
    }
    throw new this.ctx.app.error.biz(res);
  }

  /**
   * 处理事务
   * @param {*} conn 连接字符串，必须
   * @param {*} funcBusiness 正常的业务处理，必须
   */
  async _base_Transcation(conn, funcBusiness) {
    let result = null;
    if (conn === null) {
      throw new Error('conn连接为null,无法发起事务处理');
    }
    try {
      if (funcBusiness !== null) {
        result = await funcBusiness(conn);
      } else {
        result = true;
      }
      await conn.commit(); // 提交事务
    } catch (err) {
      // error, rollback
      await conn.rollback(); // 一定记得捕获异常后回滚事务！！
      throw err;
    }
    return result;
  }

  async getNanoid(size) {
    let urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
    let id = ''
    // A compact alternative for `for (var i = 0; i < step; i++)`.
    let i = size
    while (i--) {
      // `| 0` is more compact and faster than `Math.floor()`.
      id += urlAlphabet[(Math.random() * 64) | 0]
    }
    return id
  }

}

module.exports = BaseService;
