---
title: '63. 不同路径 II'
date: 2024-02-02
type: LeetCodeArray
---

[题目链接 🔗](https://leetcode.cn/problems/unique-paths-ii/)

```cpp
/**
 * 63. 不同路径 II(DP)
 * @param obstacleGrid
 * @return
 */
int uniquePathsWithObstacles(vector<vector<int>> &obstacleGrid) {
    int N = obstacleGrid.size(), M = obstacleGrid[0].size();
    vector<int> f(M, 0);
    f[0] = (obstacleGrid[0][0] == 0);
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < M; j++) {
            if (obstacleGrid[i][j] == 1) {
                f[j] = 0;
                continue;
            }
            if (j - 1 >= 0 && obstacleGrid[i][j - 1] == 0) f[j] += f[j - 1];
        }
    }
    return f.back();
}
```
