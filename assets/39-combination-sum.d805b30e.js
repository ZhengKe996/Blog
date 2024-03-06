import{_ as e}from"./Post.67e73c9b.js";import{u as p,c,w as u,o as k,a as n,k as s}from"./app.bec8d703.js";const l=n("div",{class:"prose m-auto"},[n("p",null,[n("a",{href:"https://leetcode.cn/problems/combination-sum/",target:"_blank",rel:"noopener"},"\u9898\u76EE\u94FE\u63A5 \u{1F517}")]),n("pre",{class:"language-cpp"},[n("code",{class:"language-cpp"},[s(`
`),n("span",{class:"token comment"},`/**
 *
 * @param candidates \u9898\u76EE\u7ED9\u5B9A\u6570\u7EC4
 * @param begin
 * @param len
 * @param target
 * @param path \u8DEF\u5F84\u6570\u7EC4
 * @param res \u7ED3\u679C\u6570\u7EC4
 */`),s(`
`),n("span",{class:"token keyword"},"void"),s(),n("span",{class:"token function"},"dfs"),n("span",{class:"token punctuation"},"("),s("vector"),n("span",{class:"token operator"},"<"),n("span",{class:"token keyword"},"int"),n("span",{class:"token operator"},">"),s(),n("span",{class:"token operator"},"&"),s("candidates"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token keyword"},"int"),s(" begin"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token keyword"},"int"),s(" len"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token keyword"},"int"),s(" target"),n("span",{class:"token punctuation"},","),s(" vector"),n("span",{class:"token operator"},"<"),n("span",{class:"token keyword"},"int"),n("span",{class:"token operator"},">"),s(),n("span",{class:"token operator"},"&"),s("path"),n("span",{class:"token punctuation"},","),s(" vector"),n("span",{class:"token operator"},"<"),s("vector"),n("span",{class:"token operator"},"<"),n("span",{class:"token keyword"},"int"),n("span",{class:"token operator"},">>"),s(),n("span",{class:"token operator"},"&"),s("res"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("target "),n("span",{class:"token operator"},"=="),s(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        res`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"push_back"),n("span",{class:"token punctuation"},"("),s("path"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token keyword"},"return"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token keyword"},"for"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"int"),s(" i "),n("span",{class:"token operator"},"="),s(" begin"),n("span",{class:"token punctuation"},";"),s(" i "),n("span",{class:"token operator"},"<"),s(" len"),n("span",{class:"token punctuation"},";"),s(" i"),n("span",{class:"token operator"},"++"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("target "),n("span",{class:"token operator"},"-"),s(" candidates"),n("span",{class:"token punctuation"},"["),s("i"),n("span",{class:"token punctuation"},"]"),s(),n("span",{class:"token operator"},"<"),s(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token keyword"},"break"),n("span",{class:"token punctuation"},";"),s(),n("span",{class:"token comment"},"// \u51CF\u679D"),s(`

        path`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"push_back"),n("span",{class:"token punctuation"},"("),s("candidates"),n("span",{class:"token punctuation"},"["),s("i"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token function"},"dfs"),n("span",{class:"token punctuation"},"("),s("candidates"),n("span",{class:"token punctuation"},","),s(" i"),n("span",{class:"token punctuation"},","),s(" len"),n("span",{class:"token punctuation"},","),s(" target "),n("span",{class:"token operator"},"-"),s(" candidates"),n("span",{class:"token punctuation"},"["),s("i"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(" path"),n("span",{class:"token punctuation"},","),s(" res"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
        path`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"pop_back"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(),n("span",{class:"token comment"},"// \u6062\u590D\u73B0\u573A"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`


`),n("span",{class:"token comment"},`/**
 * 39. \u7EC4\u5408\u603B\u548C
 * @param candidates
 * @param target
 * @return
 */`),s(`
vector`),n("span",{class:"token operator"},"<"),s("vector"),n("span",{class:"token operator"},"<"),n("span",{class:"token keyword"},"int"),n("span",{class:"token operator"},">>"),s(),n("span",{class:"token function"},"combinationSum"),n("span",{class:"token punctuation"},"("),s("vector"),n("span",{class:"token operator"},"<"),n("span",{class:"token keyword"},"int"),n("span",{class:"token operator"},">"),s(),n("span",{class:"token operator"},"&"),s("candidates"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token keyword"},"int"),s(" target"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    vector`),n("span",{class:"token operator"},"<"),s("vector"),n("span",{class:"token operator"},"<"),n("span",{class:"token keyword"},"int"),n("span",{class:"token operator"},">>"),s(" res"),n("span",{class:"token punctuation"},";"),s(`

    `),n("span",{class:"token keyword"},"int"),s(" N "),n("span",{class:"token operator"},"="),s(" candidates"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"size"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("N "),n("span",{class:"token operator"},"=="),s(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},")"),n("span",{class:"token keyword"},"return"),s(" res"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token function"},"sort"),n("span",{class:"token punctuation"},"("),s("candidates"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"begin"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},","),s(" candidates"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"end"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(),n("span",{class:"token comment"},"// O(NlogN)"),s(`
    vector`),n("span",{class:"token operator"},"<"),n("span",{class:"token keyword"},"int"),n("span",{class:"token operator"},">"),s(" path"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token function"},"dfs"),n("span",{class:"token punctuation"},"("),s("candidates"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},","),s(" N"),n("span",{class:"token punctuation"},","),s(" target"),n("span",{class:"token punctuation"},","),s(" path"),n("span",{class:"token punctuation"},","),s(" res"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token keyword"},"return"),s(" res"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`)])])],-1),w="39. \u7EC4\u5408\u603B\u548C",g="2024-01-26T00:00:00.000Z",_="LeetCodeArray",b=[{property:"og:title",content:"39. \u7EC4\u5408\u603B\u548C"}],h={__name:"39-combination-sum",setup(r,{expose:t}){const a={title:"39. \u7EC4\u5408\u603B\u548C",date:"2024-01-26T00:00:00.000Z",type:"LeetCodeArray",meta:[{property:"og:title",content:"39. \u7EC4\u5408\u603B\u548C"}]};return t({frontmatter:a}),p({title:"39. \u7EC4\u5408\u603B\u548C",meta:[{property:"og:title",content:"39. \u7EC4\u5408\u603B\u548C"}]}),(d,m)=>{const o=e;return k(),c(o,{frontmatter:a},{default:u(()=>[l]),_:1})}}};export{g as date,h as default,b as meta,w as title,_ as type};
