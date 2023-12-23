---
title: 'Introduction(操作系统介绍)'
date: 2023-12-06
type: Operating
---

## 什么是操作系统？

- 智能手机、平板电脑、智能手表、智能汽车
- 物联网设备
- 洗衣机等
- Computer Operating System

### 计算机系统层次结构

![计算机系统层次结构](/public/images/os/01/system-structure.png)

### INTERFACE

接口是连接两个物体的边界，通过这个界面，两边可以很好地对话。

### VIRTUAL MACHINE

操作系统向用户提供一个容易理解和使用的“计算机”（虚拟的），用户对这个“计算机”的操作都将被操作系统转成对计算机硬件的操作。
![VIRTUAL MACHINE](/public/images/os/01/virtual-machine.png)

### 操作系统能做什么？

从用户的角度

1. 提供良好的用户界面
2. 标准的函数库
3. 使得编程更加方便并且不容易出错

从系统的角度

1. 管理资源
   - 硬件资源(处理机，存储器，设备)
   - 信息资源(文件)
2. 解决申请资源时产生的冲突
3. 阻止错误的产生和对计算机不正当的使用

### 定义操作系统

- An **operating system** acts an intermediary between user of a computer and the computer hardware.
- The purpose of an operating system is to provide an environment in which a user can execute programs in a **convenient and efficient** manner.
- An operating system is **software** that manages the computer hardware.

## 计算机系统的组成

### HARD DISK（硬盘）

#### 主引导扇区(BOOT SECTOR)

- 硬盘的 0 柱面、0 磁头、1 扇区称为主引导扇区，在这扇区里存放着一段代码：主引导记录 MBR(Main Boot Record)，它用于硬盘启动时将系统控制权转给用户指定的、在分区表中登记了某个操作系统分区。
- MBR 的内容是在硬盘分区时由分区软件写入该扇区的，MBR 不属于任何一个操作系统，不随操作系统的不同而不同，即使不同，MBR 也不会夹带操作系统的性质，具有公共引导的特性。

### BOOTSTRAP OF COMPUTER

1. 打开电源
2. CPU 将控制权交给 BIOS （基本输入输出系统，存放在 CMOS 中）
3. BIOS 运行一个程序：通电自测试程序 BIOS 确认所有外部设备：硬盘或扩充卡
4. BIOS 找到磁盘的引导区，将其中的主引导程序 bootloader 装入 内存。（主引导程序是一段代码，它可以将 OS 余下部分装入 内存）
5. 引导操作系统结束，操作系统接管计算机
6. 操作系统等待事件发生……

### 中断

- 当有事件（Event）发生时，CPU 会收到一个中断（Interrupt）信号，可以是硬中断也可以是软件中断。
- CPU 会停下正在做的事，转而执行中断处理程序，执行完毕会回到之前被中断的地方继续执行。
- Operating System is an **INTERRUPT driven** system.

### STORAGE SYSTEM(存储系统)

1. CPU 负责将指令(Instruction)从内存（Memory）读入，所以程序必须在内存中才能运行。
2. 内存以字节为存储单位，每个字节都有一个地址与之对应。通过 load/store 指令即可访问指定地址的内存数据：

   - load：将内存数据装入寄存器（Register）
   - store：将寄存器数据写入内存

### I/O 结构

- 存储器只是众多 IO 设备中的一种，IO 设备是计算机体系结构中种类最丰富的设备类型，而且他有着很 强的扩展性。
- 管理 IO 设备是操作系统非常重要的组成部分，操作系统中有一个专门的 IO 子系统负责完成这项工作。

![I/O 结构](/public/images/os/01/io-structure.png)

## 计算机系统体系结构

### 单处理器系统 Single-processor System

- 只有一颗主 CPU，执行通用指令集。
- 带有其他专用处理器，为特定设备服务，如：磁盘、键盘、图形控制器等。

  它们能够执行的指令有限，不处理用户进程
  操作系统会向它们发出任务，并监控它们的状态

### 多处理器系统 Multiprocessor/Multicore System

- 有两个或多个紧密通信的 CPU，它们共享计算机总 线、时钟、内存和外设等。

  - 非对称处理（Asymmetric multiprocessing）
  - 对称处理（Symmetric MuliProcessing）

![多处理器系统](/public/images/os/01/multiprocessor-systems.png)

### 集群系统 Clustered System

- 该系统由若干节点（node）通过网络连接在一起， 每个节点可为单处理器系统或多处理器系统，节点之间是松耦合（loosely coupled）关系。
  - 高可用性（high availability）
  - 高性能计算（high-performance computing）

## 操作系统结构

### 多道程序设计

- 操作系统最重要的一点是具有多道程序(multiprogramming )能力。
- 单道程序不能让 CPU 和 IO 设备始终忙碌，多道程序设计通过安排任务使用得 CPU 总有一个执行任务，从而提高 CPU 利用率。
- 实现的硬件保证：处理器和 IO 设备具备并行工作的能力

### 分时系统

- 分时系统（time sharing）也称多任务系统（multi-tasking），是多道程序设计的自然延伸。
- 允许多个用户共享一台计算机
- 用户只有输入和输出设备
- 分时系统为每个用户轮流分配等量的 CPU 时间
- 用户从发出指令到得到即时结果的时间称为响应时间 第一个分时系统 CTSS 由 MIT 于 1962 年开发出来

### 引发的其他模式

1. 处理器调度（CPU Scheduling）
2. 交换（Swapping）
3. 虚拟内存（Virtual Memory）
4. 磁盘管理（Disk Management）
5. 同步（Synchronization）
6. 死锁（Deadlock）
