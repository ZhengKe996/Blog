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

### 全局代码的执行过程

1. 代码被解析, v8 引擎内部会帮助我们创建一个对象(GlobalObject -> go)
2. 运行代码
   1. v8 为了执行代码, 引擎内部会有一个执行上下文栈(Execution Context Stack ECStack)(函数调用栈)
   2. 我们执行的是全局代码, 为了全局代码能够正常的执行, 需要创建 全局执行上下文(Global Execution Context)(全局代码需要被执行时才会创建)

![全局代码的执行过程](/public/images/advanced-javasript/1-4.jpg)

##### 函数

- 执行过程中执行到一个函数时, 就会根据函数体创建一个函数执行上下文(FEC)并且压入 EC Stack 中
- FEC 中包含三部分内容:
  - 在解析函数成为 AST 树结构时, 会创建一个 Activation Object(AO)(包含形参、arguments、函数定义和函数对象、定义的变量)
  - 作用域链
  - this 绑定的值

![函数](/public/images/advanced-javasript/1-5.png)

##### 作用域链

当我们查找一个对象时, 真实的查找是沿着作用域链查找
![作用域链](/public/images/advanced-javasript/1-6.png)

##### 嵌套函数

![嵌套函数](/public/images/advanced-javasript/1-7.png)

### 函数调用函数执行过程

```js
var message = "Hello Global";

function foo() {
  console.log(message); // 打印 Hello Global
}

function bar() {
  var message = "Hello Bar";
  foo();
}
bar();
```

![函数调用函数的执行过程](/public/images/advanced-javasript/1-8.png)

### 作用域提升面试题

```js
var n = 100;
function foo() {
  n = 200;
}
foo();
console.log(n); // 200
```

```js
function foo() {
  console.log(n); // undefined
  var n = 200;
  console.log(n); // 200
}
var n = 100;
foo();
```

```js
var n = 100;

function foo() {
  console.log(n); // 100
}

function bar() {
  var n = 200;
  console.log(n); // 200
  foo();
}
bar();
console.log(n); // 100
```

```js
var a = 100;
function foo() {
  console.log(a); // undefined
  return;
  var a = 100;
}
foo();
```

```js
function foo() {
  var a = (b = 100); // => b = 100; var a = 100;
}
foo();

console.log(a); // not defined
console.log(b); // 100
```

# JavaScript 的内存管理和闭包

- 不管什么样的编程语言, 在**代码的执行过程中都需要给它分配内存**, 不同的是**某些编程语言需要手动的管理内存**, **某些编程语言会自动帮助我们管理内存**
- 不管以什么样的方式来管理内存, 内存的管理都会有如下的生命周期
  1. 分配申请你需要的内存
  2. 使用分配的内存
  3. 不需要使用时, 对其进行释放
- 不同的编程语言对于第一步和第三步会有不同的实现
  - 手动管理内存: 比如 C、C++包括早期的 OC 都需要手动来管理内存的申请和释放(malloc 和 free 函数)
  - 自动管理内存: 比如 Java、JavaScript、Python、Swift、Dart 等, 会自动帮助我们管理内存

### 内存管理

**JavaScript 会在定义变量时, 为我们分配内存**

- 对于**基本数据类型内存的分配**会在执行时, 直接在栈空间进行分配
- 对于**复杂数据类型内存的分配**会在堆内存中开辟一块空间, 并将这块空间的指针返回值变量引用

![引用计数](/public/images/advanced-javasript/2-1.png)

### JavaScript 的垃圾回收机制

- 因为内存的大小是有限的, 当内存不再需要的时候, 需要对其进行释放, 以便腾出更多的内存空间
- 在**手动管理内存的语言**中, 我们需要通过**一些方式自己来释放不再需要的内存, 比如 free 函数**
  - 这种管理方式非常的低效, 非常影响编写逻辑代码的效率
  - 对开发者的要求很高, 一不小心就会产生内存泄露
- 大部分**现代的编程语言都有自己的垃圾回收机制**
  - 垃圾回收的英文是 Garbage Collection 简称 GC
  - 对那些不再使用的对象, 我们称之为是垃圾, 它需要被回收, 用以释放更多的内存空间
  - 语言运行环境, 如 Java 的运行环境 JVM,JavaScript 的运行环境 js 引擎都会内存 垃圾回收器
  - 垃圾回收器, 也会简称为 GC, 很多地方看到的 GC 其实指的是垃圾回收器

### 常见的 GC 算法

##### 引用计数

- 当一个对象有一个引用指向它时, 那么这个对象的引用就 +1 当一个对象的引用为 0 时, 这个对象就可以被销毁掉
- 这个算法有一个很大的弊端就是会产生**循环引用**
  ![引用计数](/public/images/advanced-javasript/2-2.png)

###### 循环引用 会产生内存泄露

![循环引用](/public/images/advanced-javasript/2-4.png)

##### 标记清除

- 这个算法是设置一个根对象(Root Object), 垃圾回收器会定期从这个根开始, 找所有从根开始有引用的对象, 对于那些没有引用到的对象, 就认为是不可用的对象
- 这个算法可以很好的解决循环引用的问题

![标记清楚](/public/images/advanced-javasript/2-3.png)
