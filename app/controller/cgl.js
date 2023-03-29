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
    return this.ctx.service.cgl;
  }

  /**
   * @swagger
   * /cgl/v1/workstation/getWorkInfo:
   *   post:
   *     summary: cgl猎头公司职位
   *     tags:
   *       - CglController
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: an authorization header
   *         required: true
   *         type: string
   *       - in: body
   *         name: getWorkInfo
   *         required: true
   *         schema:
   *           type: object
   *           description: 查询职位详情参数
   *           properties:
   *             workNum:
   *               type: number
   *               description: 查询的职位数量(不传数量，默认所有)
   *             workPlatform:
   *               type: string
   *               description: 查询的平台
   *             workCompanyName:
   *               type: string
   *               description: 查询的平台公司（北森和moka有这个，其他的可以传可以不传）
   *     responses:
   *       200:
   *         description: ok
   *         schema:
   *           $ref: '#/definitions/ResultMemberRegisterVO'
   */
  async getWorkInfo() {
    const param = this.ctx.request.body;
    const res = await this.cglService.getWorkInfo(param);
    this.setRes(res); 
  }

  /**
   * @swagger
   * /cgl/v1/workstation/getAllCompany:
   *   post:
   *     summary: cgl猎头公司类型
   *     tags:
   *       - CglController
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: an authorization header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: ok
   *         schema:
   *           $ref: '#/definitions/ResultMemberRegisterVO'
   */
  async getAllCompany() {
    const param = this.ctx.request.body;
    const res = await this.cglService.getAllCompany(param);
    this.setRes(res); 
  }
}

module.exports = CglController;
