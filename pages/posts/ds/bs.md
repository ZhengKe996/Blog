---
title: '二分'
date: 2023-08-16
type: DS
---

## 常用二分查找模版（注意边界）

C++

```cpp
int bs_search(vector<int>& arr, int num) {
  if (arr.size() == 0) return -1;
  int l = 0, r = arr.size() - 1;
  while (l < r) {
    int mid = l + ((r - l) >> 1);
    if (arr[mid] == num)
      return mid;
    else if (arr[mid] > num)
      r = mid - 1;
    else
      l = mid + 1;
  }
  return -1;
}
```

Java

```java
public int BSSearch(int[] arr, int num) {
  if (arr == null || arr.length == 0)
    return -1;
  int l = 0, r = arr.length - 1;
  while (l < r) {
    int mid = l + ((r - l) >> 1);
    if (arr[mid] == num)
      return mid;
    else if (arr[mid] < num)
      l = mid + 1;
    else
      r = mid - 1;
  }
  return -1;
}
```
