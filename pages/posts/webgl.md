---
title: WebGL
date: 2022-04-05
draft: true
lang: zh
duration: 20min
---

## 初识 WebGL

#### 手动绘制第一个 WebGL 图形

![webgl](/public/images/webgl/1-1.png)

实现的步骤：<br />

1. 添加一个画布元素

```html
<canvas id="cvs" width="200" height="200">
  你的浏览器不支持Canvas画布元素
</canvas>
```

```javascript
let cvs = document.getElementById("cvs");
```

2. 获取到画布元素的基于 webgl 上下文环境对象

```javascript
const gl = cvs.getContext("webgl");
```

3. 使用对象中的 API 实现图形绘制

```javascript
gl.clearColor(0.0, 1.0, 0.0, 1.0);

gl.clear(gl.COLOR_BUFFER_BIT);
```

#### 着色器绘制第一个 WebGL 图形

###### WebGL 中的坐标系统

![webgl](/public/images/webgl/1-2.jpg)

###### 着色器

**顶点着色器** 将输入顶点从原始坐标系转换到 WebGL 使用的缩放空间坐标系, 每个轴的坐标范围从-1.0 到 1.0, 顶点着色器对顶点坐标进行必要的转换后, 保存在名称为 gl_Position 的特殊变量中 <br />

**片段着色器** 在顶点着色器处理完图形的顶点后, 会被要绘制的每个图形的每个像素点调用一次, 它的功能是确定像素的颜色值, 并保存在名称为 gl_FragColor 的特殊变量中, 该颜色值将最终绘制到图形像素的对应位置中

![webgl](/public/images/webgl/1-3.png)

实现的步骤：

1. 着色器绘制图形的准备工作

```javascript
let cvs = document.getElementById("cvs");
const gl = cvs.getContext("webgl");

// 顶点着色器变量
const VSHADER_SOURCE = `
      void main(){
        gl_Position = vec4(0.0,0.0,0.0,1.0);
        gl_PointSize = 10.0; 
      }`;

// 片段着色器变量
const FSHADER_SOURCE = `
      void main(){
        gl_FragColor = vec4(0.0,1.0,0.0,1.0);
      }`;
```

2. 编译装载完成的着色器对象

```javascript
// 新建用于装载顶点字符串的着色器对象
const vertShader = gl.createShader(gl.VERTEX_SHADER);

// 加载保存好的顶点字符串变量
gl.shaderSource(vertShader, VSHADER_SOURCE);

// 编译顶点着色器
gl.compileShader(vertShader);

// 新建用于装载片段字符串的着色器对象
const fragShader = gl.createShader(gl.FRAGMENT_SHADER);

// 加载保存好的片段字符串变量
gl.shaderSource(fragShader, FSHADER_SOURCE);

// 编译片段着色器
gl.compileShader(fragShader);
```

3. 链接编译完成的着色器程序并使用

```javascript
// 新建程序附加编译完成的着色器对象
const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertShader);
gl.attachShader(shaderProgram, fragShader);

// 链接两个附加好的着色器程序
gl.linkProgram(shaderProgram);

// 开启程序使用
gl.useProgram(shaderProgram);
```

4. 使用着色器程序绘制图形

```javascript
gl.drawArrays(gl.POINTS, 0, 1);
```

## 绘制多点绘制

![webgl](/public/images/webgl/2-1.png)

#### 多点绘制三角形的方法

###### attribute 变量

一种存储限定符, 表示定义一个 attribute 的全局变量, 这种变量的数据将由外部向顶点着色器内传输, 并保存 **顶点** 相关的数据,只有顶点着色器才能使用

###### 使用 attribute 变量

1. 在顶点着色器中,声明一个 attribute 变量
2. 将 attribute 变量赋值给 gl_Position 变量
3. 向 attribute 变量传输数据

```javascript
const VSHADER_SOURCE =
  `attribute vec4 a_Position;` +
  `void main(){
      gl_Position = a_Position;
  }`;
```

###### 使用缓存区关联 attribute 变量

1. 创建缓存区对象

```javascript
const vertexBuffer = gl.createBuffer();
```

2. 绑定缓存区对象

```javascript
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
```

3. 将数据写入对象

```javascript
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
```

4. 将缓存区对象分配给 attribute 变量

```javascript
const a_Position = gl.getAttribLocation(shaderProgram, "a_Position");
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
```

5. 开启 attribute 变量

```javascript
gl.enableVertexAttribArray(a_Position);
```

6. 绘制

```javascript
gl.drawArrays(gl.TRIANGLES, 0, 3);
```

## WebGL 动画

#### 图形的移动

![webgl](/public/images/webgl/4-1.png)

###### 平移原理

平移一个三角形, 只需要对它的每个顶点进行移动, 即每个顶点加上一个分量, 得到一个新的坐标

###### uniform 类型变量

用于保存和传输一致的数据, 既可用于顶点, 也可用于片断

###### 实现步骤

1. 使用存储限定符定义一个接受一致偏移量的变量

```javascript
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform vec4 u_Translation;
  void main(){
    gl_Position = a_Position + u_Translation;
  }`;
```

2. 定义各坐标点的统一偏移量

```javascript
const Tx = 0.4,
  Ty = 0.3,
  Tz = 0.0;
