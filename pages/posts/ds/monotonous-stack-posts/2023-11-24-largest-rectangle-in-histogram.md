---
title: '柱状图中最大的矩形'
date: 2023-11-24
type: MonotonousStack
---

> 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
>
> 求在该柱状图中，能够勾勒出来的矩形的最大面积。
> ![](/public/images/ds/monotonous-stack/largest-rectangle-in-histogram.png)
>
> [题目链接 🔗](https://leetcode.cn/problems/largest-rectangle-in-histogram/description)

## 单调栈

```java
public int largestRectangleArea(int[] heights) {
  if (heights == null || heights.length == 0)
    return 0;
  int maxArea = 0;
  Stack<Integer> stack = new Stack<>();
  for (int i = 0; i < heights.length; i++) {
    while (!stack.isEmpty() && heights[i] <= heights[stack.peek()]) {
      int j = stack.pop();
      int k = stack.isEmpty() ? -1 : stack.peek();
      int curArea = (i - k - 1) * heights[j];
      maxArea = Math.max(maxArea, curArea);
    }
    stack.push(i);
  }

  while (!stack.isEmpty()) {
    int j = stack.pop();
    int k = stack.isEmpty() ? -1 : stack.peek();
    int curArea = (heights.length - k - 1) * heights[j];
    maxArea = Math.max(maxArea, curArea);
  }
  return maxArea;
}
```

<hr/>

| [Java](https://github.com/ZhengKe996/DS/blob/main/src/monotonous_stack/largest_rectangle_in_histogram.java) |
| :---------------------------------------------------------------------------------------------------------: |
