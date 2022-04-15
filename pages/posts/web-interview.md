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

# 栈

- 先进后出
- API: push pop length
- 相关的: 队列, 堆

### 逻辑结构 VS 物理结构

- 栈 VS 数组
- 栈, 逻辑结构。理论模型, 不管如何实现, 不受任何语言的限制
- 数组, 物理结构, 真实的功能实现, 受限于编程语言

# 判断字符串是否括号匹配

```
一个字符串 s 可能包含 {} () [] 三种括号

判断 s 是否是括号匹配的

如 (a{b}c) 匹配, 而 {a(b 或 {a(b}c) 就不匹配
```

### 实现方法

```ts
/**
 * 判断左右括号是否匹配;
 * @param left : 左括号
 * @param right : 右括号
 * @returns
 */
function isMatch(left: string, right: string): boolean {
  if (left === "{" && right === "}") return true;
  if (left === "(" && right === ")") return true;
  if (left === "[" && right === "]") return true;
  return false;
}

export function matchBracket(str: string): boolean {
  const length = str.length;
  if (length === 0) return true;

  const stack = [];
  const leftSymbols = "{[(";
  const rightSymbols = "}])";

  for (let i = 0; i < length; i++) {
    const s = str[i];

    if (leftSymbols.includes(s)) {
      stack.push(s); // 左括号压栈
    } else if (rightSymbols.includes(s)) {
      // 右括号, 判断栈顶(是否出栈)
      const top = stack[stack.length - 1];
      if (isMatch(top, s)) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
}
```

### 性能分析

- 时间复杂度: O(n)
- 空间复杂度: O(n)
