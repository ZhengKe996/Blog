---
title: Three.js
date: 2022-04-06
draft: true
lang: zh
duration: 25min
---

## 我的第一个 Three.js

![three.js](/public/images/threejs/1-0.png)

```html
<script src="https://cdn.bootcdn.net/ajax/libs/three.js/r128/three.min.js"></script>

<body onload="init()"></body>
```

> ready 和 onload 的区别: ready 加载完 js 和 css 就执行, onload 必须加载完图片之后.

1. 声明全局变量

```js
let renderer, camera, scene, geometry, material, mesh;
```

2. 初始化渲染器

```js
const initRenderer = () => {
  renderer = new THREE.WebGLRenderer(); // 实例化渲染器
  renderer.setSize(window.innerWidth, window.innerHeight); // 设置宽和高
  document.body.appendChild(renderer.domElement); // 添加到dom
};
```

> 我们实例化了一个 THREE.WebGLRenderer，这是一个基于 WebGL 渲染的渲染器，当然，Three.js 向下兼容，还有 CanvasRenderer，CSS2DRenderer，CSS3DRenderer 和 SVGRenderer，这四个渲染器分别基于 canvas2D,CSS2D，CSS3D 和 SVG 渲染的渲染器。作为 3D 渲染，WebGL 渲染的效果最好，并且支持的功能更多。
> 调用了一个设置函数`setSize`方法，这个是设置我们需要显示的窗口大小。案例我们是基于浏览器全屏显示，所以设置了浏览器窗口的宽和高。
> `renderer.domElement`是在实例化渲染器时生成的一个`canvas`画布，渲染器渲染界面生成的内容，都将在这个画布上显示。所以，我们将这个画布添加到了 dom 当中，来显示渲染的内容

3. 初始化场景

```js
const initScene = () => {
  scene = new THREE.Scene(); //实例化场景
};
```

> 场景只是作为一个容器，我们将需要显示的内容都放到场景对象当中。如果我们需要将一个模型放入到场景当中，则可以使用`scene.add`方法

4. 初始化相机

```js
const initCamera = () => {
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    200
  ); // 实例化相机
  camera.position.set(0, 0, 15);
};
```

> 我们实例化了一个透视相机，需要四个值分别是视野，宽高比，近裁面和远裁面。我们分别介绍一下这四个值：
>
> - 视野：当前相机视野的宽度，值越大，渲染出来的内容也会更多。
> - 宽高比：默认是按照画布的显示的宽高比例来设置，如果比例设置的不对，会发现渲染出来的画面有拉伸或者压缩的感觉。
> - 近裁面和远裁面：这个是设置相机可以看到的场景内容的范围，如果场景内的内容位置不在这两个值内的话，将不会被显示到渲染的画面中。
>   ![three.js](/public/images/threejs/1-1.png)

> WebGL 坐标系统作为 3D 坐标，在原来的 2D 坐标 xy 轴上面又多了一个 z 轴，大家注意 z 轴的方向，是坐标轴朝向我们的方向是正轴，我们眼看去的方向是是 z 轴的负方向。
> camera.position.set 函数是设置当前相机的位置，函数传的三个值分别是 x 轴坐标，y 轴坐标和 z 轴坐标。我们只是将相机的放到了 z 正轴坐标轴距离坐标原点的 15 的位置。相机默认的朝向是朝向 0 点坐标的，我们也可以设置相机的朝向。
> <img src="/public/images/threejs/1-2.png"  style="zoom:50%;" />

5. 创建模型

```js
const initMesh = () => {
  geometry = new THREE.BoxGeometry(2, 2, 2); // 创建几何体
  material = new THREE.MeshNormalMaterial(); // 创建材质

  mesh = new THREE.Mesh(geometry, material); // 创建网格
  scene.add(mesh); // 将网格添加到场景
};
```

> 我们实例化了一个`THREE.BoxGeometry`立方体的几何体对象，实例化的三个传值分别代表着立方体的长度，宽度和高度。我们全部设置的相同的值，将渲染出一个标准的正立方体。

> 我们实例化了一个 THREE.MeshNormalMaterial 材质，这种材质的特点是，它会根据面的朝向不同，显示不同的颜色。

> 通过`THREE.Mesh`方法实例化创建了一个网格对象，`THREE.Mesh`实例化需要传两个值，分别是几何体对象和材质对象，才可以实例化成功。

6. 运行动画

```js
const animate = () => {
  requestAnimationFrame(animate); // 循环调用函数

  mesh.rotation.x += 0.01; // 每帧网格模型的沿x轴旋转0.01弧度
  mesh.rotation.y += 0.02; // 每帧网格模型的沿y轴旋转0.02弧度

  renderer.render(scene, camera); // 渲染界面
};
```

> 渲染的`render`方法需要两个值，第一个值是场景对象，第二个值是相机对象。这意味着，你可以有多个相机和多个场景，可以通过渲染不同的场景和相机让画布上显示不同的画面。
> 每一个实例化的网格对象都有一个`rotation`的值，通过设置这个值可以让立方体旋转起来。在每一帧里，我们让立方体沿 x 轴方向旋转 0.01 弧度，沿 y 轴旋转 0.02 弧度（1π 弧度等于 180 度角度）。

7. 初始化函数,页面加载完成时调用

```js
const init = () => {
  initRenderer();
  initScene();
  initCamera();
  initMesh();
  animate();
};
```

> 使用`Three.js`显示创建的内容，我们必须需要的三大件是：`渲染器，相机和场景`。相机获取到场景内显示的内容，然后再通过渲染器渲染到画布上面。

...
