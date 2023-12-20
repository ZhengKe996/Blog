---
title: 'Synchronization(同步)'
date: 2023-12-14
type: OS
---

![](/public/images/os/07/synchronization.png)

# 并发

## 并发进程/线程

在内存中同时存在的若干个进程/线程，由操作系统的调度程序采用适当的策略将他(们)调度至 CPU(s)上运行，同时维护他们的状态队列。

- 多个并发进程/线程从**宏观上是同时在运行**；
- 从微观上看，他们的运行过程是走走停停；
- 并发的进程/线程之间是**交替执行**（Interleaving）。

## 并发进程之间的关系

- 独立关系
  - 并发进程分别在自己的变量集合上运行
  - 例如：chrome 进程和 music 进程
- 交互关系
  - 并发进程执行过程中需要共享或是交换数据
  - 例如：银行交易服务器上的 receiver 进程和 handler 进程交互的并发进程之间又存在着**竞争**和**协作**的关系

# 竞争

![竞争](/public/images/os/07/race.png)

# 协作

![协作](/public/images/os/07/cooperation.png)

# 异步产生的错误

会引发竞争条件（Race Condition）：一种这样的情况：**多个进程并发操作同一个数据**导致执行结果依赖于特定的进程执行顺序。

# 同步

**Process Synchronization** means a mechanism to maintain the consistency of data shared in cooperative processes.
(**进程同步**是指一种保持协作进程中共享数据一致性的机制。)

## Synchronization Tool Kits

- Mutex lock(互斥锁)
- Semaphore(信号量)
