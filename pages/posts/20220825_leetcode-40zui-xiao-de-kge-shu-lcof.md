---
title: 最小的k个数
date: 2022-08-25
draft: true
type: LeetCode
lang: zh
duration: 5min
---

> 输入整数数组 arr ，找出其中最小的 k 个数。例如，输入 4、5、1、6、2、7、3、8 这 8 个数字，则最小的 4 个数字是 1、2、3、4。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode.cn/problems/zui-xiao-de-kge-shu-lcof
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### Code

```java
public int[] getLeastNumbers(int[] arr,int k){
    if(k == 0) return new int[0];
    Random rnd = new Random();
    selectK(arr,0,arr.length - 1,k - 1,rnd);
    return Arrays.copyOf(arr,k);
}

private int selectK(int[] arr,int l,int r,int k,Random rnd){
    int p = partition(arr,l,r,rnd);
    if(k == p) return arr[p];
    if(k < p) return selectK(arr,l,p - 1,k,rnd);
    return selectK(arr,p + 1,r,k,rnd);
}

private int partition(int[] arr,int l,int r,Random rnd){
    int p = l + rnd.nextInt(r - l + 1);
    swap(arr,l,p);
    int i = l + 1, j = r;
    while(true){
        while(i <= j && arr[i] < arr[l]) i++;
        while(j >= i && arr[j] > arr[l]) j--;

        if(i >= j) break;
        swap(arr,i,j);
        i++;
        j--;
    }
    swap(arr,l,j);
    return j;
}

private void swap(int[] nums,int i,int j){
    int t = nums[i];
    nums[i] = nums[j];
    nums[j] = t;
}
```

![Code](/public/images/leetcode/7-0.png)
