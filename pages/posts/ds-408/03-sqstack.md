---
title: '栈(顺序表实现)'
date: 2024-01-05
type: DS408
---

![stack](/public/images/ds408/03-sqstack/stack.png)

**栈**：只允许在一端进行插入或删除操作的线性表 栈顶（Top）

```cpp
#define MaxSize 50

typedef int ElementType;
typedef struct Stack {
    ElementType data[MaxSize];
    int top;// 栈顶
} SqStack;

/**
 * 初始化栈
 * @param Stack
 */
void InitStack(SqStack &stack) {
    stack.top = -1;
}

/**
 * 是否为空栈
 * @param stack
 * @return
 */
bool IsEmpty(SqStack &stack) {
    if (stack.top == -1)return true;
    else return false;
}

/**
 * 入栈
 * @param stack
 * @param x
 * @return
 */
bool Push(SqStack &stack, ElementType x) {
    if (stack.top == MaxSize - 1)return false; // 栈满了
    stack.data[++stack.top] = x;
    return true;
}

/**
 * 出栈
 * @param stack
 * @param x
 * @return
 */
bool Pop(SqStack &stack, ElementType &x) {
    if (-1 == stack.top)return false;
    x = stack.data[stack.top--];
    return true;
}


/**
 * 取栈顶
 * @param stack
 * @param x
 * @return
 */
bool GetTop(SqStack &stack, ElementType &x) {
    if (-1 == stack.top)return false;
    x = stack.data[stack.top];
    return true;
}

```
