---
title: 'Threads(线程)'
date: 2023-12-10
type: OS
---

# 线程定义

- 一个应用通常需要同时处理很多工作，比如一个 Web 浏览器，可能需要同时处理文字和图片，这些同时执行的任务可称为“执行流”，我们不希望它们是**顺序执行**的。
- 早期，每个执行流都要创建一个进程来实现，但是进程的创建需要消耗大量的时间和资源。
- 现在，和一个应用相关的所有执行任务都装在一个进程里，这些进程内部的执行任务就是“**线程**”（Thread）。

![线程定义](/public/images/os/05/thread.png)

## 采用多线程的优点

- 响应性
- 资源共享
- 经济
- 可伸缩性

## DEFINITION OF THREAD

![线程定义](/public/images/os/05/definition-of-thread.png)

# 多线程模型

## 多核编程

在多处理器系统中，多核编程机制让应用程序可以更有效地将自身的多个执行任务（**并发**的线程）分散到不同的处理器上运行，以实现**并行**计算。

![多核编程](/public/images/os/05/multicore-programming.png)

## 多线程模型

- 用户线程 ULT（User Level Thread）:ULT 在 user mode 下运行，它的管理无需内核支持。
- 内核线程 KLT（Kernel Level Thread）:KLT 在 kernel mode 下运行，由操作系统支持与管理。

## M:1 模型(已淘汰)

优点: "逻辑上"的多个执行流(抽象)

缺点: 实际上共享一个 KLT(不是并发、并行)，当一个线程占用时 CPU 时，可能会导致其他线程处于等待(Wait)状态(用户无法感知)

![M:1](/public/images/os/05/m-1-model.png)

## 1:1 模型(NPTL)

优点: 并发+并行

缺点: 内核开销大(时间、空间)

![1:1](/public/images/os/05/1-1-model.png)

## M:M 模型(NGPT)

优点: 节省内核开销

缺点: 实现复杂

![M:M](/public/images/os/05/m-m-model.png)
