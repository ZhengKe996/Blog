---
title: Golang 小记📝
date: 2022-08-03
draft: true
lang: zh
duration: 25min
---

![BG](/public/images/golang-study/bg.png)

## Go 语言的基本语法

```go
package main

import (
	"fmt"
)
func main() {
	fmt.Println("Hello World")
  }
```

### 变量定义

##### 使用 var 关键字

- var a,b,c bool
- var s1,s2 string = "Hello World"
- 可放在函数内，或直接放在包内
- 使用 var() 集中定义变量

##### 编译器自动决定类型

```go
 var a, b, c, s = 3, 4, true, "def"
```

##### 使用 := 定义变量

```go
  a, b, c, s := 3, 4, true, "def"
```

### 内建变量类型

- bool, string
- (u)int, (u)int8, (u)int16, (u)int32, (u)int64, uintptr
- byte, rune
- float32, float64, complex64, complex128

### 强制类型转换

类型转换是强制的
![强制类型转换](/public/images/golang-study/1-1.png)

```go
var a,b int = 3,4
// var c int = math.Sqrt(a*a + b*b) ❎
var c int = int(main.Sqrt(float64(a*a + b*b)))
```

### 常量的定义

const 数值可作为各种类型使用

```go
const filename = "abc.txt"
const a,b = 3,4

var c int = int(main.Sqrt(a*a + b*b)) // ✅
```

##### 普通的枚举类型

```go
const (
  cpp,
  JavaScript,
  TypeScript,
  Java,
  Python,
  )
```

##### 自增值枚举类型

```go
const (
  b = 1 << (10 * iota)
  kb
  mb
  gb
  tb
  pb
)
```

### 变量定义的要点

- 变量类型写在变量名之后
- 编译器可推测变量类型
- 没有 char，只有 rune
- 原生支持复数类型

### 结构控制: if

- if 的条件不需要括号
- if 的条件里可以赋值
- if 的条件里赋值的变量作用域就在这个 if 语句中

```go
func bounded(v int) int {
	if v > 100 {
		return 100
	} else if v < 0 {
		return 0
	} else {
		return v
	}
}
```

### 结构控制: switch

- switch 自动 break，除非使用 fallthrough
- switch 之后可以没有表达式

```go
func grade(score int) string {
	g := ""
	switch {
	case score < 0 || score > 100:
		panic(fmt.Sprintf("Wrong score: %d", score))
	case score < 60:
		g = "F"
	case score < 80:
		g = "C"
	case score < 90:
		g = "B"
	case score <= 100:
		g = "A"
	}
	return g
}
```

### 结构控制: for

- for 的条件里不需要括号
- for 的条件里可以省略初始条件，结束条件，递增表达式
- 省略初始条件 相当于 while
- 无线循环

```go
func forFunc() int {
	sum := 0
	for i := 1; i <= 100; i++ {
		sum += i
	}
	return sum
}
```

```go
func converToBin(n int) string {
	result := ""
	for ; n > 0; n /= 2 {
		lsb := n % 2
		result = strconv.Itoa(lsb) + result
	}
	return result
}
```

```go
func forver() {
	for {
		fmt.Println("abc")
	}
}
```

### 结构控制基本语法要点

- for、if 后面的条件没有括号
- if 条件里也可定义变量
- 没有 while
- switch 不需要 break，也可以直接 switch 多个条件

### 函数

- 返回值类型写在最后面
- 函数返回多个值可以起名字（仅限于非常简单的函数）
- 函数作为参数
- 没有默认参数、可选参数
- 可变参数列表

```go
func eval(a, b int, op string) int {}
```

```go
func div(a, b int) (q, r int) {
	q = a / b
	r = a % b
	return q, r
}
```

### 指针

- 指针不能运算

```go
var a int = 2
var pa *int = &a
*pa = 3

fmt.Println(a) // 3
```

### 参数传递

Go 语言只有值传递一种方式

### 数组

- 数量写在类型前

```go
	var arr1 [5]int
	arr2 := [3]int{1, 3, 5}
	arr3 := [...]int{2, 4, 6, 8, 10}
  var grid [4][5]bool
```

##### 数组的遍历

