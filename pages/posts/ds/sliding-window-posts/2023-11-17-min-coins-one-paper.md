---
title: '返回最少货币数'
date: 2023-11-17
type: SlideWIndow
---

> arr 是货币数组，其中的值都是正数，再给定一个正数 aim.
> **每个值都被认为是一张货币**
> 返回组成 aim 的最少货币数
> 注意 📢：因为要求最少货币数组，所以每一张货币认为是相同或不同就不重要了

## 暴力递归

```java

public static int minCoins(int[] arr, int aim) {
  return process(arr, 0, aim);
}

private static int process(int[] arr, int index, int rest) {
  if (rest < 0) return Integer.MAX_VALUE;
  if (index == arr.length) return rest == 0 ? 0 : Integer.MAX_VALUE;

  int p1 = process(arr, index + 1, rest);
  int p2 = process(arr, index + 1, rest - arr[index]);

  if (p2 != Integer.MAX_VALUE) p2++;
  return Math.min(p1, p2);
}
```

## DP(记忆化搜索)

```java
  public static int dp(int[] arr, int aim) {
  if (aim == 0) return 0;
  int N = arr.length;
  int[][] dp = new int[N + 1][aim + 1];
  dp[N][0] = 0;
  for (int j = 1; j < aim + 1; j++) {
    dp[N][j] = Integer.MAX_VALUE;
  }
  for (int index = N - 1; index >= 0; index--) {
    for (int rest = 0; rest <= aim; rest++) {
      int p1 = dp[index + 1][rest];
      int p2 = rest - arr[index] >= 0 ? dp[index + 1][rest - arr[index]] : Integer.MAX_VALUE;
      if (p2 != Integer.MAX_VALUE)
        p2++;
      dp[index][rest] = Math.min(p1, p2);
    }
  }
  return dp[0][aim];
}
```

## DP 优化(斜率优化)

```java
public static class Info {
  public int[] coins;
  public int[] zhangs;

  public Info(int[] c, int[] z) {
    this.coins = c;
    this.zhangs = z;
  }
}

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
 * 斜率优化的DP
 *
 * @param arr
 * @param aim
 * @return
 */
public static int dp2(int[] arr, int aim) {
  if (aim == 0) return 0;

  Info info = getInfo(arr);
  int[] coins = info.coins;
  int[] zhangs = info.zhangs;

  int N = coins.length;
  int[][] dp = new int[N + 1][aim + 1];
  dp[N][0] = 0;
  for (int j = 1; j < aim + 1; j++) {
    dp[N][j] = Integer.MAX_VALUE;
  }

  for (int index = N - 1; index >= 0; index--) {
    for (int rest = 0; rest <= aim; rest++) {
      dp[index][rest] = dp[index + 1][rest];
      for (int zhang = 1; zhang * coins[index] <= aim && zhang <= zhangs[index]; zhang++) {
        if (rest - zhang * coins[index] >= 0 && dp[index + 1][rest - zhang * coins[index]] != Integer.MAX_VALUE) {
          dp[index][rest] = Math.min(dp[index][rest], zhang + dp[index + 1][rest - zhang * coins[index]]);
        }
      }
    }
  }
  return dp[0][aim];
}
```

## DP 优化(基于滑动窗口的更新最小值结构)

```java
public static int dp3(int[] arr, int aim) {
  if (aim == 0) return 0;

  Info info = getInfo(arr);
  int[] coins = info.coins;
  int[] zhangs = info.zhangs;

  int N = coins.length;
  int[][] dp = new int[N + 1][aim + 1];
  dp[N][0] = 0;
  for (int j = 1; j < aim + 1; j++) {
    dp[N][j] = Integer.MAX_VALUE;
  }

  for (int index = N - 1; index >= 0; index--) {
    for (int mod = 0; mod < Math.min(aim + 1, coins[index]); mod++) {
      LinkedList<Integer> window = new LinkedList<>();
      window.add(mod);
      dp[index][mod] = dp[index + 1][mod];
      for (int R = mod + coins[index]; R <= aim; R += coins[index]) {
        while (!window.isEmpty() && (dp[index + 1][window.peekLast()] == Integer.MAX_VALUE
            || dp[index + 1][window.peekLast()]
                + compensate(window.peekLast(), R, coins[index]) >= dp[index + 1][R])) {
          window.pollLast();
        }

        window.addLast(R);
        int overdue = R - coins[index] * (zhangs[index] + 1);
        if (window.peekFirst() == overdue)
          window.pollFirst();

        if (dp[index + 1][window.peekFirst()] == Integer.MAX_VALUE) {
          dp[index][R] = Integer.MAX_VALUE;
        } else {
          dp[index][R] = dp[index + 1][window.peekFirst()] + compensate(window.peekFirst(), R, coins[index]);
        }
      }
    }
  }
  return dp[0][aim];
}

public static int compensate(int pre, int cur, int coin) {
  return (cur - pre) / coin;
}
```

<hr/>

| [Java](https://github.com/ZhengKe996/DS/blob/main/src/sliding_window/sliding_window_max_array.java) |
| :-------------------------------------------------------------------------------------------------: |
