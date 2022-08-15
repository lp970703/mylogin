'use strict';

// had enabled by egg
exports.static = true;

// exports.redis = {
//   enable: true,
//   package: 'egg-redis',
// };

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

// exports.jaeger = {
//   enable: true,
//   package: 'bs-egg-jaeger',
// };

// exports.bsEggRemoteServices = {
//   enable: true,
//   package: 'bs-egg-remote-services',
// };

exports.swagger = {
  enable: true,
  package: 'egg-swagger-jsdoc',
};

// 跨域问题
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
