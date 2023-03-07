/* eslint valid-jsdoc: "off" */

'use strict';


// const swaggerUIAbsolutePath = require('egg-swagger-jsdoc').absolutePath();

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1640224468566_8005';

  // mysql
  config.mysql = {
    clients: {
      localhostSQL: {
        // host
        host: '127.0.0.1',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: 'lupeng0703',
        // 数据库名
        database: 'myproject',
        // 最大等待队列限制
        queueLimit: 10,
      },
      // localhostSQL: {
      //   // host
      //   host: '60.205.221.118',
      //   // 端口号
      //   port: '3507',
      //   // 用户名
      //   user: 'root',
      //   // 密码
      //   password: 'lupeng0703',
      //   // 数据库名
      //   database: 'myproject',
      //   // 最大等待队列限制
      //   queueLimit: 10,
      // },
    },
    // // 所有数据库配置的默认值
    // default: {
    //   multipleStatements: true,
    //   typeCast(field, next) {
    //     if (field.type === 'TINY' && field.length === 1) {
    //       return field.string() === '1'; // 1 = true, 0 = false
    //     }
    //     return next();
    //   },
    // },

    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
  // 访问地址：http://localhost:7001/swagger-ui/index.html
  config.swagger = {
    swaggerDefinition: {
      info: {
        // API informations (required)
        title: '卢鹏(lopez_lu)的API', // Title (required)
        version: '1.0.0', // Version (required)
        description: '登录', // Description (optional)
        contact: {
          name: '卢鹏（Lopez Lu）',
          url: '',
          email: '1277838445@qq.com',
        },
      },
      // host: '10.86.9.78:7001',
      host: '55d750073u.yicp.fun',
      schemes: [ 'https' ],
      basePath: '/',
    },
    apis: [
      './app/controller/**.js',
      './app/swagger/schemas/**.yaml',
      './app/swagger/parameters/**.yaml',
    ],
  };

  // egg自带的sercurity密钥，这里我们会自己写header来防止xss攻击和cxrf攻击，详情请看
  // https://eggjs.org/zh-cn/core/security.html#安全威胁csrf的防范
  // https://blog.csdn.net/weixin_43704471/article/details/90763103
  config.security = {
    xframe: {
      enable: false,
    },
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ '*' ],
  };

  // 解决跨域问题
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // 关于日志的问题
  config.logrotator = {
    filesRotateBySize: [],
    filesRotateByHour: [],
    maxFileSize: 50 * 1024 * 1024,
    maxDays: 15,
  };

  config.logger = {
    disableConsoleAfterReady: false,
    outputJSON: false,
    consoleLevel: 'DEBUG',
    buffer: true,
    allowDebugAtProd: false,
  };

  // 修改prod的端口号目前这个项目的端口号暂时改为7002开始
  // config.cluster = {
  //   listen: {
  //     path: '',
  //     port: 7002,
  //     hostname: '127.0.0.1',
  //   },
  // };

  return {
    ...config,
  };
};
