/* eslint-disable jsdoc/check-param-names */
/* eslint-disable valid-jsdoc */
'use strict';
const BaseDAO = require('./base');
class BaseDBDAO extends BaseDAO {
  // ////////////////---------基类公开方法，例如获取事物的conn------////////////////////////////

  /**
   * 获取事物的数据库连接信息
   */
  async pub_getTransactionConn() {
    const conn = await this.createWriteDataBase().beginTransaction();
    return conn;
  }

  async _getOperatorInfo() {
    return await this.ctx.service.common.oPermission.getUserInfo(
      this.ctx.sessionHeaders,
      this.ctx.sessionHeaders.userId
    );
  }

  // ////////////////---------基类方法，包含常用的增删改查，查询所有，分页查询------////////////////////////////

  // /**
  //  * 设置updateUid，updateUser，updateTime字段信息
  //  * @param {object} row
  //  */
  // _base_setUpdateColumnData(row, opUserInfo) {
  //   const currentUser = {
  //     uid: 0,
  //     userName: '系统',
  //   };

  //   if (opUserInfo) {
  //     currentUser.uid = opUserInfo.id;
  //     currentUser.userName = opUserInfo.name;
  //   }
  //   const nowDate = new Date().getTime();
  //   if (Array.isArray(row)) {
  //     for (const item of row) {
  //       if (item.hasOwnProperty('updateUid') === false) {
  //         item.updateUid = currentUser.uid;
  //         item.updateUser = currentUser.userName;
  //       }
  //       if (item.hasOwnProperty('updateTime') === false) {
  //         item.updateTime = nowDate;
  //       }
  //     }
  //   } else {
  //     if (row.hasOwnProperty('updateUid') === false) {
  //       row.updateUid = currentUser.uid;
  //       row.updateUser = currentUser.userName;
  //     }
  //     if (row.hasOwnProperty('updateTime') === false) {
  //       row.updateTime = nowDate;
  //     }
  //   }
  //   return row;
  // }

  // /**
  //  * 设置createUid，createUser，createTime，updateUid，updateUser，updateTime字段信息
  //  * @param {object} row
  //  */
  // _base_setAddColumnData(row, opUserInfo) {
  //   const currentUser = {
  //     uid: 0,
  //     userName: '系统',
  //   };
  //   if (opUserInfo) {
  //     currentUser.uid = opUserInfo.id;
  //     currentUser.userName = opUserInfo.name;
  //   }
  //   const nowDate = new Date().getTime();
  //   if (Array.isArray(row)) {
  //     for (const item of row) {
  //       if (item.hasOwnProperty('createUid') === false) {
  //         item.createUid = currentUser.uid;
  //         item.createUser = currentUser.userName;

  //         item.updateUid = currentUser.uid;
  //         item.updateUser = currentUser.userName;
  //       }
  //       if (item.hasOwnProperty('createTime') === false) {
  //         item.createTime = nowDate;
  //         item.updateTime = nowDate;
  //       }
  //     }
  //   } else {
  //     if (row.hasOwnProperty('createUid') === false) {
  //       row.createUid = currentUser.uid;
  //       row.createUser = currentUser.userName;

  //       row.updateUid = currentUser.uid;
  //       row.updateUser = currentUser.userName;
  //     }
  //     if (row.hasOwnProperty('createTime') === false) {
  //       row.createTime = nowDate;
  //       row.updateTime = nowDate;
  //     }
  //   }
  //   return row;
  // }

  // /**
  //  * 根据数据的ID更新数据，row中必须包含有id属性，默认无需对人员和日期类型进行处理，此方法内会自动增加此属性（如果已赋值[人员id和name必须都赋值]，则不再自动处理）
  //  * 返回值为true/false，true表示成功，false表示失败（无任何数据被更新）
  //  * @param {object} row
  //  */
  // async _base_updateById(row, conn = null) {
  //   if (conn === null) {
  //     conn = this.createWriteDataBase();
  //   }
  //   const userInfo = await this._getOperatorInfo();
  //   this._base_setUpdateColumnData(row, userInfo);
  //   const result = await conn.update(this.BASECONST_TableName, row);
  //   const updateSuccess = result.affectedRows === 1;
  //   return updateSuccess;
  // }

  // /**
  //  * 根据其他条件更新数据嘻嘻
  //  * @param {object} row
  //  * @param {object} options {where:{}}
  //  */
  // async _base_updateByWhere(row, options, conn = null) {
  //   const userInfo = await this._getOperatorInfo();
  //   this._base_setUpdateColumnData(row, userInfo);
  //   if (conn === null) {
  //     conn = this.createWriteDataBase();
  //   }
  //   const result = await conn.update(this.BASECONST_TableName, row, options);
  //   const updateSuccess = result.affectedRows === 1;
  //   return updateSuccess;
  // }

