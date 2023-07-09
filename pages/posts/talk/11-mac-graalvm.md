---
title: '无法在mac上运行graalvm gu命令'
date: 2023-07-09
lang: zh
type: talk
---

```bash
gu install native-image
```

问题描述：无法在 mac 上运行 graalvm gu 命令

```bash
zsh: command not found: gu
```

解决方案：没有环境变量，直接使用路径执行
执行代码

```bash
/Library/Java/JavaVirtualMachines/graalvm-jdk-20.0.1+9.1/Contents/Home/lib/installer/bin/gu install native-image

```

原因：

Windows 系统下安装完 Graalvm，由于其 home/bin 文件夹下面自带一个 gu 的 cmd 文件，该文件和 java 在一个目录下，可以直接通过 cmd 执行 gu 操作；
但是 Mac 和 Linux 版本下，该安装包里面的 gu 是个空文件，默认无法执行任何操作。
