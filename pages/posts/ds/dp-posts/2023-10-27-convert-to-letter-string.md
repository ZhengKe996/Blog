---
title: '字母与数字对应的组合数'
date: 2023-10-27
type: DP
---

> **规定 '1'='A','2'='B'....'26'='Z',那么一个数字字符串"111"就可以转化为"AAA","AK","KA";给定一个只有数字字符组成的 Str,返回有多少种转化结果**

## 暴力递归

```java
 public static int number(String str) {
  if (str == null || str.length() == 0) return 0;
  return process(str.toCharArray(), 0); // 调用递归子函数
}

private static int process(char[] str, int i) {
  if (i == str.length) return 1; // 当走到尾巴时，返回1 代表 这一次的组合是成功的
  if (str[i] == '0') return 0; // 当走到中间遇到了单独的字符'0'代表本次组合是失败的

  int ways = process(str, i + 1);
  if (i + 1 < str.length && (str[i] - '0') * 10 + (str[i + 1] - '0') < 27) {
    ways += process(str, i + 2); // 满足条件的 i i+1 位置组合的数 小于27
  }
  return ways;
}
```

## DP

**由暴力递归的参数转移方程改动而来**

```java
public static int dp(String s) {
    if (s == null || s.length() == 0) return 0;// 边界条件
    char[] str = s.toCharArray();
    int N = str.length;
    int[] dp = new int[N + 1]; // 建一张一维表做缓存
    dp[N] = 1; // 对应 if (i == str.length) return 1;

    for (int i = N - 1; i >= 0; i--) {
      if (str[i] != '0') {
        int ways = dp[i + 1]; // 对应 int ways = process(str, i + 1);
        if (i + 1 < str.length && (str[i] - '0') * 10 + (str[i + 1] - '0') < 27) {
          ways += dp[i + 2]; // 对应  ways += process(str, i + 2);
        }
        dp[i] = ways;
      }
    }
    return dp[0];
  }
```

<hr/>

| [C++](https://github.com/ZhengKe996/DS/blob/main/src/dp/convert_to_letter_string.cpp) | [Java](https://github.com/ZhengKe996/DS/blob/main/src/dp/convert_to_letter_string.java) |
| :-----------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: |
