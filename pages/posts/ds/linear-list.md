---
title: '线性表'
date: 2024-01-22
type: DS
---

# 抽象数据类型定义

```cpp
ADT List{
  数据对象: D={ai|ai 属于 Elemset,(i=1,2,...n,n>=0)};
  数据关系: R={<ai-1,ai>|ai-1,ai属于D,(i=1,2,...,n)};
  基本操作
    InitList(&L)
      操作结果: 构造一个空的线性表L;
    DestroyList(&L)
      初始条件: 线性表L已经存在;
      操作结果: 销毁线性表L;
    ClearList(&L)
      初始条件: 线性表L已经存在;
      操作结果: 将线性表L重置为空表;
    ListEmpty(L)
      初始条件: 线性表L已经存在;
      操作结果: 若线性表L为空表，则返回TURE，否则返回FALSE;
    ListLength(L)
      初始条件: 线性表L已经存在;
      操作结果: 返回线性表L中的数据元素个数;
    GetElem(L,i,&e)
      初始条件: 线性表L已经存在,i<=i<=ListLength(L);
      操作结果: 用e返回线性表L中第i个数据元素的值;
    LocateElem(L,e,compare())
      初始条件: 线性表L已经存在,compare()是数据元素判定函数;
      操作结果: 返回L中第1个与e满足compare()的元素的位序吗，若这样的元素不存在则返回 0;
    PriorElem(L,cur_e,&pre_e)
      初始条件: 线性表L已经存在;
      操作结果: 若cur_e是L的数据元素且不是第一个，则用pre_e返回它的前驱，否则操作失败，pre_e无意义;
    NextElem(L,cur_e,&next_e)
      初始条件: 线性表L已经存在;
      操作结果: 若cur_e是L的数据元素且不是最后一个，则用next_e返回它的后继，否则操作失败，next_e无意义;
    ListInsert(&L,i,e)
      初始条件: 线性表L已经存在,i<=i<=ListLength(L)+1;
      操作结果: 在L的第i个位置之前插入新的数据元素e,L的长度+1;
    ListDelete(&L,i,&e)
      初始条件: 线性表L已经存在,i<=i<=ListLength(L);
      操作结果: 删除L的第i个数据元素，并用e返回其值，L的长度减一;
    ListTraverse(&L,visited())
      初始条件: 线性表L已经存在;
      操作结果: 依次对线性表中每个元素调用visited();
} ADT List;

```

<!-- <ListPosts type="DSLinearList"/> -->
