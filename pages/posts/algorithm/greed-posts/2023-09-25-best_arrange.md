---
title: '会议室宣讲安排'
date: 2023-09-25
type: Greed
---

## 题目描述

一些项目要占用一个会议室宣讲，会议室不能同时容纳两个项目的宣讲。 给你每一个项目开始的时间和结束的时间(给你一个数组，里面是一个个具体的项目)，你来安排宣讲的日程，要求会议室进行的宣讲的场次最多。返回这个最多的宣讲场次。

## 暴力解

尝试所有 返回最优解

```java
......
/**
 *
 * @param programs 还剩下的会议都放在programs里
 * @param done     done之前已经安排了多少会议的数量
 * @param timeLine timeLine目前来到的时间点是什么
 * @return
 */
private static int process(Program[] programs, int done, int timeLine) {
  if (programs.length == 0)
    return done;

  // 还剩下的会议
  int max = done;
  for (int i = 0; i < programs.length; i++) {
    if (programs[i].start >= timeLine) {
      Program[] next = copyButExcept(programs, i);
      max = Math.max(max, process(next, done + 1, programs[i].end));
    }
  }
  return max;
}
......
```

## 贪心思路一(失效)

删除开始时间小于 最早开始会议结束时间 的所有节点

![贪心思路一](/public/images/ds/greed/greed-program-01.png)

## 贪心思路二(失效)

选择会议时间持续短的会议

![贪心思路二](/public/images/ds/greed/greed-program-02.png)

## 贪心思路三

选结束时间最早
![贪心思路三](/public/images/ds/greed/greed-program-03.png)

```java
public static int bestArrange2(Program[] programs) {
  Arrays.sort(programs, new ProgramComparator());
  int timeLine = 0;
  int result = 0;
  for (int i = 0; i < programs.length; i++) {
    if (timeLine <= programs[i].start) {
      result++;
      timeLine = programs[i].end;
    }
  }
  return result;
}

public static class ProgramComparator implements Comparator<Program> {

  @Override
  public int compare(Program o1, Program o2) {
    return o1.end - o2.end;
  }
}
```

<hr/>

| [C++ ](https://github.com/ZhengKe996/DS/blob/main/src/greed/best_arrange.cpp) | [Java ](https://github.com/ZhengKe996/DS/blob/main/src/greed/best_arrange.java) |
| :---------------------------------------------------------------------------: | :-----------------------------------------------------------------------------: |
