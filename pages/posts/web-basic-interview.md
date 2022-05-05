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

# px % em rem vm/vh 有什么区别

### px 和 %

- px 基本单位, 绝对单位(其他的都是相对单位)
- % 相对于父元素的宽度比例

### em 和 rem

- em 相对于当前元素的 font-size
- rem 相对于根节点的 font-size

### vw/vh

- vw 屏幕宽度的 1%
- vh 屏幕高度的 1%
- vmin 两者的最小值, vmax 两者的最大值

# 箭头函数

- 箭头函数有什么缺点?
- 什么时候不能使用箭头函数?

### 箭头函数的缺点

1. 没有 arguments
2. 无法通过 apply call bind 改变 this
3. 某些箭头函数代码难以阅读

##### 不适用

1. 对象方法(this 没有指向对象)
2. 原型方法(this 没有指向原型)
3. 构造方法
4. 动态上下文中的回调函数
5. Vue 生命周期 和 method (option API)

### 划重点

- 要熟练应用箭头函数, 也要对函数 `this arguments` 敏感
- 传统 Vue 组件是 js 对象, 传统的 React 组件是 class, 两者不同

# 请描述 TCP 三次握手和四次挥手

### 建立 TCP 连接

1. 先建立连接(确保双方都有收发消息的能力)
2. 再传输内容(如: 发送一个 get 请求)
3. 网络连接 TCP 协议, 传输内容是 HTTP 协议

### 三次握手 建立连接

1. Client 发包, Server 接收. Server: 有 Client 要找我
2. Server 发包, Client 接收. Client: Server 已经收到信息了
3. Client 发包, Server 接收. Server: Client 要准备发送了

### 四次挥手 关闭连接

1. Client 发包, Server 接收. Server: 可以关闭了(关闭连接)

...

### 划重点

- 握手是连接, 挥手是告别
- 不要追求深入的细节

# for...in 和 for...of 有什么区别

**答:**

- for...in 用于可枚举数据, 如 对象、数组、字符串, 得到 key
- for...of 用于可迭代数据, 如 数组、字符串、Map、Set,得到 value

### key 和 value

- for...in 遍历得到 key
- for...of 遍历得到 value

### 适用于不同的数据类型

- 遍历对象: for...in
- 遍历 Map Set: for...of
- 遍历 generator: for...of

### 可枚举 VS 可迭代

- for...in: 用于**可枚举**数据, 如 对象、数组、字符串
- for...of: 用于**可迭代**数据, 如 数组、字符串、Map、Set

# for await...of 有什么作用?

**答:**

- for await...of 用于遍历多个 Promise

```js
...

const list = [p1, p2, p3];
Promise.all(list).then((res) => console.log(res));

for await (let res of list) {
  console.log(res);
}
```

# offsetHeight scrollHeight clientHeight 的区别

### 计算规则

- offsetHeight offsetWidth: border + padding + content
- clientHeight clientWidth: padding + content
- scrollHeight scrollWidth: padding + 实际内容尺寸

# HTMLCollection 和 NodeList 区别

### Node 和 Element

- DOM 是一棵树, 所有节点都是 Node
- Node 是 Element 的基类
- ELement 是其他 HTML 元素的基类, 如 HTMLDivElement

![Node和Element](/public/images/web-interview/2-5.png)

### HTMLCollection 和 NodeList

- HTMLCollection 是 Element 的集合
- NodeList 是 Node 集合

### 划重点

- 获取 Node 和 Element 的返回结果可能不一样
- 如: elem.childNodes 和 elem.children 不一样
- 前者会包含 Text 和 Comment 节点, 后者不会

### 扩展: 类数组 -> 数组

**HTMLCollection 和 NodeList 都不是数组, 而是"类数组"**

# Vue computed 和 watch 的区别

**答:**

- computed 用于计算产出新的数据, 有缓存
- watch 用于监听现有数据

### 两者用途不同

- computed 用于计算产生新的数据
- watch 用于监听现有数据

### computed 有缓存

- computed 有缓存
- method 没有缓存

# Vue 组件通信有几种方式, 尽量全面

- props 和 $emit
- 自定义事件
- $attrs
- $parent
- $refs
- provide/inject
- Vuex

### 不同场景

- 父子组件
- 上下级组件(跨多级)通信
- 全局组件

##### props 和 $emit

- Vue2 与 Vue3 相同
- OptionAPI 与 CompositionAPI 用法差异

##### 自定义事件

- Vue2: new Vue() => event
- Vue3: 引入第三方的自定义事件

- 组件销毁时需要 off 事件
- on 和 off 的时候 需要指定函数名字

##### $attrs

- Vue3 中 把$listeners 合并到了$attrs
- Props 和 emits 的候补
- inheritAttrs: 去除 attrs
- 当子节点只有一个独立节点时, 节点会继承一些 DOM 属性
- 可以实现上下级透传, 需要依赖 v-bind='$attrs'

##### $parent

- mounted(onMounted)生命周期中获取
- this.$parent.xxx 获取父组件

##### $refs

- mounted(onMounted)生命周期中获取
- this.$refs.xxx 获取子组件

##### provide inject

传递静态数据

```js
...
provide:{ info:"xxx" }
...
```

```js
...
inject:["info"]
...
```

传递非静态数据

```js
...
data(){
  return{
    name:"张三"
  }
},
provide(){
  return{
    info:computed(()=>this.name)
  }
}
...
```

# Vuex mutation action 区别

**答:**

- mutation: 原子操作, 必须同步代码
- action: 可包含多个 mutation, 可以同步异步代码

# JavaScript 严格模式有什么特点(重点)

