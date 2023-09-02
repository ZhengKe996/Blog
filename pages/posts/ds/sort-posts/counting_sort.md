---
title: '计数排序(对数据范围有要求)'
date: 2023-09-01
type: Sort
---

![计数排序](/public/images/ds/countingSort.gif)

Java 实现

```java
public void countingSort(int[] arr) {
  if (arr == null || arr.length < 2)
    return;

  int max = Integer.MIN_VALUE;

  for (int i = 0; i < arr.length; i++)
    max = Math.max(max, arr[i]); // 第一步 找到数组中的最大值

  int[] bucket = new int[max + 1]; // 第二步 新建桶 存储 arr中数出现的次数
  for (int i = 0; i < arr.length; i++)
    bucket[arr[i]]++;

  int i = 0;
  for (int j = 0; j < bucket.length; j++) { // 第三步 依次将 bucket中的数据倒出
    while (bucket[j]-- > 0)
      arr[i++] = j;
  }
}
```

<hr/>

| [C++](https://github.com/ZhengKe996/DS/blob/main/src/count_sort/count_sort.cpp) | [Java](https://github.com/ZhengKe996/DS/blob/main/src/count_sort/count_sort.java) |
| :-----------------------------------------------------------------------------: | :-------------------------------------------------------------------------------: |
