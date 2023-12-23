---
title: 'Deadlocks(死锁)'
date: 2023-12-23
type: Operating
---

# DEADLOCK

- In a multiprogramming environment, several processes may compete for a finite number of resources.(在多道程序设计环境中，多个进程可能会竞争有限数量的资源。
  )
- A process requests resources; if the resources are **not available** at that time, the process enters a **waiting state**.(进程请求资源;如果此时资源不可用，则进程进入等待状态。)
- Sometimes, a waiting process is never again able to change state, because the resources it has requested are held by other waiting processes.(有时，等待进程再也不能更改状态，因为它所请求的资源由其他等待进程持有。)
- This situation is called a **deadlock**.

## 死锁与饥饿

- 饥饿： 进程长时间的等待
  - e.g.:低优先级进程总是等待高优先级所占有的进程
- 死锁：循环等待资源
  - e.g.:A 和 B 分别占有打印机和扫描仪,且同时分别申请扫描仪和打印机
- 注：
  - 饥饿可能终止
  - 如果无外部干涉，死锁无法终止

## 产生死锁的四个必要条件

- **互斥使用**：一个时刻，一个资源仅能被一个进程占有
- **不可剥夺**：除了资源占有进程主动释放资源，其它进程都不可抢夺其资源
- **占有和等待**：一个进程请求资源得不到满足等待时，不释放已占有资源
- **循环等待**(上面三个条件同时存在产生的结果)：每一个进程分别等待它前一个进程所占有的资源

## METHONDS FOR HANDLING DEADLOCKS(处理死锁的方法)

- Deadlocks are NOT allowed to appear. We must prevent or avoid deadlock state.(死锁不允许出现。我们必须防止或避免死锁状态。)
- Deadlocks are allowed to appear, but the system can detect them and recover.(允许出现死锁，但系统可以检测到它们并恢复。)
- We pretend that deadlocks never occur in the system.(我们假装死锁从未在系统中发生过。)

## 死锁的解决方案

- 死锁的防止 (Prevention) ：破坏四个必要条件之一
- 死锁的避免 (Avoidance)：允许四个必要条件同时存在，在并发进程中做出妥善安排避免死锁的发生
- 死锁的检测和恢复 (Detection)：允许死锁的发生，系统及时地检测死锁并解除它

# 死锁的避免

系统对进程的每一次资源申请都进行详细的计算，根据结果决定是分配资源还是让其等待，确保系统始终处于**安全状态**，避免死锁的发生。

**银行家算法（Banker's algorithm）**

- 已知系统中所有资源的种类和数量
- 已知进程所需要的各类资源最大需求量
- 该算法可以计算出当前的系统状态是否安全(寻找安全序列)

## 安全状态(SAFE STATE)

- A state is safe if the system can allocate resources to each process (up to its maximum) in some order and still avoid a deadlock. More formally, a system is in a safe state only if there exists a safe sequence.
- If no such sequence exists, then the system state is said to be unsafe.
- A safe state is **NOT** a deadlocked state.
- An unsafe state **MAY** lead to a deadlock.

## 银行家算法的优缺点

- 优点：允许死锁必要条件同时存在
- 缺点：缺乏实用价值
  - 进程运行前就要求知道其所需资源的最大数量
  - 要求进程是无关的，若考虑同步情况，可能会打乱安全序列
  - 要求进入系统的进程个数和资源数固定

# 死锁的检测

- 允许死锁发生，操作系统不断监视系统进展情况，判断死锁是否发生
- 一旦死锁发生则采取专门的措施，解除死锁并以最小的代价恢复操作系统运行
- 死锁检测的时机
  - 当进程等待时检测死锁（系统开销大）
  - 定时检测
  - 系统资源利用率下降时检测死锁

## 死锁定理

![死锁定理](/public/images/os/10/resource-1.png)
![死锁定理](/public/images/os/10/resource-2.png)
如果能在“资源分配图”中消去某进程的所有请求边和分配边，则称该进程为**孤立结点**。

- 可完全简化
- 不可完全简化

系统为死锁状态的**充分条件**是：当且仅当该状态的 “进程―资源分配图“是不可完全简化的。该充分条件称为**死锁定理**.

# 死锁的解除

1. **中止进程，强制回收资源**
   - 交通问题：将某列火车吊起来
   - 哲学家问题：将某个哲学家射死
2. **剥夺资源，但不中止进程**
3. **进程回退(roll back)** ：就像 DVD 的回退，好像最近一段时间什么都没有发生过
   - 交通问题：让某列火车倒车
   - 哲学家问题：让某个哲学家放下一把叉子
4. **重新启动**
   - 没有办法的办法，但却是一个肯定有效的办法

# HOW OS DO TO DEADLOCKS?(操作系统如何处理死锁?)

- In the absence of algorithms to detect and recover from deadlocks, we may arrive at a situation in which the system is in a deadlocked state yet has no way of recognizing what has happened. In this case, the undetected deadlock will cause the system's performance to deteriorate, because resources are being held by processes that cannot run and because more and more processes, as they make requests for resources, will enter a deadlocked state. Eventually, the system will stop functioning and will need to be restarted manually.
- (在缺乏检测死锁并从死锁中恢复的算法的情况下，我们可能会遇到这样一种情况:系统处于死锁状态，但无法识别发生了什么。在这种情况下，未检测到的死锁将导致系统性能下降，因为资源被无法运行的进程占用，而且越来越多的进程在请求资源时将进入死锁状态。最终，系统将停止运行，需要手动重新启动。)
- Although this method may not seem to be a viable approach to the deadlock problem, it is nevertheless used in most operating systems.
- 尽管这种方法似乎不是解决死锁问题的可行方法，但它仍然在大多数操作系统中使用。
