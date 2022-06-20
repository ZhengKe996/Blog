---
title: 走进 Flutter
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

# 布局方式及差异

### 声明式 UI 优点

- 更适合做多设备适配
- UI 布局和逻辑控制通过 reactive 方式实现数据绑定
- 更好实现 UI 局部刷新机制，只刷新更新的部分

### 什么是 Widget?

官方解释: A widget is an immutable description of a part of a user interface
翻译: Widget 是部分 UI 的不可变描述信息
重点: Widget 是不可变的!!!

### StatelessWidget VS StateFulWidget

##### StatelessWidget

官方释义: A widget that does not require mutable state.

##### StateFulWidget

官方释义: A widget that has mutable state.

##### 结论

结论: Widget 一定不可变，如果需要改变属性需要用可变的 State

### State 更新方式:

- 通过 state.setState()触发重布局
- 遍历需要更新的 Element，依次调用 rebuild

##### 结论

结论: StatelessWidget 和 StateFulWidget 差别在于是否能自重建

# 生命周期

1. createState: 创建 state，当 StatefulWidget 被调用时会立即执行
2. initState: State 初始化方法，需调用 super 重写父类的方法
3. didChangeDependencies: 该函数是在该组件的依赖的 State 发生变化时调用，例如语言或主题等
4. Build: 返回需要渲染的 Widget
5. Reassemble：开发阶段使用，在 debug 模式下，每次热重载都会调用该函数
6. didUpdateWidget: 主要是在组件重新构建时调用，比如说热重载或父组件发生 build
7. Deactivate: 在组件被移除节点后被调用，如果该组件被移除节点，然后未被插入到其他节点时，则会继续调用 dispose 永久移出
8. Dispose: 永久移出组件，并释放组件资源
