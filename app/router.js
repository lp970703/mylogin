'use strict';

/**
 * 登录的首页地址：http://127.0.0.1:7001/authorize?response_type=code&client_id=clientadmin&state=xyz&redirect_uri=http://127.0.0.1:7001/&username=lopez&password=Lupeng0703&scope=write
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 该路径为重定向url的路径，当获取验证码后，根据redirect_uri重定向到这里，然后该方法实现的是获取token
  router.get('/', controller.home.index);

  // OAuth 服务的前端登录页面（第一步）
  router.get('/authorize', controller.user.authorize);
  
  // ouath2中password登录
  // 获取授权码
  // authorize 是用来获取授权码的路由
  // 生命周期：getClient --> getUser --> saveAuthorizationCode（第二步）
  app.all('/api/user/authorize', app.oAuth2Server.authorize());
  
  // 通过authorization_code（授权码）获取 accessToken，也可以通过refresh_token（刷新的token）获取accessToken，根据grant_type来判断
  // token 是用来发放访问令牌的路由
  // 生命周期：getClient --> getAuthorizationCode --> saveToken --> revokeAuthorizationCode（第三步）
  app.all('/api/user/token', app.oAuth2Server.token());

  // 通过 accessToken 获取用户信息
  // authenticate 是登录之后可以访问的路由
  // 生命周期：getAccessToken
  router.post('/api/user/authenticate', app.oAuth2Server.authenticate(), ctx => {
    ctx.body = ctx.state.oauth;
  });
  
  // 关于CGL猎头公司的职位接口
  // router.get('/cgl/workstation/getWorkInfo', app.oAuth2Server.authenticate(), controller.cgl.getWorkInfo());
  // login
  router.get('/member/v1/login', controller.member.login);
  router.post('/member/v1/registerUser', controller.member.registerUser);
  router.post('/member/v1/selectUserByColname', controller.member.selectUserByColname); // 使用sequelize方式来进行查询

  // autojsAPI
  router.post('/cyclone/v1/createAppLicense', controller.appLicense.createAppLicense);
  router.post('/cyclone/v1/get/remainUseTime', controller.appLicense.getRemainUseTime);
  router.post('/cyclone/v1/update/TotalUseTime', controller.appLicense.updateTotalUseTime);

  // sendEmail
  router.post('/cyclone/v1/sendEmailByText', controller.sendEmail.sendEmailByText);

  // // 前端
  // router.get('/', app.controller.home.server);
  // router.get('/client', app.controller.home.client);
};
