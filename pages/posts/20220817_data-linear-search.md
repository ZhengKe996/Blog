---
title: 线性查找法
date: 2022-08-17
type: DataStructure
draft: true
lang: zh
duration: 15min
---

**在 data 数组中查找 16**
![线性查找法](/public/images/data-structure/1-1.png)
**输入：** 数组，和目标元素
**输出：** 目标元素所在的索引；若不存在，返回-1

## 实现线性查找法

```java
public class LinerSearch{
    public static int search(int[] data,int target){
        for(int i = 0;i < data.length;i++){
            if(data[i] == target) return i;
        }
        return -1;
    }
}
```

```java
public class Main{
  public static void main(String[] args){
      int[] data = {24,18,12,9,16,66,32,4};

      int result = LinerSearch.search(data,16);
      System.out.println(result); // 4

      int result2 = LinerSearch.search(data,166);
      System.out.println(result2); // -1
  }
}
```

## 如何禁止用户 New 一个 LinerSearch

将构造函数设置为私有

```java
public class LinerSearch{
    private  LinerSearch(){} // 将构造函数设置为私有
    ...
}
```

## 使用泛型

- 不可以是基本数据类型，只能是类对象
  `boolean, byte , char, short, int, long, float, double`
- 每个基本数据类型都有对应的包装类
  `Boolean, Byte, Character, Short, Integer , Long, Float, Double`

```java
public class LinerSearch{
    private  LinerSearch(){}
    public static <T>int search(T[] data,T target){
        for(int i = 0;i < data.length;i++){
            if(data[i].equals( target)) return i; // equals 默认比较类的地址
        }
        return -1;
    }
}
```

```java
   public static void main(String[] args){
        Integer[] data = {24,18,12,9,16,66,32,4};
        int result = LinerSearch.<Integer>search(data,16);
        System.out.println(result);

        int result2 = LinerSearch.search(data,166); // Java8之后可以省略泛型，自动进行类型推断
        System.out.println(result2);
    }

```

## 自定义类重写 equals 方法

```java
public class Student{
    private String name;

    public Student(String name){
        this.name = name;
    }

    @Override
    public boolean equals(Object student){
        if(this == student) return true;
        if(student == null) return false;
        if(this.getClass() != student.getClass()) return false;
        Student another = (Student)student;
        return this.name.equals(another.name);
    }
}
```
