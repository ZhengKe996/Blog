---
title: '90. 子集 II'
date: 2024-03-04
type: LeetCodeArray
---

[题目链接 🔗](https://leetcode.cn/problems/subsets-ii/)

```cpp
void
backtracking(vector<int> &nums, int startIndex, vector<bool> &used, vector<vector<int>> &result, vector<int> &path) {
    result.push_back(path);
    for (int i = startIndex; i < nums.size(); i++) {
        if (i > 0 && nums[i] == nums[i - 1] && used[i - 1] == false) continue;

        path.push_back(nums[i]);
        used[i] = true;
        backtracking(nums, i + 1, used, result, path);
        used[i] = false;
        path.pop_back();
    }
}

/**
 * 回溯
 * @param nums
 * @return
 */
vector<vector<int>> subsetsWithDup(vector<int> &nums) {
    vector<vector<int>> result;
    vector<int> path;

    result.clear();
    path.clear();
    vector<bool> used(nums.size(), false);
    sort(nums.begin(), nums.end()); // 数组去重需要排序
    backtracking(nums, 0, used, result, path);
    return result;
}
```
