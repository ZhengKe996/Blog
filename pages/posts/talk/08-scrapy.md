---
title: "Scrapy 运行报错：ModuleNotFoundError: No module named 'xxx.xxx'"
date: 2023-04-30
type: talk
---

解决问题注意两点：

1. 引入 items 的路径。items 包实际是在上一级目录的
2. xxx.items 这个导入包，不知为何无法识别，只能以..items 的方式导入

```python
from xxx.xxx.items import xxxItem
# 改为
from ..items import xxxItem
```
