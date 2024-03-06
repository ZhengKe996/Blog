---
title: '120. 三角形最小路径和'
date: 2024-03-06
type: LeetCodeArray
---

[题目链接 🔗](https://leetcode.cn/problems/triangle/)

```cpp
/**
 * 三角形最小路径和
 * @param triangle
 * @return
 */
int minimumTotal(vector<vector<int>> &triangle) {
    int n = triangle.size();
    int ans = INT32_MAX;
    vector<vector<int>> f(n, vector<int>(n, 0));

    f[0][0] = triangle[0][0];
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i + 1; j++) {
            int val = triangle[i][j];
            f[i][j] = INT32_MAX;
            if (j != 0) f[i][j] = min(f[i][j], f[i - 1][j - 1] + val);
            if (j != i) f[i][j] = min(f[i][j], f[i - 1][j] + val);
        }
    }
    for (int i = 0; i < n; i++) ans = min(ans, f[n - 1][i]);
    return ans;
}
```
