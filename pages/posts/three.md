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

我们实例化了一个 THREE.WebGLRenderer，这是一个基于 WebGL 渲染的渲染器，当然，Three.js 向下兼容，还有 CanvasRenderer，CSS2DRenderer，CSS3DRenderer 和 SVGRenderer，这四个渲染器分别基于 canvas2D,CSS2D，CSS3D 和 SVG 渲染的渲染器。作为 3D 渲染，WebGL 渲染的效果最好，并且支持的功能更多。
调用了一个设置函数`setSize`方法，这个是设置我们需要显示的窗口大小。案例我们是基于浏览器全屏显示，所以设置了浏览器窗口的宽和高。
`renderer.domElement`是在实例化渲染器时生成的一个`canvas`画布，渲染器渲染界面生成的内容，都将在这个画布上显示。所以，我们将这个画布添加到了 dom 当中，来显示渲染的内容

3. 初始化场景

```js
const initScene = () => {
  scene = new THREE.Scene(); //实例化场景
};
```

场景只是作为一个容器，我们将需要显示的内容都放到场景对象当中。如果我们需要将一个模型放入到场景当中，则可以使用`scene.add`方法

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

我们实例化了一个透视相机，需要四个值分别是视野，宽高比，近裁面和远裁面。我们分别介绍一下这四个值：

- 视野：当前相机视野的宽度，值越大，渲染出来的内容也会更多。
- 宽高比：默认是按照画布的显示的宽高比例来设置，如果比例设置的不对，会发现渲染出来的画面有拉伸或者压缩的感觉。
- 近裁面和远裁面：这个是设置相机可以看到的场景内容的范围，如果场景内的内容位置不在这两个值内的话，将不会被显示到渲染的画面中。
  ![three.js](/public/images/threejs/1-1.png)

WebGL 坐标系统作为 3D 坐标，在原来的 2D 坐标 xy 轴上面又多了一个 z 轴，大家注意 z 轴的方向，是坐标轴朝向我们的方向是正轴，我们眼看去的方向是是 z 轴的负方向。
camera.position.set 函数是设置当前相机的位置，函数传的三个值分别是 x 轴坐标，y 轴坐标和 z 轴坐标。我们只是将相机的放到了 z 正轴坐标轴距离坐标原点的 15 的位置。相机默认的朝向是朝向 0 点坐标的，我们也可以设置相机的朝向。

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

我们实例化了一个`THREE.BoxGeometry`立方体的几何体对象，实例化的三个传值分别代表着立方体的长度，宽度和高度。我们全部设置的相同的值，将渲染出一个标准的正立方体。

我们实例化了一个 THREE.MeshNormalMaterial 材质，这种材质的特点是，它会根据面的朝向不同，显示不同的颜色。

通过`THREE.Mesh`方法实例化创建了一个网格对象，`THREE.Mesh`实例化需要传两个值，分别是几何体对象和材质对象，才可以实例化成功。

6. 运行动画

```js
const animate = () => {
  requestAnimationFrame(animate); // 循环调用函数

  mesh.rotation.x += 0.01; // 每帧网格模型的沿x轴旋转0.01弧度
  mesh.rotation.y += 0.02; // 每帧网格模型的沿y轴旋转0.02弧度

  renderer.render(scene, camera); // 渲染界面
};
```

渲染的`render`方法需要两个值，第一个值是场景对象，第二个值是相机对象。这意味着，你可以有多个相机和多个场景，可以通过渲染不同的场景和相机让画布上显示不同的画面。
每一个实例化的网格对象都有一个`rotation`的值，通过设置这个值可以让立方体旋转起来。在每一帧里，我们让立方体沿 x 轴方向旋转 0.01 弧度，沿 y 轴旋转 0.02 弧度（1π 弧度等于 180 度角度）。

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

使用`Three.js`显示创建的内容，我们必须需要的三大件是：`渲染器，相机和场景`。相机获取到场景内显示的内容，然后再通过渲染器渲染到画布上面。

## 性能监测插件

1. 引入

