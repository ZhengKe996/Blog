---
title: 'ZooKeeper 启动时报: Starting zookeeper … FAILED TO START'
date: 2022-04-28
type: talk
---

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
