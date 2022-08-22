'use strict';

// const _ = require('lodash');
const BaseController = require('./base.js');

/**
 * @swagger
 * tags:
 *   name: AppLicenseController
 *   description: 应用验证码接口
 */
class AppLicenseController extends BaseController {

  get AppLicenseService() {
    return this.ctx.service.appLicense;
  }
  /**
   * @swagger
   * /cyclone/v1/createAppLicense:
   *   post:
   *     summary: 管理员注册应用license接口
   *     tags:
   *       - AppLicenseController
   *     parameters:
   *       - in: body
   *         name: createAppLicense
   *         required: true
   *         schema:
   *           type: object
   *           description: 创建appLicense
   *           properties:
   *             appName:
   *               type: string
   *               description: 应用名字
   *             allowUseTime:
   *               type: string
   *               description: 允许次数
   *             createName:
   *               type: string
   *               description: 创建者姓名
   *     responses:
   *       200:
   *         description: ok
   *         schema:
   *           $ref: '#/definitions/ResultCreateAppLicenseVO'
   */
  async createAppLicense() {
    const { appName, allowUseTime, createName } = this.ctx.request.body;
    const res = await this.AppLicenseService.createAppLicense({ appName, allowUseTime, createName });
    this.setRes(res);
  }

  /**
   * @swagger
   * /cyclone/v1/get/remainUseTime:
   *   post:
   *     summary: 通过验证码和应用名称获取累计使用次数
   *     tags:
   *       - AppLicenseController
   *     parameters:
   *       - in: body
   *         name: getRemainUseTime
   *         required: true
   *         schema:
   *           type: object
   *           description: 获取累计次数
   *           properties:
   *             appName:
   *               type: string
   *               description: 应用名字
   *             appLicense:
   *               type: string
   *               description: 应用appLicense
   *     responses:
   *       200:
   *         description: ok
   *         schema:
   *           $ref: '#/definitions/ResultMemberLoginInfoVO'
   */
  async getRemainUseTime() {
    const { appName, appLicense } = this.ctx.request.body;
    const res = await this.AppLicenseService.getRemainUseTime({ appName, appLicense });
    this.setRes(res);
  }

  /**
   * @swagger
   * /cyclone/v1/update/TotalUseTime:
   *   post:
   *     summary: 使用次数加一
   *     tags:
   *       - AppLicenseController
   *     parameters:
   *       - in: body
   *         name: updateTotalUseTime
   *         required: true
   *         schema:
   *           type: object
   *           description: 获取累计次数
   *           properties:
   *             appName:
   *               type: string
   *               description: 应用名字
   *             appLicense:
   *               type: string
   *               description: 应用appLicense
   *     responses:
   *       200:
   *         description: ok
   *         schema:
   *           $ref: '#/definitions/ResultMemberLoginInfoVO'
   */
  async updateTotalUseTime() {
    const { appName, appLicense } = this.ctx.request.body;
    const res = await this.AppLicenseService.updateTotalUseTime({ appName, appLicense });
    this.setRes(res);
  }

}

module.exports = AppLicenseController;