```js
<script src="http://www.wjceo.com/lib/js/libs/stats.min.js"></script>
```

2. 实例化一个`stats`对象, 把对象内生成的`dom`渲染到页面中

```js
stats = new Stats();
document.body.appendChild(stats.dom);
```

3. 需要在`requestAnimationFrame`的回调里进行更新每次渲染的时间

```js
const animate = () => {
  ...
  stats.update(); // 更新性能插件
  ...
};
```

## 基本元素

#### scene 场景

场景是我们每个`Three.js`项目里面放置内容的容器，我们也可以拥有多个场景进行切换展示，你可以在场景内放置你的**模型**，**灯光**和**照相机**。还可以通过调整场景的位置，让场景内的所有内容都一起跟着调整位置。

###### THREE.Object3D

为了方便操作，Three.js 将每个能够直接添加到场景内的对象都继承至一个基类-THREE.Object3D，以后我们将继承至这个基类的对象称为 3d 对象，判断一个对象是否是继承至 THREE.Object3D，我们可以这么判断：

```js
obj instanceof THREE.Object3D; // 继承至返回 true 否则返回false
```

###### 向场景内添加一个`3d`对象

```js
scene.add(mesh); // 将网格添加到场景
```

这个方法不光能够在场景内使用, 而且也可以将一个`3d`对象添加到另一个`3d`对象里面:

```js
parent.add(child);
```

###### 获取一个 3d 对象

```js
object3D.name = "firstObj";
scene.add(object3D);

scene.getObjectByName("firstObj"); // 返回第一个匹配的3d对象
```

###### 删除一个 3d 对象

如果我们想隐藏一个`3d`对象，而不让它显示，可以通过设置它的`visible`的值:

```js
mesh.visible = false; // 设置为false，模型将不会被渲染到场景内
```

如果一个模型不再被使用到，需要彻底删除掉，我们可以使用`remove`方法进行删除:

```js
scene.remove(mesh); // 将一个模型从场景中删除
```

###### 修改位置

单独设置

```js
mesh.position.x = 3; // 将模型的位置调整到x正轴距离原点为3的位置。
mesh.position.y += 5; // 将模型的y轴位置以当前的位置向上移动5个单位。
mesh.position.z -= 6;
```

一次性设置所有

```js
mesh.position.set(3, 5, -6); // 直接将模型的位置设置在x轴为3，y轴为5，z轴为-6的位置
```

`Three.js`的模型的位置属性是一个`THREE.Vector3`（三维向量)我们可以直接重新赋值一个新的对象:

```js
mesh.position = new THREE.Vector3(3, 5, -6); // 上面的设置位置也可以通过这样设置。
```

###### 修改大小

单独设置

```js
mesh.scale.x = 2; // 模型沿x轴放大一倍
mesh.scale.y = 0.5; // 模型沿y轴缩小一倍
mesh.scale.z = 1; // 模型沿z轴保持不变
```

使用 set 方法

```js
mesh.scale.set(2, 2, 2); // 每个方向等比放大一倍
```

由于`scale`属性也是一个三维向量，我们可以通过赋值的方式重新修改

```js
mesh.scale = new THREE.Vector3(2, 2, 2); // 每个方向都放大一倍
```

###### 修改模型的转向

单独设置每个轴的旋转：

```js
mesh.rotation.x = Math.PI; // 模型沿x旋转180度
mesh.rotation.y = Math.PI * 2; // 模型沿y轴旋转360度，跟没旋转一样的效果。。。
mesh.rotation.z = -Math.PI / 2; // 模型沿z轴逆时针旋转90du
```

使用`set`方法重新赋值：

```js
mesh.rotation.set(Math.PI, 0, -Math.PI / 2); //旋转效果和第一种显示的效果相同
```

模型的`rotation`属性其实是一个欧拉角对象（`THREE.Euler`），我们可以通过重新赋值一个欧拉角对象来实现旋转调整:

```js
mesh.rotation = new THREE.Euler(Math.PI, 0, -Math.PI / 2, "YZX");
```

...
