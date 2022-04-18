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

# 队列

- 先进先出
- API: add delete length
  ![队列](/public/images/web-interview/1-2.png)

### 逻辑结构 VS 物理结构

- 队列是逻辑结构, 抽象模型
- 简单的, 可以用数组、链表实现
- 复杂的队列服务, 需单独设计

# 链表

- 链表是一种物理结构(非逻辑结构), 类似于数组
- 数组需要一段连续的内存区间, 而链表是零散的
- 链表节点的数据结构 {value,next?,prev?}

![链表](/public/images/web-interview/1-3.png)

### 链表 VS 数组

- 都是有序结构
- 链表: 查询慢 O(n), 新增和删除快 O(1)
- 数组: 查询快 O(1), 新增和删除慢 O(n)

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

# 两个栈实现一个队列

```
两个栈实现一个队列
```

### 实现方法

```ts
/**
 * @description 两个栈实现一个队列
 */

export class MyQueue {
  private stack1: number[] = [];
  private stack2: number[] = [];
  add(n: number) {
    this.stack1.push(n);
  }
  delete(): number | null {
    let res;

    const stack1 = this.stack1;
    const stack2 = this.stack2;

    // 将 stack1 所有元素移动到 stack2中
    while (stack1.length) {
      const n = stack1.pop();
      if (n != null) {
        stack2.push(n);
      }
    }

    // stack2 pop
    res = stack2.pop();

    // 将 stack2 所有元素“还给” stack1
    while (stack2.length) {
      const n = stack2.pop();
      if (n != null) {
        stack1.push(n);
      }
    }
    return res || null;
  }
  get length(): number {
    return this.stack1.length;
  }
}
```

### 性能分析

- 时间复杂度: add O(1) delete O(n)
- 空间复杂度: 整体是 O(n)

# 链表反转

```
输入一个单向链表, 输出它的反转( 头变尾,尾变头 )
```

### 解题思路

- 反转, 即节点 next 指向前一个节点
- 很容易造成 nextNode 的丢失
- 需要三个指针 prevNode curNode nextNode

### 实现方法

```ts
/**
 * @description 链表反转
 * 输入一个单向链表, 输出它的反转( 头变尾,尾变头 )
 */

interface ILinkListNode {
  value: number;
  next?: ILinkListNode;
}

export function reverseLinkList(listNode: ILinkListNode): ILinkListNode {
  // 定义三个指针
  let prevNode: ILinkListNode | undefined = undefined;
  let curNode: ILinkListNode | undefined = undefined;
  let nextNode: ILinkListNode | undefined = listNode;

  // 以 nextNode 为主, 遍历链表
  while (nextNode) {
    // 第一个元素, 删掉next, 防止循环引用
    if (curNode && !prevNode) {
      // @ts-ignore
      delete curNode.next;
    }

    // 反转指针
    if (curNode && prevNode) {
      // @ts-ignore
      curNode.next = prevNode;
    }

    // 整体向后移动指针
    prevNode = curNode;
    curNode = nextNode;
    nextNode = nextNode?.next;
  }
  // 当 nextNode 空时, 此时 curNode 尚未设置 next
  curNode!.next = prevNode;
  return curNode!;
}

/**
 * 根据数组创建单向链表
 * @param arr number arr
 * @returns
 */
export function createLinkList(arr: number[]): ILinkListNode {
  const length = arr.length;
  if (length === 0) throw new Error("arr is empty");

  let curNode: ILinkListNode = {
    value: arr[length - 1],
  };
  if (length === 1) return curNode;

  for (let i = length - 2; i >= 0; i--) {
    curNode = {
      value: arr[i],
      next: curNode,
    };
  }
  return curNode;
}
```

### 划重点

- 链表, 链表 VS 数组
- 如何让 nextNode 不丢失
- 链表的代码逻辑比较繁琐, 调试成本高

# 链表和数组, 哪个实现队列更快?

### 分析

- 数组是连续存储, push 很快, shift 很慢
- 链表是非连续存储, add 和 delete 都很快(查找很慢)
- 结论: 链表实现队列更快

### 链表实现队列

- 单向链表, 同时要记录 head 和 tail
- 要从 tail 入队, 从 head 出队, 否则出队时 tail 不好定位
- length 要实时记录, 不可遍历链表获取

### 实现方法

