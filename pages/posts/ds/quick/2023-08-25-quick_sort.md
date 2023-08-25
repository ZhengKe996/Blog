---
title: '荷兰国旗问题'
date: 2023-08-25
type: QuickSort
---

[题目链接](https://leetcode.cn/problems/sort-colors/)

## Dutch National Flag Problem 荷兰国旗问题描述了这样一个问题：荷兰国旗由红、白、蓝三种颜色组成。现在给定 n 个这三种颜色的小球，且乱序排列在一起。现期望对这些小球进行排序，使得所有相同颜色的球在一起，且颜色顺序依次为红、白、蓝。该问题对于排序算法的设计具有重要意义

| [C++](https://github.com/ZhengKe996/DS/blob/main/src/quick_sort/netherlandsFlag.cpp) | [Java](https://github.com/ZhengKe996/DS/blob/main/src/quick_sort/netherlandsFlag.java) |
| :----------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: |

### 划分区间（快排 3.0）

Java

```java
class Solution {
  public void sortColors(int[] arr) {
    if (arr == null || arr.length < 2) return;
    process(arr, 0, arr.length - 1);
  }


  public void process(int[] arr, int l, int r) {
    if (l >= r) return;
    swap(arr, l + (int) (Math.random() * (r - l + 1)), r);
    int[] equalArea = netherlandsFlag(arr, l, r);
    process(arr, l, equalArea[0] - 1);
    process(arr, equalArea[1] + 1, r);
  }

  public int[] netherlandsFlag(int[] arr, int l, int r) {
    if (l > r) return new int[] { -1, -1 };
    if (l == r) return new int[] { l, r };

    int less = l - 1, more = r, index = l;
    while (index < more) {
    if (arr[index] == arr[r])
        index++;
    else if (arr[index] < arr[r])
        swap(arr, index++, ++less);
    else
        swap(arr, index, --more);
    }
    swap(arr, more, r);
    return new int[] { less + 1, more };
  }

  public void swap(int[] arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}
```

### 快排非递归（栈）

Java

```java
class Solution {
    public class Op {
        public int l, r;
        public Op(int l, int r) {
            this.l = l;
            this.r = r;
        }
    }

    public void sortColors(int[] arr) {
        if (arr == null || arr.length < 2)return;
        int n = arr.length;
        swap(arr, (int) (Math.random() * n), n - 1);
        int[] equalArea = netherlandsFlag(arr, 0, n - 1);
        int el = equalArea[0], er = equalArea[1];
        Stack<Op> stack = new Stack<>();
        stack.push(new Op(0, el - 1));
        stack.push(new Op(er + 1, n - 1));
        while (!stack.isEmpty()) {
        Op op = stack.pop();
        if (op.l < op.r) {
                swap(arr, op.l + (int) (Math.random() * (op.r - op.l + 1)), op.r);
                equalArea = netherlandsFlag(arr, op.l, op.r);
                el = equalArea[0];
                er = equalArea[1];
                stack.push(new Op(op.l, el - 1));
                stack.push(new Op(er + 1, op.r));
            }
        }
    }
    // ......
}
```

### 快排非递归（队列）

Java

```java

class Solution {
  public class Op {
    public int l, r;
    public Op(int l, int r) {
        this.l = l;
        this.r = r;
    }
  }

  public void sortColors(int[] arr) {
    if (arr == null || arr.length < 2) return;
    int n = arr.length;
    swap(arr, (int) (Math.random() * n), n - 1);

    int[] equalArea = netherlandsFlag(arr, 0, n - 1);
    int el = equalArea[0], er = equalArea[1];
    Queue<Op> queue = new LinkedList<>();
    queue.offer(new Op(0, el - 1));
    queue.offer(new Op(er + 1, n - 1));
    while (!queue.isEmpty()) {
      Op op = queue.poll();
      if (op.l < op.r) {
          swap(arr, op.l + (int) (Math.random() * (op.r - op.l + 1)), op.r);
          equalArea = netherlandsFlag(arr, op.l, op.r);
          el = equalArea[0];
          er = equalArea[1];
          queue.offer(new Op(op.l, el - 1));
          queue.offer(new Op(er + 1, op.r));
      }
    }
  }
  //......
}
```
