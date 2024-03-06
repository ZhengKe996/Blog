import{_ as s}from"./Post.67e73c9b.js";import{u as r,c,w as l,o as p,a as o,k as t}from"./app.bec8d703.js";const g=o("div",{class:"prose m-auto"},[o("p",null,[t("\u95EE\u9898: \u7AEF\u53E3\u5141\u8BB8\u88AB\u5916\u90E8\u8BBF\u95EE\u7684\u60C5\u51B5\u4E0B\uFF0C\u4ECD\u7136\u65E0\u6CD5\u88AB\u5916\u90E8\u8BBF\u95EE"),o("br"),t(" \u89E3\u51B3: \u65B0\u5EFA mongodb.conf \u6587\u4EF6 \u4F7F\u7528\u914D\u7F6E\u6587\u4EF6\u542F\u52A8")]),o("pre",{class:"language-conf"},[o("code",{class:"language-conf"},`#\u6570\u636E\u5E93\u8DEF\u5F84
dbpath=/root/mongodb/data
#\u65E5\u5FD7\u8F93\u51FA\u6587\u4EF6\u8DEF\u5F84
logpath=/root/mongodb/logs/mongodb.log
#\u9519\u8BEF\u65E5\u5FD7\u91C7\u7528\u8FFD\u52A0\u6A21\u5F0F
logappend=true
#\u542F\u7528\u65E5\u5FD7\u6587\u4EF6\uFF0C\u9ED8\u8BA4\u542F\u7528
journal=true
#\u8FD9\u4E2A\u9009\u9879\u53EF\u4EE5\u8FC7\u6EE4\u6389\u4E00\u4E9B\u65E0\u7528\u7684\u65E5\u5FD7\u4FE1\u606F\uFF0C\u82E5\u9700\u8981\u8C03\u8BD5\u4F7F\u7528\u8BF7\u8BBE\u7F6E\u4E3Afalse
quiet=true
#\u7AEF\u53E3\u53F7 \u9ED8\u8BA4\u4E3A27017
port=27017
#\u5141\u8BB8\u8FDC\u7A0B\u8BBF\u95EE
bind_ip=0.0.0.0
#\u5F00\u542F\u5B50\u8FDB\u7A0B
fork=true
#\u5F00\u542F\u8BA4\u8BC1\uFF0C\u5FC5\u9009\u5148\u6DFB\u52A0\u7528\u6237\uFF0C\u5148\u4E0D\u5F00\u542F\uFF08\u4E0D\u7528\u9A8C\u8BC1\u8D26\u53F7\u5BC6\u7801\uFF09
#auth=true

`)]),o("pre",{class:"language-bash"},[o("code",{class:"language-bash"},[o("span",{class:"token comment"},"# \u5728bin\u76EE\u5F55\u4E0B\u542F\u52A8"),t(`
./mongod `),o("span",{class:"token parameter variable"},"--config"),t(` /xxxx/mongodb.conf
`)])])],-1),b="MongoDB \u65E0\u6CD5\u88AB\u5916\u90E8\u673A\u5668\u8BBF\u95EE",h="2022-04-22T00:00:00.000Z",B="talk",x=[{property:"og:title",content:"MongoDB \u65E0\u6CD5\u88AB\u5916\u90E8\u673A\u5668\u8BBF\u95EE"}],k={__name:"01-MongoDB",setup(d,{expose:e}){const n={title:"MongoDB \u65E0\u6CD5\u88AB\u5916\u90E8\u673A\u5668\u8BBF\u95EE",date:"2022-04-22T00:00:00.000Z",type:"talk",meta:[{property:"og:title",content:"MongoDB \u65E0\u6CD5\u88AB\u5916\u90E8\u673A\u5668\u8BBF\u95EE"}]};return e({frontmatter:n}),r({title:"MongoDB \u65E0\u6CD5\u88AB\u5916\u90E8\u673A\u5668\u8BBF\u95EE",meta:[{property:"og:title",content:"MongoDB \u65E0\u6CD5\u88AB\u5916\u90E8\u673A\u5668\u8BBF\u95EE"}]}),(u,i)=>{const a=s;return p(),c(a,{frontmatter:n},{default:l(()=>[g]),_:1})}}};export{h as date,k as default,x as meta,b as title,B as type};
