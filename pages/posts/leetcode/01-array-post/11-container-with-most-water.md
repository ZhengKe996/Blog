---
title: '11. 盛最多水的容器'
date: 2024-01-21
type: LeetCodeArray
---

[题目链接 🔗](https://leetcode.cn/problems/container-with-most-water/)

**思路：双指针 当指针相遇时跳出循环**

```cpp
/**
 * 11. 盛最多水的容器
 * @param height 给定的高度数组
 * @return
 */
int maxArea(vector<int> &height) {
    int i = 0, j = height.size() - 1, ans = 0;
    while (i < j) {
        ans = max(ans, min(height[i], height[j]) * (j - i)); // 取 i与j 位置的最小值为高 乘以长(j-i) 并与暂存结果相比取max
        if (height[i] <= height[j]) {  // 如果 i位置的高比j位置的高小 则i++ 反之 j-- 直到 i=j
            i++;
        } else {
            j--;
        }
    }
    return ans; // 循环结束保证了ans暂存的永远都是max值
}
```
