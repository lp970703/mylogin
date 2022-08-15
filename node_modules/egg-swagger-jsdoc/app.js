'use strict';
const path = require('path');
const SWAGGER_UI_DIR = Symbol.for('egg-swagger-jsdoc#swaggger-ui-dir');

module.exports = app => {
  app.config.coreMiddleware.push('swagger');
  app[SWAGGER_UI_DIR] = path.join(__dirname, 'public');
};
