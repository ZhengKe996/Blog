---
title: '57. 插入区间'
date: 2024-02-01
type: LeetCodeArray
---

[题目链接 🔗](https://leetcode.cn/problems/insert-interval/)

```cpp
vector<vector<int>> merge(vector<vector<int>> &intervals) {
    vector<vector<int>> ans;

    ans.push_back(intervals[0]);
    for (int i = 1; i < intervals.size(); i++) {
        if (ans.back()[1] < intervals[i][0]) {
            ans.push_back(intervals[i]);
        } else {
            ans.back()[1] = max(ans.back()[1], intervals[i][1]);
        }
    }
    return ans;
}

/**
 * 57. 插入区间
 * @param intervals
 * @param newInterval
 * @return
 */
vector<vector<int>> insert(vector<vector<int>> &intervals, vector<int> &newInterval) {
    intervals.push_back(newInterval);
    sort(intervals.begin(), intervals.end());
    return merge(intervals);
}
```
