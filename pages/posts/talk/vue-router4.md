---
title: Vue Router 4 指定未识别的路径报错
date: 2022-08-18
draft: true
type: talk
lang: zh
duration: 5min
---

老版本写法:

```ts
 {
    path: "*",
    redirect: "/main",
  },
```

报错信息:

![报错信息](/public/images/talks/vue-router-1.png)

新版本写法:

```ts
 {
    path: "/:catchAll(.*)",
    redirect: "/main",
  },
```
