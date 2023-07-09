---
title: '本地无法连接服务器上 Redis'
date: 2022-04-30
lang: zh
type: talk
---

#### Redis 连接问题

问题: 本地无法连接服务器上 Redis<br />
解决: 修改 redis.conf

```conf
# 去掉bind 127.0.0.1

# protected-mode yes 改成 no

# daemonize no 改成yes
重新启动服务
./bin/redis-server ./redis.conf
```
