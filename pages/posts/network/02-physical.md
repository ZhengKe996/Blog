---
title: '物理层'
date: 2023-10-31
type: NetWork
---

## 物理层要实现的功能

![物理层要实现的功能](/public/images/network/02/2-1-1.png)

### 物理层接口特性

- 机械特性

  - **形状**和**尺寸**
  - **引脚数目**和**排列**
  - **固定**和**锁定**装置

- 电气特性

  - 信号**电压的范围**
  - 阻抗匹配的情况
  - 传输速率
  - 距离限制

- 功能特性

  - 规定接口电缆的各条**信号线的作用**

- 过程特性

  - 规定在信号线上传输比特流的一组操作过程，包括各信号间的**时序关系**

## 物理层下面的传输媒体

![传输媒体的分类](/public/images/network/02/2-2-1.png)

1. 导向型传输媒体

   - 同轴电缆
   - 双绞线
   - 光纤：

     - 光纤通信利用光脉冲在光纤中的传递来进行通信。由于可见光的频率非常高（约为 108MHz 量级），因此一个光纤通信系统的**传输带宽远大于**目前其他各种传输媒体的带宽。
     - 光在光纤中传输的方式是不断地全反射。多条光波在多模光纤中不断地全反射（只适合于建筑物内的近距离传输）
     - 优点：

       - 通信容量非常大
       - 抗雷电和电磁干扰性能好
       - 传输损耗小，中继距离长
       - 无串音干扰，保密性好
       - 体积小，重量轻

     - 缺点：
       - 切割光纤需要较贵的专用设备
       - 目前光电接口还比较昂贵

2. 非导向型传输媒体： 调制波的振幅、频率或相位来传输信息
   - 无线电波
   - 微波
   - 红外线
   - 激光
   - 可见光

| 传输载体 |    传输速率    |
| :------: | :------------: |
| 自由空间 |  3 x 10^8 m/s  |
|   铜线   | 2.3 x 10^8 m/s |
|   光纤   | 2.0 x 10^8 m/s |

## 传输方式

![传输方式](/public/images/network/02/2-3-1.png)

1. 同步传输：

   - 外同步：在收发双方之间增加一条时钟信号线。
   - 内同步：发送端将时钟信号编码到发送数据中一起发送（例如曼彻斯特编码）。

2. 异步传输：

   - 字节之间异步，即字节之间的时间间隔不固定。
   - 字节中的每个比特仍然要同步，即各比特的持续时间是相同的。

- 单向通信（单工）
- 双向交替通信（半双工）（不能同时收发）
- 双向同时通信（全双工）

## 编码与调制

![编码与调制](/public/images/network/02/2-4-1.drawio.png)

### 码元

在使用时间域的波形表示信号时，代表不同离散数值的**基本波形**称为码元。

### 常用编码方式

- 不归零编码：需要额外一根传输线来**传输时钟信号**，使发送方和接收方同步。
- 归零编码：在每个码元的中间时刻信号都会**回归到零电平**。
  - 归零编码相当于将时钟信号用“归零”方式编码在了数据之内，这称为“**自同步**”信号。
  - 归零编码中大部分的**数据带宽**，都用来传输“**归零**”而浪费掉了。

![编码与调制](/public/images/network/02/2-4-2.png)

### 基本的带通调制方法

![编码与调制](/public/images/network/02/2-4-3.png)

### 混合调制方法

**频率、相位、振幅**

- 因为载波的**频率和相位是相关**的，即频率是相位随时间的变化率，所以载波的**频率和相位不能进行混合调制**。
- 通常情况下，载波的相位和振幅可以结合起来一起调制，例如正交振幅调制 QAM。

#### 正交振幅调制 QAM-16

- 12 种相位
- 每种相位有 1 或 2 种振幅可选
- 可以调制出 16 种码元（波形），每种码元可以对应表示 4 个比特(log 2 16 = 4)；
- 每个码元与 4 个比特的对应关系采用**格雷码**，即任意两个相邻码元只有 1 个比特不同

## 信道的极限容量

### 造成信号失真的主要因素

- 码元的传输速率：传输速率越高，信号经过传输后的失真就越严重。
- 信号的传输距离：传输距离越远，信号经过传输后的失真就越严重。
- 噪声干扰：噪声干扰越大，信号经过传输后的失真就越严重。
- 传输媒体的质量：传输媒体质量越差，信号经过传输后的失真就越严重。

### 奈氏准则 ⭐️⭐️⭐️

**理想**低通信道的**最高码元传输速率** = 2W Baud = 2W 码元/秒

- W：信道的频率带宽（单位为 Hz）
- Baud：波特，即码元/秒

