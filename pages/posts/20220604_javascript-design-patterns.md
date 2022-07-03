---
title: 前端常用设计模式
date: 2022-06-04
draft: true
lang: zh
duration: 35min
---

## 面向对象 和 UML 类图

#### 面向对象

- OOP - Object Oriented Program
- 将抽象的编程概念 想象成一个对象，更好理解
- 90 年代随着 Java 一起发展壮大，现在依然主流

##### 重要概念

- 类 Class 即模板
- 对象 即实例

##### 面向对象三要素

- 继承 - 抽离公共代码，实现代码复用
- 封装 - 高内聚，低耦合
- 多态 - 更好的扩展性

#### UML

- 统一建模语言 Unified Modeling Language
- 软件设计的绘图标准
- 不仅是类图，有很多种图

##### 单个类

- 三个区域：名称，属性，方法
- 权限描述：+（public），#（protected），-（private）

![UML单个类](/public/images/design-patterns/001.png)

##### 类之间的关系

- 实现 - 实现接口
- 泛化 - 继承父类
- 关联 - A 是 B 的是属性

##### 实现

![UML实现接口](/public/images/design-patterns/002.png)

##### 泛化

![UML泛化](/public/images/design-patterns/003.png)

##### 关联

![UML关联](/public/images/design-patterns/004.png)

#### 关联关系的细化

- 聚合 - 整体包含部分，部分可以脱离整体而单独存在
- 组合 - 整体包含部分，部分不可以脱离整体
- 依赖 - 不是属性关系，而是函数参数或返回值

![UML关联关系的细化](/public/images/design-patterns/005.png)

## 设计原则: 先设计 后模式

#### S O L I D 五大设计原则

- S 单一职责原则
- O 开放封闭原则
- L 李氏置换原则
- I 接口隔离原则
- D 依赖倒置原则

##### 单一职责原则

- 每个程序都做好一件事
- 功能太多就要拆分
- 每个部门保持相互独立

##### 开放封闭原则

- 对扩展开放
- 对修改封闭
- 需求发生变化时，通过扩展来解决而非改动

##### 李氏置换原则

- 子类能够覆盖父类
- 父类出现的地方，子类也能出现
- (前端应用较少)

##### 接口隔离原则

- 保持接口的单一独立
- 避免出现 胖接口
- (和单一职责原则类似)

##### 依赖倒置原则

- 面向接口编程
- 而非面向实例

## 《Unix/Linux》设计哲学

#### 大型系统的设计

![大型系统的设计](/public/images/design-patterns/006.png)

#### 设计准则

- 小即是美
- 让每个程序只做一件事
- 快速建立原型
- 舍弃高效率，而更关注可移植性和扩展性
- 采用纯文本方式来存储数据
- 避免强制性的用户界面
- 允许用户定制环境(考虑多环境、扩展性)
- 寻求 90% 的解决方案

## 23 种设计模式

![大型系统的设计](/public/images/design-patterns/007.png)

#### 从设计到模式

- 设计，即设计原则，设计思想
- 模式，前辈们总结出来的固定套路，直接套用
- 1955 年《设计模式：可复面向对象软件的基础》23 种设计模式

#### 设计的价值

- 从需求到设计，从设计到开发
- 为何需要设计?
- 为何需要模式?

## 前端常用的 7 种设计模式

- 工厂模式
- 单例模式
- 观察者模式
- 迭代器模式
- 原型模式
- 装饰器模式
- 代理模式

## 工厂模式

#### 简易的工厂模式

![简易的工厂模式](/public/images/design-patterns/008.png)

```ts
/**
 * @description 简易的工厂模式
 */

class Product {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  fn1() {
    console.log("product fn1");
  }

  fn2() {
    console.log("product fn2");
  }
}

class Creator {
  create(name: string): Product {
    return new Product(name);
  }
}

const creator = new Creator();

const p1 = creator.create("p1");
const p2 = creator.create("p2");
```

