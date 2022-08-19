---
title: 前端知识深度面试题
date: 2022-05-03
draft: true
type: Interview
lang: zh
duration: 25min
---

## 重点

- 非应用层面, 深入到相关原理层面
- JavaScript 相关原理
- Vue React 等框架的原理

## JavaScript 的垃圾回收使用什么算法

#### 垃圾回收 GC

**什么是垃圾回收**

回收 函数已经执行完成, 再也用不到的对象或数据

- 引用计数(之前)
- 标记清楚(现代)

#### 闭包是内存泄露吗?

**答:**
闭包不是内存泄露, 因为闭包的数据是不可被回收的

## 如何检测 JavaScript 内存泄露?

控制台 Performance 查看内存, 当内存不断上升不下降则代表内存泄露

## JavaScript 内存泄露场景有哪些(Vue)

**答:**

- 被全局变量、函数引用, 组件销毁时未清除
- 被全局事件、定时器引用, 组件销毁时未被清除
- 被自定义事件引用, 组件销毁时未清除

#### 划重点

- 以前的前端不太注重内存泄露, 不像后端 7\*24 小时持续运行
- 近几年前端功能不断复杂, 内存问题也要重点考虑

## WeakMap WeakSet

```js
const wMap = new WeakMap(); // 弱引用

wMap.set(obj, 100); // WeakMap 的 Key 只能是引用类型 WeakSet 同理

wMap.get(obj);
```

## 浏览器和 Node.js 的事件循环有什么区别?

**答:**

- 浏览器和 Node.js 的 event loop 流程基本相同
- Node.js 宏任务和微任务分类型, 有优先级

#### 单线程和异步

- JavaScript 是单线程的(无论浏览器还是 Node.js)
- 浏览器中 JavaScript 执行和 DOM 渲染共用一个线程
- 解决方案: 异步

##### 宏任务和微任务

- 宏任务: 如 setTimeout setInterval 网络请求
- 微任务: 如 promise async/await MutationObserver
- 微任务是下一轮 DOM 渲染之前执行, 宏任务在之后执行

```js
console.info("start"); // 1

// 宏任务
setTimeout(() => {
  console.info("timeout"); // 4
});

// 微任务
Promise.resolve().then(() => {
  console.info("promise then"); // 3
});

console.info("end"); // 2
```

#### 浏览器 event loop

先执行微任务 -> 渲染 DOM -> 执行宏任务

![浏览器](/public/images/web-interview/3-1.png)

#### Node.js 异步

- Node.js 同样使用 ES 语法, 也是单线程, 也需要异步
- 异步任务: 宏任务+微任务
- 它的宏任务和微任务分不同类型、有不同优先级

```js
console.info("start"); // 1

setImmediate(() => {
  console.info("setImmediate"); // 3
});

setTimeout(() => {
  console.info("timeout"); // 4
});

Promise.resolve().then(() => {
  console.info("promise then"); // 5
});

process.nextTick(() => {
  console.info("nextTick"); // 6
});

console.info("end"); // 2
```

#### Node.js 宏任务类型和优先级

1. Timers - setTimeout setInrerval
2. I/O callbacks - 处理网络、流、TCP 的错误回调
3. Idle, prepare - 闲置状态(Node.js 内部使用)
4. Poll 轮询 - 执行 Poll 中的 I/O 队列
5. Check 检查 - 存储 setImmediate 回调
6. Close callbacks - 关闭回调, 如 socket("close")

#### Node.js 微任务类型和优先级

- 包括: promise, async/await, process.nextTick
- 注意: process.nextTick 优先级最高

#### Node.js event loop

1. 执行同步代码
2. 执行微任务(process.nextTick 优先级更高)
3. 按顺序执行 6 个类型的宏任务(每个开始之前都要执行当前的微任务)

![node-event-loop](/public/images/web-interview/3-2.png)

#### 注意事项

推荐使用 setImmediate 代替 process.nextTick

## 虚拟 DOM(vdom)真的很快吗?

**答:**

- vdom 并不快, JavaScript 直接操作 DOM 才是最快的
- 但 数据驱动视图 要有合适的技术方案, 不能全部 DOM 重建
- vdom 就是目前最合适的技术方案(并不是因为快, 而是合适)

#### vdom

- Virtual DOM 虚拟 DOM
- 用 JavaScript 对象模拟 DOM 节点数据
- 由 React 最先推广使用

#### Vue React 等框架的价值

- 组件化
- 数据视图分离, 数据驱动视图 (核心)
- 只关注业务数据, 而不用再关心 DOM 变化

#### 扩展: svelte 就不用 vdom

![svelte和react](/public/images/web-interview/3-3.png)

## 遍历数组, for 和 forEach 哪个快?

