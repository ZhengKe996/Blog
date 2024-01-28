---
title: '循环链表'
date: 2024-01-28
type: DSLinearList
---

```cpp
#define OK 1
#define ERROR 0

typedef int ElemType;
typedef int Status;
typedef struct LNode {
    ElemType data;
    struct LNode *next;
} LNode, *LinkList;

class CircularLinked {
private:
    LinkList Head;
public:
    Status InitList(LinkList &L) {
        L = new LNode;
        Head = L;
        L->next = L;
        return OK;
    }

    bool IsEmpty(LinkList L) {
        if (L->next != Head) return false;
        else return true;
    }

    Status DestroyList(LinkList &L) {
        LNode *p;
        while (L != Head) {
            p = L;
            L = L->next;
            delete (p);
        }
        return OK;
    }

    Status ClearList(LinkList &L) {
        LNode *p, *q;
        p = L->next;
        while (p != Head) {
            q = p->next;
            delete (p);
            p = q;
        }
        L->next = Head;
        return OK;
    }

    int ListLength(LinkList &L) {
        LNode *p;
        p = L->next;
        int i = 0;
        while (p != Head) {
            i++;
            p = p->next;
        }
        return i;
    }

    Status GetElem(LinkList &L, int index, ElemType &e) {
        LNode *p = L->next;
        int j = 0;
        while (p != Head && j < index) {
            p = p->next;
            ++j;
        }
        if (!p || j > index)return ERROR;
        e = p->data;
        return OK;
    }

    LNode *LocateElem(LinkList L, ElemType e) {
        LNode *p = L->next;
        while (p != Head && p->data != e) p = p->next;
        return p;
    }

    int LocateElemIndex(LinkList L, ElemType e) {
        LNode *p = L->next;
        int j = 1;
        while (p != Head && p->data != e) {
            p = p->next;
            j++;
        }
        if (p != Head)return j;
        else return 0;
    }

    Status ListInsert(LinkList &L, int index, ElemType e) {
        LNode *p = L;
        int j = 0;
        while (p != Head && j < index) {
            p = p->next;
            j++;
        }
        if (!p || j > index) return ERROR;
        LNode *s = new LNode;
        s->data = e;
        s->next = p->next;
        p->next = s;
        return OK;
    }

    Status ListDelete(LinkList &L, int index, ElemType &e) {
        LNode *p = L;
        int j = 0;
        while (p != Head && j < index) {
            p = p->next;
            j++;
        }
        if (!p->next || j > index) return ERROR;
        LNode *q = p->next; // 暂存需要删除的节点
        p->next = q->next;
        e = q->data;
        delete q;
        return OK;
    }

    // 头插法
    void CreateListHead(LinkList &L, int n) {
        L = new LNode;
        L->next = Head;
        for (int i = n; i > 0; --i) {
            LNode *p = new LNode;
            cin >> p->data;
            p->next = L->next;
            L->next = p;
        }
    }

    // 尾插法
    void CreateListTail(LinkList &L, int n) {
        L = new LNode;
        L->next = Head; // 尾指针的下一个是头指针
        LNode *r = L; // 尾指针
        for (int i = 0; i < n; i++) {
            LNode *p = new LNode;
            cin >> p->data;
            p->next = Head;
            r->next = p;
            r = p;
        }
    }

    /**
     * 带尾指针循环链表的合并
     * @param Ta
     * @param Tb
     * @return
     */
    LinkList Connect(LinkList Ta, LinkList Tb) {
        LNode *p = Ta->next;
        Ta->next = Tb->next->next;
        delete Tb->next;
        Tb->next = p;
        return Tb;
    }

    // 打印链表
    void PrintList(LinkList L) {
        L = L->next;
        while (L != Head) {
            printf("%3d", L->data);  // 打印当前结点数据
            L = L->next;             // 指向下一个结点
        }
        printf("\n");
    }
};

```
