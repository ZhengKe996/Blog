---
title: '链表'
date: 2023-08-16
type: Algorithm
---

## 单向链表

C++

```cpp
struct Node {
  int value;
  Node *next;
  Node() : value(0), next(nullptr) {}
  Node(int x) : value(x), next(nullptr) {}
  Node(int x, Node *next) : value(x), next(next) {}
};

```

Java

```java
class Node{
  public int value;
  public Node next;
  public Node(int value){
    this.value = value;
  }
}

```

## 双向链表

C++

```cpp
struct Node {
  int value;
  Node *next;
  Node *pre;
  Node() : value(0), next(nullptr), pre(nullptr) {}
  Node(int x) : value(x), next(nullptr), pre(nullptr) {}
  Node(int x, Node *next, Node *pre) : value(x), next(next), pre(pre) {}
};
```

Java

```java
class Node{
  public int value;
  public Node next;
  public Node pre;
  public Node(int value){
    this.value = value;
  }
}

```

<hr/>
<ListPosts type="Linked"/>
