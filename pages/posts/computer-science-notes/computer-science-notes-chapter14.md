---
title: 第十四章：数据库
date: 2023-04-23
draft: true
type: ComputerScienceNotes
lang: zh
---

## 数据库

数据库是一个组织内被应用程序使用的逻辑相一致的相关数据的集合。

与普通的文件系统相比，数据库的优势有：

- 冗余较少：直接使用文件不可避免的会存储大量的重复信息
- 避免不一致性：大量的冗余会带来更多的不一致性的可能
- 效率：主要指查询效率
- 数据完整性
- 机密性

## 数据库管理系统

数据库管理系统是用于定义，创建，维护数据库的一种工具。其包括五个部分：

1. 硬件
2. 软件
3. 数据
4. 用户
5. 规程（用户需要遵循的规则）

## 数据库体系结构

数据库管理系统有三层体系结构：

- 内层：数据在存储设备中的实际存储和组织方式。内层直接与硬件交互。
  概念层：定义数据的逻辑视图。数据库管理系统的主要功能（增删查改）都在这一层。
- 外层：与用户交互的一层。

## 数据库模型

数据库模型有三种：层次模型，网状模型，关系模型。

## 关系数据库模型

在该模型中，数据是通过关系的集合来表示的。

关系即为我们所看到的数据库二维表。

关系的操作

关系数据库使用结构化查询语言（SQL）进行操作。其一共有 9 种操作。

1. 插入：INSERT INTO TABLE\*NAME VALUES (...,...,...)
2. 删除：DELETE FROM TABLE_NAME WHERE CRITERIA
3. 更新：UPDATE TABLE_NAME SET ATTR1=VALUE1,ATTR2=VALUE2,... WHERE CRITERIA
4. 选择：SELECT * FROM TABLE*NAME WHERE CRITERIA
5. 投影：SELECT ATTR1 FROM TABLE_NAME
6. 连接：SELECT ATTR\*LIST FROM TABLE1, TABLE2 WHERE CRITERIA
7. 并：SELECT \* FROM TABLE1 UNION SELECT \* FROM TABLE2 结果是两个表的并
8. 交：SELECT _ FROM TABLE1 INTERSECTION SELECT _ FROM TABLE2 结果是两个表的交
9. 差：SELECT \_ FROM TABLE1 MINUS SELECT \* FROM TABLE2 结果是第一个表减第二个表的结果

## 数据库设计

数据库的设计首先考虑建立实体关系模型（ERM），然后再设计库表。

实体关系模型

通过 E-R 图表示实体关系模型。其中：

- 矩形表示实体集
- 椭圆表示实体集的属性
- 菱形表示关系集

从 E-R 图到关系

设计好 E-R 图之后就可以设计关系了。实体集和关系集都可以落地成表，其中关系集的表则由相关实体集的主键构成。

## 规范化

第一范式（1NF）：每个元组的每个属性只能有一个值，并且属性需要相互独立（不能有子属性）
不满足第一范式的话连存都存不下
第二范式（2NF）：每个非主键属性的值依赖于整个主键
