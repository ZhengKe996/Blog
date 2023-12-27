---
title: 'Segmentation & Paging(分段和分页)'
date: 2023-12-27
type: OperatingSystem
---

# 动机(MOTIVATION)

1. **Solution to fragmentation**: permit the logical address space of processes to be noncontiguous.(碎片的解决方案:允许进程的逻辑地址空间不连续。)
2. The view of memory is different between
   - **logical (programmer's )**: a variable-sized segments(可变大小的段)
   - **physical**: a linear array of bytes(字节的线性数组)
3. The hardware could provide a memory mechanism that mapped the logical view to the actual physical memory.(硬件可以提供一种内存机制，将逻辑视图映射到实际的物理内存。)

# 分段

![分段](/public/images/os/12/subsection.png)
![分段](/public/images/os/12/subsection2.png)

# 分页

![分页](/public/images/os/12/paging.png)
![分页](/public/images/os/12/paging2.png)

## 计算物理地址

`physical address(物理地址) = frame_no(页号) * pagesize(页尺寸) + offset(页内偏移量)`

# LOGICAL ADDRESS

1. The page size (like the frame size) is defined by the hardware. The size of a page is a power of 2, varying between 512 bytes and 1 GB per page, depending on the computer architecture.(页面大小(像帧大小一样)由硬件定义。页的大小是 2 的幂，根据计算机体系结构的不同，每页的大小在 512 字节到 1 GB 之间变化。)
2. The selection of a power of 2 as a page size makes the translation of a logical address into a page number and page offset particularly easy.(选择 2 的幂作为页面大小使得将逻辑地址转换为页码和页面偏移量特别容易。)
3. If the size of the logical address space is 2^m , and a page size is 2 ^n bytes, then the high-order m − n bits of a logical address designate the page number, and the n low-order bits designate the page offset. Thus, the logical address is as follows:(如果逻辑地址空间的大小为 2^m，页面大小为 2^n bytes，则逻辑地址的高阶 m−n 位表示页码，低阶 n 位表示页面偏移量。因此，逻辑地址如下:)

![分页](/public/images/os/12/formula.png)

# 分段与分页的区别

|                分段                |                  分页                  |
| :--------------------------------: | :------------------------------------: |
|           信息的逻辑单位           |             信息的物理单位             |
|            段长是任意的            |             页长由系统确定             |
| 段的起始地址可以从主存任一地址开始 | 页框起始地址只能以页框大小的整数倍开始 |
| (段号，段内位移)构成了二维地址空间 |   (页号，页内位移)构成了一维地址空间   |
|           会产生外部碎片           |    消除了外部碎片，但会出现内部碎片    |
