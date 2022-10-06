---
title: 并查集 Union Find
date: 2022-10-06
type: DataStructure
draft: true
lang: zh
duration: 15min
---

**一种很不一样的树形结构**

### 连接问题 Connectivity Problem

![并查集](/public/images/data-structure/20-0.png)

### 并查集 Union Find

对于一组数据，主要支持两个动作：

- union( p, q)
- isConnected( p, q)

### Quick Find 的基本数据表示

![并查集](/public/images/data-structure/20-1.png)
![并查集](/public/images/data-structure/20-2.png)

### 实现 Quick Find

![并查集](/public/images/data-structure/20-3.png)
![并查集](/public/images/data-structure/20-4.png)

### Quick Union

**将每一个元素，看做是一个节点**
![并查集](/public/images/data-structure/20-5.png)

##### Quick Union 下的数据表示

![并查集](/public/images/data-structure/20-7.png)
![并查集](/public/images/data-structure/20-6.png)
**union(3,4)**
![并查集](/public/images/data-structure/20-8.png)
![并查集](/public/images/data-structure/20-9.png)
**union(3,8)**
![并查集](/public/images/data-structure/20-10.png)
![并查集](/public/images/data-structure/20-11.png)
**union(6,5)**
![并查集](/public/images/data-structure/20-12.png)
![并查集](/public/images/data-structure/20-13.png)
**union(9,4)**
![并查集](/public/images/data-structure/20-14.png)
![并查集](/public/images/data-structure/20-15.png)
.....

### 实现 Quick Union

![并查集](/public/images/data-structure/20-16.png)

### 基于 Size 优化

![并查集](/public/images/data-structure/20-17.png)

### 基于 Rank 优化

**union(4,2)**
![并查集](/public/images/data-structure/20-18.png)
![并查集](/public/images/data-structure/20-19.png)

rank[i] 表示根节点为 i 树的高度
![并查集](/public/images/data-structure/20-20.png)
