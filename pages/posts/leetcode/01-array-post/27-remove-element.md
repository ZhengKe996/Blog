---
title: '27. 移除元素'
date: 2024-01-23
type: LeetCodeArray
---

[题目链接 🔗](https://leetcode.cn/problems/remove-element/)

**思路: 双指针**

```cpp
/**
 * 27. 移除元素
 * @param nums
 * @param val
 * @return
 */
int removeElement(vector<int> &nums, int val) {
    int n = 0;
    for (int i = 0; i < nums.size(); i++) {
        if (nums[i] != val) {
            nums[n] = nums[i];
            n++;
        }
    }
    return n;
}
```
