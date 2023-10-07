---
title: 'ReadWriteLock(读写锁)🔐'
date: 2023-10-07
type: JUC
---

![ReadWriteLock](/public/images/juc/0006-write-read-lock.png)

## 未使用读写锁

```java
class MyCache {
    private volatile Map<String, Object> map = new HashMap<>();

    // Read: 支持多线程同时读
    public void get(String key) {
        System.out.println(Thread.currentThread().getName() + "Read: " + key);
        Object o = map.get(key);
        System.out.println(Thread.currentThread().getName() + " Result=>: " + o);
    }

    // Write: 应该保证原子性
    public void put(String key, Object value) {
        System.out.println(Thread.currentThread().getName() + "Write: " + key);
        map.put(key, value);
        System.out.println(Thread.currentThread().getName() + " Write OK");
    }
}
```

执行代码：

```java
public static void main(String[] args) {
    MyCache myCache = new MyCache();
    for (int i = 1; i <= 5; i++) {
        final int tempInt = i;
        new Thread(() -> {
            myCache.put(tempInt + "", tempInt + "");
        }, String.valueOf(i)).start();
    }

    for (int i = 1; i <= 5; i++) {
        final int tempInt = i;
        new Thread(() -> {
            myCache.get(tempInt + "");
        }, String.valueOf(i)).start();
    }

}
```

执行结果：
![ReadWriteLock](/public/images/juc/0006-write-read-lock2.png)

## 读写锁 🔐

```java
class MyCacheLock {
    private volatile Map<String, Object> map = new HashMap<>();

    private ReadWriteLock readWriteLock = new ReentrantReadWriteLock();

    // Read: 支持多线程同时读
    public void get(String key) {
        readWriteLock.readLock().lock();
        try {
            System.out.println(Thread.currentThread().getName() + "Read: " + key);
            Object o = map.get(key);
            System.out.println(Thread.currentThread().getName() + " Result=>: " + o);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            readWriteLock.readLock().unlock();
        }
    }

    // Write: 应该保证原子性
    public void put(String key, Object value) {
        readWriteLock.writeLock().lock();
        try {
            System.out.println(Thread.currentThread().getName() + "Write: " + key);
            map.put(key, value);
            System.out.println(Thread.currentThread().getName() + " Write OK");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            readWriteLock.writeLock().unlock();
        }
    }
}
```

执行结果：
![ReadWriteLock](/public/images/juc/0006-write-read-lock3.png)

<hr/>

[测试文件地址](https://github.com/ZhengKe996/JUC-Code/tree/main/src/main/java/fun/timu/rwlock/ReadAndWriteLock.java)
