---
title: 前端知识广度面试题
date: 2022-05-06
draft: true
lang: zh
duration: 25min
---

## 移动端 H5 click 有 300ms 延迟, 如何解决

**答:**

- 背景: double tap to zoom
- FastClick
- width=device-width

#### 初期解决方案 FastClick

```js
window.addEventLister("load", function () {
  FastClick.attach(document.body);
});
```

##### FastClick 原理

- 监听 touchend 事件(touchstart touchend 会先于 click 触发)
- 使用 自定义 DOM 事件 模拟一个 clock 事件
- 把默认的 click 事件(300ms 之后触发)禁止掉

#### 现代浏览器的改进

```html
<meta name="viewport" content="width=device-width,...." />
```

## 网络请求中 token 和 cookie 有什么区别?

**答:**

- cookie HTTP 标准, 跨域限制, 配合 session 使用
- token 无标准, 无跨域限制, 用于 JWT

#### cookie

- http 无状态, 每次请求都需要携带 cookie 以便识别用户身法
- 服务端也可以向客户端 set-cookie, cookie 大小限制 4kb
- 默认有跨域限制: 不跨域共享 不跨域传递

#### cookie 本地存储

- HTML5 之前 cookie 常用于本地存储
- HTML5 之后 推荐使用 localStorage 和 sessionStorage

#### 现代浏览器开始禁止第三方 cookie

- 和跨域限制不同, 禁止网页引入的第三方 JavaScript 设置 cookie
- 打击第三方广告, 保护用户隐私
- 新增属性 SameSite:Strict / Lax / None

#### cookie 和 session

- cookie 用于登录验证, 存储用户标识数据
- session 在服务端, 存储用户详细信息, 和 cookie 信息对应
- cookie + session 是常见的登录验证解决方案

#### token vs cookie

- cookie 是 HTTP 规范, token 是自定义传递
- cookie 会被浏览器默认存储, token 需要自己存
- token 默认没有跨域限制

#### JWT (JSON Web Token)

- 前端发起登录, 后端验证成功后, 返回一个加密的 token
- 前端自行存储这个 token(加密后的用户信息)
- 以后访问服务端接口, 都带着这个 token 作为用户信息

## Session 和 JWT 哪个更好?

**答:**

- 如有严格管理用户信息的需求(保密、快速封禁) 推荐 Session
- 如没有特殊要求, 则使用 JWT

#### Session 优点

- 原理简单, 易于学习
- 用户信息存储在服务端, 可快速封禁某个用户

#### Session 缺点

- 占用服务端内存, 硬件成本高
- 多进程多服务器时, 不好同步 需要使用第三方缓存 如:Redis
- 默认有跨域限制

#### JWT 的优点

- 不占用服务端内存
- 多进程, 多服务器 不受影响
- 没有跨域限制

#### JWT 的缺点

- 用户信息存储在客户端, 无法快速封禁某用户
- 服务端秘钥被泄露, 则用户信息全部丢失
- token 体积一般大于 cookie, 会增加请求的数据量

## 如何实现 SSO 单点登录

#### 基于 Cookie

- cookie 默认不可跨域共享, 但有些情况下可以设置为共享
- 主域名相同
- 设置 cookie domain 为主域名, 即可共享 cookie

#### SSO

- 主域名完全不同, 则 cookie 无法共享
- 可以使用 SSO 技术方案

#### OAuth2.0

- 第三方验证登录等

## HTTP 协议和 UDP 协议有什么区别

1. HTTP 是应用层，TCP UDP 是传输层
2. TCP 有连接，有断开，稳定传输
3. UDP 无连接，无断开，不稳定传输，但是效率高

![网络七层模型](/public/images/web-interview/4-1.png)

#### TCP 协议

- 有连接（三次握手）
- 有断开（四次挥手）
- 稳定传输

#### UDP 协议

- 无连接，无断开
- 不稳定传输，但效率高
- 适用于：视频会议、语音通话

## HTTP 协议 1.0 1.1 2.0 有什么区别?

#### HTTP 1.0

- 最基础的 HTTP 协议
- 支持基本的 GET POST 方法

#### HTTP 1.1

- 缓存策略 cache-control E-tag 等
- 支持长连接 Connection：keep-alive 一次 TCP 连接多次请求
- 断点续传，状态码 206
- 支持新的方法 PUT DELETE 等，可用于 Restful API

#### HTTP2.0

- 可压缩 header，减少体积
- 多路复用，一次 TCP 连接中可以多个 HTTP 并行请求
- 服务端推送

