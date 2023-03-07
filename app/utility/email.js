/* eslint-disable valid-jsdoc */
'use strict';

/**
 *  email工具类
 *
 * @class emailUntil
 * 
 */
class EmailUntil {

  constructor(ctx) {
    this.ctx = ctx;
  }


  async msgHtml(template, msgData) {
    const msg = {
        mailAll: '',
        mailTitle: `<!DOCTYPE html>
        <html>
            <head>
            <meta charset="utf-8" >
            <title>Nodejs创建html页面</title>
            </head>
            <body  style="font-family: 'Microsoft JhengHei';">
            `,
        mailContents: getmsgHTML(template, msgData),
        mailBottle: ` <br>
           ========================================================= </br>
          &nbsp;&nbsp;此消息由lopez邮箱发送，如果您有任何问题，可以直接回复此电子邮件。</body>
         </html>`,
      };
      if (msg.mailContents) {
        msg.mailAll = msg.mailTitle + msg.mailContents + msg.mailBottle;
      }
      return msg.mailAll;
  }

}
module.exports = EmailUntil;

function getmsgHTML(template, msgData) {
  switch (template) {
    case 'text':
      const msgBody = `
      亲爱的伙伴 :</font><br />&nbsp;&nbsp;${msgData}<br />
      如有疑问，请联系lopez<br />
      `;
      return msgBody;
    default:
      break;
  }
}