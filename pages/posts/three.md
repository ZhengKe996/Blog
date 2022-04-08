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

我们实例化了一个 THREE.WebGLRenderer, 这是一个基于 WebGL 渲染的渲染器, 当然, Three.js 向下兼容, 还有 CanvasRenderer, CSS2DRenderer, CSS3DRenderer 和 SVGRenderer, 这四个渲染器分别基于 canvas2D,CSS2D, CSS3D 和 SVG 渲染的渲染器。作为 3D 渲染, WebGL 渲染的效果最好, 并且支持的功能更多。
调用了一个设置函数`setSize`方法, 这个是设置我们需要显示的窗口大小。案例我们是基于浏览器全屏显示, 所以设置了浏览器窗口的宽和高。
`renderer.domElement`是在实例化渲染器时生成的一个`canvas`画布, 渲染器渲染界面生成的内容, 都将在这个画布上显示。所以, 我们将这个画布添加到了 dom 当中, 来显示渲染的内容

3. 初始化场景

   ```js
   const initScene = () => {
     scene = new THREE.Scene(); //实例化场景
   };
   ```

场景只是作为一个容器, 我们将需要显示的内容都放到场景对象当中。如果我们需要将一个模型放入到场景当中, 则可以使用`scene.add`方法

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

我们实例化了一个透视相机, 需要四个值分别是视野, 宽高比, 近裁面和远裁面。我们分别介绍一下这四个值:

- 视野:当前相机视野的宽度, 值越大, 渲染出来的内容也会更多。
- 宽高比:默认是按照画布的显示的宽高比例来设置, 如果比例设置的不对, 会发现渲染出来的画面有拉伸或者压缩的感觉。
- 近裁面和远裁面:这个是设置相机可以看到的场景内容的范围, 如果场景内的内容位置不在这两个值内的话, 将不会被显示到渲染的画面中。
  ![three.js](/public/images/threejs/1-1.png)

WebGL 坐标系统作为 3D 坐标, 在原来的 2D 坐标 xy 轴上面又多了一个 z 轴, 大家注意 z 轴的方向, 是坐标轴朝向我们的方向是正轴, 我们眼看去的方向是是 z 轴的负方向。
camera.position.set 函数是设置当前相机的位置, 函数传的三个值分别是 x 轴坐标, y 轴坐标和 z 轴坐标。我们只是将相机的放到了 z 正轴坐标轴距离坐标原点的 15 的位置。相机默认的朝向是朝向 0 点坐标的, 我们也可以设置相机的朝向。

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

我们实例化了一个`THREE.BoxGeometry`立方体的几何体对象, 实例化的三个传值分别代表着立方体的长度, 宽度和高度。我们全部设置的相同的值, 将渲染出一个标准的正立方体。

我们实例化了一个 THREE.MeshNormalMaterial 材质, 这种材质的特点是, 它会根据面的朝向不同, 显示不同的颜色。

通过`THREE.Mesh`方法实例化创建了一个网格对象, `THREE.Mesh`实例化需要传两个值, 分别是几何体对象和材质对象, 才可以实例化成功。

6. 运行动画

   ```js
   const animate = () => {
     requestAnimationFrame(animate); // 循环调用函数

     mesh.rotation.x += 0.01; // 每帧网格模型的沿x轴旋转0.01弧度
     mesh.rotation.y += 0.02; // 每帧网格模型的沿y轴旋转0.02弧度

     renderer.render(scene, camera); // 渲染界面
   };
   ```

渲染的`render`方法需要两个值, 第一个值是场景对象, 第二个值是相机对象。这意味着, 你可以有多个相机和多个场景, 可以通过渲染不同的场景和相机让画布上显示不同的画面。
每一个实例化的网格对象都有一个`rotation`的值, 通过设置这个值可以让立方体旋转起来。在每一帧里, 我们让立方体沿 x 轴方向旋转 0.01 弧度, 沿 y 轴旋转 0.02 弧度（1π 弧度等于 180 度角度）。

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

使用`Three.js`显示创建的内容, 我们必须需要的三大件是:`渲染器, 相机和场景`。相机获取到场景内显示的内容, 然后再通过渲染器渲染到画布上面。

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

### 调试插件

