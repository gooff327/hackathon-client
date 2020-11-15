

<h1 align="center">
  <a href="https://www.gooff.tech">
    <img alt="P" src="./src/assets/logo.svg" width="64" align="center" />Monkey Bar
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
- [安装](#安装)
- [特点](#特点)
- [徽章](#徽章)
- [示例](#示例)
- [相关仓库](#相关仓库)
- [维护者](#维护者)
- [如何贡献](#如何贡献)
- [使用许可](#使用许可)

## 背景

起初我们是为了参加黑客马拉松而建立这个项目，目的是搭建一个公司内部的程序员社区，后来赛事结束，由于我迫切的需要一个博客站点来记录我的《编译原理》读书笔记，所以我继续在此基础上转型开发，目标是成为一个可自由部署的内部技术分享平台

> 这个项目处于开发中阶段

—— [Ken Williams, Perl Hackers](http://mathforum.org/ken/perl_modules.html#document)

写 README 从某种程度上来说相当不易，一直维护下去更是难能可贵。如果可以减少这个过程，则可以让写代码与修改代码更容易，使得是否在说明中指明一处需改有无必要更加清楚，你可以花费更少的时间来考虑是否你最初的文档是否需要更新，你可以分配更多的时间来写代码而非维护文档。

同时，标准化在某些别的地方也有好处。有了标准化，用户就可以花费更少的时间来搜索他们需要的信息，他们同时可以做一个工具来从描述中搜集信息，自动跑示例代码，检查授权协议等等。

这个仓库的目标是：

1. 一个定义良好的**规范**。在仓库中的位置是 [spec.md](spec.md)。它是一个一直在持续优化的文档，欢迎您提 Issue 讨论其中的变化。
2. 一个**示例 README**。这个 Readme 完全遵从 Standard-readme，而且在 `example-readmes` 文件夹里有更多的示例。
3. 一个**语法提示器**用来提示在 Readme 中的语法错误。请参考 [tracking issue](https://github.com/RichardLitt/standard-readme/issues/5)。
4. 一个**生成器**用来快速搭建新的 README 的框架。请参考 [generator-standard-readme](https://github.com/RichardLitt/generator-standard-readme)。
5. 一个**标识准守规范的徽章**。请参考[徽章](#徽章)。

## 安装

这个项目使用 [node](http://nodejs.org) 和 [npm](https://npmjs.com)。请确保你本地安装了它们。

```sh
$ npm install --global standard-readme-spec
```

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