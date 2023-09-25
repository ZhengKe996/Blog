---
title: '生产者消费者问题'
date: 2023-09-10
type: JUC
---

**线程和线程之间本来是不能通信的，但是有时候我们需要线程之间可以协调操作：**

## Synchronized 普通版

```java
/*
目的： 有两个线程：A  B ，还有一个值初始为0，
       实现两个线程交替执行，对该变量 + 1，-1；交替10次
 */

public static void main(String[] args) {
    Data data = new Data();
    // +1
    new Thread(()->{
        for (int i = 1; i <=10 ; i++) {
            try {
                data.increment();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    },"A").start();
    // -1
    new Thread(()->{
        for (int i = 1; i <=10 ; i++) {
            try {
                data.decrement();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    },"B").start();
}

// 线程之间的通信： 判断  执行  通知
class Data{

    private int number = 0;
    // +1
    public synchronized void increment() throws InterruptedException {
        if (number!=0){ // 判断是否需要等待
            this.wait();
        }
        number++; // 执行
        System.out.println(Thread.currentThread().getName()+"\t"+number);
        // 通知
        this.notifyAll(); //唤醒所有线程
    }
    // -1
    public synchronized void decrement() throws InterruptedException {
        if (number==0){ // 判断是否需要等待
            this.wait();
        }
        number--; // 执行
        System.out.println(Thread.currentThread().getName()+"\t"+number);
        // 通知
        this.notifyAll(); //唤醒所有线程
    }
}
```

**四条线程可以实现交替吗？不能，会产生虚假唤醒问题**
![wait](/public/images/juc/0001-wait.png)

## Synchronized （while 改进后）

```java
// 此处省略部分代码...

// 线程之间的通信： 判断  执行  通知
class Data{
    private int number = 0;
    // +1
    public synchronized void increment() throws InterruptedException {
        while (number!=0){ // 判断是否需要等待
            this.wait();
        }
        number++; // 执行
        System.out.println(Thread.currentThread().getName()+"\t"+number);
        // 通知
        this.notifyAll(); //唤醒所有线程
    }
    // -1
    public synchronized void decrement() throws InterruptedException {
        while (number==0){ // 判断是否需要等待
            this.wait();
        }
        number--; // 执行
        System.out.println(Thread.currentThread().getName()+"\t"+number);
        // 通知
        this.notifyAll(); //唤醒所有线程
    }
}
```

## 新版的写法 JUC 挂钩！

![wait](/public/images/juc/0002-juc.png)

```java
public static void main(String[] args) {
    Data2 data = new Data2();

    new Thread(()->{
        for (int i = 1; i <= 10; i++) {
            try {
                data.print5();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    },"A").start();

    new Thread(()->{
        for (int i = 1; i <= 10; i++) {
            try {
                data.print10();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    },"B").start();

    new Thread(()->{
        for (int i = 1; i <= 10; i++) {
            try {
                data.print15();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    },"C").start();
}

// 资源类
class Data2{
  private int number = 1; // 1A 2B  3C
  private Lock lock = new ReentrantLock();
  // 实现精准访问
  private Condition condition1 = lock.newCondition();
  private Condition condition2 = lock.newCondition();
  private Condition condition3 = lock.newCondition();

  public void print5() throws InterruptedException {

      lock.lock();

      try {
          // 判断
          while (number!=1){
              condition1.await();
          }
          // 执行
          for (int i = 1; i <= 5; i++) {
              System.out.println(Thread.currentThread().getName() + "\t" + i);
          }
          // 通知第二个线程干活！
          number = 2;
          condition2.signal(); // 唤醒
      } catch (InterruptedException e) {
          e.printStackTrace();
      } finally {
          lock.unlock(); // 一定要解锁
      }
  }

  public void print10() throws InterruptedException {
      lock.lock();
      try {
          // 判断
          while (number!=2){
              condition2.await();
          }
          // 执行
          for (int i = 1; i <= 10; i++) {
              System.out.println(Thread.currentThread().getName() + "\t" + i);
          }
          // 通知3干活
          number = 3;
          condition3.signal();
      } catch (InterruptedException e) {
          e.printStackTrace();
      } finally {
          lock.unlock();
      }

  }

  public void print15() throws InterruptedException {
      lock.lock();
      try {
          // 判断
          while (number!=3){
              condition3.await();
          }
          // 执行
          for (int i = 1; i <= 15; i++) {
              System.out.println(Thread.currentThread().getName() + "\t" + i);
          }
          // 通知 1 干活
          number = 1;
          condition1.signal();
      } catch (InterruptedException e) {
          e.printStackTrace();
      } finally {
          lock.unlock();
      }
  }
}
```

<hr/>
[测试文件地址](https://github.com/ZhengKe996/JUC-Code/tree/main/src/main/java/fun/timu/demo01)
