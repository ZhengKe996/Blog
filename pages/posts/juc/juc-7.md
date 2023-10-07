---
title: '阻塞队列'
date: 2023-10-07
type: JUC
---

![阻塞队列](/public/images/juc/0007-blockingqueue0.png)
![阻塞队列](/public/images/juc/0007-blockingqueue.png)

```java
 ArrayBlockingQueue<Object> blockingQueue = new ArrayBlockingQueue<>(3); // 阻塞队列Size=3
```

![阻塞队列](/public/images/juc/0007-blockingqueue1.png)

## 四组 API

| 方法 | 第一组会抛出异常 | 返回一个布尔值，不会抛出异常 | 延时等待         | 一直等待 |
| ---- | ---------------- | ---------------------------- | ---------------- | -------- |
| 插入 | add()            | offer（e）                   | offer（e，time） | put（）  |
| 取出 | remove()         | poll（）                     | poll（time）     | take（） |
| 检查 | element（）      | peek（）                     | -                | -        |

## 同步队列(SynchronousQueue)

**每一个 put 操作，就需要有一个 take 操作！**

<hr/>

[测试文件地址](https://github.com/ZhengKe996/JUC-Code/tree/main/src/main/java/fun/timu/blocking_queue)
