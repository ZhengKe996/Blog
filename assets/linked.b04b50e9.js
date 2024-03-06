import{_ as e}from"./Post.67e73c9b.js";import{u as p,c,w as k,o as l,a as n,k as s}from"./app.bec8d703.js";const u=n("div",{class:"prose m-auto"},[n("pre",{class:"language-cpp"},[n("code",{class:"language-cpp"},[s(`
`),n("span",{class:"token macro property"},[n("span",{class:"token directive-hash"},"#"),n("span",{class:"token directive keyword"},"define"),s(),n("span",{class:"token macro-name"},"OK"),s(),n("span",{class:"token expression"},[n("span",{class:"token number"},"1")])]),s(`
`),n("span",{class:"token macro property"},[n("span",{class:"token directive-hash"},"#"),n("span",{class:"token directive keyword"},"define"),s(),n("span",{class:"token macro-name"},"ERROR"),s(),n("span",{class:"token expression"},[n("span",{class:"token number"},"0")])]),s(`

`),n("span",{class:"token keyword"},"typedef"),s(),n("span",{class:"token keyword"},"int"),s(" ElemType"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token keyword"},"typedef"),s(),n("span",{class:"token keyword"},"int"),s(" Status"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token keyword"},"typedef"),s(),n("span",{class:"token keyword"},"struct"),s(),n("span",{class:"token class-name"},"LNode"),s(),n("span",{class:"token punctuation"},"{"),s(`
    ElemType data`),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token keyword"},"struct"),s(),n("span",{class:"token class-name"},"LNode"),s(),n("span",{class:"token operator"},"*"),s("next"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),s(" LNode"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token operator"},"*"),s("LinkList"),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token keyword"},"class"),s(),n("span",{class:"token class-name"},"LinkedList"),s(),n("span",{class:"token punctuation"},"{"),s(`
`),n("span",{class:"token keyword"},"private"),n("span",{class:"token operator"},":"),s(`
`),n("span",{class:"token keyword"},"public"),n("span",{class:"token operator"},":"),s(`
    Status `),n("span",{class:"token function"},"InitList"),n("span",{class:"token punctuation"},"("),s("LinkList "),n("span",{class:"token operator"},"&"),s("L"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        L `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token keyword"},"new"),s(" LNode"),n("span",{class:"token punctuation"},";"),s(`
        L`),n("span",{class:"token operator"},"->"),s("next "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token constant"},"NULL"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token keyword"},"return"),s(" OK"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token keyword"},"bool"),s(),n("span",{class:"token function"},"IsEmpty"),n("span",{class:"token punctuation"},"("),s("LinkList L"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("L"),n("span",{class:"token operator"},"->"),s("next"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token boolean"},"false"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token keyword"},"else"),s(),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token boolean"},"true"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    Status `),n("span",{class:"token function"},"DestroyList"),n("span",{class:"token punctuation"},"("),s("LinkList "),n("span",{class:"token operator"},"&"),s("L"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        LNode `),n("span",{class:"token operator"},"*"),s("p"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token keyword"},"while"),s(),n("span",{class:"token punctuation"},"("),s("L"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
            p `),n("span",{class:"token operator"},"="),s(" L"),n("span",{class:"token punctuation"},";"),s(`
            L `),n("span",{class:"token operator"},"="),s(" L"),n("span",{class:"token operator"},"->"),s("next"),n("span",{class:"token punctuation"},";"),s(`
            `),n("span",{class:"token keyword"},"delete"),s(),n("span",{class:"token punctuation"},"("),s("p"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
        `),n("span",{class:"token keyword"},"return"),s(" OK"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    Status `),n("span",{class:"token function"},"ClearList"),n("span",{class:"token punctuation"},"("),s("LinkList "),n("span",{class:"token operator"},"&"),s("L"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        LNode `),n("span",{class:"token operator"},"*"),s("p"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token operator"},"*"),s("q"),n("span",{class:"token punctuation"},";"),s(`
        p `),n("span",{class:"token operator"},"="),s(" L"),n("span",{class:"token operator"},"->"),s("next"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token keyword"},"while"),s(),n("span",{class:"token punctuation"},"("),s("p"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
            q `),n("span",{class:"token operator"},"="),s(" p"),n("span",{class:"token operator"},"->"),s("next"),n("span",{class:"token punctuation"},";"),s(`
            `),n("span",{class:"token keyword"},"delete"),s(),n("span",{class:"token punctuation"},"("),s("p"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
            p `),n("span",{class:"token operator"},"="),s(" q"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
        L`),n("span",{class:"token operator"},"->"),s("next "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token constant"},"NULL"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token keyword"},"return"),s(" OK"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token keyword"},"int"),s(),n("span",{class:"token function"},"ListLength"),n("span",{class:"token punctuation"},"("),s("LinkList "),n("span",{class:"token operator"},"&"),s("L"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        LNode `),n("span",{class:"token operator"},"*"),s("p"),n("span",{class:"token punctuation"},";"),s(`
        p `),n("span",{class:"token operator"},"="),s(" L"),n("span",{class:"token operator"},"->"),s("next"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token keyword"},"int"),s(" i "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token keyword"},"while"),s(),n("span",{class:"token punctuation"},"("),s("p"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
            i`),n("span",{class:"token operator"},"++"),n("span",{class:"token punctuation"},";"),s(`
            p `),n("span",{class:"token operator"},"="),s(" p"),n("span",{class:"token operator"},"->"),s("next"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
        `),n("span",{class:"token keyword"},"return"),s(" i"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    Status `),n("span",{class:"token function"},"GetElem"),n("span",{class:"token punctuation"},"("),s("LinkList "),n("span",{class:"token operator"},"&"),s("L"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token keyword"},"int"),s(" index"),n("span",{class:"token punctuation"},","),s(" ElemType "),n("span",{class:"token operator"},"&"),s("e"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        LNode `),n("span",{class:"token operator"},"*"),s("p "),n("span",{class:"token operator"},"="),s(" L"),n("span",{class:"token operator"},"->"),s("next"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token keyword"},"int"),s(" j "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token keyword"},"while"),s(),n("span",{class:"token punctuation"},"("),s("p "),n("span",{class:"token operator"},"&&"),s(" j "),n("span",{class:"token operator"},"<"),s(" index"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
            p `),n("span",{class:"token operator"},"="),s(" p"),n("span",{class:"token operator"},"->"),s("next"),n("span",{class:"token punctuation"},";"),s(`
            `),n("span",{class:"token operator"},"++"),s("j"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
        `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token operator"},"!"),s("p "),n("span",{class:"token operator"},"||"),s(" j "),n("span",{class:"token operator"},">"),s(" index"),n("span",{class:"token punctuation"},")"),n("span",{class:"token keyword"},"return"),s(" ERROR"),n("span",{class:"token punctuation"},";"),s(`
        e `),n("span",{class:"token operator"},"="),s(" p"),n("span",{class:"token operator"},"->"),s("data"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token keyword"},"return"),s(" OK"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    LNode `),n("span",{class:"token operator"},"*"),n("span",{class:"token function"},"LocateElem"),n("span",{class:"token punctuation"},"("),s("LinkList L"),n("span",{class:"token punctuation"},","),s(" ElemType e"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        LNode `),n("span",{class:"token operator"},"*"),s("p "),n("span",{class:"token operator"},"="),s(" L"),n("span",{class:"token operator"},"->"),s("next"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token keyword"},"while"),s(),n("span",{class:"token punctuation"},"("),s("p "),n("span",{class:"token operator"},"&&"),s(" p"),n("span",{class:"token operator"},"->"),s("data "),n("span",{class:"token operator"},"!="),s(" e"),n("span",{class:"token punctuation"},")"),s(" p "),n("span",{class:"token operator"},"="),s(" p"),n("span",{class:"token operator"},"->"),s("next"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token keyword"},"return"),s(" p"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token keyword"},"int"),s(),n("span",{class:"token function"},"LocateElemIndex"),n("span",{class:"token punctuation"},"("),s("LinkList L"),n("span",{class:"token punctuation"},","),s(" ElemType e"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        LNode `),n("span",{class:"token operator"},"*"),s("p "),n("span",{class:"token operator"},"="),s(" L"),n("span",{class:"token operator"},"->"),s("next"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token keyword"},"int"),s(" j "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token keyword"},"while"),s(),n("span",{class:"token punctuation"},"("),s("p "),n("span",{class:"token operator"},"&&"),s(" p"),n("span",{class:"token operator"},"->"),s("data "),n("span",{class:"token operator"},"!="),s(" e"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
            p `),n("span",{class:"token operator"},"="),s(" p"),n("span",{class:"token operator"},"->"),s("next"),n("span",{class:"token punctuation"},";"),s(`
            j`),n("span",{class:"token operator"},"++"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
        `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("p"),n("span",{class:"token punctuation"},")"),n("span",{class:"token keyword"},"return"),s(" j"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token keyword"},"else"),s(),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    Status `),n("span",{class:"token function"},"ListInsert"),n("span",{class:"token punctuation"},"("),s("LinkList "),n("span",{class:"token operator"},"&"),s("L"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token keyword"},"int"),s(" index"),n("span",{class:"token punctuation"},","),s(" ElemType e"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        LNode `),n("span",{class:"token operator"},"*"),s("p "),n("span",{class:"token operator"},"="),s(" L"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token keyword"},"int"),s(" j "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token keyword"},"while"),s(),n("span",{class:"token punctuation"},"("),s("p "),n("span",{class:"token operator"},"&&"),s(" j "),n("span",{class:"token operator"},"<"),s(" index"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
            p `),n("span",{class:"token operator"},"="),s(" p"),n("span",{class:"token operator"},"->"),s("next"),n("span",{class:"token punctuation"},";"),s(`
            j`),n("span",{class:"token operator"},"++"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
        `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token operator"},"!"),s("p "),n("span",{class:"token operator"},"||"),s(" j "),n("span",{class:"token operator"},">"),s(" index"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token keyword"},"return"),s(" ERROR"),n("span",{class:"token punctuation"},";"),s(`
        LNode `),n("span",{class:"token operator"},"*"),s("s "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token keyword"},"new"),s(" LNode"),n("span",{class:"token punctuation"},";"),s(`
        s`),n("span",{class:"token operator"},"->"),s("data "),n("span",{class:"token operator"},"="),s(" e"),n("span",{class:"token punctuation"},";"),s(`
        s`),n("span",{class:"token operator"},"->"),s("next "),n("span",{class:"token operator"},"="),s(" p"),n("span",{class:"token operator"},"->"),s("next"),n("span",{class:"token punctuation"},";"),s(`
        p`),n("span",{class:"token operator"},"->"),s("next "),n("span",{class:"token operator"},"="),s(" s"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token keyword"},"return"),s(" OK"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    Status `),n("span",{class:"token function"},"ListDelete"),n("span",{class:"token punctuation"},"("),s("LinkList "),n("span",{class:"token operator"},"&"),s("L"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token keyword"},"int"),s(" index"),n("span",{class:"token punctuation"},","),s(" ElemType "),n("span",{class:"token operator"},"&"),s("e"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        LNode `),n("span",{class:"token operator"},"*"),s("p "),n("span",{class:"token operator"},"="),s(" L"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token keyword"},"int"),s(" j "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token keyword"},"while"),s(),n("span",{class:"token punctuation"},"("),s("p "),n("span",{class:"token operator"},"&&"),s(" j "),n("span",{class:"token operator"},"<"),s(" index"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
            p `),n("span",{class:"token operator"},"="),s(" p"),n("span",{class:"token operator"},"->"),s("next"),n("span",{class:"token punctuation"},";"),s(`
            j`),n("span",{class:"token operator"},"++"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
        `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token operator"},"!"),s("p"),n("span",{class:"token operator"},"->"),s("next "),n("span",{class:"token operator"},"||"),s(" j "),n("span",{class:"token operator"},">"),s(" index"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token keyword"},"return"),s(" ERROR"),n("span",{class:"token punctuation"},";"),s(`
        LNode `),n("span",{class:"token operator"},"*"),s("q "),n("span",{class:"token operator"},"="),s(" p"),n("span",{class:"token operator"},"->"),s("next"),n("span",{class:"token punctuation"},";"),s(),n("span",{class:"token comment"},"// \u6682\u5B58\u9700\u8981\u5220\u9664\u7684\u8282\u70B9"),s(`
        p`),n("span",{class:"token operator"},"->"),s("next "),n("span",{class:"token operator"},"="),s(" q"),n("span",{class:"token operator"},"->"),s("next"),n("span",{class:"token punctuation"},";"),s(`
        e `),n("span",{class:"token operator"},"="),s(" q"),n("span",{class:"token operator"},"->"),s("data"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token keyword"},"delete"),s(" q"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token keyword"},"return"),s(" OK"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token comment"},"// \u5934\u63D2\u6CD5"),s(`
    `),n("span",{class:"token keyword"},"void"),s(),n("span",{class:"token function"},"CreateListHead"),n("span",{class:"token punctuation"},"("),s("LinkList "),n("span",{class:"token operator"},"&"),s("L"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token keyword"},"int"),s(" n"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        L `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token keyword"},"new"),s(" LNode"),n("span",{class:"token punctuation"},";"),s(`
        L`),n("span",{class:"token operator"},"->"),s("next "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token constant"},"NULL"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token keyword"},"for"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"int"),s(" i "),n("span",{class:"token operator"},"="),s(" n"),n("span",{class:"token punctuation"},";"),s(" i "),n("span",{class:"token operator"},">"),s(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},";"),s(),n("span",{class:"token operator"},"--"),s("i"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
            LNode `),n("span",{class:"token operator"},"*"),s("p "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token keyword"},"new"),s(" LNode"),n("span",{class:"token punctuation"},";"),s(`
            cin `),n("span",{class:"token operator"},">>"),s(" p"),n("span",{class:"token operator"},"->"),s("data"),n("span",{class:"token punctuation"},";"),s(`
            p`),n("span",{class:"token operator"},"->"),s("next "),n("span",{class:"token operator"},"="),s(" L"),n("span",{class:"token operator"},"->"),s("next"),n("span",{class:"token punctuation"},";"),s(`
            L`),n("span",{class:"token operator"},"->"),s("next "),n("span",{class:"token operator"},"="),s(" p"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token comment"},"// \u5C3E\u63D2\u6CD5"),s(`
    `),n("span",{class:"token keyword"},"void"),s(),n("span",{class:"token function"},"CreateListTail"),n("span",{class:"token punctuation"},"("),s("LinkList "),n("span",{class:"token operator"},"&"),s("L"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token keyword"},"int"),s(" n"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        L `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token keyword"},"new"),s(" LNode"),n("span",{class:"token punctuation"},";"),s(`
        L`),n("span",{class:"token operator"},"->"),s("next "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token constant"},"NULL"),n("span",{class:"token punctuation"},";"),s(`
        LNode `),n("span",{class:"token operator"},"*"),s("r "),n("span",{class:"token operator"},"="),s(" L"),n("span",{class:"token punctuation"},";"),s(),n("span",{class:"token comment"},"// \u5C3E\u6307\u9488"),s(`
        `),n("span",{class:"token keyword"},"for"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"int"),s(" i "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},";"),s(" i "),n("span",{class:"token operator"},"<"),s(" n"),n("span",{class:"token punctuation"},";"),s(" i"),n("span",{class:"token operator"},"++"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
            LNode `),n("span",{class:"token operator"},"*"),s("p "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token keyword"},"new"),s(" LNode"),n("span",{class:"token punctuation"},";"),s(`
            cin `),n("span",{class:"token operator"},">>"),s(" p"),n("span",{class:"token operator"},"->"),s("data"),n("span",{class:"token punctuation"},";"),s(`
            p`),n("span",{class:"token operator"},"->"),s("next "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token constant"},"NULL"),n("span",{class:"token punctuation"},";"),s(`
            r`),n("span",{class:"token operator"},"->"),s("next "),n("span",{class:"token operator"},"="),s(" p"),n("span",{class:"token punctuation"},";"),s(`
            r `),n("span",{class:"token operator"},"="),s(" p"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token comment"},"// \u6253\u5370\u94FE\u8868"),s(`
    `),n("span",{class:"token keyword"},"void"),s(),n("span",{class:"token function"},"PrintList"),n("span",{class:"token punctuation"},"("),s("LinkList L"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        L `),n("span",{class:"token operator"},"="),s(" L"),n("span",{class:"token operator"},"->"),s("next"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token keyword"},"while"),s(),n("span",{class:"token punctuation"},"("),s("L "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token constant"},"NULL"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
            `),n("span",{class:"token function"},"printf"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"%3d"'),n("span",{class:"token punctuation"},","),s(" L"),n("span",{class:"token operator"},"->"),s("data"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s("  "),n("span",{class:"token comment"},"// \u6253\u5370\u5F53\u524D\u7ED3\u70B9\u6570\u636E"),s(`
            L `),n("span",{class:"token operator"},"="),s(" L"),n("span",{class:"token operator"},"->"),s("next"),n("span",{class:"token punctuation"},";"),s("             "),n("span",{class:"token comment"},"// \u6307\u5411\u4E0B\u4E00\u4E2A\u7ED3\u70B9"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
        `),n("span",{class:"token function"},"printf"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"\\n"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),s(`
`)])])],-1),m="\u94FE\u8868",x="2024-01-28T00:00:00.000Z",f="DSLinearList",N=[{property:"og:title",content:"\u94FE\u8868"}],h={__name:"linked",setup(r,{expose:t}){const a={title:"\u94FE\u8868",date:"2024-01-28T00:00:00.000Z",type:"DSLinearList",meta:[{property:"og:title",content:"\u94FE\u8868"}]};return t({frontmatter:a}),p({title:"\u94FE\u8868",meta:[{property:"og:title",content:"\u94FE\u8868"}]}),(d,L)=>{const o=e;return l(),c(o,{frontmatter:a},{default:k(()=>[u]),_:1})}}};export{x as date,h as default,N as meta,m as title,f as type};
