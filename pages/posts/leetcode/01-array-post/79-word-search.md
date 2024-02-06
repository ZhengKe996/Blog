---
title: '79. 单词搜索'
date: 2024-02-06
type: LeetCodeArray
---

[题目链接 🔗](https://leetcode.cn/problems/word-search/)

```cpp
bool dfs(vector<vector<char>> &board, string word, int i, int j, int k, int N, int M) {
    if (i >= N || i < 0 || j >= M || j < 0 || board[i][j] != word[k]) return false;
    if (k == word.size() - 1) return true;
    board[i][j] = '\0';
    bool res = dfs(board, word, i + 1, j, k + 1, N, M) || dfs(board, word, i - 1, j, k + 1, N, M) ||
               dfs(board, word, i, j + 1, k + 1, N, M) || dfs(board, word, i, j - 1, k + 1, N, M);
    board[i][j] = word[k];
    return res;
}

/**
 * 79. 单词搜索(回溯)
 * @param board
 * @param word
 * @return
 */
bool exist(vector<vector<char>> &board, string word) {

    int N = board.size(), M = board[0].size();
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < M; j++) {
            if (dfs(board, word, i, j, 0, N, M))return true;
        }
    }
    return false;
}

```
