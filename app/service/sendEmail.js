'use strict';

const BaseService = require('./base.js');
const nodemailer = require("nodemailer");
class SendEmailService extends BaseService {
  constructor(...args) {
    super(...args);
    this.AppConfig = this.ctx.app.config.appConfig;

    this.apiGet = this.ctx.helper.ApiGet;

    this.CacheConfig = this.ctx.app.config.CacheConfig;

  }

  get EmailUntil() {
    return this.ctx.utility.email;
  }

  /**
   * 发送邮件
   * @param {object} emailBody 发送邮件对象
   * @param {string} emailBody.emailText 发送邮件文本
   * @param {string} emailBody.emailTo 收件人邮箱
   * @param {string} emailBody.emailTitle 邮件主题
   * @return
   */
  async sendEmailByText(emailBody) {
    const msgHtml = await this.EmailUntil.msgHtml('text', emailBody.emailText);
    this.ctx.logger.info('msgHtml => msgHtml: %j', msgHtml);
    const smtpTransport = nodemailer.createTransport({
        host: 'smtp.qq.com',
        secureConnection: true, // use SSL
        port: 465,
        secure: true, // secure:true for port 465, secure:false for port 587
        auth: {
            user: '1277838445@qq.com',
            pass: 'mffbnyzuylxsghgc' // QQ邮箱需要使用授权码
        }
    });
    smtpTransport.sendMail({
      from: 'Lopez-test Message' + ' ' + '<1277838445@qq.com>', // from    : '标题别名 <foobar@latelee.org>',
      to: emailBody.emailTo, // 'li@latelee.org, latelee@163.com',//收件人邮箱，多个邮箱地址间用英文逗号隔开
      subject: `Lopez-text Message(${emailBody.emailTitle})`, // 邮件主题
      html: msgHtml,
    }, function(err, res) {
      if (err) {
        console.log('error: ', err);
      }
    });
  }

}

module.exports = SendEmailService;
