---
title: 快速排序法
date: 2022-08-22
type: DataStructure
draft: true
lang: zh
duration: 15min
---

## 最基础的 partition 图示

![partition](/public/images/data-structure/6-1.png)
![partition](/public/images/data-structure/6-2.png)
![partition](/public/images/data-structure/6-3.png)
![partition](/public/images/data-structure/6-4.png)

## 小规模数据模拟 partition

![partition](/public/images/data-structure/6-6.png)
![partition](/public/images/data-structure/6-7.png)

## 实现第一版快速排序

![实现第一版快速排序](/public/images/data-structure/6-5.png)

## 第一版快速排序的问题

时间复杂度：O(n^2)； 递归深度：O(n）
![第一版快速排序的问题](/public/images/data-structure/6-8.png)
![第一版快速排序的问题](/public/images/data-structure/6-9.png)

## 为快速排序添加随机化(解决第一版的问题)

![第一版快速排序的问题](/public/images/data-structure/6-10.png)
![第一版快速排序的问题](/public/images/data-structure/6-11.png)

## 为快速排序添加随机化(使用一个 Random)

![第一版快速排序的问题](/public/images/data-structure/6-12.png)
