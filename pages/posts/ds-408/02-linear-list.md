---
title: '线性表'
date: 2023-12-23
type: DS408
---

# 线性表

![线性表](/public/images/ds408/02-linear-list/liner-list.png)

**定义**：由 n（n≥0）个相同类型的元素组成的有序集合。

1. 线性表中元素个数 n，称为线性表的长度。当 n=0 时，为空表。
2. `a1` 是唯一的"第一个"数据元素， `an` 是唯一的"最后一个"数据元素。
3. `ai-1`为`ai`的直接前驱， `ai+1`为`ai`的直接后继。

## 线性表的特点

1. 表中元素的个数是**有限**的。
2. 表中元素的**数据类型都相同**。意味着每一个元素占用相同大小的空间。
3. 表中元素具有逻辑上的**顺序性**，在序列中各元素排序有其先后顺序

# 顺序表(线性表的顺序表示)

![顺序表](/public/images/ds408/02-linear-list/sequence-list.png)

```c++
// 顺序表的定义
#define MaxSize 50
typedef int ElemType;
typedef struct{
  ElemType data[MaxSize];
  int len;
}SqlList;
```

## 优缺点

|                             优点                             |                     缺点                     |
| :----------------------------------------------------------: | :------------------------------------------: |
| 可以随机存取（根据表头元素地址和元素序号）表中任意一个元素。 |       插入和删除操作需要移动大量元素。       |
|             存储密度高，每个结点只存储数据元素。             |  线性表变化较大时，难以确定存储空间的容量。  |
|                                                              | 存储分配需要一整段连续的存储空间，不够灵活。 |

## 插入操作

![顺序表](/public/images/ds408/02-linear-list/sequence-insert.png)

```c++
for(int j = L.len;j>=i;j--){
  L.data[j]=L.data[j-1];
}
L.data[i-1]=x;
L.len++;
```

## 删除操作

![顺序表](/public/images/ds408/02-linear-list/sequence-remove.png)

```c++
e = L.data[i-1];
for(int j = i;j<L.len;j++){
  L.data[j-1]=L.data[j];
}
L.len--;
```

## 动态分配空间的线性表结构

```c++
#define InitSize 100 // 表长度的初始定义
typedef int ElemType;
typedef struct{
  ElemType *data; // 指示动态分配数组的指针
  int MaxSize,length; // 动态分配数组顺序表的类型定义
}SqlList;

// C的初始动态分配语句:
L.data = (ElemType*) malloc(sizeof(ElemType)*InitSize);

// C++初始动态分配语句
L.data = new ElemType[InitSize];
```

# 链表(线性表的链式表示)

![链表](/public/images/ds408/02-linear-list/linked-list.png)

```c++
typedef int ElemType;

// 单链表的定义
typedef struct LNode{
  ElemType data; // 数据域
  struct LNode *next; // 指针域
}LNode,*LinkList;
```

**头指针**：链表中第一个结点的存储位置，用来标识单链表。

**头结点**：在单链表第一个结点之前附加的一个结点，为了操作上的方便。

**注**:若链表有头结点，则头指针永远指向头结点，不论链表是否为空，头指针均不为空，头指针是链表的必须元素，他标识一个链表。 头结点是为了操作的方便而设立的，其数据域一般为空，或者存放链表的长度。 有头结点后，对在第一结点前插入和删除第一结点的操作就统一了，不需要频繁 重置头指针。但头结点不是必须的

## 优缺点

|                      优点                      |                         缺点                         |
| :--------------------------------------------: | :--------------------------------------------------: |
| 插入和删除操作不需要移动元素，只需要修改指针。 |     单链表附加指针域，也存在浪费存储空间的缺点。     |
|           不需要大量的连续存储空间。           | 查找操作时需要从表头开始遍历，依次查找，不能随机存取 |

## 插入操作

![链表](/public/images/ds408/02-linear-list/linked-insert.png)

```c++
// 创建新结点
q = (LNode*)malloc(sizeof(LNode));
q->data = x;

// 插入操作
q->next = p->next;// p原位置 q为需要插入的结点
p->next = q;
```

## 删除操作

![删除操作](/public/images/ds408/02-linear-list/linked-remove.png)

```c++
p = GetElem(L,i-1); // 查找删除当前位置的前驱结点

q = p->next;
p->next = q->next;
free(q); // 一定要记得释放内存
```

## 按序号查找结点

```c++
LNode *p = L->next;
int j =1;
while(p && j < i){
  p = p->next;
  j++;
}
return p;
```

## 按值查找结点

```c++
LNode *p = L->next;

while(p!=NULL && p->data != e){
  p = p->next;
}
return p;
```

# 链表代码实现

## 链表结构体

```cpp
#include <stdio.h>
#include <stdlib.h>

typedef int ElementType;
typedef struct LNode {
    ElementType data;
    struct LNode *next;
} LNode, *LinkedList;

```

## 头插法

![头插法](/public/images/ds408/02-linear-list/linked-head-insert-flow.png)

```cpp
/**
 * 头查法
 * @param Node
 */
void LinkedHeadInsert(LNode *&Node) {
    Node = (LinkedList) malloc(sizeof(Node));
    Node->next = NULL;
    ElementType x;
    scanf("%d", &x);
    LNode *s;
    while (x != 9999) {
        s = (LinkedList) malloc(sizeof(Node));
        s->data = x;
        s->next = Node->next;
        Node->next = s;
        scanf("%d", &x);
    }
}
```

![尾插法](/public/images/ds408/02-linear-list/linked-tail-insert-flow.png)

## 尾插法

```cpp
void LinkedTailInsert(LNode *&Node) {
    Node = (LinkedList) malloc(sizeof(LNode));
    Node->next = NULL;
    ElementType x;
    scanf("%d", &x);
    LNode *s, *r = Node; // s 是新结点，r始终指向链表尾部
    while (x != 9999) {
        s = (LinkedList) malloc(sizeof(LNode));
        s->data = x;

        r->next = s;
        r = s; // r指向新的尾部
        scanf("%d", &x);
    }
    r->next = NULL;// 让尾结点的Next置空
}
```

## 打印结点

```cpp
/**
 * 打印结点
 * @param Node
 */
void PrintList(LinkedList Node) {
    Node = Node->next;
    while (Node != NULL) {
        printf("%3d", Node->data);
        Node = Node->next;
    }
    printf("\n");
}
```

## 按位置、值查找

![按位置、值查找](/public/images/ds408/02-linear-list/linked-search.png)

```cpp
/**
 * 按位置查找
 * @param Node
 * @param pos
 * @return
 */
LinkedList GetElement(LinkedList Node, int pos) {
    int i = 0;
    if (pos < 0) return NULL;
    while (Node && i < pos) {
        Node = Node->next;
        i++;
    }
    return Node;
}

/**
 * 按值查找
 * @param Node
 * @param value
 * @return
 */
LinkedList LocateElement(LinkedList Node, ElementType value) {
    while (Node) {
        if (Node->data == value) return Node;
        Node = Node->next;
    }
    return NULL;
}
```

## 在指定位置 i 插入值

![在指定位置插入值](/public/images/ds408/02-linear-list/linked-insert-i-flow.png)

```cpp
/**
 * 在指定位置插入值
 * @param Node
 * @param index
 * @param value
 * @return
 */
bool LinkedFrontInsert(LinkedList Node, int index, ElementType value) {
    LinkedList p = GetElement(Node, index - 1);
    if (NULL == p) return false;
    LinkedList newNode;
    newNode = (LinkedList) malloc(sizeof(Node));
    newNode->data = value;
    newNode->next = p->next;
    p->next = newNode;
    return true;
}
```
