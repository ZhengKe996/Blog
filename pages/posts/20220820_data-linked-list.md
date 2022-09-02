---
title: 最基础的动态数据结构——链表
date: 2022-08-20
type: DataStructure
draft: true
lang: zh
duration: 15min
---

**真正的动态数据结构 链表**
最简单的动态数据结构，更深入的理解引用（或者指针），更深入的理解递归，辅助组成其他数据结构。

### 链表 LinkedList

数据存储在“节点”(Node)中

```java
class Node{
  E e;
  Node next;
}
```

**优点：** 真正的动态，不需要处理固定容量的问题
**缺点：** 丧失了随机访问的能力

### 数组和链表的对比

**数组**
数组最好用于索引有语意的情况。scores[2]
最大的优点：支持快速查询

**链表**
链表不适合用于索引有语意的情况。
最大的优点：动态

![链表](/public/images/data-structure/3-1.png)

##### 实现一个链表

[实现一个链表](https://github.com/ZhengKe996/DataStructure/tree/main/src/LinkedList)

### 使用链表实现栈

[使用链表实现栈](https://github.com/ZhengKe996/DataStructure/tree/main/src/LinkedListStack)

### 使用链表实现队列

[使用链表实现栈](https://github.com/ZhengKe996/DataStructure/tree/main/src/LinkedListQueue)
