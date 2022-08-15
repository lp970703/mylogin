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

};