```

3. 获取到顶点着色器中 uniform 变量

```javascript
const u_Translation = gl.getUniformLocation(shaderProgram, "u_Translation");
```

4. 将多个偏移量赋值值给 uniform 变量

```javascript
gl.uniform4f(u_Translation, Tx, Ty, Tz, 0.0);
```

5. 绘制

```javascript
gl.drawArrays(gl.TRIANGLES, 0, 3);
```

#### 图形的旋转

![webgl](/public/images/webgl/4-2.png)

###### 旋转原理

1. 旋转轴(围绕 X 和 Y 轴旋转)

2. 旋转的方向(顺时针和逆时针)，负值是为顺时针，正值时为逆时针

3. 旋转的角度(图形经过的角度)
   ![webgl](/public/images/webgl/4-3.png)
   ![webgl](/public/images/webgl/4-4.png)

###### 实现步骤

1. 顶点着色器变量

```js
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform float u_CosB,u_SinB;
  void main(){
    gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;
    gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB;
    gl_Position.z = a_Position.z;
    gl_Position.w = 1.0;        
  }
`;
```

2. 设置需要旋转的角度

```js
const ANGLE = 30.0; // 顺时针
```

3. 将角度转成弧度用于函数的计算

```js
const radian = (Math.PI * ANGLE) / 180.0;
```

4. 计算并保存正弦和余弦的值

```js
const cosB = Math.cos(radian);
const sinB = Math.sin(radian);
```

5. 分别取出从顶点着色器并保存

```js
const u_CosB = gl.getUniformLocation(shaderProgram, "u_CosB");
const u_SinB = gl.getUniformLocation(shaderProgram, "u_SinB");
```

6. 将保存好的函数值赋给变量

```js
gl.uniform1f(u_CosB, cosB);
gl.uniform1f(u_SinB, sinB);
```

7. 绘制

```js
gl.drawArrays(gl.TRIANGLES, 0, 3);
```

#### 图形的缩放

![webgl](/public/images/webgl/4-5.png)

###### 缩放的原理

通过改变原有图形中的矩阵值, 实现图形的拉大和缩下效果, 因此, 只需要修改原有图形的矩阵值即可
![webgl](/public/images/webgl/4-6.png)

###### 实现方法

1. 顶点着色器变量

```js
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform mat4 u_xformMatrix;
  void main(){
    gl_Position = a_Position * u_xformMatrix;
  }`;
```

2. 设置缩放的距离值

```js
const Sx = 0.5,
  Sy = 0.5,
  Sz = 1.0;
```

3. 定义 4 \* 4 的矩阵

```js
const xformMatrix = new Float32Array([
  Sx,
  0.0,
  0.0,
  0.0,
  0.0,
  Sy,
  0.0,
  0.0,
  0.0,
  0.0,
  Sz,
  0.0,
  0.0,
  0.0,
  0.0,
  1.0,
]);
```

4. 获取顶点着色器中距阵变量

```js
const u_xformMatrix = gl.getUniformLocation(shaderProgram, "u_xformMatrix");
```

5. 将设置的值赋值给变量

```js
gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);
```

6. 绘制

```js
gl.drawArrays(gl.TRIANGLES, 0, 3);
```

#### 平滑旋转三角形

![webgl](/public/images/webgl/4-7.jpg)

###### 屏幕刷新频率

图像在屏幕上更新的速度, 也即屏幕上的图像每秒钟出现的次数, 一般是 60Hz 的屏幕每 16.7ms 刷新一次

###### 动画原理

    图像被刷新时, 引起以连贯的、平滑的方式进行过渡变化.

###### 实现方法

1. 顶点着色器变量

```js
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform float u_CosB,u_SinB;
  void main(){
    gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;
    gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB;
    gl_Position.z = a_Position.z;
    gl_Position.w = 1.0;
  }`;
```

2. 封装绘制旋转三角形脚本

```js
const draw = (ANGLE) => {
  const radian = (Math.PI * ANGLE) / 180.0;
  const cosB = Math.cos(radian);
  const sinB = Math.sin(radian);

  const u_CosB = gl.getUniformLocation(shaderProgram, "u_CosB");
  const u_SinB = gl.getUniformLocation(shaderProgram, "u_SinB");

  gl.uniform1f(u_CosB, cosB);
  gl.uniform1f(u_SinB, sinB);

  gl.drawArrays(gl.TRIANGLES, 0, 3);
};
```

3. 计算每秒绘制的角度

```js
// 获取旋转前的时间
let cur_time = Date.now();
// 旋转角度
let ANGLE_STEP = -10.0;
// 初始状态角度值
let ANGLE_INIT = 20.0;
// 执行时的角度值
let ANGLE_ACT = 0.0;
```

4. 封装计算角度函数

```js
const animate = (c1, a1, a2) => {
  // 计算距离上次调用经过了多少时间
  let act_time = Date.now();
  // 得到这次调用与上次调用的时间间隔
  let dif_time = act_time - c1;
  c1 = act_time;
  let ANGLE_NEW = a1 + a2 * (dif_time / 1000.0);
  // 返回一个始终是小于360度的角度
  return (ANGLE_NEW %= 360);
};
```

5. 定义用于绘制的函数

```js
const tick = () => {
  // 获取每次旋转的角度
  ANGLE_ACT = animate(cur_time, ANGLE_INIT, ANGLE_STEP);
  draw(ANGLE_ACT);
  window.requestAnimationFrame(tick);
};
```

6. 调用绘制的函数

```js
tick();
```