- 可通过\_省略变量
- 不仅 range，任何地方都可通过\_省略变量
- 如果只要 i，可以写成 for i:= range numbers

```go
	//for循环遍历数组方法
	for i := 0; i < len(numbers); i++ {
		fmt.Println(numbers[i])
	}

	for i, v := range numbers {
		fmt.Println(i, v)
	}
```

##### 为什么要使用 range

- 意义明确，美观
- c++：没有类似的能力
- Java/Python： 只有 for each value，不能同时获取 i，v

##### 数组是值类型

- [10]int 和 [20]int 是不同类型
- 调用 func f(arr [10]int) 会拷贝数组
- 在 Go 语言中一般不直接使用数组

### Slice（切片）

- Slice 本身没有数据，是对底层 array 的一个 view

##### Reslice

```go
	arr := [...]int{0, 1, 2, 3, 4, 5, 6, 7}
	fmt.Println("arr[2:6]=", arr[2:6]) // arr[2:6]= [2 3 4 5]
	fmt.Println("arr[:6]=", arr[:6]) // arr[:6]= [0 1 2 3 4 5]
	fmt.Println("arr[2:]=", arr[2:]) // arr[2:]= [2 3 4 5 6 7]
	fmt.Println("arr[:]=", arr[:]) // arr[:]= [0 1 2 3 4 5 6 7]
```

##### Slice 的实现

- Slice 可以向后扩展，不可以向前扩展
- s[i] 不可以超越 len(s)，向后扩展不可以超越底层数组 cap(s)

![Slice实现](/public/images/golang-study/1-2.png)

##### 向 Slice 添加元素

- 添加元素时如果超越 cap，系统会重新分配更大的底层数组
- 由于值传递的关系，必须接收 append 的返回值
- s = append(s,val)

```go
	arr := [...]int{0, 1, 2, 3, 4, 5, 6, 7}
	s1 := arr[2:6]
	s2 := s1[3:5]
  s3 := append(s2, 10)
  // s4 and s5 不再是arr的view
	s4 := append(s3, 11)
	s5 := append(s4, 12)

  fmt.Println("s3,s4,s5= ", s3, s4, s5) // s3,s4,s5=  [5 6 10] [5 6 10 11] [5 6 10 11 12]
  fmt.Println("arr= ", arr) // arr=  [0 1 2 3 4 5 6 10]
```

##### create slice

```go
  s1 := []int{2, 4, 6, 8, 10}
	s2 := make([]int, 16)
	s3 := make([]int, 10, 32)
```

##### copying slice

```go
	s1 := []int{2, 4, 6, 8, 10}
	s2 := make([]int, 16)
	copy(s2, s1)
```

##### deleting elements from slice

```go
	// 删除 8 在 [2 4 6 8 10 0 0 0 0 0 0 0 0 0 0 0]
	s2 = append(s2[:3], s2[4:]...)
	printSlice(s2)
```

##### popping from front

```go
	front := s2[0]
	s2 = s2[1:]
```

##### popping from back

```go
	tail := s2[len(s2)-1]
	s2 = s2[:len(s2)-1]
```

### Map

- 创建：make(map[string]int)
- 获取元素：m[key]
- key 不存在时，获得 value 类型的初始值
- 用 value,ok :=m[key] 来判断是否存在 key
- 用 delete 删除一个 key

```go
	m := map[string]string{
		"name":   "zhengke",
		"course": "ts",
		"age":    "0000",
	}
```

##### Map 的遍历

##### Map 的 key

- map 使用哈希表，必须可以比较相等
- 除了 slice、map、function 的内建类型都可以作为 key
- Struct 类型不包含上述字段也可作为 key

- 使用 range 遍历 key，或遍历 key，value 对
- 不保证遍历顺序，如需顺序，需手动对 key 排序
- 使用 len 获得元素个数

##### traversing map

```go
	for k, v := range m {
		fmt.Println(k, v)
	}
```

##### getting values

```go
	courseName, ok := m["course"]
	fmt.Println(courseName, ok)

  if name, ok := m["name2"]; ok {
		fmt.Println(name)
	} else {
		fmt.Println("key dose not exist")
	}
```

