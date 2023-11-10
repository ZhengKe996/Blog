---
title: '返回较小集合的累加和'
date: 2023-11-10
type: DP
---

> 给定一个整数数组 arr，请把 arr 中所有的数拆分成两个集合，尽量让两个集合的累加和接近。
> 返回：累加和最解决情况下，较小集合的累加和。

## 暴力

```java
 public static int right(int[] arr) {
  if (arr == null || arr.length < 2) return 0;
  int sum = 0;
  for (int num : arr) sum += num;

  return process(arr, 0, sum >> 1);
}

private static int process(int[] arr, int index, int rest) {
  if (index == arr.length) return 0;

  int p1 = process(arr, index + 1, rest);
  int p2 = 0;
  if (rest - arr[index] >= 0) {
    p2 = process(arr, index + 1, rest - arr[index]);
  }
  return Math.max(p1, p2);

}
```

## DP

![返回较小集合的累加和](/public/images/ds/dp/dp-split-sum-closed.drawio.png)

```java
public static int dp(int[] arr) {
  if (arr == null || arr.length < 2) return 0;

  int sum = 0;
  for (int num : arr) sum += num;

  sum = sum >> 1;
  int N = arr.length;
  int[][] dp = new int[N + 1][sum + 1];

  for (int index = N - 1; index >= 0; index--) {
    for (int rest = 0; rest <= sum; rest++) {
      int p1 = dp[index + 1][rest];
      int p2 = 0;
      if (rest - arr[index] >= 0) {
        p2 = dp[index + 1][rest - arr[index]];
      }
      dp[index][rest] = Math.max(p1, p2);
    }
  }

  return dp[0][sum];
}


```

<hr/>

| [C++](https://github.com/ZhengKe996/DS/blob/main/src/dp/split_sum_closed.cpp) | [Java](https://github.com/ZhengKe996/DS/blob/main/src/dp/split_sum_closed.java) |
| :---------------------------------------------------------------------------: | :-----------------------------------------------------------------------------: |
