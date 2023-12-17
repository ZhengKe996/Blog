---
title: 'C 结构体对齐'
date: 2023-12-17
type: talk
---

## 结构体的大小必须是其最大成员的整数倍

```c
struct student_type1 {
    double score;//double是一种浮点类型，8个字节，浮点分为float和double
    short age;//short 是整型，占2个字节
};

struct student_type2 {
    double score;
    int height;//如果两个小存储之和是小于最大长度8，那么它们就结合在一起
    short age;
};

struct student_type3 {
    int height;
    char sex;
    short age;
};
```

![结构体的大小必须是其最大成员的整数倍](/public/images/talks/c-408/c-struct-0.png)

## 注意

定义`student_type3`时，由于 char 占 1 字节，short 占 2 字节，两个小存储之和是小于最大长度 8，那么它们就结合在一起；
内存地址如下:

![注意](/public/images/talks/c-408/c-struct-1.png)
![注意](/public/images/talks/c-408/c-struct-2.png)
![注意](/public/images/talks/c-408/c-struct-3.png)
