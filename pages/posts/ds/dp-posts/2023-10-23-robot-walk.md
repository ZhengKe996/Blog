---
title: '机器人到达指定位置的方法数'
date: 2023-10-23
type: DP
---

> `假设有排成一行的N个位置，记为1~N，N一定大于或等于2`
>
> 1.  开始时机器人在其中的 M 位置（M 一定在 1~N 中）
> 2.  如果机器人来到 1 位置，那么下一步只能往右来到 2 位置
> 3.  如果机器人来到 N 位置，那么下一步只能往左来到 N-1 位置
> 4.  如果机器人来到中间位置，那么下一步可以往左走或往右走
> 5.  规定机器人必须走 K 步，最终能来到 P 位置（P 也是 1~N 中的一个位置）的方法数

## 暴力递归

```java
public static int ways1(int N, int start, int aim, int K) {
  if (N < 2 || start < 1 || start > N || aim < 1 || aim > N || K < 1)
    return -1;
  return process1(start, K, aim, N);
}

/**
 *
 * @param cur  机器人当前来到的位置
 * @param rest 机器人还有rest步要走
 * @param aim  最终的目标
 * @param N    位置范围1~N
 * @return
 */
private static int process1(int cur, int rest, int aim, int N) {
  if (rest == 0) return cur == aim ? 1 : 0; // 没有剩余步可以走了,当前是否命中？
  if (cur == 1) return process1(2, rest - 1, aim, N); // 到1位置的情况，下一步要往右边走
  if (cur == N) return process1(N - 1, rest - 1, aim, N);// 到N位置的情况，下一步要往左边走
  return process1(cur - 1, rest - 1, aim, N) + process1(cur + 1, rest - 1, aim, N);
}
```

## 傻缓存优化（记忆化搜索）

**建一张二维表，暂存每一次的结果（动态规划的思想）自定向下的 DP**

```java
public static int ways2(int N, int start, int aim, int K) {
  if (N < 2 || start < 1 || start > N || aim < 1 || aim > N || K < 1)
    return -1;
  int[][] dp = new int[N + 1][K + 1];
  for (int i = 0; i <= N; i++) {
    for (int j = 0; j <= K; j++)
      dp[i][j] = -1;
  }
  return process2(start, K, aim, N, dp);
}

private static int process2(int cur, int rest, int aim, int N, int[][] dp) {
  if (dp[cur][rest] != -1)
    return dp[cur][rest];

  // 之前没算过
  int ans = 0;
  if (rest == 0)
    ans = cur == aim ? 1 : 0;
  else if (cur == 1)
    ans = process2(2, rest - 1, aim, N, dp);
  else if (cur == N)
    ans = process2(N - 1, rest - 1, aim, N, dp);
  else
    ans = process2(cur - 1, rest - 1, aim, N, dp) + process2(cur + 1, rest - 1, aim, N, dp);

  dp[cur][rest] = ans;

  return ans;
}
```

## 优化

**建一张二维表，根据三种状态，暂存结果**

![优化](/public/images/ds/dp/dp-robot-walk.drawio.png)

```java
public static int ways3(int N, int start, int aim, int K) {
  if (N < 2 || start < 1 || start > N || aim < 1 || aim > N || K < 1)
    return -1;

  int[][] dp = new int[N + 1][K + 1];
  dp[aim][0] = 1;
  for (int rest = 1; rest <= K; rest++) {
    dp[1][rest] = dp[2][rest - 1];
    for (int cur = 2; cur < N; cur++) {
      dp[cur][rest] = dp[cur - 1][rest - 1] + dp[cur + 1][rest - 1];
    }
    dp[N][rest] = dp[N - 1][rest - 1];
  }
  return dp[start][K];
}

```

<hr/>

| [C++](https://github.com/ZhengKe996/DS/blob/main/src/dp/robot_walk.cpp) | [Java](https://github.com/ZhengKe996/DS/blob/main/src/dp/robot_walk.java) |
| :---------------------------------------------------------------------: | :-----------------------------------------------------------------------: |
