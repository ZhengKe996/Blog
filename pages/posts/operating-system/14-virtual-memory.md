---
title: 'Virtual Memory(虚拟内存)'
date: 2023-12-31
type: OperatingSystem
---

# CACHE(缓存)

![缓存](/public/images/os/14/cache.png)

![缓存](/public/images/os/14/cache2.png)

# 局部性原理

1. **时间局部性(Temporal locality)**: 如果某个信息这次被访问，那它有可能在不久的未来被多次访问。
2. **空间局部性(Spatial locality)**: 如果某个位置的信息被访问，那和它相邻的信息也很有可能被访问到。
3. **内存局部性(Memory locality)**: 访问内存时，大概率会访问连续的块，而不是单一的内存地址，其实就是空间局部性在内存上的体现。
4. **分支局部性(Branch locality)**: 计算机中大部分指令是顺序执行，顺序执行和非顺序执行的比例大致是`5:1`。
5. **等距局部性(Equidistant locality)**:等距局部性是指如果某个位置被访问，那和它相邻等距离的连续地址极有可能会被访问到。

## 修改缓存数据

1. Write through：修改缓存数据的同时修改内存数据
2. Write back：只修改缓存数据，直到该数据要被清除出缓存再修改内存中的数据

## 缓存数据的淘汰

缓存的容量很小，当缓存满的时候，就需要将缓存中的部分数据淘汰，装入新的数据。

# 虚拟内存

1. 部分装入：进程运行时仅加载部分进入内存，而不必全部装入，其余部分暂时放在 swap space
2. 部分对换：可以将进程部分对换出内存，用以腾出内存空间；对换出的部分暂时放在 swap space

## SWAP SPACE

![SWAP SPACE](/public/images/os/14/swap-space.png)

## STORAGE HIERARCHY

![STORAGE HIERARCHY](/public/images/os/14/storage-hierarchy.png)

## VIRTUAL MEMORY

1. Virtual memory is a technique that allows the execution of processes that are not completely in memory.
2. One major advantage of this scheme is that programs can be larger than physical memory.
3. Further, virtual memory abstracts main memory into an extremely large, uniform array of storage, separating logical memory as viewed by the user from physical memory.
4. This technique frees programmers from the concerns of memory-storage limitations.

# 请求调页

## DEMAND PAGING(需求分页)

1. With demand-paged virtual memory, pages are loaded only when they are demanded during program execution.
2. Pages that are never accessed are thus never loaded into physical memory.

![demand paging](/public/images/os/14/demand-paging.png)

## 请求调页步骤

![demand paging](/public/images/os/14/demand-paging-step.png)

假设访问内存时间为 ma，处理一次缺页中断的时间记作 page fault time，令 p 为缺页中断的出现几率，则有效访问时间的计算公式为
`effective access time = (1 − p) × ma + p × page fault time`

若 ma=200ns，page fault time=8ms，p=0.001，则 `effective access time = 8200 ns`

**缺页中断率 p 对性能影响重大**

# 页面置换

当进程在执行过程中发生了缺页，在请求调页的时候发现内存已经没有空闲页框可用，操作系统在此时会做出一个处理：页面置换。
![页面置换](/public/images/os/14/page-replacement.png)

1. FIFO：总是淘汰最先进入内存的页面，因为它在内存中待的时间最久。
2. OPTIMAL：总是淘汰最长时间不会再使用的页面。
3. LRU（LEAST RECENT UNUSED）：总是淘汰最近最少使用的页面。

![11](/public/images/os/14/fifo.png)

# 系统抖动

## THRASHING

1. If the process does not have the number of frames it needs to support pages in active use, it will quickly page fault.At this point, it must replace some page. However, since all its pages are in active use, it must replace a page that will be needed again right away. Consequently, it quickly faults again, and again, and again, replacing pages that it must bring back in immediately.
2. This high paging activity is called thrashing. A process is thrashing if it is spending more time paging than executing.

### 抖动的原因

![抖动](/public/images/os/14/shake.png)

1. 并发进程数量过多
2. 进程页框分配不合理

## PAGE FAULT FREQUENCY(缺页故障频率)

PFF 称作页面故障(频)率，基于这个数据可以实施一个防止抖动的策略：动态调节分配给进程的页框数量。
![pff](/public/images/os/14/pff.png)
