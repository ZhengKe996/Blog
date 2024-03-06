---
title: '108. 将有序数组转换为二叉搜索树'
date: 2024-03-06
type: LeetCodeArray
---

[题目链接 🔗](https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/)

```cpp
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;

    TreeNode() : val(0), left(nullptr), right(nullptr) {}

    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}

    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

TreeNode *dfs(vector<int> &nums, int low, int height) {
    if (low > height) return nullptr;
    int mid = low + ((height - low) >> 1);
    TreeNode *root = new TreeNode(nums[mid]);

    // 递归建树
    root->left = dfs(nums, low, mid - 1);
    root->right = dfs(nums, mid + 1, height);
    return root;
}

/**
 * 有序数组 To 二叉搜索树
 * @param nums
 * @return
 */
TreeNode *sortedArrayToBST(vector<int> &nums) {
    return dfs(nums, 0, nums.size() - 1);
}

```
