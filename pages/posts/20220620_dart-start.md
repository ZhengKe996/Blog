---
title: 走进 Dart
date: 2022-06-20
draft: true
lang: zh
duration: 35min
---

# 走进 Dart

### 异步编程

- async-await 代码块是对 Future API 的简化形式,将异步回调代码写成同步代码
- async 关键字修饰的函数返回一个 Future 对象，故 async 不会阻塞当前线程
- await 关键字会同步执行，阻塞当前线程

### Tips

- 要定义异步函数，需要在函数主体之前添加 async 关键字
- await 关键字只有在 async 关键字修饰的函数才会有效

# Dart 总结

- 符合 Flutter 声明式 UI 的布局方式
- 线程模型: 微任务队列和事件队列
- 线程管理: 4 个不同的 Runner Thread
- async 和 await 异步编程
