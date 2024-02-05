---
title: '75. 颜色分类'
date: 2024-02-05
type: LeetCodeArray
---

[题目链接 🔗](https://leetcode.cn/problems/sort-colors/)

```cpp

/**
 * 75. 颜色分类(荷兰国旗问题)
 * @param nums
 */
void sortColors(vector<int> &nums) {
    int N = nums.size();
    if (nums.empty() || N < 2)return;

    int zero = 0;
    int two = N;
    int i = 0;
    while (i < two) {
        if (nums[i] == 0) {
            swap(nums[zero], nums[i]);
            zero++;
            i++;
        } else if (nums[i] == 1) {
            i++;
        } else {
            two--;
            swap(nums[i], nums[two]);
        }
    }

}
```
