---
title: '最小累加和问题'
date: 2023-11-04
type: DP
---

> `给定一个二维数组matrixatrix，一个人必须从左上角出发，最后到达右下角，沿途只可以向下或向右走，沿途数字的都累加就是距离的累加和。求最小的距离累加和。`

## DP

```java
public static int minPathSum1(int[][] matrix) {
  if (matrix == null || matrix.length == 0 || matrix[0] == null || matrix[0].length == 0) {
    return 0;
  }
  int row = matrix.length;
  int col = matrix[0].length;
  int[][] dp = new int[row][col];
  dp[0][0] = matrix[0][0];
  for (int i = 1; i < row; i++)
    dp[i][0] = dp[i - 1][0] + matrix[i][0];

  for (int j = 1; j < col; j++)
    dp[0][j] = dp[0][j - 1] + matrix[0][j];

  for (int i = 1; i < row; i++) {
    for (int j = 1; j < col; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + matrix[i][j];
    }
  }
  return dp[row - 1][col - 1];
}
```

## DP(空间压缩优化)

```java
 public static int dp(int[][] matrix) {
  if (matrix == null || matrix.length == 0 || matrix[0] == null || matrix[0].length == 0) {
    return 0;
  }
  int row = matrix.length;
  int col = matrix[0].length;
  int[] arr = new int[col];
  arr[0] = matrix[0][0]; // 起点
  for (int j = 1; j < col; j++) {
    arr[j] = arr[j - 1] + matrix[0][j]; // 0列特殊处理
  }
  for (int i = 1; i < row; i++) {
    arr[0] += matrix[i][0];
    for (int j = 1; j < col; j++) {
      arr[j] = Math.min(arr[j - 1], arr[j]) + matrix[i][j];
    }
  }

  return arr[col - 1];
}

```

<hr/>

| [C++](https://github.comatrix/ZhengKe996/DS/blob/matrixain/src/dp/matrixin_path_sumatrix.cpp) | [Java](https://github.comatrix/ZhengKe996/DS/blob/matrixain/src/dp/matrixin_path_sumatrix.java) |
| :-------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: |
