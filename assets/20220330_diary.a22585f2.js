import{_ as r}from"./Post.5d3ff09a.js";import{u as d,o as s,c as i,w as c,a as e,b as n}from"./app.8b00054c.js";const l=e("div",{class:"prose m-auto"},[e("h4",{id:"mongodb-\u65E0\u6CD5\u88AB\u5916\u90E8\u673A\u5668\u8BBF\u95EE",tabindex:"-1"},[n("MongoDB \u65E0\u6CD5\u88AB\u5916\u90E8\u673A\u5668\u8BBF\u95EE "),e("a",{class:"header-anchor",href:"#mongodb-\u65E0\u6CD5\u88AB\u5916\u90E8\u673A\u5668\u8BBF\u95EE","aria-hidden":"true"},"#")]),e("p",null,[n("\u95EE\u9898: \u7AEF\u53E3\u5141\u8BB8\u88AB\u5916\u90E8\u8BBF\u95EE\u7684\u60C5\u51B5\u4E0B\uFF0C\u4ECD\u7136\u65E0\u6CD5\u88AB\u5916\u90E8\u8BBF\u95EE"),e("br"),n(" \u89E3\u51B3: \u65B0\u5EFA mongodb.conf \u6587\u4EF6 \u4F7F\u7528\u914D\u7F6E\u6587\u4EF6\u542F\u52A8")]),e("pre",{class:"language-conf"},[e("code",{class:"language-conf"},`#\u6570\u636E\u5E93\u8DEF\u5F84
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

`)]),e("pre",{class:"language-bash"},[e("code",{class:"language-bash"},[e("span",{class:"token comment"},"# \u5728bin\u76EE\u5F55\u4E0B\u542F\u52A8"),n(`
./mongod --config /xxxx/mongodb.conf
`)])]),e("h4",{id:"zookeeper-\u542F\u52A8\u65F6\u62A5-starting-zookeeper-\u2026-failed-to-start",tabindex:"-1"},[n("ZooKeeper \u542F\u52A8\u65F6\u62A5: Starting zookeeper \u2026 FAILED TO START "),e("a",{class:"header-anchor",href:"#zookeeper-\u542F\u52A8\u65F6\u62A5-starting-zookeeper-\u2026-failed-to-start","aria-hidden":"true"},"#")]),e("p",null,[n("\u95EE\u9898: ZooKeeper \u542F\u52A8\u65F6\u62A5: Starting zookeeper \u2026 FAILED TO START"),e("br"),n(" \u539F\u56E0: \u5728 3.5.5 \u7248\u672C\u53CA\u4EE5\u4E0A\uFF0CZookeeper \u63D0\u4F9B\u4E86\u4E00\u4E2A\u5185\u5D4C\u7684 Jetty \u5BB9\u5668\u6765\u8FD0\u884C AdminServer\uFF0C\u9ED8\u8BA4\u5360\u7528\u7684\u662F 8080 \u7AEF\u53E3\uFF0CAdminServer \u4E3B\u8981\u662F\u6765\u67E5\u770B Zookeeper \u7684\u4E00\u4E9B\u72B6\u6001\uFF0C\u5982\u679C\u673A\u5668\u4E0A\u6709\u5176\u4ED6\u7A0B\u5E8F\uFF08\u6BD4\u5982\uFF1ATomcat\uFF09\u5360\u7528\u4E86 8080 \u7AEF\u53E3\uFF0C\u4E5F\u4F1A\u5BFC\u81F4 Starting zookeeper \u2026 FAILED TO START \u7684\u95EE\u9898"),e("br")]),e("p",null,[n("\u5982\u679C\u4E0D\u9700\u8981 "),e("code",null,"AdminServer"),n(" \uFF0C\u53EF\u4EE5\u76F4\u63A5\u7981\u7528\uFF1A\u6253\u5F00 "),e("code",null,"zoo.cfg"),n(" \u914D\u7F6E\u6587\u4EF6\uFF0C\u76F4\u63A5\u6DFB\u52A0\u4EE5\u4E0B\u8BED\u53E5\u5373\u53EF\u3002")]),e("pre",{class:"language-cig"},[e("code",{class:"language-cig"},`# \u7981\u7528 AdminServer \u670D\u52A1
admin.enableServer=false
`)]),e("p",null,[e("br"),n("\u5982\u679C\u60F3\u4F7F\u7528 "),e("code",null,"AdminServer"),n(" , \u90A3\u4E48\u53EF\u4EE5\u76F4\u63A5\u5728 "),e("code",null,"zoo.cfg"),n(" \u914D\u7F6E\u6587\u4EF6\u4E2D\u4FEE\u6539\u7AEF\u53E3\u53F7\u5373\u53EF\uFF0C\u6BD4\u5982\u8BA9\u5176\u7ED1\u5B9A 9000\u3002")]),e("pre",{class:"language-cfg"},[e("code",{class:"language-cfg"},`# admin port
admin.serverPort=9000
`)]),e("h4",{id:"delete-\u8BF7\u6C42\u83B7\u53D6\u4E0D\u5230-id",tabindex:"-1"},[n("Delete \u8BF7\u6C42\u83B7\u53D6\u4E0D\u5230 ID "),e("a",{class:"header-anchor",href:"#delete-\u8BF7\u6C42\u83B7\u53D6\u4E0D\u5230-id","aria-hidden":"true"},"#")]),e("p",null,[n("\u95EE\u9898: \u524D\u7AEF\u53D1\u9001 delete \u8BF7\u6C42,\u670D\u52A1\u7AEF\u83B7\u53D6\u4E0D\u5230\u8BF7\u6C42 id"),e("br"),n(" \u539F\u56E0: \u524D\u7AEF\u53D1\u9001\u9519\u8BEF,\u5E94\u5F53\u643A\u5E26 params \u53C2\u6570\u8FDB\u884C\u5220\u9664")]),e("h4",{id:"redis-\u8FDE\u63A5\u95EE\u9898",tabindex:"-1"},[n("Redis \u8FDE\u63A5\u95EE\u9898 "),e("a",{class:"header-anchor",href:"#redis-\u8FDE\u63A5\u95EE\u9898","aria-hidden":"true"},"#")]),e("p",null,[n("\u95EE\u9898: \u672C\u5730\u65E0\u6CD5\u8FDE\u63A5\u670D\u52A1\u5668\u4E0A Redis"),e("br"),n(" \u89E3\u51B3: \u4FEE\u6539 redis.conf")]),e("pre",{class:"language-conf"},[e("code",{class:"language-conf"},`# \u53BB\u6389bind 127.0.0.1

# protected-mode yes \u6539\u6210 no

# daemonize no \u6539\u6210yes
\u91CD\u65B0\u542F\u52A8\u670D\u52A1
./bin/redis-server ./redis.conf
`)]),e("h4",{id:"react-simplemde-editor-v5-\u7248\u672C\u6539\u53D8\u5185\u5BB9\u81EA\u52A8\u5931\u53BB\u7126\u70B9",tabindex:"-1"},[n("react-simplemde-editor v5 \u7248\u672C\u6539\u53D8\u5185\u5BB9\u81EA\u52A8\u5931\u53BB\u7126\u70B9 "),e("a",{class:"header-anchor",href:"#react-simplemde-editor-v5-\u7248\u672C\u6539\u53D8\u5185\u5BB9\u81EA\u52A8\u5931\u53BB\u7126\u70B9","aria-hidden":"true"},"#")]),e("p",null,"\u89E3\u51B3: \u4E0B\u8F7D 4.x \u7248\u672C\u5373\u53EF")],-1),b="\u8E29\u5751\u65E5\u8BB0",_="\u829C\u6E56",k="2022-03-30T00:00:00.000Z",x="zh",T="talk",v="30min",y=[{property:"og:title",content:"\u8E29\u5751\u65E5\u8BB0"},{property:"og:description",content:"\u829C\u6E56"},{name:"description",content:"\u829C\u6E56"}],z={__name:"20220330_diary",setup(p,{expose:t}){const o={title:"\u8E29\u5751\u65E5\u8BB0",description:"\u829C\u6E56",date:"2022-03-30T00:00:00.000Z",lang:"zh",type:"talk",duration:"30min",meta:[{property:"og:title",content:"\u8E29\u5751\u65E5\u8BB0"},{property:"og:description",content:"\u829C\u6E56"},{name:"description",content:"\u829C\u6E56"}]};return t({frontmatter:o}),d({title:"\u8E29\u5751\u65E5\u8BB0",meta:[{property:"og:title",content:"\u8E29\u5751\u65E5\u8BB0"},{property:"og:description",content:"\u829C\u6E56"},{name:"description",content:"\u829C\u6E56"}]}),(m,u)=>{const a=r;return s(),i(a,{frontmatter:o},{default:c(()=>[l]),_:1})}}};export{k as date,z as default,_ as description,v as duration,x as lang,y as meta,b as title,T as type};
