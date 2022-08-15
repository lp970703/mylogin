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

## Install

```bash
$ npm i egg-swagger-jsdoc --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.swagger = {
  enable: true,
  package: 'egg-swagger-jsdoc',
};
```

```js
// {app_root}/config/config.default.js
const swaggerUIAbsolutePath = require('egg-swagger-jsdoc').absolutePath();
const path = require('path');

module.exports = appInfo => {

  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};


  // If the egg-static default configuration is not overridden,
  // the default swagger-ui path is /swagger-ui/index.html
  // exports.static = {
  //   dir: [{ prefix: '/swagger-ui', dir: path.join(__dirname, '../app/public') }],
  // }

  // Override the default configuration
  config.static = {
    dir: [
      { prefix: '/public2/', dir: path.join(appInfo.baseDir, 'app/public') },
      { prefix: '/swagger-ui/', dir: swaggerUIAbsolutePath },
    ],
  };
  return config;
};

```

## Configuration

```js
// {app_root}/config/config.default.js
exports.swagger = {
  swaggerDefinition: {
    swagger: '2.0',
    info: {
      // API informations (required)
      description: 'This is a sample server Petstore server.  You can find out more about     Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).      For this sample, you can use the api key `special-key` to test the authorization     filters.', // Description (optional)
      version: '1.0.0', // Version (required)
      title: 'Swagger Petstore', // Title (required)
      termsOfService: 'http://swagger.io/terms/',
      contact: {
        email: 'apiteam@swagger.io',
      },
      license: {
        name: 'Apache 2.0',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
      },
    },
    host: 'petstore.swagger.io',
    basePath: '/v2',
    securityDefinitions: {
      petstore_auth: {
        type: 'oauth2',
        authorizationUrl: 'http://petstore.swagger.io/oauth/dialog',
        flow: 'implicit',
        scopes: {
          'write:pets': 'modify pets in your account',
          'read:pets': 'read your pets',
        },
      },
      api_key: {
        type: 'apiKey',
        name: 'api_key',
        in: 'header',
      },
    },
  },
  apis: [
    './test/fixtures/apps/swagger-jsdoc-test/app/controller/**.js',
    './test/fixtures/apps/swagger-jsdoc-test/app/swagger/schemas/**.yaml',
  ],
};
```

see [config/config.default.js](config/config.default.js) for more detail.

see [https://github.com/Surnet/swagger-jsdoc](swagger-jsdoc) for more detail.

## Example

<!-- example here -->
see [test/swagger-jsdoc.test.js](test/swagger-jsdoc.test.js) for more detail.

see [test/fixtures/apps/swagger-jsdoc-test/app/controller/pet.js](test/fixtures/apps/swagger-jsdoc-test/app/controller/pet.js) for more detail.

see [test/fixtures/apps/swagger-jsdoc-test/app/swagger/schemas/pet.yaml](test/fixtures/apps/swagger-jsdoc-test/app/swagger/schemas/pet.yaml) for more detail.

## Questions & Suggestions

Please open an issue [here](https://github.com/archer-n/egg-swagger-jsdoc/issues).

## License

[MIT](LICENSE)
