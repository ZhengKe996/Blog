---
title: '归并排序'
date: 2023-08-21
type: Sort
---

![计数排序](/public/images/ds/mergeSort.gif)

## 归并排序（递归）

```java
/**
 * 归并排序：递归
 *
 * @param arr
 */
public void mergeSort(int[] arr) {
  if (arr == null || arr.length < 2)
    return;
  process(arr, 0, arr.length - 1);
}

/**
 * 递归子过程
 *
 * @param arr
 * @param l
 * @param r
 */
private void process(int[] arr, int l, int r) {
  if (l == r)
    return;
  int mid = l + ((r - l) >> 1);
  process(arr, l, mid);
  process(arr, mid + 1, r);
  merge(arr, l, mid, r);
}

/**
 * 将给定区间数组进行排序(使用额外数组)
 *
 * @param arr
 * @param l
 * @param mid
 * @param r
 */
private void merge(int[] arr, int l, int mid, int r) {
  int[] help = new int[r - l + 1];
  int i = 0, p1 = l, p2 = mid + 1; // p1 [l~mid] p2 [mid+1~r]
  while (p1 <= mid && p2 <= r) {
    help[i++] = arr[p1] <= arr[p2] ? arr[p1++] : arr[p2++];
  }

  // 要么p1越界、p2越界的情况
  while (p1 <= mid)
    help[i++] = arr[p1++];

  while (p2 <= r)
    help[i++] = arr[p2++];

  for (i = 0; i < help.length; i++)
    arr[l + i] = help[i];
}
```

## 归并排序（迭代）

```java
/**
 * 归并排序（迭代）
 *
 * @param arr
 */
public void mergeSort(int[] arr) {
  if (arr == null || arr.length < 2)
    return;
  int N = arr.length, mergeSize = 1;// mergeSize 步长
  while (mergeSize < N) {
    int l = 0;
    while (l < N) {
      if (mergeSize >= N - l) // 步长越界的情况
        break;

      int mid = l + mergeSize - 1;
      int r = mid + Math.min(mergeSize, N - mid - 1);
      merge(arr, l, mid, r);
      l = r + 1;
    }
    if (mergeSize > N / 2) // 防止溢出
      break;

    mergeSize <<= 1;
  }
}
```

<hr/>

| [C++](https://github.com/ZhengKe996/DS/blob/main/src/merge_sort/merge_sort.cpp) | [Java](https://github.com/ZhengKe996/DS/blob/main/src/merge_sort/merge_sort.java) |
| :-----------------------------------------------------------------------------: | :-------------------------------------------------------------------------------: |

<hr/>
<ListPosts type="Merge"/>
