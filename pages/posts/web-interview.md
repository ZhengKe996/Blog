---
title: JavaScript 数据结构与算法面试题
date: 2022-04-14
draft: true
lang: zh
duration: 25min
---

# 算法复杂度

### 什么是复杂度

1. 程序执行时需要的计算量(时间复杂度)和内存空间(空间复杂度) (与代码是否简洁无关)
2. 复杂度是**数量级**(方便记忆、推广), 不是具体的数字
3. 一般针对一个具体的算法, 而非一个完整的系统

### 时间复杂度

**程序执行时需要的计算量(CPU)**
![时间复杂度](/public/images/web-interview/1-1.png)

- O(1) 一次就够 (数量级)
- O(n) 和传输的数据量一样 (数量级)
- O(n^2) 数据量的平方 (数量级)
- O(logn) 数据量的对数 (数量级)
- O(n \* logn) 数据量 \* 数据量的对数 (数量级)

### 空间复杂度

**程序执行时需要的内存空间**
![空间复杂度](/public/images/web-interview/1-1.png)

达到 O(n^2) 的算法基本是不可用的

### 划重点

- 复杂度是**数量级**, 用 O(...)表示, 内部是一个函数表达式
- 前端开发: 重时间, 轻空间

# 旋转数组 K 步

```
输入一个数组 [1, 2, 3, 4, 5, 6, 7]

k = 3, 即旋转 3 步

输出 [5, 6, 7, 1, 2, 3, 4]
```

### 实现方法一 使用 pop 和 unshift

```ts
/**
 * 旋转数组 K 步 使用pop和unshift
 * O(n^2)
 * @param arr arr
 * @param k k
 * @returns arr
 */
export function rotate1(arr: number[], k: number): number[] {
  const length = arr.length;
  if (!k || length == 0) return arr;
  const step = Math.abs(k % length);

  for (let i = 0; i < step; i++) {
    const n = arr.pop();
    if (n != null) {
      arr.unshift(n); // 数组是一个有序结构, unshift 操作非常慢
    }
  }
  return arr;
}
```

### 实现方法二 使用 concat

```ts
/**
 * 旋转数组 K 步 使用concat
 * @param arr arr
 * @param k k
 * @returns arr
 */
export function rotate2(arr: number[], k: number): number[] {
  const length = arr.length;
  if (!k || length == 0) return arr;
  const step = Math.abs(k % length);

  const part1 = arr.slice(-step);
  const part2 = arr.slice(0, length - step);
  const part3 = part1.concat(part2);
  return part3;
}
```

### 性能分析

- 思路一: 时间复杂度 O(n^2), 空间复杂度 O(1)
- 思路二: 时间复杂度 O(1), 空间复杂度 O(n)

注意: 数组操作中 `pop`、`push`快, `unshift`、`shift`、`splice`慢

### 划重点

- 注意算法时间复杂度(前端重时间,轻空间)
- 识破内置 API 的时间复杂度(如 unshift)
- 单元测试, 考虑参数非法情况, 提升代码健壮性
- 比复杂度更重要的是: 代码逻辑清晰, 易读
