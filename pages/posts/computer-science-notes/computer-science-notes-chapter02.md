---
title: 第二章：数字系统
date: 2023-04-23
draft: true
type: ComputerScienceNotes
lang: zh
---

## 知识点

- 数字系统的定义
- 位置化数字系统
- 非位置化数字系统（了解即可）

### 数字系统（数码系统）

如何用独特的符号来表示一个数字。有限的数字符号（数码）来表示数字。

区分：位置化系统和非位置化系统

### 十进制

![十进制](/public/images/computer-science-notes/2.1.png)

![十进制](/public/images/computer-science-notes/2.2.png)

![十进制](/public/images/computer-science-notes/2.3.png)

**二进制、八进制、十六进制同理**
![十进制](/public/images/computer-science-notes/2.4.png)
![十进制](/public/images/computer-science-notes/2.5.png)

### 进制转换

![进制转换](/public/images/computer-science-notes/2.6.png)

![进制转换](/public/images/computer-science-notes/2.7.png)
![进制转换](/public/images/computer-science-notes/2.8.png)
![进制转换](/public/images/computer-science-notes/2.9.png)
![进制转换](/public/images/computer-science-notes/2.10.png)

### 非位置化数字系统

非位置化数字系统也会有自己的符号集，但其位置跟数位的大小并无关系。典型的非位置化数字系统为罗马数字系统。

## 小结

_来源：计算机科学导论（第三版）p23_

- 数字系统（或数码系统）是用独特的符号来表示一个数字的系统。位置化数字系统中，在数字中符号所占据的位置决定了其表示的值。每个位置有一个位置量与其相关联。非位置化数字系统使用有限的数字符号，每个符号有一个值。但是符号所占用的位置通常与其值无关，每个符号的值是固定的。
- 在十进制系统中，底 b=10 并且我们用 10 个符号来表示一个数。该系统中的符号常被称为十进制数码或仅称为数码。在二进制系统中，底 b=2 并且我们用 2 个符号来表示一个数。该系统中的符号常被称为二进制数码或位。在十六进制系统中，底 b=16 并且我们用 16 个符号来表示一个数。该系统中的符号常被称为十六进制数码。在八进制系统中，底 b=8 并且我们用＆个符号来表示一个数。该系统中的符号常被称为八进制数码。
- 我们可以从任意进制转换到十进制。我们将数码乘以其在源系统中的位置量并求和便得到在十进制中的数。我们能够将十进制数转换到与其等值的任意进制数。需要两个过程，一个用于整数部分，另一个用于小数部分。整数部分需要连除，而小数部分需要连乘。
- 将数字从二进制转换到十六进制很容易，反之亦然。这是因为二进制中的 4 位恰好是十六进制中的 1 位。
- 将数字从二进制转换到八进制很容易，反之亦然。这是因为二进制中的 3 位恰好是八进制中的 1 位。
