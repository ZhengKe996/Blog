---
title: 前端知识广度面试题
date: 2022-05-06
draft: true
lang: zh
duration: 25min
---

# 移动端 H5 click 有 300ms 延迟, 如何解决

**答:**

- 背景: double tap to zoom
- FastClick
- width=device-width

### 初期解决方案 FastClick

```js
window.addEventLister("load", function () {
  FastClick.attach(document.body);
});
```

##### FastClick 原理

- 监听 touchend 事件(touchstart touchend 会先于 click 触发)
- 使用 自定义 DOM 事件 模拟一个 clock 事件
- 把默认的 click 事件(300ms 之后触发)禁止掉

### 现代浏览器的改进

```html
<meta name="viewport" content="width=device-width,...." />
```

# 网络请求中 token 和 cookie 有什么区别?

**答:**

- cookie HTTP 标准, 跨域限制, 配合 session 使用
- token 无标准, 无跨域限制, 用于 JWT

### cookie

- http 无状态, 每次请求都需要携带 cookie 以便识别用户身法
- 服务端也可以向客户端 set-cookie, cookie 大小限制 4kb
- 默认有跨域限制: 不跨域共享 不跨域传递

### cookie 本地存储

- HTML5 之前 cookie 常用于本地存储
- HTML5 之后 推荐使用 localStorage 和 sessionStorage

### 现代浏览器开始禁止第三方 cookie

- 和跨域限制不同, 禁止网页引入的第三方 JavaScript 设置 cookie
- 打击第三方广告, 保护用户隐私
- 新增属性 SameSite:Strict / Lax / None

### cookie 和 session

- cookie 用于登录验证, 存储用户标识数据
- session 在服务端, 存储用户详细信息, 和 cookie 信息对应
- cookie + session 是常见的登录验证解决方案

### token vs cookie

- cookie 是 HTTP 规范, token 是自定义传递
- cookie 会被浏览器默认存储, token 需要自己存
- token 默认没有跨域限制

### JWT (JSON Web Token)

- 前端发起登录, 后端验证成功后, 返回一个加密的 token
- 前端自行存储这个 token(加密后的用户信息)
- 以后访问服务端接口, 都带着这个 token 作为用户信息

# Session 和 JWT 哪个更好?

**答:**

- 如有严格管理用户信息的需求(保密、快速封禁) 推荐 Session
- 如没有特殊要求, 则使用 JWT

### Session 优点

- 原理简单, 易于学习
- 用户信息存储在服务端, 可快速封禁某个用户

### Session 缺点

- 占用服务端内存, 硬件成本高
- 多进程多服务器时, 不好同步 需要使用第三方缓存 如:Redis
- 默认有跨域限制

### JWT 的优点

- 不占用服务端内存
- 多进程, 多服务器 不受影响
- 没有跨域限制

### JWT 的缺点

- 用户信息存储在客户端, 无法快速封禁某用户
- 服务端秘钥被泄露, 则用户信息全部丢失
- token 体积一般大于 cookie, 会增加请求的数据量

# 如何实现 SSO 单点登录

### 基于 Cookie

- cookie 默认不可跨域共享, 但有些情况下可以设置为共享
- 主域名相同
- 设置 cookie domain 为主域名, 即可共享 cookie

### SSO

- 主域名完全不同, 则 cookie 无法共享
- 可以使用 SSO 技术方案

### OAuth2.0

- 第三方验证登录等