#### 标准的工厂模式

![标准的工厂模式](/public/images/design-patterns/009.png)

```ts
/**
 * @description 标准的工厂模式
 */

interface IProduct {
  name: string;
  fn1: () => void;
  fn2: () => void;
}

class Product1 implements IProduct {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  fn1() {
    console.log("product1 fn 1");
  }
  fn2() {
    console.log("product1 fn 2");
  }
}

class Product2 implements IProduct {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  fn1() {
    console.log("product2 fn 1");
  }
  fn2() {
    console.log("product2 fn 2");
  }
}

class Creator {
  // 依赖倒置原则
  create(type: string, name: string): IProduct {
    if (type === "p1") return new Product1(name);
    if (type === "p2") return new Product2(name);
    throw new Error("Invalid type");
  }
}
```

#### 是否符合设计原则

- 工厂和类分离，解耦
- 可以扩展多个类（派生类或平行的类）
- 工厂的创建逻辑也可以自由扩展

## 单例模式

前端对单例模式并不常用，但是单例思想随处可见

- 一个 对象/实例 只能被创建一次
- 创建之后缓存起来，以后继续用
- 即：一个系统只有一个

#### TypeScript 静态属性实现单例

![静态属性](/public/images/design-patterns/010.png)

```ts
class SingleTon {
  private constructor() {}
  private static instance: SingleTon | null;

  static getInstance(): SingleTon {
    if (SingleTon.instance == null) {
      SingleTon.instance = new SingleTon();
    }
    return SingleTon.instance;
  }
}
```

#### JavaScript 实现单例

```js
function genGetInstance() {
  let instance;
  class Singleton {}

  return () => {
    if (instance == null) {
      instance = new Singleton();
    }
    return instance;
  };
}
```

#### 是否符合设计原则？

- 内部封装 getInstance 高内聚，低耦合

#### 单例思想应用场景

- 自定义事件 EventBus 全局唯一
- Vuex Redux 的 store 全局唯一
- 登录框等
- (严格的单例模式应用不多，单例思想随处可见)

## 观察者模式

![观察者模式演示](/public/images/design-patterns/011.png)

```ts
class Subject {
  private state: number = 0;
  private observers: Observer[] = [];

  getState(): number {
    return this.state;
  }

  setState(newState: number) {
    this.state = newState;
    this.notify();
  }

  // 添加观察者
  attach(observer: Observer) {
    this.observers.push(observer);
  }

  // 通知
  private notify() {
    this.observers.forEach((observer) => {
      observer.update(this.state);
    });
  }
}

class Observer {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  update(state: number) {
    console.log(`${this.name} updated, state is ${state}`);
  }
}
```

#### 是否符合设计原则?

- Observer 与 Subject 分离 解耦
- Observer 可自由扩展
- Subject 可自由扩展

#### 观察者模式使用场景

- DOM 事件
- Vue React 组件生命周期
- Vue watch
- Vue 组件更新过程
- 各种异步回调
- MutationObserver

#### 各种异步回调函数

- 定时器 setTimeout setInterval
- Promise.then
- Node.js - stream readline httpServer

## 迭代器模式

- 顺序访问有序结构(数组、NodeList)
- 不知道数据的长度和内部结构
- 高内聚、低耦合

![迭代器模式演示](/public/images/design-patterns/012.png)

```ts
class DataIterator {
  private data: number[];
  private index = 0;
  constructor(container) {
    this.data = container.data;
  }

  next(): number | null {
    if (this.hasNext()) {
      return this.data[this.index++];
    }
  }

  hasNext(): boolean {
    if (this.index >= this.data.length) return false;
    return true;
  }
}

class DataContainer {
  data: number[] = [10, 20, 30, 40, 50];
  getIterator() {
    return new DataIterator(this);
  }
}
```

#### 是否符合设计原则

