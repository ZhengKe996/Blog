---
title: 'MongoDB 无法被外部机器访问'
date: 2022-04-22
lang: zh
type: talk
---

问题: 端口允许被外部访问的情况下，仍然无法被外部访问<br />
解决: 新建 mongodb.conf 文件 使用配置文件启动

```conf
#数据库路径
dbpath=/root/mongodb/data
#日志输出文件路径
logpath=/root/mongodb/logs/mongodb.log
#错误日志采用追加模式
logappend=true
#启用日志文件，默认启用
journal=true
#这个选项可以过滤掉一些无用的日志信息，若需要调试使用请设置为false
quiet=true
#端口号 默认为27017
port=27017
#允许远程访问
bind_ip=0.0.0.0
#开启子进程
fork=true
#开启认证，必选先添加用户，先不开启（不用验证账号密码）
#auth=true

```

```bash
# 在bin目录下启动
./mongod --config /xxxx/mongodb.conf
```
