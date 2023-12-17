---
title: 'C 指针'
date: 2023-12-10
type: talk
---

`一个专门存放另一个变量的地址称为指针变量` 其中 64 位应用程序`sizeof(指针)=8` 而 32 位应用程序`sizeof(指针)=4`

## malloc 的使用

```c
#include <stdio.h>
#include <stdlib.h> // malloc使用的头文件
#include <string.h>

int main() {
    int size;
    char *p;
    scanf("%d", &size);

    p = (char *) malloc(size);  // 申请内存空间 malloc 返回 void*  (无类型指针)
    strcpy(p, "malloc success"); // strcpy 传入的类型是 char*
    puts(p);
    free(p); // 释放申请的空间时，给的地址必须是最初 malloc 返回给我们的地址
    printf("free success \n");
    return 0;
}
```

## 堆空间与栈空间的区别

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

char *print_stack() {
    char c[100] = "I am print_stack func";
    puts(c);
    return c;
}

char *print_malloc() {
    char *c = (char *) malloc(100);
    strcpy(c, "I am print_malloc func");
    puts(c);
    return c;
}

int main() {
    char *p;
    p = print_stack();
    puts(p);
    printf("\n------------------------\n");
    p = print_malloc();
    puts(p);
    return 0;
}
```

![堆空间与栈空间的区别](/public/images/talks/c-408/c-heap-stack-differ.png)

### 为什么第二次打印会有异常？

`因为 print_stack() 函数中字符串存放在栈空间中，函数执行结束后，栈空间会被释放。字符数组c中原有的空间已经被分配给其他函数使用；因此调用 print_stack() 函数后，字符指针 p不能获取栈空间中的数据`**而** `print_malloc()函数中的字符数组存放在堆空间中，堆空间只有在执行free操作后才会被释放，否则在进程执行的过程中一直有效`
