import{a as gn,b as bn,e as Pn,f as Bn,g as On,h as Ln,i as jn,j as Nn,k as Hn,l as Vn,m as zn,n as Wn,o as $n,p as le}from"./chunk-P4YJ722E.js";import{b as K,c as Un,d as ht,h as Jn,i as Pe}from"./chunk-5F5YWDSQ.js";import{a as Zn,b as Qn,d as Kn}from"./chunk-3EEAHJHQ.js";import"./chunk-SPTMP25W.js";import{a as Xn,b as Yn}from"./chunk-T3UINLGK.js";import{a as mn,b as hn,c as pn,d as fn}from"./chunk-7XVP7IES.js";import{b as qn,c as Gn}from"./chunk-Y33DTMOG.js";import{d as kn,e as Sn,f as Tn,g as Dn,h as In,i as Fn,j as An,k as Rn}from"./chunk-B4H7PBP6.js";import{B as En,a as Ae,b as ut,e as C,f as O,l as mt,o as wn,s as yn,t as Cn,w as xn,z as Mn}from"./chunk-GCLLWDUW.js";import{f as vn}from"./chunk-NXCQZUDF.js";import{a as _n,b as Re}from"./chunk-EDSP7W4E.js";import{a as un}from"./chunk-F7NEVK2H.js";import{$,$b as lt,A as Nt,Ac as an,B as ie,Ba as $t,Ca as Ut,Ea as qt,Eb as de,F as Ht,Fa as oe,Fb as R,G as Je,Gb as P,H as Xe,Ha as Gt,I as Vt,Ia as M,Ib as rt,Ic as sn,Ja as Zt,Jb as ot,Jc as dn,Kb as at,Kc as ln,Lb as st,Lc as cn,Mb as m,Nb as h,Ob as Se,Pc as Fe,Q as Ye,Rc as ct,S as et,T as zt,Tb as Z,U as x,Ub as Yt,Vb as E,Xb as S,Yb as T,Zb as f,_ as Wt,_b as dt,a as F,ac as H,b as Bt,ba as j,bc as V,da as a,db as N,dc as Te,eb as y,ec as De,g as b,gb as Qt,gc as Ie,hb as ae,hc as k,ia as U,ib as Kt,ja as q,jb as Jt,jc as Q,k as Ot,kc as en,lc as tn,m as Lt,ma as tt,mc as nn,na as nt,nc as rn,oc as on,pc as B,qa as re,r as W,ra as A,sb as p,tb as G,ua as ke,ub as it,x as jt,xb as se,yb as Xt}from"./chunk-4ZCCQPO5.js";var Fi="https://stackblitz.com",ei=["angular-cli","create-react-app","html","javascript","node","polymer","typescript","vue"],Ai=["project","search","ports","settings"],Ri=["light","dark"],Pi=["editor","preview"],Bi=["accelerometer","ambient-light-sensor","autoplay","battery","bluetooth","camera","clipboard-read","clipboard-write","display-capture","encrypted-media","fullscreen","gamepad","geolocation","gyroscope","hid","idle-detection","local-network","local-network-access","loopback-network","magnetometer","microphone","midi","payment","picture-in-picture","publickey-credentials-get","screen-wake-lock","serial","usb","web-share","xr-spatial-tracking"],ti={clickToLoad:t=>z("ctl",t),devToolsHeight:t=>ni("devtoolsheight",t),forceEmbedLayout:t=>z("embed",t),hideDevTools:t=>z("hidedevtools",t),hideExplorer:t=>z("hideExplorer",t),hideNavigation:t=>z("hideNavigation",t),openFile:t=>Be("file",t),showSidebar:t=>Oi("showSidebar",t),sidebarView:t=>pt("sidebarView",t,Ai),startScript:t=>Be("startScript",t),terminalHeight:t=>ni("terminalHeight",t),theme:t=>pt("theme",t,Ri),view:t=>pt("view",t,Pi),zenMode:t=>z("zenMode",t),organization:t=>`${Be("orgName",t?.name)}&${Be("orgProvider",t?.provider)}`,crossOriginIsolated:t=>z("corp",t)};function ii(t={}){let r=Object.entries(t).map(([e,n])=>n!=null&&ti.hasOwnProperty(e)?ti[e](n):"").filter(Boolean);return r.length?`?${r.join("&")}`:""}function z(t,r){return r===!0?`${t}=1`:""}function Oi(t,r){return typeof r=="boolean"?`${t}=${r?"1":"0"}`:""}function ni(t,r){if(typeof r=="number"&&!Number.isNaN(r)){let e=Math.min(100,Math.max(0,r));return`${t}=${encodeURIComponent(Math.round(e))}`}return""}function pt(t,r="",e=[]){return e.includes(r)?`${t}=${encodeURIComponent(r)}`:""}function Be(t,r){return(Array.isArray(r)?r:[r]).filter(n=>typeof n=="string"&&n.trim()!=="").map(n=>`${t}=${encodeURIComponent(n)}`).join("&")}function ri(){return Math.random().toString(36).slice(2,6)+Math.random().toString(36).slice(2,6)}function bt(t,r){return`${wt(r)}${t}${ii(r)}`}function vt(t,r){let e={forceEmbedLayout:!0};return r&&typeof r=="object"&&Object.assign(e,r),`${wt(e)}${t}${ii(e)}`}function wt(t={}){return(typeof t.origin=="string"?t.origin:Fi).replace(/\/$/,"")}function yt(t,r,e){if(!r||!t||!t.parentNode)throw new Error("Invalid Element");t.id&&(r.id=t.id),t.className&&(r.className=t.className),Li(r,e),ji(t,r,e),t.replaceWith(r)}function Ct(t){if(typeof t=="string"){let r=document.getElementById(t);if(!r)throw new Error(`Could not find element with id '${t}'`);return r}else if(t instanceof HTMLElement)return t;throw new Error(`Invalid element: ${t}`)}function xt(t){return t&&t.newWindow===!1?"_self":"_blank"}function Li(t,r={}){let e=Object.hasOwnProperty.call(r,"height")?`${r.height}`:"300",n=Object.hasOwnProperty.call(r,"width")?`${r.width}`:void 0;t.setAttribute("height",e),n?t.setAttribute("width",n):t.setAttribute("style","width:100%;")}function ji(t,r,e={}){let n=t.allow?.split(";")?.map(o=>o.trim()).filter(Boolean)??[],i=new Set(n.map(o=>o.split(/\s+/)[0]));for(let o of Ni())i.has(o)||(n.push(`${o} *`),i.add(o));e.crossOriginIsolated&&!i.has("cross-origin-isolated")&&(n.push(`cross-origin-isolated ${wt(e)}`),i.add("cross-origin-isolated")),n.length>0&&(r.allow=n.join("; "))}function Ni(){let t=new Set(Bi);try{let r=document?.featurePolicy;if(r&&typeof r.allowedFeatures=="function")for(let e of r.allowedFeatures())t.add(e)}catch{}return t.delete("cross-origin-isolated"),[...t]}var ft=class{constructor(r){this.pending={},this.port=r,this.port.onmessage=this.messageListener.bind(this)}request({type:r,payload:e}){return new Promise((n,i)=>{let o=ri();this.pending[o]={resolve:n,reject:i},this.port.postMessage({type:r,payload:Bt(F({},e),{__reqid:o})})})}messageListener(r){if(typeof r.data.payload?.__reqid!="string")return;let{type:e,payload:n}=r.data,{__reqid:i,__success:o,__error:s}=n;this.pending[i]&&(o?this.pending[i].resolve(this.cleanResult(n)):this.pending[i].reject(s?`${e}: ${s}`:e),delete this.pending[i])}cleanResult(r){let e=F({},r);return delete e.__reqid,delete e.__success,delete e.__error,Object.keys(e).length?e:null}},_t=class{constructor(r,e){this.editor={openFile:n=>this._rdc.request({type:"SDK_OPEN_FILE",payload:{path:n}}),setCurrentFile:n=>this._rdc.request({type:"SDK_SET_CURRENT_FILE",payload:{path:n}}),setTheme:n=>this._rdc.request({type:"SDK_SET_UI_THEME",payload:{theme:n}}),setView:n=>this._rdc.request({type:"SDK_SET_UI_VIEW",payload:{view:n}}),showSidebar:(n=!0)=>this._rdc.request({type:"SDK_TOGGLE_SIDEBAR",payload:{visible:n}})},this.preview={origin:"",getUrl:()=>this._rdc.request({type:"SDK_GET_PREVIEW_URL",payload:{}}).then(n=>n?.url??null),setUrl:(n="/")=>{if(typeof n!="string"||!n.startsWith("/"))throw new Error(`Invalid argument: expected a path starting with '/', got '${n}'`);return this._rdc.request({type:"SDK_SET_PREVIEW_URL",payload:{path:n}})}},this._rdc=new ft(r),Object.defineProperty(this.preview,"origin",{value:typeof e.previewOrigin=="string"?e.previewOrigin:null,writable:!1})}applyFsDiff(r){let e=n=>n!==null&&typeof n=="object";if(!e(r)||!e(r.create))throw new Error("Invalid diff object: expected diff.create to be an object.");if(!Array.isArray(r.destroy))throw new Error("Invalid diff object: expected diff.destroy to be an array.");return this._rdc.request({type:"SDK_APPLY_FS_DIFF",payload:r})}getDependencies(){return this._rdc.request({type:"SDK_GET_DEPS_SNAPSHOT",payload:{}})}getFsSnapshot(){return this._rdc.request({type:"SDK_GET_FS_SNAPSHOT",payload:{}})}},Oe=[],gt=class{constructor(r){this.id=ri(),this.element=r,this.pending=new Promise((e,n)=>{let i=({data:u,ports:_})=>{u?.action==="SDK_INIT_SUCCESS"&&u.id===this.id&&(this.vm=new _t(_[0],u.payload),e(this.vm),s())},o=()=>{this.element.contentWindow?.postMessage({action:"SDK_INIT",id:this.id},"*")};function s(){window.clearInterval(c),window.removeEventListener("message",i)}window.addEventListener("message",i),o();let d=0,c=window.setInterval(()=>{if(this.vm){s();return}if(d>=20){s(),n("Timeout: Unable to establish a connection with the StackBlitz VM"),Oe.forEach((u,_)=>{u.id===this.id&&Oe.splice(_,1)});return}d++,o()},500)}),Oe.push(this)}},Hi=t=>{let r=t instanceof Element?"element":"id";return Oe.find(e=>e[r]===t)??null};function Vi(t,r){let e=document.createElement("input");return e.type="hidden",e.name=t,e.value=r,e}function zi(t){return t.replace(/\[/g,"%5B").replace(/\]/g,"%5D")}function oi({template:t,title:r,description:e,dependencies:n,files:i,settings:o}){if(!ei.includes(t)){let u=ei.map(_=>`'${_}'`).join(", ");console.warn(`Unsupported project.template: must be one of ${u}`)}let s=[],d=(u,_,ze="")=>{s.push(Vi(u,typeof _=="string"?_:ze))};d("project[title]",r),typeof e=="string"&&e.length>0&&d("project[description]",e),d("project[template]",t,"javascript"),n&&(t==="node"?console.warn("Invalid project.dependencies: dependencies must be provided as a 'package.json' file when using the 'node' template."):d("project[dependencies]",JSON.stringify(n))),o&&d("project[settings]",JSON.stringify(o)),Object.entries(i).forEach(([u,_])=>{d(`project[files][${zi(u)}]`,_)});let c=document.createElement("form");return c.method="POST",c.setAttribute("style","display:none!important;"),c.append(...s),c}function Wi(t,r){let e=oi(t);return e.action=vt("/run",r),e.id="sb_run",`<!doctype html>
<html>
<head><title></title></head>
<body>
  ${e.outerHTML}
  <script>document.getElementById('${e.id}').submit();<\/script>
</body>
</html>`}function $i(t,r){let e=oi(t);e.action=bt("/run",r),e.target=xt(r),document.body.appendChild(e),e.submit(),document.body.removeChild(e)}function Le(t){return t?.contentWindow?(Hi(t)??new gt(t)).pending:Promise.reject("Provided element is not an iframe.")}function Ui(t,r){$i(t,r)}function qi(t,r){let e=bt(`/edit/${t}`,r),n=xt(r);window.open(e,n)}function Gi(t,r){let e=bt(`/github/${t}`,r),n=xt(r);window.open(e,n)}function Zi(t,r,e){let n=Ct(t),i=Wi(r,e),o=document.createElement("iframe");return yt(n,o,e),o.contentDocument?.write(i),Le(o)}function Qi(t,r,e){let n=Ct(t),i=document.createElement("iframe");return i.src=vt(`/edit/${r}`,e),yt(n,i,e),Le(i)}function Ki(t,r,e){let n=Ct(t),i=document.createElement("iframe");return i.src=vt(`/github/${r}`,e),yt(n,i,e),Le(i)}var ai={connect:Le,embedGithubProject:Ki,embedProject:Zi,embedProjectId:Qi,openGithubProject:Gi,openProject:Ui,openProjectId:qi};var si=t=>typeof t=="object"&&t!=null&&t.nodeType===1,di=(t,r)=>(!r||t!=="hidden")&&t!=="visible"&&t!=="clip",je=(t,r)=>{if(t.clientHeight<t.scrollHeight||t.clientWidth<t.scrollWidth){let e=getComputedStyle(t,null);return di(e.overflowY,r)||di(e.overflowX,r)||(n=>{let i=(o=>{if(!o.ownerDocument||!o.ownerDocument.defaultView)return null;try{return o.ownerDocument.defaultView.frameElement}catch{return null}})(n);return!!i&&(i.clientHeight<n.scrollHeight||i.clientWidth<n.scrollWidth)})(t)}return!1},Ne=(t,r,e,n,i,o,s,d)=>o<t&&s>r||o>t&&s<r?0:o<=t&&d<=e||s>=r&&d>=e?o-t-n:s>r&&d<e||o<t&&d>e?s-r+i:0,Ji=t=>{let r=t.parentElement;return r??(t.getRootNode().host||null)},Mt=(t,r)=>{var e,n,i,o;if(typeof document>"u")return[];let{scrollMode:s,block:d,inline:c,boundary:u,skipOverflowHiddenElements:_}=r,ze=typeof u=="function"?u:L=>L!==u;if(!si(t))throw new TypeError("Invalid target");let We=document.scrollingElement||document.documentElement,me=[],g=t;for(;si(g)&&ze(g);){if(g=Ji(g),g===We){me.push(g);break}g!=null&&g===document.body&&je(g)&&!je(document.documentElement)||g!=null&&je(g,_)&&me.push(g)}let J=(n=(e=window.visualViewport)==null?void 0:e.width)!=null?n:innerWidth,X=(o=(i=window.visualViewport)==null?void 0:i.height)!=null?o:innerHeight,{scrollX:Y,scrollY:ee}=window,{height:te,width:ne,top:he,right:$e,bottom:Ue,left:pe}=t.getBoundingClientRect(),{top:Dt,right:It,bottom:Ft,left:At}=(L=>{let l=window.getComputedStyle(L);return{top:parseFloat(l.scrollMarginTop)||0,right:parseFloat(l.scrollMarginRight)||0,bottom:parseFloat(l.scrollMarginBottom)||0,left:parseFloat(l.scrollMarginLeft)||0}})(t),v=d==="start"||d==="nearest"?he-Dt:d==="end"?Ue+Ft:he+te/2-Dt+Ft,w=c==="center"?pe+ne/2-At+It:c==="end"?$e+It:pe-At,qe=[];for(let L=0;L<me.length;L++){let l=me[L],{height:fe,width:_e,top:ge,right:Ge,bottom:Ze,left:be}=l.getBoundingClientRect();if(s==="if-needed"&&he>=0&&pe>=0&&Ue<=X&&$e<=J&&(l===We&&!je(l)||he>=ge&&Ue<=Ze&&pe>=be&&$e<=Ge))return qe;let ve=getComputedStyle(l),we=parseInt(ve.borderLeftWidth,10),ye=parseInt(ve.borderTopWidth,10),Ce=parseInt(ve.borderRightWidth,10),xe=parseInt(ve.borderBottomWidth,10),D=0,I=0,Me="offsetWidth"in l?l.offsetWidth-l.clientWidth-we-Ce:0,Ee="offsetHeight"in l?l.offsetHeight-l.clientHeight-ye-xe:0,Qe="offsetWidth"in l?l.offsetWidth===0?0:_e/l.offsetWidth:0,Ke="offsetHeight"in l?l.offsetHeight===0?0:fe/l.offsetHeight:0;if(We===l)D=d==="start"?v:d==="end"?v-X:d==="nearest"?Ne(ee,ee+X,X,ye,xe,ee+v,ee+v+te,te):v-X/2,I=c==="start"?w:c==="center"?w-J/2:c==="end"?w-J:Ne(Y,Y+J,J,we,Ce,Y+w,Y+w+ne,ne),D=Math.max(0,D+ee),I=Math.max(0,I+Y);else{D=d==="start"?v-ge-ye:d==="end"?v-Ze+xe+Ee:d==="nearest"?Ne(ge,Ze,fe,ye,xe+Ee,v,v+te,te):v-(ge+fe/2)+Ee/2,I=c==="start"?w-be-we:c==="center"?w-(be+_e/2)+Me/2:c==="end"?w-Ge+Ce+Me:Ne(be,Ge,_e,we,Ce+Me,w,w+ne,ne);let{scrollLeft:Rt,scrollTop:Pt}=l;D=Ke===0?0:Math.max(0,Math.min(Pt+D/Ke,l.scrollHeight-fe/Ke+Ee)),I=Qe===0?0:Math.max(0,Math.min(Rt+I/Qe,l.scrollWidth-_e/Qe+Me)),v+=Pt-D,w+=Rt-I}qe.push({el:l,top:D,left:I})}return qe};var Xi=t=>t===!1?{block:"end",inline:"nearest"}:(r=>r===Object(r)&&Object.keys(r).length!==0)(t)?t:{block:"start",inline:"nearest"};function li(t,r){if(!t.isConnected||!(i=>{let o=i;for(;o&&o.parentNode;){if(o.parentNode===document)return!0;o=o.parentNode instanceof ShadowRoot?o.parentNode.host:o.parentNode}return!1})(t))return;let e=(i=>{let o=window.getComputedStyle(i);return{top:parseFloat(o.scrollMarginTop)||0,right:parseFloat(o.scrollMarginRight)||0,bottom:parseFloat(o.scrollMarginBottom)||0,left:parseFloat(o.scrollMarginLeft)||0}})(t);if((i=>typeof i=="object"&&typeof i.behavior=="function")(r))return r.behavior(Mt(t,r));let n=typeof r=="boolean"||r==null?void 0:r.behavior;for(let{el:i,top:o,left:s}of Mt(t,Xi(r))){let d=o-e.top+e.bottom,c=s-e.left+e.right;i.scroll({top:d,left:c,behavior:n})}}var ci="app/demo/examples/",ui=(()=>{class t{constructor(){this.http=a(un),this.fileCache=new Map,this.loadFile("example.css")}getDemoFiles(e){let n=this.fileCache.get(e);return n||(n=this.http.get(`${ci}${e}.component.ts`,{responseType:"text"}).pipe(zt(i=>this.loadAdditionnalFilesIfNecessary(i)),Ye(1)),this.fileCache.set(e,n),n)}loadAdditionnalFilesIfNecessary(e){let n=/'\.\/([\w-.]+\.\w+)'/g,i,o=[],s={"src/demo.ts":e};for(;i=n.exec(e);)o.push(this.loadFile(i[1]));return o.length?jt(o).pipe(W(d=>F(F({},Object.assign({},...d)),s))):Lt(s)}loadFile(e){let n=this.fileCache.get(e);return n||(n=this.http.get(`${ci}${e}`,{responseType:"text"}).pipe(W(i=>({[`src/${e}`]:i})),Ye(1)),this.fileCache.set(e,n),n)}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275prov=Wt({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();var mi="legacy-peer-deps=true",hi=`{
	"version": 1,
	"projects": {
		"demo": {
			"projectType": "application",
			"root": "",
			"sourceRoot": "src",
			"architect": {
				"build": {
					"builder": "@angular/build:application",
					"options": {
						"browser": "src/main.ts",
						"index": "src/index.html",
						"tsConfig": "tsconfig.app.json",
						"assets": [
							{
								"glob": "maplibre-gl-worker.mjs",
								"input": "node_modules/maplibre-gl/dist",
								"output": "/"
							},
							{
								"glob": "maplibre-gl-shared.mjs",
								"input": "node_modules/maplibre-gl/dist",
								"output": "/"
							}
						],
						"styles": ["src/styles.css"]
					}
				},
				"serve": {
					"builder": "@angular/build:dev-server",
					"options": { "buildTarget": "demo:build" }
				}
			}
		}
	}
}
`,pi=`
{
	"compilerOptions": {
		"target": "ES2022",
		"module": "ES2022",
		"moduleResolution": "bundler",
		"experimentalDecorators": true,
		"strict": true,
		"skipLibCheck": true,
		"esModuleInterop": true,
		"useDefineForClassFields": false
	},
	"angularCompilerOptions": { "strictTemplates": true }
}`,fi=`{
	"extends": "./tsconfig.json",
	"compilerOptions": {
		"outDir": "./out-tsc/app"
	},
	"files": ["src/main.ts"],
	"include": ["src/**/*.ts"]
}
`,_i=`<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>ngx-maplibre-gl example</title>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
	</head>
	<body>
		<showcase-demo></showcase-demo>
	</body>
</html>
`,gi=`import { bootstrapApplication } from '@angular/platform-browser';
import { provideMaplibreWorker } from '@maplibre/ngx-maplibre-gl/config';
import { ### } from './demo';

bootstrapApplication(###, {
	providers: [provideMaplibreWorker('maplibre-gl-worker.mjs')],
}).catch((err) => console.error(err));
`,bi=`
@import 'maplibre-gl/dist/maplibre-gl.css';

html, body {
  display: flex;
  flex: 1;
  min-height: 100vh;
  margin: 0;
}
`;function vi(t){let r=Object.fromEntries(Object.entries(t).sort(([e],[n])=>e.localeCompare(n)));return JSON.stringify({name:"demo",private:!0,scripts:{ng:"ng",start:"ng serve",build:"ng build"},dependencies:r},null,2)}function Yi(t){return t.replace(/(^\w|-\w)/g,er)}function er(t){return t.replace(/-/,"").toUpperCase()}function wi(t,r){return{files:F({"package.json":vi({"@angular/build":"^22","@angular/cli":"^22","@angular/compiler-cli":"^22","@angular/common":"^22","@angular/compiler":"^22","@angular/core":"^22","@angular/forms":"^22","@angular/platform-browser":"^22","@angular/router":"^22","@angular/material":"^22","@angular/cdk":"^22","maplibre-gl":"*","@maplibre/maplibre-gl-style-spec":"*","@maplibre/ngx-maplibre-gl":"*","@types/supercluster":"*","@types/geojson":"*"}),".npmrc":mi,"angular.json":hi,"tsconfig.json":pi,"tsconfig.app.json":fi,"src/index.html":_i,"src/main.ts":gi.replace(/###/g,Yi(r)+"Component"),"src/styles.css":bi},t),title:"ngx-maplibre-gl demo: "+r,description:"",template:"node"}}var tr=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275cmp=p({type:t,selectors:[["ng-component"]],hostAttrs:["cdk-text-field-style-loader",""],decls:0,vars:0,template:function(n,i){},styles:[`textarea.cdk-textarea-autosize {
  resize: none;
}

textarea.cdk-textarea-autosize-measuring {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: auto !important;
  overflow: hidden !important;
}

textarea.cdk-textarea-autosize-measuring-firefox {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: 0 !important;
}

@keyframes cdk-text-field-autofill-start { /*!*/ }
@keyframes cdk-text-field-autofill-end { /*!*/ }
.cdk-text-field-autofill-monitored:-webkit-autofill {
  animation: cdk-text-field-autofill-start 0s 1ms;
}

.cdk-text-field-autofill-monitored:not(:-webkit-autofill) {
  animation: cdk-text-field-autofill-end 0s 1ms;
}
`],encapsulation:2})}return t})(),nr={passive:!0},yi=(()=>{class t{_platform=a(O);_ngZone=a(A);_renderer=a(Qt).createRenderer(null,null);_styleLoader=a(vn);_monitoredElements=new Map;monitor(e){if(!this._platform.isBrowser)return Ot;this._styleLoader.load(tr);let n=ut(e),i=this._monitoredElements.get(n);if(i)return i.subject;let o=new b,s="cdk-text-field-autofilled",d=u=>{u.animationName==="cdk-text-field-autofill-start"&&!n.classList.contains(s)?(n.classList.add(s),this._ngZone.run(()=>o.next({target:u.target,isAutofilled:!0}))):u.animationName==="cdk-text-field-autofill-end"&&n.classList.contains(s)&&(n.classList.remove(s),this._ngZone.run(()=>o.next({target:u.target,isAutofilled:!1})))},c=this._ngZone.runOutsideAngular(()=>(n.classList.add("cdk-text-field-autofill-monitored"),this._renderer.listen(n,"animationstart",d,nr)));return this._monitoredElements.set(n,{subject:o,unlisten:c}),o}stopMonitoring(e){let n=ut(e),i=this._monitoredElements.get(n);i&&(i.unlisten(),i.subject.complete(),n.classList.remove("cdk-text-field-autofill-monitored"),n.classList.remove("cdk-text-field-autofilled"),this._monitoredElements.delete(n))}ngOnDestroy(){this._monitoredElements.forEach((e,n)=>this.stopMonitoring(n))}static \u0275fac=function(n){return new(n||t)};static \u0275prov=Gt({token:t,factory:t.\u0275fac})}return t})();var Ci=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=G({type:t});static \u0275inj=$({})}return t})();var xi=new j("MAT_INPUT_VALUE_ACCESSOR");var ir=["button","checkbox","file","hidden","image","radio","range","reset","submit"],rr=new j("MAT_INPUT_CONFIG"),Mi=(()=>{class t{_elementRef=a(M);_platform=a(O);ngControl=a(Tn,{optional:!0,self:!0});_autofillMonitor=a(yi);_ngZone=a(A);_formField=a(Vn,{optional:!0});_renderer=a(ae);_uid=a(Mn).getId("mat-input-");_previousNativeValue;_inputValueAccessor;_signalBasedValueAccessor;_previousPlaceholder=null;_errorStateTracker;_config=a(rr,{optional:!0});_cleanupIosKeyup;_cleanupWebkitWheel;_isServer=!1;_isNativeSelect=!1;_isTextarea=!1;_isInFormField=!1;focused=!1;stateChanges=new b;controlType="mat-input";autofilled=!1;get disabled(){return this._disabled}set disabled(e){this._disabled=C(e),this.focused&&(this.focused=!1,this.stateChanges.next())}_disabled=!1;get id(){return this._id}set id(e){this._id=e||this._uid}_id;placeholder;name;get required(){return this._required??this.ngControl?.control?.hasValidator(Sn.required)??!1}set required(e){this._required=C(e)}_required;get type(){return this._type}set type(e){this._type=e||"text",this._validateType(),!this._isTextarea&&mt().has(this._type)&&(this._elementRef.nativeElement.type=this._type)}_type="text";get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}userAriaDescribedBy;get value(){return this._signalBasedValueAccessor?this._signalBasedValueAccessor.value():this._inputValueAccessor.value}set value(e){e!==this.value&&(this._signalBasedValueAccessor?this._signalBasedValueAccessor.value.set(e):this._inputValueAccessor.value=e,this.stateChanges.next())}get readonly(){return this._readonly}set readonly(e){this._readonly=C(e)}_readonly=!1;disabledInteractive;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}_neverEmptyInputTypes=["date","datetime","datetime-local","month","time","week"].filter(e=>mt().has(e));constructor(){let e=a(In,{optional:!0}),n=a(An,{optional:!0}),i=a(Wn),o=a(xi,{optional:!0,self:!0}),s=a(jn,{optional:!0,self:!0}),d=this._elementRef.nativeElement,c=d.nodeName.toLowerCase();o?Ut(o.value)?this._signalBasedValueAccessor=o:this._inputValueAccessor=o:this._inputValueAccessor=d,this._previousNativeValue=this.value,this.id=this.id,this._platform.IOS&&this._ngZone.runOutsideAngular(()=>{this._cleanupIosKeyup=this._renderer.listen(d,"keyup",this._iOSKeyupListener)}),this._errorStateTracker=new $n(i,s||this.ngControl,n,e,this.stateChanges),this._isServer=!this._platform.isBrowser,this._isNativeSelect=c==="select",this._isTextarea=c==="textarea",this._isInFormField=!!this._formField,this.disabledInteractive=this._config?.disabledInteractive||!1,this._isNativeSelect&&(this.controlType=d.multiple?"mat-native-select-multiple":"mat-native-select"),this._signalBasedValueAccessor&&$t(()=>{this._signalBasedValueAccessor.value(),this.stateChanges.next()})}ngAfterViewInit(){this._platform.isBrowser&&this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(e=>{this.autofilled=e.isAutofilled,this.stateChanges.next()})}ngOnChanges(){this.stateChanges.next()}ngOnDestroy(){this.stateChanges.complete(),this._platform.isBrowser&&this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement),this._cleanupIosKeyup?.(),this._cleanupWebkitWheel?.()}ngDoCheck(){this.ngControl&&(this.updateErrorState(),this.ngControl.disabled!==null&&this.ngControl.disabled!==this.disabled&&(this.disabled=this.ngControl.disabled,this.stateChanges.next())),this._dirtyCheckNativeValue(),this._dirtyCheckPlaceholder()}focus(e){this._elementRef.nativeElement.focus(e)}updateErrorState(){this._errorStateTracker.updateErrorState()}_focusChanged(e){if(e!==this.focused){if(!this._isNativeSelect&&e&&this.disabled&&this.disabledInteractive){let n=this._elementRef.nativeElement;n.type==="number"?(n.type="text",n.setSelectionRange(0,0),n.type="number"):n.setSelectionRange(0,0)}this.focused=e,this.stateChanges.next()}}_onInput(){}_dirtyCheckNativeValue(){let e=this._elementRef.nativeElement.value;this._previousNativeValue!==e&&(this._previousNativeValue=e,this.stateChanges.next())}_dirtyCheckPlaceholder(){let e=this._getPlaceholder();if(e!==this._previousPlaceholder){let n=this._elementRef.nativeElement;this._previousPlaceholder=e,e?n.setAttribute("placeholder",e):n.removeAttribute("placeholder")}}_getPlaceholder(){return this.placeholder||null}_validateType(){ir.indexOf(this._type)>-1}_isNeverEmpty(){return this._neverEmptyInputTypes.indexOf(this._type)>-1}_isBadInput(){let e=this._elementRef.nativeElement.validity;return e&&e.badInput}get empty(){return!this._isNeverEmpty()&&!this._elementRef.nativeElement.value&&!this._isBadInput()&&!this.autofilled}get shouldLabelFloat(){if(this._isNativeSelect){let e=this._elementRef.nativeElement,n=e.options[0];return this.focused||e.multiple||!this.empty||!!(e.selectedIndex>-1&&n&&n.label)}else return this.focused&&!this.disabled||!this.empty}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(e){let n=this._elementRef.nativeElement;e.length?n.setAttribute("aria-describedby",e.join(" ")):n.removeAttribute("aria-describedby")}onContainerClick(){this.focused||this.focus()}_isInlineSelect(){let e=this._elementRef.nativeElement;return this._isNativeSelect&&(e.multiple||e.size>1)}_iOSKeyupListener=e=>{let n=e.target;!n.value&&n.selectionStart===0&&n.selectionEnd===0&&(n.setSelectionRange(1,1),n.setSelectionRange(0,0))};_getReadonlyAttribute(){return this._isNativeSelect?null:this.readonly||this.disabled&&this.disabledInteractive?"true":null}static \u0275fac=function(n){return new(n||t)};static \u0275dir=it({type:t,selectors:[["input","matInput",""],["textarea","matInput",""],["select","matNativeControl",""],["input","matNativeControl",""],["textarea","matNativeControl",""]],hostAttrs:[1,"mat-mdc-input-element"],hostVars:21,hostBindings:function(n,i){n&1&&E("focus",function(){return i._focusChanged(!0)})("blur",function(){return i._focusChanged(!1)})("input",function(){return i._onInput()}),n&2&&(Yt("id",i.id)("disabled",i.disabled&&!i.disabledInteractive)("required",i.required),de("name",i.name||null)("readonly",i._getReadonlyAttribute())("aria-disabled",i.disabled&&i.disabledInteractive?"true":null)("aria-invalid",i.empty&&i.required?null:i.errorState)("aria-required",i.required)("id",i.id),k("mat-input-server",i._isServer)("mat-mdc-form-field-textarea-control",i._isInFormField&&i._isTextarea)("mat-mdc-form-field-input-control",i._isInFormField)("mat-mdc-input-disabled-interactive",i.disabledInteractive)("mdc-text-field__input",i._isInFormField)("mat-mdc-native-select-inline",i._isInlineSelect()))},inputs:{disabled:"disabled",id:"id",placeholder:"placeholder",name:"name",required:"required",type:"type",errorStateMatcher:"errorStateMatcher",userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],value:"value",readonly:"readonly",disabledInteractive:[2,"disabledInteractive","disabledInteractive",ct]},exportAs:["matInput"],features:[B([{provide:Hn,useExisting:t}]),qt]})}return t})(),Ei=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=G({type:t});static \u0275inj=$({imports:[le,le,Ci,Re]})}return t})();var Ve=["*"],sr=["content"],ki=[[["mat-drawer"],["mat-sidenav"]],[["mat-drawer-content"],["mat-sidenav-content"]],"*"],Si=["mat-drawer, mat-sidenav","mat-drawer-content, mat-sidenav-content","*"];function dr(t,r){if(t&1){let e=Z();m(0,"div",1),E("click",function(){U(e);let i=S();return q(i._onBackdropClicked())}),h()}if(t&2){let e=S();k("mat-drawer-shown",e._isShowingBackdrop())}}function lr(t,r){t&1&&(m(0,"mat-drawer-content"),f(1,2),h())}function cr(t,r){if(t&1){let e=Z();m(0,"div",1),E("click",function(){U(e);let i=S();return q(i._onBackdropClicked())}),h()}if(t&2){let e=S();k("mat-drawer-shown",e._isShowingBackdrop())}}function ur(t,r){t&1&&(m(0,"mat-sidenav-content"),f(1,2),h())}var mr=`.mat-drawer-container {
  position: relative;
  z-index: 1;
  color: var(--mat-sidenav-content-text-color, var(--mat-sys-on-background));
  background-color: var(--mat-sidenav-content-background-color, var(--mat-sys-background));
  box-sizing: border-box;
  display: block;
  overflow: hidden;
}
.mat-drawer-container[fullscreen] {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
.mat-drawer-container[fullscreen].mat-drawer-container-has-open {
  overflow: hidden;
}
.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side {
  z-index: 3;
}
.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,
.mat-drawer-container.ng-animate-disabled .mat-drawer-content, .ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,
.ng-animate-disabled .mat-drawer-container .mat-drawer-content {
  transition: none;
}

.mat-drawer-backdrop {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: block;
  z-index: 3;
  visibility: hidden;
}
.mat-drawer-backdrop.mat-drawer-shown {
  visibility: visible;
  background-color: var(--mat-sidenav-scrim-color, color-mix(in srgb, var(--mat-sys-neutral-variant20) 40%, transparent));
}
.mat-drawer-transition .mat-drawer-backdrop {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: background-color, visibility;
}
@media (forced-colors: active) {
  .mat-drawer-backdrop {
    opacity: 0.5;
  }
}

.mat-drawer-content {
  position: relative;
  z-index: 1;
  display: block;
  height: 100%;
  overflow: auto;
}
.mat-drawer-content.mat-drawer-content-hidden {
  opacity: 0;
}
.mat-drawer-transition .mat-drawer-content {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: transform, margin-left, margin-right;
}

.mat-drawer {
  position: relative;
  z-index: 4;
  color: var(--mat-sidenav-container-text-color, var(--mat-sys-on-surface-variant));
  box-shadow: var(--mat-sidenav-container-elevation-shadow, none);
  background-color: var(--mat-sidenav-container-background-color, var(--mat-sys-surface));
  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  width: var(--mat-sidenav-container-width, 360px);
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 3;
  outline: 0;
  box-sizing: border-box;
  overflow-y: auto;
  transform: translate3d(-100%, 0, 0);
}
@media (forced-colors: active) {
  .mat-drawer, [dir=rtl] .mat-drawer.mat-drawer-end {
    border-right: solid 1px currentColor;
  }
}
@media (forced-colors: active) {
  [dir=rtl] .mat-drawer, .mat-drawer.mat-drawer-end {
    border-left: solid 1px currentColor;
    border-right: none;
  }
}
.mat-drawer.mat-drawer-side {
  z-index: 2;
}
.mat-drawer.mat-drawer-end {
  right: 0;
  transform: translate3d(100%, 0, 0);
  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
[dir=rtl] .mat-drawer {
  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transform: translate3d(100%, 0, 0);
}
[dir=rtl] .mat-drawer.mat-drawer-end {
  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  left: 0;
  right: auto;
  transform: translate3d(-100%, 0, 0);
}
.mat-drawer-transition .mat-drawer {
  transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
}
.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) {
  visibility: hidden;
  box-shadow: none;
}
.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) .mat-drawer-inner-container {
  display: none;
}
.mat-drawer.mat-drawer-opened.mat-drawer-opened {
  transform: none;
}

.mat-drawer-side {
  box-shadow: none;
  border-right-color: var(--mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
}
.mat-drawer-side.mat-drawer-end {
  border-left-color: var(--mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side {
  border-left-color: var(--mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side.mat-drawer-end {
  border-right-color: var(--mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
  border-left: none;
}

.mat-drawer-inner-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.mat-sidenav-fixed {
  position: fixed;
}
`;var hr=new j("MAT_DRAWER_DEFAULT_AUTOSIZE",{providedIn:"root",factory:()=>!1}),St=new j("MAT_DRAWER_CONTAINER"),ue=(()=>{class t extends K{_platform=a(O);_changeDetectorRef=a(Fe);_element=a(M);_ngZone=a(A);_isInert=!1;_container=a(kt);ngAfterContentInit(){this._container._contentMarginChanges.subscribe(()=>this._changeDetectorRef.markForCheck())}_drawerToggled(e){e.opened?this._ngZone.runOutsideAngular(()=>{e._animationEnd.pipe(Vt(50),Je(1)).subscribe(()=>this._updateInert())}):this._updateInert()}_drawerModeChanged(){this._updateInert()}_updateInert(){let e=this._container._isShowingBackdrop();if(e!==this._isInert){let n=this._element.nativeElement;this._isInert=e,e?n.setAttribute("inert","true"):n.removeAttribute("inert")}}_shouldBeHidden(){if(this._platform.isBrowser)return!1;let{start:e,end:n}=this._container;return e!=null&&e.mode!=="over"&&e.opened||n!=null&&n.mode!=="over"&&n.opened}static \u0275fac=(()=>{let e;return function(i){return(e||(e=oe(t)))(i||t)}})();static \u0275cmp=p({type:t,selectors:[["mat-drawer-content"]],hostAttrs:[1,"mat-drawer-content"],hostVars:6,hostBindings:function(n,i){n&2&&(Ie("margin-left",i._container._contentMargins.left,"px")("margin-right",i._container._contentMargins.right,"px"),k("mat-drawer-content-hidden",i._shouldBeHidden()))},features:[B([{provide:K,useExisting:t}]),se],ngContentSelectors:Ve,decls:1,vars:0,template:function(n,i){n&1&&(T(),f(0))},encapsulation:2})}return t})(),Et=(()=>{class t{_elementRef=a(M);_focusTrapFactory=a(Cn);_focusMonitor=a(wn);_platform=a(O);_ngZone=a(A);_renderer=a(ae);_interactivityChecker=a(yn);_doc=a(nt);_container=a(St,{optional:!0});_focusTrap=null;_elementFocusedBeforeDrawerWasOpened=null;_eventCleanups;_isAttached=!1;_anchor=null;get position(){return this._position}set position(e){e=e==="end"?"end":"start",e!==this._position&&(this._isAttached&&this._updatePositionInParent(e),this._position=e,this.onPositionChanged.emit())}_position="start";get mode(){return this._mode}set mode(e){this._mode=e,this._updateFocusTrapState(),this._modeChanged.next(),this._getContent()?._drawerModeChanged()}_mode="over";get disableClose(){return this._disableClose}set disableClose(e){this._disableClose=C(e)}_disableClose=!1;get autoFocus(){let e=this._autoFocus;return e??(this.mode==="side"?"dialog":"first-tabbable")}set autoFocus(e){(e==="true"||e==="false"||e==null)&&(e=C(e)),this._autoFocus=e}_autoFocus;get opened(){return this._opened()}set opened(e){this.toggle(C(e))}_opened=ke(!1);_openedVia=null;_animationStarted=new b;_animationEnd=new b;openedChange=new re(!0);_openedStream=this.openedChange.pipe(ie(e=>e),W(()=>{}));openedStart=this._animationStarted.pipe(ie(()=>this.opened),Xe(void 0));_closedStream=this.openedChange.pipe(ie(e=>!e),W(()=>{}));closedStart=this._animationStarted.pipe(ie(()=>!this.opened),Xe(void 0));_destroyed=new b;onPositionChanged=new re;_content;_modeChanged=new b;_injector=a(tt);_changeDetectorRef=a(Fe);constructor(){this.openedChange.pipe(x(this._destroyed)).subscribe(e=>{e?(this._elementFocusedBeforeDrawerWasOpened=this._doc.activeElement,this._takeFocus()):this._isFocusWithinDrawer()&&this._restoreFocus(this._openedVia||"program")}),this._eventCleanups=this._ngZone.runOutsideAngular(()=>{let e=this._renderer,n=this._elementRef.nativeElement;return[e.listen(n,"keydown",i=>{i.keyCode===27&&!this.disableClose&&!xn(i)&&this._ngZone.run(()=>{this.close(),i.stopPropagation(),i.preventDefault()})}),e.listen(n,"transitionend",this._handleTransitionEvent),e.listen(n,"transitioncancel",this._handleTransitionEvent)]}),this._animationEnd.subscribe(()=>{this.openedChange.emit(this.opened)})}_focusByCssSelector(e,n){let i=this._elementRef.nativeElement.querySelector(e);i&&(this._interactivityChecker.isFocusable(i)||(i.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let o=()=>{s(),d(),i.removeAttribute("tabindex")},s=this._renderer.listen(i,"blur",o),d=this._renderer.listen(i,"mousedown",o)})),i.focus(n))}_takeFocus(){if(!this._focusTrap)return;let e=this._elementRef.nativeElement;switch(this.autoFocus){case!1:case"dialog":return;case!0:case"first-tabbable":N(()=>{!this._focusTrap.focusInitialElement()&&typeof e.focus=="function"&&e.focus()},{injector:this._injector});break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this.autoFocus);break}}_restoreFocus(e){this.autoFocus!=="dialog"&&(this._elementFocusedBeforeDrawerWasOpened?this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened,e):this._elementRef.nativeElement.blur(),this._elementFocusedBeforeDrawerWasOpened=null)}_isFocusWithinDrawer(){let e=this._doc.activeElement;return!!e&&this._elementRef.nativeElement.contains(e)}ngAfterViewInit(){this._isAttached=!0,this._position==="end"&&this._updatePositionInParent("end"),this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._updateFocusTrapState())}ngOnDestroy(){this._eventCleanups.forEach(e=>e()),this._focusTrap?.destroy(),this._anchor?.remove(),this._anchor=null,this._animationStarted.complete(),this._animationEnd.complete(),this._modeChanged.complete(),this._destroyed.next(),this._destroyed.complete()}open(e){return this.toggle(!0,e)}close(){return this.toggle(!1)}_closeViaBackdropClick(){return this._setOpen(!1,!0,"mouse")}toggle(e=!this.opened,n){e&&n&&(this._openedVia=n);let i=this._setOpen(e,!e&&this._isFocusWithinDrawer(),this._openedVia||"program");return e||(this._openedVia=null),i}_setOpen(e,n,i){return e===this.opened?Promise.resolve(e?"open":"close"):(this._opened.set(e),this._getContent()?._drawerToggled(this),this._container?._transitionsEnabled?(this._setIsAnimating(!0),setTimeout(()=>this._animationStarted.next())):setTimeout(()=>{this._animationStarted.next(),this._animationEnd.next()}),this._elementRef.nativeElement.classList.toggle("mat-drawer-opened",e),!e&&n&&this._restoreFocus(i),this._changeDetectorRef.markForCheck(),this._updateFocusTrapState(),new Promise(o=>{this.openedChange.pipe(Je(1)).subscribe(s=>o(s?"open":"close"))}))}_getContent(){return this._container?._content||this._container?._userContent}_setIsAnimating(e){this._elementRef.nativeElement.classList.toggle("mat-drawer-animating",e)}_getWidth(){return this._elementRef.nativeElement.offsetWidth||0}_updateFocusTrapState(){this._focusTrap&&(this._focusTrap.enabled=this.opened&&!!this._container?._isShowingBackdrop())}_updatePositionInParent(e){if(!this._platform.isBrowser)return;let n=this._elementRef.nativeElement,i=n.parentNode;e==="end"?(this._anchor||(this._anchor=this._doc.createComment("mat-drawer-anchor"),i.insertBefore(this._anchor,n)),i.appendChild(n)):this._anchor&&this._anchor.parentNode.insertBefore(n,this._anchor)}_handleTransitionEvent=e=>{let n=this._elementRef.nativeElement;e.target===n&&this._ngZone.run(()=>{e.type==="transitionend"&&this._setIsAnimating(!1),this._animationEnd.next(e)})};static \u0275fac=function(n){return new(n||t)};static \u0275cmp=p({type:t,selectors:[["mat-drawer"]],viewQuery:function(n,i){if(n&1&&lt(sr,5),n&2){let o;H(o=V())&&(i._content=o.first)}},hostAttrs:[1,"mat-drawer"],hostVars:12,hostBindings:function(n,i){n&2&&(de("align",null)("tabIndex",i.mode!=="side"?"-1":null),Ie("visibility",!i._container&&!i.opened?"hidden":null),k("mat-drawer-end",i.position==="end")("mat-drawer-over",i.mode==="over")("mat-drawer-push",i.mode==="push")("mat-drawer-side",i.mode==="side"))},inputs:{position:"position",mode:"mode",disableClose:"disableClose",autoFocus:"autoFocus",opened:"opened"},outputs:{openedChange:"openedChange",_openedStream:"opened",openedStart:"openedStart",_closedStream:"closed",closedStart:"closedStart",onPositionChanged:"positionChanged"},exportAs:["matDrawer"],ngContentSelectors:Ve,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(n,i){n&1&&(T(),m(0,"div",1,0),f(2),h())},dependencies:[K],encapsulation:2})}return t})(),kt=(()=>{class t{_dir=a(_n,{optional:!0});_element=a(M);_ngZone=a(A);_changeDetectorRef=a(Fe);_animationDisabled=En();_transitionsEnabled=!1;_allDrawers;_drawers=new Zt;_content;_userContent;get start(){return this._start}get end(){return this._end}get autosize(){return this._autosize}set autosize(e){this._autosize=C(e)}_autosize=a(hr);get hasBackdrop(){return this._drawerHasBackdrop(this._start)||this._drawerHasBackdrop(this._end)}set hasBackdrop(e){this._backdropOverride=e==null?null:C(e)}_backdropOverride=null;backdropClick=new re;_start=null;_end=null;_left=null;_right=null;_destroyed=new b;_doCheckSubject=new b;_contentMargins={left:null,right:null};_contentMarginChanges=new b;get scrollable(){return this._userContent||this._content}_injector=a(tt);constructor(){let e=a(O),n=a(Un);this._dir?.change.pipe(x(this._destroyed)).subscribe(()=>{this._validateDrawers(),this.updateContentMargins()}),n.change().pipe(x(this._destroyed)).subscribe(()=>this.updateContentMargins()),!this._animationDisabled&&e.isBrowser&&this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._element.nativeElement.classList.add("mat-drawer-transition"),this._transitionsEnabled=!0},200)})}ngAfterContentInit(){this._allDrawers.changes.pipe(et(this._allDrawers),x(this._destroyed)).subscribe(e=>{this._drawers.reset(e.filter(n=>!n._container||n._container===this)),this._drawers.notifyOnChanges()}),this._drawers.changes.pipe(et(null)).subscribe(()=>{this._validateDrawers(),this._drawers.forEach(e=>{this._watchDrawerToggle(e),this._watchDrawerPosition(e),this._watchDrawerMode(e)}),(!this._drawers.length||this._isDrawerOpen(this._start)||this._isDrawerOpen(this._end))&&this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),this._ngZone.runOutsideAngular(()=>{this._doCheckSubject.pipe(Ht(10),x(this._destroyed)).subscribe(()=>this.updateContentMargins())})}ngOnDestroy(){this._contentMarginChanges.complete(),this._doCheckSubject.complete(),this._drawers.destroy(),this._destroyed.next(),this._destroyed.complete()}open(){this._drawers.forEach(e=>e.open())}close(){this._drawers.forEach(e=>e.close())}updateContentMargins(){let e=0,n=0;if(this._left&&this._left.opened){if(this._left.mode=="side")e+=this._left._getWidth();else if(this._left.mode=="push"){let i=this._left._getWidth();e+=i,n-=i}}if(this._right&&this._right.opened){if(this._right.mode=="side")n+=this._right._getWidth();else if(this._right.mode=="push"){let i=this._right._getWidth();n+=i,e-=i}}e=e||null,n=n||null,(e!==this._contentMargins.left||n!==this._contentMargins.right)&&(this._contentMargins={left:e,right:n},this._ngZone.run(()=>this._contentMarginChanges.next(this._contentMargins)))}ngDoCheck(){this._autosize&&this._isPushed()&&this._ngZone.runOutsideAngular(()=>this._doCheckSubject.next())}_watchDrawerToggle(e){e._animationStarted.pipe(x(this._drawers.changes)).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),e.mode!=="side"&&e.openedChange.pipe(x(this._drawers.changes)).subscribe(()=>this._setContainerClass(e.opened))}_watchDrawerPosition(e){e.onPositionChanged.pipe(x(this._drawers.changes)).subscribe(()=>{N({read:()=>this._validateDrawers()},{injector:this._injector})})}_watchDrawerMode(e){e._modeChanged.pipe(x(Nt(this._drawers.changes,this._destroyed))).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck()})}_setContainerClass(e){let n=this._element.nativeElement.classList,i="mat-drawer-container-has-open";e?n.add(i):n.remove(i)}_validateDrawers(){this._start=this._end=null,this._drawers.forEach(e=>{e.position=="end"?(this._end!=null,this._end=e):(this._start!=null,this._start=e)}),this._right=this._left=null,this._dir&&this._dir.value==="rtl"?(this._left=this._end,this._right=this._start):(this._left=this._start,this._right=this._end)}_isPushed(){return this._isDrawerOpen(this._start)&&this._start.mode!="over"||this._isDrawerOpen(this._end)&&this._end.mode!="over"}_onBackdropClicked(){this.backdropClick.emit(),this._closeModalDrawersViaBackdrop()}_closeModalDrawersViaBackdrop(){[this._start,this._end].filter(e=>e&&!e.disableClose&&this._drawerHasBackdrop(e)).forEach(e=>e._closeViaBackdropClick())}_isShowingBackdrop(){return this._isDrawerOpen(this._start)&&this._drawerHasBackdrop(this._start)||this._isDrawerOpen(this._end)&&this._drawerHasBackdrop(this._end)}_isDrawerOpen(e){return e!=null&&e.opened}_drawerHasBackdrop(e){return this._backdropOverride==null?!!e&&e.mode!=="side":this._backdropOverride}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=p({type:t,selectors:[["mat-drawer-container"]],contentQueries:function(n,i,o){if(n&1&&dt(o,ue,5)(o,Et,5),n&2){let s;H(s=V())&&(i._content=s.first),H(s=V())&&(i._allDrawers=s)}},viewQuery:function(n,i){if(n&1&&lt(ue,5),n&2){let o;H(o=V())&&(i._userContent=o.first)}},hostAttrs:[1,"mat-drawer-container"],hostVars:2,hostBindings:function(n,i){n&2&&k("mat-drawer-container-explicit-backdrop",i._backdropOverride)},inputs:{autosize:"autosize",hasBackdrop:"hasBackdrop"},outputs:{backdropClick:"backdropClick"},exportAs:["matDrawerContainer"],features:[B([{provide:St,useExisting:t}])],ngContentSelectors:Si,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(n,i){n&1&&(T(ki),R(0,dr,1,2,"div",0),f(1),f(2,1),R(3,lr,2,0,"mat-drawer-content")),n&2&&(P(i.hasBackdrop?0:-1),y(3),P(i._content?-1:3))},dependencies:[ue],styles:[`.mat-drawer-container {
  position: relative;
  z-index: 1;
  color: var(--mat-sidenav-content-text-color, var(--mat-sys-on-background));
  background-color: var(--mat-sidenav-content-background-color, var(--mat-sys-background));
  box-sizing: border-box;
  display: block;
  overflow: hidden;
}
.mat-drawer-container[fullscreen] {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
.mat-drawer-container[fullscreen].mat-drawer-container-has-open {
  overflow: hidden;
}
.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side {
  z-index: 3;
}
.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,
.mat-drawer-container.ng-animate-disabled .mat-drawer-content, .ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,
.ng-animate-disabled .mat-drawer-container .mat-drawer-content {
  transition: none;
}

.mat-drawer-backdrop {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: block;
  z-index: 3;
  visibility: hidden;
}
.mat-drawer-backdrop.mat-drawer-shown {
  visibility: visible;
  background-color: var(--mat-sidenav-scrim-color, color-mix(in srgb, var(--mat-sys-neutral-variant20) 40%, transparent));
}
.mat-drawer-transition .mat-drawer-backdrop {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: background-color, visibility;
}
@media (forced-colors: active) {
  .mat-drawer-backdrop {
    opacity: 0.5;
  }
}

.mat-drawer-content {
  position: relative;
  z-index: 1;
  display: block;
  height: 100%;
  overflow: auto;
}
.mat-drawer-content.mat-drawer-content-hidden {
  opacity: 0;
}
.mat-drawer-transition .mat-drawer-content {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: transform, margin-left, margin-right;
}

.mat-drawer {
  position: relative;
  z-index: 4;
  color: var(--mat-sidenav-container-text-color, var(--mat-sys-on-surface-variant));
  box-shadow: var(--mat-sidenav-container-elevation-shadow, none);
  background-color: var(--mat-sidenav-container-background-color, var(--mat-sys-surface));
  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  width: var(--mat-sidenav-container-width, 360px);
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 3;
  outline: 0;
  box-sizing: border-box;
  overflow-y: auto;
  transform: translate3d(-100%, 0, 0);
}
@media (forced-colors: active) {
  .mat-drawer, [dir=rtl] .mat-drawer.mat-drawer-end {
    border-right: solid 1px currentColor;
  }
}
@media (forced-colors: active) {
  [dir=rtl] .mat-drawer, .mat-drawer.mat-drawer-end {
    border-left: solid 1px currentColor;
    border-right: none;
  }
}
.mat-drawer.mat-drawer-side {
  z-index: 2;
}
.mat-drawer.mat-drawer-end {
  right: 0;
  transform: translate3d(100%, 0, 0);
  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
[dir=rtl] .mat-drawer {
  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transform: translate3d(100%, 0, 0);
}
[dir=rtl] .mat-drawer.mat-drawer-end {
  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  left: 0;
  right: auto;
  transform: translate3d(-100%, 0, 0);
}
.mat-drawer-transition .mat-drawer {
  transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
}
.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) {
  visibility: hidden;
  box-shadow: none;
}
.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) .mat-drawer-inner-container {
  display: none;
}
.mat-drawer.mat-drawer-opened.mat-drawer-opened {
  transform: none;
}

.mat-drawer-side {
  box-shadow: none;
  border-right-color: var(--mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
}
.mat-drawer-side.mat-drawer-end {
  border-left-color: var(--mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side {
  border-left-color: var(--mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side.mat-drawer-end {
  border-right-color: var(--mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
  border-left: none;
}

.mat-drawer-inner-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.mat-sidenav-fixed {
  position: fixed;
}
`],encapsulation:2})}return t})(),He=(()=>{class t extends ue{static \u0275fac=(()=>{let e;return function(i){return(e||(e=oe(t)))(i||t)}})();static \u0275cmp=p({type:t,selectors:[["mat-sidenav-content"]],hostAttrs:[1,"mat-drawer-content","mat-sidenav-content"],features:[B([{provide:K,useExisting:t},{provide:ue,useExisting:t}]),se],ngContentSelectors:Ve,decls:1,vars:0,template:function(n,i){n&1&&(T(),f(0))},encapsulation:2})}return t})(),Tt=(()=>{class t extends Et{get fixedInViewport(){return this._fixedInViewport}set fixedInViewport(e){this._fixedInViewport=C(e)}_fixedInViewport=!1;get fixedTopGap(){return this._fixedTopGap}set fixedTopGap(e){this._fixedTopGap=Ae(e)}_fixedTopGap=0;get fixedBottomGap(){return this._fixedBottomGap}set fixedBottomGap(e){this._fixedBottomGap=Ae(e)}_fixedBottomGap=0;static \u0275fac=(()=>{let e;return function(i){return(e||(e=oe(t)))(i||t)}})();static \u0275cmp=p({type:t,selectors:[["mat-sidenav"]],hostAttrs:[1,"mat-drawer","mat-sidenav"],hostVars:16,hostBindings:function(n,i){n&2&&(de("tabIndex",i.mode!=="side"?"-1":null)("align",null),Ie("top",i.fixedInViewport?i.fixedTopGap:null,"px")("bottom",i.fixedInViewport?i.fixedBottomGap:null,"px"),k("mat-drawer-end",i.position==="end")("mat-drawer-over",i.mode==="over")("mat-drawer-push",i.mode==="push")("mat-drawer-side",i.mode==="side")("mat-sidenav-fixed",i.fixedInViewport))},inputs:{fixedInViewport:"fixedInViewport",fixedTopGap:"fixedTopGap",fixedBottomGap:"fixedBottomGap"},exportAs:["matSidenav"],features:[B([{provide:Et,useExisting:t}]),se],ngContentSelectors:Ve,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(n,i){n&1&&(T(),m(0,"div",1,0),f(2),h())},dependencies:[K],encapsulation:2})}return t})(),Ti=(()=>{class t extends kt{_allDrawers=void 0;_content=void 0;static \u0275fac=(()=>{let e;return function(i){return(e||(e=oe(t)))(i||t)}})();static \u0275cmp=p({type:t,selectors:[["mat-sidenav-container"]],contentQueries:function(n,i,o){if(n&1&&dt(o,He,5)(o,Tt,5),n&2){let s;H(s=V())&&(i._content=s.first),H(s=V())&&(i._allDrawers=s)}},hostAttrs:[1,"mat-drawer-container","mat-sidenav-container"],hostVars:2,hostBindings:function(n,i){n&2&&k("mat-drawer-container-explicit-backdrop",i._backdropOverride)},exportAs:["matSidenavContainer"],features:[B([{provide:St,useExisting:t},{provide:kt,useExisting:t}]),se],ngContentSelectors:Si,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(n,i){n&1&&(T(ki),R(0,cr,1,2,"div",0),f(1),f(2,1),R(3,ur,2,0,"mat-sidenav-content")),n&2&&(P(i.hasBackdrop?0:-1),y(3),P(i._content?-1:3))},dependencies:[He],styles:[mr],encapsulation:2})}return t})(),Di=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=G({type:t});static \u0275inj=$({imports:[ht,Re,ht]})}return t})();var fr=["*"];function _r(t,r){t&1&&f(0)}var Ii=(()=>{class t{constructor(){this.position=sn(),this.portal=ln.required(Pe),N(()=>{this.portalOutlet=new Jn(document.querySelector(this.position()==="left"?"#layout-left-custom-items":"#layout-right-custom-items")),this.portalOutlet.attach(this.portal())})}ngOnDestroy(){this.portalOutlet?.detach()}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=p({type:t,selectors:[["showcase-layout-toolbar-menu"]],viewQuery:function(n,i){n&1&&Te(i.portal,Pe,5),n&2&&De()},inputs:{position:[1,"position"]},ngContentSelectors:fr,decls:1,vars:0,consts:[["cdkPortal",""]],template:function(n,i){n&1&&(T(),Xt(0,_r,1,0,"ng-template",0))},dependencies:[Pe],encapsulation:2})}}return t})();var gr=["exampleLink"];function br(t,r){if(t&1){let e=Z();m(0,"button",12),E("click",function(){U(e);let i=S();return q(i.clearSearch())}),m(1,"mat-icon"),Q(2,"close"),h()()}}function vr(t,r){if(t&1&&(m(0,"a",14,1),Q(2),h()),t&2){let e=S().$implicit;st("routerLink","/demo/"+e.path),y(2),tn(" ",e.data?.label," ")}}function wr(t,r){if(t&1&&R(0,vr,3,2,"a",14),t&2){let e=r.$implicit;P(e?0:-1)}}function yr(t,r){if(t&1&&(m(0,"h3",13),Q(1),h(),ot(2,wr,1,1,null,null,rt),Se(4,"mat-divider")),t&2){let e=r.$implicit,n=S();y(),en(e),y(),at(n.searchedRoutes()[e])}}var sa=(()=>{class t{constructor(){this.activatedRoute=a(mn),this.demoFileLoaderService=a(ui),this.originalRoutes=Object.groupBy(Yn[0].children??[],({data:e})=>e?e.cat:null),this.searchedRoutes=an(()=>{let e={},n=this.searchTerm().toLocaleLowerCase();return Object.values(this.originalRoutes).forEach(i=>{i.forEach(o=>{let s=this.getLabelFromData(o.data),d=o.data?.cat??"";s.toLocaleLowerCase().includes(n)&&(e[d]||(e[d]=[]),e[d].push(o))})}),e}),this.categories=Object.values(Xn),this.searchTerm=dn(""),this.sidenavIsOpen=ke(!0),this.exampleLinks=cn("exampleLink",{read:M}),N(()=>{setTimeout(()=>{this.scrollInToActiveExampleLink()},0)})}getLabelFromData(e){return e&&typeof e.label=="string"?e.label:""}toggleSidenav(){this.sidenavIsOpen.update(e=>!e)}openStackblitz(){let e=this.activatedRoute.snapshot.firstChild;if(!e)return;let n=e.url[0].path;this.demoFileLoaderService.getDemoFiles(n).subscribe(i=>{let o=wi(i,n);ai.openProject(o,{newWindow:!0,openFile:"src/demo.ts"})})}clearSearch(){this.searchTerm.set("")}scrollInToActiveExampleLink(){let e=this.exampleLinks().find(n=>n.nativeElement.classList.contains("active"));e&&li(e.nativeElement,{block:"center",scrollMode:"if-needed"})}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=p({type:t,selectors:[["ng-component"]],viewQuery:function(n,i){n&1&&Te(i.exampleLinks,gr,5,M),n&2&&De()},inputs:{searchTerm:[1,"searchTerm"]},outputs:{searchTerm:"searchTermChange"},decls:20,vars:3,consts:[["sidenav",""],["exampleLink",""],["position","left"],["mat-icon-button","",1,"menu-button",3,"click"],["position","right"],["mat-button","","aria-label","Open on StackBlitz",3,"click"],["svgIcon","stackblitz"],["mode","side",3,"opened"],[1,"search"],["matInput","","type","text","placeholder","Search",3,"ngModelChange","ngModel"],["matSuffix","","mat-icon-button","","aria-label","Clear"],[1,"content"],["matSuffix","","mat-icon-button","","aria-label","Clear",3,"click"],["matSubheader",""],["mat-list-item","","routerLinkActive","active",3,"routerLink"]],template:function(n,i){if(n&1){let o=Z();m(0,"showcase-layout-toolbar-menu",2)(1,"button",3),E("click",function(){return i.toggleSidenav()}),m(2,"mat-icon"),Q(3,"menu"),h()()(),m(4,"showcase-layout-toolbar-menu",4)(5,"button",5),E("click",function(){return i.openStackblitz()}),Se(6,"mat-icon",6),Q(7," StackBlitz "),h()(),m(8,"mat-sidenav-container")(9,"mat-sidenav",7,0)(11,"mat-form-field",8)(12,"input",9),on("ngModelChange",function(d){return U(o),rn(i.searchTerm,d)||(i.searchTerm=d),q(d)}),h(),Kt(),R(13,br,3,0,"button",10),h(),m(14,"mat-nav-list"),ot(15,yr,5,1,null,null,rt),h()(),m(17,"mat-sidenav-content")(18,"section",11),Se(19,"router-outlet"),h()()()}n&2&&(y(9),st("opened",i.sidenavIsOpen()),y(3),nn("ngModel",i.searchTerm),Jt(),y(),P(i.searchTerm()?13:-1),y(2),at(i.categories))},dependencies:[Ii,Kn,Qn,Zn,Gn,qn,Rn,kn,Dn,Fn,Di,Tt,Ti,He,le,zn,Nn,Ei,Mi,Ln,On,Pn,Bn,gn,fn,pn,bn,hn],styles:["[_nghost-%COMP%], .content[_ngcontent-%COMP%]{display:flex;flex:1;flex-direction:row}mat-sidenav[_ngcontent-%COMP%]{width:345px;display:flex;flex-direction:column;flex:1}mat-nav-list[_ngcontent-%COMP%]{overflow-y:auto}mat-sidenav-container[_ngcontent-%COMP%]{flex:1}.content[_ngcontent-%COMP%]{height:100%}mat-form-field.search[_ngcontent-%COMP%]{width:100%;margin-bottom:-1.25em}a.active[_ngcontent-%COMP%]{--mat-list-list-item-label-text-color: var(--mat-sys-on-secondary-container);--mat-list-list-item-hover-label-text-color: var( --mat-sys-on-secondary-container );--mat-list-list-item-focus-label-text-color: var( --mat-sys-on-secondary-container );background-color:var(--mat-sys-secondary-container)!important}"]})}}return t})();export{sa as DemoIndexComponent};