- 使用者和目标分离 解耦
- 目标能自行控制其内部逻辑
- 使用者不关心目标的内部结构

#### 普通的 for 循环不是迭代器

```ts
const arr: number[] = [10, 20, 30];
const length = arr.length;
for (let i = 0; i < length; i++) {
  console.log(arr[i]);
}
```

#### 简易迭代器

```ts
const pList = document.querySelectorAll("p");
pList.forEach((p) => console.log(p));
```

#### 迭代器模式 场景

- 有序结构
- Symbol.iterator 和迭代器
- 迭代器的应用

#### 有序结构

1. 字符串
2. 数组
3. NodeList 等 DOM 集合
4. Map
5. Set

#### Symbol.iterator

- 所有有序对象，都内置 Symbol.iterator 方法
- 执行该方法，返回一个迭代器对象

```ts
interface IteratorRes {
  value: number | undefined;
  done: boolean;
}

class CustomIterator {
  private length = 3;
  private index = 0;

  next(): IteratorRes {
    this.index++;
    if (this.index <= this.length) {
      return { value: this.index, done: false };
    }
    return { value: undefined, done: true };
  }

  [Symbol.interator]() {
    return this;
  }
}
```

#### 迭代器的作用

- 用于 for...of (对比 for...in)
- 数组：解构、扩展运算符、Array.from
- 用于 Promise.all Promise.race
- 用于 yield\*

#### Generator 生成器

```ts
function* genNums() {
  yield 10;
  yield 20;
  yield 30;
  yield 40;
}
const numsIterator = genNums();
console.log(numsIterator.next());
```

```ts
function* genNums() {
  yield* [1, 2, 3, 4, 5]; // 有序结构，已经实现了 [Symbol.Iterator]
}
const numsIterator = genNums();
console.log(numsIterator.next());
```

```ts
class CustomIterator {
  private data: number[];
  constructor() {
    this.data = [100, 200, 300];
  }

  *[Symbol.iterator]() {
    yield* this.data;
  }
}

const iterator = new CustomIterator();
for (let n of iterator) {
  console.log(n);
}
```

##### Generator + yield 遍历 DOM 树

```ts
function* traverse(elemList: Element[]): any {
  for (const elem of elemList) {
    yield elem;

    const children = Array.from(elem.children);
    if (children.length) {
      yield* traverse(children);
    }
  }
}
```

## 原型模式

![原型模式演示](/public/images/design-patterns/013.png)

#### 原型

- 函数 （class）都有显示原型 prototype
- 对象都有隐式原型 `__proto__`
- 对象 `__proto__` 指向其构造函数的 prototype

#### 原型链

![原型链演示](/public/images/design-patterns/014.png)

#### 原型模式场景

- Object.create

#### 面试题: {} 和 Object.create({})有什么区别?

- {}: 当前默认的 proptype 的显示原型
- Object.create({}): 隐式原型指向空对象{}

#### 对象属性描述符

##### 获取和设置

`Object.getOwnPropertyDescriptor(obj,'x')`

`Object.defineProperty(obj,'y')`

##### 有哪些属性描述符

- value
- configurable
- writable
- enumerable

##### value

- 定义属性值
- 没有 value 则看不到对象属性

##### configurable

- 是否可以 delete 删除并重新定义
- 是否可以修改其他属性描述符
- 是否可以修改 get set

##### writable

- 属性值是否可以被修改
- 对比 Object.freeze() '冻结'
  1. 现有属性不可被修改
  2. 不可添加新属性
- 对比 Object.seal() '密封'
  1. 现有属性可以被修改
  2. 不可添加新属性

##### enumerable

- 是否可以通过 for...in 遍历

##### 原型属性的 enumerable

- 多年之前，for...in 可以遍历出原型属性
- 当时需要 hasOwnProperty 来判断: 是否是原型属性
- 现在 for...in 通过 enumerable 来判断

#### 如何遍历 Symbol 属性?

`Reflect.ownkeys(obj)`

