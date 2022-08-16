---
title: 分布式配置中心 📒
date: 2022-08-15
draft: true
lang: zh
duration: 15min
---

## 为什么需要配置中心

考虑两种情况：

1. 添加配置项

   - 用户服务有 10 个部署实例，那么添加配置项你得去十个地方修改配置文件还得重新启动等。
   - 即使 go 的 viper 能完成修改配置文件自动生效，那么你得考虑其他语言是否也能做到这点，其他的服务是否也一定会使用 viper?

2. 修改配置项

   - 大量的服务可能会使用同一个配置，比如我要更好 iwt 的 secrect，这么多实例怎么办？

3. 开发、测试、生产环境如何隔离：
   - 这么多服务如何统一这种考虑因素？

## NaCos Docker 使用

```bash
docker run --name nacos-standalone -e MODE=standalone -e JVM_XMS=512m -e JVM_XMX=512m -e JVM_XMN=256m -p 8848:8848 -d nacos/nacos-server:latest
```

Apple Arm64 使用下面的命令

```bash
docker run --name nacos-standalone -e MODE=standalone -e JVM_XMS=512m -e JVM_XMX=512m -e JVM_XMN=256m -p 8848:8848 -d nacos/nacos-server:v2.1.1-slim
```
