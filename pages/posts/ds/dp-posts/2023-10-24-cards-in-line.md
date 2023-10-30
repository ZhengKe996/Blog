---
title: '纸牌博弈'
date: 2023-10-24
type: DP
---

> `给定一个整型数组arr，代表数值不同的纸牌排成一条线玩家A和玩家B依次拿走每张纸牌`
>
> 1. 规定玩家 A 先拿，玩家 B 后(拿但是每个玩家每次**只能拿走最左或最右的纸牌**)
> 2. 玩家 A 和玩家 B 都绝顶聪明请返回最后获胜者的分数

## 暴力递归

```java
public static int win1(int[] arr) {
  if (arr == null || arr.length == 0)
    return 0;
  int frist = f1(arr, 0, arr.length - 1); // 先手操作（拿大）
  int second = g1(arr, 0, arr.length - 1);// 后手操作(拿小)
  return Math.max(frist, second);
}

// 先手操作
private static int f1(int[] arr, int L, int R) {
  if (L == R)
    return arr[L];
  int p1 = arr[L] + g1(arr, L + 1, R);
  int p2 = arr[R] + g1(arr, L, R - 1);
  return Math.max(p1, p2);
}

// 后手
private static int g1(int[] arr, int L, int R) {
  if (L == R)
    return 0;
  int p1 = f1(arr, L + 1, R);
  int p2 = f1(arr, L, R - 1);
  return Math.min(p1, p2);
}

```

## 笨缓存

**建两张二维表，暂存每一次的结果（动态规划的思想）自定向下的 DP**

```java
public static int win2(int[] arr) {
  if (arr == null || arr.length == 0)
    return 0;
  int N = arr.length;
  int[][] fmap = new int[N][N];
  int[][] gmap = new int[N][N];

  for (int i = 0; i < N; i++) {
    for (int j = 0; j < N; j++) {
      fmap[i][j] = -1;
      gmap[i][j] = -1;
    }
  }
  int frist = f2(arr, 0, arr.length - 1, fmap, gmap);
  int second = g2(arr, 0, arr.length - 1, fmap, gmap);
  return Math.max(frist, second);
}

// 先手操作
private static int f2(int[] arr, int L, int R, int[][] fmap, int[][] gmap) {
  if (fmap[L][R] != -1)
    return fmap[L][R];
  int ans = 0;
  if (L == R)
    ans = arr[L];
  else {
    int p1 = arr[L] + g2(arr, L + 1, R, fmap, gmap);
    int p2 = arr[R] + g2(arr, L, R - 1, fmap, gmap);
    ans = Math.max(p1, p2);
  }
  fmap[L][R] = ans;
  return ans;
}

// 后手
private static int g2(int[] arr, int L, int R, int[][] fmap, int[][] gmap) {
  if (gmap[L][R] != -1)
    return gmap[L][R];
  int ans = 0;
  if (L != R) {
    int p1 = f2(arr, L + 1, R, fmap, gmap);
    int p2 = f2(arr, L, R - 1, fmap, gmap);
    ans = Math.min(p1, p2);
  }
  gmap[L][R] = ans;
  return ans;
}
```

## DP 优化

**建两张二维表，根据暴力递归的公式，在表中暂存对应值，跑完时返回结果**
![DP](/public/images/ds/dp/dp-card.drawio.png)

```java
public static int win3(int[] arr) {
  if (arr == null || arr.length == 0)
    return 0;
  int N = arr.length;
  int[][] fmap = new int[N][N];
  int[][] gmap = new int[N][N];
  for (int i = 0; i < N; i++) {
    fmap[i][i] = arr[i];
  }
  for (int startCol = 1; startCol < N; startCol++) {
    int L = 0;
    int R = startCol;
    while (R < N) {
      fmap[L][R] = Math.max(arr[L] + gmap[L + 1][R], arr[R] + gmap[L][R - 1]);
      gmap[L][R] = Math.min(fmap[L + 1][R], fmap[L][R - 1]);
      L++;
      R++;
    }
  }
  return Math.max(fmap[0][N - 1], gmap[0][N - 1]);
}
```

<hr/>

| [C++](https://github.com/ZhengKe996/DS/blob/main/src/dp/cards_in_line.cpp) | [Java](https://github.com/ZhengKe996/DS/blob/main/src/dp/cards_in_line.java) |
| :------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
