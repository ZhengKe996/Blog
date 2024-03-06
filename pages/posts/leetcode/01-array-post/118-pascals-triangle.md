---
title: '118. 杨辉三角'
date: 2024-03-06
type: LeetCodeArray
---

[题目链接 🔗](https://leetcode.cn/problems/pascals-triangle/)

```cpp
/**
 * 生成 杨辉三角
 * @param numRows
 * @return
 */
vector<vector<int>> generate(int numRows) {
    vector<vector<int>> result;
    vector<int> list;

    // 第一层
    list.push_back(1);
    result.push_back(list);

    // 除第一层外
    for (int i = 1; i < numRows; i++) {
        vector<int> curRow;
        curRow.push_back(1);
        vector<int> preRow = result[i - 1];
        for (int j = 1; j < i; j++) {
            int x = preRow[j] + preRow[j - 1];
            curRow.push_back(x);
        }

        curRow.push_back(1);
        result.push_back(curRow);
    }
    return result;
}

```
