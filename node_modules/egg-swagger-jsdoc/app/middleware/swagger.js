'use strict';

const swaggerJSDoc = require('swagger-jsdoc');
const CACHE = Symbol.for('egg-swaager-jsdoc#middleware#swaager#apidocs.json');

function apiDocs(ctx, options) {
  if (!ctx.app[CACHE]) {
    ctx.app[CACHE] = swaggerJSDoc(options);
  }
  return ctx.app[CACHE];
}

module.exports = options => {
  return async function swaggerUI(ctx, next) {
    if (ctx.path === '/api-docs') {
      ctx.set('Content-Type', 'application/json');
      ctx.body = apiDocs(ctx, options);
      return;
    }
    await next();
  };
};
