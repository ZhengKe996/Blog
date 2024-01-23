---
title: '31. 下一个排列'
date: 2024-01-23
type: LeetCodeArray
---

[题目链接 🔗](https://leetcode.cn/problems/next-permutation/)

```cpp
/**
 * 31. 下一个排列
 * 需要将一个左边的「较小数」与一个右边的「较大数」交换，以能够让当前排列变大，从而得到下一个排列。
 * 同时我们要让这个「较小数」尽量靠右，而「较大数」尽可能小。当交换完成后，「较大数」右边的数需要按照升序重新排列。
 * @param nums
 */
void nextPermutation(vector<int> &nums) {
    int i = nums.size() - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) i--;
    if (i >= 0) {
        int j = nums.size() - 1;
        while (j >= 0 && nums[i] >= nums[j]) j--;
        swap(nums[i], nums[j]); // 将 左边的「较小数」与一个右边的「较大数」交换
    }
    reverse(nums.begin() + i + 1, nums.end());//将列表反转
}
```

## 偷 🐔 方法

```cpp
void nextPermutation(vector<int>& nums) {
    next_permutation(nums.begin(), nums.end());
}
```