##### deleting value

```go
	name, ok := m["name"]
	fmt.Println(name, ok)

	delete(m, "name")
	name, ok = m["name"]
	fmt.Println(name, ok)
```

### rune 相当于 Go 的 char

- 使用 range 遍历 pos,rune 对
- 使用 utf8.RuneCountInString 获得字符数量
- 使用 len 获得字节长度
- 使用 []byte 获得字节

##### 其他字符串操作

- Fields、Split、Join
- Contains、index
- ToLower、ToUpper
- Trim、TrimRight、TrimLeft

```go
s := "早睡早起身体好!" // UTF-8
	fmt.Printf("%X \n", []byte(s))
	for _, b := range []byte(s) {
		fmt.Printf("%X ", b)
	}
	fmt.Println()
	for i, ch := range s {
		fmt.Printf("(%d %X)", i, ch)
	}
  fmt.Println()
	fmt.Println("Rune Count:", utf8.RuneCountInString(s))

	bytes := []byte(s)
	for len(bytes) > 0 {
		ch, size := utf8.DecodeRune(bytes)
		bytes = bytes[size:]
		fmt.Printf("%c ", ch)
	}
```

## 面向对象

- Go 语言仅支持封装，不支持继承和多态
- Go 语言没有 class，只有 struct
- 无论地址还是本身，一律使用 . 来访问成员

### 结构的创建

```go
type treeNode struct {
	value       int
	left, right *treeNode
}

func main() {
	var root treeNode
	root = treeNode{value: 3}
	root.left = &treeNode{}
	root.right = &treeNode{5, nil, nil}
	root.right.left = new(treeNode)
  root.left.right = createNode(2)
}
```

![结构的创建](/public/images/golang-study/1-3.png)

##### Go 语言没有构造函数，可以使用工厂函数

- 使用自定义工厂函数
- 注意返回了局部变量的地址！

```go
func createNode(value int) *treeNode {
	return &treeNode{value: value}
}
```

##### 为结构定义方法

显示定义和命名方法接收者

```go
func (node treeNode) print() {
	fmt.Print(node.value)
}
```

##### 使用指针作为方法接收者

- 只有使用指针才可以改变结构内容
- nil 指针也可以调用方法

```go
func (node *treeNode) setValue(value int) {
	node.value = value
}
```

##### 值接收者 对比 指针接收者

- 要改变内容必须使用指针接收者
- 结构过大也考虑使用指针接收者
- 一致性：如有指针接收者，最好都是指针接收者
- 值接收者 是 go 语言特有
- 值/指针接收者均可接收值/指针

### 封装

- 名字一般使用 CamelCase
- 首字母大写： public
- 首字母小写： private

### 包

- 每个目录一个包
- main 包包含可执行入口
- 为结构定义的方法必须放在同一个包内
- 可以是不同文件

##### 如何扩充系统类型或别人的类型

- 定义别名：最简单
- 使用组合：最常用
- 使用内嵌：可以省下许多代码

## 接口

### 接口的概念

- 强类型语言：熟悉接口的概念
- 弱类型语言：少有接口的概念

### duck typing

- "像鸭子走路，像鸭子叫(长得像鸭子)，那么就是鸭子”
- 描述事物的外部行为而非内部结构
- 严格说 go 属于结构化型系统，类似 duck typing

### 接口的实现

- 接口的实现是隐式的
- 只要实现接口里的方法

### 接口变量里面有什么

- 接口变量自带指针
- 接口变量同样采用值传递，几乎不需要使用接口的指针
- 指针接收者实现只能以指针方式使用；值接收者都可

![接口变量有什么](/public/images/golang-study/1-4.png)

### 查看接口变量

- 表示任何类型：interface{}
- Type Assertion
- Type Switch

### 特殊接口

- Stringer
- Reader/Writer

## 函数

函数是一等公民：参数、变量、返回值都可以是函数

### "正统“函数式编程

- 不可变性：不能有状态，只有常量和函数
- 函数只能用一个参数

### Go 闭包

- 更为自然，不需要修饰如何访问自由变量
- 没有 Lambda 表达式，但有匿名函数

