---
title: 'Go Modules timeout 问题'
date: 2022-10-30
type: talk
---

#### Go Modules timeout 问题

当用 go mod tidy 时候，出现下面所展示的问题：

`dial tcp *** connect: connection refused/timeout`

更换一个国内能访问的代理地址：https://goproxy.cn

```bash
go env -w GOPROXY=https://goproxy.cn
```
