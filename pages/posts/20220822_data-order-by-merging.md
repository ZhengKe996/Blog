---
title: 归并排序法
date: 2022-08-22
type: DataStructure
draft: true
lang: zh
duration: 15min
---

![归并排序法](/public/images/data-structure/5-1.png)

注意递归函数的“宏观”语意

![归并排序法](/public/images/data-structure/5-2.png)

## 归并排序法

![归并排序法](/public/images/data-structure/5-4.png)

## 归并排序法复杂度分析

非叶子节点
![归并排序法](/public/images/data-structure/5-3.png)

叶子节点：n

对 merge 进行判断后，对完全有序的数组归并排序是 0(n） 的

## 使用插入排序法优化归并排序法

思路： 在数据少的情况下，使用插入排序法由于归并排序法(编译型语言下适用，在其他语言可能适得其反)
![使用插入排序法优化归并排序法](/public/images/data-structure/5-5.png)
![使用插入排序法优化归并排序法](/public/images/data-structure/5-6.png)

## 归并排序法内存优化

思路：merge 操作开辟空间是耗时的，当数据量不断增大，merge 开辟空间的次数趋向于 n 次。
![归并排序法内存优化](/public/images/data-structure/5-7.png)