## 什么是 HTTPS 中间人攻击?如何预防?

#### HTTPS 加密传输

- HTTP 明文传输
- HTTPS 加密传输 HTTP+TLS/SSL

![HTTPS](/public/images/web-interview/4-2.png)

#### 中间人攻击 - 黑客伪造证书

![中间人攻击](/public/images/web-interview/4-3.png)

#### 预防

使用正规厂商的证书，慎用免费的

#### `<script>` defer 和 async 有什么区别?

![defer与async](/public/images/web-interview/4-4.png)

1. 无: HTML 暂停解析，下载 JavaScript，执行 JavaScript，再继续解析 HTML
2. defer: HTML 继续解析，并行下载 JavaScript，HTML 解析完再执行 JavaScript
3. async:HTML 继续解析，并行下载 JavaScript，执行 JavaScript，再解析 HTML

## prefetch 和 dns-prefetch 有什么区别?

- prefetch 是资源预获取（和 preload 相关）
- dns-prefetch 是 DNS 预查询（和 preconnect 相关）

#### preload 和 prefetch

- preload 资源在当前页面使用，会优先加载
- prefetch 资源在未来页面使用，空闲时加载

![preload与prefetch](/public/images/web-interview/4-5.png)

#### dns-prefetch 和 preconnet

- dns-prefetch 即 DNS 预查询
- preconnet 即 DNS 预连接

![dns-prefetch与preconnet](/public/images/web-interview/4-6.png)

## 你知道哪些前端攻击? 该如何预防?

1. XSS
2. CSRF
3. 点击劫持
4. DDos
5. SQL 注入

#### XSS

- Cross Site Script 跨站脚本攻击
- 手段：黑客将 JavaScript 代码插入到网页内容中，渲染时执行 JavaScript 代码
- 预防：特殊字符替换（前端或者后端）

```js
const newStr = str.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
```

Vue React 默认屏蔽 XSS 攻击

#### CSRF

- Cross Site Request Forgery 跨站请求伪造
- 手段：黑客诱导用户去访问另一个网站的接口，伪造请求
- 预防：严格的跨域限制 + 验证码机制

##### CSRF 详细过程

1. 用户登录了 A 网站，有了 cookie
2. 黑客诱导用户到 B 网站，并发起 A 网站的请求
3. A 网站的 API 发现有 cookie，认为是用户自己操作的

##### CSRF 预防手段

1. 严格的跨域请求限制，如判断 referrer（请求来源）
2. 为 cookie 设置 SameSite，禁止跨域传递 cookie
3. 关键接口使用短信验证码

#### 点击劫持

- Click Jacking
- 手段：诱导界面上蒙一个透明的 iframe，诱导用户点击
- 预防：让 iframe 不能跨域加载

![点击劫持](/public/images/web-interview/4-7.png)

##### 点击劫持 预防手段

![点击劫持预防](/public/images/web-interview/4-8.png)

#### DDos

- Distribute denial-of-service 分布式拒绝服务
- 手段：分布式的、大规模的流量服务，使服务器瘫痪
- 预防：软件层不好做，需硬件预防（如阿里云 WAF）

#### SQL 注入

- 手段：黑客提交内容时写入 SQL 语句，破坏数据库
- 预防：处理输入的内容，替换特殊字符

## WebSocket 和 HTTP 有什么区别?

#### WebSocket

1. 支持端对端通讯
2. 可以由 client 发起，也可以由 server 发起
3. 用于：消息通知，直播间讨论区，聊天室，协调编辑

##### WebSocket 连接过程

1. 先发起一个 HTTP 请求
2. 成功之后再升级到 WebSocket 协议，再通讯

#### WebSocket 和 HTTP 区别

1. WebSocket 协议名是 ws:// ,可双端发起请求
2. WebSocket 没有跨域限制
3. 通过 send 和 onmessage 通讯(HTTP 通过 req 和 res)

#### WS 可以升级为 wss(像 https)

![点击劫持预防](/public/images/web-interview/4-9.png)

#### 实际项目推荐 socket.io API 更简洁

![点击劫持预防](/public/images/web-interview/4-10.png)

## WebSocket 和 HTTP 长轮询的区别?

#### 区别

- HTTP 长轮询：客户端发起请求，服务端阻塞，不会立即返回
- WebSocket：客户端可以发起请求，服务端也可以发起请求

![点击劫持预防](/public/images/web-interview/4-11.png)

#### 注意

