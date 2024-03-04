---
title: '81. 搜索旋转排序数组 II'
date: 2024-02-29
type: LeetCodeArray
---

[题目链接 🔗](https://leetcode.cn/problems/search-in-rotated-sorted-array-ii/)

```cpp

/**
 * 81. 搜索旋转排序数组 II
 * 思路：二分查找（分段有序）
 * @param nums
 * @param target
 * @return
 */
bool search(vector<int> &nums, int target) {
    if (nums.size() == 0 || nums.empty()) return false;

    int start = 0;
    int end = nums.size() - 1;

    int mid;
    while (start <= end) {
        mid = start + ((end - start) >> 1);
        // 找到的情况下
        if (nums[mid] == target) return true;

        if (nums[start] == nums[mid]) {
            start++;
            continue;
        }

        if (nums[start] < nums[mid]) {
            // 前半部分有序
            if (nums[mid] > target && nums[start] <= target)
                end = mid - 1; // target 在前半部分时
            else
                start = mid + 1; // target在后半部分
        } else {
            // 后半部分有序
            if (nums[mid] < target && nums[end] >= target)
                start = mid + 1;
            else
                end = mid - 1;
        }
    }

    return false;
}
```