### 开启严格模式

##### 全局开启

```js
"use strict";
```

##### 某个函数开启

```js
function foo() {
  "use strict";
}
```

### 特点

- 全局变量必须先声明
- 禁止使用 with
- 创建 eval 作用域
- 禁止 this 指向 window
- 函数参数不能重名

# HTTP 跨域请求时为什么要发送 options 请求

**答:**

- options 请求是跨域请求之前的预检查
- 浏览器自行发起,无需人为干预
- 不会影响实际的功能

### 跨域请求

- 浏览器同源策略
- 同源策略一般限制 Ajax 网络请求, 不能跨域请求 server
- 不会限制` <link>``<img>``<script>``<iframe> `加载第三方资源

### 多余的 options 请求

跨域请求会发现 Request Method:OPTIONS
Access-Control-Allow-Methods:GET,HEAD,PUT,PATCH,POST,DELETE

# Node.js 如何开启进程, 进程如何通讯?

**JavaScript 永远都是单线程的**

**答:**

- 开启子进程 child_process.fork 和 cluster.fork
- 使用 send 和 on 传递消息

### 为什么需要多进程?

- 多核 CPU 更适合处理多线程
- 内存较大, 多个进程才能更好的利用(单进程有内存上限)
- 压榨机器资源, 更快、更节省

### 开启多进程 child_process.fork

```js
// ...
const fork = requite("child_process").fork;

// ...
// 开启子进程
const computeProcess = fork("");
computeProcess.send("开始计算");

computeProcess.on("message", (data) => {
  console.log("主进程接受到的信息", data);
  res.send("结果", data);
});
computeProcess.on("close", () => {
  console.info("子进程因意外退出");
});

// ...
// 子进程
process.on("message", (data) => {
  console.log("子进程", process.pid);
  console.log("子进程接受收的信息", data);
  // ...
  // 发送消息给父进程
  process.send("发送消息给主进程");
});
```

### 开启多进程 cluster

```js
const http = require("http");
const cpuCoreLength = require("os").cpus().length;
const cluster = require("cluster);

if (cluster.isMaster) {
  for (let i =0;i < cpuCoreLength; i++) {
    cluster.fork(); // 开启子进程
  };

  cluster.on('exit',worker => {
    console.log("子进程退出")
    cluster.fork(); // 进程守护
  })
} else {
  // 多个子进程会共享一个TCP连接,提供一份网络服务
  // ...
}
```

### 划重点

- 进程 vs 线程
- JavaScript 是单线程的
- 为何需要多进程?

# JavaScript Bridge 的原理

### 什么是 JavaScript Bridge

- JavaScript 无法直接调用 native API
- 需要通过一些特定的 格式 来调用
- 格式: JavaScript-Bridge 如: 微信 JSSDK

### JavaScript Bridge 的常见实现方式

- 注册全局 API
- URL Scheme

# 是否了解过 requestIdleCallback? 和 requestAnimationFrame 有什么区别?

### 由 React fiber 引起的关注

- 组件树转换为链表, 可分段渲染
- 渲染时可以暂停, 去执行其他高优任务, 空闲时再继续渲染
- 如何判断空闲? requestIdleCallback

### 区别

- requestAnimationFrame 每次渲染完都会执行 高优
- requestIdleCallback 空闲时才会执行, 低优

# Vue 的每个生命周期都做了什么?

### created

- Vue 实例初始化完成, 完成响应式绑定
- data method 都已经初始化完成, 可调用
- 尚未开始渲染模板

### beforeMount

- 编译模板, 调用 render 生成 vdom
- 还没有开始渲染 DOM

### mounted

- 完成 DOM 渲染
- 组件创建完成
- 开始由 创建阶段 进入 运行阶段

### beforeUpdate

- data 发生变化之后
- 准备更新 DOM (尚未更新 DOM)

### updated

- data 发生变化, 且 DOM 更新完成
- 不要在 updated 中修改 data, 可能导致死循环

### beforeUnmount

- 组件进入销毁阶段(尚未销毁, 可正常使用)
- 可移除、解绑一些全局事件、自定义事件

### unmounted

- 组件被销毁了
- 所有子组件也被销毁了

### keep-alive 组件

- onActived 缓存组件被激活
- onDeactivated 缓存组件被隐藏

### 划重点

- Vue 生命周期必须掌握

# Vue 什么时候操作 DOM 比较合适

**答:**

- mounted 和 updated 不能保证子组件全部挂载完成
- 使用 $nextTick 渲染 DOM

# Ajax 应该在哪个生命周期?

**答:**

- 有两个选择 created 和 mounted
- 个人推荐: mounted

# Vue3 Composition API 生命周期有什么区别?

**答:**

- setup 代替了 beforeCreate 和 created
- 使用 Hooks 函数形式 mounted -> onMounted()

# Vue2 Vue3 React 三者的 diff 算法有什么不同?

**答:**

### diff 算法

- diff 算法很早就有
- diff 算法应用广泛 如 GitHub Pull Request 中的代码 diff
- 如果要严格 diff 两棵树, 时间复杂度 O(n^3) 不可用

### Tree diff 的优化

- 只比较同一层, 不跨级比较
- tag 不同则删掉重建(不再比较内部的细节)
- 子节点通过 key 区分(key 的重要性)

### 学习技巧

- diff 算法非常复杂, 不要深究细节

### React diff - 仅右移

![React](/public/images/web-interview/3-4.png)

### Vue2 - 双端比较

![Vue2](/public/images/web-interview/3-5.png)

### Vue3 - 最长递增子序列

![Vue3](/public/images/web-interview/3-6.png)
