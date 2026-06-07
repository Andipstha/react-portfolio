const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/initialFX-BYf8U4bE.js","assets/ScrollTrigger-B2JeSRMT.js","assets/splitText-cm-KeluB.js","assets/Character-B4JjR3hP.js","assets/rolldown-runtime-QTnfLwEv.js","assets/vendor-rapier-DUjlKX76.js","assets/vendor-drei-BJw30Hhk.js","assets/MainContainer-D9FjfsGg.js","assets/MainContainer-DPpRBS1I.css"])))=>i.map(i=>d[i]);
import{r as e,t}from"./rolldown-runtime-QTnfLwEv.js";import{Qt as n,Xt as r}from"./vendor-drei-BJw30Hhk.js";import{t as i}from"./vendor-react-Bv9Kvirq.js";import{r as a}from"./vendor-rapier-DUjlKX76.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var o=e(n(),1),s=e(i(),1),c=e(t((e=>{function t(e){if(!e||typeof window>`u`)return;let t=document.createElement(`style`);return t.setAttribute(`type`,`text/css`),t.innerHTML=e,document.head.appendChild(t),e}Object.defineProperty(e,"__esModule",{value:!0});var r=n();function i(e){return e&&typeof e==`object`&&`default`in e?e:{default:e}}var a=i(r);t(`.rfm-marquee-container {
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  position: relative;
  width: var(--width);
  transform: var(--transform);
}
.rfm-marquee-container:hover div {
  animation-play-state: var(--pause-on-hover);
}
.rfm-marquee-container:active div {
  animation-play-state: var(--pause-on-click);
}

.rfm-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
}
.rfm-overlay::before, .rfm-overlay::after {
  background: linear-gradient(to right, var(--gradient-color), rgba(255, 255, 255, 0));
  content: "";
  height: 100%;
  position: absolute;
  width: var(--gradient-width);
  z-index: 2;
  pointer-events: none;
  touch-action: none;
}
.rfm-overlay::after {
  right: 0;
  top: 0;
  transform: rotateZ(180deg);
}
.rfm-overlay::before {
  left: 0;
  top: 0;
}

.rfm-marquee {
  flex: 0 0 auto;
  min-width: var(--min-width);
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  animation: scroll var(--duration) linear var(--delay) var(--iteration-count);
  animation-play-state: var(--play);
  animation-delay: var(--delay);
  animation-direction: var(--direction);
}
@keyframes scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.rfm-initial-child-container {
  flex: 0 0 auto;
  display: flex;
  min-width: auto;
  flex-direction: row;
  align-items: center;
}

