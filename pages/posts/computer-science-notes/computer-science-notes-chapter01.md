---
title: 第一章：绪论
date: 2023-04-23
# draft: true
type: ComputerScienceNotes
lang: zh
# duration: 5min
---

## 知识点

- 计算机模型（图灵，冯诺依曼）
- 计算机发展史
- 计算机出现后所增加的社会和道德问题
- 计算机科学领域总览

### 图灵模型

阿兰·图灵 1937 年 通用计算设备设想：就是现在所说的 **图灵机**

### 数据处理器

接受输入数据、处理数据并产生输出数据的黑盒。
![数据处理器](/public/images/computer-science-notes/1.1.png)

### 可编程数据处理器

在数据处理器的基础上添加了 **程序**

1. 相同的程序，不同的输入数据。
2. 相同的输入数据，不同的程序。
3. 相同的输入数据，相同的程序。

![可编程数据处理器](/public/images/computer-science-notes/1.2.png)

### 冯·诺依曼模型

1944~1945 年 提出
两者区别：图灵模型只将数据存于计算机中，程序靠外部读取，而冯诺依曼模型将程序和数据都存在计算机中。

![冯·诺依曼模型](/public/images/computer-science-notes/1.3.png)

**四个子系统**：存储器、算术逻辑单元、控制单元、输入/输出单元

- 存储器：用于存储数据和程序的区域
- 算术逻辑单元：用于进行计算的单元（包括算术运算和逻辑运算）
- 控制单元：控制存储器，算术逻辑单元，输入/输出等子系统的单元
- 输入/输出：包括接收输入的设备，传出输出结果的设备，输入输出缓存区等一系列与输入/输出有关的系统

**冯．诺依曼模型中要求程序必须存储在内存中。**
在冯诺依曼模型中，程序被看作是一条条指令的集合体。

控制器按顺序从存储器中读入指令，解析指令，执行指令。

### 计算机组成部分

计算机由三大部分组成：计算机硬件、数据和计算机软件。

### 计算机发展史

**机械计算机器（1930 年以前）**

这个阶段下出现了许多用于计算的机器，但还没有提出计算机这个概念（简单的讲就是图灵发话以前）。

**电子计算机的诞生（1930 ～ 1950）**

这个时候开始出现计算机的雏形。早期的电子计算机都是基于图灵模型，换句话说，这个阶段的计算机的程序靠外部输入（打孔卡，人工接线等）。

**计算机的诞生（1950）**

这个阶段开始的计算机基本都是基于冯诺依曼模型的计算机。

**第一代计算机（1950 ～ 1959）**

这个阶段的计算机体积庞大，且使用真空管作为电子开关。

**第二代计算机（1959 ～ 1965）**

计算机开始缩小体积，并使用晶体管代替真空管。这个阶段开始出现高级计算机语言。

**第三代计算机（1965 ～ 1975）**

集成电路小型计算机。与此同时软件包开始出现，人们只需要买过来就能用，而不需要自己写程序。

**第四代计算机（1975 ～ 1985）**

电子工业的发展以允许将整个计算机的子系统做在单块电路板上。这个阶段出现了微型计算机和计算机网络。

**第五代计算机（1985 ～ 至今）**

这个阶段出现了我们现在所用的掌上计算机和台式计算机。

### 社会和道德问题

**社会问题主要有：**

- 依赖：部分人们认为计算机的便利会让人类产生依赖，一旦离开计算机人类的生活就会很困难。
- 社会公正：部分人们认为只有高端人群才能用得起计算机，这对低端人群不公正。
- 数字化分裂：用计算机的人群会跟不用计算机的人群产生分裂。

**道德问题主要有：**

- 隐私：计算机网络带来的通信和数据隐私问题。
- 版权：数据版权和电子版权等。
- 计算机犯罪：网络攻击、病毒攻击等。

### 计算机科学领域

计算机科学简单地讲包括两个领域：**系统领域和应用领域。**

系统领域主要指跟计算机软硬件直接相关的领域，如计算机体系结构，操作系统，计算机网络，算法，程序设计语言，软件工程等。

应用领域主要指与计算机的使用有关的领域，如数据库，人工智能等。

## 小结

_来源：计算机科学导论（第三版）p10_

- 阿兰．图灵在 1937 年首次提出了一个通用的计算设备的设想。他设想所有的计算都可能在一种特殊的机器上执行，这就是现在所说的图灵机。
- 基于冯．诺依曼模型建造的计算机分为 4 个子系统：存储器、算术逻辑单元、控制单元和输入/输出单元。冯．诺依曼模型指出程序必须存储在存储器中。
- 我们可以认为计算机由三大部分组成：计算机硬件、数据和计算机软件。
- 计算和计算机的历史可分为三个阶段：机械计算机器阶段（1930 年以前）；电子计算机阶段（1930 ～ 1950 年）；以及包括 5 个现代计算机时代的阶段。
- 计算机科学引发了一些周遭的问题。其中最为普遍的可以归类为社会问题和道德问题。
- 随着计算机的发明，带来了新的学科：计算机科学。如同其他任何学科一样，计算机科学现在被划分成几个领域。

### 复习题

1. 定义一个基于图灵模型的计算机。

> 基于图灵模型的计算机：外部输入数据 -> 程序处理数据 -> 输出数据

2. 定义一个基于冯诺依曼模型的计算机。

> 基于冯诺依曼模型的计算机包括：存储器、算术逻辑单元、控制单元、输入/输出单元。程序必须存储在存储器中。

3. 在基于图灵模型的计算机中，程序的作用是什么？

> 程序是一系列的指令集，计算机通过程序告诉机器如何处理输入，得到输出。

4. 在基于冯诺依曼模型的计算机中，程序的作用是什么？

> 程序是一系列的指令集，存储在存储器中，计算机通过程序告诉机器如何处理输入，得到输出。

5. 计算机中有哪些子系统？

> 存储器、算术逻辑单元、控制单元、输入/输出设备

6. 计算机中存储器子系统的功能是什么？

> 存储程序和数据

7. 计算机中 ALU 子系统的功能是什么？

> ALU（算术逻辑单元）：进行算术运算和逻辑运算

8. 计算机中控制单元子系统的功能是什么？

> 控制其他子系统

9. 计算机中输入/输出子系统的功能是什么？

> 输入：接收外部输入数据等输入功能
> 输出：将结果输出到外部等

10. 简述 5 个时代的计算机。

> - 第一代电子真空管计算机（1950~1959）
> - 第二代晶体管计算机（1959~1964）
> - 第三代中小规模集成电路计算机（1965~1975）
> - 第四代大规模超大规模集成电路计算机（1975~1985）出现计算机网络
> - 第五代计算机 掌上机与台式机诞生（1985~至今）
