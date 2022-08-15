# egg-swagger-jsdoc

[![NPM version][npm-image]][npm-url]
[![Node.js CI][github-workflow-image]][github-workflow]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-swagger-jsdoc.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-swagger-jsdoc
[github-workflow-image]: https://github.com/archer-n/egg-swagger-jsdoc/actions/workflows/nodejs.yml/badge.svg
[github-workflow]: https://github.com/archer-n/egg-swagger-jsdoc/actions
[codecov-image]: https://img.shields.io/codecov/c/github/archer-n/egg-swagger-jsdoc.svg?style=flat-square
[codecov-url]: https://codecov.io/github/archer-n/egg-swagger-jsdoc?branch=main
[david-image]: https://img.shields.io/david/archer-n/egg-swagger-jsdoc.svg?style=flat-square
[david-url]: https://david-dm.org/archer-n/egg-swagger-jsdoc
[snyk-image]: https://snyk.io/test/npm/egg-swagger-jsdoc/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-swagger-jsdoc
[download-image]: https://img.shields.io/npm/dm/egg-swagger-jsdoc.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-swagger-jsdoc

<!--
Description here.
-->

## 依赖说明

### 依赖的 egg 版本

egg-swagger-jsdoc 版本 | egg 1.x
--- | ---
1.x | 😁
0.x | ❌

### 依赖的插件
- static
<!--

如果有依赖其它插件，请在这里特别说明。如

- security
- multipart

-->

## 开启插件

```js
// config/plugin.js
exports.swagger = {
  enable: true,
  package: 'egg-swagger-jsdoc',
};
```

## 使用场景

- Why and What: 描述为什么会有这个插件，它主要在完成一件什么事情。
尽可能描述详细。
- How: 描述这个插件是怎样使用的，具体的示例代码，甚至提供一个完整的示例，并给出链接。

## 详细配置

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

## 单元测试

<!-- 描述如何在单元测试中使用此插件，例如 schedule 如何触发。无则省略。-->

## 提问交流

请到 [egg issues](https://github.com/eggjs/egg/issues) 异步交流。

## License

[MIT](LICENSE)
