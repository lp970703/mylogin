'use strict';

const Controller = require('egg').Controller;
// const _ = require('lodash');

class BaseController extends Controller {
  constructor(...args) {
    super(...args);

    this.Helper = this.ctx.helper;
    this.AppConfig = this.ctx.app.config.appConfig;
  }

  initLog() {
    // this.ctx.clogger = this.ctx.logger; //getLogger(`${loggerName}Logger`);
  }

  setRes(data, message, status = 200) {
    this.ctx.body = {
      status,
      data,
      message,
    };
  }

  get apolloConfig() {
    return this.ctx.util.apollo;
  }

  get channel() {
    return this.ctx.util.channel;
  }

}

module.exports = BaseController;
