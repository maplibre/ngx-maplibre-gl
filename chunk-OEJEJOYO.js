import{i as M,j as v,m as h,n as T}from"./chunk-JHQINCD3.js";import{Ab as n,Db as _,Ib as d,Jb as g,Kb as f,Lb as a,Mb as p,Nb as C,Sb as c,bb as m,ha as u,kc as S,lc as y}from"./chunk-IGAQZRMC.js";import"./chunk-SE5JAREP.js";var O=()=>[8],b=()=>({"icon-image":"oneway"});function w(r,e){if(r&1&&C(0,"mgl-feature",2),r&2){let L=e.$implicit;n("geometry",L)}}var F=(()=>{let e=class e{constructor(){this.center=[-90.96,-.47],this.geometries=[{type:"Point",coordinates:[-91.395263671875,-.9145729757782163]},{type:"Point",coordinates:[-90.32958984375,-.6344474832838974]},{type:"Point",coordinates:[-91.34033203125,.01647949196029245]}]}centerMapTo(i){this.center=i.features[0].geometry.coordinates}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=u({type:e,selectors:[["showcase-demo"]],standalone:!0,features:[S],decls:5,vars:9,consts:[[3,"mapLoad","zoom","center","cursorStyle","preserveDrawingBuffer"],["id","symbols-source"],[3,"geometry"],["id","symbols","type","symbol","source","symbols-source",3,"layerClick","layerMouseEnter","layerMouseLeave","layout"]],template:function(o,t){o&1&&(a(0,"mgl-map",0),c("mapLoad",function(l){return t.map=l}),a(1,"mgl-geojson-source",1),g(2,w,1,1,"mgl-feature",2,d),p(),a(4,"mgl-layer",3),c("layerClick",function(l){return t.centerMapTo(l)})("layerMouseEnter",function(){return t.cursorStyle="pointer"})("layerMouseLeave",function(){return t.cursorStyle=""}),p()()),o&2&&(_("https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL"),n("zoom",y(7,O))("center",t.center)("cursorStyle",t.cursorStyle)("preserveDrawingBuffer",!0),m(2),f(t.geometries),m(2),n("layout",y(8,b)))},dependencies:[T,M,v,h],styles:[`[_nghost-%COMP%]{display:flex;flex:1}mgl-map[_ngcontent-%COMP%]{height:100%;width:100%}
/*# sourceMappingURL=examples-UPBTEGPO.css.map */`]});let r=e;return r})();export{F as CenterOnSymbolComponent};
//# sourceMappingURL=chunk-OEJEJOYO.js.map