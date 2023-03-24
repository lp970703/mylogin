'use strict';

const authcode = require('../model/authcode.js');
// const _ = require('lodash');
const BaseController = require('./base.js');

class HomeController extends BaseController {
  get model() {
    return this.ctx.app.model;
  }

  async index() {
    const { ctx } = this;

    // 客户端实现
    // 访问 /user/token 端口获取 accessToken
    console.log(ctx.query);
    try {
      // 根据这个授权码code，去authcode表中查询出client信息（当通过这个授权码code换取完token之后，就删除了）
      const clientIdData = await this.model.Authcode.findOne({
        where: {
          code: ctx.query.code,
        }
      });
      if (!clientIdData) {
        throw new Error('client_id not found');
      }
      
      // 能跳转到这里的，说明client这张表里面肯定有数据，授权码登陆的方式验证都在服务端，所以也不用前端去发送client_secret密钥数据了，直接后端查一下，没有的话直接抛异常
      const clientSecretData = await this.model.Client.findOne({
        where: {
          clientId: clientIdData.clientId,
        }
      })
      if (!clientSecretData) {
        throw new Error('client_secret not found')
      }

      const result = await ctx.curl('http://127.0.0.1:7001/api/user/token', {
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        method: 'POST',
        timeout: 3000,
        data: {
          grant_type: 'authorization_code',
          code: ctx.query.code,
          client_id: clientIdData.clientId,
          client_secret: clientSecretData.clientSecret,
          redirect_uri: clientIdData.redirectUri,
        },
      });
      ctx.body = result.data;
    } catch (err) {
      this.logger.error(err);
    }
  }
}

module.exports = HomeController;
