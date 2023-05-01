---
title: 第十章：软件工程
date: 2023-04-23
draft: true
type: ComputerScienceNotes
lang: zh
---

### 软件生命周期

软件生命周期是软件工程中的一个基础概念
![软件生命周期](/public/images/computer-science-notes/10.1.png)

**开发过程模型**

- 瀑布模型：开发过程只有一个方向的流动。这意味着前一个阶段不结束，后一个阶段不能开始。
  - 优点：下一个阶段开始前，每一个阶段已经完成。
  - 缺点：难以定位问题，如果过程的一部分有问题，必须检查整个过程。

![软件生命周期](/public/images/computer-science-notes/10.2.png)

- 增量模型：一个持续的过程，每个版本新增一些细节

![软件生命周期](/public/images/computer-science-notes/10.3.png)

### 分析阶段

整个开发过程始于分析阶段，这个阶段生成规格说明文档，这个文档说明了软件要做什么，而没有说明如何去做。

#### 面向过程分析（结构化分析或经典分析）

- 数据流图：显示了系统中数据的流动

  - 方形盒：表示数据源或数据目的
  - 圆角矩形：表示过程（数据上的动作）
  - 末端开口矩形：数据存储的地方
  - 箭头：表示数据流

- 实体关系图
- 状态图：通常用于系统中实体状态在响应事件时会改变的情况

#### 面向对象分析

- 用例图：显示了用户与系统间的交互
  - 系统（圆角矩形表示）：执行功能
  - 动作者（线条小人）：使用系统的某人某事
  - 用例（模型）
  - 关系（线条）
- 类图
- 状态图：同面向过程分析，通常用于系统中实体状态在响应事件时会改变的情况

### 设计阶段

在设计阶段，系统所有的组成部分都被定义。

#### 面向过程设计

既要设计过程也要设计数据，整个系统被分解成一组过程或模块

**模块化**：将大项目分解成较小的部分，以便容易理解和处理

**耦合**：两个模块互相绑定紧密程度的度量；耦合越紧，独立性越差。

- 松散耦合的模块更可能被重用；
- 松散耦合的模块不容易在相关模块中产生错误；
- 当系统需要修改时，松散耦合的模块允许我们只修改需要改变的模块，而不会影响到不需要改变的模块。

**软件系统中模块间的耦合必须最小化。**

**内聚**：程序中处理过程相关紧密程度的度量。

**软件系统模块间的内聚必须最大化。**

#### 面向对象设计

设计阶段通过详细描述类的细节来继续。

### 软件质量

在实现阶段创建的软件质量是一个非常重要的问题。

**软件质量因素**
![软件质量因素](/public/images/computer-science-notes/10.4.png)

- 可操作性：设计系统的基本操作
  1. 准确性：通过故障平均时间等度量
  2. 高效性：主观的术语，用户指定性能指标，可测量
  3. 可靠性：综合各种因素，你觉得可靠就可靠
  4. 安全性：以黑客入侵得到数据的难易程度为参照
  5. 适用性：主观的，观察用户的使用
- 可维护性：保持系统正常运行并及时更新为参照。
  1. 可变性：系统是可变的
  2. 可修正性：程序发生故障后使程序恢复运行的时间
- 可迁移性：把数据和（或）系统从一个平台移动到另一个平台并重用代码的能力。
  1. 如果编写的函数可以在不同的程序和不同的项目中使用，那么它具有很好的重用性。
  2. 互用性是发送数据给其他系统的能力。
  3. 可移植性是一种把软件从一个硬件平台转移到另一个硬件平台的能力。

### 软件测试

目标是发现错误，这就意味着良好的测试策略能发现最多的错误。
![软件测试](/public/images/computer-science-notes/10.5.png)

#### 白盒测试

基于知道软件内部结构的。测试的目标是检查软件所有的部分是否全部设计出来。

- 每个模块中的所有独立的路径至少被测试过一次。
- 所有的判断结构（两路的或多路的）每个分支都被测试
- 每个循环被测试。
- 所有数据结构都被测试。

**基本路径测试**：是一种软件中每条语句至少被执行一次的方法。

**控制结构测试**：比基本路径测试更容易理解并且包含基本路径测试。

1. 条件测试：应用于模块中的条件表达式，条件测试用来检查是否所有的条件都被正确设置。
2. 数据流测试：基于通过模块的数据流的。这些用例涉及检查被用在赋值语句左边的变量的值。
3. 循环测试：使用测试用例检查循环的正确性。所有类型的循环（while、do 和 for）被仔细测试。

#### 黑盒测试

在不知道程序的内部也不知道程序是怎样工作的情况下测试程序。

- 穷尽测试
- 随机测试
- 边界值测试

### 文档

软件的正确使用和有效维护离不开文档，三种文档：用户文档、系统文档、技术文档，**文档是一个持续的过程。**

- 用户文档：指导用户熟悉软件包的各项特性。
- 系统文档：定义软件本身
  - 在分析阶段，收集的信息应该仔细地用文档记录。
  - 在设计阶段，最终版本中用到的工具必须记录在文档中。
  - 在实现阶段，代码的每个模块都应记录在文档中。
  - 最终产品使用的每种测试，连同它的结果都要记录在文档中。
- 技术文档：技术文档描述了软件系统的安装和服务