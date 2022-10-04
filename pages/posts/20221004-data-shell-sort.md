---
title: 希尔排序法
date: 2022-10-04
type: DataStructure
draft: true
lang: zh
duration: 15min
---

**基本思想: 让数组越来越有序**，不能只处理相邻的逆序对

### 图示

![希尔排序法](/public/images/data-structure/15-0.png)
给索引相差 4 的元素分组
![希尔排序法](/public/images/data-structure/15-1.png)
对每一组的元素进行插入排序法，如：2>1 则 2 与 1 交换位置。
![希尔排序法](/public/images/data-structure/15-2.png)
如：8>5 则 8 与 5 交换位置。
![希尔排序法](/public/images/data-structure/15-3.png)
![希尔排序法](/public/images/data-structure/15-4.png)
给索引相差 2 的元素分组
![希尔排序法](/public/images/data-structure/15-5.png)
对每一组的元素进行插入排序法
![希尔排序法](/public/images/data-structure/15-6.png)
![希尔排序法](/public/images/data-structure/15-7.png)
对数据进行插入排序法
![希尔排序法](/public/images/data-structure/15-8.png)

### 希尔排序法

1. 对元素间距为 n/2 的所有数组做插入排序
2. 对元素间距为 n/4 的所有数组做插入排序
3. 对元素间距为 n/8 的所有数组做插入排序
   ...
   对元素问距为 1 的所有数组做插入排序

![希尔排序法](/public/images/data-structure/15-9.png)

### 希尔排序的性能

![希尔排序法](/public/images/data-structure/15-10.png)

### 希尔排序的优化（优化循环层数）

![希尔排序法](/public/images/data-structure/15-11.png)