  // /**
  //  * 插入数据，返回插入后的ID值
  //  * @param {object} row
  //  */
  // async _base_addData(row, conn = null) {
  //   const userInfo = await this._getOperatorInfo();
  //   this._base_setAddColumnData(row, userInfo);
  //   if (conn === null) {
  //     conn = this.createWriteDataBase();
  //   }
  //   const result = await conn.insert(this.BASECONST_TableName, row);
  //   return result.insertId;
  // }

  // /**
  //  * 批量插入数据
  //  * @param {Array} rows
  //  * @param {object} conn
  //  */
  // async _base_addDataList(rows, conn = null) {
  //   const userInfo = await this._getOperatorInfo();
  //   this._base_setAddColumnData(rows, userInfo);
  //   if (conn === null) {
  //     conn = this.createWriteDataBase();
  //   }
  //   const result = await conn.insert(this.BASECONST_TableName, rows);
  //   return result.insertId;
  // }

  // /**
  //  * 批量更新数据（数据带Id）
  //  * @param {Array} rows
  //  * @param {object} conn
  //  */
  // async _base_updateDataListById(rows, conn = null) {
  //   this._base_updateDataListById(rows);
  //   if (conn === null) {
  //     conn = this.createWriteDataBase();
  //   }
  //   await conn.update(this.BASECONST_TableName, rows);
  //   return true;
  // }

  // -----------------------------1、使用sql语句来执行操作--------------------------
  /**
   * 执行SQL语句【用于修改】
   * @param {string} sql
   * @param {Array} params
   * @param {object} conn
   */
  async _base_queryForWrite(sql, params, conn = null) {
    if (conn == null) {
      conn = this.createWriteDataBase();
    }
    const result = await conn.query(sql, params);
    if (Array.isArray(result)) {
      return result.length;
    }
    return result.affectedRows;
  }

  /**
   * 执行SQL语句【用于查询】
   * @param {string} sql
   * @param {Array} params
   * @param {object} conn
   */
  async _base_queryForRead(sql, params, conn = null) {
    if (conn == null) {
      conn = this.createReadDatabase();
    }
    const result = await conn.query(sql, params);
    return result;
  }

  // -----------------------------2、使用egg内置方法执行CRUD--------------------------

  /**
   * 新增数据——C
   * @param {object} whereCondition 直接设置条件对象
   * @param {*} conn 连接数据库的实例
   *
   * eg: INSERT INTO `posts`(`title`) VALUES('Hello World');
   * 在post表中，插入title为Hello World的语句，其他字段为null
   */
  async _base_insert(whereCondition, conn = null) {
    if (conn == null) {
      conn = this.createWriteDataBase();
    }
    await conn.insert(this.BASECONST_TableName, whereCondition);
  }

  /**
   * 查询数据——R
   * @param {object} whereCondition 直接设置条件对象，为空值查询所有
   * @param {object} whereCondition.where where查询条件
   * @param {object} whereCondition.columns 要查询的表字段
   * @param {object} whereCondition.orders 排序方式
   * @param {object} whereCondition.limit 返回数据量
   * @param {object} whereCondition.offset 数据偏移量
   * @param {*} conn 连接数据库的实例
   *
   * eg: SELECT `author`, `title` FROM `posts` WHERE `status` = 'draft' AND `author` IN('author1','author2') ORDER BY `created_at` DESC, `id` DESC LIMIT 0, 10;
   * 查询`author`, `title`在`posts`表中，条件是where后面的
   *
   *  { // 搜索 post 表
   *   where: { status: 'draft', author: ['author1', 'author2'] }, // WHERE 条件
   *   columns: ['author', 'title'], // 要查询的表字段
   *   orders: [['created_at','desc'], ['id','desc']], // 排序方式
   *   limit: 10, // 返回数据量
   *   offset: 0, // 数据偏移量
   *  }
   *
   * sql:SELECT `author`, `title` FROM `posts` WHERE `status` = 'draft' AND `author` IN('author1','author2') ORDER BY `created_at` DESC, `id` DESC LIMIT 0, 10;
   */
  async _base_select(whereCondition = null, conn = null) {
    if (conn == null) {
      conn = this.createReadDatabase();
    }
    if (whereCondition == null) {
      return await conn.select(this.BASECONST_TableName);
    }
    return await conn.select(this.BASECONST_TableName, whereCondition);
  }

