---
title: 前端基础知识面试题
date: 2022-04-26
draft: true
lang: zh
duration: 25min
---

# 请说明 Ajax Fetch Axios 三者的区别

**答:**

- Ajax 一种技术统称
- Fetch 一个原生 API
- Axios 一个第三方库

### 三者都用于网络请求, 但纬度不同

- Ajax (Asynchronous JavaScript and XML) 一种技术的统称
- Fetch 一个具体 API
- Axios 第三方库

##### 面试题 使用 XMLHttpRequest 实现 Ajax

```js
function ajax(url, successFun) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", url, false);

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      successFun(xhr.responseText);
    }
  };

  xhr.send(null);
}
```

##### Fetch

- 浏览器原生 API 用于网络请求
- 和 XMLHttpRequest 一个级别
- Fetch 语法更加简洁、易用, 支持 Promise

```js
function ajax(url) {
  return fetch(url).then((res) => res.json());
}
```

##### Axios

- 最常用的网络请求 lib
- 内部可用 XMLHttpRequest 和 Fetch 实现

### 划重点

- lib 和 API 的区别
- 实际项目中 使用现场的 lib, 尽量不要自己造轮子

# 节流 和 防抖

- 两者分别有什么区别

- 分别用于什么场景

**答:**

- 节流: 限制执行频率, 有节奏的执行
- 防抖: 限制执行次数, 多次密集的触发只执行一次
- 节流关注'过程', 防抖关注'结果'

### 防抖

- 防抖: 防止抖动, '先抖动着, 啥时候停止了, 再执行下一步'
- 如: 搜索框, 输入停止后, 再触发搜索
  ![防抖](/public/images/web-interview/2-1.png)

```js
function debounce(fun, delay = 200) {
  let timer = 0;
  return function () {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fun.apply(this, arguments); // 透传 this 和 参数
      timer = 0;
    }, delay);
  };
}
```

### 节流

- 节流: 节省交互沟通, 流, 不一定指流量
- 一个一个来, 按时间节奏, 插队无效
- 如: drag 或 scroll 期间触发某一个回调, 要设置一个时间间隔

![节流](/public/images/web-interview/2-2.png)

```js
function throttle(fun, delay = 100) {
  let timer = 0;

  return function () {
    if (timer) return;
    timer = setTimeout(() => {
      fun.appley(this, arguments);
      timer = 0;
    }, delay);
  };
}
```

### 划重点

- 过程(限制频率) VS 结果
- 实际工作可使用 [lodash](https://lodash.com/)
