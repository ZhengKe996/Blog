---
title: 基础排序算法
date: 2022-08-18
type: DataStructure
draft: true
lang: zh
duration: 15min
---

## 选择排序

先把最小的拿出来剩下的，再把最小的拿出来剩下的，再把最小的拿出来...

```java
public class SelectionSort{
    private SelectionSort(){
    }

    // arr[0...i)是有序的,arr[i...n)是无序的
    public static void sort(Integer[] arr){
        for(int i = 0;i < arr.length;i++){
            int minIndex = i;
            for(int j = i;j < arr.length;j++){
                if(arr[j] < arr[minIndex]) minIndex = j;
            }
            swap(arr,i,minIndex);
        }
    }

    private static void swap(Integer[] arr,int i,int j){
        int t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
    }
}
```

## 选择排序使用泛型

```java
public class SelectionSort{
    private SelectionSort(){
    }

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

## 插入排序
