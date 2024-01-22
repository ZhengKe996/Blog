---
title: '16. 最接近的三数之和'
date: 2024-01-22
type: LeetCodeArray
---

[题目链接 🔗](https://leetcode.cn/problems/3sum-closest/)

**思路:双指针**

1. 利用 Arrays.sort(nums) 对数组进行排序。
2. 初始化一个用于保存结果的值 `result = nusm[0] + nums[1] + nums[2]` 。
3. 利用下标 i 对数组进行遍历，此时就是在固定第一个元素，注意，下标 i 的边界为 i < nums.length-2，否则设置指针的时候会出现数组越界。
4. 每次遍历的过程中设置两个指针，分别是 `left = i + 1`、`right = nums.length - 1`。
5. 检查 `sum = nums[i] + nums[left] + nums[right]`与 `target` 的距离，如果该距离比之前保存的 `result` 与 `target` 的距离更小，就更新 `result`。
6. 移动双指针。
7. 如果 `sum` 的值比 `target` 大，那么我们让 `right--`，因为数组是有序的，`right--`会使得下一次的 `sum` 更小，也就更接近 `target` 的值
8. 同理，如果 `sum` 的值 `target` 小，那么我们让 `left++`。·
9. `left++` 和 `right--` 的界限自然是 `left != right`，如果 `left == right`，说明已经将所有的元素都遍历过一遍了。
10. 重复上面的操作，直到循环结束，返回 `result`。

```cpp
/**
 * 16. 最接近的三数之和(双指针)
 * @param nums
 * @param target
 * @return
 */
int threeSumClosest(vector<int> &nums, int target) {
    sort(nums.begin(), nums.end());
    int result = nums[0] + nums[1] + nums[2];

    for (int i = 0; i < nums.size() - 2; i++) {
        int left = i + 1;
        int right = nums.size() - 1;

        while (left != right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (abs(sum - target) < abs(result - target)) {
                result = sum;
            }
            if (sum > target)right--;
            else left++;
        }
    }
    return result;
}
```
