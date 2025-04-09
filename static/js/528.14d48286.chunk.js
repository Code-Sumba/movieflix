"use strict";(self.webpackChunkmovieflix_frontend=self.webpackChunkmovieflix_frontend||[]).push([[528],{528:(e,t,s)=>{s.r(t),s.d(t,{default:()=>h});var a=s(5043),l=s(5475),r=s(6213),i=s(2382),n=s(8254),o=s(579);const c=e=>{let{featuredMovies:t=[]}=e;const[s,r]=(0,a.useState)(0),[i,c]=(0,a.useState)(!0);(0,a.useEffect)((()=>{let e;return i&&t.length>0&&(e=setInterval((()=>{r((e=>e===t.length-1?0:e+1))}),5e3)),()=>{e&&clearInterval(e)}}),[i,t.length]);const d=e=>{r(e),c(!1),setTimeout((()=>{c(!0)}),1e4)};if(!t||0===t.length)return(0,o.jsx)("div",{className:"relative bg-gray-900 h-[500px] flex items-center justify-center",children:(0,o.jsxs)("div",{className:"text-center text-white",children:[(0,o.jsx)("h2",{className:"text-3xl font-bold mb-4",children:"Featured Movies Coming Soon"}),(0,o.jsx)("p",{className:"text-gray-300",children:"Check back later for our featured selection"})]})});const g=t[s];return(0,o.jsxs)("div",{className:"relative h-[500px] md:h-[550px] lg:h-[650px] overflow-hidden",children:[(0,o.jsxs)("div",{className:"absolute inset-0 w-full h-full",children:[(0,o.jsx)("img",{src:g.backdrop||g.poster,alt:g.title,className:"w-full h-full object-cover object-center"}),(0,o.jsx)("div",{className:"absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"})]}),(0,o.jsx)("div",{className:"absolute top-0 left-0 bg-vegagreen text-white py-2 px-6 font-semibold z-10",children:"FEATURED"}),(0,o.jsx)("div",{className:"relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16",children:(0,o.jsxs)("div",{className:"max-w-3xl mb-8",children:[(0,o.jsxs)("div",{className:"flex items-center gap-3 mb-4",children:[(0,o.jsx)("h1",{className:"text-3xl md:text-4xl lg:text-5xl font-bold text-white",children:g.title}),g.quality&&(0,o.jsx)("span",{className:(x=g.quality,x?"4K"===x||"UHD"===x?"bg-purple-600":"1080p"===x||"FHD"===x?"bg-blue-600":"720p"===x||"HD"===x?"bg-vegagreen":"bg-gray-600":"bg-gray-600")+" text-white text-sm font-medium px-2 py-1 rounded uppercase h-fit",children:g.quality})]}),(0,o.jsxs)("div",{className:"flex flex-wrap items-center gap-4 mb-4 text-gray-300",children:[g.rating>0&&(0,o.jsxs)("div",{className:"flex items-center bg-black/30 px-2 py-1 rounded",children:[(0,o.jsx)(n.usP,{className:"mr-1 text-yellow-400"}),(0,o.jsx)("span",{children:g.rating.toFixed(1)})]}),(0,o.jsxs)("div",{className:"flex items-center bg-black/30 px-2 py-1 rounded",children:[(0,o.jsx)(n.wIk,{className:"mr-1 text-vegagreen"}),(0,o.jsx)("span",{children:new Date(g.releaseDate).getFullYear()})]}),g.language&&(0,o.jsxs)("div",{className:"flex items-center bg-black/30 px-2 py-1 rounded",children:[(0,o.jsx)(n.VeH,{className:"mr-1 text-vegagreen"}),(0,o.jsx)("span",{children:g.language})]})]}),(0,o.jsx)("p",{className:"text-white/90 text-lg mb-8 line-clamp-3 md:line-clamp-none",children:g.description}),(0,o.jsxs)("div",{className:"flex flex-wrap gap-3",children:[g.trailerUrl&&(0,o.jsxs)("a",{href:g.trailerUrl,target:"_blank",rel:"noopener noreferrer",className:"bg-white text-gray-900 px-6 py-3 rounded-md font-semibold flex items-center hover:bg-gray-100 transition-colors",children:[(0,o.jsx)(n.aze,{className:"mr-2 text-vegagreen"}),"Watch Trailer"]}),(0,o.jsxs)(l.N_,{to:`/movie/${g.slug}`,className:"bg-black/50 text-white px-6 py-3 rounded-md font-semibold flex items-center border border-white/20 hover:bg-black/70 transition-colors",children:[(0,o.jsx)(n.S8s,{className:"mr-2"}),"Movie Details"]}),(0,o.jsxs)(l.N_,{to:`/movie/${g.slug}#download`,className:"bg-vegagreen text-white px-6 py-3 rounded-md font-semibold flex items-center hover:bg-green-700 transition-colors",children:[(0,o.jsx)(n.a4x,{className:"mr-2"}),"Download Now"]})]})]})}),(0,o.jsx)("button",{onClick:()=>{const e=0===s?t.length-1:s-1;d(e)},className:"absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-vegagreen transition-colors","aria-label":"Previous movie",children:(0,o.jsx)(n.irw,{className:"h-6 w-6"})}),(0,o.jsx)("button",{onClick:()=>{const e=s===t.length-1?0:s+1;d(e)},className:"absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-vegagreen transition-colors","aria-label":"Next movie",children:(0,o.jsx)(n.fOo,{className:"h-6 w-6"})}),(0,o.jsx)("div",{className:"absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2",children:t.map(((e,t)=>(0,o.jsx)("button",{onClick:()=>d(t),className:"w-3 h-3 rounded-full transition-colors "+(t===s?"bg-vegagreen":"bg-white/50 hover:bg-white/80"),"aria-label":`Go to slide ${t+1}`},t)))})]});var x},d=e=>{let{movie:t}=e;return t?(0,o.jsxs)("div",{className:"group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full",children:[(0,o.jsxs)("div",{className:"relative overflow-hidden aspect-[2/3]",children:[(0,o.jsx)("div",{className:"absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"}),(0,o.jsx)(l.N_,{to:`/movie/${t.slug}`,children:(0,o.jsx)("img",{src:t.poster||"/images/placeholder.svg",alt:t.title,className:"w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 relative z-10",loading:"lazy",onError:e=>{e.target.onerror=null,e.target.src="/images/placeholder.svg"}})}),(0,o.jsxs)("div",{className:"absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center z-20 p-4",children:[(0,o.jsx)("h3",{className:"text-white font-bold text-center mb-2",children:t.title}),(0,o.jsxs)("div",{className:"flex flex-col gap-2 w-full",children:[(0,o.jsxs)(l.N_,{to:`/movie/${t.slug}`,className:"bg-vegagreen text-white py-2 px-4 rounded flex items-center justify-center gap-1 hover:bg-green-700 transition duration-200 text-sm",children:[(0,o.jsx)(n.aze,{className:"text-white",size:16}),(0,o.jsx)("span",{children:"View Details"})]}),(0,o.jsxs)(l.N_,{to:`/movie/${t.slug}#download`,className:"bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center gap-1 hover:bg-blue-700 transition duration-200 text-sm",children:[(0,o.jsx)(n.a4x,{className:"text-white",size:16}),(0,o.jsx)("span",{children:"Download Now"})]})]})]}),t.quality&&(0,o.jsx)("div",{className:`absolute top-2 left-2 ${a=t.quality,"4K"===a||"UHD"===a?"bg-purple-600":"1080p"===a||"FHD"===a?"bg-blue-600":"720p"===a||"HD"===a?"bg-vegagreen":"bg-gray-600"} text-white text-xs font-medium px-2 py-1 rounded z-20`,children:t.quality}),t.language&&(0,o.jsx)("div",{className:"absolute top-2 right-2 bg-yellow-600 text-white text-xs font-medium px-2 py-1 rounded z-20",children:t.language}),t.rating>0&&(0,o.jsxs)("div",{className:"absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded flex items-center z-20",children:[(0,o.jsx)(n.usP,{className:"mr-1 "+(s=t.rating,s>=8?"text-green-500":s>=6?"text-yellow-500":"text-red-500")}),(0,o.jsx)("span",{children:t.rating.toFixed(1)})]})]}),(0,o.jsxs)("div",{className:"p-3 flex flex-col flex-grow",children:[(0,o.jsx)(l.N_,{to:`/movie/${t.slug}`,className:"block",children:(0,o.jsx)("h3",{className:"font-bold text-gray-900 dark:text-white text-sm line-clamp-1 group-hover:text-vegagreen transition-colors duration-200",children:t.title})}),(0,o.jsxs)("div",{className:"flex items-center justify-between mt-auto pt-2 text-xs text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700",children:[(0,o.jsxs)("div",{className:"flex items-center",children:[(0,o.jsx)(n.wIk,{className:"mr-1"}),(0,o.jsx)("span",{children:new Date(t.releaseDate).getFullYear()})]}),(0,o.jsx)("div",{className:"flex items-center",children:t.isSeries?(0,o.jsxs)("div",{className:"flex items-center text-blue-600 dark:text-blue-400",children:[(0,o.jsx)(n.pVQ,{className:"mr-1"}),(0,o.jsx)("span",{children:"Series"})]}):(0,o.jsxs)("div",{className:"flex items-center",children:[(0,o.jsx)(n.Ohp,{className:"mr-1"}),(0,o.jsx)("span",{children:t.duration||"N/A"})]})})]})]})]}):null;var s,a},g=()=>(0,o.jsx)("div",{className:"bg-gradient-vega text-white p-4 md:p-6 rounded-lg shadow-lg mb-8",children:(0,o.jsxs)("div",{className:"flex flex-col md:flex-row items-center justify-between",children:[(0,o.jsxs)("div",{className:"mb-4 md:mb-0",children:[(0,o.jsx)("h3",{className:"text-xl md:text-2xl font-bold mb-2",children:"Download Your Favorite Movies!"}),(0,o.jsx)("p",{className:"opacity-90",children:"Get unlimited access to the latest releases in HD quality."})]}),(0,o.jsxs)(l.N_,{to:"/trending",className:"bg-white text-vegagreen px-6 py-3 rounded-lg font-semibold flex items-center hover:bg-gray-100 transition-colors",children:[(0,o.jsx)(n.a4x,{className:"mr-2"})," Browse Movies"]})]})}),x=e=>{let{title:t,link:s,icon:a}=e;return(0,o.jsxs)("div",{className:"flex justify-between items-center mb-6",children:[(0,o.jsxs)("h2",{className:"text-xl md:text-2xl font-bold flex items-center",children:[a,(0,o.jsx)("span",{className:"ml-2",children:t})]}),s&&(0,o.jsxs)(l.N_,{to:s,className:"text-vegagreen flex items-center hover:underline",children:["View All ",(0,o.jsx)(n.fOo,{className:"ml-1"})]})]})},h=e=>{let{darkMode:t}=e;const[s,h]=(0,a.useState)([]),[m,p]=(0,a.useState)([]),[u,v]=(0,a.useState)([]),[b,f]=(0,a.useState)([]),[j,N]=(0,a.useState)(!0),[y,w]=(0,a.useState)(null);(0,a.useEffect)((()=>{(async()=>{try{N(!0);const e="http://localhost:5000/api",t=`${e}/movies/featured`,s=`${e}/movies/trending`,a=`${e}/movies/latest`,l=`${e}/movies/categories`,[i,n,o,c]=await Promise.all([r.A.get(t),r.A.get(s),r.A.get(a),r.A.get(l)]);i.data.success&&h(i.data.movies),n.data.success&&p(n.data.movies),o.data.success&&v(o.data.movies),c.data.success&&f(c.data.categories),N(!1)}catch(e){console.error("Error fetching home data:",e),w("Failed to load movies. Please try again later."),N(!1),k()}})()}),[]);const k=()=>{h([{title:"The Dark Knight",slug:"the-dark-knight",description:"When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",poster:"https://via.placeholder.com/300x450?text=Dark+Knight",backdrop:"https://via.placeholder.com/1920x1080?text=Dark+Knight+Backdrop",releaseDate:"2008-07-18",rating:9,genres:["Action","Crime","Drama"],language:"English",quality:"HD"},{title:"Inception",slug:"inception",description:"A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",poster:"https://via.placeholder.com/300x450?text=Inception",backdrop:"https://via.placeholder.com/1920x1080?text=Inception+Backdrop",releaseDate:"2010-07-16",rating:8.8,genres:["Action","Adventure","Sci-Fi"],language:"English",quality:"1080p"}]),p([{title:"Dune",slug:"dune",poster:"https://via.placeholder.com/300x450?text=Dune",releaseDate:"2021-10-22",rating:8.1,genres:["Action","Adventure","Drama"],language:"English",quality:"4K"},{title:"No Time to Die",slug:"no-time-to-die",poster:"https://via.placeholder.com/300x450?text=No+Time+To+Die",releaseDate:"2021-10-08",rating:7.4,genres:["Action","Adventure","Thriller"],language:"English",quality:"HD"},{title:"Shang-Chi",slug:"shang-chi",poster:"https://via.placeholder.com/300x450?text=Shang+Chi",releaseDate:"2021-09-03",rating:7.5,genres:["Action","Adventure","Fantasy"],language:"English",quality:"HD"},{title:"The French Dispatch",slug:"the-french-dispatch",poster:"https://via.placeholder.com/300x450?text=French+Dispatch",releaseDate:"2021-10-22",rating:7.3,genres:["Comedy","Drama","Romance"],language:"English",quality:"1080p"},{title:"Eternals",slug:"eternals",poster:"https://via.placeholder.com/300x450?text=Eternals",releaseDate:"2021-11-05",rating:6.8,genres:["Action","Adventure","Fantasy"],language:"English",quality:"HD"},{title:"Venom: Let There Be Carnage",slug:"venom-let-there-be-carnage",poster:"https://via.placeholder.com/300x450?text=Venom",releaseDate:"2021-10-01",rating:6.3,genres:["Action","Adventure","Sci-Fi"],language:"English",quality:"720p"}]),v([{title:"Eternals",slug:"eternals",poster:"https://via.placeholder.com/300x450?text=Eternals",releaseDate:"2021-11-05",rating:6.8,genres:["Action","Adventure","Fantasy"],language:"English",quality:"1080p"},{title:"Venom: Let There Be Carnage",slug:"venom-let-there-be-carnage",poster:"https://via.placeholder.com/300x450?text=Venom",releaseDate:"2021-10-01",rating:6.3,genres:["Action","Adventure","Sci-Fi"],language:"English",quality:"HD"},{title:"Spencer",slug:"spencer",poster:"https://via.placeholder.com/300x450?text=Spencer",releaseDate:"2021-11-05",rating:6.9,genres:["Biography","Drama"],language:"English",quality:"720p"},{title:"Last Night in Soho",slug:"last-night-in-soho",poster:"https://via.placeholder.com/300x450?text=Soho",releaseDate:"2021-10-29",rating:7.2,genres:["Drama","Horror","Mystery"],language:"English",quality:"1080p"}]),f(["Bollywood","Hollywood","South Indian","Dual Audio","Web Series","TV Shows","Netflix","Amazon Prime"])};return j?(0,o.jsxs)("div",{className:"flex items-center justify-center min-h-screen",children:[(0,o.jsx)(n.TwU,{className:"animate-spin h-8 w-8 text-vegagreen"}),(0,o.jsx)("span",{className:"ml-2 text-xl",children:"Loading amazing movies..."})]}):!y||s.length||m.length||u.length?(0,o.jsxs)("div",{className:"pt-16 "+(t?"bg-vegadark":"bg-gray-100"),children:[" ",(0,o.jsx)(c,{featuredMovies:s}),(0,o.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:[(0,o.jsx)(g,{}),(0,o.jsxs)("section",{className:"mb-12",children:[(0,o.jsx)(x,{title:"Trending Movies",link:"/trending",icon:(0,o.jsx)(n.ARf,{className:"text-vegagreen",size:24})}),(0,o.jsx)(i.A,{dots:!1,infinite:!0,speed:500,slidesToShow:6,slidesToScroll:1,autoplay:!0,autoplaySpeed:4e3,responsive:[{breakpoint:1200,settings:{slidesToShow:5}},{breakpoint:1024,settings:{slidesToShow:4}},{breakpoint:768,settings:{slidesToShow:3}},{breakpoint:640,settings:{slidesToShow:2}}],children:m.map((e=>(0,o.jsx)("div",{className:"px-2",children:(0,o.jsx)(d,{movie:e})},e.slug)))})]}),(0,o.jsxs)("section",{className:"mb-12",children:[(0,o.jsx)(x,{title:"Latest Releases",link:"/latest",icon:(0,o.jsx)(n.Ohp,{className:"text-vegagreen",size:24})}),(0,o.jsx)("div",{className:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6",children:u.slice(0,12).map((e=>(0,o.jsx)(d,{movie:e},e.slug)))})]}),(0,o.jsxs)("section",{children:[(0,o.jsx)(x,{title:"Browse by Category",icon:(0,o.jsx)(n.C19,{className:"text-vegagreen",size:24})}),(0,o.jsx)("div",{className:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4",children:b.map((e=>(0,o.jsxs)(l.N_,{to:`/category/${e.toLowerCase().replace(/\s+/g,"-")}`,className:"bg-white dark:bg-gray-800 hover:bg-vegagreen hover:text-white dark:hover:bg-vegagreen shadow-md rounded-lg p-5 text-center transition-colors flex items-center justify-between",children:[(0,o.jsx)("h3",{className:"font-medium text-lg",children:e}),(0,o.jsx)(n.dyV,{size:18})]},e)))})]})]})]}):(0,o.jsxs)("div",{className:"text-center py-20",children:[(0,o.jsx)("h2",{className:"text-2xl font-bold text-red-600 mb-4",children:"Oops! Something went wrong"}),(0,o.jsx)("p",{className:"mb-6",children:y}),(0,o.jsx)("button",{onClick:()=>window.location.reload(),className:"bg-vegagreen text-white py-2 px-6 rounded-lg hover:bg-green-700 transition",children:"Try Again"})]})}}}]);
//# sourceMappingURL=528.14d48286.chunk.js.map