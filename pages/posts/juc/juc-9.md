---
title: '四大函数式接口'
date: 2023-10-07
type: JUC
---

**所有的函数式接口都可以用来简化编程模型： 都可以使用 lambda 表达式简化！**(Java8)

- Function ： 有一个输入参数有一个输出参数
- Consumer：有一个输入参数，没有输出参数
- Supplier：没有输入参数，只有输出参数
- Predicate：有一个输入参数，判断是否正确！

```java
Function<String, Integer> function2 = (str) -> { return str.length(); };
Predicate<String> predicate2 = str -> { return str.isEmpty(); };
Supplier<String> supplier2 = () -> { return "Hello World"; };
Consumer<String> consumer = (s -> {});
```

[测试文件地址](https://github.com/ZhengKe996/JUC-Code/tree/main/src/main/java/fun/timu/function/Func.java)
