---
title: '线程基础'
date: 2023-09-10
type: JUC
---

## 什么是进程和线程？

- 进程：QQ.exe

- 线程：打字、自动保存.....

一个进程可以包含多个线程，一个进程至少有一个线程！ **Java 程序至少有两个线程： GC、Main**

## 并发、并行

- 并发：多个线程操作同一个资源，交替执行的过程！

- 并行：多个线程同时执行！只有在多核 CPU 下才能完成！

**使用多线程或者并发编程的目的：提高效率，让 CPU 一直工作，达到最高处理性能！**

## 线程有几种状态

**6 种**

> java 能够创建线程吗？ 不能！

```java
public enum State {
    NEW,// 新建

    RUNNABLE,// 运行

    BLOCKED,// 阻塞

    WAITING,// 等待

    TIMED_WAITING,// 延时等待

    TERMINATED; // 终止
}
```

## wait/Sleep 的区别

1. 类不同

```bash
wait ： Obejct 类     Sleep Thread

在juc编程中，线程休眠怎么实现？ Thread.Sleep

TimeUnit.SECONDS.sleep(3);// 时间单位
```

2. 会不会释放资源？

   - sleep：抱着锁睡得，不会释放锁！
   - wait：会释放锁！

3. 使用的范围是不同的

   - wait 和 notify 是一组，一般在线程通信的时候使用
   - sleep 就是一个单独的方法，在那里都可以用！

4. 关于异常
   - sleep 需要捕获异常！
