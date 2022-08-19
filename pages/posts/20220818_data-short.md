---
title: 基础排序算法
date: 2022-08-18
type: DataStructure
draft: true
lang: zh
duration: 15min
---

## 选择排序 O(n^2)

先把最小的拿出来剩下的，再把最小的拿出来剩下的，再把最小的拿出来...

arr[0...i)是有序的,arr[i...n)是无序的

```java
public class SelectionSort{
    private SelectionSort(){
    }
    /**
     * 选择排序
     * @param arr 未排序数组
     * @param <T>
     */
    public static <T extends Comparable<T>> void sort(T[] arr){
        for(int i = 0;i < arr.length;i++){
            int minIndex = i;
            for(int j = i;j < arr.length;j++){
                if(arr[j].compareTo(arr[minIndex]) < 0) minIndex = j;
            }
            swap(arr,i,minIndex);
        }
    }

    private static <T> void swap(T[] arr,int i,int j){
        T t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
    }
}
```

## 插入排序 O(n^2)

![插入排序](/public/images/data-structure/2-1.png)

```java

public class InsertionSort{
    private InsertionSort(){
    }

    /**
     * 插入排序
     * @param arr 乱序数组
     * @param <E>
     */
    public static <E extends Comparable<E>> void sort(E[] arr){
        for(int i = 0;i < arr.length;i++){
            // 将arr[i]插入到合适的位置
            for(int j = i;j - 1 >= 0 && arr[j].compareTo(arr[j - 1]) < 0;j--){
                swap(arr,j,j - 1);
            }
        }
    }

    private static <T> void swap(T[] arr,int i,int j){
        T t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
    }
}
```

## 插入排序优化(常数级别) O(n^2)

```java
public class InsertionSort{
    private InsertionSort(){}
    /**
     * 插入排序（优化后）
     *
     * @param arr 乱序数组
     * @param <E>
     */
    public static <E extends Comparable<E>> void sort(E[] arr){
        for(int i = 0;i < arr.length;i++){
            E t = arr[i];
            int j;
            for(j = i;j - 1 >= 0 && t.compareTo(arr[j - 1]) < 0;j--){
                arr[j] = arr[j - 1];
            }
            arr[j] = t;
        }
    }
}
```
