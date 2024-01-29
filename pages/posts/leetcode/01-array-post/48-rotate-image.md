---
title: '48. 旋转图像'
date: 2024-01-29
type: LeetCodeArray`
---

[题目链接 🔗](https://leetcode.cn/problems/rotate-image/)

```cpp
/**
 * 48. 旋转图像
 * @param matrix
 */
void rotate(vector<vector<int>> &matrix) {
    int N = matrix.size();
    // 矩阵转置
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            swap(matrix[i][j], matrix[j][i]);
        }
    }
    // 左右镜像对称
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N / 2; j++) {
            swap(matrix[i][j], matrix[i][N - j - 1]);
        }
    }
}
```
