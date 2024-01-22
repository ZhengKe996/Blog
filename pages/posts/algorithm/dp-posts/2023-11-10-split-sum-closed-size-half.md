---
title: '返回较小集合的累加和(二)'
date: 2023-11-10
type: DP
---

> 给定一个整数数组 arr，请把 arr 中所有的数拆分成两个集合，尽量让两个集合的累加和接近。
> 如果 arr 的长度为偶数，两个集合包含的个数要一样多
> 如果 arr 长度为奇数，两个集合包含的个数必须只差一个
> 请尽量让两个集合的累加和接近
> 返回：累加和最接近情况下，较小集合的累加和。

## 暴力

```java
 public static int right(int[] arr) {
  if (arr == null || arr.length < 2) return 0;

  int sum = 0;
  for (int num : arr) sum += num;

  if ((arr.length & 1) == 0) {
    // 偶数情况下 只有一条路
    return process(arr, 0, arr.length / 2, sum / 2);
  } else {
    // 奇数有两条路
    return Math.max(process(arr, 0, arr.length / 2, sum / 2), process(arr, 0, arr.length / 2 + 1, sum / 2));
  }
}

private static int process(int[] arr, int index, int picks, int rest) {
  if (index == arr.length) return picks == 0 ? 0 : -1;

  int p1 = process(arr, index + 1, picks, rest); // 当前位置不选的情况
  int p2 = -1;
  int next = -1;

  if (arr[index] <= rest) next = process(arr, index + 1, picks - 1, rest - arr[index]); // 当前位置选的情况

  if (next != -1) p2 = arr[index] + next;

  return Math.max(p2, p1);
}

```

## DP

![返回较小集合的累加和](/public/images/ds/dp/dp-split-sum-closed-size-half.drawio.png)

```java
public static int dp(int[] arr) {
  if (arr == null || arr.length < 2) return 0;

  int sum = 0;
  for (int num : arr) sum += num;

  sum = sum >> 1;
  int N = arr.length;
  int M = (N + 1) / 2; // 向上取整

  int[][][] dp = new int[N + 1][M + 1][sum + 1];

  // 初始情况下 全部为 -1
  for (int i = 0; i <= N; i++) {
    for (int j = 0; j <= M; j++) {
      for (int k = 0; k <= sum; k++) {
        dp[i][j][k] = -1;
      }
    }
  }

  // 边界情况
  for (int rest = 0; rest <= sum; rest++) dp[N][0][rest] = 0;

  for (int index = N - 1; index >= 0; index--) {
    for (int picks = 0; picks <= M; picks++) {
      for (int rest = 0; rest <= sum; rest++) {

        int p1 = dp[index + 1][picks][rest]; // 当前位置不选的情况
        int p2 = -1;
        int next = -1;

        if (picks - 1 >= 0 && arr[index] <= rest) next = dp[index + 1][picks - 1][rest - arr[index]]; // 当前位置选的情况

        if (next != -1) p2 = arr[index] + next;
        dp[index][picks][rest] = Math.max(p2, p1);
      }
    }
  }

  if ((arr.length & 1) == 0) {
    // 偶数情况下 只有一条路
    return dp[0][arr.length / 2][sum];
  } else {
    // 奇数有两条路
    return Math.max(dp[0][arr.length / 2][sum], dp[0][arr.length / 2 + 1][sum]);
  }
}
```

<hr/>

| [C++](https://github.com/ZhengKe996/DS/blob/main/src/dp/split_sum_closed_size_half.cpp) | [Java](https://github.com/ZhengKe996/DS/blob/main/src/dp/split_sum_closed_size_half.java) |
| :-------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: |
