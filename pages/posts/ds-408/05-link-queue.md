---
title: '队列(链表实现)'
date: 2024-01-05
type: DS408
---

![队列](/public/images/ds408/05-link-queue/link-queue.png)

```cpp
typedef int ElementType;
typedef struct LinkNode {
    ElementType data;
    struct LinkNode *next;
} LinkNode;
typedef struct {
    LinkNode *front, *rear;
} LinkQueue;


/**
 * 初始化队列
 * @param queue
 */
void InitQueue(LinkQueue &queue) {
    queue.front = queue.rear = (LinkNode *) malloc(sizeof(LinkNode)); // 队头、队尾指向同一个结点
    queue.front->next = NULL;
}

/**
 * 判断队列是否为空
 * @param queue
 * @return
 */
bool IsEmpty(LinkQueue queue) {
    if (queue.front == queue.rear)return true;
    else return false;
}

/**
 * 入队
 * @param queue
 * @param x
 * @return
 */
bool EnQueue(LinkQueue &queue, ElementType x) {
    LinkNode *s = (LinkNode *) malloc(sizeof(LinkNode));
    s->data = x;
    s->next = NULL;
    queue.rear->next = s; // rear 始终指向尾部
    queue.rear = s;
}

/**
 * 出队（队头）
 * @param queue
 * @param x
 * @return
 */
bool DeQueue(LinkQueue &queue, ElementType &x) {
    if (queue.front == queue.rear)return false;
    LinkNode *head = queue.front->next; // 头结点啥也没存,头的next才是值
    x = head->data;
    queue.front->next = head->next;// 断链
    if (queue.rear == head) queue.rear = queue.front;// 如果删除的是最后一个元素
    free(head);
    return true;
}

```
