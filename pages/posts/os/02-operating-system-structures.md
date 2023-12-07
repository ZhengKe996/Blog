---
title: 'Operating System Structures'
date: 2023-12-07
type: OS
---

## 操作系统提供哪些服务？

![操作系统提供哪些服务？](/public/images/os/02/system-serve.png)

## 系统调用（SYSTEM CALLS）

系统调用提供了访问和使用操作系统所提供的服务的接口。

- 系统调用的实现代码是操作系统级的
- 这个接口通常是面向程序员的

**API (Application Programming Interface)**：指明了参数和返回值的一组函数。

- 应用程序 App 的开发人员通过透过 API 间接访问了系统调用

## 双重模式（DUAL MODE）

现代计算机系统有一个特殊的硬件，用于划分系统的运行状态，至少需要两种单独运行模式：

1. 用户模式（user mode）：执行用户代码
2. 内核模式（kernel mode）：执行操作系统代码

**目的：**确保操作系统正确的运行
**实现方式:**用一个硬件模式位来表示当前模式：0 表示内核模式，1 表示用户模式.

## TRAP MECHANISM

![TRAP MECHANISM](/public/images/os/02/trap-mechanism.png)

## 系统调用的实现机制

1. 每个系统调用都有一个唯一的数字编号，被称为**系统调用号**。
2. 用户代码调用 API 时，API 中会向**系统调用接口**指明其所要用的**系统调用号**，操作系统内核中维护了一张索引表，依据这个调用号可以检索到访系统调用代码在内核中的位置。
