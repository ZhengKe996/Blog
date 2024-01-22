---
title: '最大值减去最小值小于或等于num的子数组数量'
date: 2023-11-14
type: SlideWIndow
---

> 给定一个整型数组 arr，和一个整数 num
> 某个 arr 中的子数组 sub，如果想达标，必须满足：
> sub 中最大值-sub 中最小值<=sum
> 返回 arr 中达标子数组的数量

## 暴力

```java
public static int right(int[] arr, int sum) {
  if (arr == null || arr.length == 0 || sum < 0) return 0;

  int N = arr.length;
  int count = 0;
  for (int L = 0; L < N; L++) {
    for (int R = L; R < N; R++) {
      int max = arr[L];
      int min = arr[L];
      for (int i = L + 1; i <= R; i++) {
        max = Math.max(max, arr[i]);
        min = Math.min(min, arr[i]);
      }
      if (max - min <= sum) count++;
    }
  }
  return count;
}
```

## 滑动窗口

```java
public static int num(int[] arr, int sum) {
  if (arr == null || arr.length == 0 || sum < 0) return 0;

  int N = arr.length;
  int count = 0;
  LinkedList<Integer> maxWindow = new LinkedList<>();
  LinkedList<Integer> minWindow = new LinkedList<>();
  int R = 0;
  for (int L = 0; L < N; L++) {
    while (R < N) {
      while (!maxWindow.isEmpty() && arr[maxWindow.peekLast()] <= arr[R]) maxWindow.pollLast();
      maxWindow.addLast(R);

      while (!minWindow.isEmpty() && arr[minWindow.peekLast()] >= arr[R]) minWindow.pollLast();
      minWindow.addLast(R);
      if (arr[maxWindow.peekFirst()] - arr[minWindow.peekFirst()] > sum) {
        break;
      } else {
        R++;
      }
    }
    count += R - L;
    if (maxWindow.peekFirst() == L) {
      maxWindow.pollFirst();
    }
    if (minWindow.peekFirst() == L) {
      minWindow.pollFirst();
    }
  }
  return count;
}
```

<hr/>

| [C++](https://github.com/ZhengKe996/DS/blob/main/src/sliding_window/all_less_num_sub_array.cpp) | [Java](https://github.com/ZhengKe996/DS/blob/main/src/sliding_window/all_less_num_sub_array.java) |
| :---------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------: |
