---
title: '不安全的集合类'
date: 2023-09-25
type: JUC
---

**只要是并发环境，你的集合类都不安全（List、Map、Set）‼️**

## List 不安全

- 故障现象：ConcurrentModificationException 并发修改异常
- 导致原因：add 方法没有锁
- 解决方案：
  1. `List<String> list = new Vector<>() // Jdk1.0 就存在，效率贼低`
  2. `List<String> list = Collections.synchronizedList(new ArrayList<>())`
  3. `List<String> list = new CopyOnWriteArrayList<>();`

**CopyOnWrite:** 写入是复制，多个调用者同时要相同的资源；这个有一个指针的概念

**CopyOnWriteArrayList 的 add 方法实现**

```java
public boolean add(E e) {
    final ReentrantLock lock = this.lock;
    lock.lock();
    try {
        Object[] elements = getArray();
        int len = elements.length;
        Object[] newElements = Arrays.copyOf(elements, len + 1);
        newElements[len] = e;
        setArray(newElements);
        return true;
    } finally {
        lock.unlock();
    }
}
```

## Set 不安全

- 故障现象：ConcurrentModificationException 并发修改异常
- 导致原因：add 方法没有锁
- 解决方案：
  1. `Set<String> set = Collections.synchronizedSet(new HashSet<>());`
  2. `Set<String> set = new CopyOnWriteArraySet();`

**CopyOnWriteArraySet 的本质是一个 CopyOnWriteArrayList**

```java
private final CopyOnWriteArrayList<E> al;
...
public boolean add(E e) {
    return al.addIfAbsent(e);
}

```

```java
public boolean addIfAbsent(E e) {
    Object[] snapshot = getArray();
    return indexOf(e, snapshot, 0, snapshot.length) >= 0 ? false :
        addIfAbsent(e, snapshot);
}
```

## Map 不安全

- 故障现象：ConcurrentModificationException 并发修改异常
- 导致原因：put 方法没有锁
- 解决方案：
  - `Map<String, String> map = new ConcurrentHashMap<>();`

**new HashMap<>() 工作中是这样用的吗？**

不是，加载因子 0.75f;，容量 16；
HashMap 底层数据结构，链表 + 红黑树；
通常 加载因子不变，容量根据实际情况调整

<hr/>

[测试文件地址](https://github.com/ZhengKe996/JUC-Code/tree/main/src/main/java/fun/timu/unsafe)
