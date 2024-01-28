---
title: '顺序表'
date: 2024-01-28
type: DSLinearList
---

```cpp
#define MAXSIZE 100
#define OK 1
#define ERROR 0
#define INFEASIBLE -1
#define OVERFLOW -2

typedef int ElemType;
typedef int Status;
typedef struct {
    ElemType *elem;
    int length;
} SqList;

class SequenceList {
public:
    // 初始化顺序表
    Status InitList(SqList &L) {
        L.elem = new ElemType[MAXSIZE];
        if (!L.elem)exit(OVERFLOW);
        L.length = 0;
        return OK;
    }

    // 销毁顺序表
    void DestroyList(SqList &L) {
        if (L.elem) delete (L.elem); // 释放空间
    }

    // 清空顺序表
    void ClearList(SqList &L) { L.length = 0; }

    // 求顺序表的长度
    int GetLength(SqList L) { return L.length; }

    // 判断顺序表是否为空
    bool IsEmpty(SqList L) {
        if (L.length == 0)return true;
        else return false;
    }

    // 根据 Index 位置数据 返回给 e
    int GetElem(SqList L, int index, ElemType &e) {
        if (index < 0 || index > L.length) return ERROR;
        e = L.elem[index];
        return OK;
    }

    // 在顺序表中查找与指定e相同数据元素的位置
    int LocateElem(SqList L, ElemType e) {
        for (int i = 0; i < L.length; i++) {
            if (L.elem[i] == e) { return i; }
        }
        return INFEASIBLE;// 查找失败 返回 0
    }

    int LocateElem2(SqList L, ElemType e) {
        int i = 0;
        while (i < L.length && L.elem[i] != e)i++;
        if (i < L.length)return i;
        return INFEASIBLE;// 查找失败 返回 0
    }

    // 在指定位置插入元素
    Status ListInsert(SqList &L, int index, ElemType e) {
        if (index < 0 || index > L.length || index == MAXSIZE)return ERROR;
        for (int j = L.length - 1; j >= index; j--) L.elem[j + 1] = L.elem[j]; // 插入位置之后的元素后移
        L.elem[index] = e;
        L.length++;
        return OK;
    }

    // 顺序表删除元素
    Status ListDelete(SqList &L, int index, ElemType &e) {
        if (index < 0 || index > L.length)return ERROR;
        e = L.elem[index];
        for (int j = index; j < L.length; j++) L.elem[j - 1] = L.elem[j]; // 被删除元素之后的元素前移动
        L.length--;
        return OK;
    }

    void PrintList(SqList L) {
        int i;
        for (i = 0; i < L.length; i++) {
            printf("%3d", L.elem[i]);
        }
        printf("\n");
    }
};
```
