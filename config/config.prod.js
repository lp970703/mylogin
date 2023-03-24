/* eslint valid-jsdoc: "off" */

'use strict';


// const swaggerUIAbsolutePath = require('egg-swagger-jsdoc').absolutePath();
const path = require('path')
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
      // localhostSQL: {
      //   // host
      //   host: '127.0.0.1',
      //   // 端口号
      //   port: '3306',
      //   // 用户名
      //   user: 'root',
      //   // 密码
      //   password: '123456',
      //   // 数据库名
      //   database: 'myproject',
      //   // 最大等待队列限制
      //   queueLimit: 10,
      // },
      localhostSQL: {
        // host
        host: '60.205.221.118',
        // 端口号
        port: '3507',
        // 用户名
        user: 'root',
        // 密码
        password: 'lupeng0703',
        // 数据库名
        database: 'myproject',
        // 最大等待队列限制
        queueLimit: 10,
      },
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
  config.swagger = {
    swaggerDefinition: {
      info: {
        // API informations (required)
        title: '万能登录api', // Title (required)
        version: '1.0.0', // Version (required)
        description: '登录', // Description (optional)
        contact: {
          name: '卢鹏（Lopez Lu）',
          url: '',
          email: '1277838445@qq.com',
        },
      },
      host: '60.205.221.118:7002', // 修改了7002这个也要修改,如果
      schemes: [ 'http', 'https' ],
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

  // 跨域
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // 日志保存期限和大小
  config.logrotator = {
    filesRotateBySize: [],
    filesRotateByHour: [],
    maxFileSize: 50 * 1024 * 1024,
    maxDays: 15,
  };

  // 日志隔离级别
  config.logger = {
    disableConsoleAfterReady: false,
    outputJSON: false,
    consoleLevel: 'DEBUG',
    buffer: true,
    allowDebugAtProd: false,
  };

  // 修改prod的端口号目前这个项目的端口号暂时改为7002开始
  config.cluster = {
    listen: {
      path: '',
      port: 7002,
      hostname: '127.0.0.1',
    },
  };

  config.sequelize = {
    dialect: 'mysql', // 数据库类型，支持 mysql，sqlite,mssql,pgsql,oracle。
    host: '127.0.0.1', // 数据库服务器地址。
    port: 3306, // 数据库连接端口号。
    database: 'myproject', // 数据库名称。
    username: "root", // 数据库登录用户名。
    password: "lupeng0703", // 数据库登录密码。   
    timezone: '+08:00', // 时区 东八区
    underscored: true,// 是否自动进行下划线转换（这里是因为DB默认的命名规则是下划线方式，而我们使用的大多数是驼峰方式）
    define: {
      freezeTableName: true, // Model 对应的表名将与model名相同。
      timestamps: false // 默认情况下，Sequelize会将createdAt和updatedAt的属性添加到模型中，以便您可以知道数据库条目何时进入数据库以及何时被更新。
    }
  };

  // oauth2
  config.oAuth2Server = {
    grants: [ 'password', 'client_credentials', 'authorization_code', 'refresh_token' ],
  };

  // // vue中在egg中的页面
  // config.static = {
  //   prefix: '/public/',
  //   dir: path.join(app.baseDir, 'public')
  // };

  // config.vuessr = {
  //   renderOptions: {
  //     basedir: path.join(app.baseDir, 'app/view')
  //   }
  // };

  config.view = {
    defaultViewEngine:'nunjucks',
    mapping: {'.html': 'ejs'}
 }

  return {
    ...config,
  };
};
