---
title: '给你一个栈 请你逆序这个栈，不能申请额外的数据结构'
date: 2023-10-23
type: Recursion
---

## 使用额外栈的思路

![使用额外栈的思路](/public/images/ds/recursion/reverse_stack_using_recursive.drawio.png)

## 不使用额外栈（递归！）

![使用额外栈的思路](/public/images/ds/recursion/reverse_stack_using_recursive2.drawio.png)

```java
public static void reverse(Stack<Integer> stack) {
  if (stack.isEmpty())
    return;

  int i = f(stack);
  reverse(stack);
  stack.push(i);
}

// 递归子过程
public static int f(Stack<Integer> stack) {
  int result = stack.pop();
  if (stack.isEmpty())
    return result;
  else {
    int last = f(stack);
    stack.push(result);
    return last;
  }
}
```

<hr/>

| [C++](https://github.com/ZhengKe996/DS/blob/main/src/recursion/reverse_stack_using_recursive.cpp) | [Java](https://github.com/ZhengKe996/DS/blob/main/src/recursion/reverse_stack_using_recursive.java) |
| :-----------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------: |
