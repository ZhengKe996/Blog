---
title: Golang
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

## 变量定义

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

## 内建变量类型

- bool, string
- (u)int, (u)int8, (u)int16, (u)int32, (u)int64, uintptr
- byte, rune
- float32, float64, complex64, complex128

## 强制类型转换

类型转换是强制的
![强制类型转换](/public/images/golang-study/1-1.png)

```go
var a,b int = 3,4
// var c int = math.Sqrt(a*a + b*b) ❎
var c int = int(main.Sqrt(float64(a*a + b*b)))
```

## 常量的定义

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

## 变量定义的要点

- 变量类型写在变量名之后
- 编译器可推测变量类型
- 没有 char，只有 rune
- 原生支持复数类型

## 结构控制: if

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

## 结构控制: switch

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

## 结构控制: for

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

## 结构控制基本语法要点

- for、if 后面的条件没有括号
- if 条件里也可定义变量
- 没有 while
- switch 不需要 break，也可以直接 switch 多个条件

## 函数

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

## 指针

- 指针不能运算

```go
var a int = 2
var pa *int = &a
*pa = 3

fmt.Println(a) // 3
```

## 参数传递

Go 语言只有值传递一种方式

## 数组

- 数量写在类型前

```go
	var arr1 [5]int
	arr2 := [3]int{1, 3, 5}
	arr3 := [...]int{2, 4, 6, 8, 10}
  var grid [4][5]bool
```

#### 数组的遍历

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

#### 为什么要使用 range

- 意义明确，美观
- c++：没有类似的能力
- Java/Python： 只有 for each value，不能同时获取 i，v

#### 数组是值类型

- [10]int 和 [20]int 是不同类型
- 调用 func f(arr [10]int) 会拷贝数组
- 在 Go 语言中一般不直接使用数组

## Slice（切片）

- Slice 本身没有数据，是对底层 array 的一个 view

#### Reslice

```go
	arr := [...]int{0, 1, 2, 3, 4, 5, 6, 7}
	fmt.Println("arr[2:6]=", arr[2:6]) // arr[2:6]= [2 3 4 5]
	fmt.Println("arr[:6]=", arr[:6]) // arr[:6]= [0 1 2 3 4 5]
	fmt.Println("arr[2:]=", arr[2:]) // arr[2:]= [2 3 4 5 6 7]
	fmt.Println("arr[:]=", arr[:]) // arr[:]= [0 1 2 3 4 5 6 7]
```

#### Slice 的实现

- Slice 可以向后扩展，不可以向前扩展
- s[i] 不可以超越 len(s)，向后扩展不可以超越底层数组 cap(s)

![Slice实现](/public/images/golang-study/1-2.png)

#### 向 Slice 添加元素

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

#### create slice

```go
  s1 := []int{2, 4, 6, 8, 10}
	s2 := make([]int, 16)
	s3 := make([]int, 10, 32)
```

#### copying slice

```go
	s1 := []int{2, 4, 6, 8, 10}
	s2 := make([]int, 16)
	copy(s2, s1)
```

#### deleting elements from slice

```go
	// 删除 8 在 [2 4 6 8 10 0 0 0 0 0 0 0 0 0 0 0]
	s2 = append(s2[:3], s2[4:]...)
	printSlice(s2)
```

#### popping from front

```go
	front := s2[0]
	s2 = s2[1:]
```

#### popping from back

```go
	tail := s2[len(s2)-1]
	s2 = s2[:len(s2)-1]
```

## Map

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

#### Map 的遍历

#### Map 的 key

- map 使用哈希表，必须可以比较相等
- 除了 slice、map、function 的内建类型都可以作为 key
- Struct 类型不包含上述字段也可作为 key

- 使用 range 遍历 key，或遍历 key，value 对
- 不保证遍历顺序，如需顺序，需手动对 key 排序
- 使用 len 获得元素个数

#### traversing map

```go
	for k, v := range m {
		fmt.Println(k, v)
	}
```

#### getting values

```go
	courseName, ok := m["course"]
	fmt.Println(courseName, ok)

  if name, ok := m["name2"]; ok {
		fmt.Println(name)
	} else {
		fmt.Println("key dose not exist")
	}
```

#### deleting value

```go
	name, ok := m["name"]
	fmt.Println(name, ok)

	delete(m, "name")
	name, ok = m["name"]
	fmt.Println(name, ok)
```

## rune 相当于 Go 的 char

- 使用 range 遍历 pos,rune 对
- 使用 utf8.RuneCountInString 获得字符数量
- 使用 len 获得字节长度
- 使用 []byte 获得字节

#### 其他字符串操作

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
