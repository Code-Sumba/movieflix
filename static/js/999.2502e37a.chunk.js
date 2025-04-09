"use strict";(self.webpackChunkmovieflix_frontend=self.webpackChunkmovieflix_frontend||[]).push([[999],{9380:(e,s,a)=>{a.r(s),a.d(s,{default:()=>o});var r=a(5043),t=a(3216),l=a(5475),i=a(579);const o=()=>{const{categoryId:e}=(0,t.g)(),[s,a]=(0,r.useState)([]),[o,d]=(0,r.useState)(!0),[c,n]=(0,r.useState)(null),[x,m]=(0,r.useState)(1),[g,h]=(0,r.useState)(0);(0,r.useEffect)((()=>{(async()=>{d(!0),n(null);try{await new Promise((e=>setTimeout(e,800)));const s=[],r=23;for(let a=1;a<=8;a++){const t=8*(x-1)+a;t<=r&&s.push({id:t,title:`${e} Movie ${t}`,posterUrl:"/placeholder.jpg",year:2023-Math.floor(10*Math.random()),rating:(2*Math.random()+7).toFixed(1),category:e})}a(s),h(Math.ceil(r/8)),d(!1)}catch(c){console.error("Error fetching movies by category:",c),n("Failed to load movies. Please try again later."),d(!1)}})(),window.scrollTo(0,0)}),[e,x]);const y=e=>{e>=1&&e<=g&&m(e)};return o&&1===x?(0,i.jsxs)("div",{className:"container mx-auto px-4 py-8",children:[(0,i.jsxs)("h1",{className:"text-3xl font-bold mb-6 capitalize",children:[e," Movies"]}),(0,i.jsx)("div",{className:"animate-pulse",children:(0,i.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-6",children:[1,2,3,4,5,6,7,8].map((e=>(0,i.jsx)("div",{className:"bg-gray-300 h-64 rounded"},e)))})})]}):c?(0,i.jsxs)("div",{className:"container mx-auto px-4 py-8",children:[(0,i.jsxs)("h1",{className:"text-3xl font-bold mb-6 capitalize",children:[e," Movies"]}),(0,i.jsx)("div",{className:"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded",children:c})]}):(0,i.jsxs)("div",{className:"container mx-auto px-4 py-8",children:[(0,i.jsxs)("h1",{className:"text-3xl font-bold mb-6 capitalize",children:[e," Movies"]}),0===s.length?(0,i.jsx)("div",{className:"text-center py-8",children:(0,i.jsx)("p",{className:"text-gray-600",children:"No movies found in this category."})}):(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-6",children:s.map((e=>(0,i.jsx)("div",{className:"movie-card",children:(0,i.jsx)(l.N_,{to:`/movie/${e.id}`,children:(0,i.jsxs)("div",{className:"bg-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow",children:[(0,i.jsx)("img",{src:e.posterUrl,alt:e.title,className:"w-full h-64 object-cover",onError:e=>{e.target.src="/placeholder.jpg"}}),(0,i.jsxs)("div",{className:"p-4",children:[(0,i.jsx)("h3",{className:"text-lg font-semibold",children:e.title}),(0,i.jsxs)("div",{className:"flex justify-between mt-2",children:[(0,i.jsx)("span",{className:"text-gray-600",children:e.year}),(0,i.jsxs)("span",{className:"text-yellow-500",children:["\u2605 ",e.rating]})]})]})]})})},e.id)))}),g>1&&(0,i.jsx)("div",{className:"flex justify-center mt-8",children:(0,i.jsxs)("nav",{className:"flex items-center",children:[(0,i.jsx)("button",{onClick:()=>y(x-1),disabled:1===x,className:"mx-1 px-3 py-1 rounded "+(1===x?"bg-gray-200 text-gray-500 cursor-not-allowed":"bg-gray-200 text-gray-700 hover:bg-gray-300"),children:"Previous"}),[...Array(g)].map(((e,s)=>(0,i.jsx)("button",{onClick:()=>y(s+1),className:"mx-1 px-3 py-1 rounded "+(x===s+1?"bg-blue-600 text-white":"bg-gray-200 text-gray-700 hover:bg-gray-300"),children:s+1},s+1))),(0,i.jsx)("button",{onClick:()=>y(x+1),disabled:x===g,className:"mx-1 px-3 py-1 rounded "+(x===g?"bg-gray-200 text-gray-500 cursor-not-allowed":"bg-gray-200 text-gray-700 hover:bg-gray-300"),children:"Next"})]})})]})]})}}}]);
//# sourceMappingURL=999.2502e37a.chunk.js.map