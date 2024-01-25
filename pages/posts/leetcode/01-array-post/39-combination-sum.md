---
title: '39. 组合总和'
date: 2024-01-26
type: LeetCodeArray`
---

[题目链接 🔗](https://leetcode.cn/problems/combination-sum/)

```cpp

/**
 *
 * @param candidates 题目给定数组
 * @param begin
 * @param len
 * @param target
 * @param path 路径数组
 * @param res 结果数组
 */
void dfs(vector<int> &candidates, int begin, int len, int target, vector<int> &path, vector<vector<int>> &res) {
    if (target == 0) {
        res.push_back(path);
        return;
    }

    for (int i = begin; i < len; i++) {
        if (target - candidates[i] < 0) break; // 减枝

        path.push_back(candidates[i]);
        dfs(candidates, i, len, target - candidates[i], path, res);
        path.pop_back(); // 恢复现场
    }
}


/**
 * 39. 组合总和
 * @param candidates
 * @param target
 * @return
 */
vector<vector<int>> combinationSum(vector<int> &candidates, int target) {
    vector<vector<int>> res;

    int N = candidates.size();
    if (N == 0)return res;
    sort(candidates.begin(), candidates.end()); // O(NlogN)
    vector<int> path;
    dfs(candidates, 0, N, target, path, res);
    return res;
}

```
