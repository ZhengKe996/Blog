---
title: 'Stream 流式计算'
date: 2023-10-07
type: JUC
---

```java
/**
 * 按条件用户筛选：
 * 1、id 为偶数
 * 2、年龄大于24
 * 3、用户名大写   映射
 * 4、用户名倒排序
 * 5、输出一个用户
 * <p>
 * 请你只用一行代码完成！
 */
public static void main(String[] args) {
    User u1 = new User(1, "a", 23);
    User u2 = new User(2, "b", 24);
    User u3 = new User(3, "c", 22);
    User u4 = new User(4, "d", 28);
    User u5 = new User(6, "e", 26);

    // 存储
    List<User> users = Arrays.asList(u1, u2, u3, u4, u5);

    users.stream().filter(u -> {
        return u.getId() % 2 == 0;
    }).filter(u -> {
        return u.getAge() >= 24;
    }).map(u -> {
        return u.getName().toUpperCase();
    }).sorted(((o1, o2) -> {
        return o2.compareTo(o1);
    })).limit(1).forEach(System.out::println);
}
```
