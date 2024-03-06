import{_ as e}from"./Post.67e73c9b.js";import{u as p,c,w as u,o as l,a as n,k as s}from"./app.bec8d703.js";const k=n("div",{class:"prose m-auto"},[n("p",null,[n("a",{href:"https://leetcode.cn/problems/search-in-rotated-sorted-array-ii/",target:"_blank",rel:"noopener"},"\u9898\u76EE\u94FE\u63A5 \u{1F517}")]),n("pre",{class:"language-cpp"},[n("code",{class:"language-cpp"},[s(`
`),n("span",{class:"token comment"},`/**
 * 81. \u641C\u7D22\u65CB\u8F6C\u6392\u5E8F\u6570\u7EC4 II
 * \u601D\u8DEF\uFF1A\u4E8C\u5206\u67E5\u627E\uFF08\u5206\u6BB5\u6709\u5E8F\uFF09
 * @param nums
 * @param target
 * @return
 */`),s(`
`),n("span",{class:"token keyword"},"bool"),s(),n("span",{class:"token function"},"search"),n("span",{class:"token punctuation"},"("),s("vector"),n("span",{class:"token operator"},"<"),n("span",{class:"token keyword"},"int"),n("span",{class:"token operator"},">"),s(),n("span",{class:"token operator"},"&"),s("nums"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token keyword"},"int"),s(" target"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("nums"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"size"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=="),s(),n("span",{class:"token number"},"0"),s(),n("span",{class:"token operator"},"||"),s(" nums"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"empty"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token boolean"},"false"),n("span",{class:"token punctuation"},";"),s(`

    `),n("span",{class:"token keyword"},"int"),s(" start "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token keyword"},"int"),s(" end "),n("span",{class:"token operator"},"="),s(" nums"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"size"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"-"),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},";"),s(`

    `),n("span",{class:"token keyword"},"int"),s(" mid"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token keyword"},"while"),s(),n("span",{class:"token punctuation"},"("),s("start "),n("span",{class:"token operator"},"<="),s(" end"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        mid `),n("span",{class:"token operator"},"="),s(" start "),n("span",{class:"token operator"},"+"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"("),s("end "),n("span",{class:"token operator"},"-"),s(" start"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},">>"),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token comment"},"// \u627E\u5230\u7684\u60C5\u51B5\u4E0B"),s(`
        `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("nums"),n("span",{class:"token punctuation"},"["),s("mid"),n("span",{class:"token punctuation"},"]"),s(),n("span",{class:"token operator"},"=="),s(" target"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token boolean"},"true"),n("span",{class:"token punctuation"},";"),s(`

        `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("nums"),n("span",{class:"token punctuation"},"["),s("start"),n("span",{class:"token punctuation"},"]"),s(),n("span",{class:"token operator"},"=="),s(" nums"),n("span",{class:"token punctuation"},"["),s("mid"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
            start`),n("span",{class:"token operator"},"++"),n("span",{class:"token punctuation"},";"),s(`
            `),n("span",{class:"token keyword"},"continue"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`

        `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("nums"),n("span",{class:"token punctuation"},"["),s("start"),n("span",{class:"token punctuation"},"]"),s(),n("span",{class:"token operator"},"<"),s(" nums"),n("span",{class:"token punctuation"},"["),s("mid"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
            `),n("span",{class:"token comment"},"// \u524D\u534A\u90E8\u5206\u6709\u5E8F"),s(`
            `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("nums"),n("span",{class:"token punctuation"},"["),s("mid"),n("span",{class:"token punctuation"},"]"),s(),n("span",{class:"token operator"},">"),s(" target "),n("span",{class:"token operator"},"&&"),s(" nums"),n("span",{class:"token punctuation"},"["),s("start"),n("span",{class:"token punctuation"},"]"),s(),n("span",{class:"token operator"},"<="),s(" target"),n("span",{class:"token punctuation"},")"),s(`
                end `),n("span",{class:"token operator"},"="),s(" mid "),n("span",{class:"token operator"},"-"),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},";"),s(),n("span",{class:"token comment"},"// target \u5728\u524D\u534A\u90E8\u5206\u65F6"),s(`
            `),n("span",{class:"token keyword"},"else"),s(`
                start `),n("span",{class:"token operator"},"="),s(" mid "),n("span",{class:"token operator"},"+"),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},";"),s(),n("span",{class:"token comment"},"// target\u5728\u540E\u534A\u90E8\u5206"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"else"),s(),n("span",{class:"token punctuation"},"{"),s(`
            `),n("span",{class:"token comment"},"// \u540E\u534A\u90E8\u5206\u6709\u5E8F"),s(`
            `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("nums"),n("span",{class:"token punctuation"},"["),s("mid"),n("span",{class:"token punctuation"},"]"),s(),n("span",{class:"token operator"},"<"),s(" target "),n("span",{class:"token operator"},"&&"),s(" nums"),n("span",{class:"token punctuation"},"["),s("end"),n("span",{class:"token punctuation"},"]"),s(),n("span",{class:"token operator"},">="),s(" target"),n("span",{class:"token punctuation"},")"),s(`
                start `),n("span",{class:"token operator"},"="),s(" mid "),n("span",{class:"token operator"},"+"),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},";"),s(`
            `),n("span",{class:"token keyword"},"else"),s(`
                end `),n("span",{class:"token operator"},"="),s(" mid "),n("span",{class:"token operator"},"-"),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token boolean"},"false"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])])],-1),f="81. \u641C\u7D22\u65CB\u8F6C\u6392\u5E8F\u6570\u7EC4 II",g="2024-02-29T00:00:00.000Z",_="LeetCodeArray",b=[{property:"og:title",content:"81. \u641C\u7D22\u65CB\u8F6C\u6392\u5E8F\u6570\u7EC4 II"}],I={__name:"81-search-in-rotated-sorted-array-ii",setup(r,{expose:t}){const a={title:"81. \u641C\u7D22\u65CB\u8F6C\u6392\u5E8F\u6570\u7EC4 II",date:"2024-02-29T00:00:00.000Z",type:"LeetCodeArray",meta:[{property:"og:title",content:"81. \u641C\u7D22\u65CB\u8F6C\u6392\u5E8F\u6570\u7EC4 II"}]};return t({frontmatter:a}),p({title:"81. \u641C\u7D22\u65CB\u8F6C\u6392\u5E8F\u6570\u7EC4 II",meta:[{property:"og:title",content:"81. \u641C\u7D22\u65CB\u8F6C\u6392\u5E8F\u6570\u7EC4 II"}]}),(m,d)=>{const o=e;return l(),c(o,{frontmatter:a},{default:u(()=>[k]),_:1})}}};export{g as date,I as default,b as meta,f as title,_ as type};
