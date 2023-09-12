---
title: 'Lock锁🔐'
date: 2023-09-10
type: JUC
---

## synchronized 传统的方式

```java

/*
 * 传统的 Synchronized
 * Synchronized 方法 和 Synchronized 块
 * 1、架构：高内聚，低耦合
 * 2、套路：线程操作资源类，资源类是单独的
 */
public static void main(String[] args) throws InterruptedException {
    // 1、新建资源类
    Ticket ticket = new Ticket();

    // 2、线程操纵资源类
    new Thread(new Runnable() {
      public void run() {
            for (int i = 1; i <=40; i++) ticket.saleTicket();
        }
    },"A").start();

    new Thread(new Runnable() {
      public void run() {
            for (int i = 1; i <=40; i++) ticket.saleTicket();
        }
    },"B").start();

    new Thread(new Runnable() {
        public void run() {
            for (int i = 1; i <=40; i++) ticket.saleTicket();
        }
    },"C").start();
}


// 单独的资源类，属性和方法！
// 这样才能实现复用！
class Ticket{
    private int number = 30;

    // 同步锁，厕所 =>close=>； synchronized 这是一个关键字
    public synchronized void saleTicket(){
        if (number>0){
            System.out.println(Thread.currentThread().getName() + "卖出第"+(number--)+"票，还剩:"+number);
        }
    }
}
```

## Lock 锁

```java
/*
 * JUC之后的操作
 * Lock锁 + lambda表达式！
 */

public static void main(String[] args) {
    // 1、新建资源类
    Ticket2 ticket = new Ticket2();
    // 2、线程操作资源类 , 所有的函数式接口都可以用 lambda表达式简化！
    // lambda表达式 (参数)->{具体的代码}
    new Thread(()->{for (int i = 1; i <= 40 ; i++) ticket.saleTicket();},"A").start();
    new Thread(()->{for (int i = 1; i <= 40 ; i++) ticket.saleTicket();},"B").start();
    new Thread(()->{for (int i = 1; i <= 40 ; i++) ticket.saleTicket();},"C").start();
}


class Ticket2{
    /**
     * 使用Lock，它是一个对象；
     * ReentrantLock 可重入锁：回家：大门 (卧室门，厕所门...)；
     * ReentrantLock 默认是非公平锁！
     * 非公平锁: 不公平 （插队，后面的线程可以插队）
     * 公平锁: 公平（只能排队，后面的线程无法插队）
     */
    private Lock lock = new ReentrantLock();

    private int number = 30;

    public void saleTicket(){
        lock.lock(); // 加锁
        try {
            // 业务代码
            if (number>0) System.out.println(Thread.currentThread().getName() + "卖出第"+(number--)+"票，还剩:"+number);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            lock.unlock(); // 解锁
        }
    }
}
```

## Synchronized 和 Lock 区别

1. Synchronized 是一个关键字、Lock 是一个对象

2. Synchronized 无法尝试获取锁，Lock 可以尝试获取锁，判断；

3. Synchronized 会自动释放锁（a 线程执行完毕，b 如果异常了，也会释放锁），lock 锁是手动释放锁！如果你不释放就会死锁。

4. Synchronized （线程 A（获得锁，如果阻塞），线程 B（等待，一直等待）；）lock，可以尝试获取锁，失败了之后就放弃
   ![Lock](/public/images/juc/0001-lock.png)
5. Synchronized 一定是非公平的，但是 Lock 锁可以是公平的，通过参数设置；

6. 代码量特别大的时候，我们一般使用 Lock 实现精准控制，Synchronized 适合代码量比较小的同步问题；
