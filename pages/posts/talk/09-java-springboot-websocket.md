---
title: 'WebSocket RedisTemplate is null'
date: 2023-04-30
lang: zh
type: talk
---

产生的原因：spring 默认是单例的，而 WebSocket 是多对象的，也就是每次会产生不同的对象。
在初始化项目的时候，WebSocket 就会产生一个对象，这时候就会注入 service 了，而当客户端与 WebSocket 服务端连接过后，又会产生一个新对象，而 spring 默认是单例，只会给一个相同的对象注入一次 service，因此这时候的 WebSocket 新对象就不会再注入 service 了，再去调用该 service 中的方法的话也就会发生空指针异常。

解决方法 新增 SpringUtil 类

```java
@Component
public class SpringUtil implements ApplicationContextAware {
    private static ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        SpringUtil.applicationContext = applicationContext;

    }

    public ApplicationContext getApplicationContext() {
        return applicationContext;
    }

    public static Object getBean(String beanName) {
        return applicationContext.getBean(beanName);
    }

    public static <T> T getBean(Class<T> clazz) {
        return (T) applicationContext.getBean(clazz);
    }
}


```

```java
    @Autowired
    private RedisUtil redisUtil = SpringUtil.getBean(RedisUtil.class);
```
