---
title: '得到目标货币的方法数'
date: 2023-11-05
type: DP
---

> `arr是货币数组，其中的值都是正数。再给定一个正数aim。每个值都认为是一张货币。`
> 即 值相同的货币也认为每一张是不同的，返回组成 aim 的方法数
> 例如 `arr={1,1,1},aim =2`第 0 个和第 1 个能组成 2，第 1 个和第 2 个能组成 2，第 0 个和第 2 个能组成 2，一共三种方法，返回 3

## 暴力

```java
public static int coinWays(int[] arr, int aim) {
  return process(arr, 0, aim);
}

private static int process(int[] arr, int index, int rest) {
  if (rest < 0) return 0;
  if (index == arr.length)
    return rest == 0 ? 1 : 0;
  else
    return process(arr, index + 1, rest) + process(arr, index + 1, rest - arr[index]);
}
```

## DP(从左到右的尝试模型)

```java
public static int dp(int[] arr, int aim) {
  if (aim == 0) return 1;
  int N = arr.length;
  int[][] dp = new int[N + 1][aim + 1];
  dp[N][0] = 1;
  for (int index = N - 1; index >= 0; index--) {
    for (int rest = 0; rest <= aim; rest++) {
      dp[index][rest] = dp[index + 1][rest] + (rest - arr[index] >= 0 ? dp[index + 1][rest - arr[index]] : 0); // 小心数组越界
    }
  }
  return dp[0][aim];
}
```

<hr/>

| [C++](https://github.com/ZhengKe996/DS/blob/main/src/dp/coins_way_every_paper_different.cpp) | [Java](https://github.com/ZhengKe996/DS/blob/main/src/dp/coins_way_every_paper_different.java) |
| :------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------: |
