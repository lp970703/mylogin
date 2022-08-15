'use strict';

// const _ = require('lodash');
const BaseController = require('./base.js');

class HomeController extends BaseController {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
