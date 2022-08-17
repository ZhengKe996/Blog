---
title: Go程序是怎么跑起来的
date: 2022-08-17
type: GoLang
draft: true
lang: zh
duration: 15min
---

## Go 程序 Hello.go 编译过程

![hello.go](/public/images/go-how-run/1-1.png)

文本 -> 编译 -> 二进制可执行文件

编译：文本代码 -> 目标文件
链接：将目标文件合并为可执行文件
使用 `go build -x` 可以观察这个过程

## 操作系统执行可执行文件的步骤(Linux)

![执行可执行文件步骤](/public/images/go-how-run/1-2.png)

#### 计算机是怎么执行我们的程序的呢？

CPU 无法理解文本，只能执行一条一条的二进制机器码指令，每次执行完一条指令，pc 寄存器就指向下一条继续执行

在 64 位平台上 pc 寄存器 = rip

## Go 语言上一门要 runtime 的语言，那么 runtime 是什么？

![runtime](/public/images/go-how-run/1-3.png)

可以认为 runtime 是为了实现额外的功能，而在程序运行时自动加载/运行的一些模块。

![runtime](/public/images/go-how-run/1-4.png)

#### Go 语言的 runtime 包括

![runtime](/public/images/go-how-run/1-5.png)
这些模块中，最核心的就是 Scheduler，它负责串联所有的 runtime 流程

## Go 进程的启动与初始化

通过 entry point 找到 Go 进程的执行入口
![进程的启动与初始化](/public/images/go-how-run/1-6.png)

m0：Go 程序启动后创建的第一个线程

![进程的启动与初始化](/public/images/go-how-run/1-7.png)

## 调度组件与调度循环

每当写下这块代码的时候，到底发生了什么?

```go
go func(){
  println("hello world")
}()
```

答：向 runtime 提交了一个计算任务，func(){xxxx}里包裹的内容就是这个计算任务的内容。

**Go 的调度流程本质上是一个 生产 - 消费 流程**
![调度流程](/public/images/go-how-run/2-1.png)

#### 调度组件

调度组件
![调度组件](/public/images/go-how-run/2-2.png)

goroutine 的生产端
![调度组件](/public/images/go-how-run/2-3.png)

[生产端](https://www.figma.com/proto/gByIPDf4nRr6No4dNYjn3e/bootstrap?page-id=242%3A7&node-id=242%3A215&viewport=516%2C209%2C0.07501539587974548&scaling=scale-down-width)

goroutine 的消费端
![调度组件](/public/images/go-how-run/2-4.png)
![调度组件](/public/images/go-how-run/2-5.png)

[消费端](https://www.figma.com/proto/gByIPDf4nRr6No4dNYjn3e/bootstrap?page-id=143%3A212&node-id=143%3A213&viewport=134%2C83%2C0.06213996931910515&scaling=scale-down-width)

#### GMP

**G：** goroutine，⼀个计算任务。由需要执⾏的代码和其上下⽂组成，上下⽂
包括：当前代码位置，栈顶、栈底地址，状态等

**M：** machine，系统线程，执⾏实体，想要在 CPU 上执⾏代码，必须有线程，与 C 语⾔中的线程相同，通过系统调⽤ clone 来创建。

**P：** processor，虚拟处理器，M 必须获得 P 才能执⾏代码，否则必须陷⼊休眠(后台监控线程除外)，你也可以将其理解为⼀种 token，有这个 token，才有在物理 CPU 核⼼上执⾏的权⼒。

## 处理阻塞

```go
var ch = make(chan int)
ch <- 1

var ch = make(chan int)
<- ch
```

```go
time.Sleep(time.Hour)
```

```go
// net read
var c net.Conn

var buf = make([]byte,1024)

n,err:=c.Read(buf)
```

```go
var c net.Conn
var buf = []byte("Hello")

n,err:=c.Write(buf)
```

```go
var(
  ch1 = make(chan int)
  ch2 = make(chan int)
)

select{
  case <- ch1:
    println("ch1 ready")
  case <- ch2:
    println("ch2 ready")
}
```

```go
var l sync.RWMutex

l.lock()
```

这些情况不会阻塞调度循环，⽽是会把 goroutine 挂起，所谓的挂起，其实让 g 先进某个数据结构，待 ready 后再继续执⾏，不会占⽤线程，这时候，线程会进⼊ schedule，继续消费队列，执⾏其它的 g

![各种阻塞情况](/public/images/go-how-run/3-1.png)

#### 应⽤阻塞在锁上的情况

![应⽤阻塞在锁上的情况](/public/images/go-how-run/3-2.png)

**为啥有的等待是 sudog，有的是 g?**

答：就是说⼀个 g 可能对应多个 sudog，⽐如⼀个 g 会同时 select 多个 channel

#### runtime ⽆法拦截的

- sysnb: syscall nonblocking
- sys: syscall blocking

#### sysmon

sysmon: system monitor
![sysmon](/public/images/go-how-run/3-4.png)
⾼优先级，在专有线程中执⾏，不需要绑定 P 就可以执⾏
![sysmon](/public/images/go-how-run/3-3.png)

## 总结

#### 可执⾏⽂件 ELF

- 使⽤ go build -x 观察编译和链接过程
- 通过 readelf -H 中的 entry 找到程序⼊⼝
- 在 dlv 调试器中 b \*entry_addr 找到代码位置

#### 启动流程

处理参数 -> 初始化内部数据结构 -> 主线程 -> 启动调度循环

#### Runtime 构成

Scheduler、Netpoll、内存管理、垃圾回收

#### GMP

- M，任务消费者；
- G，计算任务；
- P，可以使⽤ CPU 的 token

#### 队列

P 的本地 runnext 字段 -> P 的 local run queue -> global run queue，多级队列减少锁竞争

#### 调度循环

线程 M 在持有 P 的情况下不断消费运⾏队列中的 G 的过程。

#### 处理阻塞：

- 可以接管的阻塞：channel 收发，加锁，⽹络连接读/写，select
- 不可接管的阻塞：syscall，cgo，⻓时间运⾏需要剥离 P 执⾏

#### sysmon

- ⼀个后台⾼优先级循环，执⾏时不需要绑定任何的 P
- 负责
  - 检查是否已经没有活动线程，如果是，则崩溃
  - 轮询 netpoll
  - 剥离在 syscall 上阻塞的 M 的 P
  - 发信号，抢占已经执⾏时间过⻓的 G

## 与调度相关的常见问题

#### Goroutine ⽐ Thread 优势在哪？

![4-1](/public/images/go-how-run/4-1.png)

#### goroutine 的切换成本

![4-2](/public/images/go-how-run/4-2.png)

gobuf 描述⼀个 goroutine 所有现场，从⼀个 g 切换到另⼀个 g，只要把这⼏个现场字段保存下来，再把 g 往队列⾥⼀扔，m 就可以执⾏其它 g 了,⽆需进⼊内核态

#### 死循环导致进程 hang 死问题

![4-3](/public/images/go-how-run/4-3.png)

GC 时需要停⽌所有 goroutine ,⽽⽼版本的 Go 的 g 停⽌需要主动让
出
1.14 增加基于信号的抢占之后，该问
题被解决

#### 与 GMP 有关的⼀些缺陷

![4-4](/public/images/go-how-run/4-4.png)

runtime 中有⼀个 allgs 数组所有创建过的 g 都会进该数组⼤⼩与 g 瞬时最⾼值相关
