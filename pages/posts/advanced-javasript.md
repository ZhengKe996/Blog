---
title: JavaScript 高级
date: 2022-04-28
draft: true
lang: zh
duration: 25min
---

# 浏览器原理

### 浏览器的内核

**我们经常说的浏览器内核指的是 浏览器的排版引擎**

- 排版引擎(layout engine) == 浏览器引擎(browser engine) == 页面渲染引擎(rendering engine) == 样板引擎

**不同的浏览器有不同的内核组成**

- Gecko: 早期被 Netscape 和 Mozilla Firef 浏览器使用
- Trident: 微软开发, 被 IE4-11 浏览器使用
- Webkit: Apple 基于 KHTML 开发, 开源的. 用于 Safari, Google Chrome 之前也在使用
- Bink: Webkit 的一个分支, Google 开发, 目前应用于 Google Chrome、Edge、Opera 等

### 浏览器的渲染过程

![浏览器的渲染过程](/public/images/advanced-javasript/1-1.png)

### JavaScript 引擎

**为什么需要 JavaScript 引擎**

- 高级编程语言需要转成最终的机器指令来执行
- JavaScript 代码给浏览器/Node 执行, 最终都需要被 CPU 执行
- CPU 只认识自己的指令集(机器语言)
- 需要借助 JavaScript 引擎将 JavaScript 代码翻译成 CPU 指令执行

**常见的 JavaScript 引擎**

- SpiderMonkey: 第一款 JavaScript 引擎, 由 Brendan Eich 开发
- Chakra: 微软开发,用于 IE 浏览器
- JavaScriptCore: Webit 中的 JavaScript 一起, Apple 开发
- V8:Google 开发的强大的 JavaScript 引擎
- ......

### V8 引擎的原理

![V8引擎](/public/images/advanced-javasript/1-2.png)

### V8 引擎的架构

- Parse 模块会将 JavaScript 代码转化为 AST(抽象语法树)
  - 如果函数没有被调用, 是不会转换为 AST 的
- Ignition 是一个解释器, 会将 AST 转换为 ByteCode(字节码)
  - 同时会收集 TurboFan 优化所需要的信息
  - 如果函数只调用一次, Ignotion 会执行解释执行 ByteCode
- TurboFan 是一个编辑器, 可以将字节码编译为 CPU 可以直接执行的机器码
  - 一个函数多次被调用, 就会被标记为 热点函数, 就会经过 TurboFan 转换成优化的机器码, 提高代码的执行性能
  - 机器码实际上也会被还原为 ByteCode. 因为如果后续执行函数的过程中, 类型发生了变化, 之前优化的机器码并不能正确的处理运算, 就会逆向转换成字节码

### V8 引擎官方解析图

![V8引擎](/public/images/advanced-javasript/1-3.png)

### JavaScript 代码如何被解析的?

1. Blink 将源码交给 V8 引擎, Stream 获取到源码并进行编码转换
2. Scanner 会进行词法分析(lexical analysis), 词法分析会将代码转换成 tokens
3. tokens 会被转换成 AST 树, 经过 Parser 和 PreParse
   - Parser: 直接将 tokens 转成 AST 树架构
   - PrePare: 预解析
     - 并不是所有的 JavaScript 代码在一开始就被执行, 对所有的 JavaScript 代码进行解析影响网页的运行效率
     - V8 引擎实现了 Lazy Parsing(延迟解析) 的方案, 将不必要的函数进行预解析. 只解析需要的内容, 对函数的全量解析是在函数被调用时才会进行
