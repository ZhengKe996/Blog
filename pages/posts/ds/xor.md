---
title: '异或 XOR'
date: 2023-08-16
type: DS
---

### XOR 的运算真值表

```java
0 ^ 0 = 0
0 ^ 1 = 1
1 ^ 0 = 1
1 ^ 1 = 0
```

### XOR 运算律

- 一个值与自身的运算，总是为 0。

  ```java
  x ^ x = 0
  ```

- 一个值与 0 的运算，总是等于其本身。

  ```java
  x ^ 0 = x
  ```

- 可交换性

  ```java
  x ^ y = y ^ x
  ```

- 结合性
  ```java
  x ^ (y ^ z) = (x ^ y) ^ z
  ```
- 异或运算逆运算

  ```java
  x ^ y = z
  z ^ x = y
  z ^ y = x
  ```

### XOR 小技巧

- 计算不进一和

  ```java
  x ^ y
  ```

- 计算进一和

  ```java
  x & y << 1
  ```

- 删除最后一位 1
  ```java
  x & (x - 1)
  ```
- 判断最后一位是不是 1

  ```java
  x & 1
  ```

<hr/>
<ListPosts type="XOR"/>
