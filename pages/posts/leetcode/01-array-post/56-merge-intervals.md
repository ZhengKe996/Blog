---
title: '56. 合并区间'
date: 2024-01-31
type: LeetCodeArray
---

[题目链接 🔗](https://leetcode.cn/problems/merge-intervals/)

```cpp
/**
 * 56. 合并区间(双指针)
 * @param intervals
 * @return
 */
vector<vector<int>> merge(vector<vector<int>> &intervals) {
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> ans;
    for (int i = 0; i < intervals.size();) {
        int temp = intervals[i][1];
        int j = i + 1;
        while (j < intervals.size() && intervals[j][0] <= temp) {
            temp = max(temp, intervals[j][1]);
            j++;
        }
        ans.push_back({intervals[i][0], temp});
        i = j;
    }
    return ans;
}
```
