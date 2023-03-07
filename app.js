'use strict';
const path = require('path');

module.exports = app => {
  // 获取所有的 loadUnit
  // 从 app/dao 目录加载，加载时可做一些初始化处理
  const daoPaths = app.loader
    .getLoadUnits()
    .map(unit => path.join(unit.path, 'app/dao'));
  app.loader.loadToContext(daoPaths, 'dao', {
    call: true,
    fieldClass: 'daoClasses',
  });

  const utilPaths = path.join(app.config.baseDir, 'app/util');
  app.loader.loadToContext(utilPaths, 'util', {
    call: true,
    fieldClass: 'utilClasses',
  });

  const utilityPaths = path.join(app.config.baseDir, 'app/utility');
  app.loader.loadToContext(utilityPaths, 'utility', {
    call: true,
    fieldClass: 'utilityClasses',
  });

  const modelPaths = path.join(app.config.baseDir, 'app/model');
  app.loader.loadToContext(modelPaths, 'model', {
    call: true,
    fieldClass: 'modelClasses',
  });

};
