---
title: Vue 插槽（Solt）的简单使用
date: 2021-06-05
draft: true
lang: zh
duration: 20min
---

Element UI与插槽的配合使用

例如：

![vue-solt](/public/images/vue-solt/vue-solt.png)

```vue
<el-step icon="el-icon-message-solid" v-for="item,i in list">
 
	<!--  此时这里的title将会完全替换掉原插件的title    -->
	<span slot="title">
		{{item.executecontent==null?"未完成":"已完成"}}
	</span>
       
</el-step>
```