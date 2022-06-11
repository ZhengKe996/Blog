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
export function binarySearchRecursive(
  arr: number[],
  target: number,
  startIndex?: number,
  endIndex?: number
): number {
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
- 如果和大于 n, 则继续向前寻找
- 如果和小于 n, 则需要向后 ———— 二分法

```ts
/**
 * 寻找 和为 n 的两个数 (双指针)
 * @param arr
 * @param n
 * @returns
 */
export function findTowNumberDoublePointer(arr: number[], n: number): number[] {
  const res: number[] = [];
  const length = arr.length;
  if (length === 0) return res;

  let i = 0; // 头
  let j = length - 1; // 尾

  while (i < j) {
    const n1 = arr[i];
    const n2 = arr[j];
    const sum = n1 + n2;

    if (sum > n) {
      // sum 大于 n 则 j 要向前移动
      j--;
    } else if (sum < n) {
      // sum 小于 n 则 i 要向前移动
      i++;
    } else {
      // 祥腾
      res.push(n1);
      res.push(n2);
      break;
    }
  }
  return res;
}
```

# 二叉树 (Binary Tree)

- 是一颗树
- 每个节点, 最多只能有 2 个字节点
- 树节点的数据结构(value, left?, right?)

```ts
interface ITreeNode {
  value: number;
  left: ITreeNode | null;
  right: ITreeNode | null;
}
```

### 二叉树的遍历

- 前序遍历: root -> left -> right

  ```ts
  /**
   * 二叉树前序遍历
   *
   * @param node tree node
   * @returns
   */
  function preOrderTraverse(node: ITreeNode | null) {
    if (node == null) return;
    arr.push(node.value);
    preOrderTraverse(node.left);
    preOrderTraverse(node.right);
  }
  ```

- 中序遍历: left -> root -> right

  ```ts
  /**
   * 二叉树中序遍历
   *
   * @param node tree node
   * @returns
   */
  function inOrderTraverse(node: ITreeNode | null) {
    if (node == null) return;
    inOrderTraverse(node.left);
    arr.push(node.value);
    inOrderTraverse(node.right);
  }
  ```

- 后序遍历: left -> right -> root

  ```ts
  /**
   * 二叉树后序遍历
   *
   * @param node tree node
   * @returns
   */
  function postOrderTraverse(node: ITreeNode | null) {
    if (node == null) return;
    postOrderTraverse(node.left);
    postOrderTraverse(node.right);
    arr.push(node.value);
  }
  ```

### 二叉搜索树 BST (Binary Search Tree)

- left(包括其后代) value <= root value
- right(包括其后代) value >= root value
- 可使用**二分法**进行快速查找

# 求一个二插搜索树的第 K 小值

![二叉树](/public/images/web-interview/1-5.png)

### 实现方法

```ts
interface ITreeNode {
  value: number;
  left: ITreeNode | null;
  right: ITreeNode | null;
}
const arr: number[] = [];

/**
 * 二叉树中序遍历
 *
 * @param node tree node
 * @returns
 */
export function inOrderTraverse(node: ITreeNode | null) {
  if (node == null) return;
  inOrderTraverse(node.left);
  arr.push(node.value);
  inOrderTraverse(node.right);
}

/**
 * 寻找 BST 里的 第 K 小值
 *
 * @param node tree node
 * @param k 第几个值
 * @returns
 */
export function getKthValue(node: ITreeNode, k: number): number | null {
  inOrderTraverse(node);
  return arr[k - 1] || null;
}
```

### 划重点

- 二叉树, 和三种(前序、中序、后序)遍历
- 二叉搜索树的特点: left <= root; right >= root
- 二叉搜索树的价值: 可以通过二分法进行快速查找

# 为什么二叉树如此重要,而不是三叉树、四叉树?

**性能 性能 性能**

- 数组: 查找快 O(1), 增删慢 O(n)
- 链表: 查找慢 O(n), 增删快 O(1)
- 二叉搜索树 BST: 查找快、增删快 ———— '木桶效应'

### 二叉搜索树 BST (Binary Search Tree)

![二叉搜索树](/public/images/web-interview/1-7.png)

### 平衡二叉树

- BST 如果不平衡, 则变成链表
- 所有要尽量平衡: 平衡二叉搜索树 BBST
- BBST 增删查, 时间复杂度都是 O(login) 即树的高度

### 红黑树

- 一种自平衡二叉树
- 分为 红/黑 两种颜色, 通过颜色转换来维持树的平衡
- 相当于普通平衡二叉树, 它维持平衡的效率更高

### B 树

- 物理上是多叉树, 但逻辑上是二叉树
- 一般用于高效 I/O, 关系型数据库常用 B 树来组织数据

### 小结

- 数组、链表有各自的缺点
- 特定的二叉树(BBST) 可以让整体效果最优

# 堆栈模型

- 值类型变量, 存储在栈
- 引用类型变量, 存储在堆

### 逻辑结构 VS 物理结构

- 堆, 逻辑结构是一棵二叉树
- 堆: 物理结构是一个数组
- 数组: 适合连续存储, 节省空间

### 堆 VS BST

- 查询比 BST 慢
- 增删比 BST 快, 维持平衡快
- 整体的时间复杂度在 O(logn)级别, 即树的高度

# 斐波那契数列

```
用JS计算斐波那契数列的第 N 个值
注意时间复杂度
```

### 递归代码实现

```ts
/**
 * 斐波那契数列(递归)
 * @param n n
 * @returns
 */
export function fibonacciRecursion(n: number): number {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  return fibonacciRecursion(n - 1) + fibonacciRecursion(n - 2);
}
```

##### 递归 - 大量的重复计算

![斐波那契数列](/public/images/web-interview/1-10.png)
**时间复杂度 O(2^n)**

### 优化

- 不用递归, 使用循环
- 记录中间结果
- 时间复杂度 O(n)

```ts
/**
 * 斐波那契数列(循环)
 * @param n n
 * @returns
 */
export function fibonacciCirculation(n: number): number {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  let n1 = 1; // 记录 n-1 的结果
  let n2 = 0; // 记录 n-2 的结果
  let res = 0;
  for (let i = 2; i <= n; i++) {
    res = n1 + n2;

    // 记录中间结果
    n2 = n1;
    n1 = res;
  }
  return res;
}
```

### 动态规划

- 把一个大问题, 拆解为多个小问题, 逐级向下拆解
- 用递归的思路去分析问题, 再改为循环实现
- 算法三大核心思维: 贪心、二分、动态规划

# 连环问: 青蛙 🐸 跳台阶

- 一只青蛙, 一次可跳 1 级, 也可跳 2 级
- 问: 🐸 跳到 n 级台阶, 总共有多少种方式?

### 动态规划分析问题

- 要跳到 1 级台阶, 就一种方式 f(1) = 1
- 要跳到 2 级台阶, 就二种方式 f(2) = 2
- 要跳到 n 级台阶, f(n) = f(n - 1) + f(n - 2)

# 将数组中的 0 移动到末尾

- 如输入[1,0,3,0,11,0] ， 输出 [1,3,11,0,0,0]
- 只移动 0 其他顺序不变
- 必须在原数组进行操作

### 如果不限制'必须在原数组操作'

- 定义 part1、part2 两个数组
- 遍历数组, 非 0 push 到 part1, 0 push 到 part2
- 返回 `part1.concat(part2)`

### 传统思路 算法不可用

- 遍历数组, 遇到 0 则 push 到数组末端
- 用 splice 截取掉当前元素
- 时间复杂度是 O(n^2)

```ts
/**
 * 移动 0 到数组的末尾(嵌套循环)
 * 时间复杂度 O(n^2）
 * @param arr number arr
 */
export function moveZeroCirculation(arr: number[]): void {
  const length = arr.length;

  if (length === 0) return;
  let zeroLength = 0;
  for (let i = 0; i < length - zeroLength; i++) {
    if (arr[i] === 0) {
      arr.push(0);
      arr.splice(i, 1); // 本身时间复杂度 O(n)
      i--; // 数组截取了一个元素, 1. 要递减, 否则连续 0 时会有错误
      zeroLength++; // 累加 0 的长度
    }
  }
}
```

### 双指针实现

- 定义 j 指向第一个 0, i 指向 j 后面的第一个非 0
- 交换 i 和 j 的值, 继续向后移动
- 只遍历一次, 时间复杂度是 O(n)

```ts
/**
 * 移动 0 到数组的末尾(双指针)
 * @param arr number arr
 */
export function moveZeroDobule(arr: number[]): void {
  const length = arr.length;
  if (length === 0) return;

  let i;
  let j = -1; // 指向第一个 0

  for (i = 0; i < length; i++) {
    if (arr[i] === 0) {
      // 第一个 0
      if (j < 0) j = i;
    }

    if (arr[i] !== 0 && j >= 0) {
      // 交换
      const n = arr[i];
      arr[i] = arr[j];
      arr[j] = n;

      j++;
    }
  }
}
```

### 划重点

- 确认是否必须修改原数组
- 数组是连续存储, 慎用 splice unshift 等 API
- 双指针思路

# 字符串中连续最多的字符以及次数

### 传统思路

- 嵌套循环, 找出每个字符的连接次数, 并记录
- 看似时间复杂度是 O(n^2)
- 实际时间复杂度 O(n) ————跳步

```ts
export interface IRes {
  char: string;
  length: number;
}

/**
 * 求连续最多的字符和次数 (循环)
 * @param str str
 */
export function findContinuousCharCirculation(str: string): IRes {
  const res: IRes = {
    char: "",
    length: 0,
  };

  const length = str.length;
  if (length === 0) return res;

  let tempLength = 0; // 临时记录当前连续字符的长度

  for (let i = 0; i < length; i++) {
    tempLength = 0; // 重置
    for (let j = i; j < length; j++) {
      if (str[i] === str[j]) {
        tempLength++;
      }

      if (str[i] !== str[j] || j === length - 1) {
        // 不相等, 或者已经到了最后一个元素, 要判断最大值
        if (tempLength > res.length) {
          res.char = str[i];
          res.length = tempLength;
        }

        if (i < length - 1) i = j - 1; // 跳步
        break;
      }
    }
  }
  return res;
}
```

### 双指针

- 定义指针 i 和 j, j 不动, i 继续移动
- 如果 i 和 j 的值一直相等, 则 i 继续移动
- 直到 i 和 j 的值不相等, 记录处理, 让 j 追上 i. 继续第一步

```ts
export interface IRes {
  char: string;
  length: number;
}
/**
 * 求连续最多的字符和次数 (双指针)
 * @param str str
 */
export function findContinuousCharDobule(str: string): IRes {
  const res: IRes = {
    char: "",
    length: 0,
  };

  const length = str.length;
  if (length === 0) return res;

  let tempLength = 0; // 临时记录当前连续字符的长度
  let i = 0;
  let j = 0;
  for (; i < length; i++) {
    if (str[i] === str[j]) tempLength++;

    if (str[i] !== str[j] || i === length - 1) {
      // 不相等, 或 i 到了字符串的末尾
      if (tempLength > res.length) {
        res.char = str[j];
        res.length = tempLength;
      }

      tempLength = 0; // reset

      if (i < length - 1) {
        j = i; // 让 j 追上 i
        i--; // 细节
      }
    }
  }
  return res;
}
```

### 其他方法

- 正则表达式 ———— 效率特别低
- 累计各个元素的连续长度, 最后求最大值 ———— 徒增空间复杂度

**注意: 算法题尽量使用低级代码, 慎用语法糖或高级 API**

# JavaScript 实现快速排序

### 传统思路

- 找到中间位置 midValue
- 遍历数组, 小于 midValue 放在 left, 否则放在 fight
- 继续递归, 最后 concat 拼接返回

##### 细节

获取 midValue 的两种方式

- 使用 splice, 会修改数组结构
- 使用 slice, 不会修改原数组 ———— 推荐

### 使用 splice

```ts
/**
 * 快速排序(splice)
 * @param arr number arr
 * @returns
 */
export function quickSortSplice(arr: number[]): number[] {
  const length = arr.length;
  if (length === 0) return arr;

  const midIndex = Math.floor(length / 2);
  const midValue = arr.splice(midIndex, 1)[0];

  const left: number[] = [];
  const right: number[] = [];

  // 这里不直接使用 length, 而是使用 arr.length 因为 arr 已经被 splice 修改了
  for (let i = 0; i < arr.length; i++) {
    const n = arr[i];
    if (n < midValue) {
      // 小于 midValue 则放在 left
      left.push(n);
    } else {
      // 大于 midValue 则放在right
      right.push(n);
    }
  }
  return quickSortSplice(left).concat([midValue], quickSortSplice(right));
}
```

### 使用 slice

```ts
/**
 * 快速排序(slice)
 * @param arr number arr
 * @returns
 */
export function quickSortSlice(arr: number[]): number[] {
  const length = arr.length;
  if (length === 0) return arr;

  const midIndex = Math.floor(length / 2);
  const midValue = arr.slice(midIndex, midIndex + 1)[0];

  const left: number[] = [];
  const right: number[] = [];

  for (let i = 0; i < length; i++) {
    if (i !== midIndex) {
      const n = arr[i];
      if (n < midValue) {
        // 小于 midValue 则放在 left
        left.push(n);
      } else {
        // 大于 midValue 则放在right
        right.push(n);
      }
    }
  }
  return quickSortSlice(left).concat([midValue], quickSortSlice(right));
}
```

### 时间复杂度

- 有遍历有二分———— O(n\*logn)

- 常规排序、嵌套循环 复杂度是 O(n^2)

##### splice 和 slice 没有区分出来

- 算法本身的时间复杂度足够高 O(n\*logn)
- splice 是逐步二分之后执行, 二分会快速削减数量级
- 单独比较 splice 和 slice 效果会非常明显

# 对称数

- 求 1 - 10000 之间的所有对称数(回文)
- 例如: 0,1,2,11,22,101,232,1221...

### 使用数组反转、比较

- 数字转为字符串, 再转换为数组
- 数组 reverse 再 join 为字符串
- 前后字符串进行对比

```ts
/**
 * 查询 1 - max 的所有对称数 数组反转
 * @param max max
 * @returns
 */
export function findPalindromeNumberArr(max: number): number[] {
  const res: number[] = [];
  if (max <= 0) return res;

  for (let i = 1; i <= max; i++) {
    // 转换为字符串 -> 转化为数组 -> 反转 -> 比较
    const s = i.toString();
    if (s === s.split("").reverse().join("")) {
      res.push(i);
    }
  }

  return res;
}
```

### 字符串头尾比较

- 数字转化为字符串
- 字符串头字符比较
- 也可以使用栈, 参考括号匹配, 注意奇偶数

```ts
export function findPalindromeNumberStr(max: number): number[] {
  const res: number[] = [];
  if (max <= 0) return res;

  for (let i = 1; i <= max; i++) {
    const s = i.toString();
    const length = s.length;

    // 字符串头尾比较
    let flag = true;
    let startIndex = 0; // 字符串开始
    let endIndex = length - 1; // 字符串结束
    while (startIndex < endIndex) {
      if (s[startIndex] !== s[endIndex]) {
        flag = false;
        break;
      } else {
        // 继续比较
        startIndex++;
        endIndex--;
      }
    }

    if (flag) res.push(i);
  }
  return res;
}
```

### 生成反转数

- 使用 `%` 和 `Math.floor` 生成反转数
- 前后数字进行对比
- (全程操作数字)

```ts
/**
 * 查询 1 - max 的所有对称数 翻转数字
 * @param max max
 * @returns
 */
export function findPalindromeNumberNum(max: number): number[] {
  const res: number[] = [];
  if (max <= 0) return res;

  for (let i = 1; i <= max; i++) {
    let n = i;
    let rev = 0; // 存储翻转数

    // 生成翻转数
    while (n > 0) {
      rev = rev * 10 + (n % 10);
      n = Math.floor(n / 10);
    }

    if (i === rev) res.push(i);
  }
  return res;
}
```

# 高效的字符串前缀匹配

- 有一个英文单词库(数组), 里面有几十万个英文单词
- 输入一个字符串, 快速判断是不是某一个单词的前缀

### 常规思路

1. 遍历单词库数组
2. indexOf 判断前缀

注: 实际时间复杂度超过了 O(n), 因为要考虑 indexOf 的计算量

### 优化

- 英文字母一共 26 个, 可以提前把单词库数组拆分为 26 个
- 第一层拆分为 26 个, 第二层、第三层还可以继续拆分
- 最后把单词库拆分为一颗

### 性能分析

1. 如果遍历数组, 时间复杂度至少 O(n) 起步(n 是数组长度)
2. 树, 时间复杂度降低到 O(m) (m 是单词长度)

注: 哈希表(对象) 通过 key 查询, 时间复杂度是 O(1)

# 数字千分位格式化

- 将数字千分位格式化, 输出字符串
- 如: 输入数字 12050100, 输出字符串 12,050,100

注: 逆序判断

### 常规思路

- 转换为数组, reverse, 每三位拆分
- 使用正则表达式 (性能较差)
- 使用字符串拆分

### 使用数组

```ts
/**
 * 千分位格式化(使用数组)
 * @param n number
 */
export function formatArr(n: number): string {
  n = Math.floor(n);
  const s = n.toString();
  const arr = s.split("").reverse();

  return arr.reduce((prev, val, index) => {
    if (index % 3 === 0) {
      if (prev) {
        return val + "," + prev;
      } else {
        return val;
      }
    } else {
      return val + prev;
    }
  }, "");
}
```

### 使用字符串

```ts
/**
 * 千分位格式化(使用字符串)
 * @param n number
 */
export function formatStr(n: number): string {
  n = Math.floor(n);

  let res = "";
  const s = n.toString();
  const length = s.length;

  for (let i = length - 1; i >= 0; i--) {
    const j = length - i;
    if (j % 3 === 0) {
      if (i === 0) {
        res = s[i] + res;
      } else {
        res = "," + s[i] + res;
      }
    } else {
      res = s[i] + res;
    }
  }
  return res;
}
```

### 性能分析

- 使用数组, 转换影响性能
- 使用正则, 性能较差
- 使用字符串, 性能较好

### 划重点

- 顺序: 从尾到头
- 尽量不要转换数据结构
- 不要使用正则表达式

# 切换字母大小写

- 输入一个字符串, 切换其中字母的大小写
- 如: 输入字符串 12aBc34 输出字符串 12AbC34

### 常见思路

- 正则表达式
- 通过 ASCII 码判断

### 正则表达式

```ts
/**
 * 切换字母大小写(正则)
 * @param s str
 *
 */
export function switchLetterCaseReg(s: string): string {
  let res = "";

  const length = s.length;
  if (length === 0) return res;

  const reg1 = /[a-z]/;
  const reg2 = /[A-Z]/;

  for (let i = 0; i < length; i++) {
    const c = s[i];
    if (reg1.test(c)) {
      res += c.toUpperCase();
    } else if (reg2.test(c)) {
      res += c.toLowerCase();
    } else {
      res += c;
    }
  }
  return res;
}
```

### ASCII 码

```ts
/**
 * 切换字母大小写(ascii)
 * @param s str
 *
 */
export function switchLetterCaseAscii(s: string): string {
  let res = "";

  const length = s.length;
  if (length === 0) return res;

  for (let i = 0; i < length; i++) {
    const c = s[i];
    const code = c.charCodeAt(0);

    if (code >= 65 && code <= 90) {
      res += c.toLowerCase();
    } else if (code >= 97 && code <= 122) {
      res += c.toUpperCase();
    } else {
      res += c;
    }
  }

  return res;
}
```

### 性能分析

- 正则表达式 性能较差
- ASCII 性能较好

### 划重点

- 慎用 正则表达式
- 常见字符的 ASCII 吗

# 为什么 0.1 + 0.2! !== 0.3

我的理解: 计算机是使用二进制存储数据.

- 整数转换二进制没有误差, 如 9 转换为二进制 1001
- 小数可能无法使用二进制准确表达, 如 0.2 转换为二进制 0.0011001...

🌸 🌸 完结撒花 🌸 🌸
