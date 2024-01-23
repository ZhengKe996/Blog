---
title: '26. 删除有序数组中的重复项'
date: 2024-01-23
type: LeetCodeArray
---

[题目链接 🔗](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/)

**思路: 双指针**

```cpp
/**
 * 26. 删除有序数组中的重复项
 * @param nums
 * @return
 */
int removeDuplicates(vector<int> &nums) {
    int n = 0; // 记录数组新长度
    for (int i = 0; i < nums.size(); i++) {
        if (i == 0 || nums[i] != nums[i - 1]) {
            nums[n] = nums[i];
            n++;
        }
    }
    return n;
}
```
