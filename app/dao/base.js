/* eslint-disable valid-jsdoc */
'use strict';

class BaseDAO {
  constructor(ctx) {
    this.ctx = ctx;
  }

  get tenantId() {
    return this.ctx.sessionHeaders.tenantId;
  }

  /**
   * 创建数据库连接【内部方法】
   * @param {string} clientName
   */
  async _createDataBase(clientName) {
    if (!clientName) {
      throw new Error('数据库连接不存在');
    }
    return this.ctx.app.mysql.get(clientName);
  }

  /**
   * 创建读取的Client实例
   * @param {string} clientName 创建实例名字
   */
  createReadDatabase(clientName = 'localhostSQL') {
    try {
      const coll = this.ctx.app.mysql.get(clientName); // 创建实例，因为mysql有两个db地址
      return coll;
    } catch (error) {
      console.log(error);
    }

  }

  /**
   * 创建写入的Client实例
   * @param {string} clientName 创建实例名字
   */
  createWriteDataBase(clientName = 'localhostSQL') {
    return this.createReadDatabase(clientName); // 创建写入实例即返回读取实例即可
  }
}

module.exports = BaseDAO;
