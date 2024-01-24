---
title: '33. 搜索旋转排序数组'
date: 2024-01-24
type: LeetCodeArray
---

[题目链接 🔗](https://leetcode.cn/problems/search-in-rotated-sorted-array/)

## 解法一(朴素二分查找 无法 AC)

```cpp

int find(vector<int> &nums, int left, int right, int target) {
    while (left < right) {
        int mid = left + right >> 1;
        if (nums[mid] >= target) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return nums[left] == target ? left : -1;
}

/**
 * 33. 搜索旋转排序数组(二分)
 * @param nums
 * @param target
 * @return
 */
int search(vector<int> &nums, int target) {
    int N = nums.size();
    int idx = 0;

    for (int i = 0; i < N; i++) {
        if (nums[i] > nums[i + 1]) {
            idx = i; // 对数组进行遍历，找到旋转点 时间复杂度O(N)
            break;
        }
    }
    int ans = find(nums, 0, idx, target);// 二分查找 时间复杂度O(logn)
    if (ans != -1)return ans; // 在左半段找到，直接返回

    if (idx + 1 < N) ans = find(nums, idx + 1, N - 1, target); // 左半段没找到的情况下 在右半段进行查找
    return ans;
}

```

## 解法二 二分

[题解 🔗](https://leetcode.cn/problems/search-in-rotated-sorted-array/solutions/577298/shua-chuan-lc-yan-ge-ologn100yi-qi-kan-q-xifo/)

```cpp
/**
 * 33. 搜索旋转排序数组(二分)
 * @param nums
 * @param target
 * @return
 */
int search2(vector<int> &nums, int target) {
    int N = nums.size();
    int l = 0, r = N - 1;
    // 第一次二分：从中间开始找满足 >= nums[0]的旋转点
    while (l < r) {
        int mid = l + r + 1 >> 1;
        if (nums[mid] >= nums[0]) l = mid;
        else r = mid - 1;
    }

    if (target >= nums[0]) l = 0;
    else {
        l++;
        r = N - 1;
    }
    // 第二次二分 通过与 nums[0]进行比较，判断 target 是在旋转点的左边还是右边

    while (l < r) {
        int mid = l + r >> 1;
        if (nums[mid] >= target) r = mid;
        else l = mid + 1;
    }
    return (nums[] == target ? r : -1);
}
```
