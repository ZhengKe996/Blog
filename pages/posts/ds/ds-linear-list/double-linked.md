---
title: '双端链表'
date: 2024-01-28
type: DSLinearList
---

```cpp
#define OK 1
#define ERROR 0

typedef int ElemType;
typedef int Status;
typedef struct DuLNode {
    ElemType data;
    struct DuLNode *piror, *next;
} DuLNode, *DuLinkList;


class DuLinkedList {
private:
public:
    Status InitList(DuLinkList &L) {
        L = new DuLNode;
        L->next = NULL;
        return OK;
    }

    bool IsEmpty(DuLinkList L) {
        if (L->next) return false;
        else return true;
    }

    Status DestroyList(DuLinkList &L) {
        DuLNode *p;
        while (L) {
            p = L;
            L = L->next;
            delete (p);
        }
        return OK;
    }

    Status ClearList(DuLinkList &L) {
        DuLNode *p, *q;
        p = L->next;
        while (p) {
            q = p->next;
            delete (p);
            p = q;
        }
        L->next = NULL;
        return OK;
    }

    int ListLength(DuLinkList &L) {
        DuLNode *p;
        p = L->next;
        int i = 0;
        while (p) {
            i++;
            p = p->next;
        }
        return i;
    }

    Status GetElem(DuLinkList &L, int index, ElemType &e) {
        DuLNode *p = L->next;
        int j = 0;
        while (p && j < index) {
            p = p->next;
            ++j;
        }
        if (!p || j > index)return ERROR;
        e = p->data;
        return OK;
    }

    DuLNode *LocateElem(DuLinkList L, ElemType e) {
        DuLNode *p = L->next;
        while (p && p->data != e) p = p->next;
        return p;
    }

    int LocateElemIndex(DuLinkList L, ElemType e) {
        DuLNode *p = L->next;
        int j = 1;
        while (p && p->data != e) {
            p = p->next;
            j++;
        }
        if (p)return j;
        else return 0;
    }

    Status ListInsert(DuLinkList &L, int index, ElemType e) {
        DuLNode *p = L;
        int j = 0;
        while (p && j < index) {
            p = p->next;
            j++;
        }
        if (!p || j > index) return ERROR;
        DuLNode *s = new DuLNode;
        s->data = e;
        s->next = p->next;
        s->next->piror = s;
        s->piror = p;
        p->next = s;
        return OK;
    }

    Status ListDelete(DuLinkList &L, int index, ElemType &e) {
        DuLNode *p = L;
        int j = 0;
        while (p && j < index) {
            p = p->next;
            j++;
        }
        if (!p->next || j > index) return ERROR;
        DuLNode *q = p->next; // 暂存需要删除的节点
        p->next = q->next;
        q->piror = p;
        e = q->data;
        delete q;
        return OK;
    }

    // 头插法
    void CreateListHead(DuLinkList &L, int n) {
        L = new DuLNode;
        L->next = NULL;
        for (int i = n; i > 0; --i) {
            DuLNode *s = new DuLNode;
            cin >> s->data;
            s->next = L->next;
            s->next->piror = s;
            s->piror = L;
            L->next = s;
        }
    }

    // 尾插法
    void CreateListTail(DuLinkList &L, int n) {
        L = new DuLNode;
        L->next = NULL;
        DuLNode *r = L; // 尾指针
        for (int i = 0; i < n; i++) {
            DuLNode *p = new DuLNode;
            cin >> p->data;

            p->next = NULL;
            p->piror = r;
            r->next = p;
            r = p;
        }
    }

    // 打印链表
    void PrintList(DuLinkList L) {
        L = L->next;
        while (L != NULL) {
            printf("%3d", L->data);  // 打印当前结点数据
            L = L->next;             // 指向下一个结点
        }
        printf("\n");
    }
};


```
