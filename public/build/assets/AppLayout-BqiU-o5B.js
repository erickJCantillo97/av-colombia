import{Q as O,d as y,U as I,o as a,f as l,n as C,a as n,g as f,t as x,j as T,a4 as D,aI as F,aJ as j,aF as w,aD as m,b as p,k as u,c as v,w as d,u as _,p as b,am as g,ak as K,aC as M,aB as z,e as B,ai as V,J as h,$ as P,r as k,F as Z,a7 as H,Z as N}from"./app-CvZALwpT.js";import{R as U,s as q}from"./index-DJWndnZi.js";import{s as L}from"./index-BPOgQtc5.js";import{s as J}from"./index-BCIAPP2L.js";import{F as X}from"./index-D43Ym9R2.js";import{s as Y}from"./index-uwnBIrGc.js";const G={class:"max-w-screen-xl mx-auto py-2 px-3 sm:px-6 lg:px-8"},Q={class:"flex items-center justify-between flex-wrap"},W={class:"w-0 flex-1 flex items-center min-w-0"},ee={key:0,class:"h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},te=n("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"},null,-1),se=[te],ne={key:1,class:"h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},re=n("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"},null,-1),oe=[re],ie={class:"ms-3 font-medium text-sm text-white truncate"},ae={class:"shrink-0 sm:ms-3"},le=n("svg",{class:"h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6 18L18 6M6 6l12 12"})],-1),ce=[le],de={__name:"Banner",setup(t){const e=O(),s=y(!0),r=y("success"),o=y("");return I(async()=>{var i,c;r.value=((i=e.props.jetstream.flash)==null?void 0:i.bannerStyle)||"success",o.value=((c=e.props.jetstream.flash)==null?void 0:c.banner)||"",s.value=!0}),(i,c)=>(a(),l("div",null,[s.value&&o.value?(a(),l("div",{key:0,class:C({"bg-indigo-500":r.value=="success","bg-red-700":r.value=="danger"})},[n("div",G,[n("div",Q,[n("div",W,[n("span",{class:C(["flex p-2 rounded-lg",{"bg-indigo-600":r.value=="success","bg-red-600":r.value=="danger"}])},[r.value=="success"?(a(),l("svg",ee,se)):f("",!0),r.value=="danger"?(a(),l("svg",ne,oe)):f("",!0)],2),n("p",ie,x(o.value),1)]),n("div",ae,[n("button",{type:"button",class:C(["-me-1 flex p-2 rounded-md focus:outline-none sm:-me-2 transition",{"hover:bg-indigo-600 focus:bg-indigo-600":r.value=="success","hover:bg-red-600 focus:bg-red-600":r.value=="danger"}]),"aria-label":"Dismiss",onClick:c[0]||(c[0]=T($=>s.value=!1,["prevent"]))},ce,2)])])])],2)):f("",!0)]))}};var ue=D.extend({name:"styleclass-directive"}),fe=F.extend({style:ue}),pe=fe.extend("styleclass",{mounted:function(e,s){e.setAttribute("data-pd-styleclass",!0),this.bind(e,s)},unmounted:function(e){this.unbind(e)},methods:{bind:function(e,s){var r=this,o=this.resolveTarget(e,s);this.$el=o,e.$_pstyleclass_clicklistener=function(){s.value.toggleClass?j(o,s.value.toggleClass)?w(o,s.value.toggleClass):m(o,s.value.toggleClass):o.offsetParent===null?r.enter(o,e,s):r.leave(o,s)},e.addEventListener("click",e.$_pstyleclass_clicklistener)},unbind:function(e){e.$_pstyleclass_clicklistener&&(e.removeEventListener("click",e.$_pstyleclass_clicklistener),e.$_pstyleclass_clicklistener=null),this.unbindDocumentListener(e)},enter:function(e,s,r){r.value.enterActiveClass?e.$_pstyleclass_animating||(e.$_pstyleclass_animating=!0,r.value.enterActiveClass.includes("slidedown")&&(e.style.height="0px",w(e,"hidden"),e.style.maxHeight=e.scrollHeight+"px",m(e,"hidden"),e.style.height=""),m(e,r.value.enterActiveClass),r.value.enterFromClass&&w(e,r.value.enterFromClass),e.$p_styleclass_enterlistener=function(){w(e,r.value.enterActiveClass),r.value.enterToClass&&m(e,r.value.enterToClass),e.removeEventListener("animationend",e.$p_styleclass_enterlistener),r.value.enterActiveClass.includes("slidedown")&&(e.style.maxHeight=""),e.$_pstyleclass_animating=!1},e.addEventListener("animationend",e.$p_styleclass_enterlistener)):(r.value.enterFromClass&&w(e,r.value.enterFromClass),r.value.enterToClass&&m(e,r.value.enterToClass)),r.value.hideOnOutsideClick&&this.bindDocumentListener(e,s,r)},leave:function(e,s){s.value.leaveActiveClass?e.$_pstyleclass_animating||(e.$_pstyleclass_animating=!0,m(e,s.value.leaveActiveClass),s.value.leaveFromClass&&w(e,s.value.leaveFromClass),e.$p_styleclass_leavelistener=function(){w(e,s.value.leaveActiveClass),s.value.leaveToClass&&m(e,s.value.leaveToClass),e.removeEventListener("animationend",e.$p_styleclass_leavelistener),e.$_pstyleclass_animating=!1},e.addEventListener("animationend",e.$p_styleclass_leavelistener)):(s.value.leaveFromClass&&w(e,s.value.leaveFromClass),s.value.leaveToClass&&m(e,s.value.leaveToClass)),s.value.hideOnOutsideClick&&this.unbindDocumentListener(e)},resolveTarget:function(e,s){switch(s.value.selector){case"@next":return e.nextElementSibling;case"@prev":return e.previousElementSibling;case"@parent":return e.parentElement;case"@grandparent":return e.parentElement.parentElement;default:return document.querySelector(s.value.selector)}},bindDocumentListener:function(e,s,r){var o=this;e.$p_styleclass_documentlistener||(e.$p_styleclass_documentlistener=function(i){!o.isVisible(e)||getComputedStyle(e).getPropertyValue("position")==="static"?o.unbindDocumentListener(e):o.isOutsideClick(i,e,s)&&o.leave(e,r)},e.ownerDocument.addEventListener("click",e.$p_styleclass_documentlistener))},unbindDocumentListener:function(e){e.$p_styleclass_documentlistener&&(e.ownerDocument.removeEventListener("click",e.$p_styleclass_documentlistener),e.$p_styleclass_documentlistener=null)},isVisible:function(e){return e.offsetParent!==null},isOutsideClick:function(e,s,r){return!r.isSameNode(e.target)&&!r.contains(e.target)&&!s.contains(e.target)}}});const he={class:"flex flex-col h-full"},me={class:"flex items-center justify-between px-2 pt-4 shrink-0"},ve=n("span",{class:"inline-flex items-center gap-2"},[n("img",{src:"/images/logo.webp",class:"size-14",alt:""}),n("span",{class:"font-semibold text-2xl text-primary"},"AV Colombia")],-1),we={class:"flex lg:hidden"},_e={class:"overflow-y-auto"},be={class:"list-none p-2 m-0"},ke={class:"p-4 flex items-center justify-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple"},ye=n("span",{class:"font-medium"},"FAVORITES",-1),Ce=n("i",{class:"pi pi-chevron-down"},null,-1),xe=[ye,Ce],ge={class:"list-none p-0 m-0 overflow-hidden"},Le=n("i",{class:"pi pi-home mr-2"},null,-1),$e=n("span",{class:"font-medium"},"Dashboard",-1),Be=n("svg",{class:"size-4 mr-2",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"}),n("path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"})],-1),De=n("span",{class:"font-medium"},"Servicios",-1),Se={class:"flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"},Ee=n("i",{class:"pi pi-calendar mr-2"},null,-1),Ae=n("span",{class:"font-medium"},"Reservas",-1),Re=n("i",{class:"pi pi-chevron-down ml-auto"},null,-1),Oe=[Ee,Ae,Re],Ie={class:"list-none py-0 pl-4 pr-0 m-0 hidden overflow-y-hidden transition-all duration-[400ms] ease-in-out"},Te=n("i",{class:"fa-solid fa-person-hiking mr-2"},null,-1),Fe=n("span",{class:"font-medium"},"Experiencias",-1),je=n("i",{class:"pi pi-dollar mr-2"},null,-1),Ke=n("span",{class:"font-pago"},"Pagos",-1),Me=n("i",{class:"pi pi-truck mr-2"},null,-1),ze=n("span",{class:"font-pago"},"Proveedores",-1),Ve=n("i",{class:"pi pi-cog mr-2"},null,-1),Pe=n("span",{class:"font-medium"},"Ajustes",-1),Ze={class:"mt-auto"},He=n("hr",{class:"border-t border-0 border-surface-200 dark:border-surface-700"},null,-1),Ne={class:"flex items-center"},Ue={class:"w-full flex items-center cursor-pointer p-2 gap-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple truncate"},qe={class:"font-bold"},Je={class:"w-full py-2 border-l-2 flex justify-center items-center cursor-pointer hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple gap-x-4 text-red-500"},Xe=n("p",null," Salir ",-1),Ye=n("i",{class:"pi pi-sign-out"},null,-1),S={__name:"Menu",setup(t){return(e,s)=>{const r=L,o=U,i=pe;return a(),l("div",he,[n("div",me,[ve,n("span",we,[p(r,{type:"button",onClick:e.closeCallback,icon:"pi pi-times",rounded:"",outlined:""},null,8,["onClick"])])]),n("div",_e,[n("ul",be,[n("li",null,[u((a(),l("div",ke,xe)),[[o],[i,{selector:"@next",enterFromClass:"hidden",enterActiveClass:"animate-slidedown",leaveToClass:"hidden",leaveActiveClass:"animate-slideup"}]]),n("ul",ge,[n("li",null,[u((a(),v(_(b),{href:e.route("dashboard"),class:"flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"},{default:d(()=>[Le,$e]),_:1},8,["href"])),[[o]])]),n("li",null,[u((a(),v(_(b),{href:e.route("services.index"),class:"flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"},{default:d(()=>[Be,De]),_:1},8,["href"])),[[o]])]),n("li",null,[u((a(),l("a",Se,Oe)),[[o],[i,{selector:"@next",enterFromClass:"hidden",enterActiveClass:"animate-slidedown",leaveToClass:"hidden",leaveActiveClass:"animate-slideup"}]]),n("ul",Ie,[n("li",null,[u((a(),v(_(b),{href:e.route("BookingServices.index"),class:"flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"},{default:d(()=>[Te,Fe]),_:1},8,["href"])),[[o]])])])]),n("li",null,[e.$page.props.auth.user.rol=="admin"?u((a(),v(_(b),{key:0,href:e.route("payments.index"),class:"flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"},{default:d(()=>[je,Ke]),_:1},8,["href"])),[[o]]):f("",!0)]),n("li",null,[e.$page.props.auth.user.rol=="admin"?u((a(),v(_(b),{key:0,href:e.route("proveedors.index"),class:"flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"},{default:d(()=>[Me,ze]),_:1},8,["href"])),[[o]]):f("",!0)]),n("li",null,[e.$page.props.auth.user.rol=="admin"?u((a(),v(_(b),{key:0,href:e.route("settings"),class:"flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"},{default:d(()=>[Ve,Pe]),_:1},8,["href"])),[[o]]):f("",!0)])])])])]),n("div",Ze,[He,n("div",Ne,[u((a(),l("a",Ue,[n("span",qe,x(e.$page.props.auth.user.name),1)])),[[o]]),n("div",Je,[p(_(b),{href:e.route("logout"),method:"post",class:"flex items-center gap-x-4"},{default:d(()=>[Xe,Ye]),_:1},8,["href"])])])])])}}};var Ge=function(e){var s=e.dt;return`
.p-drawer {
    display: flex;
    flex-direction: column;
    pointer-events: auto;
    transform: translate3d(0px, 0px, 0px);
    position: relative;
    transition: transform 0.3s;
    background: `.concat(s("drawer.background"),`;
    color: `).concat(s("drawer.color"),`;
    border: 1px solid `).concat(s("drawer.border.color"),`;
    box-shadow: `).concat(s("drawer.shadow"),`;
}

.p-drawer-content {
    overflow-y: auto;
    flex-grow: 1;
    padding: `).concat(s("drawer.content.padding"),`;
}

.p-drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    padding: `).concat(s("drawer.header.padding"),`;
}

.p-drawer-footer {
    padding: `).concat(s("drawer.header.padding"),`;
}

.p-drawer-title {
    font-weight: `).concat(s("drawer.title.font.weight"),`;
    font-size: `).concat(s("drawer.title.font.size"),`;
}

.p-drawer-full .p-drawer {
    transition: none;
    transform: none;
    width: 100vw !important;
    height: 100vh !important;
    max-height: 100%;
    top: 0px !important;
    left: 0px !important;
    border-width: 1px;
}

.p-drawer-left .p-drawer-enter-from,
.p-drawer-left .p-drawer-leave-to {
    transform: translateX(-100%);
}

.p-drawer-right .p-drawer-enter-from,
.p-drawer-right .p-drawer-leave-to {
    transform: translateX(100%);
}

.p-drawer-top .p-drawer-enter-from,
.p-drawer-top .p-drawer-leave-to {
    transform: translateY(-100%);
}

.p-drawer-bottom .p-drawer-enter-from,
.p-drawer-bottom .p-drawer-leave-to {
    transform: translateY(100%);
}

.p-drawer-full .p-drawer-enter-from,
.p-drawer-full .p-drawer-leave-to {
    opacity: 0;
}

.p-drawer-full .p-drawer-enter-active,
.p-drawer-full .p-drawer-leave-active {
    transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
}

.p-drawer-left .p-drawer {
    width: 20rem;
    height: 100%;
    border-right-width: 1px;
}

.p-drawer-right .p-drawer {
    width: 20rem;
    height: 100%;
    border-left-width: 1px;
}

.p-drawer-top .p-drawer {
    height: 10rem;
    width: 100%;
    border-bottom-width: 1px;
}

.p-drawer-bottom .p-drawer {
    height: 10rem;
    width: 100%;
    border-top-width: 1px;
}

.p-drawer-left .p-drawer-content,
.p-drawer-right .p-drawer-content,
.p-drawer-top .p-drawer-content,
.p-drawer-bottom .p-drawer-content {
    width: 100%;
    height: 100%;
}

.p-drawer-open {
    display: flex;
}
`)},Qe={mask:function(e){var s=e.position;return{position:"fixed",height:"100%",width:"100%",left:0,top:0,display:"flex",justifyContent:s==="left"?"flex-start":s==="right"?"flex-end":"center",alignItems:s==="top"?"flex-start":s==="bottom"?"flex-end":"center"}}},We={mask:function(e){var s=e.instance,r=e.props,o=["left","right","top","bottom"],i=o.find(function(c){return c===r.position});return["p-drawer-mask",{"p-overlay-mask p-overlay-mask-enter":r.modal,"p-drawer-open":s.containerVisible,"p-drawer-full":s.fullScreen},i?"p-drawer-".concat(i):""]},root:function(e){var s=e.instance;return["p-drawer p-component",{"p-drawer-full":s.fullScreen}]},header:"p-drawer-header",title:"p-drawer-title",pcCloseButton:"p-drawer-close-button",content:"p-drawer-content",footer:"p-drawer-footer"},et=D.extend({name:"drawer",theme:Ge,classes:We,inlineStyles:Qe}),tt={name:"BaseDrawer",extends:q,props:{visible:{type:Boolean,default:!1},position:{type:String,default:"left"},header:{type:null,default:null},baseZIndex:{type:Number,default:0},autoZIndex:{type:Boolean,default:!0},dismissable:{type:Boolean,default:!0},showCloseIcon:{type:Boolean,default:!0},closeButtonProps:{type:Object,default:function(){return{severity:"secondary",text:!0,rounded:!0}}},closeIcon:{type:String,default:void 0},modal:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!1}},style:et,provide:function(){return{$pcDrawer:this,$parentInstance:this}},watch:{dismissable:function(e){e?this.bindOutsideClickListener():this.unbindOutsideClickListener()}}},E={name:"Drawer",extends:tt,inheritAttrs:!1,emits:["update:visible","show","hide","after-hide"],data:function(){return{containerVisible:this.visible}},container:null,mask:null,content:null,headerContainer:null,footerContainer:null,closeButton:null,outsideClickListener:null,documentKeydownListener:null,updated:function(){this.visible&&(this.containerVisible=this.visible)},beforeUnmount:function(){this.disableDocumentSettings(),this.mask&&this.autoZIndex&&g.clear(this.mask),this.container=null,this.mask=null},methods:{hide:function(){this.$emit("update:visible",!1)},onEnter:function(){this.$emit("show"),this.focus(),this.bindDocumentKeyDownListener(),this.autoZIndex&&g.set("modal",this.mask,this.baseZIndex||this.$primevue.config.zIndex.modal)},onAfterEnter:function(){this.enableDocumentSettings()},onBeforeLeave:function(){this.modal&&!this.isUnstyled&&m(this.mask,"p-overlay-mask-leave")},onLeave:function(){this.$emit("hide")},onAfterLeave:function(){this.autoZIndex&&g.clear(this.mask),this.unbindDocumentKeyDownListener(),this.containerVisible=!1,this.disableDocumentSettings(),this.$emit("after-hide")},onMaskClick:function(e){this.dismissable&&this.modal&&this.mask===e.target&&this.hide()},focus:function(){var e=function(o){return o&&o.querySelector("[autofocus]")},s=this.$slots.header&&e(this.headerContainer);s||(s=this.$slots.default&&e(this.container),s||(s=this.$slots.footer&&e(this.footerContainer),s||(s=this.closeButton))),s&&K(s)},enableDocumentSettings:function(){this.dismissable&&!this.modal&&this.bindOutsideClickListener(),this.blockScroll&&M()},disableDocumentSettings:function(){this.unbindOutsideClickListener(),this.blockScroll&&z()},onKeydown:function(e){e.code==="Escape"&&this.hide()},containerRef:function(e){this.container=e},maskRef:function(e){this.mask=e},contentRef:function(e){this.content=e},headerContainerRef:function(e){this.headerContainer=e},footerContainerRef:function(e){this.footerContainer=e},closeButtonRef:function(e){this.closeButton=e?e.$el:void 0},bindDocumentKeyDownListener:function(){this.documentKeydownListener||(this.documentKeydownListener=this.onKeydown,document.addEventListener("keydown",this.documentKeydownListener))},unbindDocumentKeyDownListener:function(){this.documentKeydownListener&&(document.removeEventListener("keydown",this.documentKeydownListener),this.documentKeydownListener=null)},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(s){e.isOutsideClicked(s)&&e.hide()},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null)},isOutsideClicked:function(e){return this.container&&!this.container.contains(e.target)}},computed:{fullScreen:function(){return this.position==="full"},closeAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.close:void 0}},directives:{focustrap:X},components:{Button:L,Portal:Y,TimesIcon:J}},st=["aria-modal"];function nt(t,e,s,r,o,i){var c=B("Button"),$=B("Portal"),A=V("focustrap");return a(),v($,null,{default:d(function(){return[o.containerVisible?(a(),l("div",h({key:0,ref:i.maskRef,onMousedown:e[0]||(e[0]=function(){return i.onMaskClick&&i.onMaskClick.apply(i,arguments)}),class:t.cx("mask"),style:t.sx("mask",!0,{position:t.position})},t.ptm("mask")),[p(P,h({name:"p-drawer",onEnter:i.onEnter,onAfterEnter:i.onAfterEnter,onBeforeLeave:i.onBeforeLeave,onLeave:i.onLeave,onAfterLeave:i.onAfterLeave,appear:""},t.ptm("transition")),{default:d(function(){return[t.visible?u((a(),l("div",h({key:0,ref:i.containerRef,class:t.cx("root"),role:"complementary","aria-modal":t.modal},t.ptmi("root")),[t.$slots.container?k(t.$slots,"container",{key:0,closeCallback:i.hide}):(a(),l(Z,{key:1},[n("div",h({ref:i.headerContainerRef,class:t.cx("header")},t.ptm("header")),[k(t.$slots,"header",{class:C(t.cx("title"))},function(){return[t.header?(a(),l("div",h({key:0,class:t.cx("title")},t.ptm("title")),x(t.header),17)):f("",!0)]}),t.showCloseIcon?(a(),v(c,h({key:0,ref:i.closeButtonRef,type:"button",class:t.cx("pcCloseButton"),"aria-label":i.closeAriaLabel,unstyled:t.unstyled,onClick:i.hide},t.closeButtonProps,{pt:t.ptm("pcCloseButton"),"data-pc-group-section":"iconcontainer"}),{icon:d(function(R){return[k(t.$slots,"closeicon",{},function(){return[(a(),v(H(t.closeIcon?"span":"TimesIcon"),h({class:[t.closeIcon,R.class]},t.ptm("pcCloseButton").icon),null,16,["class"]))]})]}),_:3},16,["class","aria-label","unstyled","onClick","pt"])):f("",!0)],16),n("div",h({ref:i.contentRef,class:t.cx("content")},t.ptm("content")),[k(t.$slots,"default")],16),n("div",h({ref:i.footerContainerRef,class:t.cx("footer")},t.ptm("footer")),[k(t.$slots,"footer")],16)],64))],16,st)),[[A]]):f("",!0)]}),_:3},16,["onEnter","onAfterEnter","onBeforeLeave","onLeave","onAfterLeave"])],16)):f("",!0)]}),_:3})}E.render=nt;const rt={class:"card flex justify-center"},ot={__name:"DrawerMenu",setup(t){const e=y(!1);return(s,r)=>{const o=E,i=L;return a(),l("div",rt,[p(o,{visible:e.value,"onUpdate:visible":r[0]||(r[0]=c=>e.value=c)},{container:d(({closeCallback:c})=>[p(S)]),_:1},8,["visible"]),p(i,{icon:"pi pi-bars",onClick:r[1]||(r[1]=c=>e.value=!0)})])}}},it={class:"bg-white"},at={class:"items-center justify-between p-6 lg:px-8 flex lg:hidden","aria-label":"Global"},lt={class:"flex lg:flex-1"},ct={href:"#",class:"-m-1.5 p-1.5"},dt={class:"text-lg font-bold capitalize"},ut={class:"flex"},ft={id:"docs-sidebar",class:"hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-2 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-800 dark:border-neutral-700"},pt={class:"px-2 lg:ml-64 bg-white h-[100vh] overflow-y-auto animate-zoomin animate-once animate-duration-700"},kt={__name:"AppLayout",props:{title:String},setup(t){return y(!1),(e,s)=>(a(),l("div",null,[p(_(N),{title:t.title},null,8,["title"]),p(de),n("div",it,[n("nav",at,[n("div",lt,[n("a",ct,[n("span",dt,x(t.title),1)])]),n("div",ut,[p(ot)])]),n("div",ft,[p(S)]),n("main",pt,[k(e.$slots,"default")])])]))}};export{kt as _,E as s};
