import{S as R,i as N,s as F,e as g,t as A,k as E,c as b,a as L,g as O,d as v,n as P,b as m,f as C,E as p,W as T,F as S,X as H,G as U,H as J,I as k,j as W,m as q,o as G,x as M,u as V,v as X}from"../../chunks/vendor-3a3d7899.js";import{a as x,o as K,i as z,b as Q,u as Y,g as Z}from"../../chunks/UserStore-c7d4396f.js";import{_ as $}from"../../chunks/preload-helper-ec9aa979.js";import"../../chunks/singletons-12a22614.js";async function ee({method:r,path:e,data:t,session:s,base:d}){const o=typeof window!="undefined"?window.fetch:await $(()=>import("../../chunks/index-a0025d42.js"),["chunks/index-a0025d42.js","chunks/vendor-3a3d7899.js"]).then(a=>a.default),l={method:r,headers:{}};if(t&&(t.creds&&(l.credentials="include",delete t.creds),t.type||(l.headers["Content-Type"]="application/json",l.body=JSON.stringify(t)),t.type==="formData")){const a=new FormData;a.append("image",t.image[0]),l.body=a}s&&(s.aud&&(l.headers.JWT_AUD=s.aud),s.jwt&&(s.jwt.includes("Bearer")?l.headers.Authorization=s.jwt:l.headers.Authorization=`Bearer ${s.jwt}`));let u=encodeURI(`${d}/${e}`);const f=await o(u,l),_=await f.json();return{response:f,json:_}}function te(r,e,t,s){return ee({method:"POST",path:e,data:t,session:s,base:r})}function se(r){let e,t,s,d,o,l,u,f,_,a,j,h,y,i,w;return{c(){e=g("form"),t=g("label"),s=A("Email"),d=E(),o=g("input"),l=E(),u=g("label"),f=A("Password"),_=E(),a=g("input"),j=E(),h=g("button"),y=A("Login"),this.h()},l(c){e=b(c,"FORM",{class:!0});var n=L(e);t=b(n,"LABEL",{for:!0,class:!0});var B=L(t);s=O(B,"Email"),B.forEach(v),d=P(n),o=b(n,"INPUT",{type:!0,name:!0,class:!0}),l=P(n),u=b(n,"LABEL",{for:!0,class:!0});var D=L(u);f=O(D,"Password"),D.forEach(v),_=P(n),a=b(n,"INPUT",{type:!0,name:!0,class:!0}),j=P(n),h=b(n,"BUTTON",{});var I=L(h);y=O(I,"Login"),I.forEach(v),n.forEach(v),this.h()},h(){m(t,"for","email"),m(t,"class","svelte-15g03wf"),m(o,"type","email"),m(o,"name","email"),m(o,"class","svelte-15g03wf"),m(u,"for","password"),m(u,"class","svelte-15g03wf"),m(a,"type","password"),m(a,"name","password"),m(a,"class","svelte-15g03wf"),h.disabled=r[2],m(e,"class","flex-row svelte-15g03wf")},m(c,n){C(c,e,n),p(e,t),p(t,s),p(e,d),p(e,o),T(o,r[0]),p(e,l),p(e,u),p(u,f),p(e,_),p(e,a),T(a,r[1]),p(e,j),p(e,h),p(h,y),i||(w=[S(o,"input",r[4]),S(a,"input",r[5]),S(h,"click",H(r[3]))],i=!0)},p(c,[n]){n&1&&o.value!==c[0]&&T(o,c[0]),n&2&&a.value!==c[1]&&T(a,c[1]),n&4&&(h.disabled=c[2])},i:U,o:U,d(c){c&&v(e),i=!1,J(w)}}}function ae(r,e,t){let s,d,o,l;k(r,x,i=>t(7,s=i)),k(r,K,i=>t(8,d=i)),k(r,z,i=>t(9,o=i)),k(r,Q,i=>t(10,l=i));let u,f,_=!1,a=[];const j=async()=>{t(2,_=!0);try{const n=await(await fetch("https://jsonip.com/")).json();z.set(n.ip)}catch(c){console.error(c)}const{response:i,json:w}=await te(String("http://localhost:4000"),"/login",{user:{email:u,password:f},browser:l,ip:o,os:d,creds:!0},{aud:s});i.status===200?(Y.set(w),Z("/")):i.status===401?w.error?a=[...a,w.error]:a=[...a,"Error."]:i.status===500&&(a=["Oops, something went wrong! How embarrassing, try again soon."]),t(2,_=!1)};function h(){u=this.value,t(0,u)}function y(){f=this.value,t(1,f)}return[u,f,_,j,h,y]}class re extends R{constructor(e){super();N(this,e,ae,se,F,{})}}function ne(r){let e,t;return e=new re({}),{c(){W(e.$$.fragment)},l(s){q(e.$$.fragment,s)},m(s,d){G(e,s,d),t=!0},p:U,i(s){t||(M(e.$$.fragment,s),t=!0)},o(s){V(e.$$.fragment,s),t=!1},d(s){X(e,s)}}}class ce extends R{constructor(e){super();N(this,e,null,ne,F,{})}}export{ce as default};
