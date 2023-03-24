'use strict';

// module.exports = () => {
//     const model = {};
//     model.getClient = (clientId, clientSecret, callback) => {};
//     model.grantTypeAllowed = (clientId, grantType, callback) => {};
//     model.getUser = (username, password, callback) => {};
//     model.saveAccessToken = (accessToken, clientId, expires, user, callback) => {};
//     model.getAccessToken = (bearerToken, callback) => {};
//     return model;
//   };
module.exports = () => {  
  class Model {
    constructor(ctx) {
      this.ctx = ctx;
    }

    get model() {
      return this.ctx.app.model;
    }

    // 获取token方式：getClient --> getUser --> saveToken
    /**
     * 
     * @param {*} clientId 要查询的客户id
     * @param {*} clientSecret 要查询的客户端密钥
     * @returns 
     */
    async getClient(clientId, clientSecret) {
      try {
        console.log('getClient() invoked...');
        // 1. 从数据库中查询客户端信息
        const client = await this.model.Client.findOne({
          where: {
            clientId,
          }
        });
        if (!client) return false;
    
        // 2. 校验客户端密钥
        if (clientSecret && (clientSecret !== client.clientSecret)) {
          return false;
        }
    
        // 3. 返回数据
        return {
          id: client.clientId,
          redirectUris: client.redirectUri.split(','),
          grants: client.grants.split(','),
        };
      } catch (error) {
        return false;
      }
    }
    /**
     * 实现用户认证
     * 授权码模式需要实现用户认证
     * user对象对oauth2-server完全透明，并且仅用作其他模型函数的输入
     * @param {*} username 用户名
     * @param {*} password 密码
     * @returns 
     */
    async getUser(username, password) {
      try {
        console.log('getUser() invoked...');
        // 1. 从数据库中查询用户信息
        const user = await this.model.User.findOne({
          where: {
            username,
          }
        });
        if (!user) return false;
    
        // 2. 校验用户密码
        if (user.password !== password) {
          return false;
        }
        // 3. 返回用户信息
        return {
          id: user.userId,
        };
      } catch (error) {
        return false;
      }
    }
    /**
     * 
     * 保存授权码信息
     * 
     * @param {*} code 要保存的授权信息
     * @param {*} client 要保存的客户端信息
     * @param {*} user 要保存的用户信息
     * @returns 
     */
    async saveAuthorizationCode(code, client, user) {
      try {
        const authCode = await this.model.Authcode.create({
          id: 0,
          code: code.authorizationCode,
          expiresAt: code.expiresAt,
          redirectUri: code.redirectUri,
          scope: code.scope || '',
          clientId: client.id,
          userId: user.id,
        });
        
        console.log(authCode);
        // 2. 返回数据
        return {
          authorizationCode: authCode.code,
          expiresAt: authCode.expiresAt,
          redirectUri: authCode.redirectUri,
          scope: authCode.scope,
          client: { id: authCode.clientId },
          user: { id: authCode.userId },
        };
      } catch (error) {
        return false
      }
    }

    /**
     * 获取授权码信息
     * 查询通过 saveAuthorizationCode() 方法存储过的授权码信息，并返回
     * @param {*} authorizationCode 要查询的授权码 id
     * @returns 
     */
    async getAuthorizationCode(authorizationCode) {
      try {
        console.log('getAuthorizationCode() invoked...');
        // 1. 从数据库中查询授权码信息
        const authCode = await this.model.Authcode.findOne({
          where: {
            code: authorizationCode,
          }
        });
        if (!authCode) return false;
    
        // 2. 从数据库中查询客户端信息、用户信息
        // const [ client, user ] = await Promise.all([
        //   this.ctx.model.Client.findOne({
        //     clientId: authCode.clientId,
        //   }),
        //   this.ctx.model.User.findOne({
        //     userId: authCode.userId,
        //   }),
        // ]);
    
        const user = await this.model.User.findOne({
          where: {
            userId: authCode.userId,
          }
        });
        if (!user) return false;
    
        // 3. 返回数据
        return {
          code: authCode.code,
          expiresAt: authCode.expiresAt,
          redirectUri: authCode.redirectUri,
          scope: authCode.scope,
          client: { id: authCode.clientId },
          user: { id: authCode.userId },
        };
      } catch (error) {
        return false;
      }
    }
    /**
     * 吊销授权码信息
     * @param {*} code 要吊销的授权码信息
     * @returns 
     */
    async revokeAuthorizationCode(code) {
      try {
        console.log('revokeAuthorizationCode() invoked...');
        // 从数据库中查询该授权码并删除
        return await this.model.Authcode.destroy({
          where: {
            code: code.code,
          }
        });
      } catch (error) {
        return false;
      }
    }
    /**
     * 保存 token 令牌，包括访问令牌和刷新令牌。
     * 
     * @param {*} token 要保存的 token 令牌
     * @param {*} client 要保存的客户端信息
     * @param {*} user 要保存的用户信息
     * @returns 
     */
    async saveToken(token, client, user) {
      try {
        console.log('saveToken() revoked...');
        // 1.保存访问令牌
        const accessToken = await this.model.Token.create({
          id: 0,
          token: token.accessToken, // 访问令牌保存
          expiresAt: token.accessTokenExpiresAt,
          scope: token.scope || '',
          clientId: client.id,
          userId: user.id,
        });
    
        // 2.保存刷新令牌
        const refreshToken = await this.model.Refreshtoken.create({
          id: 0,
          token: token.refreshToken,
          expiresAt: token.refreshTokenExpiresAt,
          scope: token.scope || '',
          clientId: client.id,
          userId: user.id,
        });
    
        // 3.返回保存的令牌信息
        return {
          accessToken: accessToken.token,
          accessTokenExpiresAt: accessToken.expiresAt,
          refreshToken: refreshToken.token,
          refreshTokenExpiresAt: refreshToken.expiresAt,
          scope: accessToken.scope,
          client: { id: accessToken.clientId },
          user: { id: accessToken.userId },
        };
      } catch (error) {
        return false;
      }
    }
    // 验证token方法
    /**
     * 当使用访问令牌时，需要查询数据库以验证令牌及有效期信息。
     * @param {*} accessToken 要查询的访问令牌
     * @returns 
     */
    async getAccessToken(accessToken) {
      try {
        console.log('getAccessToken() invoked...');
        // 1. 查询数据库，获取访问密钥信息
        const token = await this.model.Token.findOne({
          where: {
            token: accessToken,
          }
        });
        // 2. 查询数据库，获取客户端信息
        // const client = await this.ctx.model.Client.findOne({
        //   clientId: accessToken.client.clientId,
        // });
        // 3. 查询数据库，获取用户信息
        // const user = await this.ctx.model.User.findOne({
        //   userId: accessToken.user.userId,
        // });
    
        if (!token) return false;
    
        // 4. 返回数据
        return {
          accessToken: token.token,
          accessTokenExpiresAt: token.expiresAt,
          scope: token.scope,
          client: { id: token.clientId }, // with 'id' property
          user: { id: token.userId },
        };
      } catch (error) {
        return false;
      }
    }
    /**
     * revokeToken 方法的功能是吊销刷新令牌。刷新令牌也只能使用一次。因此，当访问令牌过期后，需要使用 refresh_token 刷新令牌来获取新的访问令牌。
     * 此时，该刷新令牌已经被使用过了，需要吊销。
     * 
     * @param {*} token 
     * @returns 
     */
    async revokeToken(token) {
      try {
        console.log('revokeToken() invoked...');
        // 查询数据库并删除刷新令牌
        return await this.model.Refreshtoken.destroy({
          where: {
            token: token.refreshToken,
          }
        });
      } catch (error) {
        return false;
      }
    }

    /**
     * 获取刷新令牌信息
     *
     * @param {*} refreshToken 要查询的刷新令牌 id
     * @return {*} object
     * @memberof Model
     */
    async getRefreshToken(refreshToken) {
      try {
        console.log('getRefreshToken() invoked...');
        // 1. 查询数据库获取刷新令牌
        const token = await this.model.Refreshtoken.findOne({
          where: {
            token: refreshToken,
          }
        });
        if (!token) return false;

        // 2. 返回数据
        return {
          refreshToken: token.token,
          refreshTokenExpiresAt: token.expiresAt,
          scope: token.scope,
          client: { id: token.clientId }, // with 'id' property
          user: { id: token.userId },
        };
      } catch (error) {
        return false;
      }
    }

    // // 列出有效的授权范围(可有可无)
    // async validateScope(user, client, scope) {
    //   const VALID_SCOPES = ['read', 'write'];
    //   if (!scope.split(' ').every(s => VALID_SCOPES.indexOf(s) >= 0)) {
    //     return false;
    //   }
    //   return scope;
    // }
  }  
  return Model;
};