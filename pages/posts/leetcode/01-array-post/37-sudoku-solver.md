---
title: '36. 有效的数独'
date: 2024-01-25
type: LeetCodeArray`
---

[题目链接 🔗](https://leetcode.cn/problems/sudoku-solver/)

```cpp

// 检验[row][col]位置能够合法插入val
bool isValid(vector<vector<char>> &board, int row, int col, char val) {
    // 检验要插入的val在这行是否重复
    for (int i = 0; i < 9; i++) {
        if (board[row][i] == val) return false;
    }
    // 检验要插入的val在这列是否重复
    for (int i = 0; i < 9; i++) {
        if (board[i][col] == val) return false;
    }
    // 定位[row][col]位置所在的那个九宫格的左上角坐标
    int x = (row / 3) * 3;
    int y = (col / 3) * 3;
    // 检验要插入的val在九宫格中是否重复
    for (int i = x; i < x + 3; i++) {
        for (int j = y; j < y + 3; j++) {
            if (board[i][j] == val) return false;
        }
    }
    return true;
}

// 返回值为bool类型，找到一组解就返回
bool dfs(vector<vector<char>> &board) {
    // 遍历数独盘的的每一行
    for (int i = 0; i < 9; i++) {
        // 遍历数独盘的的每一列
        for (int j = 0; j < 9; j++) {
            if (board[i][j] != '.') continue;  // 此位置不是空白格，跳过
            // 依次尝试1~9
            for (char k = '1'; k <= '9'; k++) {
                if (!isValid(board, i, j, k)) continue;
                board[i][j] = k;  // 做出选择
                if (dfs(board)) return true;
                board[i][j] = '.';  // 撤销选择，回溯
            }
            return false;  // 此位置没有能插入的数字，此数独盘无可行解
        }
    }
    return true;  // 每个位置都得到了合法值，得到可行解
}

void solveSudoku(vector<vector<char>> &board) {
    dfs(board);
}
```
