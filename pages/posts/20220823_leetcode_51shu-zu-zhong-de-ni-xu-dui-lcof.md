---
title: 数组中的逆序对
date: 2022-08-23
draft: true
type: LeetCode
lang: zh
duration: 5min
---

## 题目描述

> 在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。
> 来源：力扣（LeetCode）
> 链接：https://leetcode.cn/problems/shu-zu-zhong-de-ni-xu-dui-lcof/
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## Code（暴力解法）

```java
public int reversePairs(int[] nums){
    int res = 0;
    for(int i = 0;i < nums.length;i++){
        for(int j = i + 1;j < nums.length;j++){
            if(nums[i] > nums[j]) res++;
        }
    }
    return res;
}
```

![Code（暴力解法）](/public/images/leetcode/4-1.png)

## Code（归并排序法）

```java
public class Solution{
    private int res = 0;

    public int reversePairs(int[] nums){
        int[] temp = new int[nums.length];
        res = 0;
        sort(nums,0,nums.length - 1,temp);
        return res;
    }

    private void sort(int[] arr,int l,int r,int[] temp){
        if(l >= r) return;

        int mid = l + (r - l) / 2;
        sort(arr,l,mid,temp);
        sort(arr,mid + 1,r,temp);
        if(arr[mid] > (arr[mid + 1])) merge(arr,l,mid,r,temp);
    }

    private void merge(int[] arr,int l,int mid,int r,int[] temp){
        System.arraycopy(arr,l,temp,l,r - l + 1);
        int i = l, j = mid + 1;

        for(int k = l;k <= r;k++){
            if(i > mid){
                arr[k] = temp[j];
                j++;
            }else if(j > r){
                arr[k] = temp[i];
                i++;
            }else if(temp[i] <= (temp[j])){
                arr[k] = temp[i];
                i++;
            }else{
                res += mid - i + 1;
                arr[k] = temp[j];
                j++;
            }
        }
    }
}
```

![Code（归并排序法）](/public/images/leetcode/4-2.png)

## Code（归并排序法不使用外部变量）

![Code（归并排序法）](/public/images/leetcode/4-4.png)
![Code（归并排序法）](/public/images/leetcode/4-3.png)
