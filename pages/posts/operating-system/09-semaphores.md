---
title: 'Semaphores(信号量)'
date: 2023-12-20
type: OperatingSystem
---

![信号量](/public/images/os/09/Semaphores.png)

# 信号量

**信号量(Semaphore)** 是一种比互斥锁更强大的**同步工具**，它可以提供更高级的方法来同步并发进程。
1965 年由荷兰学者 Dijkstra 提出

A semaphore S is **an integer variable** that, **apart from initialization**, is accessed **only through two standard atomic operations**: P (_proberen in Dutch_) and V(_verhogen in Dutch_).

- P：wait() operation
- V：signal() operation

## 信号量的实现

```bash
P(s){
  while(s<=0)
    do nothing;
  s--;
}

V(s){
  s++;
}
```

## BINARY SEMAPHORE(二元信号量)

二值信号量的值只能是 0 或 1，通常将其初始化为 1，用于实现互斥锁的功能。

```bash
semaphore mutex = 1;

process pi {
  P(mutex);
  critical section;
  V(mutex);
}
```

## COUNTING SEMAPHORE(一般信号量)

一般信号量的取值可以是任意数值，用于控制并发进程对共享资源的访问。

```bash
semaphore road = 2;
process Cari{
  P(road);
  pass the fork in the road.
  V(road);
}

```

# 信号量实现同步

![信号量实现同步](/public/images/os/09/problem.png)

## 同步问题

1. 同步问题实质是将异步的并发进程按照某种顺序执行；
2. 解决同步的本质就是要找到并发进程的交互点，利用 P 操作的等待特点来调节进程的执行速度；
3. 通常初始值为 0 的信号量可以让进程直接进行等待状态，直到另一个进程唤醒他

## 生产-消费者问题

生产者(P)与消费者(C)共用一个缓冲区，生产者不能往"满"的缓冲区中放产品，消费者不能从"空"的缓冲区中取产品。

![生产-消费者问题](/public/images/os/09/producer-consumer.png)

### 单缓冲解决方案

![单缓冲解决方案](/public/images/os/09/single-buffer-resolution.png)

### THE BOUNDED-BUFFER PROBLEM(有界缓冲区问题)

![有界缓冲区问题](/public/images/os/09/bounded-buffering-problem-1.png)
![有界缓冲区问题](/public/images/os/09/bounded-buffering-problem-2.png)