#### 注意事项

- 原型模式不常用，但原型链是 JavaScript 基础，必须掌握
- 属性描述符日常不会直接使用，但它是理解对象属性的重要基础

## 装饰器模式

针对一个对象，动态的添加新功能，但不改变它原有的功能

![装饰器模式演示](/public/images/design-patterns/015.png)

```ts
class Circle {
  draw() {
    console.log("画一个圆");
  }
}

class Decorator {
  private circle: Circle;
  constructor(circle: Circle) {
    this.circle = circle;
  }

  draw() {
    this.circle.draw();
    this.setBorder();
  }
  private setBorder() {
    console.log("设置边框颜色");
  }
}
```

#### 是否符合开发封闭原则

- 装饰器和目标分离，解耦
- 装饰器可以自由扩展
- 目标可以自由扩展

#### TypeScript 装饰器语法

**注意: `tsconfig.json` 中新增 `experimentalDecorators:true`**

##### 装饰 class

```ts
function testable(target: any) {
  target.isTestable = true;
}

@testable
class Foo {
  static isTestable?: boolean;
}
```

##### 装饰 class method

```ts
function readOnly(target: any, key: string, descriptor: PropertyDescriptor) {
  descriptor.writable = false;
}

function configurable(value: boolean) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = value;
  };
}

class Foo {
  private name = "张三";
  private age = 20;

  @readOnly
  getName() {
    return this.name;
  }

  @configurable(false)
  getAge() {
    return this.age;
  }
}
```

装饰器就是一个函数，结合 ES 的 Decorator 语法

## AOP

- Aspect Oriented Program 面向切面编程
- 业务和系统基础功能分离，和 Decorator 很配
- AOP 和 OOP 并不冲突

![AOP演示](/public/images/design-patterns/016.png)

## 代理模式

- 针对一个对象
- 设置代理，控制这个对象的访问
- 用户不得直接访问对象，而要通过代理

![代理模式](/public/images/design-patterns/017.png)

![代理模式](/public/images/design-patterns/018.png)

```ts
class RealImg {
  fileName: string;
  constructor(fileName: string) {
    this.fileName = fileName;
  }
  display() {
    this.loadFromDist();
    console.log("display", this.fileName);
  }
  private loadFromDist() {
    console.log("loading", this.fileName);
  }
}

class ProxyImg {
  realImg: RealImg;
  constructor(fileName: string) {
    this.realImg = new RealImg(fileName);
  }
  // 代理
  display() {
    this.realImg.display();
  }
}
```

#### 是否符合设计原则

- 代理和目标分离、解耦
- 代理可自行扩展
- 目标也可自行扩展

#### 代理模式场景

- DOM 事件代理（委托）
- Webpack devServer proxy
- Nginx 反向代理

#### DOM 事件代理

- 事件绑定到父容器上，而非目标节点
- 适合目标较多或数量不确定（如无线加载的瀑布流图片列表）

#### Webpack devServer proxy

- 开发环境，前端请求服务端 API
- 代理到本地服务器，或者 mock 接口
- 正向代理

## Proxy 语法

```ts
const start = {
  name: "zhangsan",
  age: 18,
  phone: "10086",
  price: 0,
};

const agent = new Proxy(start, {
  get(target, key) {
    if (key === "phone") {
      return "10010";
    }
    if (key === "price") {
      return 100 * 1000;
    }
    return Reflect.get(target, key); // 反射 return target[key]
  },

  set(target, key, value): boolean {
    if (key === "price") {
      if (value < 100 * 1000) {
       return throw new Error("价格低了");
      }
      console.log('报价成功',value)
      return Reflect.set(target,key,value)
    }
    return false
  },
});
```

#### Proxy 使用场景

- 跟踪属性访问
- 隐藏属性
- 验证属性
- 记录实例

#### Proxy 可能遇到的坑

- 捕获器不变式
- 关于 this

##### 捕获器不变式

