---
title: '得到目标货币的最少数'
date: 2023-11-07
type: DP
---

> arr 是面值数组，其中的值都是正数且没有重复。再给定一个正数 aim。每个值都让为是一种面值，且让为张数是无限的。返回组成 aim 的最少货币数。

## 暴力递归

```java
public static int minCoins(int[] arr, int aim) {
  return process(arr, 0, aim);
}

private static int process(int[] arr, int index, int rest) {
  if (index == arr.length)
    return rest == 0 ? 0 : Integer.MAX_VALUE;
  else {
    int ans = Integer.MAX_VALUE;
    for (int zhang = 0; zhang * arr[index] <= rest; zhang++) {
      int next = process(arr, index + 1, rest - zhang * arr[index]);
      if (next != Integer.MAX_VALUE)
        ans = Math.min(ans, zhang + next);
    }
    return ans;
  }
}
```

## DP

```java
public static int dp1(int[] arr, int aim) {
  if (aim == 0) return 0;

  int N = arr.length;
  int[][] dp = new int[N + 1][aim + 1];
  dp[N][0] = 0;
  for (int j = 1; j <= aim; j++) {
    dp[N][j] = Integer.MAX_VALUE;
  }

  for (int index = N - 1; index >= 0; index--) {
    for (int rest = 0; rest <= aim; rest++) {
      int ans = Integer.MAX_VALUE;
      for (int zhang = 0; zhang * arr[index] <= rest; zhang++) {
        int next = dp[index + 1][rest - zhang * arr[index]];
        if (next != Integer.MAX_VALUE)
          ans = Math.min(ans, zhang + next);
      }
      dp[index][rest] = ans;
    }
  }
  return dp[0][aim];
}

```

## DP(斜率优化)

```java
public static int dp2(int[] arr, int aim) {
  if (aim == 0) return 0;

  int N = arr.length;
  int[][] dp = new int[N + 1][aim + 1];
  dp[N][0] = 0;
  for (int j = 1; j <= aim; j++) {
    dp[N][j] = Integer.MAX_VALUE;
  }

  for (int index = N - 1; index >= 0; index--) {
    for (int rest = 0; rest <= aim; rest++) {
      dp[index][rest] = dp[index + 1][rest];
      if (rest - arr[index] >= 0
          && dp[index][rest - arr[index]] != Integer.MAX_VALUE) {
        dp[index][rest] = Math.min(dp[index][rest], dp[index][rest - arr[index]] + 1);
      }
    }
  }
  return dp[0][aim];
}
```

<hr/>

| [C++](https://github.com/ZhengKe996/DS/blob/main/src/dp/min_coins_no_limit.cpp) | [Java](https://github.com/ZhengKe996/DS/blob/main/src/dp/min_coins_no_limit.java) |
| :-----------------------------------------------------------------------------: | :-------------------------------------------------------------------------------: |