1. 使用奈氏准则给出的公式，就可以根据信道的频率带宽，计算出信道的最高码元传输速率。
2. 只要码元传输速率不超过根据奈氏准则计算出的上限，就可以避免码间串扰。
3. 奈氏准则给出的是理想低通信道的最高码元传输速率，它和实际信道有较大的差别。因此，**一个实际的信道所能传输的最高码元传输速率，要明显低于奈氏准则给出的上限值**。
4. 码元传输速率又称为**波特率、调制速率、波形速率或符号速率**。
5. 波特率与比特率有一定的关系：
   - 当 1 个码元只携带 **1 比特**的信息量时，波特率（码元/秒）与比特率（比特/秒）在数值上是**相等**的。
   - 当 1 个码元携带 **n 比特**的信息量时，波特率（码元/秒）转换成比特率（比特/秒）时，**数值要乘以 n**。

### 香农公式 ⭐️⭐️⭐️

**带宽受限**且有**高斯白噪声干扰**的信道的**极限信息传输速率**

![香农公式](/public/images/network/02/2-5-1.png)

- **C**：信道的极限信息传输速率（单位为 b/s）
- **W**：信道的频率带宽（单位为 Hz）
- **S**：信道内所传信号的平均功率
- **N**：信道内的高斯噪声功率
- **S/N**：信噪比，使用分贝（dB）作为度量单位

  ![香农公式](/public/images/network/02/2-5-2.png)

1. 信道的频率带宽 W 或信道中的信噪比 S/N 越大，信道的极限信息传输速率 C 就越高。
2. 实际信道不可能无限制地提高频率带宽 W 或信道中的信噪比 S/N。
3. 实际信道中能够达到的信息传输速率，要比香农公式给出的极限传输速率低不少。这是因为在实际信道中，信号还要受到其他一些损伤，例如各种脉冲干扰和信号衰
   减等，这些因素在香农公式中并未考虑。

## 信道复用技术

### 信道复用技术的基本原理

- 复用（Multiplexing）就是**在一条传输媒体上同时传输多路用户的信号**。
- 当一条传输媒体的传输容量大于多条信道传输的总容量时，就可以通过复用技术，在这条传输媒体上建立多条通信信道，以便**充分利用传输媒体的带宽**。
- 尽管实现信道复用会增加通信成本（需要复用器、分用器以及费用较高的大容量共享信道），但如果**复用的信道数量较大，还是比较划算的**。

### 常见的信道复用技术

![常见的信道复用技术](/public/images/network/02/2-6-1.png)

#### 频分复用 FDM

频分复用的所有用户**同时占用**不同的频带资源并行通信

![频分复用](/public/images/network/02/2-6-2.png)

#### 时分复用 TDM

时分复用的所有用户在**不同的时间占用同样的频带**
![时分复用](/public/images/network/02/2-6-3.png)

#### 波分复用 WDM

- 根据频分复用的设计思想，可在一根光纤上**同时传输多个频率（波长）相近的光载波信号**，实现基于光纤的频分复用技术。
- 目前可以在一根光纤上复用 80 路或更多路的光载波信号。因此，这种复用技术也称为**密集波分复用 DWDM**。

#### 码分复用 CDM

- 码分复用（Code Division Multiplexing，CDM）常称为码分多址（Code Division Multiple Access，CDMA），
  它是在扩频通信技术的基础上发展起来的一种无线通信技术。

- 与 FDM 和 TDM 不同，CDMA 的每个用户可以**在相同的时间使用相同的频带进行通信**。
- CDMA 最初用于军事通信，这种系统发送的信号有很强的抗干扰能力，其频谱类似于白噪声，不易被敌人发现。
- 随着技术的进步，CDMA 设备的价格和体积都大幅度下降，因而现在已广泛用于民用的移动通信中。

- CDMA 将每个比特时间划分为 m 个更短的时间片，称为**码片（Chip）**。m 的取值通常为 64 或 128。
- CDMA 中的每个站点都被指派一个唯一的**m 比特码片序列（Chip Sequence）**。

  - 某个站要发送**比特 1**，则发送它自己的 **m 比特码片序列**；
  - 某个站要发送**比特 0**，则发送它自己的 **m 比特码片序列的反码**。

- 如果有两个或多个站**同时发送数据**，则信道中的信号就是这些站各自所发送一系列码片序列或码片序列反码的**叠加**。为了从信道中**分离**出每个站的信号，给每个站**指派码片序列**时，必须遵循以下规则：

  - 分配给每个站的**码片序列必须各不相同**，实际常采用伪随机码序列。 - 分配给每个站的**码片序列必须相互正交**，即各码片序列相应的码片向量之间的**规格化內积为 0**。

    ![码分复用](/public/images/network/02/2-6-4.png)