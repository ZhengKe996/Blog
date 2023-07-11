---
title: 'Maven 某些包拉不下来'
date: 2023-07-10
lang: zh
type: talk
---

问题描述：已经设置国内源，项目有些依赖拉不下来，远程仓库有此包

解决方案：

1. 检查 maven 的路径是否正确
2. 尝试新建一个 demo 项目 在 pom.xml 文件中填写拉不下来包的地址 Reload 一下（有时候能成功）
