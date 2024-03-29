---
title: 第四章：数据运算
date: 2023-04-23
draft: true
type: ComputerScienceNotes
lang: zh
---

## 知识点

- 逻辑运算
- 移位运算
- 算术运算

### 逻辑运算符

位层次上的逻辑运算

逻辑运算包括与（AND），或（OR），非（NOT），异或（XOR）这四种。其中除了非为一元运算符之外其他都是二元运算符。

- 与：当且仅当两个位均为 1 时才为 1，否则为 0。

- 或：当且仅当两个位均为 0 时才为 0，否则为 1。

- 非：即为取反，当位为 0 时则结果为 1，否则则为 0。

- 异或：可以理解为判断两者择一的运算，当且仅当两个位不同时为 1，否则为 0。

**使指定的位复位**
可以使用 AND 运算符将某个数字指定的位置为 0。

例如说，我们需要将一个 8 位数字的低 4 位置零，那么只需要将这个数字与二进制数字 11110000 做 AND 运算即可。

这样的话跟 0 做与运算的位肯定就是会变为 0，而与 1 做与运算的位肯定就还会保持原状，于是就能达到低 4 位置零的效果了。

这个时候像上面 11110000 这样的二进制数字就被称为掩码。

**使指定的位置位**

也就是让指定的位置为 1。这个只需要参考上面的操作，然后用或运算来解决即可。

**使指定的位反转**

这个需要用到异或运算。

异或运算有一个特性就是，让某个位跟 1 进行异或运算则可以让其反转：`0 XOR 1 = 1, 1 XOR 1 = 0`

利用这个特性，再结合上面的操作就可以让指定的位反转了。

### 移位运算

顾名思义地，移位运算就是让整个位模式向左或向右移动。

那么移位就会涉及到两个问题：

1. 被挤出去的位去了哪里?
2. 空出来的位要填啥?

根据这两个问题的解决策略就可以分为逻辑移位，循环移位，算术移位这三种。

**逻辑移位**

在逻辑移位中，不管是左移还是右移，被挤出去的位默认舍弃，空出来的位默认填零。

举个例子，在 8 位数位的情况下对 10111011 进行左移 3 位，则高位的 101 被舍弃，低位三个空位默认填零，于是答案就是 11011000

**循环移位**

循环移位的核心思想就是不抛弃挤出去的位，而将挤出去的位填补到空出来的位置中。

就相当于整个数字的链围成一个圈这样子。

举个例子，还是在 8 位数位的情况下对 10111011 进行左移 3 位，则高位的 101 会被填补在低位空出来的三位中，于是答案就是 11011101

**算术移位**

在算术移位中，移位操作用于在带符号的二进制补码中作为乘以 2 和除以 2 的运算存在。在这里，算术左移一位则是乘以 2，算术右移一位则是除以 2。于是其核心思想就是在保持符号位不变的情况下，左移或者右移

**算术左移**

算术左移达到的目的就是乘以 2。故在算术左移中，数字直接按位左移，高位舍弃，低位置零。也就是跟逻辑左移一致。

那么这样就会有两种情况：

1. 符号位在移位前后保持不变，则此时数字位就是一次正常的左移，达到乘以 2 的效果。
2. 符号位在移位前后发生改变，则表示原数字在乘以 2 之后无法存储进来，于是发生溢出。

**算术右移**

算术右移达到的目的就是除以 2。

但其又不能让最高位填 0（不然假设当前是负数的话符号位就变了，这不符合目的），于是就需要复制之前的最高位（也就是符号位）用来填右移后的最高位。当然，挤出去的低位就是要舍弃掉的。

### 算术运算（加减）

首先是加法，由于其设计的优越性使得其二进制对应的数字是连续的，故只需要按位相加就行，记得进位。

而减法其实就是加上原本的数字取负，在二进制补码中只需要对原来的数字取补码（也就是取反再加一）即可。

**符号加绝对值的加减法**

首先将减法去掉，减法等于加上原本数字取负，故如果是减法的话需要对第二个数字的符号位反转一下。然后就是判断符号位是否相同了，这个可以用异或运算搞定。

- 符号相同：那数字位直接相加就可以了。但有可能会发生上溢，需要注意。
- 符号不同：那么结果的符号肯定就是比较大的那个的符号了。而运算过程就很麻烦了。

1. 首先，对第二个数字的数值位取补码。
2. 然后，令两个数字相加。
3. 这个时候观察有没有溢出，如果有的话表示第一个数比较大，符号位沿用第一个数字的；如果没有溢出则说明第二个数字比较大，此时符号位沿用第二个的，而且还需要对数值位的计算结果再取一次补码。

**实数算术运算（加减运算）**

1. 排除减法。如果是减法的话将第二个数的符号位取反，并变成加法。
2. 对 0 进行特殊讨论，当参与计算的两个数字中存在 0 的时候就直接取另一个数字作为运算结果
3. 去规范化，将两个数字还原为科学计数法表示形式
4. 对齐，通过左移或右移尾数来让两个数字的指数相等（注意尾数不要上溢，可以允许下溢只不过这就会出现截断误差）
5. 带上符号位的尾数相加，这个就是符号加绝对值的加减法了。
6. 将结果规范化。