- HTTP 长轮询，需处理 timeout，即 timeout 之后重新发起请求

## 描述从输入 url 到页面展示的完整过程

1. 网络请求：DNS 解析，HTTP 请求
2. 解析：DOM 树，CSSOM 树，Render Tree
3. 渲染：计算、绘制、同时执行 JavaScript

#### 步骤

1. 网络请求
2. 解析
3. 渲染

#### 网络请求

- DNS 查询(得到 IP)，建立 TCP 连接（三次握手）
- 浏览器发起 HTTP 请求
- 收到请求响应，得到 HTML 源代码

#### 继续请求静态资源

- 解析 HTML 的过程中，遇到静态资源还会继续发起网络请求
- JavaScript CSS 图片 视频等
- 注意：静态资源可能有强缓存，此时不必请求

#### 解析：字符串 -> 结构化数据

1. HTML 构建 DOM 树
2. CSS 构建 CSSOM 树(style tree)
3. 两者结合，形成 render tree

![结构化数据](/public/images/web-interview/4-12.png)

#### 解析过程很复杂

1. CSS 可能来自 `<style>` `<link>`
2. JavaScript 可能内嵌或外链，还有 defer async 逻辑
3. img 可能内嵌(base64)，可能外链

#### 优化解析

1. CSS 放在`<head>`，不要异步加载 CSS
2. JavaScript `<body>` 最下面（或合理使用 defer async）
3. `<img>` 提前定义 width height

#### 渲染：Render Tree 绘制到页面

1. 计算各个 DOM 的尺寸、定位，最后绘制到页面
2. 遇到 JavaScript 可能会执行（参考 defer async)
3. 异步 CSS、图片加载，可能会触发重新渲染

## 重绘 repaint 重排 reflow 有什么区别?

重排比重绘要影响更大，消耗也更大

#### 动态网页，随时都会重绘、重排

1. 网页动画
2. Modal Dialog 弹窗
3. 增加/删除一个元素，显示/隐藏一个元素

#### 重绘 repaint

- 元素外观改变，如颜色、背景色
- 但元素的尺寸、定位不变，不会影响到其他元素的位置

#### 重排 reflow

- 重新计算尺寸和布局，可能会影响其他元素的位置
- 如果元素高度增加，可能会使相邻元素位置下移动

#### 减少重排的方法

1. 集中修改样式，或直接切换 css class
2. 修改之前先设置 display：none 脱离文档流
3. 使用 BFC 特性，不影响其他元素位置
4. 频繁触发（resize scroll）使用节流和防抖
5. 使用 createDocumentFragment 批量操作 DOM
6. 优化动画，使用 CSS3 和 requestAnimationFrame

## BFC

- Block Format Context 块级格式化上下文
- 内部的元素无论如何改动，都不会影响其他元素的位置

#### 触发 BFC 的条件

1. 根节点 `<html>`
2. `float:left/right;`
3. `overflow:auto/scroll/hidden;`
4. `display:inline-Block/table/table-row/table-cell`
5. `display:flex/grid;`的直接子元素
6. `position:absolute/fixed;`

## 如何实现网页多标签通讯?

- WebSocket 需要服务端，成本较高
- localStorage 简单易用，推荐
- SharedWorker 调试不方便，不兼容 IE11

#### 使用 WebSocket

- 无跨域限制
- 需要服务端支持，成本高

#### 通过 localStorage 通讯

- 同域的 A 和 B 两个页面
- A 页面设置 localStorage
- B 页面可以监听到 localStorage 值的修改

#### 通过 SharedWorker 通讯

- SharedWorker 是 WebWorker 的一种
- WebWorker 可以开启子进程执行 JavaScript，但不能操作 DOM
- SharedWorker 可以单独开启一个进程，用于同域页面通讯

## 网页和 iframe 如何通讯?

- 使用 postMessage 通讯
- 使用 message 接受
- 注意跨域限制和判断

**父页面**
![通讯](/public/images/web-interview/4-13.png)
**子页面**
![通讯](/public/images/web-interview/4-14.png)

**通讯结果**
![通讯](/public/images/web-interview/4-15.png)

## 请描述 koa2 洋葱圈模型

![洋葱圈模型](/public/images/web-interview/4-16.png)

#### koa2

- 一个简约、流行的 nodejs 框架
- 通过中间件组织代码
- 多个中间件以 洋葱圈模型 执行

#### 代码执行顺序

![代码执行顺序](/public/images/web-interview/4-15.png)
