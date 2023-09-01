---
title: '基数排序（LSD）'
date: 2023-09-01
type: Sort
---

![基数排序（LSD）](/public/images/ds/radixSort.gif)

Java

```java
/**
 * only for no-negative value
 *
 * @param arr
 */
public void radixSort(int[] arr) {
  if (arr == null || arr.length < 2)
    return;

  radixSort(arr, 0, arr.length - 1, maxbits(arr));
}

private int maxbits(int[] arr) {
  int max = Integer.MIN_VALUE;
  for (int i = 0; i < arr.length; i++)
    max = Math.max(max, arr[i]);

  int res = 0;
  while (max != 0) {
    res++;
    max /= 10;
  }
  return res;
}

private int getDigit(int x, int d) {
  return ((x / ((int) Math.pow(10, d - 1))) % 10);
}

private void radixSort(int[] arr, int l, int r, int digit) {
  final int radix = 10;
  int i = 0, j = 0;
  int[] help = new int[r - l + 1];
  for (int d = 1; d <= digit; d++) {
    int[] count = new int[radix];
    for (i = l; i <= r; i++) {
      j = getDigit(arr[i], d);
      count[j]++;
    }
    for (i = 1; i < radix; i++)
      count[i] = count[i] + count[i - 1];

    for (i = r; i >= l; i--) {
      j = getDigit(arr[i], d);
      help[count[j] - 1] = arr[i];
      count[j]--;
    }
    for (i = l, j = 0; i <= r; i++, j++)
      arr[i] = help[j];
  }
}
```

<hr/>

| [C++](https://github.com/ZhengKe996/DS/blob/main/src/radix_sort/radix_sort.cpp) | [Java](https://github.com/ZhengKe996/DS/blob/main/src/radix_sort/radix_sort.java) |
| :-----------------------------------------------------------------------------: | :-------------------------------------------------------------------------------: |
