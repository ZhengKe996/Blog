---
title: '34. 在排序数组中查找元素的第一个和最后一个位置'
date: 2024-01-24
type: LeetCodeArray
---

[题目链接 🔗](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/)

**两次二分**

```cpp
/**
 * 34. 在排序数组中查找元素的第一个和最后一个位置
 * @param nums
 * @param target
 * @return
 */
vector<int> searchRange(vector<int> &nums, int target) {
    vector<int> ans;
    int N = nums.size();
    int l = 0, r = N;

    while (l < r) {
        int mid = l + ((r - l) >> 1);
        if (nums[mid] >= target) r = mid;
        else l = mid + 1;
    }

    ans.push_back(r);// 查找到元素的第一个位置

    l = -1;
    r = N - 1;
    while (l < r) {
        int mid = l + ((r - l + 1) >> 1);
        if (nums[mid] <= target) l = mid;
        else r = mid - 1;
    }
    ans.push_back(r); // 查找到元素最后一个位置

    if (ans[0] > ans[1]) return {-1, -1};
    else return ans;
}


```
