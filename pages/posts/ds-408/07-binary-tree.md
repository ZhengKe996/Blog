---
title: '二叉树'
date: 2024-01-17
type: DS408
---

![二叉树](/public/images/ds408/07-binary-tree/bt.jpg)

## 二叉树建树

```cpp
#include <stdio.h>
#include <stdlib.h>

typedef char BiElementType;
typedef struct BiTreeNode {
    BiElementType data;
    struct BiTreeNode *lChild;
    struct BiTreeNode *rChild;
} BiTreeNode, *BiTree;


typedef struct tag {
    BiTree p;
    struct tag *next;
} tagT, *pTagT;

int main() {
    // 二叉树层序建树
    BiTree pNew;// 用来申请新的节点
    char c;
    BiTree tree = NULL; // 树根

    pTagT pHead = NULL; // 队头
    pTagT pTail = NULL;// 队尾
    pTagT listNew = NULL;
    pTagT pCur = NULL;

    // 输入的内容
    while (scanf("%c", &c)) {
        if (c == '\n') break;
        pNew = (BiTree) malloc(1 * sizeof(BiTreeNode));// 申请空间
        pNew->data = c;// 给树赋值

        listNew = (pTagT) malloc(1 * sizeof(tagT)); // 给队列节点申请空间
        listNew->p = pNew;

        if (NULL == tree) {
            tree = pNew;// 树的根
            pHead = listNew; //队头
            pTail = listNew;// 队尾
            pCur = listNew;
            continue;
        } else {
            pTail->next = listNew; //新结点放入链表，尾插法
            pTail = listNew;// 指向队尾
        }// pCur 始终插入要插入节点的位置

        if (NULL == pCur->p->lChild) {
            // 左子节点为空
            pCur->p->lChild = pNew;
        } else if (NULL == pCur->p->rChild) {
            // 右子节点为空
            pCur->p->rChild = pNew;
            pCur = pCur->next;
        }
    }
    return 0;
}
```

## 前序、中序、后序遍历

```cpp

void PreOrder(BiTree node) {
    if (node == NULL)return;
    putchar(node->data);
    PreOrder(node->lChild);
    PreOrder(node->rChild);
}

void InOrder(BiTree node) {
    if (node == NULL)return;
    PreOrder(node->lChild);
    putchar(node->data);
    PreOrder(node->rChild);
}

void PostOrder(BiTree node) {
    if (node == NULL)return;
    PreOrder(node->lChild);
    PreOrder(node->rChild);
    putchar(node->data);
}
```

## 层序遍历(同建树使用辅助队列)

```cpp

// Queue
typedef BiTree ElementType;
typedef struct LinkNode {
    ElementType data;
    struct LinkNode *next;
} LinkNode;

typedef struct LinkQueue {
    struct LinkNode *front, *rear;
} LinkQueue;

void InitQueue(LinkQueue &queue) {
    queue.front = queue.rear = (LinkNode *) malloc(sizeof(LinkNode));
    queue.front->next = NULL;// 头结点的next始终为NULL
}

bool IsEmpty(LinkQueue queue) {
    if (queue.front == queue.rear) return true;
    else return false;
}

void EnQueue(LinkQueue &queue, ElementType x) {
    LinkNode *s = (LinkNode *) malloc(sizeof(LinkNode));
    s->data = x;
    s->next = NULL;
    queue.rear->next = s; //新增节点从队尾入队
    queue.rear = s;
}

bool DeQueue(LinkQueue &queue, ElementType &x) {
    if (queue.front == queue.rear) return false;

    LinkNode *p = queue.front->next;// 头结点什么都没存，
    x = p->data;
    queue.front->next = p->next; //需要出队的节点与队列断链
    if (queue.rear == p) queue.rear = queue.front; // 如果需要出队的节点是队中的最后一个，将队列置空
    free(p);
    return true;
}


void LevelOrder(BiTree root) {
    LinkQueue queue;
    InitQueue(queue);
    BiTree node;
    EnQueue(queue, root);
    while (!IsEmpty(queue)) {
        DeQueue(queue, node);
        putchar(node->data);
        if (node->lChild != NULL) EnQueue(queue, node->lChild);
        if (node->rChild != NULL)EnQueue(queue, node->rChild);
    }
}

```