[dat.GUI](https://github.com/dataarts/dat.gui)

###### 功能

- 参数调整
- 自动匹配参数类型 (滑块, checkbox, 编辑 等)
- 可以自定义函数

###### 使用

1. 引入

   ```html
   <script src="https://cdn.bootcss.com/dat-gui/0.7.1/dat.gui.min.js"></script>
   ```

2. 建立对象, 设置需要修改的数据

   ```js
   const controls = {
     positionX: 0,
     positionY: 0,
     positionZ: 0,
   };
   ```

3. 实例化`dat.GUI`对象, 将需要修改的配置添加对象中, 并监听变化回调:

   ```js
   const updatePosition = () => {
     mesh.position.set(
       controls.positionX,
       controls.positionY,
       controls.positionZ
     );
   };
   gui = new dat.GUI();
   gui.add(controls, "positionX", -15, 15).onChange(updatePosition);
   gui.add(controls, "positionY", -15, 15).onChange(updatePosition);
   gui.add(controls, "positionZ", -15, 15).onChange(updatePosition);
   ```

## scene 场景

场景是我们每个`Three.js`项目里面放置内容的容器, 我们也可以拥有多个场景进行切换展示, 你可以在场景内放置你的**模型**, **灯光**和**照相机**。还可以通过调整场景的位置, 让场景内的所有内容都一起跟着调整位置。

###### THREE.Object3D

为了方便操作, Three.js 将每个能够直接添加到场景内的对象都继承至一个基类-THREE.Object3D, 以后我们将继承至这个基类的对象称为 3d 对象, 判断一个对象是否是继承至 THREE.Object3D, 我们可以这么判断:

    ```js
    obj instanceof THREE.Object3D; // 继承至返回 true 否则返回false
    ```

###### 向场景内添加一个`3d`对象

    ```js
    scene.add(mesh); // 将网格添加到场景
    ```

这个方法不光能够在场景内使用, 而且也可以将一个`3d`对象添加到另一个`3d`对象里面:

S

###### 获取一个 3d 对象

    ```js
    object3D.name = "firstObj";
    scene.add(object3D);

    scene.getObjectByName("firstObj"); // 返回第一个匹配的3d对象
    ```

###### 删除一个 3d 对象

如果我们想隐藏一个`3d`对象, 而不让它显示, 可以通过设置它的`visible`的值:

    ```js
    mesh.visible = false; // 设置为false, 模型将不会被渲染到场景内
    ```

如果一个模型不再被使用到, 需要彻底删除掉, 我们可以使用`remove`方法进行删除:

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
    mesh.position.set(3, 5, -6); // 直接将模型的位置设置在x轴为3, y轴为5, z轴为-6的位置
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

由于`scale`属性也是一个三维向量, 我们可以通过赋值的方式重新修改

    ```js
    mesh.scale = new THREE.Vector3(2, 2, 2); // 每个方向都放大一倍
    ```

###### 修改模型的转向

单独设置每个轴的旋转:

    ```js
    mesh.rotation.x = Math.PI; // 模型沿x旋转180度
    mesh.rotation.y = Math.PI * 2; // 模型沿y轴旋转360度, 跟没旋转一样的效果。。。
    mesh.rotation.z = -Math.PI / 2; // 模型沿z轴逆时针旋转90du
    ```

使用`set`方法重新赋值:

    ```js
    mesh.rotation.set(Math.PI, 0, -Math.PI / 2); //旋转效果和第一种显示的效果相同
    ```

模型的`rotation`属性其实是一个欧拉角对象（`THREE.Euler`）, 我们可以通过重新赋值一个欧拉角对象来实现旋转调整:

    ```js
    mesh.rotation = new THREE.Euler(Math.PI, 0, -Math.PI / 2, "YZX");
    ```

### Geometry 几何体

一个模型是由几何体`Geometry`和材质`material`组成。`Three.js`内置了很多的几何体种类, 如:立方体、三棱锥、球、八面体、十二面体、二十面体等等

###### Geometry 和 BufferGeometry

当前`Three.js`内置了这两种几何体类型 Geometry 和 BufferGeometry, **这两个几何体类型都是用于存储模型的顶点位置、面的索引、法向量、颜色、uv 纹理以及一些自定义的属性。**

区别:

- Geometry
  - 使用了 Three.js 提供的 THREE.Vector3 或者 THREE.Color 这样的对象来存储数据
  - 易与阅读和编辑
  - 性能弱一些
  - 适合动画场景
- BufferGeometry
  - 存储数据原始
  - 不易阅读和编辑
  - **性能好**
  - 适合存储一些放入场景内不需要再额外操作的模型

###### 互转

两种几何体类型可以互转

BufferGeometry`转换成`Geometry

    ```js
    // 实例化一个Geometry对象
    const geo = new THREE.Geometry();
    // 调用对象的fromBufferGeometry方法, 并将需要转换的bufferGeometry传入
    geo.fromBufferGeometry(bufferGeometry);
    // geo为转换转换成的Geometry
    ```

Geometry`转换成`BufferGeometry

    ```js
    // 实例化一个BufferGeometry对象
    const bufferGeo = new THREE.BufferGeometry();
    // 调用对象的fromGeometry方法, 并将需要转换的geometry传入
    bufferGeo.fromGeometry(geometry);
    // bufferGeo为geometry转换成的BufferGeometry
    ```

#### 立方体

在`WebGL`里面, 所有的模型都是通过三角形面组成

###### 创建

    ```js
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    ```

###### 构造函数

    ```js
    BoxGeometry(width : 浮点类型, height : 浮点类型, depth : 浮点类型, widthSegments : 整数类型, heightSegments : 整数类型, depthSegments : 整数类型)
    ```

- width — 沿 x 轴的宽度, 默认值为 1
- height — 沿 y 轴的高度, 默认值为 1
- depth — 沿 z 轴的深度, 默认值为 1
- widthSegments — 可选, 沿着边的宽度的分割面的数量。默认值为 1
- heightSegments — 可选, 沿着边的高度的分割面的数量。默认值为 1
- depthSegments — 可选, 沿着边的深度的分割面的数量。缺省值是 1

###### 官方演示

[BoxGeometry](https://threejs.org/docs/scenes/geometry-browser.html#BoxGeometry)

#### 圆形

**圆形是由多个三角形分段构成**, 这些三角形分段围绕一个中心点延伸并且延伸到给定半径以外

    ```js
    const geometry = new THREE.CircleGeometry(5, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const circle = new THREE.Mesh(geometry, material);
    scene.add(circle);
    ```

###### 构造函数

    ```js
    CircleGeometry(radius : 浮点类型, segments : 整数类型, thetaStart : 浮点类型, thetaLength : 浮点类型)
    ```

- radius — 圆的半径, 默认值为 1
- segments — 段数（三角形）,最小值为 3, 默认值为 8
- thetaStart — 第一段的起始角度, 默认值为 0
- thetaLength — 圆形扇形的中心角, 通常称为 theta。默认值是 2 \* Pi, 画出一个整圆

###### 官方演示

[CircleGeometry](https://threejs.org/docs/scenes/geometry-browser.html#CircleGeometry)

#### 圆锥

###### 创建

    ```js
    const geometry = new THREE.ConeGeometry(5, 20, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const cone = new THREE.Mesh(geometry, material);
    scene.add(cone);
    ```

###### 构造函数

    ```js
    ConeGeometry(radius : 浮点类型, height : 浮点类型, radialSegments : 整数类型, heightSegments : 整数类型, openEnded : 布尔类型, thetaStart : 浮点类型, thetaLength : 浮点类型)
    ```

- radius — 底部圆锥的半径, 默认值为 1。
- height — 圆锥体的高度, 默认值为 1。
- radialSegments — 圆锥周围的分段面数, 默认值为 8。
- heightSegments — 沿圆锥体高度的面的行数, 默认值为 1。
- openEnded — 圆锥体底部是是隐藏还是显示, 默认值为 false, 显示。
- thetaStart — 第一段的起始角度, 默认值是 0（Three.js 的 0 度位置）。
- thetaLength — 圆形扇形的中心角, 通常称为 theta。默认值是 2 \* Pi, 画出一个整圆

###### 官方演示

[ConeGeometry](https://threejs.org/docs/scenes/geometry-browser.html#ConeGeometry)

#### 圆柱

###### 创建

    ```js
    const geometry = new THREE.CylinderGeometry(5, 5, 20, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const cylinder = new THREE.Mesh(geometry, material);
    scene.add(cylinder);
    ```

###### 构造函数

    ```js
    CylinderGeometry(radiusTop : 浮点类型, radiusBottom : 浮点类型, height : 浮点类型, radialSegments : 整数类型, heightSegments : 整数类型, openEnded : 布尔类型, thetaStart : 浮点类型, thetaLength : 浮点类型)
    ```

- radiusTop — 顶部圆柱体的半径。默认值为 1.
- radiusBottom — 底部圆柱体的半径。默认值为 1.
- height — 圆柱体的高度。默认值为 1.
- radialSegments — 圆柱周围的分段面数。默认值为 8
- heightSegments — 沿圆柱体高度的面的行数。默认值为 1.
- openEnded — 圆柱体的两端是否显示, 默认值是 false, 显示。
- thetaStart — 第一段的起始角度, 默认值是 0（Three.js 的 0 度位置）。
- thetaLength — 圆形扇形的中心角, 通常称为 theta。默认值是 2 \* Pi, 画出一个整圆

###### 官方演示

[CylinderGeometry](https://threejs.org/docs/scenes/geometry-browser.html#CylinderGeometry)

#### 球

###### 创建

    ```js
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    ```

###### 构造函数

```js
SphereGeometry(radius : 浮点类型, widthSegments : 整数类型, heightSegments : 整数类型, phiStart : 浮点类型, phiLength : 浮点类型, thetaStart : 浮点类型, thetaLength : 浮点类型)
```

- radius — 球体半径。默认值是 1
- widthSegments — 水平线段的数量。最小值是 3, 默认值是 8
- heightSegments — 垂直段的数量。最小值是 2, 默认值是 6
- phiStart — 指定水平渲染起始角度。默认值为 0
- phiLength — 指定水平渲染角度大小。默认值是 Math.PI \* 2
- thetaStart — 指定垂直渲染起始角度。默认值为 0
- thetaLength — 指定垂直渲染角度大小。默认是 Math.PI

###### 官方演示

[SphereGeometry](https://threejs.org/docs/scenes/geometry-browser.html#SphereGeometry)

#### 平面

###### 创建

    ```js
    const geometry = new THREE.PlaneGeometry(5, 20, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    ```

###### 构造函数

    ```js
    PlaneGeometry(width : 浮点类型, height : 浮点类型, widthSegments : 整数类型, heightSegments : 整数类型)
    ```

- width — 沿 X 轴的宽度。默认值为 1
- height — 沿着 Y 轴的高度。默认值为 1
- widthSegments — 宽度的分段数,可选。默认值为 1
- heightSegments — 高度的分段数, 可选。默认值为 1

###### 官方演示

[PlaneGeometry](https://threejs.org/docs/scenes/geometry-browser.html#PlaneGeometry)

#### 圆环

###### 创建

    ```js
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);
    ```

###### 构造函数

    ```js
    TorusGeometry(radius : 浮点类型, tube : 浮点类型, radialSegments : 整数类型, tubularSegments : 整数类型, arc : 浮点类型)
    ```

- radius - 圆环的半径, 从圆环的中心到管的中心。默认值为 1
- tube — 管的半径。默认值是 0.4
- radialSegments — 横向分段数, 默认值是 8
- tubularSegments — 纵向分段数, 默认值是 6
- arc — 绘制的弧度。默认值是 Math.PI \* 2, 绘制整个圆环

###### 官方演示

[TorusGeometry](https://threejs.org/docs/scenes/geometry-browser.html#TorusGeometry)

### 材质

**简单的说就是物体看起来是什么质地**。材质可以看成是材料和质感的结合。在渲染程式中,它是表面各可视属性的结合,这些可视属性是指表面的色彩、纹理、光滑度、透明度、反射率、折射率、发光度等。Three.js 给我们封装好了大部分的材质效果。

###### MeshBasicMaterial

这种材质是一种简单的材质,不会受到光的影响,直接看到的效果就是整个物体的颜色都是一样,没有立体的感觉。

1. 初始化 color

   ```js
   const material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
   const geometry = new THREE.BoxGeometry(1, 1, 1);

   const mesh = new THREE.Mesh(geometry, material);
   scene.add(mesh);
   ```

2.set 修改 color

    ```js
    const material = new THREE.MeshBasicMaterial({ color: 0x00ffff }); // 设置初始的颜色为浅蓝色
    material.color.set(0xff00ff); // 将颜色修改为紫色
    ```

3.我们也可以直接赋值一个新的`THREE.Color`对象

    ```js
    const material = new THREE.MeshBasicMaterial({ color: 0x00ffff }); // 设置初始的颜色为浅蓝色
    material.color = new THREE.Color(0xff00ff); // 将颜色修改为紫色
    ```

###### MeshNormalMaterial

这种材质会根据面的方向不同自动改变颜色,也是我们之前一直在用的材质。

此材质不受灯光影响。

    ```js
    geometry = new THREE.BoxGeometry(2, 2, 2); // 创建几何体
    material = new THREE.MeshNormalMaterial(); // 创建材质

    mesh = new THREE.Mesh(geometry, material); // 创建网格
    scene.add(mesh); // 将网格添加到场景
    ```

###### LineBasicMaterial 线条材质

要绘制线段,我们需要确定两个点,就是起点和终点,案例中我们使用了四个顶点创建了三条线。然后`Geometry`对象使用这组顶点配置几何体,实例化线的材质,最后使用`THREE.Line`生成线。

    ```js
    // 添加直线
    const pointsArr = [
      new THREE.Vector3(-10, 0, -5),
      new THREE.Vector3(-5, 15, 5),
      new THREE.Vector3(20, 15, -5),
      new THREE.Vector3(10, 0, 5),
    ];

    const lineGeometry = new THREE.Geometry(); // 实例化几何体
    lineGeometry.setFromPoints(pointsArr); // 使用当前点的属性配置几何体

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 }); // 材质

    line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);
    ```

**添加光**

由于`MeshBasicMaterial`不会受光的影响,即使有光也不会影响它的效果,前面我们也没有添加光。但是后面介绍的材质会受到光源的影响,在介绍之前,我们需要添加一个光源,来影响材质的显示效果。

    ```js
    // 创建灯光
    const initLight = () => {
      const light = new THREE.DirectionalLight(0xffffff); // 添加了一个白色的平行光
      light.position.set(20, 50, 50); // 设置光的方向
      scene.add(light); // 添加到场景

      // 添加一个全局环境光
      scene.add(new THREE.AmbientLight(0x222222));
    };
    ```

###### MeshLambertMaterial 兰伯特材质

这种材质会对光有反应,但是不会出现高光,可以模拟一些粗糙的材质的物体,比如木头或者石头。实现案例:

    ```js
    geometry = new THREE.BoxGeometry(2, 2, 2); // 创建几何体
    material = new THREE.MeshLambertMaterial({ color: 0x00ffff }); //创建材质

    mesh = new THREE.Mesh(geometry, material); // 创建网格
    scene.add(mesh); // 将网格添加到场景
    ```

###### MeshPhongMaterial 高光材质

这种材质具有高光效果,可以模拟一些光滑的物体的材质效果,比如油漆面,瓷瓦等光滑物体。实现案例:

    ```js
    geometry = new THREE.BoxGeometry(2, 2, 2); // 创建几何体
    material = new THREE.MeshPhongMaterial({ color: 0x00ffff }); // 创建材质

    mesh = new THREE.Mesh(geometry, material); // 创建网格
    scene.add(mesh); // 将网格添加到场景
    ```

### 光照

##### 创建光照

    ```js
    const light = new THREE.DirectionalLight(0xffffff); // 添加了一个白色的平行光
    ```

在场景中添加了一个全局光照:

    ```js
    scene.add(new THREE.AmbientLight(0x222222));
    ```

不同种类的光照,通过实例化,可以接受两个传值,分别是光照颜色和光照强度。

    ```js
    const light = new THREE.DirectionalLight(0xffffff, 1.0); // 添加了一个白色的平行光
    ```

第二个值光照强度默认值是`1.0`,我们可以根据项目需求调整光照强度。

我们也可以动态修改光的颜色和光照强度:

    ```js
    const light = new THREE.DirectionalLight(0xffffff); // 添加了一个白色的平行光

    light.color.set(0x000000); // 将光照的颜色修改为黑色
    light.intensity = 2.0; // 光照的强度改为默认的两倍
    ```

##### AmbientLight 环境全局光

环境光会照亮场景中所有的物体,在计算物体的颜色的时候,都会叠加上环境光的颜色。

    ```js
    const light = new THREE.AmbientLight(0x404040); // 创建一个灰色的环境光
    scene.add(light);
    ```

由于环境光作用于所有的物体,所有的材质,所以环境光是没有方向的,也无法产生阴影效果。

##### DirectionalLight 平行光

平行光是以特定的方向发射的光。它产生的光都是平行的状态,主要用于模拟太阳光线。
创建平行光也接受两个值,颜色和光线强度:

    ```js
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // 创建一个颜色为纯白色并且强度为默认的一半的平行光
    scene.add(directionalLight);
    ```

平行光除了可以动态修改光的颜色和强度外,还可以通过设置它的位置和目标位置来确定平行光的照射方向（两点确定一条直线的概念）:

    ```js
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.color.set(0x000000); // 将光照颜色修改为黑色
    directionalLight.intensity = 1.0; // 将光照强度修改为默认

    directionalLight.position.set(10, 10, 10); // 设置平行光的位置
    directionalLight.target.set(0, 0, 0); // 设置当前的平行光的朝向位置
    scene.add(directionalLight);
    ```

##### 添加阴影效果

平行光是可以产生投影效果的,设置一下平行光产生阴影效果:
首先,需要设置渲染器可以渲染阴影效果:

    ```js
    renderer.shadowMap.enabled = true; // 渲染器
    ```

实例化灯光时,需要设置灯光渲染阴影:

    ```js
    directionalLight = new THREE.DirectionalLight("#ffffff");
    directionalLight.castShadow = true; // 设置平行光投射投影

    scene.add(directionalLight);
    ```

最后,我们还需要设置模型哪些需要可以产生阴影和哪些模型可以接收阴影:

    ```js
    sphere.castShadow = true; // 开启阴影
    scene.add(sphere);

    cube.castShadow = true; //开启阴影
    scene.add(cube);

    plane.receiveShadow = true; //可以接收阴影
    scene.add(plane);
    ```

上面我们设置了球体和立方体可以产生阴影,底部的平面可以接收球和立方体产生的阴影,便可以产生下面的图片效果:

![threejs](/public/images/threejs/1-3.png)

由于设置阴影是一项十分耗性能的工作,所以我们需要尽量设置合适的阴影渲染范围和密度。平行光阴影的实现原理是通过正交相机 OrthographicCamera 来通过检测当前模型,也就是 directionalLight.shadow.camera 就是一个正交相机,只要在这个正交相机可视范围内的可以投影的物体才可以被设置投影。并且我们可以通过设置一些相机的属性属性来实现产生阴影的范围:

    ```js
    directionalLight.shadow.camera.near = 20; // 产生阴影的最近距离
    directionalLight.shadow.camera.far = 100; // 产生阴影的最远距离
    directionalLight.shadow.camera.left = -50; // 产生阴影距离位置的最左边位置
    directionalLight.shadow.camera.right = 50; // 最右边
    directionalLight.shadow.camera.top = 50; // 最上边
    directionalLight.shadow.camera.bottom = -50; // 最下面

    // 这两个值决定生成阴影密度 默认512
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.mapSize.width = 1024;
    ```

##### PointLight 点光源

点光源就是从一个点的位置向四面八方发射出去光,一个简单的例子就是一个裸露的灯泡。
实现一个最普通的点光源很简单:

    ```js
    const pointLight = new THREE.PointLight(0xff0000); //创建一个白色的点光源
    pointLight.position.set(50, 50, 50);
    scene.add(pointLight);
    ```

点光源支持四个参数配置,除了前两个颜色和光的强度外,另外两个是照射范围和衰减度:

    ```js
    const pointLight = new THREE.PointLight(0xff0000, 1, 100, 2); //创建一个白色的点光源
    pointLight.position.set(50, 50, 50);
    scene.add(pointLight);
    ```

第三个参数照射范围,如果物体距离点光源超过这个距离,将不会受到点光源的影响,默认是所有的物体会受到点光源的影响。如果设置了参数,将按照第四个参数,衰减度的值来慢慢减少影响,默认是 1,如果需要模拟现实中的效果,这个参数可以设置为 2。

这些属性也可以通过动态修改:

    ```js
    pointLight.color.set(0x000000); //修改光照颜色
    pointLight.intensity = 0.5; //修改光的强度
    pointLight.distance = 50; //修改光的照射范围
    pointLight.decay = 1.0; //修改衰减度
    ```

**实现点光源阴影效果和实现平行光的阴影效果的设置基本一样**,而且由于点光源是散射,阴影效果会终止在点光源的影响范围内。我们可以仿照平行光的阴影实现过程进行实现,只是将平行光修改为了点光源:

    ```js
    pointLight = new THREE.PointLight("#ffffff");
    pointLight.position.set(40, 60, 10);

    // 告诉平行光需要开启阴影投射
    pointLight.castShadow = true;

    scene.add(pointLight);
    ```

##### SpotLight 聚光灯光源

聚光灯光源的效果也是从一个点发出光线,然后沿着一个一个圆锥体进行照射,可以模仿手电筒,带有灯罩的灯泡等效果。
实现聚光灯的案例最简单是直接设置一个颜色即可,默认照射原点位置的光照:

    ```js
    const spotLight = new THREE.SpotLight(0xffffff); //创建一个白色光照
    spotLight.position.set(100, 1000, 100);
    scene.add(spotLight);
    ```

聚光灯光源和点光源一样,也可以设置光的强度和照射范围

    ```js
    spotLight = new THREE.SpotLight(0xffffff, 2.0, 100); //设置光照强度是默认的两倍,照射范围为100
    ```

聚光灯由于是沿圆锥体照射,我们可以设置聚光灯的这个椎体的角度来影响:

    ```js
    spotLight = new THREE.SpotLight(0xffffff, 2.0, 100, Math.PI / 4); // 设置光的照射圆锥范围为90度
    ```

因为聚光灯只能照射一定的区域的物体,所以会出现光亮和无法照射地方的交接,我们可以通过配置第五个值来设置交接渐变的过渡效果:

    ```js
    spotLight = new THREE.SpotLight(0xffffff, 2.0, 100, Math.PI / 4, 0.5); // 设置交界过渡幅度为0.5,默认是0,没有过渡,最大值为1
    ```

我们也可以通过设置第六个值来设置聚光灯的衰减度,和点光源一样:

    ```js
    spotLight = new THREE.SpotLight(0xffffff, 2.0, 100, Math.PI / 4, 0.5, 2.0); // 设置衰减度为物理效果的值2.0
    ```

同样道理,我们也可以动态修改相关配置项:

    ```js
    spotLight.color.set(0x000000); // 修改光照颜色
    spotLight.intensity = 0.5; // 修改光的强度
    spotLight.distance = 50; // 修改光的照射范围
    spotLight.angle = Math.PI / 3; // 修改光的照射弧度
    spotLight.penumbra = 1.0; // 修改交界过渡
    spotLight.decay = 1.0; // 修改衰减度
    ```

我们也可以修改聚光灯的`target`来修改光的照射方向:

    ```js
    spotLight.target.set(0, 1, 1); // 修改照射方向
    ```

##### 实现聚光灯阴影

实现聚光灯阴影和实现平行光和点光源的设置一样,聚光灯的设置也是将可以生成阴影设置打开,并将聚光灯添加到场景中即可:

    ```js
    spotLight = new THREE.SpotLight("#ffffff");
    spotLight.position.set(40, 60, 10);
    // 告诉平行光需要开启阴影投射
    spotLight.castShadow = true;
    scene.add(spotLight);
    ```

##### HemisphereLight 室外光源

室外光源主要是为了模拟在户外的环境光效果,比如在蓝天绿地的户外,模型下面会显示出来绿色的环境光,而上方则会受到蓝天的影响而颜色偏蓝。
实例化室外光源支持三个参数:天空的颜色,地面的颜色,和光的强度。

    ```js
    // 添加户外光源
    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(hemisphereLight);
    ```

同样的道理,我们也可以通过配置属性实时修改:

    ```js
    hemisphereLight.color.set(0xffffff); // 将天空颜色修改为白色
    hemisphereLight.groundColor.set(0x000000); // 将地面颜色修改为黑色
    ```

我们也可以修改`position`配置项来修改渲染的方向:

    ```js
    hemisphereLight.position.set(0, -1, 0); // 默认从上往下渲染,也就是天空在上方,当前修改为了,天空颜色从下往上渲染
    ```

### Camera 相机

相机是`Three.js`抽象出来的一个对象,使用此对象,我们可以定义显示的内容,并且可以通过移动相机位置来显示不同的内容。 下面讲解一下`Three.js`中的相机的通用属性和常用的相机对象。

我们常用的相机正交相机(`OrthographicCamera`)和透视相机(`PerspectiveCamera`)两种相机,用于来捕获场景内显示的物体模型。它们有一些通用的属性和方法:

由于相机都是继承至 THREE.Object3D 对象的,所以像设置位置的 position 属性、rotation 旋转和 scale 缩放属性,可以直接对相机对象设置。我们甚至还可以使用 add()方法,给相机对象添加子类,移动相机它的子类也会跟随着一块移动,我们可以使用这个特性制作一些比如 HUD 类型的显示界面。

#### target 焦点属性和 lookAt()方法

这两个方法的效果一定,都是调整相机的朝向,可以设置一个`THREE.Vector3`(三维向量)点的位置:

    ```js
    camera.target = new THREE.Vector3(0, 0, 0);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    ```

上面两个都是朝向了原点,我们也可以将相机的朝向改为模型网格的`position`,如果物体的位置发生了变化,相机的焦点方向也会跟随变动:

    ```js
    const mesh = new THREE.Mesh(geometry, material);
    camera.target = mesh.position; // 小技巧
    //或者
    camera.lookAt(mesh.position);
    ```

#### OrthographicCamera 正交相机

使用正交相机`OrthographicCamera`渲染出来的场景,所有的物体和模型都按照它固有的尺寸和精度显示,一般使用在工业要求精度或者 2D 平面中,因为它能完整的显示物体应有的尺寸。

![threejs](/public/images/threejs/1-4.png)

上面的图片可以清晰的显示出正交相机显示的范围,它显示的内容是一个立方体结构,通过图片我们发现,只要确定`top`,`left`,`right`,`bottom`,`near`和`far`六个值,我们就能确定当前相机捕获场景的区域,在这个区域外面的内容不会被渲染,所以,我们创建相机的方法就是:

    ```js
    new THREE.OrthographicCamera(left, right, top, bottom, near, far);
    ```

下面我们创建了一个显示场景中相机位置前方长宽高都为 4 的盒子内的物体的正交相机:

    ```js
    const orthographicCamera = new THREE.OrthographicCamera(-2, 2, 2, -2, 0, 4);
    scene.add(orthographicCamera); // 一般不需要将相机放置到场景当中,如果需要添加子元素等一些特殊操作,还是需要add到场景内
    ```

正常情况相机显示的内容需要和窗口显示的内容同样的比例才能够显示没有被拉伸变形的效果:

    ```js
    const frustumSize = 1000; // 设置显示相机前方1000高的内容
    const aspect = window.innerWidth / window.innerHeight; // 计算场景的宽高比
    const orthographicCamera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      1,
      2000
    ); // 根据比例计算出left,top,right,bottom的值
    ```

我们也可以动态的修改正交相机的一些属性,注意修改完以后需要调用相机`updateProjectionMatrix()`方法来更新相机显存里面的内容:

    ```js
    const frustumSize = 1000; // 设置显示相机前方1000高的内容
    const aspect = window.innerWidth / window.innerHeight; // 计算场景的宽高比
    const orthographicCamera = new THREE.OrthographicCamera(); // 实例化一个空的正交相机
    orthographicCamera.left = (frustumSize * aspect) / -2; // 设置left的值
    orthographicCamera.right = (frustumSize * aspect) / 2; // 设置right的值
    orthographicCamera.top = frustumSize / 2; // 设置top的值
    orthographicCamera.bottom = frustumSize / -2; // 设置bottom的值
    orthographicCamera.near = 1; // 设置near的值
    orthographicCamera.far = 2000; // 设置far的值

    // 注意,最后一定要调用updateProjectionMatrix()方法更新
    orthographicCamera.updateProjectionMatrix();
    ```

由于浏览器的窗口是可以随意修改,我们有时候需要监听浏览器窗口的变化,然后获取到最新的宽高比,再重新设置相关属性:

    ```js
    const aspect = window.innerWidth / window.innerHeight; //重新获取场景的宽高比

    //重新设置left right top bottom 四个值
    orthographicCamera.left = (frustumSize * aspect) / -2; //设置left的值
    orthographicCamera.right = (frustumSize * aspect) / 2; //设置right的值
    orthographicCamera.top = frustumSize / 2; //设置top的值
    orthographicCamera.bottom = frustumSize / -2; //设置bottom的值

    //最后,记得一定要更新数据
    orthographicCamera.updateProjectionMatrix();

    //显示区域尺寸变了,我们也需要修改渲染器的比例
    renderer.setSize(window.innerWidth, window.innerHeight);
    ```

#### PerspectiveCamera 透视相机

透视相机是最常用的也是模拟人眼的视角的一种相机,它所渲染生成的页面是一种近大远小的效果。

![threejs](/public/images/threejs/1-5.png)

上面的图片就是一个透视相机的生成原理,我们先看看渲染的范围是如何生成的:

- 首先,我们需要确定一个 fov 值,这个值是用来确定相机前方的垂直视角,角度越大,我们能够查看的内容就越多。
- 然后,我们又确定了一个渲染的宽高比,这个宽高比最好设置成页面显示区域的宽高比,这样我们查看生成画面才不会出现拉伸变形的效果,这时,我们可以确定了前面生成内容的范围是一个四棱锥的区域。
- 最后,我们需要确定的就是相机渲染范围的最小值 near 和最大值 far,注意,这两个值都是距离相机的距离,确定完数值后,相机会显示的范围就是一个近小远大的四棱柱的范围,我们能够看到的内容都是在这个范围内的。
- 通过上面的原理,我们需要通过设置 fov 垂直角度,aspect 视角宽高比例和 near 最近渲染距离 far 最远渲染距离,就能够确定当前透视相机的渲染范围。

下面,是一个透视相机的创建:

    ```js
    const perspectiveCamera = new THREE.PerspectiveCamera(
      45,
      width / height,
      1,
      1000
    );
    scene.add(perspectiveCamera);
    ```

我们设置了前方的视角为 45 度,宽度和高度设置成显示窗口的宽度除以高度的比例即可,显示距离为 1 到 1000 距离以内的物体。

透视相机的属性创建完成后我们也可以根据个人需求随意修改,但是注意,相机的属性修改完成后,以后要调用`updateProjectionMatrix()`方法来更新:

    ```js
    const perspectiveCamera = new THREE.PerspectiveCamera(
      45,
      width / height,
      1,
      1000
    );
    scene.add(perspectiveCamera);

    // 下面为修改当前相机属性
    perspectiveCamera.fov = 75; // 修改相机的fov
    perspectiveCamera.aspect = window.innerWidth / window.innerHeight; // 修改相机的宽高比
    perspectiveCamera.near = 100; // 修改near
    perspectiveCamera.far = 500; // 修改far

    // 最后更新
    perspectiveCamera.updateProjectionMatrix();
    ```

如果当前场景浏览器的显示窗口变动了,比如修改了浏览器的宽高后,我们需要设置场景自动更新,下面是一个常用的案例:

    ```js
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight; // 重新设置宽高比
      camera.updateProjectionMatrix(); // 更新相机
      renderer.setSize(window.innerWidth, window.innerHeight); // 更新渲染页面大小
    };
    window.onresize = onWindowResize;
    ```

#### 相机插件

[相机插件](https://github.com/mrdoob/three.js/blob/master/examples/js/controls/OrbitControls.js)

###### 使用方法

1. 选择摄像机,并实例化

   ```js
   const initControl = () => {
     control = new THREE.OrbitControls(camera, renderer.domElement);
   };
   ```

2. 执行 init 方法

   ```js
   const init = () => {
     // 3d三要素
     initRenderer(); // 渲染
     initScene(); // 场景
     initCamera(); // 相机

     initMesh(); // 物体

     initControl();
     animate(); // 旋转,动画
   };
   ```

3. 在每一帧执行 update

   ```js
   const animate = () => {
     requestAnimationFrame(animate); // 循环调用函数

     mesh.rotation.x += 0.01; // 每帧网格模型的沿x轴旋转0.01弧度  半圈是180度
     mesh.rotation.y += 0.02; // 每帧网格模型的沿y轴旋转0.02弧度
     stats.update();
     control.update();
     renderer.render(scene, camera); // 渲染界面
   };
   ```

### Points 粒子

`Sprite`精灵和`Points`粒子,这两种对象共同点就是我们通过相机查看它们时,始终看到的是它们的正面,它们总朝向相机。通过它们的这种特性,我们可以实现广告牌的效果,或实现更多的比如雨雪、烟雾等更加绚丽的特效。

#### Sprite 精灵

精灵由于一直正对着相机的特性,一般使用在模型的提示信息当中。通过 THREE.Sprite 创建生成,由于 THREE.Sprite 和 THREE.Mesh 都属于 THREE.Object3D 的子类,所以,我们操作模型网格的相关属性和方法大部分对于精灵都适用。和精灵一起使用的还有一个 THREE.SpriteMaterial 对象,它是专门配合精灵的材质。注意:**精灵没有阴影效果。**

1. 普通精灵

   ```js
   const spriteMaterialNormal = new THREE.SpriteMaterial({ color: 0x00ffff });
   const spriteNormal = new THREE.Sprite(spriteMaterialNormal);
   spriteNormal.position.set(-30, 10, 0); // 设置位置
   spriteNormal.scale.set(5, 5, 1); // 设置scale进行大小设置
   scene.add(spriteNormal);
   ```

2. 图片导入的方式

   ```js
   const spriteMap = new THREE.TextureLoader().load(
     drawCanvas({ text: "球", width: 64, height: 64 }).toDataURL()
   ); // 转为base64
   const spriteMaterial = new THREE.SpriteMaterial({
     map: spriteMap,
     color: 0xffffff,
   });
   const sprite = new THREE.Sprite(spriteMaterial);
   sprite.position.set(0, 10, 0); // 设置位置
   sprite.scale.set(5, 5, 1); // 设置scale进行大小设置
   scene.add(sprite);
   ```

3. canvas 导入的方式

   ```js
   const canvas = drawCanvas({ text: "立方体", width: 256, height: 64 });
   const spriteMapCube = new THREE.Texture(canvas);
   spriteMapCube.wrapS = THREE.RepeatWrapping;
   spriteMapCube.wrapT = THREE.RepeatWrapping;
   spriteMapCube.needsUpdate = true;

   const spriteCube = new THREE.Sprite(
     new THREE.SpriteMaterial({ map: spriteMapCube, color: 0xffffff })
   );
   spriteCube.position.set(30, 10, -5); // 设置位置
   spriteCube.scale.set(20, 5, 1); // 设置scale进行大小设置
   spriteCube.center.set(0.5, 0); // 设置位置点处于精灵的最下方中间位置
   scene.add(spriteCube);
   ```

#### points 粒子

**粒子和精灵的效果是一样的,它们之间的区别就是如果当前场景内的精灵过多的话,就会出现性能问题**。粒子的作用就是为解决很多精灵而出现的,我们可以使用粒子去模型数量很多的效果,比如下雨,下雪等,数量很多的时候就适合使用粒子来创建,相应的,提高性能的损失就是失去了对单个精灵的操作,所有的粒子的效果都是一样。总的来说,粒子就是提高性能减少的一些自由度,而精灵就是为了自由度而损失了一些性能。

**粒子 THREE.Points 和精灵 THREE.Sprite 还有网格 THREE.Mesh 都属于 THREE.Object3D 的一个扩展**,但是粒子有一些特殊的情况就是 THREE.Points 是它们粒子个体的父元素,它的位置设置也是基于 THREE.Points 位置而定位,而修改 THREE.Points 的 scale 属性只会修改掉粒子个体的位置。下面先查看一下一个粒子的创建,创建一个粒子,需要一个含有顶点的几何体,和粒子纹理 THREE.PointsMaterial 创建:

    ```js
    // 球体
    const sphereGeometry = new THREE.SphereGeometry(5, 24, 16); // 球
    const sphereMaterial = new THREE.PointsMaterial({ color: 0xff00ff });
    const sphere = new THREE.Points(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    ```

> 粒子会吸附在几何体的表面

上面是一个通过球体几何体创建的一个最简单的粒子特效。
几何体使用任何几何体都可以,甚至自己生成的几何体都可以,比如创建星空的案例:

    ```js
    const starsGeometry = new THREE.Geometry();
    // 生成一万个点的位置
    for (let i = 0; i < 10000; i++) {
      const star = new THREE.Vector3();
      // THREE.Math.randFloatSpread 在区间内随机浮动* - 范围 / 2 *到* 范围 / 2 *内随机取值。
      star.x = THREE.Math.randFloatSpread(2000);
      star.y = THREE.Math.randFloatSpread(2000);
      star.z = THREE.Math.randFloatSpread(2000);
      starsGeometry.vertices.push(star);
    }
    const starsMaterial = new THREE.PointsMaterial({ color: 0x888888 });
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);
    ```

###### THREE.PointsMaterial 粒子的纹理

如果我们需要设置粒子的样式,还是需要通过设置`THREE.PointsMaterial`属性实现:

    ```js
    const pointsMaterial = new THREE.PointsMaterial({ color: 0xff00ff }); //设置了粒子纹理的颜色
    ```

我们还可以通过`PointsMaterial`的`size`属性设置粒子的大小:

    ```js
    const pointsMaterial = new THREE.PointsMaterial({ color: 0xff00ff, size: 4 }); // 粒子的尺寸改为原来的四倍
    // 或者直接设置属性
    pointsMaterial.size = 4;
    ```

我们也可以给粒子设置纹理:

    ```js
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xff00ff,
      map: texture,
    }); // 添加纹理
    ```

默认粒子是不受光照的影响的,我们可以设置`lights`属性为`true`,让粒子受光照影响:

    ```js
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xff00ff,
      lights: true,
    });
    // 或者
    pointsMaterial.lights = true; // 开启受光照影响
    ```

    我们也可以设置粒子不受到距离的影响产生近大远小的效果:

    ```js
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xff00ff,
      sizeAttenuation: false,
    });
    // 或者
    pointsMaterial.sizeAttenuation = false; // 关闭粒子的显示效果受距离影响
    ```

## 导入模型

官方推荐我们使用的`3D`模型的格式为`glTF`,由于`glTF`专注于传输,因此它的传输和解析的速度都很快。`glTF`模型功能包括:网格,材质,纹理,蒙皮,骨骼,变形动画,骨骼动画,灯光以及相机。

模型制作工具:

- 3dmax
- SketchUp

#### json 格式

一般用于官方的 editor 导出

这里的 JSON 格式指的是 Three.js 可以将其转换为场景的 3D 对象的 JSON 格式模型。这种格式内部一般必有的四项为:

- metadata 当前模型的相关信息以及生成的工具信息
- geometries 存储当前模型所使用的几何体的数组
- materials 存储当前模型所使用的材质的数组
- object 当前模型的结构以及标示所应用到的材质和几何体标示
  所有的模型网格,几何体和材质都有一个固定的 uuid 标识符,JSON 格式中都是通过 uuid 作为引用。

所有的模型网格,几何体和材质都有一个固定的`uuid`标识符,`JSON`格式中都是通过`uuid`作为引用。

#### 3d 对象转成 JSON

所有的`THREE.Object3D`对象都可以转成`JSON`字符串保存成为文件,我们不能直接将对象转成`JSON`是因为`JSON`是无法保存函数的,所以,`Three.js`给我们提供了一个`toJSON()`的方法来让我们转换为可存储的`JSON`格式。

    ```js
    const obj = scene.toJSON(); // 将整个场景的内容转换成为json对象
    const obj = group.toJSON(); // 将一个模型组转成json对象
    const obj = mesh.toJSON(); // 将一个模型网格转成json对象
    const JSONStr = JSON.stringify(obj); // 将json对象转换成json字符串
    ```

#### 使用 ObjectLoader 加载 JSON 模型

既然我们能够导入,肯定就可以导入。这里我们将使用到`Three.js`内置的对象`THREE.ObjectLoader`来加载模型:
直接加载`Three.js`生成的`JSON`对象:

    ```js
    const obj = scene.toJSON(); // 将整个场景的内容转换成为json对象

    let loader = new THREE.ObjectLoader(); // 实例化ObjectLoader对象
    let scene = loader.parse(obj); // 将json对象再转换成3D对象
    ```

加载外部的`JSON`文件:

    ```js
    let loader = new THREE.ObjectLoader(); // 实例化ObjectLoader对象

    // 加载模型,并在回调中将生成的模型对象添加到场景中
    loader.load("../js/models/json/file.json", (group) => {
      scene.add(group);
    });
    ```

#### glTF 格式文件导入

`glTF`格式的 3D 格式文件是官方推荐的使用的格式,这种格式的文件我们可以在`sketchfab`官网下载,这是一个国外比较知名的模型网站。

[loader](https://github.com/mrdoob/three.js/blob/master/examples/js/loaders/GLTFLoader.js)

[Download](https://sketchfab.com/3d-models?date=week&features=downloadable&sort_by=-likeCount)

1. 首先,将`GLTFLoader`加载器插件引入到页面,插件在官方包的地址`/examples/js/loaders/`,一些文件的导入插件都在这一个文件夹内,大家有兴趣可以研究一下:

   ```js
   <script src="../js/loaders/GLTFLoader.js"></script>
   ```

2. 然后创建一个加载器:

   ```js
   const loader = new THREE.GLTFLoader();
   ```

3. 使用加载器去加载模型,并调节一下模型大小在场景内展示:

   ```js
   loader.load("../js/models/gltf/scene.gltf", (gltf) => {
     gltf.scene.scale.set(0.1, 0.1, 0.1);
     scene.add(gltf.scene);
   });
   ```

## 动画

动画一般可以定义两种:一种是变形动画,另一种是骨骼动画。

#### 变形动画

变形动画的实现就是通过修改当前模型的顶点位置来实现动画。就比如,一个动画需要变动十次才可以实现,那么我们就需要为当前模型的每一个顶点定义每一次所在的位置,`Three.js`通过每一次修改实现最后的一个动画的整个流程。

1. 定义模型

   ```js
   const cubeGeometry = new THREE.BoxGeometry(4, 4, 4); // 正方体
   const cubeMaterial = new THREE.MeshLambertMaterial({
     morphTargets: true,
     color: 0x00ffff,
   }); // 材质

   // 创建两个影响立方体的变形目标, 动画完成的终极状态
   const cubeTarget1 = new THREE.BoxGeometry(2, 10, 2); // 瘦高
   const cubeTarget2 = new THREE.BoxGeometry(8, 2, 8); // 矮胖

   // 将两个geometry的顶点放入到立方体的morphTargets里面
   cubeGeometry.morphTargets[0] = {
     name: "target1",
     vertices: cubeTarget1.vertices,
   };
   // 设定需要变化的终极目标
   cubeGeometry.morphTargets[1] = {
     name: "target2",
     vertices: cubeTarget2.vertices,
   };
   cubeGeometry.computeMorphNormals(); // 告诉threejs我要进行变形动画

   cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
   cube.position.set(0, 10, 0);

   // 将立方体添加到顶点当中
   scene.add(cube);
   ```

2. 调试器绑定 update

   ```js
   //声明一个保存需求修改的相关数据的对象
   gui = {
     influence1: 0.01,
     influence2: 0.01,
     update: () => {
       cube.morphTargetInfluences[0] = gui.influence1; // 原生属性, 代表权重,值越大越接近变化目标
       cube.morphTargetInfluences[1] = gui.influence2;
     },
   };

   const datGui = new dat.GUI();
   // 将设置属性添加到gui当中,gui.add(对象,属性,最小值,最大值）
   datGui.add(gui, "influence1", 0, 1).onChange(gui.update);
   datGui.add(gui, "influence2", 0, 1).onChange(gui.update);
   ```

#### 骨骼动画

骨骼动画是需要生成一个与模型相关的骨架,骨架中的骨骼也会存在对应关系,模型的每一个需要动画的顶点需要设置影响它的骨骼以及骨骼影响顶点的程度。骨骼动画和变形动画相比会比较复杂一些,但是它又有更多的灵活性。我们可以想象一下人体的骨骼,如果使用变形动画,需要把所有的每一次的变动都存一个顶点数组,而骨骼动画,只需要设置骨骼的相关信息,就可以实现更多的动画。

1. 首先, 我们创建了一个圆柱几何体,然后通过圆柱的几何体每一个顶点的 y 轴坐标来设置需要绑定的骨骼的下标和影响的程度:

   ```js
   //遍历几何体所有的顶点
   for (let i = 0; i < geometry.vertices.length; i++) {
     //根据顶点的位置计算出骨骼影响下标和权重

     const vertex = geometry.vertices[i];
     const y = vertex.y + sizing.halfHeight;

     const skinIndex = Math.floor(y / sizing.segmentHeight);
     const skinWeight = (y % sizing.segmentHeight) / sizing.segmentHeight;

     geometry.skinIndices.push(
       new THREE.Vector4(skinIndex, skinIndex + 1, 0, 0)
     );
     geometry.skinWeights.push(
       new THREE.Vector4(1 - skinWeight, skinWeight, 0, 0)
     );
   }
   ```

几何体的`skinIndices`属性和`skinWeights`属性就是来设置相关的绑定下标和权重（骨骼影响程度）。

Vector4 不代表任何意义,仅仅是 4 个 float , 你需要根据你的需求 赋予这个 Vetor4 的含义

比如 XYZ 代表坐标 ,W 代表比例, 这样 你可以用 Vector3 pos = new Vector3(X/W,Y/W,Z/W) 来控制坐标的比例

你也可用 W 代表透明度, XYZ 来控制 RPG

或者也可以用 W 来进行 bool 判断

2. 相应的,我们需要设置一组相关的骨骼,骨骼具有嵌套关系,这样才能实现一个骨架,由于圆柱体比较简单,我们就创建一条骨骼垂直嵌套的骨骼:

   ```js
   bones = [];

   const prevBone = new THREE.Bone();
   bones.push(prevBone);
   prevBone.position.y = -sizing.halfHeight;

   for (let i = 0; i < sizing.segmentCount; i++) {
     const bone = new THREE.Bone();
     bone.position.y = sizing.segmentHeight;
     bones.push(bone); // 添加到骨骼数组
     prevBone.add(bone); // 上一个骨骼定义为父级
     prevBone = bone;
   }
   ```

3. 创建纹理时,我们还需要设置当前纹理需要受到骨骼的影响,将材质的`skinning`属性设置为`true`:

   ```js
   const lineMaterial = new THREE.MeshBasicMaterial({
     skinning: true,
     wireframe: true,
   });
   ```

4. 最后,我们需要创建骨骼材质,并将模型绑定骨骼:

   ```js
   mesh = new THREE.SkinnedMesh(geometry, [material, lineMaterial]);
   const skeleton = new THREE.Skeleton(bones); //创建骨架
   mesh.add(bones[0]); //将骨骼添加到模型里面
   mesh.bind(skeleton); //模型绑定骨架
   ```

#### 两种动画的区别

**变形动画**主要用于精度要求高的动画,比如人物的面部表情。优点是动画表达会很到位,缺点就是扩展性不强,只能执行设置好的相关动画。

**骨骼动画**主要用于那种精度要求低,而且需要丰富多样的动画,就比如人物的走动,攻击防御等动画,我们可以通过一套骨骼,修改相应骨骼的位置的信息直接实现相应的效果。确定是没有变形动画的精度高,但是可以实现多种多样的效果。

**总结**:我们可以根据项目的需求来设置不同的动画,就比如一个人物模型,说话我们使用变形动画去实现,而肢体动作使用骨骼动画去实现。

#### 导入动画

[sketchfab](https://sketchfab.com/3d-models?date=week&features=downloadable&sort_by=-likeCount)

在 Three.js 的动画系统中,你可以为模型的各种属性设置动画:骨骼动画,变形动画,材质的相关属性（颜色,透明度, 是否可见）。动画属性可以设置淡入淡出效果以及各种扭曲特效。也可以单独的改变一个对象或者多个对象上的动画的影响程度和动画时间。
为了实现这些,Three.js 动画系统在 2015 年修改为了一个类似于 Unity 和虚幻引擎 4 的架构。接下来我们了解一下这套动画系统的主要组件以及它们时如何协同工作。

1. 在模型加载成功以后,我们首先将模型创建出来,并将材质的`morphTargets`设置为 ture,可以使用变形动画:

   ```js
   mesh = new THREE.Mesh(
     geometry,
     new THREE.MeshLambertMaterial({
       vertexColors: THREE.FaceColors,
       morphTargets: true,
     })
   );
   mesh.castShadow = true;
   mesh.scale.set(0.1, 0.1, 0.1);
   scene.add(mesh);
   ```

2. 然后我们创建了一个针对于该模型的混合器:

   ```js
   mixer = new THREE.AnimationMixer(mesh);
   ```

3. 接着使用变形目标数据创建一个动画片段:

   ```js
   const clip = THREE.AnimationClip.CreateFromMorphTargetSequence(
     "gallop",
     geometry.morphTargets,
     30
   );
   ```

4. 使用混合器和动画片段创建一个动画播放器来播放:

   ```js
   const action = mixer.clipAction(clip); // 创建动画播放器
   action.setDuration(1); // 设置当前动画一秒为一个周期
   action.play(); // 设置当前动画播放
   ```

5. 最后,我们还需要在重新绘制循环中更新混合器,进行动作更新:

   ```js
   const render = () => {
     control.update();

     var time = clock.getDelta();
     // 由于模型导入是异步的,所以我们再模型没有加载完之前是获取不到混合器的
     if (mixer) {
       mixer.update(time);
     }

     renderer.render(scene, camera);
   };
   ```

#### 补间动画

补间(动画)（来自 in-between）是一个概念,允许你以平滑的方式更改对象的属性。你只需告诉它哪些属性要更改,当补间结束运行时它们应该具有哪些最终值,以及这需要多长时间,补间引擎将负责计算从起始点到结束点的值。
在 Three.js 中,我们也有一些修改模型的位置,旋转和缩放的需求,我们无法直接在 webgl 中使用 css3 动画,所以,Tween 给我们提供了一个很好的解决方案。

**我们先实现一个`Three.js`应用`Tween`的案例:**

1. 首先,创建一个`position`对象,里面存储当前立方体的位置数据:

   ```js
   const position = { x: -40, y: 0, z: -30 };
   ```

2. 然后,通过当前的对象创建一个补间`Tween`:

   ```js
   tween = new TWEEN.Tween(position);
   ```

3. 设置每一个属性的目标位置,并告诉`Tween`在 2000 毫秒内移动到目标位置:

   ```js
   tween.to({ x: 40, y: 30, z: 30 }, 2000);
   ```

4. 我们设置`Tween`对象的每次更新的回调,在每次数据更新以后,将立方体的位置更新掉:

   ```js
   tween.onUpdate(function (pos) {
     cube.position.set(pos.x, pos.y, pos.z);
   });
   ```

5. `Tween`对象不会直接执行,需要我们去调用`start()`方法激活:

   ```js
   tween.start();
   ```

6. 想要完成整个过程,我们还需要在每帧里面调用`TWEEN.update`,来触发`Tween`对象更新位置:

   ```js
   const render = () => {
     //更新Tween
     TWEEN.update();

     control.update();

     renderer.render(scene, camera);
   };
   ```

...
