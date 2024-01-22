---
title: '砍怪兽👾'
date: 2023-11-07
type: DP
---

> 给定 3 个参数，N，M，K，分别表示怪兽 N 滴血
> 你可以砍 K 刀，每一刀随机流失`[0~M]`上等概率的血量
> 求 K 次打击后，把怪兽砍死的概率

## 暴力

```java
public static double kill(int N, int M, int k) {
  if (N < 1 || M < 1 || k < 1) return 0;

  long all = (long) Math.pow(M + 1, k);
  long kill = process(k, M, N);
  return (double) ((double) kill) / ((double) all);
}

private static long process(int times, int M, int hp) {
  if (times == 0) return hp <= 0 ? 1 : 0; // 攻击次数完了，有没有打死

  if (hp <= 0)
    return (long) Math.pow(M + 1, times); // hp已经小于0的情况，每一种情况都符合要求

  long ways = 0;
  for (int i = 0; i <= M; i++)
    ways += process(times - 1, M, hp - i);

  return ways;
}
```

## DP(多样本位置全对应的尝试模型)

```java
 public static double dp1(int N, int M, int k) {
  if (N < 1 || M < 1 || k < 1) return 0;
  long all = (long) Math.pow(M + 1, k);
  long[][] dp = new long[k + 1][N + 1];
  dp[0][0] = 1;
  for (int times = 1; times <= k; times++) {
    dp[times][0] = (long) Math.pow(M + 1, times);
    for (int hp = 1; hp <= N; hp++) {
      long ways = 0;
      for (int i = 0; i <= M; i++) {
        if (hp - i >= 0)
          ways += dp[times - 1][hp - i];
        else
          ways += (long) Math.pow(M + 1, times - 1);
      }
      dp[times][hp] = ways;
    }

  }
  long kill = dp[k][N];
  return (double) ((double) kill) / ((double) all);
}
```

## DP(斜率优化)

```java
public static double dp2(int N, int M, int k) {
  if (N < 1 || M < 1 || k < 1) return 0;
  long all = (long) Math.pow(M + 1, k);
  long[][] dp = new long[k + 1][N + 1];
  dp[0][0] = 1;
  for (int times = 1; times <= k; times++) {
    dp[times][0] = (long) Math.pow(M + 1, times);
    for (int hp = 1; hp <= N; hp++) {
      dp[times][hp] = dp[times][hp - 1] + dp[times - 1][hp];
      if (hp - 1 - M >= 0)
        dp[times][hp] -= dp[times - 1][hp - 1 - M];
      else
        dp[times][hp] -= Math.pow(M + 1, times - 1);
    }
  }
  long kill = dp[k][N];
  return (double) ((double) kill) / ((double) all);
}

```

<hr/>

| [C++](https://github.com/ZhengKe996/DS/blob/main/src/dp/kill_monster.cpp) | [Java](https://github.com/ZhengKe996/DS/blob/main/src/dp/kill_monster.java) |
| :-----------------------------------------------------------------------: | :-------------------------------------------------------------------------: |
