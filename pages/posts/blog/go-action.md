---
title: Go 应用从手工编译部署到 Jenkins 自动化 CICD
date: 2023-05-24
draft: true
lang: zh
duration: 35min
---

# CICD

### 持续集成 (CI-Continuous Integration)

![持续集成](/public/images/blog/go-action/2023-05-24-14-09-03.png)

### 持续部署(CD-Continuous Deployment)

![持续部署](/public/images/blog/go-action/2023-05-24-14-10-28.png)

### CICD 流程

![CICD](/public/images/blog/go-action/2023-05-24-14-11-24.png)

# GitLab

![GitLab](/public/images/blog/go-action/2023-05-24-14-12-53.png)

## Ubuntu 系统环境安装 GitLab

```sh
# 拉取gitlab安装包（来源 清华大学镜像站）
wget https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/apt/packages.gitlab.com/gitlab/gitlab-ce/ubuntu/pool/focal/main/g/gitlab-ce/gitlab-ce_15.9.8-ce.0_amd64.deb

# dpkg无法运行时 使用sudo dpkg
dpkg -i gitlab-ce_15.9.8-ce.0_amd64.deb
```
