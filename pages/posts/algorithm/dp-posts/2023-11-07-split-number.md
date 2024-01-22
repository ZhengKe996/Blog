---
title: '拆分数字'
date: 2023-11-07
type: DP
---

> 给定一个正数 1，裂开的方法有一种`(1)`，给定一个正数 2,裂开的方法有二种`(1+1)`和`2`，以此类推。
> 给定一个正数 n，求裂开的方法数

## 暴力

```java
public static int ways(int n) {
  if (n < 0) return 0;
  if (n == 1) return 1;
  return process(1, n);
}

private static int process(int pre, int rest) {
  if (rest == 0) return 1;
  if (pre > rest) return 0;

  int ways = 0;
  for (int first = pre; first <= rest; first++) {
    ways += process(first, rest - first);
  }
  return ways;
}
```

## DP

```java
public static int dp1(int n) {
  if (n < 0) return 0;
  if (n == 1) return 1;

  int[][] dp = new int[n + 1][n + 1];
  for (int pre = 1; pre <= n; pre++) {
    dp[pre][0] = 1;
    dp[pre][pre] = 1;
  }
  for (int pre = n - 1; pre >= 1; pre--) {
    for (int rest = pre + 1; rest <= n; rest++) {
      int ways = 0;
      for (int first = pre; first <= rest; first++) {
        ways += dp[first][rest - first];
      }
      dp[pre][rest] = ways;
    }
  }
  return dp[1][n];
}
```

## DP(斜率优化)

```java
public static int dp2(int n) {
  if (n < 0) return 0;
  if (n == 1) return 1;

  int[][] dp = new int[n + 1][n + 1];
  for (int pre = 1; pre <= n; pre++) {
    dp[pre][0] = 1;
    dp[pre][pre] = 1;
  }
  for (int pre = n - 1; pre >= 1; pre--) {
    for (int rest = pre + 1; rest <= n; rest++) {
      dp[pre][rest] = dp[pre + 1][rest];
      dp[pre][rest] += dp[pre][rest - pre];
    }
  }
  return dp[1][n];
}
```

<hr/>

| [C++](https://github.com/ZhengKe996/DS/blob/main/src/dp/split_number.cpp) | [Java](https://github.com/ZhengKe996/DS/blob/main/src/dp/split_number.java) |
| :-----------------------------------------------------------------------: | :-------------------------------------------------------------------------: |
