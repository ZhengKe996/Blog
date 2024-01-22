---
title: '得到目标货币的方法数(二)'
date: 2023-11-06
type: DP
---

> `arr是面值数组，其中的值都是正数且没有重复。再给定一个整数aim。`
> 每个值都认为是一种面值，且认为张数是无限的。
> 返回组成 aim 的方法数
> 例如：arr={1,2}, aim=4;
> 方法如下：`1+1+1+1`、`1+1+2`、`2+2`
> 一个就 3 种方法，返回 3

## 暴力递归

```java
 public static int coinsWay(int[] arr, int aim) {
  if (arr == null || arr.length == 0 || aim < 0) return 0;
  return process(arr, 0, aim);
}

private static int process(int[] arr, int index, int rest) {
  if (index == arr.length)
    return rest == 0 ? 1 : 0;

  int ways = 0;
  for (int zhang = 0; zhang * arr[index] <= rest; zhang++) {
    ways += process(arr, index + 1, rest - (zhang * arr[index]));
  }
  return ways;
}
```

## DP(从左到右的尝试模型)

```java
public static int dp1(int[] arr, int aim) {
  if (arr == null || arr.length == 0 || aim < 0) return 0;
  int N = arr.length;
  int[][] dp = new int[N + 1][aim + 1];
  dp[N][0] = 1;
  for (int index = N - 1; index >= 0; index--) {
    for (int rest = 0; rest <= aim; rest++) {
      int ways = 0;
      for (int zhang = 0; zhang * arr[index] <= rest; zhang++) {
        ways += dp[index + 1][rest - (zhang * arr[index])];
      }
      dp[index][rest] = ways;
    }
  }
  return dp[0][aim];
}
```

## 优化决策

![优化决策](/public/images/ds/dp/dp-coins-way-no-limit.drawio.png)

```java
 public static int dp2(int[] arr, int aim) {
  if (arr == null || arr.length == 0 || aim < 0) return 0;

  int N = arr.length;
  int[][] dp = new int[N + 1][aim + 1];
  dp[N][0] = 1;
  for (int index = N - 1; index >= 0; index--) {
    for (int rest = 0; rest <= aim; rest++) {
      dp[index][rest] = dp[index + 1][rest];
      if (rest - arr[index] >= 0)
        dp[index][rest] += dp[index][rest - arr[index]];
    }
  }
  return dp[0][aim];
}
```

<hr/>

| [C++](https://github.com/ZhengKe996/DS/blob/main/src/dp/coins_way_no_limit.cpp) | [Java](https://github.com/ZhengKe996/DS/blob/main/src/dp/coins_way_no_limit.java) |
| :-----------------------------------------------------------------------------: | :-------------------------------------------------------------------------------: |
