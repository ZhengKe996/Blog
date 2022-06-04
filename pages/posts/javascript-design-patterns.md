---
title: 前端常用设计模式
date: 2022-06-04
draft: true
lang: zh
duration: 35min
---

# 面向对象 和 UML 类图

### 面向对象

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

### UML

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

###### 实现

![UML实现接口](/public/images/design-patterns/002.png)

###### 泛化

![UML泛化](/public/images/design-patterns/003.png)

###### 关联

![UML关联](/public/images/design-patterns/004.png)

### 关联关系的细化

- 聚合 - 整体包含部分，部分可以脱离整体而单独存在
- 组合 - 整体包含部分，部分不可以脱离整体
- 依赖 - 不是属性关系，而是函数参数或返回值

![UML关联关系的细化](/public/images/design-patterns/005.png)

# 设计原则: 先设计 后模式

### S O L I D 五大设计原则

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

# 《Unix/Linux》设计哲学

### 大型系统的设计

![大型系统的设计](/public/images/design-patterns/006.png)

### 设计准则

- 小即是美
- 让每个程序只做一件事
- 快速建立原型
- 舍弃高效率，而更关注可移植性和扩展性
- 采用纯文本方式来存储数据
- 避免强制性的用户界面
- 允许用户定制环境(考虑多环境、扩展性)
- 寻求 90% 的解决方案

# 23 种设计模式

![大型系统的设计](/public/images/design-patterns/007.png)

### 从设计到模式

- 设计，即设计原则，设计思想
- 模式，前辈们总结出来的固定套路，直接套用
- 1955 年《设计模式：可复面向对象软件的基础》23 种设计模式

### 设计的价值

- 从需求到设计，从设计到开发
- 为何需要设计?
- 为何需要模式?

# 前端常用的 7 种设计模式

- 工厂模式
- 单例模式
- 观察者模式
- 迭代器模式
- 原型模式
- 装饰器模式
- 代理模式

# 工厂模式

### 简易的工厂模式

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

### 标准的工厂模式

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

### 是否符合设计原则

- 工厂和类分离，解耦
- 可以扩展多个类（派生类或平行的类）
- 工厂的创建逻辑也可以自由扩展

# 单例模式

前端对单例模式并不常用，但是单例思想随处可见

- 一个 对象/实例 只能被创建一次
- 创建之后缓存起来，以后继续用
- 即：一个系统只有一个
