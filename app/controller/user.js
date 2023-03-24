// {app_root}/app/controller/user.js
'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 渲染登录页面
  async authorize() {
    const query = this.ctx.querystring;
    await this.ctx.render('login', {
      title: 'OAuth 账户登录',
      query,
    });
  }
}

module.exports = UserController;