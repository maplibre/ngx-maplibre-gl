import{a as p}from"./chunk-5WCN4HEM.js";import{m as M,n as z,t as _}from"./chunk-ZQSDTL6R.js";import{Ab as y,Xa as a,Ya as d,Yb as v,Zb as c,eb as u,fb as l,ia as m,ob as n,rb as h,yb as g,zb as f}from"./chunk-L2OPCR2R.js";import"./chunk-SFFPZX3Y.js";var w=()=>[14],D=()=>({"raster-fade-duration":0}),L=(()=>{let r=class r{constructor(t){this.ngZone=t,this.size=.001,this.url="assets/red.png",this.center=p.features[0].geometry.coordinates[0],this.coordinates=this.makeRectangle(this.center),l(()=>{let e=p.features[0].geometry.coordinates,s=e.map(C=>this.makeRectangle(C));this.center=e[0],this.coordinates=s[0];let o=0;this.timer=setInterval(()=>{this.ngZone.run(()=>{this.url=Math.random()<.5?"assets/red.png":"assets/blue.png",this.coordinates=s[o],o=(o+1)%s.length})},250)})}ngOnDestroy(){this.timer!==void 0&&clearInterval(this.timer)}makeRectangle([t,e]){return[[t,e],[t+this.size,e],[t+this.size,e-this.size],[t,e-this.size]]}};r.\u0275fac=function(e){return new(e||r)(d(u))},r.\u0275cmp=m({type:r,selectors:[["showcase-demo"]],standalone:!0,features:[v],decls:3,vars:10,consts:[["movingMethod","jumpTo",3,"center","zoom","preserveDrawingBuffer"],["id","test_source",3,"url","coordinates"],["id","test_layer","source","test_source","type","raster",3,"paint"]],template:function(e,s){e&1&&(g(0,"mgl-map",0),y(1,"mgl-image-source",1)(2,"mgl-layer",2),f()),e&2&&(h("https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL"),n("center",s.center)("zoom",c(8,w))("preserveDrawingBuffer",!0),a(),n("url",s.url)("coordinates",s.coordinates),a(),n("paint",c(9,D)))},dependencies:[z,_,M],styles:[`[_nghost-%COMP%]{display:flex;flex:1}mgl-map[_ngcontent-%COMP%]{height:100%;width:100%}
/*# sourceMappingURL=examples-UPBTEGPO.css.map */`]});let i=r;return i})();export{L as LiveUpdateImageSourceComponent};
//# sourceMappingURL=chunk-WEONAPXX.js.map