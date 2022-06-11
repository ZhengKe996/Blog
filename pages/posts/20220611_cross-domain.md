---
title: 九种常见跨域手段
date: 2022-06-11
draft: true
type: talk
lang: zh
duration: 25min
---

# 九种常见跨域手段

### 同源策略

协议 域名 端口 同域

http://www.fanzhengke.top:9999
http://www.fanzhengke.top:8888

### 为什么浏览器不支持跨域

cookie LocalStorage
DOM 元素也有同源策略 iframe
Ajax 也不支持跨域

### 实现跨域

1. jsonp
2. cors
3. postMessage
4. document.domain
5. window.name
6. location.hash
7. http-proxy
8. nginx
9. websocket
