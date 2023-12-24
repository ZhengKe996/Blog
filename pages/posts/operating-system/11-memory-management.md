---
title: 'Memory Management(内存管理)'
date: 2023-12-24
type: OperatingSystem
---

# 内存管理目标

1. **Main memory** is central to the operation of a modern computer system.(主存储器对现代计算机系统的运行起着中心作用。)
2. Memory consists of a large **array of bytes, each with its own address**.(内存由一个大的字节数组组成，每个字节都有自己的地址)
3. The CPU fetches instructions from memory according to the value of the **program counter(PC)**.(CPU 根据程序计数器(PC)的值从内存中获取指令。) These instructions may cause additional loading from and storing to specific memory addresses.(这些指令可能会导致从特定内存地址进行额外加载和存储。)
4. A typical **instruction-execution cycle**, for example, first **fetches** an instruction from memory.(一个典型的指令执行周期，例如，首先从内存中取出一条指令。) The instruction is then **decoded** and may cause operands to be fetched from memory.(该指令随后被解码，并可能导致从内存中获取操作数。) After the instruction has been **executed** on the operands, results may be stored back in memory.(在操作数上执行完指令后，结果可能会被存储回内存中。)

## CACHE

高速缓存是一种存取速度比内存快，但容量比内存小的多的存储器，它可以加快访问物理内存的相对速度

## 保护操作系统和用户进程

- 用户进程不可以访问操作系统内存数据，以及用户进程空间之间不能互相影响
- 通过硬件实现，因为操作系统一般不干预 CPU 对内存的访问
  - base register：基址寄存器
  - limit register：限长寄存器
- 上述两个寄存器的值只能被操作系统的特权指令加载

![保护操作系统和用户进程](/public/images/os/11/memory.png)

# 逻辑地址和物理地址

- **逻辑地址**：面向程序的地址，总是从 0 开始编址，每一条指令的逻辑地址就是与第 1 条指令之间的*相对偏移*，因此逻辑地址也叫**相对地址**或**虚拟地址**。
- **物理地址**：内存单元看到的实际地址，也称为绝对地址。

- 所有逻辑地址的集合称为**逻辑地址空间**，这些逻辑地址对应的所有物理地址集合称为**物理地址空间**。
- **地址转换**：由逻辑地址转换成物理地址。

## 地址转换时机

- 加载时
- 运行时

## 内存管理单元 MMU

Memory Management Unit 完成逻辑地址到物理地址运行时的转换工作。

- 重定位寄存器（relocation register）或基址寄存器

![重定位寄存器](/public/images/os/11/relocation.png)

# CONTIGUOUS MEMORY ALLOCATION(内存分配)

In contiguous memory allocation, each process is contained in a single section of memory that is contiguous to the section containing the next process.(在连续内存分配中，每个进程都包含在一个单独的内存区域中，该内存区域与包含下一个进程的区域相邻。)

- Memory allocation(内存分配)
- Memory recycle(内存回收)
- Memory protection(内存守护)

## FIXED-SIZED PARTITION(固定大小的分区)

1. Memory is divided to several fixed-sized partitions.(内存被划分为几个固定大小的分区。)
2. Each partition may contain exactly one process.(每个分区只能包含一个进程。)

## VARIABLE-PARTITION(可变分区)

1. In the variable-partition scheme, the operating system keeps two tables indicating which parts of memory are available and which are occupied.(在可变分区方案中，操作系统保留两个表，指示内存的哪些部分可用，哪些部分已被占用。)
2. **Initially**, all memory is available for user processes and is considered one large block of available memory, **a hole**.(最初，所有的内存都是供用户进程使用的，并且被认为是一个大的可用内存块，一个孔。)
3. **Eventually**, as you will see, memory contains a set of holes of various sizes.(最终，正如你将看到的，内存包含一组不同大小的孔)

![重定位寄存器](/public/images/os/11/partition.png)

# 地址转换与保护

1. 两种连续分配方案的地址转换方式是相似的：
   - 物理地址 = 基址 + 逻辑地址
2. 地址保护策略：与限长 limit 进行比较

![地址转换与保护](/public/images/os/11/transition.png)

# 碎片

**Fragmentation**: some little pieces of memory hardly to be used.
(碎片化:一些几乎不能使用的小块内存。)

- internal fragmentation：内部分裂
- external fragmentation：外部分裂
