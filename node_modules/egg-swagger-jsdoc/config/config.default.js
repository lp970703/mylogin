'use strict';

const path = require('path');

/**
 * egg-swagger-jsdoc default config
 * @member Config#swagger
 * @property {String} SOME_KEY - some description
 */
exports.swagger = {
};

exports.static = {
  // maxAge: 31536000,
  dir: [{ prefix: '/swagger-ui', dir: path.join(__dirname, '../app/public') }],
};
