---
title: '快速排序'
date: 2023-08-25
type: Sort
---

![计数排序](/public/images/ds/quickSort.gif)

## 快速排序基础版

```java
public void swap(int[] arr, int i, int j) {
  int temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

public int partition(int[] arr, int l, int r) {
  if (l > r)
    return -1;
  if (l == r)
    return l;
  int lessEqual = l - 1, index = l;
  while (index < r) {
    if (arr[index] <= arr[r])
      swap(arr, index, ++lessEqual);

    index++;
  }
  swap(arr, ++lessEqual, r);
  return lessEqual;
}

public void QuickSort(int[] arr) {
  if (arr == null || arr.length < 2)
    return;
  process(arr, 0, arr.length - 1);
}

private void process(int[] arr, int l, int r) {
  if (l >= r)
    return;
  int mid = partition(arr, l, r);
  process(arr, l, mid - 1);
  process(arr, mid + 1, r);
}

```

## 2.0 划分区间优化

```java
public int[] netherlandsFlag(int[] arr, int L, int R) {
  if (L > R) { // L...R L>R
    return new int[] { -1, -1 };
  }
  if (L == R) {
    return new int[] { L, R };
  }
  int less = L - 1; // < 区 右边界
  int more = R; // > 区 左边界
  int index = L;
  while (index < more) { // 当前位置，不能和 >区的左边界撞上
    if (arr[index] == arr[R]) {
      index++;
    } else if (arr[index] < arr[R]) {
      swap(arr, index++, ++less);
    } else { // >
      swap(arr, index, --more);
    }
  }
  swap(arr, more, R); // <[R] =[R] >[R]
  return new int[] { less + 1, more };
}

// ......

// arr[L...R]排有序，快排 划分区间
private void process2(int[] arr, int l, int r) {
  if (l >= r)
    return;
  int[] equalArea = netherlandsFlag(arr, l, r);
  process2(arr, l, equalArea[0] - 1);
  process2(arr, equalArea[1] + 1, r);
}
```

## 3.0 随机数优化（时间复杂度最好为 O(logn)）

// ......
private void process3(int[] arr, int l, int r) {
if (l >= r)
return;
swap(arr, l + (int) (Math.random() \* (r - l + 1)), r);
int[] equalArea = netherlandsFlag(arr, l, r);
process3(arr, l, equalArea[0] - 1);
process3(arr, equalArea[1] + 1, r);
}

```

<hr/>

| [C++](https://github.com/ZhengKe996/DS/blob/main/src/quick_sort/partition_and_quick_sort.cpp) | [Java](https://github.com/ZhengKe996/DS/blob/main/src/quick_sort/partition_and_quick_sort.java) |
| :-------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: |

<hr/>
<ListPosts type="QuickSort"/>
```