  /**
   * 更新数据——U
   * @param {object} row 更新数据的地方
   * @param {object} whereCondition 更新数据的地方，一般是主键的地方，比如要更新id=3的地方{where:{id:3}}
   * @param {*} conn 连接数据库的实例
   *
   * eg:
   * const row = {
   *   name: 'fengmk2',
   *   otherField: 'other field value',    // any other fields u want to update
   *   modifiedAt: this.app.mysql.literals.now, // `now()` on db server
   * };
   *
   * const options = {
   *   where: {
   *     custom_id: 456
   *   }
   * };
   * const result = await this.app.mysql.update('posts', row, options); // 更新 posts 表中的记录
   *
   * sql:UPDATE `posts` SET `name` = 'fengmk2', `modifiedAt` = NOW() WHERE custom_id = 456 ;
   */
  async _base_update(row, whereCondition = null, conn = null) {
    if (conn == null) {
      conn = this.createWriteDataBase();
    }
    if (whereCondition == null) {
      await conn.update(this.BASECONST_TableName, row);
    } else {
      await conn.update(this.BASECONST_TableName, row, whereCondition);
    }
  }

  /**
   * 删除数据——D
   * @param {object} whereCondition 直接设置条件对象
   * @param {*} conn 连接数据库的实例
   */
  async _base_delete(whereCondition, conn = null) {
    if (conn == null) {
      conn = this.createWriteDataBase();
    }
    await conn.delete(this.BASECONST_TableName, whereCondition);
  }


  /**
   * 查询所有
   * @param {object} options 操作条件
   * @param {object} conn 数据库实例
   */
  async _base_queryAll(options, conn = null) {
    // 默认增加是否删除的判断
    if (!options) {
      options = {
        where: {
          isDel: 0,
        },
        columns: this.BASECONST_ColumnName,
      };
    }
    if (!options.where) {
      options.where = {
        isDel: 0,
      };
    } else {
      if (!options.where.hasOwnProperty('isDel')) {
        options.where.isDel = 0;
      }
    }
    if (!options.columns) {
      options.columns = this.BASECONST_ColumnName;
    }
    if (conn == null) {
      conn = this.createReadDatabase();
    }
    const resultData = await conn.select(this.BASECONST_TableName, options);
    return resultData;
  }

  // /**
  //  * 分页获取数据
  //  * @param {string} tableName
  //  * @param {object} where
  //  * @param {object} options
  //  * @param {object} sqlClient
  //  */
  // async _getDataForPageList(
  //   tableName,
  //   where,
  //   options,
  //   sqlClient = null,
  //   isHasLike = false
  // ) {
  //   if (sqlClient == null) {
  //     sqlClient = this.createReadDatabase();
  //   }
  //   where = '';
  //   if (isHasLike) {
  //     where = this._whereFormate(where, sqlClient);
  //   } else {
  //     where = sqlClient._where(where);
  //   }
  //   const sqlCount = sqlClient.format('SELECT COUNT(*) as count FROM ?? ??', [
  //     tableName,
  //     where,
  //   ]);
  //   const sqlPageSelect =
  //     sqlClient._selectColumns(tableName, options.columns) +
  //     where +
  //     sqlClient._orders(options.orders) +
  //     sqlClient._limit(options.limit, options.offset);
  //   const sqlResult = sqlClient.format('?? ; ??', [ sqlCount, sqlPageSelect ]);
  //   const result = await sqlClient.query(sqlResult);
  //   return {
  //     count: result[0],
  //     data: result[1],
  //   };
  // }

  // _whereFormate(where, sqlClient) {
  //   if (!where) {
  //     return '';
  //   }

  //   const wheres = [];
  //   const values = [];
  //   for (const key in where) {
  //     const value = where[key];
  //     if (Array.isArray(value)) {
  //       wheres.push('?? IN (?)');
  //       values.push(key);
  //       values.push(value);
  //     } else if (value instanceof Object) {
  //       wheres.push('?? ?? ?');
  //       values.push(key);
  //       values.push(value.operator);
  //       values.push(value.value);
  //     } else {
  //       wheres.push('?? = ?');
  //       values.push(key);
  //       values.push(value);
  //     }
  //   }
  //   if (wheres.length > 0) {
  //     return sqlClient.format(' WHERE ' + wheres.join(' AND '), values);
  //   }
  //   return '';
  // }
}

module.exports = BaseDBDAO;
