(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[901],{8899:function(e,t,s){Promise.resolve().then(s.bind(s,688))},688:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return c}});var n=s(7437),r=s(2265),l=s(4755),i=s(5303);function a(){let[e,t]=(0,r.useState)(new l.qQ),[s,a]=(0,r.useState)(!0),[c,u]=(0,r.useState)([]),[o,f]=(0,r.useState)(!1),[m,d]=(0,r.useState)(!1);function h(){return!!(e.isCheckmate()||e.isDraw()||e.isStalemate())&&(d(!0),!0)}function x(s){let n=new l.qQ(e.fen()),r=null;try{r=n.move(s)}catch(e){return f(!0),setTimeout(()=>f(!1),2e3),null}return t(n),r}(0,r.useEffect)(()=>{(function(){let t=e.moves();u(t)})(),h()},[e]),(0,r.useEffect)(()=>{s||function(){let t=e.moves();h()||0===t.length||(p(4,e),a(!s))}()},[s]);let v=e=>{let t=new l.qQ(e),s=t.board(),n=0,r={p:10,n:30,b:30,r:50,q:90,k:900};return s.forEach(e=>{e.forEach(e=>{if(e){let t="w"===e.color?r[e.type]:-r[e.type];n+=t}})}),n},j=(t,s,n,r,l)=>{if(0===t||e.isCheckmate()||e.isDraw()||e.isStalemate())return v(l.fen());let i=l.moves();if(i.sort(()=>.5-Math.random()),s){let e=-1/0;for(let s of i){l.move(s);let i=j(t-1,!1,n,r,l);if(l.undo(),e=Math.max(e,i),n=Math.max(n,i),r<=n)break}return e}{let e=1/0;for(let s of i){l.move(s);let i=j(t-1,!0,n,r,l);if(l.undo(),e=Math.min(e,i),(r=Math.min(r,i))<=n)break}return e}},p=(e,t)=>{let s=null,n=-1/0,r=t.moves();for(let l of(r.sort(()=>.5-Math.random()),r)){t.move(l);let r=j(e-1,!1,-1/0,1/0,t);t.undo(),r>n&&(n=r,s=l)}x(s)};return(0,n.jsxs)("div",{style:{width:"80vh"},children:[o&&(0,n.jsx)("div",{className:"fixed inset-0 flex items-center justify-center z-50",children:(0,n.jsx)("div",{className:"bg-red-500 text-white p-5 rounded-lg",children:"Invalid Move"})}),m&&(0,n.jsx)("div",{className:"fixed inset-0 flex items-center justify-center z-50",children:(0,n.jsx)("div",{className:"bg-green-500 text-white p-5 rounded-lg",children:"Game Over"})}),(0,n.jsx)(i.r,{position:e.fen(),onPieceDrop:function(e,t){let n=x({from:e,to:t,promotion:"q"});return null!==n&&(a(!s),!0)}})]})}var c=()=>{let[e,t]=(0,r.useState)(""),[s,l]=(0,r.useState)(!0),[i,c]=(0,r.useState)(0);return((0,r.useEffect)(()=>{if(!s){let e=setInterval(()=>{c(e=>e+1)},1e3);return()=>{clearInterval(e)}}},[s]),s)?(0,n.jsx)("div",{className:"fixed inset-0 flex items-center justify-center z-50",children:(0,n.jsxs)("div",{className:"bg-white p-5 rounded-lg",children:[(0,n.jsx)("h2",{children:"Enter Your Name"}),(0,n.jsx)("input",{type:"text",placeholder:"Player",onChange:e=>t(e.target.value),className:"border p-2 m-2"}),(0,n.jsx)("button",{onClick:()=>l(!1),className:"bg-blue-500 text-white p-2 rounded",children:"Start Game"})]})}):(0,n.jsxs)("div",{className:"md:flex m-5 justify-center flex-col items-center",children:[(0,n.jsx)("h1",{className:"text-2xl mb-4",children:"You vs Computer"}),(0,n.jsxs)("div",{className:"flex justify-between w-full mb-4",children:[(0,n.jsxs)("div",{className:"flex items-center",children:[(0,n.jsx)("i",{className:"fas fa-user mr-2"}),(0,n.jsx)("h2",{children:e})]}),(0,n.jsxs)("div",{className:"flex items-center",children:[(0,n.jsx)("i",{className:"fas fa-robot mr-2"}),(0,n.jsx)("h2",{children:"Computer"})]})]}),(0,n.jsx)("div",{className:"text-center mb-4",children:(0,n.jsxs)("h2",{children:["Elapsed Time: ",i,"s"]})}),(0,n.jsx)(a,{})]})}}},function(e){e.O(0,[828,971,596,744],function(){return e(e.s=8899)}),_N_E=e.O()}]);