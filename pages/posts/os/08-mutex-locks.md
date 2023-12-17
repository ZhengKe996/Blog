---
title: 'Mutex Locks(互斥锁)'
date: 2023-12-17
type: OS
---

# CRITICAL-SECTION PROBLEM(临界区问题)

- Each concurrent process has a segment of code, called a **critical section**, in which the process may be changing **common variables**, updating a table, writing a file, and so on.
- The important feature of the system is that, when one process is executing in its critical section, no other process is allowed to execute in its critical section. That is, **NO** two processes are executing in their critical sections **at the same time**.
- **The critical-section problem** is to design a protocol that the processes can use to cooperate.

## 进程进出临界区协议

- 进入临界区前在 **entry section** 要请求许可；
- 离开临界区后在 **exit section** 要归还许可。

![进程进出临界区协议](/public/images/os/08/section.png)

## 临界区管理准则

- **Mutual exclusion** (Mutex)：互斥
- **Progress**：前进
- **Bounded waiting**：有限等待

## 软件解决临界区管理

- 实现需要较高的编程技巧
- 两个进程的实现代码是不对称的，当处理超过 2 个进程的时候，代码的复杂度会变得更大

# 互斥锁

## MUTEX LOCKS

Operating-systems designers build software tools to solve the critical-section problem. The simplest of these tools is the mutex lock.

- A process must acquire the lock before entering a critical section;
- It must release the lock when it exits the critical section.

## 原子操作

**Atomic operations** mean the operation can **NOT** be interrupted while it's running.

- 原子操作（原语）是操作系统重要的组成部分，下面 2 条硬件指令都是原子操作，它们可以被用来实现对临界区的管理（也就是“锁”）。

## 锁的实现

![锁的实现](/public/images/os/08/lock-come.png)

# 忙式等待（BUSY WAITING）

忙式等待是指占用 CPU 执行空循环实现等待这种类型的互斥锁也被称为“**自旋锁**”(spin lock)

- **缺点**：浪费 CPU 周期，可以将进程插入等待队列以让出 CPU 的使用权；
- **优点**：进程在等待时没有上下文切换，对于使用锁时间不长的进程，自旋锁还是可以接受的；在多处理器系统中，自旋锁的优势更加明显。
