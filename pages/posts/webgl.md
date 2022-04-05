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
<canvas id="cvs" width="200" height="200" style="border: dashed 1px red">
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
