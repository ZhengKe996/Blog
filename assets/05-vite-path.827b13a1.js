import{_ as p}from"./Post.c81476c3.js";import{u as c,c as l,w as r,o as u,a as n,b as s}from"./app.8dbfbffe.js";const y="Vite vue-ts \u914D\u7F6E'@'\u8DEF\u5F84\u522B\u540D",f="2022-04-14T00:00:00.000Z",v="talk",_=[{property:"og:title",content:"Vite vue-ts \u914D\u7F6E'@'\u8DEF\u5F84\u522B\u540D"}],j={__name:"05-vite-path",setup(i,{expose:o}){const t={title:"Vite vue-ts \u914D\u7F6E'@'\u8DEF\u5F84\u522B\u540D",date:"2022-04-14T00:00:00.000Z",type:"talk",meta:[{property:"og:title",content:"Vite vue-ts \u914D\u7F6E'@'\u8DEF\u5F84\u522B\u540D"}]};return o({frontmatter:t}),c({title:"Vite vue-ts \u914D\u7F6E'@'\u8DEF\u5F84\u522B\u540D",meta:[{property:"og:title",content:"Vite vue-ts \u914D\u7F6E'@'\u8DEF\u5F84\u522B\u540D"}]}),(m,a)=>{const e=p;return u(),l(e,{frontmatter:t},{default:r(()=>a[0]||(a[0]=[n("div",{class:"prose m-auto"},[n("ol",null,[n("li",null,"\u5B89\u88C5 node \u4F9D\u8D56(\u7C7B\u578B)")]),n("pre",{class:"language-bash"},[n("code",{class:"language-bash"},[n("span",{class:"token function"},"yarn"),s(),n("span",{class:"token function"},"add"),s(" @types/node "),n("span",{class:"token parameter variable"},"-D"),s(`
`)])]),n("ol",{start:"2"},[n("li",null,"\u4FEE\u6539 vite.config.js")]),n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"{"),s(" defineConfig "),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"from"),s(),n("span",{class:"token string"},"'vite'"),s(`
`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"{"),s(" resolve "),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"from"),s(),n("span",{class:"token string"},"'path'"),s(`

`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"default"),s(" defineConfig "),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"// ..."),s(`
    `),n("span",{class:"token literal-property property"},"resolve"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token literal-property property"},"alias"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
            `),n("span",{class:"token string-property property"},'"@"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token function"},"resolve"),n("span",{class:"token punctuation"},"("),s("__dirname"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},"'src'"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token comment"},"// \u8DEF\u5F84\u522B\u540D"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
        `),n("span",{class:"token literal-property property"},"extensions"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),n("span",{class:"token string"},"'.js'"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},"'.json'"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},"'.ts'"),n("span",{class:"token punctuation"},"]"),s(),n("span",{class:"token comment"},"// \u4F7F\u7528\u8DEF\u5F84\u522B\u540D\u65F6\u60F3\u8981\u7701\u7565\u7684\u540E\u7F00\u540D,\u53EF\u4EE5\u81EA\u5DF1 \u589E\u51CF"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token comment"},"// ..."),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("ol",{start:"3"},[n("li",null,"\u4FEE\u6539 tsconfig.json")]),n("pre",{class:"language-json"},[n("code",{class:"language-json"},[n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token property"},'"compilerOptions"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"// ..."),s(`
    `),n("span",{class:"token property"},'"baseUrl"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"."'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token comment"},"// \u7528\u4E8E\u8BBE\u7F6E\u89E3\u6790\u975E\u76F8\u5BF9\u6A21\u5757\u540D\u79F0\u7684\u57FA\u672C\u76EE\u5F55\uFF0C\u76F8\u5BF9\u6A21\u5757\u4E0D\u4F1A\u53D7\u5230baseUrl\u7684\u5F71\u54CD"),s(`
    `),n("span",{class:"token property"},'"paths"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token comment"},"// \u7528\u4E8E\u8BBE\u7F6E\u6A21\u5757\u540D\u5230\u57FA\u4E8EbaseUrl\u7684\u8DEF\u5F84\u6620\u5C04"),s(`
      `),n("span",{class:"token property"},'"@/*"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),n("span",{class:"token string"},'"src/*"'),n("span",{class:"token punctuation"},"]"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token comment"},"// ..."),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])])],-1)])),_:1})}}};export{f as date,j as default,_ as meta,y as title,v as type};