.rfm-child {
  transform: var(--transform);
}`),e.default=r.forwardRef(function({style:e={},className:t=``,autoFill:n=!1,play:i=!0,pauseOnHover:o=!1,pauseOnClick:s=!1,direction:c=`left`,speed:l=50,delay:u=0,loop:d=0,gradient:f=!1,gradientColor:p=`white`,gradientWidth:m=200,onFinish:h,onCycleComplete:g,onMount:_,children:v},y){let[b,x]=r.useState(0),[S,C]=r.useState(0),[w,T]=r.useState(1),[E,D]=r.useState(!1),O=r.useRef(null),k=y||O,A=r.useRef(null),j=r.useCallback(()=>{if(A.current&&k.current){let e=k.current.getBoundingClientRect(),t=A.current.getBoundingClientRect(),r=e.width,i=t.width;(c===`up`||c===`down`)&&(r=e.height,i=t.height),T(n&&r&&i&&i<r?Math.ceil(r/i):1),x(r),C(i)}},[n,k,c]);r.useEffect(()=>{if(E&&(j(),A.current&&k.current)){let e=new ResizeObserver(()=>j());return e.observe(k.current),e.observe(A.current),()=>{e&&e.disconnect()}}},[j,k,E]),r.useEffect(()=>{j()},[j,v]),r.useEffect(()=>{D(!0)},[]),r.useEffect(()=>{typeof _==`function`&&_()},[]);let M=r.useMemo(()=>n?S*w/l:S<b?b/l:S/l,[n,b,S,w,l]),N=r.useMemo(()=>Object.assign(Object.assign({},e),{"--pause-on-hover":!i||o?`paused`:`running`,"--pause-on-click":!i||o&&!s||s?`paused`:`running`,"--width":c===`up`||c===`down`?`100vh`:`100%`,"--transform":c===`up`?`rotate(-90deg)`:c===`down`?`rotate(90deg)`:`none`}),[e,i,o,s,c]),P=r.useMemo(()=>({"--gradient-color":p,"--gradient-width":typeof m==`number`?`${m}px`:m}),[p,m]),F=r.useMemo(()=>({"--play":i?`running`:`paused`,"--direction":c===`left`?`normal`:`reverse`,"--duration":`${M}s`,"--delay":`${u}s`,"--iteration-count":d?`${d}`:`infinite`,"--min-width":n?`auto`:`100%`}),[i,c,M,u,d,n]),I=r.useMemo(()=>({"--transform":c===`up`?`rotate(90deg)`:c===`down`?`rotate(-90deg)`:`none`}),[c]),L=r.useCallback(e=>[...Array(Number.isFinite(e)&&e>=0?e:0)].map((e,t)=>a.default.createElement(r.Fragment,{key:t},r.Children.map(v,e=>a.default.createElement(`div`,{style:I,className:`rfm-child`},e)))),[I,v]);return E?a.default.createElement(`div`,{ref:k,style:N,className:`rfm-marquee-container `+t},f&&a.default.createElement(`div`,{style:P,className:`rfm-overlay`}),a.default.createElement(`div`,{className:`rfm-marquee`,style:F,onAnimationIteration:g,onAnimationEnd:h},a.default.createElement(`div`,{className:`rfm-initial-child-container`,ref:A},r.Children.map(v,e=>a.default.createElement(`div`,{style:I,className:`rfm-child`},e))),L(w-1)),a.default.createElement(`div`,{className:`rfm-marquee`,style:F},L(w))):null})}))(),1),l=r(),u=c.default.default??c.default,d=({percent:e})=>{let{setIsLoading:t}=m(),[n,r]=(0,o.useState)(!1),[i,s]=(0,o.useState)(!1),[c,d]=(0,o.useState)(!1);(0,o.useEffect)(()=>{if(e<100)return;let t,n;return t=setTimeout(()=>{r(!0),n=setTimeout(()=>{s(!0)},1e3)},600),()=>{clearTimeout(t),clearTimeout(n)}},[e>=100]),(0,o.useEffect)(()=>{if(!i)return;let e=!1,n;return a(()=>import(`./initialFX-BYf8U4bE.js`).then(r=>{e||(d(!0),n=setTimeout(()=>{e||(r.initialFX&&r.initialFX(),t(!1))},900))}),__vite__mapDeps([0,1,2])),()=>{e=!0,clearTimeout(n)}},[i]);function f(e){let{currentTarget:t}=e,n=t.getBoundingClientRect(),r=e.clientX-n.left,i=e.clientY-n.top;t.style.setProperty(`--mouse-x`,`${r}px`),t.style.setProperty(`--mouse-y`,`${i}px`)}return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(`div`,{className:`loading-header`,children:[(0,l.jsx)(`a`,{href:`/#`,className:`loader-title`,"data-cursor":`disable`,children:`SANDIP`}),(0,l.jsx)(`div`,{className:`loaderGame ${c&&`loader-out`}`,children:(0,l.jsxs)(`div`,{className:`loaderGame-container`,children:[(0,l.jsx)(`div`,{className:`loaderGame-in`,children:[...Array(27)].map((e,t)=>(0,l.jsx)(`div`,{className:`loaderGame-line`},t))}),(0,l.jsx)(`div`,{className:`loaderGame-ball`})]})})]}),(0,l.jsxs)(`div`,{className:`loading-screen`,children:[(0,l.jsx)(`div`,{className:`loading-marquee`,children:(0,l.jsxs)(u,{children:[(0,l.jsx)(`span`,{children:` A Creative Developer`}),` `,(0,l.jsx)(`span`,{children:`A Creative Designer`}),(0,l.jsx)(`span`,{children:` A Creative Developer`}),` `,(0,l.jsx)(`span`,{children:`A Creative Designer`})]})}),(0,l.jsxs)(`div`,{className:`loading-wrap ${c&&`loading-clicked`}`,onMouseMove:e=>f(e),children:[(0,l.jsx)(`div`,{className:`loading-hover`}),(0,l.jsxs)(`div`,{className:`loading-button ${n&&`loading-complete`}`,children:[(0,l.jsxs)(`div`,{className:`loading-container`,children:[(0,l.jsx)(`div`,{className:`loading-content`,children:(0,l.jsxs)(`div`,{className:`loading-content-in`,children:[`Loading `,(0,l.jsxs)(`span`,{children:[e,`%`]})]})}),(0,l.jsx)(`div`,{className:`loading-box`})]}),(0,l.jsx)(`div`,{className:`loading-content2`,children:(0,l.jsx)(`span`,{children:`Welcome`})})]})]})]})]})},f=(0,o.createContext)(null),p=({children:e})=>{let[t,n]=(0,o.useState)(!0),[r,i]=(0,o.useState)(0),a={isLoading:t,setIsLoading:n,setLoading:i};return(0,l.jsxs)(f.Provider,{value:a,children:[t&&(0,l.jsx)(d,{percent:r}),(0,l.jsx)(`main`,{className:`main-body`,children:e})]})},m=()=>{let e=(0,o.useContext)(f);if(!e)throw Error(`useLoading must be used within a LoadingProvider`);return e},h=(0,o.lazy)(()=>a(()=>import(`./Character-B4JjR3hP.js`),__vite__mapDeps([3,4,5,6,1]))),g=(0,o.lazy)(()=>a(()=>import(`./MainContainer-D9FjfsGg.js`),__vite__mapDeps([7,4,5,6,1,2,8])));(0,s.createRoot)(document.getElementById(`root`)).render((0,l.jsx)(o.StrictMode,{children:(0,l.jsx)(()=>(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(p,{children:(0,l.jsx)(o.Suspense,{children:(0,l.jsx)(g,{children:(0,l.jsx)(o.Suspense,{children:(0,l.jsx)(h,{})})})})})}),{})}));export{m as t};