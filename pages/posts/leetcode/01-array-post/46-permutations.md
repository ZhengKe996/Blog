---
title: '46. 全排列'
date: 2024-01-28
type: LeetCodeArray`
---

[题目链接 🔗](https://leetcode.cn/problems/permutations/)

```cpp
void recur(vector<int> &nums, int pos, int N, vector<int> &a, vector<bool> &used, vector<vector<int>> &ans) {
    if (pos == N) {
        ans.push_back(a);
        return;
    }

    for (int i = 0; i < N; i++) {
        if (!used[i]) {
            a.push_back(nums[i]);
            used[i] = true;
            recur(nums, pos + 1, N, a, used, ans);
            used[i] = false;
            a.pop_back();
        }
    }
}

vector<vector<int>> permute(vector<int> &nums) {
    int N = nums.size();
    vector<bool> used(N, false);
    vector<vector<int>> ans;
    vector<int> a;
    recur(nums, 0, N, a, used, ans);
    return ans;
}


```
