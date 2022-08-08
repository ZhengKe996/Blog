---
title: Go RPC gRPC 📝
date: 2022-08-06
draft: true
lang: zh
duration: 15min
---

![RPC](/public/images/go-rpc/1-1.jpg)

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
HTTP 协议来说 有一个问题：一次性 一旦对方返回了结果 (HTTP/2 支持长链接）

基于 TCP/UDP 协议去封装一层协议 （没有通用性）

HTTP/2 既有长连接的特性，又有 HTTP 的特性

## Go 内置 RPC 使用

Go 语言的 RPC 序列化和反序列化的协议是 Gob

### Server DEMO

```go
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

```go
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

```go
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

```go
...
type HelloServicer interface {
	Hello(request string, reply *string) error
}

func RegisterHelloService(srv HelloServicer) error {
	return rpc.RegisterName(handle.HelloServiceName, srv)
}

```

server：业务代码与注册处理逻辑分离

```go
...
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

```go
...
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

```go
...
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

## 什么是 gRPC

gRPC 是一个高性能、通用的开源 RPC 框架，其由 Google 主要面向移动应用开发并基于 HTTP/2 协议标准而设计，基于 ProtoBuf(Protocol Buffers)序列化协议开发，且支持众多开发语言.

gRPC 基于 HTTP/2 标准设计，带来诸如双向流、流控、头部压缩、单 TCP 连接上的多复用请求等特。这些特性使得其在移动设备上表现更好，更省电和节省空间占用。

[参考地址:gRPC 官方文档](https://grpc.io/docs/)

## 什么是 protobuf

Protocol Buffer 其实是 Google 出品的一种轻量＆高效的结构化数据存储格式，性能比 Json、XML 的强太多！

### protobuf 的优缺点

##### 优点

- 性能
  - 压缩性好
  - 序列化和反序列化快
  - 传输速度快
- 便携性
  - 使用简单
  - 维护成本低
  - 向后兼容
  - 加密性好
- 跨语言
  - 跨平台
  - 主持各种主流语言

##### 缺点

- 通用性差
  - 需要专门的解释器
- 自解释性差
  - 只有通过 proto 文件才能了解数据结构

### 再生 gRPC 代码

```bash
protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative helloworld/helloworld.proto
```

### Go gRPC DEMO

hello.proto

```proto
syntax = "proto3";
option go_package = ".;hello";
service Greeter{
  rpc SayHello(HelloRequest) returns (HelloReply);
}

message HelloRequest{
  string name = 1;
}
message HelloReply{
  string message = 1;
}
```

server

```go
...
type Server struct {
	hello.UnimplementedGreeterServer
}

func (s *Server) SayHello(ctx context.Context, req *hello.HelloRequest) (*hello.HelloReply, error) {
	return &hello.HelloReply{
		Message: "Hello " + req.Name,
	}, nil
}

func main() {
	// 1. 实例化server
	g := grpc.NewServer()
	// 2. 注册
	hello.RegisterGreeterServer(g, &Server{})
	// 3. 启动服务
	listen, err := net.Listen("tcp", ":8080")
	if err != nil {
		panic("failed to listen" + err.Error())
	}
	err = g.Serve(listen)
	if err != nil {
		panic("failed to start grpc" + err.Error())
	}
}

```

client 端

```go
...
func main() {
	conn, err := grpc.Dial("127.0.0.1:8080", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		panic(err)
	}
	defer conn.Close()

	client := hello.NewGreeterClient(conn)
	reply, err := client.SayHello(context.Background(), &hello.HelloRequest{Name: "zhangsan"})
	if err != nil {
		panic(err)
	}
	fmt.Println(reply.Message)
}

```

## RPC 的四种数据流

1. 简单模式 (Simple RPC)
2. 服务端数据流模式 (Server-side streaming RPC)
3. 客户端数据流模式 (Client-side streaming RPC)
4. 双向数据流模式 (Bidirectional streaming RPC)

### 简单模式

这种模式最为传统，即客户端发起一次请求，服务端响应一个数据，

### 服务端数据流

这种模式是客户端发起一次请求，服务端返回一段连续的数据流。

server

```go
func (s *Server) GetStream(req *proto.StreamReqData, res proto.Greeter_GetStreamServer) error {
	i := 0
	for {
		i++
		_ = res.Send(&proto.StreamResData{
			Data: fmt.Sprintf("%v", time.Now().Unix()),
		})
		time.Sleep(time.Second)
		if i > 10 {
			break
		}
	}
	return nil
}
```

client

```go
	res, _ := client.GetStream(context.Background(), &proto.StreamReqData{Data: "Hello"})
	for {
		data, err := res.Recv()
		if err != nil {
			fmt.Println(err)
			break
		}
		fmt.Println(data)
	}
```

### 客户端数据流

客户端数据流与服务端数据流模式相反，这次是客户端源源不断的向服务端发送数据流，而在发送结束后，由服务端返回一个响应。典型的例子是物联网终端向服务器报送数据。

server

```go
func (s *Server) PostStream(res proto.Greeter_PostStreamServer) error {
	for {
		if data, err := res.Recv(); err != nil {
			fmt.Println(err)
			break
		} else {
			fmt.Println(data)
		}
	}
	return nil
}
```

client

```go
postStream, err := client.PostStream(context.Background())
	i := 0
	for {
		i++
		_ = postStream.Send(&proto.StreamReqData{Data: fmt.Sprintf("早上好! %d", i)})
		time.Sleep(time.Second)
		if i > 10 {
			break
		}
	}

```

### 双向数据流

顾名思义，这是客户端和服务端都可以向对方发送数据流，这个时候双方的数据可以同时互相发送，也就是可以实现实时交互。典型的例子是聊天机器人。

server

```go
func (s *Server) ALLStream(allStr proto.Greeter_AllStreamServer) error {
	wg := sync.WaitGroup{}
	wg.Add(2)
	go func() {
		defer wg.Done()
		for {
			data, _ := allStr.Recv()
			fmt.Println("收到客户端消息：" + data.Data)
		}
	}()

	go func() {
		defer wg.Done()
		for {
			_ = allStr.Send(&proto.StreamResData{Data: "我是服务器"})
			time.Sleep(time.Second)
		}
	}()

	wg.Wait()
	return nil
}
```

client

```go
allStream, err := client.AllStream(context.Background())
	waitGroup := sync.WaitGroup{}
	waitGroup.Add(2)
	go func() {
		defer waitGroup.Done()
		for {
			data, _ := allStream.Recv()
			fmt.Println("收到服务器的消息", data.Data)
		}
	}()
	go func() {
		defer waitGroup.Done()
		for {
			_ = allStream.Send(&proto.StreamReqData{Data: "我是客户端"})
			time.Sleep(time.Second)
		}
	}()
	waitGroup.Wait()
```
