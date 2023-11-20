(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[666],{7176:function(e,s,t){Promise.resolve().then(t.bind(t,6956))},6956:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return d}});var n=t(7437),l=t(2265),a=e=>{let{onCreateGame:s,onJoinGame:t}=e,[a,c]=(0,l.useState)(""),[r,i]=(0,l.useState)(""),[o,d]=(0,l.useState)("");return(0,n.jsx)("div",{className:"flex flex-col items-center justify-center h-screen bg-gray-200",children:(0,n.jsx)("div",{className:"bg-white p-8 rounded-lg shadow-md w-1/3",children:(0,n.jsxs)("div",{className:"flex flex-col items-center space-y-4",children:[(0,n.jsxs)("div",{className:"flex flex-col items-center space-y-2 border-b pb-4",children:[(0,n.jsx)("input",{type:"text",placeholder:"Your Name",value:a,onChange:e=>c(e.target.value),className:"border p-2 rounded"}),(0,n.jsx)("button",{onClick:()=>{s(a)},className:"bg-blue-500 text-white p-2 rounded",children:"Create New Game"})]}),(0,n.jsx)("div",{className:"text-gray-500",children:"OR"}),(0,n.jsxs)("div",{className:"flex flex-col items-center space-y-2",children:[(0,n.jsx)("input",{type:"text",placeholder:"Your Name",value:r,onChange:e=>i(e.target.value),className:"border p-2 rounded"}),(0,n.jsx)("div",{className:"flex items-center space-x-2",children:(0,n.jsx)("input",{type:"text",placeholder:"Enter Game ID",value:o,onChange:e=>d(e.target.value),className:"border p-2 rounded"})}),(0,n.jsx)("button",{onClick:()=>{t(r,o)},className:"bg-green-500 text-white p-2 rounded",children:"Join Game"})]})]})})})},c=t(3388),r=t(4755),i=t(5303);function o(e){let{socket:s,gameId:t,currentPlayerIsWhite:a}=e,[c,o]=(0,l.useState)(new r.qQ),[d,m]=(0,l.useState)([]),[u,x]=(0,l.useState)(!1),[h,f]=(0,l.useState)(!1),[g,j]=(0,l.useState)(!1),[v,p]=(0,l.useState)(!0);return(0,l.useEffect)(()=>{p(a)},[a]),(0,l.useEffect)(()=>{(function(){let e=c.moves();m(e)})(),(c.isCheckmate()||c.isDraw())&&f(!0)},[c]),(0,l.useEffect)(()=>{null==s||s.on("move-made",e=>{console.log("Received 'move-made' event:",e),e.success?(o(new r.qQ(e.game)),"white"==e.lastPlayed?a?p(!1):p(!0):a?p(!0):p(!1)):console.error("Move failed: ".concat(e.message))})},[]),(0,n.jsxs)("div",{style:{width:"80vh"},children:[u&&(0,n.jsx)("div",{className:"fixed inset-0 flex items-center justify-center z-50",children:(0,n.jsx)("div",{className:"bg-red-500 text-white p-5 rounded-lg",children:"Invalid Move"})}),g&&(0,n.jsx)("div",{className:"fixed inset-0 flex items-center justify-center z-50",children:(0,n.jsx)("div",{className:"bg-red-500 text-white p-5 rounded-lg",children:"Not Your Move"})}),h&&(0,n.jsx)("div",{className:"fixed inset-0 flex items-center justify-center z-50",children:(0,n.jsx)("div",{className:"bg-green-500 text-white p-5 rounded-lg",children:"Game Over"})}),(0,n.jsx)(i.r,{position:c.fen(),onPieceDrop:function(e,n){let l=function(e){if(console.log("cpm",v),!1===v)return j(!0),setTimeout(()=>j(!1),500),null;let n=new r.qQ(c.fen()),l=null;try{l=n.move(e)}catch(e){return x(!0),setTimeout(()=>x(!1),500),null}return null!==l&&(console.log("emitting make move ",n.fen()),null==s||s.emit("make-move",{gameId:t,game:n.fen(),played:a?"white":"black"})),l}({from:e,to:n,promotion:"q"});return null!==l},boardOrientation:a?"white":"black"})]})}var d=e=>{let[s,t]=l.useState(null),[i,d]=l.useState(""),[m,u]=l.useState(""),[x,h]=l.useState(!1),[f,g]=l.useState(null),[j,v]=l.useState(""),[p,N]=l.useState(!1),[b,y]=l.useState(!0);(0,l.useEffect)(()=>(t((0,c.io)("ws://localhost:5000")),null==s||s.on("connect",()=>{console.log("Connected to server")}),()=>{console.log("Disconnecting from server"),null==s||s.disconnect()}),[]),(0,l.useEffect)(()=>{null==s||s.on("player-joined",e=>{console.log("Received 'player-joined' event:",e),console.log("Player joined"),e.success?(g(e.game),v(e.game._id),h(!0),N(!0),d(e.game.WhitePlayer),u(e.game.BlackPlayer)):(console.error("Failed to join game: ".concat(e.message)),console.error("Error details:",e.error))})},[s]);let[w,S]=l.useState(0);return(0,l.useEffect)(()=>{if(!p){let e=setInterval(()=>{S(e=>e+1)},1e3);return()=>{clearInterval(e)}}},[p]),(0,n.jsxs)("div",{children:[!x&&(0,n.jsx)(a,{onCreateGame:e=>{console.log("Creating game as ".concat(e));let t=new r.qQ;null==s||s.emit("create-game",{name:e,game:t.fen()}),null==s||s.once("game-created",e=>{console.log(e),e.success?(console.log("Game started successfully"),g(e.game),v(e.roomName),h(!0)):console.error("Game creation failed: ".concat(e.message))})},onJoinGame:(e,t)=>{console.log("Joining game as ".concat(e," with game ID ").concat(t)),null==s||s.emit("join-game",{gameId:t,name:e}),y(!1)}}),x&&!p&&(0,n.jsxs)(n.Fragment,{children:[" ",(0,n.jsx)("p",{children:"Game Started ... waiting to join "}),(0,n.jsxs)("p",{children:["Game Id: ",j]})]}),p&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("p",{className:"text-center mb-4",children:["Game Id: ",j]}),(0,n.jsx)("p",{children:b?(0,n.jsx)("p",{className:"text-center mb-4",children:"your are white"}):(0,n.jsx)("p",{className:"text-center mb-4",children:"you are black"})}),(0,n.jsxs)("div",{className:"md:flex m-5 justify-center flex-col items-center",children:[(0,n.jsx)("h1",{className:"text-2xl mb-4",children:"online game"}),(0,n.jsxs)("div",{className:"flex justify-between w-full mb-4",children:[(0,n.jsxs)("div",{className:"flex items-center",children:[(0,n.jsx)("i",{className:"fas fa-chess-king mr-2"}),(0,n.jsxs)("h2",{children:[i," (White)"]})]}),(0,n.jsxs)("div",{className:"flex items-center",children:[(0,n.jsx)("i",{className:"fas fa-chess-king mr-2"}),(0,n.jsxs)("h2",{children:[m," (Black)"]})]})]}),(0,n.jsx)("div",{className:"text-center mb-4",children:(0,n.jsxs)("h2",{children:["Elapsed Time: ",w,"s"]})}),(0,n.jsx)(o,{socket:s,gameId:j,currentPlayerIsWhite:b})]})]})]})}}},function(e){e.O(0,[828,388,971,596,744],function(){return e(e.s=7176)}),_N_E=e.O()}]);