import{S as p,i as _,s as d,k as m,e as h,j as $,R as k,d as c,n as f,c as v,m as b,b as j,f as i,o as w,x as y,u as x,v as L}from"../../chunks/vendor-3a3d7899.js";import{L as R}from"../../chunks/LatestPosts-778b51b8.js";function q(o){let e,a,r,s,l;return s=new R({props:{articles:o[0]}}),{c(){e=m(),a=h("hr"),r=m(),$(s.$$.fragment),this.h()},l(t){k('[data-svelte="svelte-1anpopb"]',document.head).forEach(c),e=f(t),a=v(t,"HR",{class:!0}),r=f(t),b(s.$$.fragment,t),this.h()},h(){document.title="Home",j(a,"class","separator stack-48")},m(t,n){i(t,e,n),i(t,a,n),i(t,r,n),w(s,t,n),l=!0},p(t,[n]){const u={};n&1&&(u.articles=t[0]),s.$set(u)},i(t){l||(y(s.$$.fragment,t),l=!0)},o(t){x(s.$$.fragment,t),l=!1},d(t){t&&c(e),t&&c(a),t&&c(r),L(s,t)}}}const P=!0;async function S({page:o,fetch:e,session:a,stuff:r}){const s=await e("http://localhost:4000/articles");return s.ok?{props:{articles:await s.json()}}:{status:s.status,error:new Error("Could not load articles")}}function C(o,e,a){let{articles:r}=e;return o.$$set=s=>{"articles"in s&&a(0,r=s.articles)},[r]}class g extends p{constructor(e){super();_(this,e,C,q,d,{articles:0})}}export{g as default,S as load,P as prerender};