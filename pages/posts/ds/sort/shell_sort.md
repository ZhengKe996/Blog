---
title: '希尔排序'
date: 2023-09-01
type: Sort
---

![希尔排序](/public/images/ds/shellSort.gif)

```java
/**
 * 希尔排序
 * 这个排序就是调整步长的插入排序，也可以认为是插入排序的小改进版本；改变不了时间复杂度，只是优化了常数时间
 *
 * @param arr
 */
public void shellSort(int[] arr) {
  if (arr == null || arr.length < 2)
    return;

  int[] step = { 5, 2, 1 };
  for (int s = 0; s < step.length; s++) {
    for (int i = step[s]; i < arr.length; i++) {
      for (int j = i - step[s]; j >= 0 && arr[j] > arr[j + step[s]]; j -= step[s]) {
        swap(arr, j, j + step[s]);
      }
    }
  }
}
```
