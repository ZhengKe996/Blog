import{_ as o}from"./Post.67e73c9b.js";import{u as r,c as d,w as u,o as c,a as e,k as n}from"./app.bec8d703.js";const p=e("div",{class:"prose m-auto"},[e("blockquote",null,[e("p",null,"\u5982\u4F55\u53CD\u8F6C\u94FE\u8868\uFF1F"),e("p",null,[e("code",null,"Head -> a -> b ->c -> null"),n(" \u53CD\u8F6C\u4E3A "),e("code",null,"c -> b -> a -> head -> null")])]),e("h2",{id:"\u5355\u5411\u94FE\u8868\u53CD\u8F6C-c",tabindex:"-1"},[n("\u5355\u5411\u94FE\u8868\u53CD\u8F6C(C++) "),e("a",{class:"header-anchor",href:"#\u5355\u5411\u94FE\u8868\u53CD\u8F6C-c","aria-hidden":"true"},"#")]),e("p",null,"Node \u7ED3\u6784\u4F53"),e("pre",{class:"language-c++"},[e("code",{class:"language-c++"},`struct Node {
  int value;
  Node *next;
  Node() : value(0), next(nullptr) {}
  Node(int x) : value(x), next(nullptr) {}
  Node(int x, Node *next) : value(x), next(next) {}
};

`)]),e("p",null,"\u53CD\u8F6C\u64CD\u4F5C"),e("pre",{class:"language-c++"},[e("code",{class:"language-c++"},`Node *reverseLinkedList(Node *head) {
  Node *pre = nullptr, *next = nullptr;
  while (head != nullptr) {
    next = head->next;
    head->next = pre;
    pre = head;
    head = next;
  }
  return pre;
}
`)]),e("h2",{id:"\u53CC\u5411\u94FE\u8868\u53CD\u8F6C-c",tabindex:"-1"},[n("\u53CC\u5411\u94FE\u8868\u53CD\u8F6C(C++) "),e("a",{class:"header-anchor",href:"#\u53CC\u5411\u94FE\u8868\u53CD\u8F6C-c","aria-hidden":"true"},"#")]),e("pre",{class:"language-c++"},[e("code",{class:"language-c++"},`struct DoubleNode {
  int value;
  DoubleNode *next;
  DoubleNode *pre;
  DoubleNode() : value(0), next(nullptr), pre(nullptr) {}
  DoubleNode(int x) : value(x), next(nullptr), pre(nullptr) {}
  DoubleNode(int x, DoubleNode *next, DoubleNode *pre)
      : value(x), next(next), pre(pre) {}
};

DoubleNode *reverseDoubleLinkedList(DoubleNode *head) {
  DoubleNode *pre = nullptr, *next = nullptr;
  while (head != nullptr) {
    next = head->next;
    head->next = pre;
    head->pre = next; // \u6BD4\u5355\u5411\u94FE\u8868\u53CD\u8F6C\u591A\u4E86\u4E00\u6B65\u64CD\u4F5C\uFF01
    pre = head;
    head = next;
  }
  return pre;
}
`)]),e("hr"),e("table",null,[e("thead",null,[e("tr",null,[e("th",{style:{"text-align":"center"}},[e("a",{href:"https://github.com/ZhengKe996/DS/blob/main/src/linked/linked.cpp",target:"_blank",rel:"noopener"},"C++")]),e("th",{style:{"text-align":"center"}},[e("a",{href:"https://github.com/ZhengKe996/DS/blob/main/src/linked/linked.java",target:"_blank",rel:"noopener"},"Java")])])])])],-1),N="\u5982\u4F55\u53CD\u8F6C\u94FE\u8868\uFF1F",m="2023-08-16T00:00:00.000Z",_="Linked",k=[{property:"og:title",content:"\u5982\u4F55\u53CD\u8F6C\u94FE\u8868\uFF1F"}],D={__name:"2023-08-17-linked-1",setup(s,{expose:l}){const t={title:"\u5982\u4F55\u53CD\u8F6C\u94FE\u8868\uFF1F",date:"2023-08-16T00:00:00.000Z",type:"Linked",meta:[{property:"og:title",content:"\u5982\u4F55\u53CD\u8F6C\u94FE\u8868\uFF1F"}]};return l({frontmatter:t}),r({title:"\u5982\u4F55\u53CD\u8F6C\u94FE\u8868\uFF1F",meta:[{property:"og:title",content:"\u5982\u4F55\u53CD\u8F6C\u94FE\u8868\uFF1F"}]}),(h,x)=>{const a=o;return c(),d(a,{frontmatter:t},{default:u(()=>[p]),_:1})}}};export{m as date,D as default,k as meta,N as title,_ as type};
