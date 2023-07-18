---
title: TypeScript 中对象数组根据对象id分组并转map
date: 2023-05-25
draft: true
lang: zh
# duration: 5min
---

# 要求

如果要将具有相同 type 属性的对象元素，分成不同的数组。

# 思路

可以先从对象数组中提取相同的 tyep 属性，再使用 Array.reduce() 和 Map 来进行对象数组的分类。

# 实现

```ts
// 对象数组根据id分组并转map
const array = [
  { type: 'phone', name: 'Apple' },
  { type: 'computer', name: 'Acer' },
  { type: 'phone', name: 'OPPO' },
  { type: 'computer', name: 'Lenovo' },
  { type: 'phone', name: 'HUAWEI' },
]

const map = array.reduce((acc, item) => {
  // 判断当前 id 在 map 对象是否已新建数组，如果没有，则新建一个空数组
  if (!acc.has(item.id)) {
    acc.set(item.id, [])
  }
  // 将当前元素推入对应的数组
  acc.get(item.id).push(item)
  return acc
}, new Map())

// 遍历此map
for (const [key, value] of map.entries()) {
  console.log(`${key}: ${JSON.stringify(value)}`)
}
```
