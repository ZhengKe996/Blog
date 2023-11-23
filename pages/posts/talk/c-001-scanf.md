---
title: 'C scanf 阻塞问题'
date: 2023-11-22
type: talk
---

> 为什么执行 `scanf("%c", &c);`未被阻塞 程序直接执行结束?

```c
int main() {
    int i;
    char c;
    scanf("%d", &i);
    printf("i=%d\n", i);
    scanf("%c", &c);
    printf("c=%c\n", c);
    return 0;
}
```

## 为什么会发生?

![scanf](/public/images/talks/c-408/c-scanf.png)

## 如何解决?

添加代码`fflush(stdin);` 清空标准输入缓冲区

完整代码如下

```c
int main() {
    int i;
    char c;
    scanf("%d", &i);
    printf("i=%d\n", i);
    fflush(stdin); // 清空标准输入缓冲区
    scanf("%c", &c);
    printf("c=%c\n", c);
    return 0;
}
```

![scanf](/public/images/talks/c-408/c-scanf-2.png)

## 关于 scanf

1. 为什么 scanf 会阻塞？

> 答：因为标准输入缓存区是空的，scanf 函数在读取 整型数、浮点数、字符串时会忽略 `\n(回车) and 空格`等字符，而字符`%c`不会忽略任何字符 📢