```ts
const obj = { x: 100, y: 0 };

Object.defineProperty(obj, "y", {
  value: 200,
  writable: false,
  configurable: false,
});

const proxy = new Proxy(obj, {
  get() {
    return "abc";
  },
});

console.log(proxy.x); // abc
console.log(proxy.y); //报错
```

##### 关于 this

```ts
const user = {
  name: "张三",
  getName() {
    console.log("this...", this);
    return this.name;
  },
};

const proxy = new Proxy(user, {});

proxy.getName();
```

## 职责链模式

- 一个流程，需要多个角色处理
- 把多个角色分开，通过一个'链'条串联起来
- 各个角色相互分离，互不干扰（高内聚低耦合）

#### 职责链场景

- JQuery 链式操作
- Promise 链式操作

## 策略模式

- 多个条件分支
- 不用很多 if...else 或 switch...case
- 每个分支单独处理，相互隔离

```ts
interface IUser {
  buy: () => void;
}

class OrdinaryUser implements IUser {
  buy() {
    console.log("普通用户的购买");
  }
}

class MemberUser implements IUser {
  buy() {
    console.log("会员用户的购买");
  }
}

class VIPUser implements IUser {
  buy() {
    console.log("VIP 用户的购买");
  }
}
```

## 适配器模式

- 我们要使用一个对象
- 而它 API 返回格式不一定完全适合我们
- 需要通过适配器转换一下

## MVC MVVM

#### MVC

- View 传送指令到 COntroller
- COntroller 执行业务逻辑，修改 Model
- Model 变化重新渲染 View

![MVC](/public/images/design-patterns/019.png)

#### MVVM

- View - Vue template
- Model - Vue data
- ViewModel - Vue 其他核心功能，负责连接 View 和 Model

![MVVM](/public/images/design-patterns/020.png)

## 打车(面试题)

1. 打车时，你可以打快车和专车
2. 无论什么车，都有车牌号和车辆名称
3. 价格不同，快车每公里 1 元，专车每公里 2 元
4. 打车时，要启动行程并显示车辆信息
5. 结束行程时，显示价格（假定行驶了 5 公里）

#### 分析

##### 数据模型

1. 车 父类
2. 快车，专车 子类
3. 行程，和车是引用关系

##### 定义属性和方法

- 车：车牌号，名称（父类），价格（子类）
- 行程：开始，结束，关联的车辆

![打车问题](/public/images/design-patterns/021.png)

#### 代码演示

```ts
abstract class Car {
  name: string;
  number: string;
  abstract price: number;
  constructor(name: string, number: string) {
    this.name = name;
    this.number = number;
  }
}

class ExpressCar extends Car {
  price = 1;
  constructor(name: string, number: string) {
    super(name, number);
  }
}

class SpecialCar extends Car {
  price = 2;
  constructor(name: string, number: string) {
    super(name, number);
  }
}

class Trip {
  car: Car; // 类型是 Car 这样可以兼容 Car的子类（依赖倒置原则）
  constructor(car: Car) {
    this.car = car;
  }
  start() {
    console.log(`行程开始，name ${this.car.name}, number ${this.car.number}`);
  }
  end() {
    console.log(`行程结束，价格${this.car.price * 5}`);
  }
}
```

## 停车场(面试题)

1. 某停车场，分 3 层，每层 100 车位
2. 每个车位可以监控车辆的进入和离开
3. 车辆进入前，显示每层的空余车位数量
4. 车辆进入时，摄像头可识别车牌号和时间
5. 车辆出来时，出口显示器显示车牌号和停车时长

#### 分析

##### 数据模型

- 车
- 停车场，层，成为
- 摄像头，出口显示屏

#### 流程

1. 进入之前：显示当前空余车位
2. 进入：停车数量 +1，计算开始时间
3. 离开：计算结束时间，停车数量 -1

![停车场问题](/public/images/design-patterns/022.png)
