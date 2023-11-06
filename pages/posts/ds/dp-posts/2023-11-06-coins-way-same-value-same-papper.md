---
title: '得到目标货币的方法数(三)'
date: 2023-11-06
type: DP
---

> `arr 是货币数组，其中的值都是正数。再给定一个正数 aim`
> 每个值都认为是一张货币，认为值相同的货币没有任何不同，返回组成 aim 的方法数
> `例如：arr={1,2,1,1,2,1,2}, aim=4` 方法:`1+1+1+1`、`1+1+2`、`2+2` 一个就三种方法，返回 3

## 暴力递归

```java
public static class Info {
  public int[] coins;
  public int[] zhangs;

  public Info(int[] c, int[] z) {
    coins = c;
    zhangs = z;
  }
}

/**
 * 类似于词频统计
 *
 * @param arr
 * @return
 */
public static Info getInfo(int[] arr) {
  HashMap<Integer, Integer> counts = new HashMap<>();
  for (int value : arr) {
    if (!counts.containsKey(value))
      counts.put(value, 1);
    else
      counts.put(value, counts.get(value) + 1);
  }
  int N = counts.size();
  int[] coins = new int[N];
  int[] zhangs = new int[N];
  int index = 0;
  for (Entry<Integer, Integer> entry : counts.entrySet()) {
    coins[index] = entry.getKey();
    zhangs[index++] = entry.getValue();
  }
  return new Info(coins, zhangs);
}

/**
 * 暴力递归 解题
 *
 * @param arr
 * @param aim
 * @return
 */
public static int coinsWay(int[] arr, int aim) {
  if (arr == null || arr.length == 0 || aim < 0) {
    return 0;
  }
  Info info = getInfo(arr);
  return process(info.coins, info.zhangs, 0, aim);
}
```

## DP(有优化空间)

```java
/**
 * 动态规划（有很大的优化空间）：三重for循环 还可以根据边界条件优化
 *
 * @param arr
 * @param aim
 * @return
 */
public static int dp1(int[] arr, int aim) {
  if (arr == null || arr.length == 0 || aim < 0) {
    return 0;
  }
  Info info = getInfo(arr);
  int[] coins = info.coins;
  int[] zhangs = info.zhangs;
  int N = coins.length;
  int[][] dp = new int[N + 1][aim + 1];
  dp[N][0] = 1;
  for (int index = N - 1; index >= 0; index--) {
    for (int rest = 0; rest <= aim; rest++) {
      int ways = 0;
      for (int zhang = 0; zhang * coins[index] <= rest && zhang <= zhangs[index]; zhang++) {
        ways += dp[index + 1][rest - (zhang * coins[index])];
      }
      dp[index][rest] = ways;
    }
  }
  return dp[0][aim];
}
```

## DP(优化决策)

![优化决策](/public/images/ds/dp/dp-coins-way-no-limit.drawio.png)

```java
/**
 * 优化后的动态规划（少了一层循环）
 *
 * @param arr
 * @param aim
 * @return
 */
public static int dp2(int[] arr, int aim) {
  if (arr == null || arr.length == 0 || aim < 0) {
    return 0;
  }
  Info info = getInfo(arr);
  int[] coins = info.coins;
  int[] zhangs = info.zhangs;
  int N = coins.length;
  int[][] dp = new int[N + 1][aim + 1];
  dp[N][0] = 1;
  for (int index = N - 1; index >= 0; index--) {
    for (int rest = 0; rest <= aim; rest++) {
      dp[index][rest] = dp[index + 1][rest];
      if (rest - coins[index] >= 0) {
        dp[index][rest] += dp[index][rest - coins[index]];
      }
      if (rest - coins[index] * (zhangs[index] + 1) >= 0) {
        dp[index][rest] -= dp[index + 1][rest - coins[index] * (zhangs[index] + 1)];
      }
    }
  }
  return dp[0][aim];
}
```

<hr/>

| [Java](https://github.com/ZhengKe996/DS/blob/main/src/dp/coins_way_same_value_same_papper.java) |
| :---------------------------------------------------------------------------------------------: |
