---
title: 'Process Scheduling(进程调度)'
date: 2023-12-09
type: Operating
---

# 进程切换

## 并发进程的切换

并发进程中，一个进程在执行过程中可能会被另一个进程替换占有 CPU，这个过程称作“**进程切换**“。

![并发进程的切换](/public/images/os/04/process-switch.png)

## 中断技术

中断是指程序执行过程中

1. 当发生某个事件时，中止 CPU 上现行程序的运行
2. 引出该事件的处理程序执行
3. 执行完毕返回原程序中断点继续执行

## 中断源

**外中断：** 来自处理器之外的硬件中断信号

- 外部中断均是异步中断
- 如时钟中断、键盘中断、外围设备中断

**内中断（异常 Exception）：** 来自于处理器内部，指令执行过程中发生的中断，属同步中断

- 硬件异常：掉电、奇偶校验错误等
- 程序异常：非法操作、地址越界、断点、除数为 0
- 系统调用

## 中断处理过程

![中断处理过程](/public/images/os/04/interrupt.png)

## 特权指令和非特权指令

### Privileged Instructions

The Instructions that can run only in **Kernel Mode** are called Privileged Instructions .

- I/O instructions and Halt instructions
- Turn off all Interrupts
- Set the Timer
- Process Switching

### Non-Privileged Instructions

The Instructions that can run only in User Mode are called Non-Privileged Instructions .

## 模式切换

中断是用户态向核心态转换的**唯一途径**！系统调用实质上也是一种中断。OS 提供 Load PSW 指令装载用户进程返回用户状态

![模式切换](/public/images/os/04/mode-switch.png)

## 进程切换

### 切换时机

- 进程需要进入等待状态
- 进程被抢占 CPU 而进入就绪状态

### 切换过程

- 保存被中断进程的**上下文信息(Context)**
- 修改被中断进程的**控制信息（如状态等）**
- 将被中断的进程加入相应的**状态队列**
- 调度一个新的进程并恢复它的**上下文信息**

# 进程调度

## 进程控制块

A Process Control Block（PCB）contains many pieces of information associated with a specific process.

![进程控制块](/public/images/os/04/process-state.png)

## 进程队列（PROCESS QUEUES）

![进程队列](/public/images/os/04/process-queues.png)

## 进程调度（PROCESS SCHEDULING）

进程在整个生命周期中会在各个调度队列中迁移，由操作系统的一个 **调度器（scheduler）** 来执行。

![进程调度](/public/images/os/04/process-scheduler.png)
