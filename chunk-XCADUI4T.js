import{i as v,m as x,n as k}from"./chunk-ZPXN3IMG.js";import{Eb as r,Hb as m,Kb as d,Mb as y,Nb as f,Ob as _,Pb as g,Qb as h,Rb as c,Wb as C,db as a,mc as o,nc as M,sb as l,yb as u}from"./chunk-UWFC3BX3.js";import{f as s}from"./chunk-SE5JAREP.js";var F=()=>[3],q=t=>[t,40.66995747013945],w=()=>({preserveDrawingBuffer:!0}),L=()=>["!=","cluster",!0],O=()=>({"circle-color":"rgba(0,255,0,0.5)","circle-radius":20,"circle-blur":1});function T(t,p){if(t&1&&c(0,"mgl-layer",2),t&2){let e=p.$implicit;r("id",e.id)("type",e.type)("filter",e.filter)("paint",e.paint)}}function b(t,p){if(t&1&&(c(0,"mgl-geojson-source",1),f(1,T,1,4,"mgl-layer",2,y),c(3,"mgl-layer",3)),t&2){let e=C();r("data",e.earthquakes)("cluster",!0)("clusterMaxZoom",15)("clusterRadius",20),a(),_(e.clusterLayers),a(2),r("filter",o(6,L))("paint",o(7,O))}}var P=(()=>{class t{ngOnInit(){return s(this,null,function*(){this.earthquakes=yield import("./chunk-JAD6BURS.js");let e=[[0,"green"],[20,"orange"],[200,"red"]];this.clusterLayers=e.map((i,n)=>({type:"circle",id:`cluster-${n}`,paint:{"circle-color":i[1],"circle-radius":70,"circle-blur":1},filter:n===e.length-1?[">=","point_count",i[0]]:["all",[">=","point_count",i[0]],["<","point_count",e[n+1][0]]]}))})}static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275cmp=l({type:t,selectors:[["showcase-demo"]],decls:2,vars:10,consts:[[3,"zoom","center","canvasContextAttributes"],["id","earthquakes",3,"data","cluster","clusterMaxZoom","clusterRadius"],["source","earthquakes",3,"id","type","filter","paint"],["id","unclustered-point","type","circle","source","earthquakes",3,"filter","paint"]],template:function(i,n){i&1&&(g(0,"mgl-map",0),u(1,b,4,8),h()),i&2&&(m("https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL"),r("zoom",o(6,F))("center",M(7,q,-103.59179687498357))("canvasContextAttributes",o(9,w)),a(),d(n.earthquakes?1:-1))},dependencies:[k,v,x],styles:[`[_nghost-%COMP%]{display:flex;flex:1}mgl-map[_ngcontent-%COMP%]{height:100%;width:100%}
/*# sourceMappingURL=examples-UPBTEGPO.css.map */`]})}}return t})();export{P as HeatMapComponent};
//# sourceMappingURL=chunk-XCADUI4T.js.map
