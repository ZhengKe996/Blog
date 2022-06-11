---
title: 踩坑日记
description: 芜湖
date: 2022-03-30
lang: zh
type: talk
duration: 30min
---

#### MongoDB 无法被外部机器访问

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

#### ZooKeeper 启动时报: Starting zookeeper … FAILED TO START

问题: ZooKeeper 启动时报: Starting zookeeper … FAILED TO START<br />
原因: 在 3.5.5 版本及以上，Zookeeper 提供了一个内嵌的 Jetty 容器来运行 AdminServer，默认占用的是 8080 端口，AdminServer 主要是来查看 Zookeeper 的一些状态，如果机器上有其他程序（比如：Tomcat）占用了 8080 端口，也会导致 Starting zookeeper … FAILED TO START 的问题<br />

如果不需要 `AdminServer` ，可以直接禁用：打开 `zoo.cfg` 配置文件，直接添加以下语句即可。

```cig
# 禁用 AdminServer 服务
admin.enableServer=false
```

<br />如果想使用 `AdminServer` , 那么可以直接在 `zoo.cfg` 配置文件中修改端口号即可，比如让其绑定 9000。

```cfg
# admin port
admin.serverPort=9000
```

#### Delete 请求获取不到 ID

问题: 前端发送 delete 请求,服务端获取不到请求 id<br />
原因: 前端发送错误,应当携带 params 参数进行删除

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

#### react-simplemde-editor v5 版本改变内容自动失去焦点

解决: 下载 4.x 版本即可
