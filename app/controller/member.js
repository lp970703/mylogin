'use strict';

// const _ = require('lodash');
const BaseController = require('./base.js');

/**
 * @swagger
 * tags:
 *   name: MemberController
 *   description: 登录接口
 */
class MemberController extends BaseController {

  get memberService() {
    return this.ctx.service.member;
  }
  /**
   * @swagger
   * /member/v1/registerUser:
   *   post:
   *     summary: 用户注册接口
   *     tags:
   *       - MemberController
   *     parameters:
   *       - in: body
   *         name: loginInfo
   *         required: true
   *         schema:
   *           type: object
   *           description: 注册登录账号
   *           properties:
   *             username:
   *               type: string
   *               description: 用户名
   *             password:
   *               type: string
   *               description: 密码
   *             phoneNo:
   *               type: string
   *               description: 手机号
   *     responses:
   *       200:
   *         description: ok
   *         schema:
   *           $ref: '#/definitions/ResultMemberRegisterVO'
   */
  async registerUser() {
    const { username, password, phoneNo } = this.ctx.request.body;
    const res = await this.memberService.registerUser({ username, password, phoneNo });
    this.setRes(res);
  }

  /**
   * @swagger
   * /member/v1/selectUserByColname:
   *   post:
   *     summary: 查询用户通过列名和值
   *     tags:
   *       - MemberController
   *     parameters:
   *       - in: body
   *         name: selectUserByColname
   *         required: true
   *         schema:
   *           type: object
   *           description: 查询用户表参数
   *           properties:
   *             colname:
   *               type: array
   *               items: 
   *                 type: string 
   *               description: 要查的列名
   *             res:
   *               type: array
   *               items: 
   *                 type: string 
   *               description: 要查的列名对应的值
   *     responses:
   *       200:
   *         description: ok
   *         schema:
   *           $ref: '#/definitions/ResultMemberRegisterVO'
   */
  async selectUserByColname() {
    const param = this.ctx.request.body;
    const res = await this.memberService.selectUserByColname(param);
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

module.exports = MemberController;
