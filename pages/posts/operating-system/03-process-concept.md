---
title: 'Process Concept(进程概念)'
date: 2023-12-08
type: OperatingSystem
---

# 进程的定义

1. A program is a **passive entity**, such as a file containing a list of instructions stored on disk(often called an **executable file**).
2. A program becomes a process when an executable file is loaded into memory.
3. A process is an **active entity**, with a **program counter** specifying the next instruction to execute an a set of associated resources.

## PROGRAM COUNTER

**程序计数器（PC）**是一个 CPU 中的寄存器，里面存放下一条要执行指令的内存地址，在 Intel x86 和 Itanium 微处理器中，它叫做**指令指针**（Instruction Pointer，IP），有时又称为**指令地址寄存器**（instruction address register，IAR）、指令计数器。

CPU 在取完一条指令之后会将 PC 寄存器的值加“1”，以计算下条要执行指令的地址。

## PROCESS IN MEMORY

![PROCESS IN MEMORY](/public/images/os/03/process-in-memory.png)

## 并发的进程

- Concurrency：the fact of two or more events or circumstances happening or existing at the same time.
- 进程并发的动机：多道程序设计

- 并发与并行的区别：
  - 并发是指一个处理器同时处理多个任务。
  - 并行是指多个处理器或者是多核的处理器同时处理多个不同的任务。
  - 并发是逻辑上的同时发生（simultaneous），而并行是物理上的同时发生。

## 并发进程共享 CPU

- 并发进程可能无法一次性执行完毕，会走走停停。
- 一个进程在执行过程中可能会被另一个进程替换占有 CPU，这个过程称作“**进程切换**”。

![并发进程共享](/public/images/os/03/process-change.png)

## 进程的定义

1. 进程是一个程序的一次执行过程

   - 能完成具体的功能
   - 是在某个数据集合上完成的
   - 执行过程是可并发的

2. 进程是资源分配、保护和调度的基本单位

# 进程状态

## 进程状态（PROCESS STATE）

进程在执行期间自身的状态会发生变化，进程有三种基本状态，分别是：

1. 运行态（Running）：此时进程的代码在 CPU 上运行
2. 就绪态（Ready）：进程具备运行条件，等待分配 CPU
3. 等待态（Waiting）：进程在等待某些事件的发生（比如 IO 操作结束或是一个信号）

## 进程何时离开 CPU

1. 内部事件：进程**主动放弃(yield)**CPU，进入等待/终止状态。
2. 外部事件：进程被剥夺 CPU 使用权，进入就绪状态。这个动作叫**抢占(preempt)**。

## 进程状态转换图

![进程状态转换](/public/images/os/03/process-state-change.png)
