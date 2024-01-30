---
title: '45. 跳跃游戏 II'
date: 2024-01-28
type: LeetCodeArray
---

[题目链接 🔗](https://leetcode.cn/problems/jump-game-ii/)

```cpp
/**
 * 45. 跳跃游戏 II
 * @param nums
 * @return
 */
int jump(vector<int> &nums) {
    int now = 0, ans = 0;
    int N = nums.size();
    while (now < N - 1) {
        int right = now + nums[now];
        if (right >= N - 1)return ans + 1;
        int nextRight = right, next = now;
        for (int i = now + 1; i <= right; i++) {
            if (i + nums[i] > nextRight) {
                nextRight = i + nums[i];
                next = i;
            }
        }
        now = next;
        ans++;
    }
    return ans;
}
```
