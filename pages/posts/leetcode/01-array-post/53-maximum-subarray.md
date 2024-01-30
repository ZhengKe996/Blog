---
title: '53. 最大子数组和'
date: 2024-01-30
type: LeetCodeArray
---

[题目链接 🔗](https://leetcode.cn/problems/maximum-subarray/)

```cpp
/**
 * 53. 最大子数组和
 * @param nums
 * @return
 */
int maxSubArray(vector<int> &nums) {
    int N = nums.size();
    vector<int> f(N, 0);
    f[0] = nums[0];
    for (int i = 1; i < N; i++) {
        f[i] = max(f[i - 1] + nums[i], nums[i]);
    }

    int ans = f[0];
    for (int i = 1; i < N; i++) {
        ans = max(ans, f[i]);
    }
    return ans;
}
```
