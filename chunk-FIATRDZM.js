import{a as v}from"./chunk-NG3SWE7K.js";import{a as tt}from"./chunk-SPTMP25W.js";import"./chunk-B4H7PBP6.js";import{B as J,F as X,G as Y,H as et,o as K,z as Z}from"./chunk-GCLLWDUW.js";import{f as $}from"./chunk-NXCQZUDF.js";import{b as q}from"./chunk-EDSP7W4E.js";import"./chunk-F7NEVK2H.js";import{a as nt}from"./chunk-5Y3QBW4O.js";import{a as ot}from"./chunk-2ANXPLGW.js";import{k as at}from"./chunk-ZIACJ4SX.js";import"./chunk-UOU2HMFS.js";import{$ as w,$b as L,Ea as B,Eb as T,Fb as E,Fc as Q,Gb as z,Ia as G,Ic as u,Lb as r,Mb as s,Nb as d,Ob as b,Pc as W,Rc as m,Vb as c,W as C,Xb as A,Yb as O,Zb as V,a as y,ac as N,b as k,ba as x,bc as P,da as i,eb as l,fc as U,hc as H,jc as I,qa as D,qc as f,sb as g,sc as j,tb as F,ua as h,wb as R}from"./chunk-4ZCCQPO5.js";var st=["button"],ut=["*"];function dt(n,p){if(n&1&&(s(0,"div",2),b(1,"mat-pseudo-checkbox",6),d()),n&2){let t=A();l(),r("disabled",t.disabled)}}var gt=new x("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:()=>({hideSingleSelectionIndicator:!1,hideMultipleSelectionIndicator:!1,disabledInteractive:!1})}),ct=new x("MatButtonToggleGroup");var S=class{source;value;constructor(p,t){this.source=p,this.value=t}};var M=(()=>{class n{_changeDetectorRef=i(W);_elementRef=i(G);_focusMonitor=i(K);_idGenerator=i(Z);_animationDisabled=J();_checked=!1;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return`${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(t){this._tabIndex.set(t)}_tabIndex;disableRipple=!1;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(t){this._appearance=t}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(t){t!==this._checked&&(this._checked=t,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck())}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(t){this._disabled=t}_disabled=!1;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(t){this._disabledInteractive=t}_disabledInteractive;change=new D;constructor(){i($).load(Y);let t=i(ct,{optional:!0}),o=i(new Q("tabindex"),{optional:!0})||"",e=i(gt,{optional:!0});this._tabIndex=h(parseInt(o)||0),this.buttonToggleGroup=t,this._appearance=e&&e.appearance?e.appearance:"standard",this._disabledInteractive=e?.disabledInteractive??!1}ngOnInit(){let t=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId("mat-button-toggle-"),t&&(t._isPrechecked(this)?this.checked=!0:t._isSelected(this)!==this._checked&&t._syncButtonToggle(this,this._checked))}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add("mat-button-toggle-animations-enabled"),this._focusMonitor.monitor(this._elementRef,!0)}ngOnDestroy(){let t=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),t&&t._isSelected(this)&&t._syncButtonToggle(this,!1,!1,!0)}focus(t){this._buttonElement.nativeElement.focus(t)}_onButtonClick(){if(this.disabled)return;let t=this.isSingleSelector()?!0:!this._checked;if(t!==this._checked&&(this._checked=t,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,!0),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let o=this.buttonToggleGroup._buttonToggles.find(e=>e.tabIndex===0);o&&(o.tabIndex=-1),this.tabIndex=0}this.change.emit(new S(this,this.value))}_markForCheck(){this._changeDetectorRef.markForCheck()}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static \u0275fac=function(o){return new(o||n)};static \u0275cmp=g({type:n,selectors:[["mat-button-toggle"]],viewQuery:function(o,e){if(o&1&&L(st,5),o&2){let a;N(a=P())&&(e._buttonElement=a.first)}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:14,hostBindings:function(o,e){o&1&&c("focus",function(){return e.focus()}),o&2&&(T("aria-label",null)("aria-labelledby",null)("id",e.id)("name",null),H("mat-button-toggle-standalone",!e.buttonToggleGroup)("mat-button-toggle-checked",e.checked)("mat-button-toggle-disabled",e.disabled)("mat-button-toggle-disabled-interactive",e.disabledInteractive)("mat-button-toggle-appearance-standard",e.appearance==="standard"))},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[2,"disableRipple","disableRipple",m],appearance:"appearance",checked:[2,"checked","checked",m],disabled:[2,"disabled","disabled",m],disabledInteractive:[2,"disabledInteractive","disabledInteractive",m]},outputs:{change:"change"},exportAs:["matButtonToggle"],ngContentSelectors:ut,decls:7,vars:13,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-checkbox-wrapper"],[1,"mat-button-toggle-label-content"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"],["state","checked","aria-hidden","true","appearance","minimal",3,"disabled"]],template:function(o,e){if(o&1&&(O(),s(0,"button",1,0),c("click",function(){return e._onButtonClick()}),E(2,dt,2,1,"div",2),s(3,"span",3),V(4),d()(),b(5,"span",4)(6,"span",5)),o&2){let a=U(1);r("id",e.buttonId)("disabled",e.disabled&&!e.disabledInteractive||null),T("role",e.isSingleSelector()?"radio":"button")("tabindex",e.disabled&&!e.disabledInteractive?-1:e.tabIndex)("aria-pressed",e.isSingleSelector()?null:e.checked)("aria-checked",e.isSingleSelector()?e.checked:null)("name",e._getButtonName())("aria-label",e.ariaLabel)("aria-labelledby",e.ariaLabelledby)("aria-disabled",e.disabled&&e.disabledInteractive?"true":null),l(2),z(e.buttonToggleGroup&&(!e.buttonToggleGroup.multiple&&!e.buttonToggleGroup.hideSingleSelectionIndicator||e.buttonToggleGroup.multiple&&!e.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),l(4),r("matRippleTrigger",a)("matRippleDisabled",e.disableRipple||e.disabled)}},dependencies:[X,tt],styles:[`.mat-button-toggle-standalone,
.mat-button-toggle-group {
  position: relative;
  display: inline-flex;
  flex-direction: row;
  white-space: nowrap;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
  border-radius: var(--mat-button-toggle-legacy-shape);
  transform: translateZ(0);
}
.mat-button-toggle-standalone:not([class*=mat-elevation-z]),
.mat-button-toggle-group:not([class*=mat-elevation-z]) {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
@media (forced-colors: active) {
  .mat-button-toggle-standalone,
  .mat-button-toggle-group {
    outline: solid 1px;
  }
}

.mat-button-toggle-standalone.mat-button-toggle-appearance-standard,
.mat-button-toggle-group-appearance-standard {
  border-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
.mat-button-toggle-standalone.mat-button-toggle-appearance-standard .mat-pseudo-checkbox,
.mat-button-toggle-group-appearance-standard .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-button-toggle-selected-state-text-color, var(--mat-sys-on-secondary-container));
}
.mat-button-toggle-standalone.mat-button-toggle-appearance-standard:not([class*=mat-elevation-z]),
.mat-button-toggle-group-appearance-standard:not([class*=mat-elevation-z]) {
  box-shadow: none;
}
@media (forced-colors: active) {
  .mat-button-toggle-standalone.mat-button-toggle-appearance-standard,
  .mat-button-toggle-group-appearance-standard {
    outline: 0;
  }
}

.mat-button-toggle-vertical {
  flex-direction: column;
}
.mat-button-toggle-vertical .mat-button-toggle-label-content {
  display: block;
}

.mat-button-toggle {
  white-space: nowrap;
  position: relative;
  color: var(--mat-button-toggle-legacy-text-color);
  font-family: var(--mat-button-toggle-legacy-label-text-font);
  font-size: var(--mat-button-toggle-legacy-label-text-size);
  line-height: var(--mat-button-toggle-legacy-label-text-line-height);
  font-weight: var(--mat-button-toggle-legacy-label-text-weight);
  letter-spacing: var(--mat-button-toggle-legacy-label-text-tracking);
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-button-toggle-legacy-selected-state-text-color);
}
.mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay {
  opacity: var(--mat-button-toggle-legacy-focus-state-layer-opacity);
}
.mat-button-toggle .mat-icon svg {
  vertical-align: top;
}

