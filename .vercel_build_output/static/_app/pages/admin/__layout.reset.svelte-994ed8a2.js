import{S as z,i as U,s as V,e as f,t as A,c as h,a as d,g as M,d as m,b as u,D as P,f as j,E as v,F as W,G as Z,I as ee,J as le,k as y,j as se,n as I,m as te,K as ie,o as ae,x as q,u as J,v as ne,H as ce,V as ue,L as ve,M as me,N as fe,O as he,A as de}from"../../chunks/vendor-3a3d7899.js";import{p as _e}from"../../chunks/app-092199a2.js";import{u as re,g as pe,a as ge,b as $e,o as be}from"../../chunks/UserStore-c7d4396f.js";import"../../chunks/singletons-12a22614.js";function Ee(r){let a,n,e,o,l,t;return{c(){a=f("ul"),n=f("li"),e=f("a"),o=A("Home"),this.h()},l(s){a=h(s,"UL",{class:!0});var i=d(a);n=h(i,"LI",{class:!0});var $=d(n);e=h($,"A",{href:!0,class:!0});var c=d(e);o=M(c,"Home"),c.forEach(m),$.forEach(m),i.forEach(m),this.h()},h(){u(e,"href","/"),u(e,"class","svelte-1j38nv6"),u(n,"class","svelte-1j38nv6"),P(n,"active",r[0].path==="/"),u(a,"class","svelte-1j38nv6")},m(s,i){j(s,a,i),v(a,n),v(n,e),v(e,o),l||(t=W(e,"click",r[1]),l=!0)},p(s,[i]){i&1&&P(n,"active",s[0].path==="/")},i:Z,o:Z,d(s){s&&m(a),l=!1,t()}}}function we(r,a,n){let e;ee(r,_e,t=>n(0,e=t));const o=le();return[e,()=>{o("close")}]}class Se extends z{constructor(a){super();U(this,a,we,Ee,V,{})}}function ke(r){let a,n,e,o,l,t,s,i,$,c,_,x,L,p,C,T,w,E,D,H,b,B,F,R;return b=new Se({}),b.$on("close",r[2]),{c(){a=f("header"),n=f("nav"),e=f("section"),o=f("img"),t=y(),s=f("b"),i=A("Chicago Environmental Justice Network"),$=y(),c=f("section"),_=f("button"),x=A("\u2630"),L=y(),p=f("section"),C=f("section"),T=y(),w=f("section"),E=f("button"),D=A("X"),H=y(),se(b.$$.fragment),this.h()},l(g){a=h(g,"HEADER",{class:!0});var S=d(a);n=h(S,"NAV",{class:!0});var k=d(n);e=h(k,"SECTION",{id:!0,class:!0});var N=d(e);o=h(N,"IMG",{src:!0,alt:!0,class:!0}),t=I(N),s=h(N,"B",{class:!0});var X=d(s);i=M(X,"Chicago Environmental Justice Network"),X.forEach(m),N.forEach(m),$=I(k),c=h(k,"SECTION",{id:!0,class:!0});var G=d(c);_=h(G,"BUTTON",{class:!0});var K=d(_);x=M(K,"\u2630"),K.forEach(m),G.forEach(m),L=I(k),p=h(k,"SECTION",{id:!0,class:!0});var O=d(p);C=h(O,"SECTION",{class:!0});var oe=d(C);oe.forEach(m),T=I(O),w=h(O,"SECTION",{class:!0});var Q=d(w);E=h(Q,"BUTTON",{class:!0});var Y=d(E);D=M(Y,"X"),Y.forEach(m),Q.forEach(m),H=I(O),te(b.$$.fragment,O),O.forEach(m),k.forEach(m),S.forEach(m),this.h()},h(){ie(o.src,l="/favicon.png")||u(o,"src",l),u(o,"alt","Organization logo"),u(o,"class","svelte-19224nb"),u(s,"class","container text-small svelte-19224nb"),u(e,"id","logo"),u(e,"class","left svelte-19224nb"),u(_,"class","button"),u(c,"id","expander"),u(c,"class","right svelte-19224nb"),u(C,"class","left svelte-19224nb"),u(E,"class","button"),u(w,"class","right svelte-19224nb"),u(p,"id","links"),u(p,"class","svelte-19224nb"),P(p,"active",r[0]),u(n,"class","svelte-19224nb"),u(a,"class","svelte-19224nb")},m(g,S){j(g,a,S),v(a,n),v(n,e),v(e,o),v(e,t),v(e,s),v(s,i),v(n,$),v(n,c),v(c,_),v(_,x),v(n,L),v(n,p),v(p,C),v(p,T),v(p,w),v(w,E),v(E,D),v(p,H),ae(b,p,null),B=!0,F||(R=[W(_,"click",r[1]),W(E,"click",r[2])],F=!0)},p(g,[S]){S&1&&P(p,"active",g[0])},i(g){B||(q(b.$$.fragment,g),B=!0)},o(g){J(b.$$.fragment,g),B=!1},d(g){g&&m(a),ne(b),F=!1,ce(R)}}}function Oe(r,a,n){let e=!1;return[e,()=>{n(0,e=!0)},()=>{n(0,e=!1)}]}class ye extends z{constructor(a){super();U(this,a,Oe,ke,V,{})}}const Ie=r=>{const a=parseInt(r.browser.version),n=`${r.os.name}||${r.os.version}||||${r.browser.name}||${a}`;return ue(n).toString()};function Ce(r,a){return{options:[],header:[r.platform,r.userAgent,r.appVersion,r.vendor,a.opera],dataOS:[{name:"Windows Phone",value:"Windows Phone",version:"OS"},{name:"Windows",value:"Win",version:"NT"},{name:"iPhone",value:"iPhone",version:"OS"},{name:"iPad",value:"iPad",version:"OS"},{name:"Kindle",value:"Silk",version:"Silk"},{name:"Android",value:"Android",version:"Android"},{name:"PlayBook",value:"PlayBook",version:"OS"},{name:"BlackBerry",value:"BlackBerry",version:"/"},{name:"Macintosh",value:"Mac",version:"OS X"},{name:"Linux",value:"Linux",version:"rv"},{name:"Palm",value:"Palm",version:"PalmOS"}],dataBrowser:[{name:"Chrome",value:"Chrome",version:"Chrome"},{name:"Firefox",value:"Firefox",version:"Firefox"},{name:"Safari",value:"Safari",version:"Version"},{name:"Internet Explorer",value:"MSIE",version:"MSIE"},{name:"Opera",value:"Opera",version:"Opera"},{name:"BlackBerry",value:"CLDC",version:"CLDC"},{name:"Mozilla",value:"Mozilla",version:"Mozilla"}],init:function(){let e=this.header.join(""),o=this.matchItem(e,this.dataOS),l=this.matchItem(e,this.dataBrowser);return{os:o,browser:l}},matchItem:(e,o)=>{var l=0,t=0,s,i,$,c,_;for(l=0;l<o.length;l+=1)if(s=new RegExp(o[l].value,"i"),$=s.test(e),$){if(i=new RegExp(o[l].version+"[- /:;]([\\d._]+)","i"),c=e.match(i),_="",c&&c[1]&&(c=c[1]),c)for(c=c.split(/[._]+/),t=0;t<c.length;t+=1)t===0?_+=c[t]+".":_+=c[t];else _="0";return{name:o[l].name,version:parseFloat(_)}}return{name:"unknown",version:0}}}}function Be(r){let a,n,e,o;a=new ye({});const l=r[1].default,t=ve(l,r,r[0],null);return{c(){se(a.$$.fragment),n=y(),e=f("main"),t&&t.c(),this.h()},l(s){te(a.$$.fragment,s),n=I(s),e=h(s,"MAIN",{class:!0});var i=d(e);t&&t.l(i),i.forEach(m),this.h()},h(){u(e,"class","svelte-8fpwqv")},m(s,i){ae(a,s,i),j(s,n,i),j(s,e,i),t&&t.m(e,null),o=!0},p(s,[i]){t&&t.p&&(!o||i&1)&&me(t,l,s,s[0],o?he(l,s[0],i,null):fe(s[0]),null)},i(s){o||(q(a.$$.fragment,s),q(t,s),o=!0)},o(s){J(a.$$.fragment,s),J(t,s),o=!1},d(s){ne(a,s),s&&m(n),s&&m(e),t&&t.d(s)}}}function Ne(r,a,n){let e;ee(r,re,t=>n(2,e=t));let{$$slots:o={},$$scope:l}=a;return de(()=>{if(re.useLocalStorage(),e.user||pe("/admin/login",{replaceState:!0}),navigator&&window){const t=Ce(navigator,window).init();ge.set(Ie(t)),$e.set(`${t.browser.name}||${t.browser.version}`),be.set(`${t.os.name}||${t.os.version}`)}}),r.$$set=t=>{"$$scope"in t&&n(0,l=t.$$scope)},[l,o]}class xe extends z{constructor(a){super();U(this,a,Ne,Be,V,{})}}export{xe as default};