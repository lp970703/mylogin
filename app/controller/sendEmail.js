'use strict';

// const _ = require('lodash');
const BaseController = require('./base.js');

/**
 * @swagger
 * tags:
 *   name: SendEmailController
 *   description: 登录接口
 */
class SendEmailController extends BaseController {

  get sendEmailService() {
    return this.ctx.service.sendEmail;
  }
  /**
   * @swagger
   * /cyclone/v1/sendEmailByText:
   *   post:
   *     summary: 发送邮件（文本内容）
   *     tags:
   *       - SendEmailController
   *     parameters:
   *       - in: body
   *         name: emailInfo
   *         required: true
   *         schema:
   *           type: object
   *           description: 邮件信息
   *           properties:
   *             emailText:
   *               type: string
   *               description: 邮件文本
   *             emailTo:
   *               type: string
   *               description: 收件人（多个收件人请以英文逗号隔开）
   *             emailTitle:
   *               type: string
   *               description: 邮件主题
   *     responses:
   *       200:
   *         description: ok
   *         schema:
   *           $ref: '#/definitions/ResultSendEmailByTextVO'
   */
  async sendEmailByText() {
    const { emailText, emailTo, emailTitle } = this.ctx.request.body;
    const res = await this.sendEmailService.sendEmailByText({ emailText, emailTo, emailTitle });
    this.setRes(res);
  }

  /**
   * @swagger
   * /member/v1/login:
   *   get:
   *     summary: 用户登录接口
   *     tags:
   *       - MemberController
   *     parameters:
   *       - in: query
   *         name: username
   *         type: string
   *         description: 用户名
   *         required: true
   *       - in: query
   *         name: password
   *         type: string
   *         description: 密码
   *         required: true
   *     responses:
   *       200:
   *         description: ok
   *         schema:
   *           $ref: '#/definitions/ResultMemberLoginInfoVO'
   */
  async login() {
    const { username, password } = this.ctx.query;
    const res = await this.memberService.checklogin({ username, password });
    this.setRes(res);
  }

}

module.exports = SendEmailController;
