---
title: 前端知识深度面试题
date: 2022-05-03
draft: true
lang: zh
duration: 25min
---

# 重点

- 非应用层面, 深入到相关原理层面
- JavaScript 相关原理
- Vue React 等框架的原理

# JavaScript 的垃圾回收使用什么算法

### 垃圾回收 GC

**什么是垃圾回收**

回收 函数已经执行完成, 再也用不到的对象或数据

- 引用计数(之前)
- 标记清楚(现代)

### 闭包是内存泄露吗?

**答:**
闭包不是内存泄露, 因为闭包的数据是不可被回收的

# 如何检测 JavaScript 内存泄露?

控制台 Performance 查看内存, 当内存不断上升不下降则代表内存泄露

# JavaScript 内存泄露场景有哪些(Vue)

**答:**

- 被全局变量、函数引用, 组件销毁时未清除
- 被全局事件、定时器引用, 组件销毁时未被清除
- 被自定义事件引用, 组件销毁时未清除

### 划重点

- 以前的前端不太注重内存泄露, 不像后端 7\*24 小时持续运行
- 近几年前端功能不断复杂, 内存问题也要重点考虑

# WeakMap WeakSet

```js
const wMap = new WeakMap(); // 弱引用

wMap.set(obj, 100); // WeakMap 的 Key 只能是引用类型 WeakSet 同理

wMap.get(obj);
```

# 浏览器和 Node.js 的事件循环有什么区别?

**答:**

- 浏览器和 Node.js 的 event loop 流程基本相同
- Node.js 宏任务和微任务分类型, 有优先级

### 单线程和异步

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

### 浏览器 event loop

先执行微任务 -> 渲染 DOM -> 执行宏任务

![浏览器](/public/images/web-interview/3-1.png)

### Node.js 异步

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

### Node.js 宏任务类型和优先级

1. Timers - setTimeout setInrerval
2. I/O callbacks - 处理网络、流、TCP 的错误回调
3. Idle, prepare - 闲置状态(Node.js 内部使用)
4. Poll 轮询 - 执行 Poll 中的 I/O 队列
5. Check 检查 - 存储 setImmediate 回调
6. Close callbacks - 关闭回调, 如 socket("close")

### Node.js 微任务类型和优先级

- 包括: promise, async/await, process.nextTick
- 注意: process.nextTick 优先级最高

### Node.js event loop

1. 执行同步代码
2. 执行微任务(process.nextTick 优先级更高)
3. 按顺序执行 6 个类型的宏任务(每个开始之前都要执行当前的微任务)

![node-event-loop](/public/images/web-interview/3-2.png)

### 注意事项

推荐使用 setImmediate 代替 process.nextTick

# 虚拟 DOM(vdom)真的很快吗?

**答:**

- vdom 并不快, JavaScript 直接操作 DOM 才是最快的
- 但 数据驱动视图 要有合适的技术方案, 不能全部 DOM 重建
- vdom 就是目前最合适的技术方案(并不是因为快, 而是合适)

### vdom

- Virtual DOM 虚拟 DOM
- 用 JavaScript 对象模拟 DOM 节点数据
- 由 React 最先推广使用

### Vue React 等框架的价值

- 组件化
- 数据视图分离, 数据驱动视图 (核心)
- 只关注业务数据, 而不用再关心 DOM 变化

### 扩展: svelte 就不用 vdom

![svelte和react](/public/images/web-interview/3-3.png)

# 遍历数组, for 和 forEach 哪个快?

**答:**

- for 更快
- forEach 每次都要创建一个函数来调用, 而 for 不会创建函数
- 函数需要独立的作用域, 会有额外的开销

### 划重点

- 越低级的算法, 性能往往越好
- 时间复杂度一致的前提下, forEach 代码可读性更好(日常开发不仅仅考虑性能)
