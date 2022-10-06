---
title: 排序算法的稳定性
date: 2022-10-05
type: DataStructure
draft: true
lang: zh
duration: 15min
---

**排序的稳定性：排序前相等的两个元素，排序后相对位置不变。** **一个稳定排序算法可能被实现成不稳定的排序算法**
![排序算法的稳定性](/public/images/data-structure/17-0.png)

### 选择排序法是不稳定的

![选择排序法是不稳定的](/public/images/data-structure/17-1.png)
![选择排序法是不稳定的](/public/images/data-structure/17-2.png)

### 插入排序法是稳定的（依赖具体实现）

**相同大小的元素没有机会"跳跃"**
![插入排序法是稳定的](/public/images/data-structure/17-1.png)
![插入排序法是稳定的](/public/images/data-structure/17-3.png)
![插入排序法是稳定的](/public/images/data-structure/17-4.png)

### 希尔排序法是不稳定的

![希尔排序法是不稳定的](/public/images/data-structure/17-5.png)
![希尔排序法是不稳定的](/public/images/data-structure/17-6.png)

### 冒泡排序法是稳定的（依赖具体实现）

**每次只比较相邻元素,相同大小的元素没有机会"跳跃"**
![冒泡排序法是稳定的](/public/images/data-structure/17-7.png)
![冒泡排序法是稳定的](/public/images/data-structure/17-8.png)

### 快速排序法是不稳定的

**随机化标定点直接打乱了顺序**

### 堆排序法是不稳定的

![堆排序法是不稳定的](/public/images/data-structure/17-9.png)
![堆排序法是不稳定的](/public/images/data-structure/17-10.png)

### 归并排序法是稳定的

**归并排序的元素位置移动，完全在 merge 的过程中，归并过程中，相同元素没机会“跳”到前面去**
![归并排序法是稳定的](/public/images/data-structure/17-11.png)
