'use strict';

// const _ = require('lodash');
const BaseController = require('./base.js');

/**
 * @swagger
 * tags:
 *   name: CglController
 *   description: cgl猎头职位相关接口
 */
class CglController extends BaseController {
  get cglService() {
    return this.ctx.service.cglService;
  }

  async getWorkInfo() {
    const res = {}
    this.setRes(res);
  }
}

module.exports = CglController;
