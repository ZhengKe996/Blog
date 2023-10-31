---
title: '象棋问题'
date: 2023-10-31
type: DP
---

> 给定一个棋盘，左下角起始位置(0,0)，整个棋盘横坐标上 9 条线（范围 0~8），纵坐标上 10 条线（范围 0~9），给定 3 个参数 `x,y,k` 返回"马"从(0,0)位置出发，必须走 k 步，最后落在(x,y)点的方法有多少种？
> 注意：🐎 走"日"

## 暴力解

![暴力解](/public/images/ds/dp/dp-horse-jump.drawio.png)

```java
public static int jump(int a, int b, int k) {
  return process(0, 0, k, a, b);
}

private static int process(int x, int y, int rest, int a, int b) {
  if (x < 0 || x > 9 || y < 0 || y > 8) return 0;
  if (rest == 0) return (x == a && y == b) ? 1 : 0;
  int ways = process(x + 1, y + 2, rest - 1, a, b);
  ways += process(x + 2, y + 1, rest - 1, a, b);
  ways += process(x + 2, y - 1, rest - 1, a, b);
  ways += process(x + 1, y - 2, rest - 1, a, b);
  ways += process(x - 1, y - 2, rest - 1, a, b);
  ways += process(x - 2, y - 1, rest - 1, a, b);
  ways += process(x - 2, y + 1, rest - 1, a, b);
  ways += process(x - 1, y + 2, rest - 1, a, b);
  return ways;
}

```

## DP

**每一层依赖下一层的位置（rest 为 Z 轴）**

![暴力解](/public/images/ds/dp/dp-horse-jump2.drawio.png)

```java
 public static int dp(int a, int b, int k) {
    int[][][] dp = new int[10][9][k + 1];
    dp[a][b][0] = 1;

    for (int rest = 1; rest <= k; rest++) {
      for (int x = 0; x < 10; x++) {
        for (int y = 0; y < 9; y++) {
          int ways = pick(dp, x + 1, y + 2, rest - 1);
          ways += pick(dp, x + 2, y + 1, rest - 1);
          ways += pick(dp, x + 2, y - 1, rest - 1);
          ways += pick(dp, x + 1, y - 2, rest - 1);
          ways += pick(dp, x - 1, y - 2, rest - 1);
          ways += pick(dp, x - 2, y - 1, rest - 1);
          ways += pick(dp, x - 2, y + 1, rest - 1);
          ways += pick(dp, x - 1, y + 2, rest - 1);

          dp[x][y][rest] = ways;
        }
      }
    }
    return dp[0][0][k];
  }

  private static int pick(int[][][] dp, int x, int y, int rest) {
    if (x < 0 || x > 9 || y < 0 || y > 8) return 0;
    return dp[x][y][rest];
  }
```

<hr/>

| [C++](https://github.com/ZhengKe996/DS/blob/main/src/dp/horse_jump.cpp) | [Java](https://github.com/ZhengKe996/DS/blob/main/src/dp/horse_jump.java) |
| :---------------------------------------------------------------------: | :-----------------------------------------------------------------------: |