```go
func (node *Node) Traverse() {
	node.TraverseFunc(func(n *Node) {
		n.Print()
	})
	fmt.Println()
}

func (node *Node) TraverseFunc(f func(*Node)) {
	if node == nil {
		return
	}
	node.Left.TraverseFunc(f)
	f(node)
	node.Right.TraverseFunc(f)
}

```

## 资源管理与出错处理

### defer 调用

- 确保调用在函数结束时发生
- 参数在 defer 语句时计算
- defer 列表为后进先出

```go
func tryDefer() {
	for i := 0; i < 100; i++ {
		defer fmt.Println(i)
		if i == 30 {
			panic("printed too many")
		}
	}
}
```

### 何时使用 defer

- Open/Close
- Lock/Unlock
- PrintHeader/PrintFooter

### 错误处理

```go
	file, err := os.OpenFile(filename, os.O_EXCL|os.O_CREATE, 0666) // ❎ 强行出现错误
	if err != nil {
		if pathError, ok := err.(*os.PathError); !ok {
			panic(err)
		} else {
			fmt.Printf("%s, %s, %s\n", pathError.Op, pathError.Path, pathError.Err)
		}
		return
	}
```

统一的错误处理

```go
func HandleFileList(writer http.ResponseWriter, request *http.Request) error {
	path := request.URL.Path[len("/list/"):]
	file, err := os.Open(path)
	if err != nil {
		return err
	}
	defer file.Close()
	all, err := ioutil.ReadAll(file)
	if err != nil {
		return err
	}

	writer.Write(all)
	return nil
}
```

```go
type appHandler func(write http.ResponseWriter, request *http.Request) error

func errWrapper(handler appHandler) func(http.ResponseWriter, *http.Request) {
	return func(writer http.ResponseWriter, request *http.Request) {
		err := handler(writer, request)
		if err != nil {
			log.Printf("Error handling request: %s", err.Error())
			code := http.StatusOK
			switch {
			case os.IsNotExist(err):
				code = http.StatusNotFound
			case os.IsPermission(err):
				code = http.StatusForbidden
			default:
				code = http.StatusInternalServerError
			}
			http.Error(writer, http.StatusText(code), code)
		}
	}
}
func main() {
	http.HandleFunc("/list/", errWrapper(filelisting.HandleFileList))

	err := http.ListenAndServe(":8888", nil)
	if err != nil {
		panic(err)
	}

}

```

### recover

- 仅在 defer 调用中使用
- 获取 panic 的值
- 如果无法处理，可重新 panic

### error vs panic

- 意料之中的：使用 error，如：文件打不开
- 意料之外的：使用 panic，如：数组越界

## goroutine

### 协程 Coroutine

- 轻量级“线程”
- 非抢占式多任务处理，由协程主动交出控制权
- 编译器/解释器/虚拟机层面的多任务
- 多个协程可能在一个或多个线程上运行

##### Coroutines

Subroutines are special cases of more general program
components, called coroutines. In contrast to the unsymmetric
—— Donnald Knuth "The Art of Computer Programming. Vol1"

![Coroutines](/public/images/golang-study/1-5.png)

## goroutine

![goroutine](/public/images/golang-study/1-6.png)

##### goroutine 的定义

- 任何函数只需要加上 go 就能送给调度器运行
- 不需要在定义时区分是否是异步函数
- 调度器在合适的点进行切换
- 使用-race 来检测数据访问冲突

##### goroutine 可能的切换点

- I/O, select
- channel
- 等待锁
- 函数调用（有时)
- runtime.Gosched()

### channel

- channel
- buffered channel
- range
- 理论基础：Communication Sequential Process (CSP)

![channel](/public/images/golang-study/1-7.png)

Don't communicate by sharing memory; share memory by communicating.

不要通过共享内存来通信；通过通信来共享内存

### 传统同步机制

- WaitGroup
- Mutex
- Cond

### 并发编程模式

- 生成器
- 服务/任务
- 同时等待多个服务：两种方法

![channel](/public/images/golang-study/1-8.png)

### 任务的控制

- 非阻塞等待
- 超时机制
- 任务中断/退出
- 优雅退出
