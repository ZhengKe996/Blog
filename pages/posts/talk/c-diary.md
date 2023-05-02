---
title: C 小记
date: 2023-05-01
lang: zh
type: talk
subtitle: '小记 C语言篇'
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

## Scanf 一次读取多种数据类型小细节

**问题代码**

```c
#include <stdio.h>
//scanf 一次读取多种数据类型
int main() {
    int i, ret;
    float f;
    char c;
    ret = scanf("%d%c%f", &i, &c, &f); // 输入：100 a 98.2
    printf("i=%d,c=%c,f=%5.2f\n", i, c, f); // 输出：i=100,c= ,f= 0.00；此处的c是32（空格的ASCII码）
}
```

**解决方法**：在 %d 和%c 中间加个空格

```c
int main() {
    int i, ret;
    float f;
    char c;
    ret = scanf("%d %c%f", &i, &c, &f); // 在 %d 和%c中间加个空格 输入：100 a 98.2
    printf("i=%d,c=%c,f=%5.2f\n", i, c, f);// 输出：i=100,c=a,f=98.20
    return 0;
}

```

## While 的小细节

```c
#include <stdio.h>

int main() {
    int i = 1, total = 0;
    while (i <= 100) // 在这里加分号会造成死循环
    {
        if (i % 2 == 0) {
            i++;
            continue; // continue下面的代码均不会得到执行
        }
        total = total + i;
        i++;//i++等价于 i+=1; 在循环体内没有让while判断表达式趋近于假的操作，死循环
    }
}
```

## continue 和 break 的区别

- continue：结束本次循环，跳过下面的所有语句进入下一次循环
- break：结束整个循环，直接跳出循环

## 数组访问越界

```c
#include <stdio.h>

int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    int j = 20;
    int i = 10;
    arr[5] = 6;//访问越界
    arr[6] = 7;
    printf("i=%d\n", i); // i=7
    return 0;
}

```

i 和 arr 都是局部变量，局部变量的值创建在栈空间上。栈空间默认先使用高地址，再使用低地址。在程序中，先创建的 i 变量，然后再创建的数组变量，即 i 的地址比数组的地址要高。如果数组越界访问的话，有机会访问到 i。程序将 i 的值赋为 0，从而导致了死循环。

## 数组的小细节

**问题代码：**

```c
#include <stdio.h>

void print(int a[]) {
    int i;
    for (i = 0; i <  sizeof(a) / sizeof(int); i++) {
        printf("%3d", a[i]);
    }
}

int main() {
    int a[5] = {1, 2, 3, 4, 5};
    print(a); // 输出结果：1 2
}

```

**为什么呢？**
这是因为一维数组在传递时，其长度是传递不过去的，所以我们通过 len 来传递数组中的元素个数。

```c
#include <stdio.h>

// 数组名传递到子函数后，子函数的形参接收到是数组的起始地址，因此不能把数组的长度传递给子函数
void print(int a[], int length) {
  // sizeof(a) = 8
    int i;
    for (i = 0; i < length; i++) {
        printf("%3d", a[i]);
    }
}

int main() {
    int a[5] = {1, 2, 3, 4, 5};
    print(a, sizeof(a) / sizeof(int)); // 输出：1 2 3 4 5
}
```

## 字符数组的小细节

C 语言规定字符串的结束标志为'\0'，而系统会对字符串 常量自动加一个'\0'，为了保证处理方法一致，一般会人为地在字符数组中添加'\0'，所以字符数 组存储的字符串长度必须比字符数组少 1 字节。例如，char c[10]最长存储 9 个字符，剩余的 1 个字符用来存储'\0'。

```c
#include <stdio.h>

void print(char d[]) {
    int i = 0;
    while (d[i])//当走到结束符时，循环结束
    {
        printf("%c", d[i]);
        i++;
    }
    printf("\n");
}

int main() {
    char c[5] = "hello";
    print(c);// 访问越界 ：hello�� 观察内存可明白
    char d[6] = "hello";
    print(d);// 正常输出：hello 观察内存可明白
    return 0;
}

```

## Pointer 占内存空间的小细节

指针定义格式：`基类型 *指针变量名`

```c
    int *i_pointer;
```

- 32 位程序：`sizeof(i_pointer)=4`
- 64 位程序：`sizeof(i_pointer)=8`

## Pointer 偏移

偏移的长度是其基类型的长度，也就是偏移 sizeof(int)个长度,

```c
int main() {
    int a[N] = {1, 2, 3, 4, 5};
    int *p = a;
    int i;
    for (i = 0; i < N; i++) {
        printf("%3d", *(p + i));
    }
}
```

## 堆和栈的小差异

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 堆和栈的差异
char *print_stack() {
    char c[100] = "I am print print_stack";
    char *p;
    p = c;
    puts(p); // I am print print_stack
    return p;
}

char *print_malloc() {
    char *p = (char *) malloc(100);
    strcpy(p, "I am print print_malloc");
    puts(p); // I am print print_malloc
    return p;
}

int main() {
    char *p;
    p = print_stack();
    puts(p); // ��@�u�m��
    p = print_malloc();
    puts(p); // I am print print_malloc
    free(p);
    return 0;
}

```

**为什么执行 print stack 的第二次打印会有异常？**
print stack 函数中的字符串存放在栈空间中，函数执行结束后，栈空间会被释放，字符数组 c 的原有空间已被分配给其他函数使用，因此在调用 print stack 函数后，` puts(p)`中的 p 不能获取栈空间的数据。而 print malloc()函数中的字符串存放在堆空间中，堆空间只有在执行 free 操作后才会释放，否则在进程执行过程中会一直有效。
![堆和栈输出](/public/images/talks/c-record1.png)
