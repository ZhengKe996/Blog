---
title: '加强堆的实现'
date: 2023-08-27
type: Heap
---

假如现在你手里有一个堆，里面存着一些元素，用户此时说要改变元素的排序指标且要求高效，怎么办？用系统实现的堆，你是不是只能把堆中的元素拿出来再重新去调整。此时你的用户又想删除堆中的某一个元素，你要怎么删除指定元素又能保证堆结构呢？系统提供的堆是不是无能为力，或者说系统提供的堆不能高效的满足你的需求，你只能去手动改写。

元素进堆之后，我们不能确定元素在堆的位置，如果我们能知道堆中元素的位置，不管调整还是删除元素，只需要在它的当前位置进行 heapInsert 或者 heapify 操作。这就是加强堆的作用，给堆中的元素增加一张反向索引表，记录入堆元素的位置，用来满足我们的需求。
| [Java](https://github.com/ZhengKe996/DS/blob/main/src/heap/heap_greater.java) |
| :------------------------------------------------------------------------: |

```java
class HeapGreater<T> {
  private ArrayList<T> heap;
  private HashMap<T, Integer> indexMap;
  private int heapSize;
  private Comparator<? super T> compare;

  public HeapGreater(Comparator<? super T> c) {
    heap = new ArrayList<>();
    indexMap = new HashMap<>();
    heapSize = 0;
    compare = c;
  }

  public boolean isEmpty() {
    return heapSize == 0;
  }

  public int size() {
    return heapSize;
  }

  public boolean contains(T obj) {
    return indexMap.containsKey(obj);
  }

  public T peek() {
    return heap.get(0);
  }

  public void push(T obj) {
    heap.add(obj);
    indexMap.put(obj, heapSize);
    heapInsert(heapSize++);
  }

  public T pop() {
    T ans = heap.get(0);
    swap(0, heapSize - 1);
    indexMap.remove(ans);
    heap.remove(--heapSize);
    heapify(0);
    return ans;
  }

  public void remove(T obj) {
    T replace = heap.get(heapSize - 1);
    int index = indexMap.get(obj);
    indexMap.remove(obj);
    heap.remove(--heapSize);
    if (obj != replace) {
      heap.set(index, replace);
      indexMap.put((replace), index);
      resign(replace);
    }
  }

  public void resign(T obj) {
    heapInsert(indexMap.get(obj));
    heapify(indexMap.get(obj));
  }

  public List<T> getAllElements() {
    List<T> ans = new ArrayList<>();
    for (T c : heap)
      ans.add(c);
    return ans;
  }

  private void heapInsert(int index) {
    while (compare.compare(heap.get(index), heap.get((index - 1) / 2)) < 0) {
      swap(index, (index - 1) / 2);
      index = (index - 1) / 2;
    }
  }

  private void heapify(int index) {
    int left = index * 2 + 1;
    while (left < heapSize) {
      int best = left + 1 < heapSize && compare.compare(heap.get(left + 1), heap.get(left)) < 0 ? (left + 1) : left;
      best = compare.compare(heap.get(best), heap.get(index)) < 0 ? best : index;
      if (best == index)
        break;
      swap(best, index);
      index = best;
      left = index * 2 + 1;
    }
  }

  private void swap(int i, int j) {
    T o1 = heap.get(i);
    T o2 = heap.get(j);
    heap.set(i, o2);
    heap.set(j, o1);
    indexMap.put(o2, i);
    indexMap.put(o1, j);
  }
}
```
