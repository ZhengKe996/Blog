---
title: '八锁问题🔐'
date: 2023-09-25
type: JUC
---

## 问题一：

```java
class Phone{
  public synchronized void sendEmail(){
    System.out.println("sendEmail");
  }

  public synchronized void sendSMS(){
    System.out.println("sendSMS");
  }
}
public class LockDemo01 {
  public static void main(String[] args) throws InterruptedException {
      Phone phone = new Phone();
      new Thread(()->{ phone.sendEmail(); },"A").start();
      TimeUnit.SECONDS.sleep(2);
      new Thread(()->{ phone.sendSMS(); },"B").start();
  }
}
```

**标准的访问情况下，先执行 sendEmail 还是 sendSMS**

答案：sendEmail

原因：被 synchronized 修饰的方法，锁的对象是调用者本身，这里的两个方法调用的对象是同一个，先调用先执行！

## 问题二：

```java
class Phone{
  public synchronized void sendEmail() throws InterruptedException {
    TimeUnit.SECONDS.sleep(3);
    System.out.println("sendEmail");
  }

  public synchronized void sendSMS(){
    System.out.println("sendSMS");
  }
}
public class LockDemo02 {
  public static void main(String[] args) throws InterruptedException {
      Phone phone = new Phone();
      new Thread(()->{
        try {
          phone.sendEmail();
        } catch (InterruptedException e) {
          e.printStackTrace();
        }},"A").start();
      TimeUnit.SECONDS.sleep(2);
      new Thread(()->{ phone.sendSMS(); },"B").start();
  }
}
```

**sendEmail 休眠 3 秒后 ，先执行 sendEmail 还是 sendSMS**

答案：sendEmail

原因：被 synchronized 修饰的方法，锁的对象是调用者本身，这里的两个方法调用的对象是同一个，先调用先执行！

## 问题三：

```java
class Phone{
  public synchronized void sendEmail() throws InterruptedException {
    TimeUnit.SECONDS.sleep(3);
    System.out.println("sendEmail");
  }

  public void hello(){
    System.out.println("hello");
  }
}
public class LockDemo03 {
  public static void main(String[] args) throws InterruptedException {
      Phone phone = new Phone();
      new Thread(()->{
        try {
          phone.sendEmail();
        } catch (InterruptedException e) {
          e.printStackTrace();
        }},"A").start();

      TimeUnit.SECONDS.sleep(2);

      new Thread(()->{ phone.hello(); },"B").start();
  }
}
```

**增加一个普通方法，请问先打印那个 sendEmail 还是 hello**

答案：hello

原因：新增加的这个方法没有 synchronized 修饰，不是同步方法，不受锁的影响！

## 问题四：

```java
class Phone{
  public synchronized void sendEmail() throws InterruptedException {
    TimeUnit.SECONDS.sleep(3);
    System.out.println("sendEmail");
  }

  public synchronized void sendSMS(){
    System.out.println("sendSMS");
  }
}
public class LockDemo04 {
  public static void main(String[] args) throws InterruptedException {
      Phone phone1 = new Phone();
      Phone phone2 = new Phone();

      new Thread(()->{
        try {
          phone1.sendEmail();
        } catch (InterruptedException e) {
          e.printStackTrace();
        }
      },"A").start();


      TimeUnit.SECONDS.sleep(1);
      new Thread(()->{
        phone2.sendSMS();
      },"B").start();
  }
}
```

**两个手机，请问先执行 sendEmail 还是 sendSMS**

答案：sendSMS
原因： 被 synchronized 修饰的方式，锁的对象是调用者；我们这里有两个调用者，两个方法在这里是两个锁

## 问题五：

```java
class Phone{
  public static synchronized void sendEmail() throws InterruptedException {
    TimeUnit.SECONDS.sleep(3);
    System.out.println("sendEmail");
  }

  public static synchronized void sendSMS(){
    System.out.println("sendSMS");
  }
}
public class LockDemo05 {
  public static void main(String[] args) throws InterruptedException {
      Phone phone = new Phone();

      new Thread(()->{
        try { phone.sendEmail(); }
        catch (InterruptedException e) { e.printStackTrace();}
      },"A").start();

      TimeUnit.SECONDS.sleep(1);

      new Thread(()->{ phone.sendSMS(); },"B").start();
  }
}
```

**两个静态同步方法，同一个手机请问先执行 sendEmail 还是 sendSMS**

答案：sendEmail

原因：只要方法被 static 修饰，锁的对象就是 Class 模板对象,这个则全局唯一！所以说这里是同一个锁 并不是因为 synchronized

## 问题六：

```java
class Phone{
  public static synchronized void sendEmail() throws InterruptedException {
    TimeUnit.SECONDS.sleep(3);
    System.out.println("sendEmail");
  }

  public static synchronized void sendSMS(){
    System.out.println("sendSMS");
  }
}
public class LockDemo06 {
  public static void main(String[] args) throws InterruptedException {
      Phone phone = new Phone();
      Phone phone2 = new Phone();

      new Thread(()->{
        try {
          phone.sendEmail();
        } catch (InterruptedException e) {
          e.printStackTrace();
        }
      },"A").start();

      TimeUnit.SECONDS.sleep(1);

      new Thread(()->{
        phone2.sendSMS();
      },"B").start();  }
}
```

**两个静态同步方法，两个手机，请问先执行 sendEmail 还是 sendSMS**

答案：sendEmail
原因：只要方法被 static 修饰，锁的对象就是 Class 模板对象,这个则全局唯一！所以说这里是同一个锁，并不是因为 synchronized

## 问题七：

```java
class Phone{
 public static synchronized void sendEmail() throws InterruptedException {
    TimeUnit.SECONDS.sleep(3);
    System.out.println("sendEmail");
  }

  public synchronized void sendSMS(){
    System.out.println("sendSMS");
  }
}
public class LockDemo07 {
  public static void main(String[] args) throws InterruptedException {
      Phone phone = new Phone();

      new Thread(()->{
        try {
          phone.sendEmail();
        } catch (InterruptedException e) {
          e.printStackTrace();
        }
      },"A").start();

      TimeUnit.SECONDS.sleep(1);

      new Thread(()->{
        phone.sendSMS();
      },"B").start();  }
}
```

**一个普通同步方法，一个静态同步方法，只有一个手机，请问先执行 sendEmail 还是 sendSMS**

答案：sendSMS
原因：

1. synchronized 锁的是这个调用的对象
2. static 锁的是这个类的 Class 模板

**这里是两个锁！**

## 问题八:

```java
class Phone{
 public static synchronized void sendEmail() throws InterruptedException {
    TimeUnit.SECONDS.sleep(3);
    System.out.println("sendEmail");
  }

  public synchronized void sendSMS(){
    System.out.println("sendSMS");
  }
}
public class LockDemo08 {
  public static void main(String[] args) throws InterruptedException {
      Phone phone = new Phone();
      Phone phone2 = new Phone();

      new Thread(()->{
        try {
          phone.sendEmail();
        } catch (InterruptedException e) {
          e.printStackTrace();
        }
      },"A").start();

      TimeUnit.SECONDS.sleep(1);

      new Thread(()->{
        phone2.sendSMS();
      },"B").start();  }
}
```

**一个普通同步方法，一个静态同步方法，两个手机，请问先执行 sendEmail 还是 sendSMS**

答案：sendSMS
原因：

1. synchronized 锁的是这个调用的对象
2. static 锁的是这个类的 Class 模板

**这里是两个锁！**
