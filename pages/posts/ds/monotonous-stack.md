---
title: '单调栈'
date: 2023-11-20
type: DS
---

一种特别设计的栈结构，为了解决如下的问题：
给定一个可能含有重复值的数组 arr，i 位置的数一定存在如下两个信息

1. `arr[i]`的左侧离 i 最近并且小于（或者大于）`arr[i]` 的数在哪？
2. `arr[i]`的右侧离 i 最近并且小于（或者大于）`arr[i]` 的数在哪？

如果想得到 arr 中所有位置的两个信息，怎么能让得到信息的过程尽量快?

![单调栈](/public/images/ds/monotonous-stack/monotonous-stack.png)

## Java 实现单调栈(此版本无法处理重复元素)

```java
 public static int[][] getNearLessNoRepeat(int[] arr) {
  int[][] res = new int[arr.length][2]; // res[x][0]:左边最近最小元素下标 rex[x][1]:右边最近最小元素下标
  Stack<Integer> stack = new Stack<>();
  for (int i = 0; i < arr.length; i++) {
    while (!stack.isEmpty() && arr[stack.peek()] > arr[i]) {
      int j = stack.pop();
      int leftLessIndex = stack.isEmpty() ? -1 : stack.peek(); // 最左边元素 如果栈不为空则为栈顶元素
      res[j][0] = leftLessIndex;
      res[j][1] = i;
    }
    stack.push(i);
  }
  while (!stack.isEmpty()) {
    int j = stack.pop();
    int leftLessIndex = stack.isEmpty() ? -1 : stack.peek();
    res[j][0] = leftLessIndex;
    res[j][1] = -1;
  }
  return res;
}
```

## Java 实现单调栈(支持处理重复元素)

```java
public static int[][] getNearLess(int[] arr) {
  int[][] res = new int[arr.length][2]; // res[x][0]:左边最近最小元素下标 rex[x][1]:右边最近最小元素下标
  Stack<List<Integer>> stack = new Stack<>();
  for (int i = 0; i < arr.length; i++) {
    while (!stack.isEmpty() && arr[stack.peek().get(0)] > arr[i]) {
      List<Integer> pops = stack.pop();
      int leftLessIndex = stack.isEmpty() ? -1 : stack.peek().get(stack.peek().size() - 1);
      for (Integer pop : pops) {
        res[pop][0] = leftLessIndex;
        res[pop][1] = i;
      }
    }

    if (!stack.isEmpty() && arr[stack.peek().get(0)] == arr[i]) {
      stack.peek().add(Integer.valueOf(i));
    } else {
      ArrayList<Integer> list = new ArrayList<>();
      list.add(i);
      stack.push(list);
    }
  }
  while (!stack.isEmpty()) {
    List<Integer> pops = stack.pop();
    int leftLessIndex = stack.isEmpty() ? -1 : stack.peek().get(stack.peek().size() - 1);
    for (Integer pop : pops) {
      res[pop][0] = leftLessIndex;
      res[pop][1] = -1;
    }
  }
  return res;
}
```

<hr/>
<ListPosts type="MonotonousStack"/>
