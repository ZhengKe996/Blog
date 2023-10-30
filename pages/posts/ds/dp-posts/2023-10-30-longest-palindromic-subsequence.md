---
title: '最长回文子序列'
date: 2023-10-30
type: DP
---

> 给你一个字符串 s ，找出其中最长的回文子序列，并返回该序列的长度。

> 子序列定义为：不改变剩余字符顺序的情况下，删除某些字符或者不删除任何字符形成的一个序列。

[题目链接 🔗](https://leetcode.cn/problems/longest-palindromic-subsequence)

## 使用最长公共子序列的方式

**只需将字符串反转求最长公共子序列，即为最长回文子序列**

```java
public int longestPalindromeSubseq0(String s) {
  if (s == null || s.length() == 0)  return 0;
  if (s.length() == 1) return 1;
  char[] str = s.toCharArray();
  char[] reverse = reverse(str);
  return longestCommonSubsequence(str, reverse);
}

public static char[] reverse(char[] str) {
  int N = str.length;
  char[] reverse = new char[str.length];
  for (int i = 0; i < str.length; i++) reverse[--N] = str[i];
  return reverse;
}

public int longestCommonSubsequence(char[] str1, char[] str2) {
  // 省略代码在 最长公共子序列中
}
```

## 暴力递归

```java

public int longestPalindromeSubseq1(String s) {
  if (s == null || s.length() == 0) return 0;
  char[] str = s.toCharArray();
  return f(str, 0, str.length - 1);
}

private static int f(char[] str, int L, int R) {
  if (L == R) return 1;
  if (L == R - 1) return str[L] == str[R] ? 2 : 1;
  int p1 = f(str, L + 1, R - 1); // 位置 L❎ R❎
  int p2 = f(str, L, R - 1); // 位置 L✅ R❎
  int p3 = f(str, L + 1, R); // 位置 L❎ R✅
  int p4 = str[L] != str[R] ? 0 : (2 + f(str, L + 1, R - 1)); // 位置 L✅ R✅ 需要判断是否相等，小心死循环
  return Math.max(Math.max(p1, p2), Math.max(p3, p4));
}
```

## DP

**一张`N*N`的二维表**

```java
public int longestPalindromeSubseq2(String s) {
  if (s == null || s.length() == 0)   return 0;
  char[] str = s.toCharArray();
  int N = str.length;
  int[][] dp = new int[N][N];
  dp[N - 1][N - 1] = 1;
  for (int i = 0; i < N - 1; i++) {
    dp[i][i] = 1;
    dp[i][i + 1] = str[i] == str[i + 1] ? 2 : 1;
  }

  for (int L = N - 3; L >= 0; L--) {
    for (int R = L + 2; R < N; R++) {
      int p1 = dp[L + 1][R - 1];
      int p2 = dp[L][R - 1];
      int p3 = dp[L + 1][R];
      int p4 = str[L] != str[R] ? 0 : (2 + dp[L + 1][R - 1]);
      dp[L][R] = Math.max(Math.max(p1, p2), Math.max(p3, p4));
    }
  }
  return dp[0][N - 1];
}
```

## DP 的优化（常数时间）

```java
// 省略
for (int L = N - 3; L >= 0; L--) {
  for (int R = L + 2; R < N; R++) {
    dp[L][R] = Math.max(dp[L][R - 1], dp[L + 1][R]);
    if (str[L] == str[R])
      dp[L][R] = Math.max(dp[L][R], 2 + dp[L + 1][R - 1]);
  }
}
// 省略
```

<hr/>

| [C++](https://github.com/ZhengKe996/DS/blob/main/src/dp/longest_palindromic_subsequence.cpp) | [Java](https://github.com/ZhengKe996/DS/blob/main/src/dp/longest_palindromic_subsequence.java) |
| :------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------: |
