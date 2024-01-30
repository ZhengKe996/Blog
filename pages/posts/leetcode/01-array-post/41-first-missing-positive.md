---
title: '41. 缺失的第一个正数'
date: 2024-01-27
type: LeetCodeArray
---

[题目链接 🔗](https://leetcode.cn/problems/first-missing-positive/)

```cpp
/**
 * 41. 缺失的第一个正数
 * @param nums
 * @return
 */
int firstMissingPositive(vector<int> &nums) {
    int N = nums.size();
    for (int i = 0; i < N; i++) {
        while (nums[i] > 0 && nums[i] <= N && nums[nums[i] - 1] != nums[i]) {
            int temp = nums[nums[i] - 1];
            nums[nums[i] - 1] = nums[i];
            nums[i] = temp;
        }
    }

    for (int i = 0; i < N; i++) {
        if (nums[i] != i + 1)return i + 1;
    }
    return N + 1;

}
```
