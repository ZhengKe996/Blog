---
title: C 踩坑日记
date: 2023-05-01
lang: zh
type: talk
subtitle: '踩坑日记 C语言篇'
display: 记录踩过的每一个坑
---

## Scanf 多次输入的一个细节

**问题描述**：使用 Scanf 多次输入，第二次 Scanf 不被阻塞。

```c
#include <stdio.h>
int main() {
    int i;
    char c;
    scanf("%d", &i);// 用户输入：10 并回车
    printf("i=%d\n", i); // 此处输出的：i=10

    scanf("%c", &c); // 此处将不再阻塞，直接进入下一步
    printf("c=%c\n", c); // 此处输出的：c=
}
```

_行缓冲：当在输入和输出中遇到换行符时，将执行真正的 I/O 处理操作。这时，我们输入的字符先存放到缓冲区中，等按下回车键换行时才进行实际的 IO 操作。典型代表是标准输入缓冲区（stdin）和标准输出缓冲区 (stdout)，printf 使用的是 stdout。_

**问题原因**：我们向标准输入缓冲区（stdin）输入的字符 `10\n`，scanf 函数中`%d`匹配的是整型数`10`并放入变量`i`中，接着打印输出。此时 `\n`仍然在标准输入缓冲区（stdin）内。scanf 函数匹配一个字符时，会在缓冲区删除对应的字符。执行第二个 ` scanf("%c", &c);`时，不会忽略任何字符，此时读取的是缓冲区中 残留的`\n`

**注**：`scanf`函数在读取整型数、浮点数、字符串时，会忽略`\n（回车符）、空格等字符` （忽略：指先删除这些字符，再进行阻塞）

**解决方式**

```c
#include <stdio.h>
int main() {
    int i;
    char c;
    scanf("%d", &i);
    printf("i=%d\n", i);
    fflush(stdin); // fflush函数 清空标准输入缓冲区
    scanf("%c", &c);
    printf("c=%c\n", c);
}
```
