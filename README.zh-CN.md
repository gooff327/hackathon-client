

<h1 align="center">
  <a href="https://www.gooff.tech">
    <img alt="" src="./src/assets/images/logo.svg" width="64" align="center" />Monkey Bar
  </a>
</h1>
<h3 align="center">
  一个使用GraphQL + React搭建的技术交流平台
</h3>
<p align="center">
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/npm/types/typescript.svg" alt="typescript" />
  </a>
   <a href="https://github.com/gooff327/monkey-bar/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/gooff327/monkey-bar" alt="Licence" />
  </a>
</p>

## 目录

- [背景](#背景)
- [特点](#特点)
- [安装](#安装)
- [徽章](#徽章)
- [示例](#示例)
- [相关仓库](#相关仓库)
- [维护者](#维护者)
- [如何贡献](#如何贡献)
- [使用许可](#使用许可)

## 背景

起初我们是为了参加黑客马拉松而建立这个项目，目的是搭建一个公司内部的程序员社区，后来赛事结束，由于我迫切的需要一个博客站点来记录我的《编译原理》读书笔记，所以我继续在此基础上转型开发，目标是成为一个可自由部署的内部技术分享平台

> 这个项目处于开发中阶段

## 特点

- [x] 登录/注册
- [ ] Oauth 登录
- [ ] 邮箱验证
- [x] 响应式布局
- [x]  使用Apollo client获取数据
- [x] 深色/浅色模式支持
- [x] 对文章点赞
- [x] 对文章评论文字内容
- [x] 对评论进行回复
- [x] 用户信息更改
- [ ] 创建话题
- [ ] 关注话题
- [ ] 关注用户
- [ ] Markdown编辑器支持
- [ ]  Markdown解析
- [ ] 评论支持包含图片内容
- [ ] 用户间私信
- [ ] 消息/评论/点赞通知
- [ ] 偏好设置

## 安装

1. 这个项目使用 [node](http://nodejs.org) 和 [yarn](https://yarnpkg.com/)。请确保你本地安装了它们

2. 通过使用 [git](https://git-scm.com/) 和 [yarn](https://yarnpkg.com/)来克隆项目并安装依赖.

   ```
   git clone https://github.com/gooff327/monkey-bar.git && cd monkey-bar && yarn
   ```

3. 输入以下命令来构建或启动项目

   ```bash
   # start this project in develop environment
   yarn start
   
   # build this project
   yarn build
   ```

4. 就快完成了,去看一下服务端的教程吧！ [Monkey-bar-server](https://github.com/gooff327/hackathon-mock)

## 示例

[Monkey-bar](https://gooff.tech)

## 相关仓库

- [monkey-bar-server](https://github.com/gooff327/hackathon-mock) -  Monkey bar server project power by Apollo server and mongodb
- [Apollo-client](https://github.com/apollographql/apollo-client) - 🚀 A fully-featured, production ready caching GraphQL client for every UI framework and GraphQL server
- [Apollo-server](https://github.com/apollographql/apollo-server) - 🌍 GraphQL server for Express, Connect, Hapi, Koa and more

## 维护者

[@Gooff327](https://github.com/gooff327)。

## 如何贡献

非常欢迎你的加入！[提一个 Issue](https://github.com/RichardLitt/standard-readme/issues/new) 或者提交一个 Pull Request。


Monkey-bar 遵循 [Contributor Covenant](http://contributor-covenant.org/version/1/3/0/) 行为规范。


## 使用许可

[MIT](LICENSE) © Gooff327