```ts
/**
 * @description 使用链表实现队列
 */

export interface IListNode {
  value: number;
  next: IListNode | null;
}

export class MyQueue {
  private head: IListNode | null = null;
  private tail: IListNode | null = null;
  private len: number = 0;
  /**
   * 入队列, 在tail位置
   * @param n number
   */
  add(n: number) {
    const newNode: IListNode = {
      value: n,
      next: null,
    };

    // 处理 head
    if (this.head == null) {
      this.head = newNode;
    }

    // 处理 tail
    const tailNode = this.tail;
    if (tailNode) {
      tailNode.next = newNode;
    }
    this.tail = newNode;

    this.len++;
  }

  /**
   * 出队列, 在head位置
   */
  delete(): number | null {
    const headNode = this.head;
    if (headNode == null) return null;
    if (this.len <= 0) return null;

    // 取值
    const value = headNode.value;

    // 处理 head
    this.head = headNode.next;

    // 记录长度
    this.len--;
    return value;
  }
  /**
   * length 要单独存储, 不能遍历链表获取(时间复杂度太高)
   */
  get length(): number {
    return this.len;
  }
}
```

### 性能分析

- 空间复杂度都是 O(n)
- add 时间复杂度: 链表 O(1); 数组 O(1)
- delete 时间复杂度: 链表 O(1); 数组 O(n）

### 划重点

- 链表, 链表 VS 数组
- 数据结构的选择 比 算法优化更重要
- 时间复杂度的敏感性, 如 length 不能遍历查找

# 二分查找法

- 递归 - 代码逻辑更加清晰
- 非递归(循环) - 性能更好
- 时间复杂度 O(logn) 非常快

### 实现方法

```ts
/**
 * 二分查找法(循环)
 * @param arr number arr
 * @param target target
 * @returns
 */
export function binarySearchCycle(arr: number[], target: number): number {
  const length = arr.length;
  if (length === 0) return -1;
  let startIndex = 0; // 开始位置
  let endIndex = length - 1;

  while (startIndex <= endIndex) {
    const midIndex = Math.floor((startIndex + endIndex) / 2);
    const midValue = arr[midIndex];

    if (target < midValue) {
      // 目标值较小, 则继续往左边查找
      endIndex = midIndex - 1;
    } else if (target > midValue) {
      // 目标值较大, 则继续往右边查找
      startIndex = midIndex + 1;
    } else {
      // 相等 返回
      return midIndex;
    }
  }
  return -1;
}
```

```ts
/**
 * 二分查找(递归)
 * @param arr arr
 * @param target target
 * @param startIndex start index
 * @param endIndex end index
 */
export function binarySearchRecursive(arr: number[], target: number, startIndex?: number, endIndex?: number): number {
  const length = arr.length;
  if (length === 0) return -1;

  // 开始和结束的范围
  if (startIndex == null) startIndex = 0;
  if (endIndex == null) endIndex = length - 1;

  // 如果 startIndex 与 endIndex 相遇
  if (startIndex > endIndex) return -1;

  // 中间位置
  const midIndex = Math.floor((startIndex + endIndex) / 2);
  const midValue = arr[midIndex];

  if (target < midValue) {
    // 目标值较小, 则继续往左边查找
    return binarySearchRecursive(arr, target, startIndex, midIndex - 1);
  } else if (target > midValue) {
    // 目标值较大, 则继续往右边查找
    return binarySearchRecursive(arr, target, midIndex + 1, endIndex);
  } else {
    // 相等 返回
    return midIndex;
  }
}
```

### 划重点

- 凡有序, 必二分
- 凡二分, 时间复杂度必包含 O(logn)
- 递归 VS 非递归

# 找出数组中和为 n 的两个元素

```
有个递增数组[1,2,4,7,11,15] 和 一个 n = 15

数组中有两个数和是n, 即 4 + 11 = 15
```

### 常规思路与实现方法

- 嵌套循环, 找到一个数, 然后去遍历下一个数,判断 n
- 时间复杂度 O(n^2) 不可用

```ts
/**
 * 寻找 和为 n 的两个数 (嵌套循环)
 * @param arr
 * @param n
 * @returns
 */
export function findTowNumberCycle(arr: number[], n: number): number[] {
  const res: number[] = [];

  const length = arr.length;
  if (length === 0) return res;

  for (let i = 0; i < length - 1; i++) {
    const n1 = arr[i];
    let flag = false;

    for (let j = i + 1; j < length; j++) {
      const n2 = arr[j];
      if (n1 + n2 === n) {
        res.push(n1);
        res.push(n2);
        flag = true;
        break;
      }
    }

    if (flag) break;
  }
  return res;
}
```

### 利用递增(有序)的特性
- 随便找两个数
- 如果和大于n, 则继续向前寻找
- 如果和小于n, 则需要向后 ———— 二分法