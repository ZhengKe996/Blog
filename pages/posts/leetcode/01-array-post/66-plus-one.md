---
title: '66. 加一'
date: 2024-02-03
type: LeetCodeArray
---

[题目链接 🔗](https://leetcode.cn/problems/plus-one/)

```cpp
/**
 * 66. 加一
 * @param digits
 * @return
 */
vector<int> plusOne(vector<int> &digits) {
    int N = digits.size();
    for (int i = N - 1; i >= 0; i--) {
        digits[i]++;
        digits[i] %= 10;
        if (digits[i] != 0)return digits;
    }
    vector<int> ans(N + 1);
    ans[0] = 1;
    return ans;
}
```
