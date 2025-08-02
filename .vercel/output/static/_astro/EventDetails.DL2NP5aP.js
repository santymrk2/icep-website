import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.BVOCwoKb.js";import{M as T,b as W,u as L,P as B,o as V,h as H,q as K,m as z}from"./lenis.C4viSG1Y.js";class O extends a.Component{getSnapshotBeforeUpdate(s){const r=this.props.childRef.current;if(r&&s.isPresent&&!this.props.isPresent){const t=r.offsetParent,o=W(t)&&t.offsetWidth||0,i=this.props.sizeRef.current;i.height=r.offsetHeight||0,i.width=r.offsetWidth||0,i.top=r.offsetTop,i.left=r.offsetLeft,i.right=o-i.width-i.left}return null}componentDidUpdate(){}render(){return this.props.children}}function q({children:n,isPresent:s,anchorX:r,root:t}){const o=a.useId(),i=a.useRef(null),u=a.useRef({width:0,height:0,top:0,left:0,right:0}),{nonce:p}=a.useContext(T);return a.useInsertionEffect(()=>{const{width:g,height:c,top:j,left:l,right:m}=u.current;if(s||!i.current||!g||!c)return;const f=r==="left"?`left: ${l}`:`right: ${m}`;i.current.dataset.motionPopId=o;const h=document.createElement("style");p&&(h.nonce=p);const x=t??document.head;return x.appendChild(h),h.sheet&&h.sheet.insertRule(`
          [data-motion-pop-id="${o}"] {
            position: absolute !important;
            width: ${g}px !important;
            height: ${c}px !important;
            ${f}px !important;
            top: ${j}px !important;
          }
        `),()=>{x.contains(h)&&x.removeChild(h)}},[s]),e.jsx(O,{isPresent:s,childRef:i,sizeRef:u,children:a.cloneElement(n,{ref:i})})}const X=({children:n,initial:s,isPresent:r,onExitComplete:t,custom:o,presenceAffectsLayout:i,mode:u,anchorX:p,root:g})=>{const c=L(Z),j=a.useId();let l=!0,m=a.useMemo(()=>(l=!1,{id:j,initial:s,isPresent:r,custom:o,onExitComplete:f=>{c.set(f,!0);for(const h of c.values())if(!h)return;t&&t()},register:f=>(c.set(f,!1),()=>c.delete(f))}),[r,c,t]);return i&&l&&(m={...m}),a.useMemo(()=>{c.forEach((f,h)=>c.set(h,!1))},[r]),a.useEffect(()=>{!r&&!c.size&&t&&t()},[r]),u==="popLayout"&&(n=e.jsx(q,{isPresent:r,anchorX:p,root:g,children:n})),e.jsx(B.Provider,{value:m,children:n})};function Z(){return new Map}const w=n=>n.key||"";function R(n){const s=[];return a.Children.forEach(n,r=>{a.isValidElement(r)&&s.push(r)}),s}const F=({children:n,custom:s,initial:r=!0,onExitComplete:t,presenceAffectsLayout:o=!0,mode:i="sync",propagate:u=!1,anchorX:p="left",root:g})=>{const[c,j]=V(u),l=a.useMemo(()=>R(n),[n]),m=u&&!c?[]:l.map(w),f=a.useRef(!0),h=a.useRef(l),x=L(()=>new Map),[D,I]=a.useState(l),[k,M]=a.useState(l);H(()=>{f.current=!1,h.current=l;for(let y=0;y<k.length;y++){const d=w(k[y]);m.includes(d)?x.delete(d):x.get(d)!==!0&&x.set(d,!1)}},[k,m.length,m.join("-")]);const C=[];if(l!==D){let y=[...l];for(let d=0;d<k.length;d++){const v=k[d],N=w(v);m.includes(N)||(y.splice(d,0,v),C.push(v))}return i==="wait"&&C.length&&(y=C),M(R(y)),I(l),null}const{forceRender:U}=a.useContext(K);return e.jsx(e.Fragment,{children:k.map(y=>{const d=w(y),v=u&&!c?!1:l===k||m.includes(d),N=()=>{if(x.has(d))x.set(d,!0);else return;let E=!0;x.forEach(S=>{S||(E=!1)}),E&&(U?.(),M(h.current),u&&j?.(),t&&t())};return e.jsx(X,{isPresent:v,initial:!f.current||r?void 0:!1,custom:s,presenceAffectsLayout:o,mode:i,root:g,onExitComplete:v?void 0:N,anchorX:p,children:y},d)})})};/**
 * @license lucide-react v0.535.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Y=n=>n.replace(/^([A-Z])|[\s-_]+(\w)/g,(s,r,t)=>t?t.toUpperCase():r.toLowerCase()),_=n=>{const s=Y(n);return s.charAt(0).toUpperCase()+s.slice(1)},A=(...n)=>n.filter((s,r,t)=>!!s&&s.trim()!==""&&t.indexOf(s)===r).join(" ").trim(),J=n=>{for(const s in n)if(s.startsWith("aria-")||s==="role"||s==="title")return!0};/**
 * @license lucide-react v0.535.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Q={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.535.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=a.forwardRef(({color:n="currentColor",size:s=24,strokeWidth:r=2,absoluteStrokeWidth:t,className:o="",children:i,iconNode:u,...p},g)=>a.createElement("svg",{ref:g,...Q,width:s,height:s,stroke:n,strokeWidth:t?Number(r)*24/Number(s):r,className:A("lucide",o),...!i&&!J(p)&&{"aria-hidden":"true"},...p},[...u.map(([c,j])=>a.createElement(c,j)),...Array.isArray(i)?i:[i]]));/**
 * @license lucide-react v0.535.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=(n,s)=>{const r=a.forwardRef(({className:t,...o},i)=>a.createElement(ee,{ref:i,iconNode:s,className:A(`lucide-${G(_(n))}`,`lucide-${n}`,t),...o}));return r.displayName=_(n),r};/**
 * @license lucide-react v0.535.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],se=b("book-open",te);/**
 * @license lucide-react v0.535.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ne=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],P=b("calendar",ne);/**
 * @license lucide-react v0.535.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const re=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],ie=b("clock",re);/**
 * @license lucide-react v0.535.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae=[["path",{d:"M12 19v3",key:"npa21l"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["rect",{x:"9",y:"2",width:"6",height:"13",rx:"3",key:"s6n7sd"}]],oe=b("mic",ae);/**
 * @license lucide-react v0.535.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ce=[["path",{d:"M9 18V5l12-2v13",key:"1jmyc2"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["circle",{cx:"18",cy:"16",r:"3",key:"1hluhg"}]],$=b("music",ce);/**
 * @license lucide-react v0.535.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],de=b("play",le);/**
 * @license lucide-react v0.535.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],he=b("user",ue);/**
 * @license lucide-react v0.535.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],me=b("x",pe);function ge({events:n,onClose:s}){if(!n.length)return null;const r=t=>{const o=[{icon:se,label:"Enseñanza",value:t.enseñanza},{icon:he,label:"Presidencia",value:t.presidencia},{icon:$,label:"Alabanza",value:t.alabanza},{icon:oe,label:"Predicación",value:t.predicacion},{icon:$,label:"Participación Musical",value:t.participacionMusical}].filter(i=>i.value);return e.jsxs("div",{className:"bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-xl max-w-5xl w-full max-h-[80vh] overflow-y-auto shadow-2xl",children:[e.jsxs("div",{className:"relative p-6",children:[e.jsx("div",{className:"absolute inset-0 bg-white/10 backdrop-blur-sm rounded-t-xl"}),e.jsxs("div",{className:"relative z-10",children:[e.jsxs("div",{className:"inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm font-medium mb-4",children:[e.jsx(P,{size:16}),"Evento"]}),e.jsx("h2",{className:"text-2xl md:text-3xl font-bold mb-3",children:t.type||"REUNIÓN"}),t.startDate&&e.jsxs("div",{className:"flex items-center gap-4 text-white/90 flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(P,{size:18}),e.jsx("span",{children:new Date(t.startDate).toLocaleDateString("es-AR",{weekday:"long",day:"numeric",month:"long",year:"numeric"})})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(ie,{size:18}),e.jsxs("span",{children:[new Date(t.startDate).toLocaleTimeString("es-AR",{hour:"2-digit",minute:"2-digit",hour12:!1})," ","hs"]})]})]})]})]}),e.jsxs("div",{className:"p-6",children:[t.subtema&&e.jsx("div",{className:"bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6",children:e.jsx("h3",{className:"text-lg font-semibold",children:t.subtema})}),o.length>0&&e.jsxs("div",{className:"mb-6",children:[e.jsx("h4",{className:"text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4",children:"Participantes"}),e.jsx("div",{className:"grid gap-3 md:grid-cols-2",children:o.map((i,u)=>{const p=i.icon;return e.jsxs("div",{className:"flex items-center gap-3 p-3 bg-neutral-800/50 rounded-xl",children:[e.jsx("div",{className:"w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center",children:e.jsx(p,{size:18,className:"text-blue-500"})}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-400",children:i.label}),e.jsx("p",{className:"text-white font-medium",children:i.value})]})]},u)})})]}),t.contenido&&e.jsxs("div",{className:"mb-6",children:[e.jsx("h4",{className:"text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4",children:"Contenido"}),e.jsx("div",{className:"bg-neutral-800/30 rounded-xl p-4 text-gray-300 whitespace-pre-wrap",children:t.contenido})]}),t.youtubeLink&&e.jsx("div",{className:"pt-4",children:e.jsxs("a",{href:t.youtubeLink,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition",children:[e.jsx(de,{size:20}),"Ver mensaje en YouTube"]})})]})]})};return e.jsxs(F,{children:[e.jsx(z.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.3},className:"fixed inset-0 bg-black/60 backdrop-blur-md z-40",onClick:s},"backdrop"),e.jsx("button",{onClick:s,className:`fixed top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full
                   bg-white/20 hover:bg-white/30 text-white flex items-center
                   justify-center z-[9999] transition-transform hover:scale-110`,"aria-label":"Cerrar todos",children:e.jsx(me,{size:20})},"close-btn"),e.jsx("div",{className:"fixed inset-0 flex flex-col items-center justify-center gap-6 z-50 p-4 pointer-events-none",children:n.map((t,o)=>e.jsx(z.div,{initial:{opacity:0,y:40},animate:{opacity:1,y:0},exit:{opacity:0,y:-40},transition:{duration:.3,delay:o*.1},className:"pointer-events-auto",children:r(t)},t.id||o))})]})}export{F as A,ge as E};
