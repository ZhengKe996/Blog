---
title: '省份数量'
date: 2023-10-08
type: UnionSet
---

`有 n 个城市，其中一些彼此相连，另一些没有相连。如果城市 a 与城市 b 直接相连，且城市 b 与城市 c 直接相连，那么城市 a 与城市 c 间接相连。省份 是一组直接或间接相连的城市，组内不含其他没有相连的城市。给你一个 n x n 的矩阵 isConnected ，其中 isConnected[i][j] = 1 表示第 i 个城市和第 j 个城市直接相连，而 isConnected[i][j] = 0 表示二者不直接相连。返回矩阵中 省份 的数量。`

[省份数量](https://leetcode.cn/problems/number-of-provinces/description)

## 思路 并查集实现

```java
public int findCircleNum(int[][] isConnected) {
  int N = isConnected.length;
  UnionFind unionFind = new UnionFind(N);
  for (int i = 0; i < N; i++) {
    for (int j = i + 1; j < N; j++) {
      if (isConnected[i][j] == 1) { // i和j互相认识 合并为一个集
        unionFind.union(i, j);
      }
    }
  }
  return unionFind.sets();
}
```

<hr/>

| [C++](https://github.com/ZhengKe996/DS/blob/main/src/union_set/friend_circles.cpp) | [Java](https://github.com/ZhengKe996/DS/blob/main/src/union_set/friend_circles.java) |
| :--------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------: |
