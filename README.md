# mylogin

login

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
$ open swagger http://localhost:7001/swagger-ui/index.html
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.
- Use `npm run dev_db `将连接好的数据库，反向生成model，可以在js代码块中利用这些model去增删改查
- 跑之前，请先将node_modules和package-lock.json删除后，在进行npm install下载依赖 


[egg]: https://eggjs.org