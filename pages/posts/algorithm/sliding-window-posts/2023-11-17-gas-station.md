---
title: '加油站的良好出发点问题'
date: 2023-11-17
type: SlideWIndow
---

> 在一条环路上有 n 个加油站，其中第 i 个加油站有汽油 gas[i] 升。
>
> 你有一辆油箱容量无限的的汽车，从第 i 个加油站开往第 i+1 个加油站需要消耗汽油 cost[i] 升。你从其中的一个加油站出发，开始时油箱为空。
>
> 给定两个整数数组 gas 和 cost ，如果你可以按顺序绕环路行驶一周，则返回出发时加油站的编号，否则返回 -1 。如果存在解，则 保证 它是 唯一 的。
>
> 示例 1:
> 输入: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
>
> 输出: 3
>
> 解释:
>
> 从 3 号加油站(索引为 3 处)出发，可获得 4 升汽油。此时油箱有 = 0 + 4 = 4 升汽油
>
> 开往 4 号加油站，此时油箱有 4 - 1 + 5 = 8 升汽油
>
> 开往 0 号加油站，此时油箱有 8 - 2 + 1 = 7 升汽油
>
> 开往 1 号加油站，此时油箱有 7 - 3 + 2 = 6 升汽油
>
> 开往 2 号加油站，此时油箱有 6 - 4 + 3 = 5 升汽油
>
> 开往 3 号加油站，你需要消耗 5 升汽油，正好足够你返回到 3 号加油站。
>
> 因此，3 可为起始索引。

[题目链接 🔗](https://leetcode.cn/problems/gas-station/)

## 一次遍历

从头到尾遍历每个加油站，并检查以该加油站为起点，最终能否行驶一周。我们首先检查第 `0` 个加油站，并试图判断能否环绕一周；如果不能，就从第一个无法到达的加油站开始继续检查。

```java
public static int right(int[] gas, int[] cost) {
  int n = gas.length;
  int i = 0;
  while (i < n) {
    int sumOfGas = 0, sumOfCost = 0;
    int cnt = 0;
    while (cnt < n) {
      int j = (i + cnt) % n;
      sumOfGas += gas[j];
      sumOfCost += cost[j];
      if (sumOfCost > sumOfGas) break;
      cnt++;
    }

    if (cnt == n)  return i;
    else i = i + cnt + 1;
  }
  return -1;
}
```

## 滑动窗口

```java
public static int canCompleteCircuit(int[] gas, int[] cost) {
  boolean[] good = goodArray(gas, cost);
  for (int i = 0; i < gas.length; i++) {
    if (good[i]) {
      return i;
    }
  }
  return -1;
}

public static boolean[] goodArray(int[] g, int[] c) {
  int N = g.length;
  int M = N << 1;
  int[] arr = new int[M];
  // 构造一个纯能量数组(gas[i]-cost[i])，计算前缀和
  for (int i = 0; i < N; i++) {
    arr[i] = g[i] - c[i];
    arr[i + N] = g[i] - c[i];
  }
  for (int i = 1; i < M; i++) {
    arr[i] += arr[i - 1];
  }
// 生成长度为N的窗口
  LinkedList<Integer> w = new LinkedList<>();
  for (int i = 0; i < N; i++) {
    while (!w.isEmpty() && arr[w.peekLast()] >= arr[i]) {
      w.pollLast();
    }
    w.addLast(i);
  }

  boolean[] ans = new boolean[N]; // 开一个N长度的结果数组
  // offset 指数组arr[i-1]位置的值(窗口左端) 以下为滑动窗口的操作
  for (int offset = 0, i = 0, j = N; j < M; offset = arr[i++], j++) {
    if (arr[w.peekFirst()] - offset >= 0) {
      ans[i] = true;
    }
    if (w.peekFirst() == i) {
      w.pollFirst();
    }
    while (!w.isEmpty() && arr[w.peekLast()] >= arr[j]) {
      w.pollLast();
    }
    w.addLast(j);
  }
  return ans;
}
```

<hr/>

| [C++](https://github.com/ZhengKe996/DS/blob/main/src/sliding_window/gas_station.cpp) | [Java](https://github.com/ZhengKe996/DS/blob/main/src/sliding_window/gas_station.java) |
| :----------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: |
