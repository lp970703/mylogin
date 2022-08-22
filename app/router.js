'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // login
  router.get('/member/v1/login', controller.member.login);
  router.post('/member/v1/registerUser', controller.member.registerUser);

  // autojsAPI
  router.post('/cyclone/v1/createAppLicense', controller.appLicense.createAppLicense);
  router.post('/cyclone/v1/get/remainUseTime', controller.appLicense.getRemainUseTime);
  router.post('/cyclone/v1/update/TotalUseTime', controller.appLicense.updateTotalUseTime);

  // sendEmail
  router.post('/cyclone/v1/sendEmailByText', controller.sendEmail.sendEmailByText);
};
