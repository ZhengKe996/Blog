---
title: '窗口内的最大值'
date: 2023-11-13
type: SlideWIndow
---

> 假设一个固定大小的 W 的窗口，依次划过 arr，返回每一次滑出窗口的最大值
> 例如：arr=[4,3,5,4,3,3,6,7],w=3;
> 返回：[5,5,5,4,6,7]

## 暴力

```java
public static int[] right(int[] arr, int w) {
  if (arr == null || w < 1 || arr.length < w) return null;

  int N = arr.length;
  int[] res = new int[N - w + 1];
  int index = 0;
  int L = 0;
  int R = w - 1;
  while (R < N) {
    int max = arr[L];
    for (int i = L + 1; i <= R; i++)  max = Math.max(max, arr[i]);
    res[index++] = max;
    L++;
    R++;
  }
  return res;
}

```

## 滑动窗口(双端队列)

**双端队列：如果让窗口依次缩小，哪些数依次成为窗口最大值**

```java
public static int[] getMaxWindow(int[] arr, int w) {
    if (arr == null || w < 1 || arr.length < w) return null;
    LinkedList<Integer> qmax = new LinkedList<>();
    int[] res = new int[arr.length - w + 1];
    int index = 0;
    for (int R = 0; R < arr.length; R++) {
      // 如果队列不为空并且队尾元素小于当前元素，则弹出队尾元素
      while (!qmax.isEmpty() && arr[qmax.peekLast()] <= arr[R]) qmax.pollLast();
      qmax.addLast(R); // 将当前位置的下表添加到队列中
      if (qmax.peekFirst() == R - w) qmax.pollFirst();
      if (R >= w - 1) res[index++] = arr[qmax.peekFirst()]; // 形成窗口的情况下，将队头的值(Max)放入结果数组
    }
    return res;
  }
```

<hr/>

| [C++](https://github.com/ZhengKe996/DS/blob/main/src/sliding_window/sliding_window_max_array.cpp) | [Java](https://github.com/ZhengKe996/DS/blob/main/src/sliding_window/sliding_window_max_array.java) |
| :-----------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------: |
