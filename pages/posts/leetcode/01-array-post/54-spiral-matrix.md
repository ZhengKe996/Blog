---
title: '54. 螺旋矩阵'
date: 2024-01-30
type: LeetCodeArray
---

[题目链接 🔗](https://leetcode.cn/problems/spiral-matrix/)

```cpp

/**
 * 54. 螺旋矩阵
 * @param matrix
 * @return
 */
vector<int> spiralOrder(vector<vector<int>> &matrix) {
    vector<int> ans;
    if (matrix.empty())return ans;

    int under = 0, bottom = matrix.size() - 1, left = 0, right = matrix[0].size() - 1; // 设定上下左右边界
    while (true) {
        for (int i = left; i <= right; ++i) ans.push_back(matrix[under][i]);
        if (++under > bottom)break; // 向右移动到最右，此时第一行因为已经使用过了，重新定义上边界

        for (int i = under; i <= bottom; ++i)ans.push_back(matrix[i][right]);
        if (--right < left)break; // 向下移动到最底，此时最后一列因为已经使用过了，重新定义右边界

        for (int i = right; i >= left; --i) ans.push_back(matrix[bottom][i]);
        if (--bottom < under)break; // 向左移动到最左，此时最后一行因为已经使用过了，重新定义下边界

        for (int i = bottom; i >= under; --i)ans.push_back(matrix[i][left]);
        if (++left > right)break;// 向上移动到最顶，此时第一列因为已经使用过了，重新定义左边界
    }
    return ans;
}
```
