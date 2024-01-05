---
title: '栈(链表表实现)'
date: 2023-01-05
type: DS408
---

```cpp

typedef int ElementType;
typedef struct LinkNode {
    ElementType data;
    struct LinkNode *next;
} LinkNode;

typedef struct {
    LinkNode *top;
} LinkStack;

/**
 * 初始化栈
 * @param stack
 */
void InitStack(LinkStack &stack) {
    stack.top = (LinkNode *) malloc(sizeof(LinkStack));
    stack.top->next = NULL;
}

/**
 * 栈是否为空
 * @param stack
 * @return
 */
bool IsEmpty(LinkStack stack) {
    return stack.top->next == NULL;
}

/**
 * 入栈
 * @param stack
 * @param x
 */
void Push(LinkStack &stack, ElementType x) {
    LinkNode *newNode = (LinkNode *) malloc(sizeof(LinkNode));
    newNode->data = x;
    newNode->next = stack.top;
    stack.top = newNode;
}

/**
 * 出栈
 * @param stack
 * @param x
 * @return
 */
bool Pop(LinkStack &stack, ElementType &x) {
    if (stack.top == NULL)return false;

    LinkNode *p = stack.top;
    x = p->data;
    if (stack.top->next == NULL)return false;
    stack.top = stack.top->next;
    free(p);
    return true;
}

/**
 * 取栈顶
 * @param stack
 * @param x
 * @return
 */
bool GetTop(LinkStack &stack, ElementType &x) {
    if (stack.top == NULL)return false;
    x = stack.top->data;
    return true;
}
```
