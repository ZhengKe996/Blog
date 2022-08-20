---
title: 栈和队列 📖
date: 2022-08-19
type: DataStructure
draft: true
lang: zh
duration: 15min
---

## 数组 Array

- 数组最大的优点：快速查询。scores[2]
- 数组最好应用于“索引有语意”的情况。
- 但井非所有有语义的索引都适用于数组

#### 自定义数组类(Java)

[自定义数组类](https://github.com/ZhengKe996/DataStructure/blob/main/src/Array/Array.java)

#### 时间复杂度分析

添加操作：O(n)

- addLast(e)：O(1)
- addFirst(e)：O(n)
- add(index,e)：O(n/2) = O(n)
- resize()：O(n)

删除操作：O(n)

- removeLast(e)：O(1)
- removeFirst(e)：O(n)
- remove(index,e)：O(n/2) = O(n)
- resize()：O(n)

修改操作：已知索引 O(1)；未知索引：O(n)

- set(index,e)：O(1)

查找操作：已知索引 O(1)；未知索引：O(n)

- get(index)：O(1)
- contains(e)：O(n)
- find(e)：O(n)

## 均摊时间复杂度 amortized time complexity

均摊时间复杂度分析，又叫摊还分析（或者叫平摊分析）。均摊时间复杂度，听起来跟平均时间复杂度有点儿像。对于初学者来说，这两个概念确实非常容易弄混。大部分情况下，我们并不需要区分最好、最坏、平均三种复杂度。平均复杂度只在某些特殊情况下才会用到，而均摊时间复杂度应用的场景比它更加特殊、更加有限。

## 复杂度震荡

在对数组的缩容和扩容的操作时，如果操作不当，容易造成复杂度震荡的问题。

#### 如何避免复杂度震荡

就是扩容的倍数 与 缩容的倍数相乘不等于 1 时，就可以避免这个问题

## 栈 Stack

- 栈也是一种线性结构
- 相比数组，栈对应的操作是数组的子集
- 只能从一端添加元素，也只能从一端取出元素，这一端称为栈顶。

![栈](/public/images/data-structure/0-1.png)
栈是一种后进先出的数据结构, Last In First Out (LIFO),在计算机的世界里，栈拥有着不可思议的作用

#### 栈的应用

- 无处不在的 Undo 操作（撤销）- 编辑器
- 程序调用的系统栈 - 操作系统
- 括号匹配 - 编译器

#### 实现一个栈

[实现一个栈](https://github.com/ZhengKe996/DataStructure/tree/main/src/Stack)

## 队列 Queue

- 队列也是一种线性结构, 相比数组，队列对应的操作是数组的子集
- 只能从一端 （队尾）添加元素，只能从零一端（队首）取出元素

![队列](/public/images/data-structure/0-2.png)

队列是一种先进先出的数据结构（先到先得）,First In First Out (FIFO)

#### 实现一个队列

[实现一个队列](https://github.com/ZhengKe996/DataStructure/tree/main/src/Queue)

## 循环队列

**front == tail 队列为空**
**(tail + 1) % c == front 队列满**
![循环队列](/public/images/data-structure/0-3.png)

#### 实现一个循环队列

[实现一个循环队列](https://github.com/ZhengKe996/DataStructure/tree/main/src/LoopQueue)

## 双端队列

- 可以在队列的两端添加元素
- 可以在队列的两端删除元素