**答:**

- for 更快
- forEach 每次都要创建一个函数来调用, 而 for 不会创建函数
- 函数需要独立的作用域, 会有额外的开销

#### 划重点

- 越低级的算法, 性能往往越好
- 时间复杂度一致的前提下, forEach 代码可读性更好(日常开发不仅仅考虑性能)

## Node.js 如何开启进程, 进程如何通讯?

**JavaScript 永远都是单线程的**

**答:**

- 开启子进程 child_process.fork 和 cluster.fork
- 使用 send 和 on 传递消息

#### 为什么需要多进程?

- 多核 CPU 更适合处理多线程
- 内存较大, 多个进程才能更好的利用(单进程有内存上限)
- 压榨机器资源, 更快、更节省

#### 开启多进程 child_process.fork

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

#### 开启多进程 cluster

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

#### 划重点

- 进程 vs 线程
- JavaScript 是单线程的
- 为何需要多进程?

## JavaScript Bridge 的原理

#### 什么是 JavaScript Bridge

- JavaScript 无法直接调用 native API
- 需要通过一些特定的 格式 来调用
- 格式: JavaScript-Bridge 如: 微信 JSSDK

#### JavaScript Bridge 的常见实现方式

- 注册全局 API
- URL Scheme

## 是否了解过 requestIdleCallback? 和 requestAnimationFrame 有什么区别?

#### 由 React fiber 引起的关注

- 组件树转换为链表, 可分段渲染
- 渲染时可以暂停, 去执行其他高优任务, 空闲时再继续渲染
- 如何判断空闲? requestIdleCallback

#### 区别

- requestAnimationFrame 每次渲染完都会执行 高优
- requestIdleCallback 空闲时才会执行, 低优

## Vue 的每个生命周期都做了什么?

#### created

- Vue 实例初始化完成, 完成响应式绑定
- data method 都已经初始化完成, 可调用
- 尚未开始渲染模板

#### beforeMount

- 编译模板, 调用 render 生成 vdom
- 还没有开始渲染 DOM

#### mounted

- 完成 DOM 渲染
- 组件创建完成
- 开始由 创建阶段 进入 运行阶段

#### beforeUpdate

- data 发生变化之后
- 准备更新 DOM (尚未更新 DOM)

#### updated

- data 发生变化, 且 DOM 更新完成
- 不要在 updated 中修改 data, 可能导致死循环

#### beforeUnmount

- 组件进入销毁阶段(尚未销毁, 可正常使用)
- 可移除、解绑一些全局事件、自定义事件

#### unmounted

- 组件被销毁了
- 所有子组件也被销毁了

#### keep-alive 组件

- onActived 缓存组件被激活
- onDeactivated 缓存组件被隐藏

#### 划重点

- Vue 生命周期必须掌握

## Vue 什么时候操作 DOM 比较合适

**答:**

- mounted 和 updated 不能保证子组件全部挂载完成
- 使用 $nextTick 渲染 DOM

## Ajax 应该在哪个生命周期?

**答:**

- 有两个选择 created 和 mounted
- 个人推荐: mounted

## Vue3 Composition API 生命周期有什么区别?

**答:**

- setup 代替了 beforeCreate 和 created
- 使用 Hooks 函数形式 mounted -> onMounted()

## Vue2 Vue3 React 三者的 diff 算法有什么不同?

**答:**

- React diff - 仅右移
- Vue2 - 双端比较
- Vue3 - 最长递增子序列

#### diff 算法

- diff 算法很早就有
- diff 算法应用广泛 如 GitHub Pull Request 中的代码 diff
- 如果要严格 diff 两棵树, 时间复杂度 O(n^3) 不可用

#### Tree diff 的优化

- 只比较同一层, 不跨级比较
- tag 不同则删掉重建(不再比较内部的细节)
- 子节点通过 key 区分(key 的重要性)

#### 学习技巧

- diff 算法非常复杂, 不要深究细节

#### React diff - 仅右移

![React](/public/images/web-interview/3-4.png)

#### Vue2 - 双端比较

![Vue2](/public/images/web-interview/3-5.png)

#### Vue3 - 最长递增子序列

![Vue3](/public/images/web-interview/3-6.png)

## Vue React 为何循环时必须使用 key?

**答:**

- vdom diff 算法会根据 key 判断元素是否要删除？
- 匹配了 key, 则只移动元素 - 性能较好
- 未匹配 key, 则删除重建 - 性能较差

![React](/public/images/web-interview/3-7.png)

## Vue-router MemoryHistory(abstract)

**答:**
URL 不会发生变化

#### Vue-router 三种模式

- Hash
- WebHistory
- MemoryHistory(V4 之前叫做 abstract history)
