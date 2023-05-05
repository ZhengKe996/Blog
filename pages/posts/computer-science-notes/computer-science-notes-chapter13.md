---
title: 第十三章：文件结构
date: 2023-04-23
draft: true
type: ComputerScienceNotes
lang: zh
---

## 文件结构

![文件](/public/images/computer-science-notes/13.1.png)

## 顺序文件

顺序文件是指记录只能按照顺序从头到尾一个接一个地进行存取。
![文件](/public/images/computer-science-notes/13.2.png)

**更新顺序文件**
顺序文件必须定期更新，以反映信息的变化。
![文件](/public/images/computer-science-notes/13.3.png)

## 索引文件

在文件中随机存取记录，需要知道记录的地址。索引文件由数据文件组成，它是带索引的顺序文件。
![文件](/public/images/computer-science-notes/13.4.png)

## 散列文件

散列文件用一个数学函数来完成映射。散列文件无需额外的文件（索引）。
![文件](/public/images/computer-science-notes/13.5.png)

散列方法：

- 直接散列法：键是未经算法处理的数据文件地址。
- 求模法：求模法也称为除余散列法，求模方法用文件大小去除键后，将余数加 1 作为地址。
- 数字析取法：如果用数字析取散列法，则选择从键中析取的数字作为地址，

## 冲突

我们把列表中一些映射为同一地址的键称为同义词。
![文件](/public/images/computer-science-notes/13.6.png)

**冲突解决法**

- 开放寻址
- 链表解决法
- 桶散列法
- 组合方法

## 文本文件和二进制文件

文本文件使用字符编码系统（ASCII，UTF-8 等）译码之后显示，而二进制文件直接按字节（或者按字）译为十进制（或十六进制）数字显示
