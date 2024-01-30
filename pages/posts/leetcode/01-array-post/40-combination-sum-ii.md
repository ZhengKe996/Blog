---
title: '40. 组合总和 II'
date: 2024-01-26
type: LeetCodeArray
---

[题目链接 🔗](https://leetcode.cn/problems/combination-sum-ii/)

```cpp
/**
 *
 * @param candidates 题目给定数组
 * @param start
 * @param len
 * @param target
 * @param path 路径数组
 * @param res 结果数组
 */
void dfs(vector<int> &candidates, int start, int len, int target, vector<int> &path, vector<vector<int>> &res) {
    if (target == 0) {
        res.push_back(path);
        return;
    }

    for (int i = start; i < len && target - candidates[i] >= 0; i++) {
        if (i > start && candidates[i] == candidates[i - 1]) continue; // 重复数不进行操作

        path.push_back(candidates[i]);
        dfs(candidates, i + 1, len, target - candidates[i], path, res);
        path.pop_back(); // 还原现场
    }

}

/**
 * 40. 组合总和 II
 * @param candidates
 * @param target
 * @return
 */
vector<vector<int>> combinationSum2(vector<int> &candidates, int target) {
    int N = candidates.size();
    vector<vector<int>> res;
    vector<int> path;

    sort(candidates.begin(), candidates.end());
    dfs(candidates, 0, N, target, path, res);
    return res;
}
```
