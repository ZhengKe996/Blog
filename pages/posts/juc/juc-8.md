---
title: '线程池'
date: 2023-10-07
type: JUC
---

## 池化技术

程序运行的本质：占用系统资源！ 提高程序的使用率，降低我们一个性能消耗

线程池、连接池、内存池、对象池 ............

为什么要用线程池：线程复用

## 关于线程池

三大方法、七大参数、4 种拒绝策略

```java
public static void main(String[] args) {
      // 单例，只能有一个线程！
      // ExecutorService threadPool = Executors.newSingleThreadExecutor();
      // 固定的线程数
      // ExecutorService threadPool = Executors.newFixedThreadPool(8);
      // 遇强则强！可伸缩！
        ExecutorService threadPool = Executors.newCachedThreadPool();

      try {
          // 线程池的使用方式！
          for (int i = 0; i < 30; i++) {
              threadPool.execute(() -> {
                  System.out.println(Thread.currentThread().getName() + " ok");
              });
          }
      } catch (Exception e) {
          e.printStackTrace();
      } finally {
          threadPool.shutdown(); // 使用完毕后需要关闭！
      }
  }
```

```java
// 单例模式
public static ExecutorService newSingleThreadExecutor() {
    return new FinalizableDelegatedExecutorService
        (new ThreadPoolExecutor(1, 1,
                                0L, TimeUnit.MILLISECONDS,
                                new LinkedBlockingQueue<Runnable>()));
}

// 固定的线程数
public static ExecutorService newFixedThreadPool(int nThreads) {
    return new ThreadPoolExecutor(nThreads, nThreads,
                                  0L, TimeUnit.MILLISECONDS,
                                  new LinkedBlockingQueue<Runnable>());
}

// 可伸缩
public static ExecutorService newCachedThreadPool() {
    return new ThreadPoolExecutor(0, Integer.MAX_VALUE, // 约等于21亿
                                  60L, TimeUnit.SECONDS,
                                  new SynchronousQueue<Runnable>());
}

// ThreadPoolExecutor 方法实现

public ThreadPoolExecutor(int corePoolSize, // 核心池线程数大小 (常用)
                              int maximumPoolSize,  // 最大的线程数大小 (常用)
                              long keepAliveTime, // 超时等待时间 (常用)
                              TimeUnit unit, // 时间单位 (常用)
                              BlockingQueue<Runnable> workQueue, // 阻塞队列(常用)
                              ThreadFactory threadFactory, // 线程工厂
                              RejectedExecutionHandler handler // 拒绝策略(常用)) {
    if (corePoolSize < 0 ||
        maximumPoolSize <= 0 ||
        maximumPoolSize < corePoolSize ||
        keepAliveTime < 0)
        throw new IllegalArgumentException();
    if (workQueue == null || threadFactory == null || handler == null)
        throw new NullPointerException();
    this.acc = System.getSecurityManager() == null ?
        null :
    AccessController.getContext();
    this.corePoolSize = corePoolSize;
    this.maximumPoolSize = maximumPoolSize;
    this.workQueue = workQueue;
    this.keepAliveTime = unit.toNanos(keepAliveTime);
    this.threadFactory = threadFactory;
    this.handler = handler;
}
```

## 自定义线程池

```java
ExecutorService threadPool = new ThreadPoolExecutor(
        2,
        5,
        3L,
        TimeUnit.SECONDS,
        new LinkedBlockingDeque<>(3),
        Executors.defaultThreadFactory(),
        new ThreadPoolExecutor.CallerRunsPolicy());
```

## 四大拒绝策略

![](/public/images/juc/0008-pool.png)

- ThreadPoolExecutor.AbortPolicy()； 抛出异常，丢弃任务
- ThreadPoolExecutor.DiscardPolicy()；不抛出异常，丢弃任务
- ThreadPoolExecutor.DiscardOldestPolicy()； 尝试获取任务，不一定执行！
- ThreadPoolExecutor.CallerRunsPolicy()； 哪来的去哪里找对应的线程执行！

## 最大线程池如何设置？

**CPU 密集型：** 根据 CPU 的处理器数量来定！保证最大效率

**IO 密集型：** 50 个线程都是进程操作大 io 资源, 比较耗时！ > 这个常用的 IO 任务数！

<hr/>

[测试文件地址](https://github.com/ZhengKe996/JUC-Code/tree/main/src/main/java/fun/timu/pool/ThreadPoolDemo.java)
