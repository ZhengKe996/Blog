---
title: 原生的 JavaScript
date: 2022-05-31
draft: true
lang: zh
duration: 25min
---

# 数据类型的陷阱

### 判断是不是 Object

```js
function isObject(obj) {
  if (typeof obj === "object") {
    return true;
  }
  return false;
}
```

##### 上面的方法有什么问题？

typeof null 返回值是 object

### +转为数字

```js
function toNumber(value) {
  return +value;
}
```

### 位移转为数字

```js
function toNumber(value) {
  return value >> 0;
}

function toNumber2(value) {
  return value >>> 0;
}
```

### 字符串批量转换为整数

```js
const arr = ["1", "2", "3"];
arr.map(parseInt);
```

##### 结果

`1 NAN NAN`

### if 条件判断

```js
const result = {};
if (obj.name) {
  result.name = obj.name;
}
return result;
```

### 宽松比较

```js
null == 0;
"0" == false;
```

本质: 隐式转换

### typeof 性能比 instanceof 性能高 20 倍?

有差距 不影响使用

### null 和 undefined 实现的机制完全不一样

- null: 关键字
- undefined: 值

# 数据类型 8 种判断方式

### typeof

- 主要用途：操作数的类型，只能识别基础数据类型和引用类型
- 注意：null NaN document.all
- 注意事项：已经不是绝对安全(暂时性死区)

### constructor

- 原理：constuctor 指向创建实例对象的构造函数
- 注意事项：null 和 undefined
- 注意事项：constructor 可以被改写

### instanceof

- 原理：就是原型链上查找，查到即是其实例
- 注意事项：右操作数必须是函数或者 class
- 注意事项：多全局对象，如 多 window 之间

### isPrototypeOf

- 原理：是否出现在实例对象的原型链上
- 注意事项：能正常返回值的情况 基本等同 instanceof

### Object.prototype.toString

- 原理：通过函数的动态 this 特性，返回其数据类型，'[object Date]'
- 思考：自定义对象如何获得 [object MyArray] 类型
- 思考：Object.prototype.toString.call(Boolean.prototype)

### 鸭子类型检测

- 原理：检查自身、属性的类型或者执行结果的类型
- 例子：kindOf 与 p-is-promise

### Symbol.toStringTag

- 原理：Object.prototype.toString 会读取该值
- 适用场景：需自定义类型
- 注意事项：兼容性

### 等比较

- 原理：与某个固定值进行比较
- 适用场景：undefined window document null 等

# ES6 增强的 NaN

### NaN 与 Number.NaN

- typeof 是数字
- 我不等于我自己
- 不能被删除

### isNaN

- 检查 toNumber 返回值，如果是 NaN 返回 true 反之返回 false

### Number.isNaN

- 判断一个值是否为数字，并且值等于 NaN

### 严格判断 NaN 汇总

- Number.isNaN
- 自身比较
- Object.is
- typeof + NaN

```js
if (!("isNaN" in Number)) {
  Number.isNaN = function (value) {
    return typeof value === "number" && isNaN(value);
  };
}
```
