---
title: '最长公共子序列'
date: 2023-10-30
type: DP
---

[题目链接](https://leetcode.cn/problems/longest-common-subsequence)

> 给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。
>
> 一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
>
> 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
> 两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。

## 纯暴力

从 `str1[0...i]`和`str2[0...j]`，这个范围上最长公共子序列长度是多少？
可能性分类:

- 最长公共子序列，一定不以 `str1[i]`字符结尾、也一定不以 `str2[j]`字符结尾
- 最长公共子序列，可能以 `str1[i]`字符结尾、但是一定不以 `str2[j]`字符结尾
- 最长公共子序列，一定不以` `str1[i]`字符结尾、但是可能以 `str2[j]`字符结尾
- 最长公共子序列，必须以 `str1[i]`字符结尾、也必须以 `str2[j]`字符结尾

这几种可能性调用后续的递归。

1.  最长公共子序列，一定不以 `str1[i]`字符结尾、也一定不以 `str2[j]`字符结尾

    - 如果是这种情况，那么有没有`str1[i]`和 str2[j]就根本不重要了，因为这两个字符一定没用;所以砍掉这两个字符，最长公共子序列 = `str1[0...i-1]`与 `str2[0...j-1]`的最长公共子序列长度(后续递归)

2.  最长公共子序列，可能以 `str1[i]`字符结尾、但是一定不以 `str2[j]`字符结尾

    - 如果是这种情况，可以确定`str2[j]`一定没有用，要砍掉；但是 `str1[i]`可能有用，所以要保留;所以，最长公共子序列 = `str1[0...i]`与 `str2[0...j-1]`的最长公共子序列长度(后续递归)

3.  最长公共子序列，一定不以 `str1[i]`字符结尾、但是可能以 str2[j]字符结尾

    - 最长公共子序列 = `str1[0...i-1]`与 `str2[0...j]`的最长公共子序列长度(后续递归)

4.  最长公共子序列，必须以 `str1[i]`字符结尾、也必须以 str2[j]字符结尾
    - 可能性(4)存在的条件，一定是在 `str1[i] == str2[j]`的情况下，才成立的 最长公共子序列总长度 = `str1[0...i-1]与 str2[0...j-1]`的最长公共子序列长度(后续递归) + 1(共同的结尾)

```java
  public int longestCommonSubsequence1(String text1, String text2) {
    if (text1 == null || text2 == null || text1.length() == 0 || text2.length() == 0) return 0;
    char[] str1 = text1.toCharArray();
    char[] str2 = text2.toCharArray();
    return process1(str1, str2, str1.length - 1, str2.length - 1);
  }

  private static int process1(char[] str1, char[] str2, int i, int j) {
    if (i == 0 && j == 0) return str1[i] == str2[j] ? 1 : 0;
    else if (i == 0) {
      if (str1[i] == str2[j]) return 1;
      else return process1(str1, str2, i, j - 1);
    } else if (j == 0) {
      if (str1[i] == str2[j]) return 1;
      else return process1(str1, str2, i - 1, j);
    } else {
      int p1 = process1(str1, str2, i, j - 1);
      int p2 = process1(str1, str2, i - 1, j);
      int p3 = str1[i] == str2[j] ? 1 + process1(str1, str2, i - 1, j - 1) : 0;
      return Math.max(p1, Math.max(p2, p3));
    }
  }

```

## 傻缓存 DP

```java
public int longestCommonSubsequence2(String text1, String text2) {
    if (text1 == null || text2 == null || text1.length() == 0 || text2.length() == 0) return 0;
    char[] str1 = text1.toCharArray();
    char[] str2 = text2.toCharArray();
    int N = str1.length;
    int M = str2.length;
    int[][] dp = new int[N][M];
    dp[0][0] = str1[0] == str2[0] ? 1 : 0;
    for (int j = 1; j < M; j++) dp[0][j] = str1[0] == str2[j] ? 1 : dp[0][j - 1];

    for (int i = 1; i < N; i++) dp[i][0] = str1[i] == str2[0] ? 1 : dp[i - 1][0];

    for (int i = 1; i < N; i++) {
      for (int j = 1; j < M; j++) {
        int p1 = dp[i][j - 1];
        int p2 = dp[i - 1][j];
        int p3 = str1[i] == str2[j] ? 1 + dp[i - 1][j - 1] : 0;
        dp[i][j] = Math.max(p1, Math.max(p2, p3));
      }
    }
    return dp[N - 1][M - 1];
  }
```

<hr/>

| [C++](https://github.com/ZhengKe996/DS/blob/main/src/dp/longest_common_subsequence.cpp) | [Java](https://github.com/ZhengKe996/DS/blob/main/src/dp/longest_common_subsequence.java) |
| :-------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: |
