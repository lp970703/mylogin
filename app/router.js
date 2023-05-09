'use strict';

/**
 * 登录的首页地址：http://127.0.0.1:7001/authorize?response_type=code&client_id=clientadmin&state=xyz&redirect_uri=http://127.0.0.1:7001/&username=lopez&password=Lupeng0703&scope=write
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 重定向到swagger-ui.html
  app.router.redirect('/', '/swagger-ui/index.html', 302);
  // 该路径为重定向url的路径，当获取验证码后，根据redirect_uri重定向到这里，然后该方法实现的是获取token
  router.get('/ouath2', controller.home.index);

  // OAuth 服务的前端登录页面（第一步）
  router.get('/authorize', controller.user.authorize);
  
  // 通过authorization_code（授权码）获取 accessToken，也可以通过refresh_token（刷新的token）获取accessToken，根据grant_type来判断
  // 获取授权码
  // authorize 是用来获取授权码的路由
  // 生命周期：getClient --> getUser --> saveAuthorizationCode（第二步）
  router.all('/api/user/authorize', app.oAuth2Server.authorize());
  
  // ouath2中password登录获取token，也可以通过授权码获取token(这里通过body里面的grant_type来判断是哪种登录方式：password——密码登录，authorization_code——授权码登录，refresh_token——刷新token登录)
  // token 是用来发放访问令牌的路由
  // 生命周期：getClient --> getAuthorizationCode --> saveToken --> revokeAuthorizationCode（第三步）
  router.all('/api/user/token', app.oAuth2Server.token());

  // 通过 accessToken 获取用户信息
  // authenticate 是登录之后可以访问的路由
  // 生命周期：getAccessToken
  router.post('/api/user/authenticate', app.oAuth2Server.authenticate(), ctx => {
    ctx.body = ctx.state.oauth;
  });
  
  // 关于CGL猎头公司的职位接口
  router.post('/cgl/v1/workstation/getWorkInfo', app.oAuth2Server.authenticate(), controller.cgl.getWorkInfo);
  router.post('/cgl/v1/workstation/getAllCompany', app.oAuth2Server.authenticate(), controller.cgl.getAllCompany);

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
