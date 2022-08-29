---
title: 快速排序法
date: 2022-08-22
type: DataStructure
draft: true
lang: zh
duration: 15min
---

### 最基础的 partition 图示

![partition](/public/images/data-structure/6-1.png)
![partition](/public/images/data-structure/6-2.png)
![partition](/public/images/data-structure/6-3.png)
![partition](/public/images/data-structure/6-4.png)

### 小规模数据模拟 partition

![partition](/public/images/data-structure/6-6.png)
![partition](/public/images/data-structure/6-7.png)

### 实现第一版快速排序

![实现第一版快速排序](/public/images/data-structure/6-5.png)

### 第一版快速排序的问题

时间复杂度：O(n^2)； 递归深度：O(n），存在性能退化问题
![第一版快速排序的问题](/public/images/data-structure/6-8.png)
![第一版快速排序的问题](/public/images/data-structure/6-9.png)

### 为快速排序添加随机化(解决第一版性能退化问题)

![第一版快速排序的问题](/public/images/data-structure/6-10.png)
![第一版快速排序的问题](/public/images/data-structure/6-11.png)

### 为快速排序添加随机化(使用一个 Random 优化内存)

![第一版快速排序的问题](/public/images/data-structure/6-12.png)

### 第二版快速排序的问题

对所有元素完全相同的数组，存在性能退化问题，时间复杂度：O(n^2)
![第二版快速排序的问题](/public/images/data-structure/6-15.png)
![第二版快速排序的问题](/public/images/data-structure/6-16.png)

### 双路快速排序法图示

![双路快速排序法](/public/images/data-structure/6-13.png)
![双路快速排序法](/public/images/data-structure/6-14.png)
![双路快速排序法](/public/images/data-structure/6-17.png)
![双路快速排序法](/public/images/data-structure/6-18.png)
![双路快速排序法](/public/images/data-structure/6-19.png)
![双路快速排序法](/public/images/data-structure/6-20.png)

### 双路快速排序法(解决第二版性能退化问题)

![双路快速排序法](/public/images/data-structure/6-21.png)

### 三路快速排序法

对所有元素完全相同的数组，时间复杂度：O(n)
![三路快速排序法](/public/images/data-structure/6-22.png)
![三路快速排序法](/public/images/data-structure/6-23.png)
![三路快速排序法](/public/images/data-structure/6-24.png)
