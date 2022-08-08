---
title: Go RPC gRPC 📝
date: 2022-08-06
draft: true
lang: zh
duration: 15min
---

## 什么是 RPC

1. RPC (Remote Procedure Call)远程过程调用，筒单的理解是一个节点请求另一个节点提供的服务。
2. 对应 rpc 的是本地过程调用，函数调用是最常见的本地过程调用。
3. 将本地过程调用变成远程过程调用会面临各种问题。

### 本地过程调用

```python
def add(a,b):
  total = a + b
  return total

total = add (1 , 2)
print(total)
```

### 远程过程面临的问题

原本的本地函数放到另一个服务器上去运行。但是引入了很多新问题。

1. Call 的 id 映射
2. 序列化和反序列化
3. 网络传输

##### 序列化和反序列化

客户端:

1. 建立连接 tcp/http
2. 将 employee 序列化为 json 字符串
3. 发送 json 字符串
4. 等待服务器发送结果
5. 将服务器返回的数据解析成 PrintResult 对象 - 反序列化

服务端

1. 监听网络端口 80
2. 读取数据 - 二进制 json 数据
3. 对数据进行反序列化 Employee 对象
4. 开始处理业务逻辑
5. 将处理的结果 PrintResult 序列化成 json 二进制数据 - 序列化
6. 将数据返回

##### 网络传输

HTTP 底层使用的是 TCP 协议 主流版本 1.x，存在性能问题
HTTP 协议来说 有一个问题：一次性 一旦对方返回了结果 (HTTP2.0 支持长链接）

基于 TCP/UDP 协议去封装一层协议 （没有通用性）

HTTP2.0 既有长连接的特性，又有 HTTP 的特性

## Go 内置 RPC 使用

Go 语言的 RPC 序列化和反序列化的协议是 Gob

### Server DEMO

```Go
type HelloService struct {}

func (s *HelloService) Hello(request string, reply *string) error {
	// 返回值通过修改 reply 的值
	*reply = "Hello," + request
	return nil
}
func main() {
	// 1. 实例化server
	listener, _ := net.Listen("tcp", ":8080")
	// 2. 注册处理逻辑 handler
	_ = rpc.RegisterName("HelloService", &HelloService{})
	// 3. 启动服务
	accept, _ := listener.Accept()
	rpc.ServeConn(accept)
}

```

### Client DEMO

```Go
func main() {
	// 1. 建立连接
	client, err := rpc.Dial("tcp", ":8080")
	if err != nil {
		panic("连接失败")
	}
	var reply string

	err = client.Call("HelloService.Hello", "你好啊", &reply)
	if err != nil {
		panic("调用失败")
	}

	fmt.Println(reply)
}
```

## 改造 RPC 的代码调用

改造后仍存在的问题: server_proxy 和 client_proxy 能否自动为多种语言生成

> rpc_demo
> ├── client
> │   └── main.go
> ├── client_proxy
> │   └── proxy.go
> ├── handle
> │   └── handle.go
> ├── server
> │   └── main.go
> └── server_proxy
> └── proxy.go

### handle

抽取公共的代码

```Go
package handle

const HelloServiceName = "handle/HelloService"

type HelloService struct {
}

func (s *HelloService) Hello(request string, reply *string) error {
	// 返回值通过修改 reply 的值
	*reply = "Hello " + request
	return nil
}

```

### Server 端

server_proxy: 使用 interface 进行解耦

```Go
package server_proxy

import (
	"net/rpc"
	"handle"
)

type HelloServicer interface {
	Hello(request string, reply *string) error
}

func RegisterHelloService(srv HelloServicer) error {
	return rpc.RegisterName(handle.HelloServiceName, srv)
}

```

server：业务代码与注册处理逻辑分离

```Go
package main

import (
	"net"
	"net/rpc"
  "handle"
	"server_proxy"
)

func main() {
	// 1. 实例化server
	listener, _ := net.Listen("tcp", ":8080")
	// 2. 注册处理逻辑 handler
	_ = server_proxy.RegisterHelloService(&handle.HelloService{})
	// 3. 启动服务
	for {
		accept, _ := listener.Accept()
		go rpc.ServeConn(accept)
	}
}

```

### Client 端

client_proxy：存放抽取的连接代码

```Go
package client_proxy

import (
	"net/rpc"
	"handle"
)

type HelloServiceStub struct {
	*rpc.Client
}

func NewHelloServiceClient(protol, adress string) HelloServiceStub {
	client, err := rpc.Dial(protol, adress)
	if err != nil {
		panic("connect error!")
	}
	return HelloServiceStub{client}
}
func (c *HelloServiceStub) Hello(request string, reply *string) error {
	err := c.Call(handle.HelloServiceName+".Hello", request, reply)
	if err != nil {
		return err
	}
	return nil
}
```

client

```Go
package main

import (
	"fmt"
	"client_proxy"
)

func main() {
	client := client_proxy.NewHelloServiceClient("tcp", ":8080")
	var reply string
	err := client.Hello("World", &reply)
	if err != nil {
		panic("调用失败")
	}
	fmt.Println(reply)
}

```
