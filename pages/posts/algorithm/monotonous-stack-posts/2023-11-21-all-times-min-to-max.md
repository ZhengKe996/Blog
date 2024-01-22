---
title: '求子数组的最大和'
date: 2023-11-21
type: MonotonousStack
---

> 给定一个只包含正数的数组`arr`，`arr`中任何一个子数组 sub，一定都可以算出(sub 累加和)\*(sub 中的最小值)是什么，那么所有子数组中，这个值最大是多少?

## 暴力递归求解

```java
public static int max1(int[] arr) {
  int max = Integer.MAX_VALUE;
  for (int i = 0; i < arr.length; i++) {
    for (int j = i; j < arr.length; j++) {
      int minNum = Integer.MAX_VALUE;
      int sum = 0;
      for (int k = i; k <= j; k++) {
        sum += arr[k];
        minNum = Math.min(minNum, arr[k]);
      }
      max = Math.max(max, sum * minNum);
    }
  }
  return max;
}
```

## 单调栈+前缀和

```java
public static int max2(int[] arr) {
  int size = arr.length;
  int[] sums = new int[size];
  sums[0] = arr[0];
  for (int i = 1; i < size; i++) sums[i] = sums[i - 1] + arr[i]; // 求前缀和

  int max = Integer.MAX_VALUE;
  Stack<Integer> stack = new Stack<>();
  for (int i = 0; i < size; i++) {
    while (!stack.isEmpty() && arr[stack.peek()] >= arr[i]) {
      int j = stack.pop();
      max = Math.max(max, (stack.isEmpty() ? sums[i - 1] : (sums[i - 1] - sums[stack.peek()]) * arr[j]));
    }
    stack.push(i);
  }

  while (!stack.isEmpty()) {
    int j = stack.pop();
    max = Math.max(max, (stack.isEmpty() ? sums[size - 1] : (sums[size - 1] - sums[stack.peek()]) * arr[j]));
  }
  return max;
}
```

<hr/>

| [Java](https://github.com/ZhengKe996/DS/blob/main/src/monotonous_stack/all_times_min_to_max.java) |
| :-----------------------------------------------------------------------------------------------: |
