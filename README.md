# mylogin


## 功能实现
1、基于egg + sequlize 实现mysql的CRUD 分支：feature/lopez_sequlize  
2、使用egg + egg-mysql + nodemailer实现邮件发送、autojs相关授权码功能。分支：feature/lopez_cyclone  
3、基于egg + sequlize(mysql) + swagger2 + ouath2-server + egg-view-ejs实现授权码模式登录。分支：feature/lopez_ouath2_server  


## QuickStart

<!-- add docs here for user -->

egg官网快速开始：[egg 官网][egg]  
swagger相关：[swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc)   
sequlize相关：[sequlize官网](https://www.sequelize.cn/)  
nodemailer相关：[nodemailer](https://nodemailer.com/about/)  
ouath2相关：[ouath2基本概念](https://zhuanlan.zhihu.com/p/509212673?utm_id=0)  
oauth2-server相关：[oauth2-server](https://www.npmjs.com/package/node-oauth2-server)  
egg-oauth2-server相关：[egg-oauth2-server](https://github.com/Azard/egg-oauth2-server)  
<!-- 关于swagger和sequlize借鉴下面网址 -->
<!-- (https://www.jianshu.com/p/accbe04a7ffa) -->
<!-- 关于egg-oauth2-server相关借鉴一下网址
(https://www.jianshu.com/p/1fe043a700bf) -->

## Development

```bash
# 安装依赖
$ npm install
# 根据已建好的mysql数据库生成sequlize的orm，将连接好的数据库，反向生成model，可以在js代码块中利用这些model去增删改查
$ npm run dev_db
# 启动项目
$ npm run dev
# egg项目首页(未登录打开后没用)
$ open http://localhost:7001/
# egg项目授权地址（服务器内登录授权页）
$ open http://127.0.0.1:7001/authorize?response_type=code&client_id=""&state=""&redirect_uri=""&username=""&password=""&scope=""
# egg项目swagger地址
$ open swagger http://localhost:7001/swagger-ui/index.html

```

<!-- ### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.
- Use `npm run dev_db `将连接好的数据库，反向生成model，可以在js代码块中利用这些model去增删改查
- 跑之前，请先将node_modules和package-lock.json删除后，在进行npm install下载依赖  -->


[egg]: https://eggjs.org