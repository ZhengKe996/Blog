---
title: '1. 两数之和'
date: 2024-01-20
type: LeetCodeArray
---

[题目链接 🔗](https://leetcode.cn/problems/two-sum/)

**使用哈希表实现 时间复杂度 O(N)**

```cpp
  vector<int> twoSum(vector<int>& nums, int target) {
          unordered_map<int, int> hashtable;
  for (int i = 0; i < nums.size(); i++) {
      auto item = hashtable.find(target - nums[i]);
      if (item != hashtable.end()) return {item->second, i};

      hashtable[nums[i]] = i;
  }
  return {};
  }
```
