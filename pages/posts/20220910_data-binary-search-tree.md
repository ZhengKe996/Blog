---
title: 二分搜索树
date: 2022-09-10
type: DataStructure
draft: true
lang: zh
duration: 15min
---

### 树结构

![树结构](/public/images/data-structure/8-0.png)

**为什么要有树结构？**
将数据使用树结构存储后，出奇的高效

### 二叉树

![二叉树](/public/images/data-structure/8-0.png)
**和链表一样，动态数据结构**

```java
class Node{
  E e;
  Node left;
  Node right;
}
```

1. 二叉树每个节点最多有两个孩子
2. 二叉树每个节点最多有一个父亲
3. 二叉树具有天然递归结构
4. 每个节点的左子树也是二叉树
5. 每个节点的右子树也是二叉树
6. 二叉树不一定是“满"的

**一个节点也是二叉树**
![二叉树](/public/images/data-structure/8-1.png)
**空也是二叉树**
![二叉树](/public/images/data-structure/8-2.png)

### 二分搜索树 Binary Search Tree

- 二分搜索树是二叉树
- 二分搜索树的每个节点的值
  - 大于其左子树的所有节点的值
  - 小于其右子树的所有节点的值
- 存储的元素必须有可比较性

![二分搜索树](/public/images/data-structure/8-0.png)
![二分搜索树](/public/images/data-structure/8-3.png)

**我们的二分搜索树不包含重复元素，如果想包含重复元素的话，只需要定义：左子树小于等于节点；或者右子树大于等于节点**

### 二分搜索树 插入元素(递归)

![二分搜索树](/public/images/data-structure/8-4.png)

### 二分搜索树 查询元素(递归)

![二分搜索树](/public/images/data-structure/8-6.png)

### 二分搜索树 遍历元素

**什么是遍历操作?**

- 遍历操作就是把所有节点都访问一遍
- 访问的原因和业务相关

**二分搜索树的递归操作**

- 对于遍历操作，两棵子树都要顾及

![二分搜索树](/public/images/data-structure/8-5.png)

![二分搜索树](/public/images/data-structure/8-7.png)
![二分搜索树](/public/images/data-structure/8-8.png)
![二分搜索树](/public/images/data-structure/8-9.png)

**非递归前序遍历**
![二分搜索树](/public/images/data-structure/8-10.png)

### 广度优先遍历的意义

- 更快的找到问题的解
- 常用于算法设计中-最短路径

**层序遍历**
![二分搜索树](/public/images/data-structure/8-11.png)
