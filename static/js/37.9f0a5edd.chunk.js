/*! For license information please see 37.9f0a5edd.chunk.js.LICENSE.txt */
(self.webpackChunkmovieflix_frontend=self.webpackChunkmovieflix_frontend||[]).push([[37],{37:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>A});var a=r(43),s=r(216),n=r(475),i=r(213),o=r(173),l=r.n(o),d=r(122),c=r.n(d),u=r(282),p=r.n(u),h=Object.defineProperty,m=Object.defineProperties,y=Object.getOwnPropertyDescriptors,f=Object.getOwnPropertySymbols,g=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable,v=(e,t,r)=>t in e?h(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,b=(e,t)=>{for(var r in t||(t={}))g.call(t,r)&&v(e,r,t[r]);if(f)for(var r of f(t))x.call(t,r)&&v(e,r,t[r]);return e},w=(e,t)=>m(e,y(t));function j(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return w(b({},e),{height:0,width:0,playerVars:w(b({},e.playerVars),{autoplay:0,start:0,end:0})})}var N={videoId:l().string,id:l().string,className:l().string,iframeClassName:l().string,style:l().object,title:l().string,loading:l().oneOf(["lazy","eager"]),opts:l().objectOf(l().any),onReady:l().func,onError:l().func,onPlay:l().func,onPause:l().func,onEnd:l().func,onStateChange:l().func,onPlaybackRateChange:l().func,onPlaybackQualityChange:l().func},P=class extends a.Component{constructor(e){super(e),this.destroyPlayerPromise=void 0,this.onPlayerReady=e=>{var t,r;return null==(r=(t=this.props).onReady)?void 0:r.call(t,e)},this.onPlayerError=e=>{var t,r;return null==(r=(t=this.props).onError)?void 0:r.call(t,e)},this.onPlayerStateChange=e=>{var t,r,a,s,n,i,o,l;switch(null==(r=(t=this.props).onStateChange)||r.call(t,e),e.data){case P.PlayerState.ENDED:null==(s=(a=this.props).onEnd)||s.call(a,e);break;case P.PlayerState.PLAYING:null==(i=(n=this.props).onPlay)||i.call(n,e);break;case P.PlayerState.PAUSED:null==(l=(o=this.props).onPause)||l.call(o,e)}},this.onPlayerPlaybackRateChange=e=>{var t,r;return null==(r=(t=this.props).onPlaybackRateChange)?void 0:r.call(t,e)},this.onPlayerPlaybackQualityChange=e=>{var t,r;return null==(r=(t=this.props).onPlaybackQualityChange)?void 0:r.call(t,e)},this.destroyPlayer=()=>this.internalPlayer?(this.destroyPlayerPromise=this.internalPlayer.destroy().then((()=>this.destroyPlayerPromise=void 0)),this.destroyPlayerPromise):Promise.resolve(),this.createPlayer=()=>{if("undefined"===typeof document)return;if(this.destroyPlayerPromise)return void this.destroyPlayerPromise.then(this.createPlayer);const e=w(b({},this.props.opts),{videoId:this.props.videoId});this.internalPlayer=p()(this.container,e),this.internalPlayer.on("ready",this.onPlayerReady),this.internalPlayer.on("error",this.onPlayerError),this.internalPlayer.on("stateChange",this.onPlayerStateChange),this.internalPlayer.on("playbackRateChange",this.onPlayerPlaybackRateChange),this.internalPlayer.on("playbackQualityChange",this.onPlayerPlaybackQualityChange),(this.props.title||this.props.loading)&&this.internalPlayer.getIframe().then((e=>{this.props.title&&e.setAttribute("title",this.props.title),this.props.loading&&e.setAttribute("loading",this.props.loading)}))},this.resetPlayer=()=>this.destroyPlayer().then(this.createPlayer),this.updatePlayer=()=>{var e;null==(e=this.internalPlayer)||e.getIframe().then((e=>{this.props.id?e.setAttribute("id",this.props.id):e.removeAttribute("id"),this.props.iframeClassName?e.setAttribute("class",this.props.iframeClassName):e.removeAttribute("class"),this.props.opts&&this.props.opts.width?e.setAttribute("width",this.props.opts.width.toString()):e.removeAttribute("width"),this.props.opts&&this.props.opts.height?e.setAttribute("height",this.props.opts.height.toString()):e.removeAttribute("height"),this.props.title?e.setAttribute("title",this.props.title):e.setAttribute("title","YouTube video player"),this.props.loading?e.setAttribute("loading",this.props.loading):e.removeAttribute("loading")}))},this.getInternalPlayer=()=>this.internalPlayer,this.updateVideo=()=>{var e,t,r,a;if("undefined"===typeof this.props.videoId||null===this.props.videoId)return void(null==(e=this.internalPlayer)||e.stopVideo());let s=!1;const n={videoId:this.props.videoId};(null==(t=this.props.opts)?void 0:t.playerVars)&&(s=1===this.props.opts.playerVars.autoplay,"start"in this.props.opts.playerVars&&(n.startSeconds=this.props.opts.playerVars.start),"end"in this.props.opts.playerVars&&(n.endSeconds=this.props.opts.playerVars.end)),s?null==(r=this.internalPlayer)||r.loadVideoById(n):null==(a=this.internalPlayer)||a.cueVideoById(n)},this.refContainer=e=>{this.container=e},this.container=null,this.internalPlayer=null}componentDidMount(){this.createPlayer()}componentDidUpdate(e){return t=this,r=null,a=function*(){(function(e,t){var r,a,s,n;return e.id!==t.id||e.className!==t.className||(null==(r=e.opts)?void 0:r.width)!==(null==(a=t.opts)?void 0:a.width)||(null==(s=e.opts)?void 0:s.height)!==(null==(n=t.opts)?void 0:n.height)||e.iframeClassName!==t.iframeClassName||e.title!==t.title})(e,this.props)&&this.updatePlayer(),function(e,t){return e.videoId!==t.videoId||!c()(j(e.opts),j(t.opts))}(e,this.props)&&(yield this.resetPlayer()),function(e,t){var r,a;if(e.videoId!==t.videoId)return!0;const s=(null==(r=e.opts)?void 0:r.playerVars)||{},n=(null==(a=t.opts)?void 0:a.playerVars)||{};return s.start!==n.start||s.end!==n.end}(e,this.props)&&this.updateVideo()},new Promise(((e,s)=>{var n=e=>{try{o(a.next(e))}catch(t){s(t)}},i=e=>{try{o(a.throw(e))}catch(t){s(t)}},o=t=>t.done?e(t.value):Promise.resolve(t.value).then(n,i);o((a=a.apply(t,r)).next())}));var t,r,a}componentWillUnmount(){this.destroyPlayer()}render(){return a.createElement("div",{className:this.props.className,style:this.props.style},a.createElement("div",{id:this.props.id,className:this.props.iframeClassName,ref:this.refContainer}))}},k=P;k.propTypes=N,k.defaultProps={videoId:"",id:"",className:"",iframeClassName:"",style:{},title:"",loading:void 0,opts:{},onReady:()=>{},onError:()=>{},onPlay:()=>{},onPause:()=>{},onEnd:()=>{},onStateChange:()=>{},onPlaybackRateChange:()=>{},onPlaybackQualityChange:()=>{}},k.PlayerState={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5};var S=k,E=r(254),C=r(579);const A=()=>{const{id:e}=(0,s.g)(),[t,r]=(0,a.useState)(null),[o,l]=(0,a.useState)(!0),[d,c]=(0,a.useState)(null),[u,p]=(0,a.useState)("downloads"),[h,m]=(0,a.useState)(!1),[y,f]=(0,a.useState)(!1);(0,a.useEffect)((()=>{(async()=>{try{l(!0);const t="http://localhost:5000/api",a=await i.A.get(`${t}/movies/movie/${e}`);a.data.success?r(a.data.movie):c("Failed to load movie details."),l(!1)}catch(t){console.error("Error fetching movie details:",t),c("Failed to load movie details. Please try again later."),l(!1),g()}})(),window.scrollTo(0,0),"#download"===window.location.hash&&setTimeout((()=>{const e=document.getElementById("download-section");e&&(e.scrollIntoView({behavior:"smooth"}),p("downloads"))}),1e3)}),[e]);const g=()=>{r({title:"Dune (2021)",slug:"dune-2021",description:"Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence, only those who can conquer their own fear will survive.",poster:"https://via.placeholder.com/500x750?text=Dune+Poster",backdrop:"https://via.placeholder.com/1920x1080?text=Dune+Backdrop",releaseDate:"2021-10-22",duration:155,rating:8.1,genres:["Action","Adventure","Drama","Sci-Fi"],language:"English",subtitles:["English","Hindi","Spanish"],trailerUrl:"https://www.youtube.com/watch?v=8g18jFHCLXk",downloadLinks:[{quality:"720p",size:"1.2 GB",provider:"Direct Link",url:"#"},{quality:"1080p",size:"2.5 GB",provider:"Direct Link",url:"#"},{quality:"480p",size:"700 MB",provider:"Direct Link",url:"#"}],categories:["English","Hollywood"],isSeries:!1})};if(o)return(0,C.jsxs)("div",{className:"flex items-center justify-center min-h-screen",children:[(0,C.jsx)(E.TwU,{className:"animate-spin h-8 w-8 text-primary-600"}),(0,C.jsx)("span",{className:"ml-2 text-xl",children:"Loading movie details..."})]});if(d||!t)return(0,C.jsxs)("div",{className:"text-center py-20",children:[(0,C.jsx)(E.y3G,{className:"mx-auto h-12 w-12 text-red-600"}),(0,C.jsx)("h2",{className:"text-2xl font-bold text-red-600 mb-4",children:"Movie Not Found"}),(0,C.jsx)("p",{className:"mb-6",children:d||"We couldn't find the movie you're looking for."}),(0,C.jsx)(n.N_,{to:"/",className:"btn btn-primary",children:"Back to Home"})]});const x=e=>new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),v=e=>`${Math.floor(e/60)}h ${e%60}m`,b=(e=>{if(!e)return null;const t=e.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);return t&&11===t[2].length?t[2]:null})(t.trailerUrl);return(0,C.jsxs)("div",{className:"pt-16",children:[(0,C.jsxs)("div",{className:"relative",children:[(0,C.jsxs)("div",{className:"w-full h-[50vh] md:h-[60vh]",children:[(0,C.jsx)("img",{src:t.backdrop||t.poster,alt:t.title,className:"w-full h-full object-cover object-center"}),(0,C.jsx)("div",{className:"absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"})]}),(0,C.jsx)("div",{className:"absolute bottom-0 left-0 right-0 p-6 text-white",children:(0,C.jsxs)("div",{className:"max-w-7xl mx-auto flex flex-col md:flex-row",children:[(0,C.jsx)("div",{className:"hidden md:block md:w-1/4 lg:w-1/5 flex-shrink-0 -mt-32 z-10",children:(0,C.jsx)("img",{src:t.poster,alt:t.title,className:"w-full rounded-lg shadow-xl"})}),(0,C.jsxs)("div",{className:"md:ml-8 md:w-3/4 lg:w-4/5",children:[(0,C.jsx)("h1",{className:"text-3xl md:text-4xl font-bold mb-2",children:t.title}),(0,C.jsxs)("div",{className:"flex flex-wrap items-center text-sm md:text-base space-x-4 mb-4",children:[t.rating>0&&(0,C.jsxs)("div",{className:"flex items-center",children:[(0,C.jsx)(E.usP,{className:"mr-1 text-yellow-400"}),(0,C.jsx)("span",{children:t.rating.toFixed(1)})]}),(0,C.jsxs)("div",{className:"flex items-center",children:[(0,C.jsx)(E.wIk,{className:"mr-1"}),(0,C.jsx)("span",{children:x(t.releaseDate)})]}),t.duration&&(0,C.jsxs)("div",{className:"flex items-center",children:[(0,C.jsx)(E.Ohp,{className:"mr-1"}),(0,C.jsx)("span",{children:v(t.duration)})]}),t.language&&(0,C.jsxs)("div",{className:"flex items-center",children:[(0,C.jsx)(E.VeH,{className:"mr-1"}),(0,C.jsx)("span",{children:t.language})]}),t.isSeries&&(0,C.jsxs)("div",{className:"flex items-center",children:[(0,C.jsx)(E.pVQ,{className:"mr-1"}),(0,C.jsx)("span",{children:"Web Series"})]})]}),(0,C.jsx)("div",{className:"flex flex-wrap gap-2 mb-4",children:t.genres&&t.genres.map((e=>(0,C.jsx)("span",{className:"px-3 py-1 bg-gray-800/80 rounded-full text-sm",children:e},e)))}),(0,C.jsxs)("div",{className:"mb-4",children:[(0,C.jsx)("p",{className:"text-gray-300 "+(h?"":"line-clamp-3"),children:t.description}),t.description&&t.description.length>150&&(0,C.jsx)("button",{onClick:()=>m(!h),className:"text-primary-400 mt-1 flex items-center text-sm",children:h?(0,C.jsxs)(C.Fragment,{children:["Show Less ",(0,C.jsx)(E.wAb,{className:"ml-1"})]}):(0,C.jsxs)(C.Fragment,{children:["Read More ",(0,C.jsx)(E.fK4,{className:"ml-1"})]})})]}),(0,C.jsxs)("div",{className:"flex flex-wrap gap-3",children:[b&&(0,C.jsxs)("a",{href:"#trailer-section",className:"btn btn-primary flex items-center",children:[(0,C.jsx)(E.yb2,{className:"mr-2"}),"Watch Trailer"]}),(0,C.jsxs)("a",{href:"#download-section",className:"btn btn-secondary flex items-center",children:[(0,C.jsx)(E.a4x,{className:"mr-2"}),"Download Now"]})]})]})]})})]}),(0,C.jsx)("div",{className:"md:hidden -mt-20 px-4 mb-6",children:(0,C.jsx)("img",{src:t.poster,alt:t.title,className:"w-48 mx-auto rounded-lg shadow-xl"})}),(0,C.jsx)("div",{className:"max-w-7xl mx-auto px-4 py-8",children:(0,C.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-8",children:[(0,C.jsxs)("div",{className:"md:col-span-2",children:[b&&(0,C.jsxs)("section",{id:"trailer-section",className:"mb-12",children:[(0,C.jsx)("h2",{className:"text-2xl font-bold mb-4 text-gray-900 dark:text-white",children:"Official Trailer"}),(0,C.jsx)("div",{className:"aspect-video rounded-lg overflow-hidden bg-gray-900",children:(0,C.jsx)(S,{videoId:b,opts:{height:"100%",width:"100%",playerVars:{autoplay:0}},className:"w-full h-full"})})]}),(0,C.jsxs)("section",{id:"download-section",className:"mb-12",children:[(0,C.jsx)("h2",{className:"text-2xl font-bold mb-4 text-gray-900 dark:text-white",children:"Download Links"}),y?(0,C.jsxs)("div",{className:"bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6 rounded-lg text-center mb-6",children:[(0,C.jsx)("h3",{className:"text-xl font-bold text-green-700 dark:text-green-400 mb-2",children:"Thank You for Downloading!"}),(0,C.jsx)("p",{className:"text-green-600 dark:text-green-300 mb-4",children:"Your download should start automatically. If it doesn't, please click the download link again."})]}):(0,C.jsxs)(C.Fragment,{children:[t.downloadLinks&&t.downloadLinks.length>0?(0,C.jsx)("div",{className:"space-y-3",children:t.downloadLinks.sort(((e,t)=>{const r={"2160p":1,"1080p":2,"720p":3,"480p":4,Other:5};return r[e.quality]-r[t.quality]})).map(((e,r)=>(0,C.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-wrap items-center justify-between",children:[(0,C.jsxs)("div",{className:"flex items-center mb-2 md:mb-0",children:[(0,C.jsx)("div",{className:"w-20 px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-center font-medium mr-4",children:e.quality}),(0,C.jsxs)("div",{children:[(0,C.jsx)("div",{className:"font-medium",children:e.provider}),(0,C.jsx)("div",{className:"text-sm text-gray-600 dark:text-gray-400",children:e.size})]})]}),(0,C.jsxs)("button",{onClick:()=>(async(e,t)=>{try{const r="http://localhost:5000/api";await i.A.put(`${r}/movies/download/${e}`),f(!0),window.open(t,"_blank"),setTimeout((()=>{f(!1)}),5e3)}catch(d){console.error("Error tracking download:",d),window.open(t,"_blank")}})(t._id,e.url),className:"bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200",children:[(0,C.jsx)(E.a4x,{className:"mr-2"}),"Download"]})]},r)))}):(0,C.jsx)("div",{className:"bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-6 rounded-lg text-center",children:(0,C.jsx)("p",{className:"text-yellow-700 dark:text-yellow-400",children:"Download links will be available soon. Please check back later."})}),(0,C.jsxs)("div",{className:"mt-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg",children:[(0,C.jsx)("h3",{className:"font-semibold mb-2 text-gray-900 dark:text-white",children:"Download Instructions:"}),(0,C.jsxs)("ol",{className:"list-decimal list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1",children:[(0,C.jsx)("li",{children:"Click on the download button for your preferred quality."}),(0,C.jsx)("li",{children:"You may be redirected to the provider's site."}),(0,C.jsx)("li",{children:"If presented with multiple links, choose the one that works best for you."}),(0,C.jsx)("li",{children:"For any issues, please report the broken link using the report button."})]})]})]}),(0,C.jsx)("div",{className:"mt-4 text-center",children:(0,C.jsxs)("button",{className:"text-red-500 dark:text-red-400 inline-flex items-center text-sm",children:[(0,C.jsx)(E.QsL,{className:"mr-1"})," Report Broken Link"]})})]})]}),(0,C.jsxs)("div",{children:[(0,C.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8",children:[(0,C.jsx)("h3",{className:"text-xl font-bold mb-4 text-gray-900 dark:text-white",children:"Movie Details"}),(0,C.jsxs)("ul",{className:"space-y-3 text-gray-700 dark:text-gray-300",children:[(0,C.jsxs)("li",{className:"flex justify-between",children:[(0,C.jsx)("span",{className:"text-gray-600 dark:text-gray-400",children:"Title:"}),(0,C.jsx)("span",{className:"font-medium",children:t.title})]}),(0,C.jsxs)("li",{className:"flex justify-between",children:[(0,C.jsx)("span",{className:"text-gray-600 dark:text-gray-400",children:"Release Date:"}),(0,C.jsx)("span",{children:x(t.releaseDate)})]}),t.duration&&(0,C.jsxs)("li",{className:"flex justify-between",children:[(0,C.jsx)("span",{className:"text-gray-600 dark:text-gray-400",children:"Duration:"}),(0,C.jsx)("span",{children:v(t.duration)})]}),(0,C.jsxs)("li",{className:"flex justify-between",children:[(0,C.jsx)("span",{className:"text-gray-600 dark:text-gray-400",children:"Language:"}),(0,C.jsx)("span",{children:t.language})]}),t.subtitles&&t.subtitles.length>0&&(0,C.jsxs)("li",{className:"flex justify-between",children:[(0,C.jsx)("span",{className:"text-gray-600 dark:text-gray-400",children:"Subtitles:"}),(0,C.jsx)("span",{children:t.subtitles.join(", ")})]}),t.isSeries&&(0,C.jsxs)(C.Fragment,{children:[(0,C.jsxs)("li",{className:"flex justify-between",children:[(0,C.jsx)("span",{className:"text-gray-600 dark:text-gray-400",children:"Type:"}),(0,C.jsx)("span",{children:"Web Series"})]}),t.totalSeasons>0&&(0,C.jsxs)("li",{className:"flex justify-between",children:[(0,C.jsx)("span",{className:"text-gray-600 dark:text-gray-400",children:"Seasons:"}),(0,C.jsx)("span",{children:t.totalSeasons})]}),t.totalEpisodes>0&&(0,C.jsxs)("li",{className:"flex justify-between",children:[(0,C.jsx)("span",{className:"text-gray-600 dark:text-gray-400",children:"Episodes:"}),(0,C.jsx)("span",{children:t.totalEpisodes})]})]}),t.rating>0&&(0,C.jsxs)("li",{className:"flex justify-between",children:[(0,C.jsx)("span",{className:"text-gray-600 dark:text-gray-400",children:"Rating:"}),(0,C.jsxs)("span",{className:"flex items-center",children:[(0,C.jsx)(E.usP,{className:"mr-1 text-yellow-500"}),t.rating.toFixed(1),"/10"]})]})]})]}),(0,C.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-md p-6",children:[(0,C.jsx)("h3",{className:"text-xl font-bold mb-4 text-gray-900 dark:text-white",children:"Categories"}),(0,C.jsxs)("div",{className:"flex flex-wrap gap-2",children:[t.categories&&t.categories.map((e=>(0,C.jsx)(n.N_,{to:`/category/${e}`,className:"px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors",children:e},e))),t.genres&&t.genres.map((e=>(0,C.jsx)(n.N_,{to:`/search?genre=${e}`,className:"px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors",children:e},e)))]})]})]})]})})]})}},101:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,s=r(561),n=(a=s)&&a.__esModule?a:{default:a};t.default={pauseVideo:{acceptableStates:[n.default.ENDED,n.default.PAUSED],stateChangeRequired:!1},playVideo:{acceptableStates:[n.default.ENDED,n.default.PLAYING],stateChangeRequired:!1},seekTo:{acceptableStates:[n.default.ENDED,n.default.PLAYING,n.default.PAUSED],stateChangeRequired:!0,timeout:3e3}},e.exports=t.default},122:e=>{"use strict";e.exports=function e(t,r){if(t===r)return!0;if(t&&r&&"object"==typeof t&&"object"==typeof r){if(t.constructor!==r.constructor)return!1;var a,s,n;if(Array.isArray(t)){if((a=t.length)!=r.length)return!1;for(s=a;0!==s--;)if(!e(t[s],r[s]))return!1;return!0}if(t.constructor===RegExp)return t.source===r.source&&t.flags===r.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===r.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===r.toString();if((a=(n=Object.keys(t)).length)!==Object.keys(r).length)return!1;for(s=a;0!==s--;)if(!Object.prototype.hasOwnProperty.call(r,n[s]))return!1;for(s=a;0!==s--;){var i=n[s];if(!e(t[i],r[i]))return!1}return!0}return t!==t&&r!==r}},144:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=["ready","stateChange","playbackQualityChange","playbackRateChange","error","apiChange","volumeChange"],e.exports=t.default},151:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,s=r(452),n=(a=s)&&a.__esModule?a:{default:a};t.default=function(e){return new Promise((function(t){if(window.YT&&window.YT.Player&&window.YT.Player instanceof Function)t(window.YT);else{var r="http:"===window.location.protocol?"http:":"https:";(0,n.default)(r+"//www.youtube.com/iframe_api",(function(t){t&&e.trigger("error",t)}));var a=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=function(){a&&a(),t(window.YT)}}}))},e.exports=t.default},173:(e,t,r)=>{e.exports=r(497)()},218:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},282:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=o(r(345)),n=o(r(151)),i=o(r(750));function o(e){return e&&e.__esModule?e:{default:e}}var l=void 0;t.default=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=(0,s.default)();if(l||(l=(0,n.default)(o)),t.events)throw new Error("Event handlers cannot be overwritten.");if("string"===typeof e&&!document.getElementById(e))throw new Error('Element "'+e+'" does not exist.');t.events=i.default.proxyEvents(o);var d=new Promise((function(r){"object"===("undefined"===typeof e?"undefined":a(e))&&e.playVideo instanceof Function?r(e):l.then((function(a){var s=new a.Player(e,t);return o.on("ready",(function(){r(s)})),null}))})),c=i.default.promisifyPlayer(d,r);return c.on=o.on,c.off=o.off,c},e.exports=t.default},345:e=>{"use strict";var t;t=function(){var e={},t={};return e.on=function(e,r){var a={name:e,handler:r};return t[e]=t[e]||[],t[e].unshift(a),a},e.off=function(e){var r=t[e.name].indexOf(e);-1!==r&&t[e.name].splice(r,1)},e.trigger=function(e,r){var a,s=t[e];if(s)for(a=s.length;a--;)s[a].handler(r)},e},e.exports=t},429:(e,t,r)=>{function a(){var e;try{e=t.storage.debug}catch(r){}return!e&&"undefined"!==typeof process&&"env"in process&&(e={NODE_ENV:"production",PUBLIC_URL:"/movieflix",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.DEBUG),e}(t=e.exports=r(826)).log=function(){return"object"===typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)},t.formatArgs=function(e){var r=this.useColors;if(e[0]=(r?"%c":"")+this.namespace+(r?" %c":" ")+e[0]+(r?"%c ":" ")+"+"+t.humanize(this.diff),!r)return;var a="color: "+this.color;e.splice(1,0,a,"color: inherit");var s=0,n=0;e[0].replace(/%[a-zA-Z%]/g,(function(e){"%%"!==e&&(s++,"%c"===e&&(n=s))})),e.splice(n,0,a)},t.save=function(e){try{null==e?t.storage.removeItem("debug"):t.storage.debug=e}catch(r){}},t.load=a,t.useColors=function(){if("undefined"!==typeof window&&window.process&&"renderer"===window.process.type)return!0;return"undefined"!==typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!==typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!==typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!==typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},t.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:function(){try{return window.localStorage}catch(e){}}(),t.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],t.formatters.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}},t.enable(a())},445:e=>{var t=1e3,r=60*t,a=60*r,s=24*a,n=365.25*s;function i(e,t,r){if(!(e<t))return e<1.5*t?Math.floor(e/t)+" "+r:Math.ceil(e/t)+" "+r+"s"}e.exports=function(e,o){o=o||{};var l,d=typeof e;if("string"===d&&e.length>0)return function(e){if((e=String(e)).length>100)return;var i=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(!i)return;var o=parseFloat(i[1]);switch((i[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return o*n;case"days":case"day":case"d":return o*s;case"hours":case"hour":case"hrs":case"hr":case"h":return o*a;case"minutes":case"minute":case"mins":case"min":case"m":return o*r;case"seconds":case"second":case"secs":case"sec":case"s":return o*t;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return o;default:return}}(e);if("number"===d&&!1===isNaN(e))return o.long?i(l=e,s,"day")||i(l,a,"hour")||i(l,r,"minute")||i(l,t,"second")||l+" ms":function(e){if(e>=s)return Math.round(e/s)+"d";if(e>=a)return Math.round(e/a)+"h";if(e>=r)return Math.round(e/r)+"m";if(e>=t)return Math.round(e/t)+"s";return e+"ms"}(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},452:e=>{function t(e,t){e.onload=function(){this.onerror=this.onload=null,t(null,e)},e.onerror=function(){this.onerror=this.onload=null,t(new Error("Failed to load "+this.src),e)}}function r(e,t){e.onreadystatechange=function(){"complete"!=this.readyState&&"loaded"!=this.readyState||(this.onreadystatechange=null,t(null,e))}}e.exports=function(e,a,s){var n=document.head||document.getElementsByTagName("head")[0],i=document.createElement("script");"function"===typeof a&&(s=a,a={}),a=a||{},s=s||function(){},i.type=a.type||"text/javascript",i.charset=a.charset||"utf8",i.async=!("async"in a)||!!a.async,i.src=e,a.attrs&&function(e,t){for(var r in t)e.setAttribute(r,t[r])}(i,a.attrs),a.text&&(i.text=""+a.text),("onload"in i?t:r)(i,s),i.onload||t(i,s),n.appendChild(i)}},497:(e,t,r)=>{"use strict";var a=r(218);function s(){}function n(){}n.resetWarningCache=s,e.exports=function(){function e(e,t,r,s,n,i){if(i!==a){var o=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw o.name="Invariant Violation",o}}function t(){return e}e.isRequired=e;var r={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:n,resetWarningCache:s};return r.PropTypes=r,r}},561:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={BUFFERING:3,ENDED:0,PAUSED:2,PLAYING:1,UNSTARTED:-1,VIDEO_CUED:5},e.exports=t.default},750:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=o(r(429)),s=o(r(866)),n=o(r(144)),i=o(r(101));function o(e){return e&&e.__esModule?e:{default:e}}var l=(0,a.default)("youtube-player"),d={proxyEvents:function(e){var t={},r=function(r){var a="on"+r.slice(0,1).toUpperCase()+r.slice(1);t[a]=function(t){l('event "%s"',a,t),e.trigger(r,t)}},a=!0,s=!1,i=void 0;try{for(var o,d=n.default[Symbol.iterator]();!(a=(o=d.next()).done);a=!0){r(o.value)}}catch(c){s=!0,i=c}finally{try{!a&&d.return&&d.return()}finally{if(s)throw i}}return t},promisifyPlayer:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r={},a=function(a){t&&i.default[a]?r[a]=function(){for(var t=arguments.length,r=Array(t),s=0;s<t;s++)r[s]=arguments[s];return e.then((function(e){var t=i.default[a],s=e.getPlayerState(),n=e[a].apply(e,r);return t.stateChangeRequired||Array.isArray(t.acceptableStates)&&-1===t.acceptableStates.indexOf(s)?new Promise((function(r){e.addEventListener("onStateChange",(function a(){var s=e.getPlayerState(),n=void 0;"number"===typeof t.timeout&&(n=setTimeout((function(){e.removeEventListener("onStateChange",a),r()}),t.timeout)),Array.isArray(t.acceptableStates)&&-1!==t.acceptableStates.indexOf(s)&&(e.removeEventListener("onStateChange",a),clearTimeout(n),r())}))})).then((function(){return n})):n}))}:r[a]=function(){for(var t=arguments.length,r=Array(t),s=0;s<t;s++)r[s]=arguments[s];return e.then((function(e){return e[a].apply(e,r)}))}},n=!0,o=!1,l=void 0;try{for(var d,c=s.default[Symbol.iterator]();!(n=(d=c.next()).done);n=!0){a(d.value)}}catch(u){o=!0,l=u}finally{try{!n&&c.return&&c.return()}finally{if(o)throw l}}return r}};t.default=d,e.exports=t.default},826:(e,t,r)=>{var a;function s(e){function r(){if(r.enabled){var e=r,s=+new Date,n=s-(a||s);e.diff=n,e.prev=a,e.curr=s,a=s;for(var i=new Array(arguments.length),o=0;o<i.length;o++)i[o]=arguments[o];i[0]=t.coerce(i[0]),"string"!==typeof i[0]&&i.unshift("%O");var l=0;i[0]=i[0].replace(/%([a-zA-Z%])/g,(function(r,a){if("%%"===r)return r;l++;var s=t.formatters[a];if("function"===typeof s){var n=i[l];r=s.call(e,n),i.splice(l,1),l--}return r})),t.formatArgs.call(e,i),(r.log||t.log||console.log.bind(console)).apply(e,i)}}return r.namespace=e,r.enabled=t.enabled(e),r.useColors=t.useColors(),r.color=function(e){var r,a=0;for(r in e)a=(a<<5)-a+e.charCodeAt(r),a|=0;return t.colors[Math.abs(a)%t.colors.length]}(e),"function"===typeof t.init&&t.init(r),r}(t=e.exports=s.debug=s.default=s).coerce=function(e){return e instanceof Error?e.stack||e.message:e},t.disable=function(){t.enable("")},t.enable=function(e){t.save(e),t.names=[],t.skips=[];for(var r=("string"===typeof e?e:"").split(/[\s,]+/),a=r.length,s=0;s<a;s++)r[s]&&("-"===(e=r[s].replace(/\*/g,".*?"))[0]?t.skips.push(new RegExp("^"+e.substr(1)+"$")):t.names.push(new RegExp("^"+e+"$")))},t.enabled=function(e){var r,a;for(r=0,a=t.skips.length;r<a;r++)if(t.skips[r].test(e))return!1;for(r=0,a=t.names.length;r<a;r++)if(t.names[r].test(e))return!0;return!1},t.humanize=r(445),t.names=[],t.skips=[],t.formatters={}},866:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=["cueVideoById","loadVideoById","cueVideoByUrl","loadVideoByUrl","playVideo","pauseVideo","stopVideo","getVideoLoadedFraction","cuePlaylist","loadPlaylist","nextVideo","previousVideo","playVideoAt","setShuffle","setLoop","getPlaylist","getPlaylistIndex","setOption","mute","unMute","isMuted","setVolume","getVolume","seekTo","getPlayerState","getPlaybackRate","setPlaybackRate","getAvailablePlaybackRates","getPlaybackQuality","setPlaybackQuality","getAvailableQualityLevels","getCurrentTime","getDuration","removeEventListener","getVideoUrl","getVideoEmbedCode","getOptions","getOption","addEventListener","destroy","setSize","getIframe"],e.exports=t.default}}]);
//# sourceMappingURL=37.9f0a5edd.chunk.js.map