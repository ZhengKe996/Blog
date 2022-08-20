---
title: 最基础的动态数据结构——链表 📖
date: 2022-08-20
type: DataStructure
draft: true
lang: zh
duration: 15min
---

**真正的动态数据结构 链表**
最简单的动态数据结构，更深入的理解引用（或者指针），更深入的理解递归，辅助组成其他数据结构。

## 链表 LinkedList

数据存储在“节点”(Node)中

```java
class Node{
  E e;
  Node next;
}
```

**优点：** 真正的动态，不需要处理固定容量的问题
**缺点：** 丧失了随机访问的能力