.mat-button-toggle-checkbox-wrapper {
  display: inline-block;
  justify-content: flex-start;
  align-items: center;
  width: 0;
  height: 18px;
  line-height: 18px;
  overflow: hidden;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translate3d(0, -50%, 0);
}
[dir=rtl] .mat-button-toggle-checkbox-wrapper {
  left: auto;
  right: 16px;
}
.mat-button-toggle-appearance-standard .mat-button-toggle-checkbox-wrapper {
  left: 12px;
}
[dir=rtl] .mat-button-toggle-appearance-standard .mat-button-toggle-checkbox-wrapper {
  left: auto;
  right: 12px;
}
.mat-button-toggle-checked .mat-button-toggle-checkbox-wrapper {
  width: 18px;
}
.mat-button-toggle-animations-enabled .mat-button-toggle-checkbox-wrapper {
  transition: width 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-button-toggle-vertical .mat-button-toggle-checkbox-wrapper {
  transition: none;
}

.mat-button-toggle-checked {
  color: var(--mat-button-toggle-legacy-selected-state-text-color);
  background-color: var(--mat-button-toggle-legacy-selected-state-background-color);
}

.mat-button-toggle-disabled {
  pointer-events: none;
  color: var(--mat-button-toggle-legacy-disabled-state-text-color);
  background-color: var(--mat-button-toggle-legacy-disabled-state-background-color);
  --mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color: var(--mat-button-toggle-legacy-disabled-state-text-color);
}
.mat-button-toggle-disabled.mat-button-toggle-checked {
  background-color: var(--mat-button-toggle-legacy-disabled-selected-state-background-color);
}

.mat-button-toggle-disabled-interactive {
  pointer-events: auto;
}

.mat-button-toggle-appearance-standard {
  color: var(--mat-button-toggle-text-color, var(--mat-sys-on-surface));
  background-color: var(--mat-button-toggle-background-color, transparent);
  font-family: var(--mat-button-toggle-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-toggle-label-text-size, var(--mat-sys-label-large-size));
  line-height: var(--mat-button-toggle-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-weight: var(--mat-button-toggle-label-text-weight, var(--mat-sys-label-large-weight));
  letter-spacing: var(--mat-button-toggle-label-text-tracking, var(--mat-sys-label-large-tracking));
}
.mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
[dir=rtl] .mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: none;
  border-right: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: none;
  border-right: none;
  border-top: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-checked {
  color: var(--mat-button-toggle-selected-state-text-color, var(--mat-sys-on-secondary-container));
  background-color: var(--mat-button-toggle-selected-state-background-color, var(--mat-sys-secondary-container));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled {
  color: var(--mat-button-toggle-disabled-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-toggle-disabled-state-background-color, transparent);
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color: var(--mat-button-toggle-disabled-selected-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled.mat-button-toggle-checked {
  color: var(--mat-button-toggle-disabled-selected-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-toggle-disabled-selected-state-background-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay {
  background-color: var(--mat-button-toggle-state-layer-color, var(--mat-sys-on-surface));
}
.mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay {
  opacity: var(--mat-button-toggle-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-button-toggle-appearance-standard.cdk-keyboard-focused .mat-button-toggle-focus-overlay {
  opacity: var(--mat-button-toggle-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
@media (hover: none) {
  .mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay {
    display: none;
  }
}

.mat-button-toggle-label-content {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  padding: 0 16px;
  line-height: var(--mat-button-toggle-legacy-height);
  position: relative;
}
.mat-button-toggle-appearance-standard .mat-button-toggle-label-content {
  padding: 0 12px;
  line-height: var(--mat-button-toggle-height, 40px);
}

.mat-button-toggle-label-content > * {
  vertical-align: middle;
}

.mat-button-toggle-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  background-color: var(--mat-button-toggle-legacy-state-layer-color);
}

@media (forced-colors: active) {
  .mat-button-toggle-checked .mat-button-toggle-focus-overlay {
    border-bottom: solid 500px;
    opacity: 0.5;
    height: 0;
  }
  .mat-button-toggle-checked:hover .mat-button-toggle-focus-overlay {
    opacity: 0.6;
  }
  .mat-button-toggle-checked.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay {
    border-bottom: solid 500px;
  }
}
.mat-button-toggle .mat-button-toggle-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}

.mat-button-toggle-button {
  border: 0;
  background: none;
  color: inherit;
  padding: 0;
  margin: 0;
  font: inherit;
  outline: none;
  width: 100%;
  cursor: pointer;
}
.mat-button-toggle-animations-enabled .mat-button-toggle-button {
  transition: padding 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-button-toggle-vertical .mat-button-toggle-button {
  transition: none;
}
.mat-button-toggle-disabled .mat-button-toggle-button {
  cursor: default;
}
.mat-button-toggle-button::-moz-focus-inner {
  border: 0;
}
.mat-button-toggle-checked .mat-button-toggle-button:has(.mat-button-toggle-checkbox-wrapper) {
  padding-left: 30px;
}
[dir=rtl] .mat-button-toggle-checked .mat-button-toggle-button:has(.mat-button-toggle-checkbox-wrapper) {
  padding-left: 0;
  padding-right: 30px;
}

.mat-button-toggle-standalone.mat-button-toggle-appearance-standard {
  --mat-focus-indicator-border-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}

.mat-button-toggle-group-appearance-standard:not(.mat-button-toggle-vertical) .mat-button-toggle:last-of-type .mat-button-toggle-button::before {
  border-top-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-bottom-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}
.mat-button-toggle-group-appearance-standard:not(.mat-button-toggle-vertical) .mat-button-toggle:first-of-type .mat-button-toggle-button::before {
  border-top-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-bottom-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}

.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle:last-of-type .mat-button-toggle-button::before {
  border-bottom-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-bottom-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}
.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle:first-of-type .mat-button-toggle-button::before {
  border-top-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-top-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}
`],encapsulation:2})}return n})(),rt=(()=>{class n{static \u0275fac=function(o){return new(o||n)};static \u0275mod=F({type:n});static \u0275inj=w({imports:[et,M,q]})}return n})();var lt=(()=>{class n{constructor(){this.sourceDirective=i(v),this.url=u(),this.tiles=u(),this.bounds=u(),this.scheme=u(),this.minzoom=u(),this.maxzoom=u(),this.attribution=u(),this.promoteId=u(),this.sourceDirective.loadSource$.pipe(C(()=>this.sourceDirective.addSource(this.getVectorSourceSpecification())),ot()).subscribe()}ngOnChanges(t){if(this.sourceDirective.sourceId()){if(t.bounds&&!t.bounds.isFirstChange()||t.scheme&&!t.scheme.isFirstChange()||t.minzoom&&!t.minzoom.isFirstChange()||t.maxzoom&&!t.maxzoom.isFirstChange()||t.attribution&&!t.attribution.isFirstChange()||t.promoteId&&!t.promoteId.isFirstChange())this.sourceDirective.refresh();else if(t.url&&!t.url.isFirstChange()||t.tiles&&!t.tiles.isFirstChange()){let o=this.sourceDirective.getSource();if(o===void 0)return;let e=this.url();t.url&&e&&o.setUrl(e);let a=this.tiles();t.tiles&&a&&o.setTiles(a)}}}getVectorSourceSpecification(){return{type:"vector",url:this.url(),tiles:this.tiles(),bounds:this.bounds(),scheme:this.scheme(),minzoom:this.minzoom(),maxzoom:this.maxzoom(),attribution:this.attribution(),promoteId:this.promoteId()}}static{this.\u0275fac=function(o){return new(o||n)}}static{this.\u0275cmp=g({type:n,selectors:[["mgl-vector-source"]],inputs:{url:[1,"url"],tiles:[1,"tiles"],bounds:[1,"bounds"],scheme:[1,"scheme"],minzoom:[1,"minzoom"],maxzoom:[1,"maxzoom"],attribution:[1,"attribution"],promoteId:[1,"promoteId"]},features:[R([{directive:v,inputs:["id","id"]}]),B],decls:0,vars:0,template:function(o,e){},encapsulation:2})}}return n})();var mt=(n,p)=>[n,p],pt=()=>({preserveDrawingBuffer:!0}),ht=()=>["https://demotiles.maplibre.org/tiles/{z}/{x}/{y}.pbf"],ft=()=>({"line-color":"blue"}),Jt=(()=>{class n{constructor(){this.layouts=h({countries:{visibility:"none"},names:{visibility:"none","text-field":"{name:latin}","text-font":["Noto Sans Regular"],"text-size":30}})}toggleLayer(t){this.layouts.update(o=>k(y({},o),{[t.value]:k(y({},o[t.value]),{visibility:o[t.value].visibility==="visible"?"none":"visible"})}))}static{this.\u0275fac=function(o){return new(o||n)}}static{this.\u0275cmp=g({type:n,selectors:[["showcase-demo"]],decls:12,vars:16,consts:[[3,"mapStyle","zoom","center","canvasContextAttributes"],["id","countries",3,"tiles"],["id","everything","url","https://tiles.openfreemap.org/planet"],["id","countries-layer","type","line","source","countries","sourceLayer","countries",3,"layout","paint"],["id","names","type","symbol","source","everything","sourceLayer","place",3,"layout"],[1,"menu"],["value","names",3,"change","checked"],["data-cy","countries-toggle-button"],["value","countries",3,"change","checked"],["data-cy","countries-toggle-borders"]],template:function(o,e){o&1&&(s(0,"mgl-map",0),b(1,"mgl-vector-source",1)(2,"mgl-vector-source",2)(3,"mgl-layer",3)(4,"mgl-layer",4),d(),s(5,"div",5)(6,"mat-button-toggle",6),c("change",function(_){return e.toggleLayer(_)}),s(7,"span",7),I(8,"countries names"),d()(),s(9,"mat-button-toggle",8),c("change",function(_){return e.toggleLayer(_)}),s(10,"span",9),I(11,"countries border"),d()()()),o&2&&(r("mapStyle","https://tiles.openfreemap.org/styles/liberty")("zoom",3)("center",j(10,mt,-71.97722138410576,-13.517379300798098))("canvasContextAttributes",f(13,pt)),l(),r("tiles",f(14,ht)),l(2),r("layout",e.layouts().countries)("paint",f(15,ft)),l(),r("layout",e.layouts().names),l(2),r("checked",!0),l(3),r("checked",!0))},dependencies:[at,lt,nt,rt,M],styles:["[_nghost-%COMP%]{display:flex;flex:1}mgl-map[_ngcontent-%COMP%]{height:100%;width:100%}",".menu[_ngcontent-%COMP%]{position:absolute;padding:8px}"]})}}return n})();export{Jt as ToggleLayersComponent};
