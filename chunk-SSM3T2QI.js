import{a as et,b as U,e as tt}from"./chunk-E45R4362.js";import{d as Xe,g as Je}from"./chunk-NSRKOTAW.js";import{b as We,d as Ze,e as Ke,f as qe}from"./chunk-6HYQ3TQJ.js";import{b as $e,c as Ge}from"./chunk-2KPZUWC4.js";import{c as ye,d as ae,f as T,g as Ie,h as re}from"./chunk-CNJKFPBE.js";import{b as Oe,d as Le}from"./chunk-ERCUYV73.js";import"./chunk-IX6MNIAK.js";import"./chunk-EGHVCGT6.js";import{A as Me,C as Ye,E as k,J as Ue,K as Qe,a as je,c as Ne,i as Be,u as He,x as ze,y as Ve}from"./chunk-UOF55JIZ.js";import{A,Aa as ke,Ab as f,Ac as Ae,Eb as Re,G as W,Hb as ne,I as ce,Jb as h,Kb as H,Lb as _,Mb as x,Nb as Ee,Ob as b,Pb as v,Qb as Pe,Rb as M,S as Z,Sb as z,T as ue,Ta as he,U as K,Xa as d,Xb as Se,Ya as l,Yb as y,_ as q,_a as pe,a as X,aa as O,da as de,eb as fe,f as $,gb as Te,ha as u,ia as g,ib as ge,j as le,ja as J,jc as V,ka as ee,m as me,mb as w,mc as Y,nb as N,ob as p,qa as L,qb as ie,ra as j,rc as oe,sa as xe,sb as De,ub as B,vb as _e,vc as Fe,wb as be,xb as ve,ya as C,yb as m,z as G,za as te,zb as c}from"./chunk-L2OPCR2R.js";import"./chunk-SFFPZX3Y.js";var ut=["*",[["mat-toolbar-row"]]],dt=["*","mat-toolbar-row"],ht=(()=>{let n=class n{};n.\u0275fac=function(t){return new(t||n)},n.\u0275dir=ee({type:n,selectors:[["mat-toolbar-row"]],hostAttrs:[1,"mat-toolbar-row"],exportAs:["matToolbarRow"],standalone:!0});let o=n;return o})(),nt=(()=>{let n=class n{constructor(e,t,i){this._elementRef=e,this._platform=t,this._document=i}ngAfterViewInit(){this._platform.isBrowser&&(this._checkToolbarMixedModes(),this._toolbarRows.changes.subscribe(()=>this._checkToolbarMixedModes()))}_checkToolbarMixedModes(){this._toolbarRows.length}};n.\u0275fac=function(t){return new(t||n)(l(C),l(je),l(oe))},n.\u0275cmp=g({type:n,selectors:[["mat-toolbar"]],contentQueries:function(t,i,a){if(t&1&&x(a,ht,5),t&2){let r;b(r=v())&&(i._toolbarRows=r)}},hostAttrs:[1,"mat-toolbar"],hostVars:6,hostBindings:function(t,i){t&2&&(De(i.color?"mat-"+i.color:""),ie("mat-toolbar-multiple-rows",i._toolbarRows.length>0)("mat-toolbar-single-row",i._toolbarRows.length===0))},inputs:{color:"color"},exportAs:["matToolbar"],standalone:!0,features:[y],ngContentSelectors:dt,decls:2,vars:0,template:function(t,i){t&1&&(H(ut),_(0),_(1,1))},styles:[".mat-toolbar{background:var(--mat-toolbar-container-background-color);color:var(--mat-toolbar-container-text-color)}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font-family:var(--mat-toolbar-title-text-font);font-size:var(--mat-toolbar-title-text-size);line-height:var(--mat-toolbar-title-text-line-height);font-weight:var(--mat-toolbar-title-text-weight);letter-spacing:var(--mat-toolbar-title-text-tracking);margin:0}.cdk-high-contrast-active .mat-toolbar{outline:solid 1px}.mat-toolbar .mat-form-field-underline,.mat-toolbar .mat-form-field-ripple,.mat-toolbar .mat-focused .mat-form-field-ripple{background-color:currentColor}.mat-toolbar .mat-form-field-label,.mat-toolbar .mat-focused .mat-form-field-label,.mat-toolbar .mat-select-value,.mat-toolbar .mat-select-arrow,.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow{color:inherit}.mat-toolbar .mat-input-element{caret-color:currentColor}.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed{--mdc-text-button-label-text-color:var(--mat-toolbar-container-text-color);--mdc-outlined-button-label-text-color:var(--mat-toolbar-container-text-color)}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap;height:var(--mat-toolbar-standard-height)}@media(max-width: 599px){.mat-toolbar-row,.mat-toolbar-single-row{height:var(--mat-toolbar-mobile-height)}}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%;min-height:var(--mat-toolbar-standard-height)}@media(max-width: 599px){.mat-toolbar-multiple-rows{min-height:var(--mat-toolbar-mobile-height)}}"],encapsulation:2,changeDetection:0});let o=n;return o})();var ot=(()=>{let n=class n{};n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=J({type:n}),n.\u0275inj=q({imports:[k,k]});let o=n;return o})();var Mt=["mat-menu-item",""],yt=[[["mat-icon"],["","matMenuItemIcon",""]],"*"],It=["mat-icon, [matMenuItemIcon]","*"];function Ct(o,n){o&1&&(xe(),m(0,"svg",2),f(1,"polygon",3),c())}var wt=["*"];function xt(o,n){if(o&1){let s=Re();m(0,"div",0),ne("keydown",function(t){L(s);let i=h();return j(i._handleKeydown(t))})("click",function(){L(s);let t=h();return j(t.closed.emit("click"))})("@transformMenu.start",function(t){L(s);let i=h();return j(i._onAnimationStart(t))})("@transformMenu.done",function(t){L(s);let i=h();return j(i._onAnimationDone(t))}),m(1,"div",1),_(2),c()()}if(o&2){let s=h();p("id",s.panelId)("ngClass",s._classList)("@transformMenu",s._panelAnimationState),N("aria-label",s.ariaLabel||null)("aria-labelledby",s.ariaLabelledby||null)("aria-describedby",s.ariaDescribedby||null)}}var Ce=new O("MAT_MENU_PANEL"),Q=(()=>{let n=class n{constructor(e,t,i,a,r){this._elementRef=e,this._document=t,this._focusMonitor=i,this._parentMenu=a,this._changeDetectorRef=r,this.role="menuitem",this.disabled=!1,this.disableRipple=!1,this._hovered=new $,this._focused=new $,this._highlighted=!1,this._triggersSubmenu=!1,a?.addItem?.(this)}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._getHostElement(),e,t):this._getHostElement().focus(t),this._focused.next(this)}ngAfterViewInit(){this._focusMonitor&&this._focusMonitor.monitor(this._elementRef,!1)}ngOnDestroy(){this._focusMonitor&&this._focusMonitor.stopMonitoring(this._elementRef),this._parentMenu&&this._parentMenu.removeItem&&this._parentMenu.removeItem(this),this._hovered.complete(),this._focused.complete()}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(e){this.disabled&&(e.preventDefault(),e.stopPropagation())}_handleMouseEnter(){this._hovered.next(this)}getLabel(){let e=this._elementRef.nativeElement.cloneNode(!0),t=e.querySelectorAll("mat-icon, .material-icons");for(let i=0;i<t.length;i++)t[i].remove();return e.textContent?.trim()||""}_setHighlighted(e){this._highlighted=e,this._changeDetectorRef?.markForCheck()}_setTriggersSubmenu(e){this._triggersSubmenu=e,this._changeDetectorRef?.markForCheck()}_hasFocus(){return this._document&&this._document.activeElement===this._getHostElement()}};n.\u0275fac=function(t){return new(t||n)(l(C),l(oe),l(Me),l(Ce,8),l(V))},n.\u0275cmp=g({type:n,selectors:[["","mat-menu-item",""]],hostAttrs:[1,"mat-mdc-menu-item","mat-mdc-focus-indicator"],hostVars:8,hostBindings:function(t,i){t&1&&ne("click",function(r){return i._checkDisabled(r)})("mouseenter",function(){return i._handleMouseEnter()}),t&2&&(N("role",i.role)("tabindex",i._getTabIndex())("aria-disabled",i.disabled)("disabled",i.disabled||null),ie("mat-mdc-menu-item-highlighted",i._highlighted)("mat-mdc-menu-item-submenu-trigger",i._triggersSubmenu))},inputs:{role:"role",disabled:[u.HasDecoratorInputTransform,"disabled","disabled",Y],disableRipple:[u.HasDecoratorInputTransform,"disableRipple","disableRipple",Y]},exportAs:["matMenuItem"],standalone:!0,features:[ge,y],attrs:Mt,ngContentSelectors:It,decls:5,vars:3,consts:[[1,"mat-mdc-menu-item-text"],["matRipple","",1,"mat-mdc-menu-ripple",3,"matRippleDisabled","matRippleTrigger"],["viewBox","0 0 5 10","focusable","false","aria-hidden","true",1,"mat-mdc-menu-submenu-icon"],["points","0,0 5,5 0,10"]],template:function(t,i){t&1&&(H(yt),_(0),m(1,"span",0),_(2,1),c(),f(3,"div",1),w(4,Ct,2,0,":svg:svg",2)),t&2&&(d(3),p("matRippleDisabled",i.disableRipple||i.disabled)("matRippleTrigger",i._getHostElement()),d(),B(4,i._triggersSubmenu?4:-1))},dependencies:[Ue],encapsulation:2,changeDetection:0});let o=n;return o})();var kt=new O("MatMenuContent");var se={transformMenu:ye("transformMenu",[Ie("void",T({opacity:0,transform:"scale(0.8)"})),re("void => enter",ae("120ms cubic-bezier(0, 0, 0.2, 1)",T({opacity:1,transform:"scale(1)"}))),re("* => void",ae("100ms 25ms linear",T({opacity:0})))]),fadeInItems:ye("fadeInItems",[Ie("showing",T({opacity:1})),re("void => *",[T({opacity:0}),ae("400ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)")])])},Mi=se.fadeInItems,yi=se.transformMenu,Tt=0,Dt=new O("mat-menu-default-options",{providedIn:"root",factory:Rt});function Rt(){return{overlapTrigger:!1,xPosition:"after",yPosition:"below",backdropClass:"cdk-overlay-transparent-backdrop"}}var D=(()=>{let n=class n{get xPosition(){return this._xPosition}set xPosition(e){this._xPosition=e,this.setPositionClasses()}get yPosition(){return this._yPosition}set yPosition(e){this._yPosition=e,this.setPositionClasses()}set panelClass(e){let t=this._previousPanelClass;t&&t.length&&t.split(" ").forEach(i=>{this._classList[i]=!1}),this._previousPanelClass=e,e&&e.length&&(e.split(" ").forEach(i=>{this._classList[i]=!0}),this._elementRef.nativeElement.className="")}get classList(){return this.panelClass}set classList(e){this.panelClass=e}constructor(e,t,i,a){this._elementRef=e,this._ngZone=t,this._changeDetectorRef=a,this._elevationPrefix="mat-elevation-z",this._baseElevation=8,this._directDescendantItems=new ke,this._classList={},this._panelAnimationState="void",this._animationDone=new $,this.closed=new te,this.close=this.closed,this.panelId=`mat-menu-panel-${Tt++}`,this.overlayPanelClass=i.overlayPanelClass||"",this._xPosition=i.xPosition,this._yPosition=i.yPosition,this.backdropClass=i.backdropClass,this.overlapTrigger=i.overlapTrigger,this.hasBackdrop=i.hasBackdrop}ngOnInit(){this.setPositionClasses()}ngAfterContentInit(){this._updateDirectDescendants(),this._keyManager=new He(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd(),this._keyManager.tabOut.subscribe(()=>this.closed.emit("tab")),this._directDescendantItems.changes.pipe(Z(this._directDescendantItems),ue(e=>G(...e.map(t=>t._focused)))).subscribe(e=>this._keyManager.updateActiveItem(e)),this._directDescendantItems.changes.subscribe(e=>{let t=this._keyManager;if(this._panelAnimationState==="enter"&&t.activeItem?._hasFocus()){let i=e.toArray(),a=Math.max(0,Math.min(i.length-1,t.activeItemIndex||0));i[a]&&!i[a].disabled?t.setActiveItem(a):t.setNextItemActive()}})}ngOnDestroy(){this._keyManager?.destroy(),this._directDescendantItems.destroy(),this.closed.complete(),this._firstItemFocusSubscription?.unsubscribe()}_hovered(){return this._directDescendantItems.changes.pipe(Z(this._directDescendantItems),ue(t=>G(...t.map(i=>i._hovered))))}addItem(e){}removeItem(e){}_handleKeydown(e){let t=e.keyCode,i=this._keyManager;switch(t){case 27:Be(e)||(e.preventDefault(),this.closed.emit("keydown"));break;case 37:this.parentMenu&&this.direction==="ltr"&&this.closed.emit("keydown");break;case 39:this.parentMenu&&this.direction==="rtl"&&this.closed.emit("keydown");break;default:(t===38||t===40)&&i.setFocusOrigin("keyboard"),i.onKeydown(e);return}e.stopPropagation()}focusFirstItem(e="program"){this._firstItemFocusSubscription?.unsubscribe(),this._firstItemFocusSubscription=this._ngZone.onStable.pipe(W(1)).subscribe(()=>{let t=null;if(this._directDescendantItems.length&&(t=this._directDescendantItems.first._getHostElement().closest('[role="menu"]')),!t||!t.contains(document.activeElement)){let i=this._keyManager;i.setFocusOrigin(e).setFirstItemActive(),!i.activeItem&&t&&t.focus()}})}resetActiveItem(){this._keyManager.setActiveItem(-1)}setElevation(e){let t=Math.min(this._baseElevation+e,24),i=`${this._elevationPrefix}${t}`,a=Object.keys(this._classList).find(r=>r.startsWith(this._elevationPrefix));(!a||a===this._previousElevation)&&(this._previousElevation&&(this._classList[this._previousElevation]=!1),this._classList[i]=!0,this._previousElevation=i)}setPositionClasses(e=this.xPosition,t=this.yPosition){let i=this._classList;i["mat-menu-before"]=e==="before",i["mat-menu-after"]=e==="after",i["mat-menu-above"]=t==="above",i["mat-menu-below"]=t==="below",this._changeDetectorRef?.markForCheck()}_startAnimation(){this._panelAnimationState="enter"}_resetAnimation(){this._panelAnimationState="void"}_onAnimationDone(e){this._animationDone.next(e),this._isAnimating=!1}_onAnimationStart(e){this._isAnimating=!0,e.toState==="enter"&&this._keyManager.activeItemIndex===0&&(e.element.scrollTop=0)}_updateDirectDescendants(){this._allItems.changes.pipe(Z(this._allItems)).subscribe(e=>{this._directDescendantItems.reset(e.filter(t=>t._parentMenu===this)),this._directDescendantItems.notifyOnChanges()})}};n.\u0275fac=function(t){return new(t||n)(l(C),l(fe),l(Dt),l(V))},n.\u0275cmp=g({type:n,selectors:[["mat-menu"]],contentQueries:function(t,i,a){if(t&1&&(x(a,kt,5),x(a,Q,5),x(a,Q,4)),t&2){let r;b(r=v())&&(i.lazyContent=r.first),b(r=v())&&(i._allItems=r),b(r=v())&&(i.items=r)}},viewQuery:function(t,i){if(t&1&&Ee(pe,5),t&2){let a;b(a=v())&&(i.templateRef=a.first)}},hostVars:3,hostBindings:function(t,i){t&2&&N("aria-label",null)("aria-labelledby",null)("aria-describedby",null)},inputs:{backdropClass:"backdropClass",ariaLabel:[u.None,"aria-label","ariaLabel"],ariaLabelledby:[u.None,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[u.None,"aria-describedby","ariaDescribedby"],xPosition:"xPosition",yPosition:"yPosition",overlapTrigger:[u.HasDecoratorInputTransform,"overlapTrigger","overlapTrigger",Y],hasBackdrop:[u.HasDecoratorInputTransform,"hasBackdrop","hasBackdrop",e=>e==null?null:Y(e)],panelClass:[u.None,"class","panelClass"],classList:"classList"},outputs:{closed:"closed",close:"close"},exportAs:["matMenu"],standalone:!0,features:[Se([{provide:Ce,useExisting:n}]),ge,y],ngContentSelectors:wt,decls:1,vars:0,consts:[["tabindex","-1","role","menu",1,"mat-mdc-menu-panel","mat-mdc-elevation-specific",3,"keydown","click","id","ngClass"],[1,"mat-mdc-menu-content"]],template:function(t,i){t&1&&(H(),w(0,xt,3,6,"ng-template"))},dependencies:[Fe],styles:['mat-menu{display:none}.mat-mdc-menu-content{margin:0;padding:8px 0;list-style-type:none}.mat-mdc-menu-content:focus{outline:none}.mat-mdc-menu-content,.mat-mdc-menu-content .mat-mdc-menu-item .mat-mdc-menu-item-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;flex:1;white-space:normal;font-family:var(--mat-menu-item-label-text-font);line-height:var(--mat-menu-item-label-text-line-height);font-size:var(--mat-menu-item-label-text-size);letter-spacing:var(--mat-menu-item-label-text-tracking);font-weight:var(--mat-menu-item-label-text-weight)}.mat-mdc-menu-panel{min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;box-sizing:border-box;outline:0;border-radius:var(--mat-menu-container-shape);background-color:var(--mat-menu-container-color);will-change:transform,opacity}.mat-mdc-menu-panel.ng-animating{pointer-events:none}.cdk-high-contrast-active .mat-mdc-menu-panel{outline:solid 1px}.mat-divider{color:var(--mat-menu-divider-color);margin-bottom:var(--mat-menu-divider-bottom-spacing);margin-top:var(--mat-menu-divider-top-spacing)}.mat-mdc-menu-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:var(--mat-menu-item-leading-spacing);padding-right:var(--mat-menu-item-trailing-spacing);-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);cursor:pointer;width:100%;text-align:left;box-sizing:border-box;color:inherit;font-size:inherit;background:none;text-decoration:none;margin:0;align-items:center;min-height:48px}.mat-mdc-menu-item:focus{outline:none}[dir=rtl] .mat-mdc-menu-item,.mat-mdc-menu-item[dir=rtl]{padding-left:var(--mat-menu-item-trailing-spacing);padding-right:var(--mat-menu-item-leading-spacing)}.mat-mdc-menu-item:has(.material-icons,mat-icon,[matButtonIcon]){padding-left:var(--mat-menu-item-with-icon-leading-spacing);padding-right:var(--mat-menu-item-with-icon-trailing-spacing)}[dir=rtl] .mat-mdc-menu-item:has(.material-icons,mat-icon,[matButtonIcon]),.mat-mdc-menu-item:has(.material-icons,mat-icon,[matButtonIcon])[dir=rtl]{padding-left:var(--mat-menu-item-with-icon-trailing-spacing);padding-right:var(--mat-menu-item-with-icon-leading-spacing)}.mat-mdc-menu-item::-moz-focus-inner{border:0}.mat-mdc-menu-item,.mat-mdc-menu-item:visited,.mat-mdc-menu-item:link{color:var(--mat-menu-item-label-text-color)}.mat-mdc-menu-item .mat-icon-no-color,.mat-mdc-menu-item .mat-mdc-menu-submenu-icon{color:var(--mat-menu-item-icon-color)}.mat-mdc-menu-item[disabled]{cursor:default;opacity:.38}.mat-mdc-menu-item[disabled]::after{display:block;position:absolute;content:"";top:0;left:0;bottom:0;right:0}.mat-mdc-menu-item .mat-icon{flex-shrink:0;margin-right:var(--mat-menu-item-spacing);height:var(--mat-menu-item-icon-size);width:var(--mat-menu-item-icon-size)}[dir=rtl] .mat-mdc-menu-item{text-align:right}[dir=rtl] .mat-mdc-menu-item .mat-icon{margin-right:0;margin-left:var(--mat-menu-item-spacing)}.mat-mdc-menu-item:not([disabled]):hover{background-color:var(--mat-menu-item-hover-state-layer-color)}.mat-mdc-menu-item:not([disabled]).cdk-program-focused,.mat-mdc-menu-item:not([disabled]).cdk-keyboard-focused,.mat-mdc-menu-item:not([disabled]).mat-mdc-menu-item-highlighted{background-color:var(--mat-menu-item-focus-state-layer-color)}.cdk-high-contrast-active .mat-mdc-menu-item{margin-top:1px}.mat-mdc-menu-submenu-icon{width:var(--mat-menu-item-icon-size);height:10px;fill:currentColor;padding-left:var(--mat-menu-item-spacing)}[dir=rtl] .mat-mdc-menu-submenu-icon{right:auto;padding-right:var(--mat-menu-item-spacing);padding-left:0}.cdk-high-contrast-active .mat-mdc-menu-submenu-icon{fill:CanvasText}.mat-mdc-menu-item .mat-mdc-menu-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}'],encapsulation:2,data:{animation:[se.transformMenu,se.fadeInItems]},changeDetection:0});let o=n;return o})(),lt=new O("mat-menu-scroll-strategy",{providedIn:"root",factory:()=>{let o=de(U);return()=>o.scrollStrategies.reposition()}});function Et(o){return()=>o.scrollStrategies.reposition()}var Pt={provide:lt,deps:[U],useFactory:Et},at=Ne({passive:!0});var mt=(()=>{let n=class n{get _deprecatedMatMenuTriggerFor(){return this.menu}set _deprecatedMatMenuTriggerFor(e){this.menu=e}get menu(){return this._menu}set menu(e){e!==this._menu&&(this._menu=e,this._menuCloseSubscription.unsubscribe(),e&&(this._parentMaterialMenu,this._menuCloseSubscription=e.close.subscribe(t=>{this._destroyMenu(t),(t==="click"||t==="tab")&&this._parentMaterialMenu&&this._parentMaterialMenu.closed.emit(t)})),this._menuItemInstance?._setTriggersSubmenu(this.triggersSubmenu()))}constructor(e,t,i,a,r,I,R,E,P){this._overlay=e,this._element=t,this._viewContainerRef=i,this._menuItemInstance=I,this._dir=R,this._focusMonitor=E,this._ngZone=P,this._overlayRef=null,this._menuOpen=!1,this._closingActionsSubscription=X.EMPTY,this._hoverSubscription=X.EMPTY,this._menuCloseSubscription=X.EMPTY,this._changeDetectorRef=de(V),this._handleTouchStart=S=>{Ve(S)||(this._openedBy="touch")},this._openedBy=void 0,this.restoreFocus=!0,this.menuOpened=new te,this.onMenuOpen=this.menuOpened,this.menuClosed=new te,this.onMenuClose=this.menuClosed,this._scrollStrategy=a,this._parentMaterialMenu=r instanceof D?r:void 0,t.nativeElement.addEventListener("touchstart",this._handleTouchStart,at)}ngAfterContentInit(){this._handleHover()}ngOnDestroy(){this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null),this._element.nativeElement.removeEventListener("touchstart",this._handleTouchStart,at),this._menuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe(),this._hoverSubscription.unsubscribe()}get menuOpen(){return this._menuOpen}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}triggersSubmenu(){return!!(this._menuItemInstance&&this._parentMaterialMenu&&this.menu)}toggleMenu(){return this._menuOpen?this.closeMenu():this.openMenu()}openMenu(){let e=this.menu;if(this._menuOpen||!e)return;let t=this._createOverlay(e),i=t.getConfig(),a=i.positionStrategy;this._setPosition(e,a),i.hasBackdrop=e.hasBackdrop==null?!this.triggersSubmenu():e.hasBackdrop,t.attach(this._getPortal(e)),e.lazyContent&&e.lazyContent.attach(this.menuData),this._closingActionsSubscription=this._menuClosingActions().subscribe(()=>this.closeMenu()),this._initMenu(e),e instanceof D&&(e._startAnimation(),e._directDescendantItems.changes.pipe(K(e.close)).subscribe(()=>{a.withLockedPosition(!1).reapplyLastPosition(),a.withLockedPosition(!0)}))}closeMenu(){this.menu?.close.emit()}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._element,e,t):this._element.nativeElement.focus(t)}updatePosition(){this._overlayRef?.updatePosition()}_destroyMenu(e){if(!this._overlayRef||!this.menuOpen)return;let t=this.menu;this._closingActionsSubscription.unsubscribe(),this._overlayRef.detach(),this.restoreFocus&&(e==="keydown"||!this._openedBy||!this.triggersSubmenu())&&this.focus(this._openedBy),this._openedBy=void 0,t instanceof D?(t._resetAnimation(),t.lazyContent?t._animationDone.pipe(A(i=>i.toState==="void"),W(1),K(t.lazyContent._attached)).subscribe({next:()=>t.lazyContent.detach(),complete:()=>this._setIsMenuOpen(!1)}):this._setIsMenuOpen(!1)):(this._setIsMenuOpen(!1),t?.lazyContent?.detach())}_initMenu(e){e.parentMenu=this.triggersSubmenu()?this._parentMaterialMenu:void 0,e.direction=this.dir,this._setMenuElevation(e),e.focusFirstItem(this._openedBy||"program"),this._setIsMenuOpen(!0)}_setMenuElevation(e){if(e.setElevation){let t=0,i=e.parentMenu;for(;i;)t++,i=i.parentMenu;e.setElevation(t)}}_setIsMenuOpen(e){e!==this._menuOpen&&(this._menuOpen=e,this._menuOpen?this.menuOpened.emit():this.menuClosed.emit(),this.triggersSubmenu()&&this._menuItemInstance._setHighlighted(e),this._changeDetectorRef.markForCheck())}_createOverlay(e){if(!this._overlayRef){let t=this._getOverlayConfig(e);this._subscribeToPositions(e,t.positionStrategy),this._overlayRef=this._overlay.create(t),this._overlayRef.keydownEvents().subscribe()}return this._overlayRef}_getOverlayConfig(e){return new et({positionStrategy:this._overlay.position().flexibleConnectedTo(this._element).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(".mat-menu-panel, .mat-mdc-menu-panel"),backdropClass:e.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:e.overlayPanelClass,scrollStrategy:this._scrollStrategy(),direction:this._dir})}_subscribeToPositions(e,t){e.setPositionClasses&&t.positionChanges.subscribe(i=>{let a=i.connectionPair.overlayX==="start"?"after":"before",r=i.connectionPair.overlayY==="top"?"below":"above";this._ngZone?this._ngZone.run(()=>e.setPositionClasses(a,r)):e.setPositionClasses(a,r)})}_setPosition(e,t){let[i,a]=e.xPosition==="before"?["end","start"]:["start","end"],[r,I]=e.yPosition==="above"?["bottom","top"]:["top","bottom"],[R,E]=[r,I],[P,S]=[i,a],F=0;if(this.triggersSubmenu()){if(S=i=e.xPosition==="before"?"start":"end",a=P=i==="end"?"start":"end",this._parentMaterialMenu){if(this._parentInnerPadding==null){let we=this._parentMaterialMenu.items.first;this._parentInnerPadding=we?we._getHostElement().offsetTop:0}F=r==="bottom"?this._parentInnerPadding:-this._parentInnerPadding}}else e.overlapTrigger||(R=r==="top"?"bottom":"top",E=I==="top"?"bottom":"top");t.withPositions([{originX:i,originY:R,overlayX:P,overlayY:r,offsetY:F},{originX:a,originY:R,overlayX:S,overlayY:r,offsetY:F},{originX:i,originY:E,overlayX:P,overlayY:I,offsetY:-F},{originX:a,originY:E,overlayX:S,overlayY:I,offsetY:-F}])}_menuClosingActions(){let e=this._overlayRef.backdropClick(),t=this._overlayRef.detachments(),i=this._parentMaterialMenu?this._parentMaterialMenu.closed:me(),a=this._parentMaterialMenu?this._parentMaterialMenu._hovered().pipe(A(r=>r!==this._menuItemInstance),A(()=>this._menuOpen)):me();return G(e,i,a,t)}_handleMousedown(e){ze(e)||(this._openedBy=e.button===0?"mouse":void 0,this.triggersSubmenu()&&e.preventDefault())}_handleKeydown(e){let t=e.keyCode;(t===13||t===32)&&(this._openedBy="keyboard"),this.triggersSubmenu()&&(t===39&&this.dir==="ltr"||t===37&&this.dir==="rtl")&&(this._openedBy="keyboard",this.openMenu())}_handleClick(e){this.triggersSubmenu()?(e.stopPropagation(),this.openMenu()):this.toggleMenu()}_handleHover(){!this.triggersSubmenu()||!this._parentMaterialMenu||(this._hoverSubscription=this._parentMaterialMenu._hovered().pipe(A(e=>e===this._menuItemInstance&&!e.disabled),ce(0,le)).subscribe(()=>{this._openedBy="mouse",this.menu instanceof D&&this.menu._isAnimating?this.menu._animationDone.pipe(W(1),ce(0,le),K(this._parentMaterialMenu._hovered())).subscribe(()=>this.openMenu()):this.openMenu()}))}_getPortal(e){return(!this._portal||this._portal.templateRef!==e.templateRef)&&(this._portal=new Je(e.templateRef,this._viewContainerRef)),this._portal}};n.\u0275fac=function(t){return new(t||n)(l(U),l(C),l(Te),l(lt),l(Ce,8),l(Q,10),l(Ye,8),l(Me),l(fe))},n.\u0275dir=ee({type:n,selectors:[["","mat-menu-trigger-for",""],["","matMenuTriggerFor",""]],hostAttrs:[1,"mat-mdc-menu-trigger"],hostVars:3,hostBindings:function(t,i){t&1&&ne("click",function(r){return i._handleClick(r)})("mousedown",function(r){return i._handleMousedown(r)})("keydown",function(r){return i._handleKeydown(r)}),t&2&&N("aria-haspopup",i.menu?"menu":null)("aria-expanded",i.menuOpen)("aria-controls",i.menuOpen?i.menu.panelId:null)},inputs:{_deprecatedMatMenuTriggerFor:[u.None,"mat-menu-trigger-for","_deprecatedMatMenuTriggerFor"],menu:[u.None,"matMenuTriggerFor","menu"],menuData:[u.None,"matMenuTriggerData","menuData"],restoreFocus:[u.None,"matMenuTriggerRestoreFocus","restoreFocus"]},outputs:{menuOpened:"menuOpened",onMenuOpen:"onMenuOpen",menuClosed:"menuClosed",onMenuClose:"onMenuClose"},exportAs:["matMenuTrigger"],standalone:!0});let o=n;return o})(),ct=(()=>{let n=class n{};n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=J({type:n}),n.\u0275inj=q({providers:[Pt],imports:[Ae,Qe,k,tt,Xe,k]});let o=n;return o})();function Ft(o,n){if(o&1&&(m(0,"a",11),M(1),c()),o&2){let s=h().$implicit;p("routerLink",s.url),d(),z(s.label)}}function At(o,n){if(o&1&&(m(0,"a",12),M(1),c()),o&2){let s=h().$implicit;p("href",s.url,he),d(),z(s.label)}}function Ot(o,n){if(o&1&&w(0,Ft,2,2,"a",11)(1,At,2,2),o&2){let s=n.$implicit;B(0,s.routerLink?0:1)}}function Lt(o,n){if(o&1&&(m(0,"a",13),M(1),c()),o&2){let s=h().$implicit;p("routerLink",s.url),d(),z(s.label)}}function jt(o,n){if(o&1&&(m(0,"a",14),M(1),c()),o&2){let s=h().$implicit;p("href",s.url,he),d(),z(s.label)}}function Nt(o,n){if(o&1&&w(0,Lt,2,2,"a",13)(1,jt,2,2),o&2){let s=n.$implicit;B(0,s.routerLink?0:1)}}var Ri=(()=>{let n=class n{constructor(){this.links=[{url:"/demo",routerLink:!0,label:"Examples"},{url:"https://www.maplibre.org/ngx-maplibre-gl/API/",routerLink:!1,label:"API"}]}};n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=g({type:n,selectors:[["ng-component"]],standalone:!0,features:[y],decls:22,vars:1,consts:[["mobileMenu","matMenu"],["color","primary"],["id","layout-left-custom-items"],["mat-icon-button","","routerLink","/"],["svgIcon","ngx-maplibre-gl"],["mat-button","","routerLink","/",1,"library-name"],[1,"menu-items"],["id","layout-right-custom-items"],["mat-icon-button","","href","https://github.com/maplibre/ngx-maplibre-gl"],["svgIcon","github"],["mat-icon-button","","type","button","aria-label","Mobile menu",1,"mobile-menu-button",3,"matMenuTriggerFor"],["mat-button","",3,"routerLink"],["mat-button","",3,"href"],["mat-menu-item","",3,"routerLink"],["mat-menu-item","",3,"href"]],template:function(t,i){if(t&1&&(m(0,"mat-toolbar",1)(1,"div"),f(2,"div",2),m(3,"a",3),f(4,"mat-icon",4),c(),m(5,"a",5),M(6," ngx-maplibre-gl "),c(),m(7,"div",6),be(8,Ot,2,1,null,null,_e),c()(),m(10,"div"),f(11,"div",7),m(12,"a",8),f(13,"mat-icon",9),c(),m(14,"button",10)(15,"mat-icon"),M(16,"more_vert"),c()(),m(17,"mat-menu",null,0),be(19,Nt,2,1,null,null,_e),c()()(),f(21,"router-outlet")),t&2){let a=Pe(18);d(8),ve(i.links),d(6),p("matMenuTriggerFor",a),d(5),ve(i.links)}},dependencies:[ot,nt,qe,We,Ke,Ze,Le,Ge,$e,Oe,ct,D,Q,mt],styles:[`[_nghost-%COMP%]{display:flex;flex-direction:column;flex:1;height:100vh}mat-toolbar[_ngcontent-%COMP%]{display:flex;justify-content:space-between;padding:0 8px 0 0}div[_ngcontent-%COMP%]{display:flex;height:100%;align-items:center}.menu-button[_ngcontent-%COMP%]{height:100%}.menu-items[_ngcontent-%COMP%], .library-name[_ngcontent-%COMP%]{display:none}@media (min-width: 640px){.menu-items[_ngcontent-%COMP%], .library-name[_ngcontent-%COMP%]{display:flex}.mobile-menu-button[_ngcontent-%COMP%]{display:none}}
/*# sourceMappingURL=layout.component-DGZ7QUDJ.css.map */`]});let o=n;return o})();export{Ri as LayoutComponent};
//# sourceMappingURL=chunk-SSM3T2QI.js.map