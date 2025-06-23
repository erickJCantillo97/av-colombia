import{C as R,D as A,eA as B,ew as P,ex as j,em as H,e5 as I,ey as Z,d$ as _,ep as U,dQ as F,e6 as k,eJ as N,e as V,e3 as q,c as K,o as r,w as C,b as S,dU as J,E as w,m as M,g as x,f as d,r as E,d as m,a as n,F as f,i as y,t as c,n as Q,u as O}from"./app-PeJkGPqm.js";import{F as Y}from"./index-nsHXcGmq.js";import{O as b}from"./index-BOKNpnX4.js";import{s as G}from"./index-DYH61HNn.js";import{R as W}from"./index-DyTnn6g2.js";import{s as X}from"./index-DIGrKXE_.js";import{c as D}from"./useCommonUtilities-DZ_927k8.js";import $ from"./ItemDetailTypeReserva-cTFnNmoP.js";var ee=R`
    .p-popover {
        margin-block-start: dt('popover.gutter');
        background: dt('popover.background');
        color: dt('popover.color');
        border: 1px solid dt('popover.border.color');
        border-radius: dt('popover.border.radius');
        box-shadow: dt('popover.shadow');
    }

    .p-popover-content {
        padding: dt('popover.content.padding');
    }

    .p-popover-flipped {
        margin-block-start: calc(dt('popover.gutter') * -1);
        margin-block-end: dt('popover.gutter');
    }

    .p-popover-enter-from {
        opacity: 0;
        transform: scaleY(0.8);
    }

    .p-popover-leave-to {
        opacity: 0;
    }

    .p-popover-enter-active {
        transition:
            transform 0.12s cubic-bezier(0, 0, 0.2, 1),
            opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
    }

    .p-popover-leave-active {
        transition: opacity 0.1s linear;
    }

    .p-popover:after,
    .p-popover:before {
        bottom: 100%;
        left: calc(dt('popover.arrow.offset') + dt('popover.arrow.left'));
        content: ' ';
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
    }

    .p-popover:after {
        border-width: calc(dt('popover.gutter') - 2px);
        margin-left: calc(-1 * (dt('popover.gutter') - 2px));
        border-style: solid;
        border-color: transparent;
        border-bottom-color: dt('popover.background');
    }

    .p-popover:before {
        border-width: dt('popover.gutter');
        margin-left: calc(-1 * dt('popover.gutter'));
        border-style: solid;
        border-color: transparent;
        border-bottom-color: dt('popover.border.color');
    }

    .p-popover-flipped:after,
    .p-popover-flipped:before {
        bottom: auto;
        top: 100%;
    }

    .p-popover.p-popover-flipped:after {
        border-bottom-color: transparent;
        border-top-color: dt('popover.background');
    }

    .p-popover.p-popover-flipped:before {
        border-bottom-color: transparent;
        border-top-color: dt('popover.border.color');
    }
`,te={root:"p-popover p-component",content:"p-popover-content"},ne=A.extend({name:"popover",style:ee,classes:te}),oe={name:"BasePopover",extends:X,props:{dismissable:{type:Boolean,default:!0},appendTo:{type:[String,Object],default:"body"},baseZIndex:{type:Number,default:0},autoZIndex:{type:Boolean,default:!0},breakpoints:{type:Object,default:null},closeOnEscape:{type:Boolean,default:!0}},style:ne,provide:function(){return{$pcPopover:this,$parentInstance:this}}},T={name:"Popover",extends:oe,inheritAttrs:!1,emits:["show","hide"],data:function(){return{visible:!1}},watch:{dismissable:{immediate:!0,handler:function(e){e?this.bindOutsideClickListener():this.unbindOutsideClickListener()}}},selfClick:!1,target:null,eventTarget:null,outsideClickListener:null,scrollHandler:null,resizeListener:null,container:null,styleElement:null,overlayEventListener:null,documentKeydownListener:null,beforeUnmount:function(){this.dismissable&&this.unbindOutsideClickListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.destroyStyle(),this.unbindResizeListener(),this.target=null,this.container&&this.autoZIndex&&k.clear(this.container),this.overlayEventListener&&(b.off("overlay-click",this.overlayEventListener),this.overlayEventListener=null),this.container=null},mounted:function(){this.breakpoints&&this.createStyle()},methods:{toggle:function(e,i){this.visible?this.hide():this.show(e,i)},show:function(e,i){this.visible=!0,this.eventTarget=e.currentTarget,this.target=i||e.currentTarget},hide:function(){this.visible=!1},onContentClick:function(){this.selfClick=!0},onEnter:function(e){var i=this;N(e,{position:"absolute",top:"0"}),this.alignOverlay(),this.dismissable&&this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.autoZIndex&&k.set("overlay",e,this.baseZIndex+this.$primevue.config.zIndex.overlay),this.overlayEventListener=function(a){i.container.contains(a.target)&&(i.selfClick=!0)},this.focus(),b.on("overlay-click",this.overlayEventListener),this.$emit("show"),this.closeOnEscape&&this.bindDocumentKeyDownListener()},onLeave:function(){this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.unbindDocumentKeyDownListener(),b.off("overlay-click",this.overlayEventListener),this.overlayEventListener=null,this.$emit("hide")},onAfterLeave:function(e){this.autoZIndex&&k.clear(e)},alignOverlay:function(){Z(this.container,this.target,!1);var e=_(this.container),i=_(this.target),a=0;e.left<i.left&&(a=i.left-e.left),this.container.style.setProperty(U("popover.arrow.left").name,"".concat(a,"px")),e.top<i.top&&(this.container.setAttribute("data-p-popover-flipped","true"),!this.isUnstyled&&F(this.container,"p-popover-flipped"))},onContentKeydown:function(e){e.code==="Escape"&&this.closeOnEscape&&(this.hide(),I(this.target))},onButtonKeydown:function(e){switch(e.code){case"ArrowDown":case"ArrowUp":case"ArrowLeft":case"ArrowRight":e.preventDefault()}},focus:function(){var e=this.container.querySelector("[autofocus]");e&&e.focus()},onKeyDown:function(e){e.code==="Escape"&&this.closeOnEscape&&(this.visible=!1)},bindDocumentKeyDownListener:function(){this.documentKeydownListener||(this.documentKeydownListener=this.onKeyDown.bind(this),window.document.addEventListener("keydown",this.documentKeydownListener))},unbindDocumentKeyDownListener:function(){this.documentKeydownListener&&(window.document.removeEventListener("keydown",this.documentKeydownListener),this.documentKeydownListener=null)},bindOutsideClickListener:function(){var e=this;!this.outsideClickListener&&H()&&(this.outsideClickListener=function(i){e.visible&&!e.selfClick&&!e.isTargetClicked(i)&&(e.visible=!1),e.selfClick=!1},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null,this.selfClick=!1)},bindScrollListener:function(){var e=this;this.scrollHandler||(this.scrollHandler=new j(this.target,function(){e.visible&&(e.visible=!1)})),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(){e.visible&&!P()&&(e.visible=!1)},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},isTargetClicked:function(e){return this.eventTarget&&(this.eventTarget===e.target||this.eventTarget.contains(e.target))},containerRef:function(e){this.container=e},createStyle:function(){if(!this.styleElement&&!this.isUnstyled){var e;this.styleElement=document.createElement("style"),this.styleElement.type="text/css",B(this.styleElement,"nonce",(e=this.$primevue)===null||e===void 0||(e=e.config)===null||e===void 0||(e=e.csp)===null||e===void 0?void 0:e.nonce),document.head.appendChild(this.styleElement);var i="";for(var a in this.breakpoints)i+=`
                        @media screen and (max-width: `.concat(a,`) {
                            .p-popover[`).concat(this.$attrSelector,`] {
                                width: `).concat(this.breakpoints[a],` !important;
                            }
                        }
                    `);this.styleElement.innerHTML=i}},destroyStyle:function(){this.styleElement&&(document.head.removeChild(this.styleElement),this.styleElement=null)},onOverlayClick:function(e){b.emit("overlay-click",{originalEvent:e,target:this.target})}},directives:{focustrap:Y,ripple:W},components:{Portal:G}},se=["aria-modal"];function ie(t,e,i,a,p,o){var g=V("Portal"),v=q("focustrap");return r(),K(g,{appendTo:t.appendTo},{default:C(function(){return[S(J,w({name:"p-popover",onEnter:o.onEnter,onLeave:o.onLeave,onAfterLeave:o.onAfterLeave},t.ptm("transition")),{default:C(function(){return[p.visible?M((r(),d("div",w({key:0,ref:o.containerRef,role:"dialog","aria-modal":p.visible,onClick:e[3]||(e[3]=function(){return o.onOverlayClick&&o.onOverlayClick.apply(o,arguments)}),class:t.cx("root")},t.ptmi("root")),[t.$slots.container?E(t.$slots,"container",{key:0,closeCallback:o.hide,keydownCallback:function(u){return o.onButtonKeydown(u)}}):(r(),d("div",w({key:1,class:t.cx("content"),onClick:e[0]||(e[0]=function(){return o.onContentClick&&o.onContentClick.apply(o,arguments)}),onMousedown:e[1]||(e[1]=function(){return o.onContentClick&&o.onContentClick.apply(o,arguments)}),onKeydown:e[2]||(e[2]=function(){return o.onContentKeydown&&o.onContentKeydown.apply(o,arguments)})},t.ptm("content")),[E(t.$slots,"default")],16))],16,se)),[[v]]):x("",!0)]}),_:3},16,["onEnter","onLeave","onAfterLeave"])]}),_:3},8,["appendTo"])}T.render=ie;const re={class:"flex justify-between gap-x-4"},le={class:"flex flex-col gap-4"},ae={class:"font-medium block mb-2"},ce={class:"w-full bg-gray-200 rounded-md p-2 grid grid-cols-2 divide-y-2 md:flex space-x-2"},de=["onClick"],ue={class:"flex flex-col gap-y-2 h-64 overflow-auto"},pe={key:0},fe={class:"flex items-center gap-x-8 border-b shadow-md justify-between p-3 rounded-md hover:bg-gray-300"},ve={class:"flex flex-col"},he={class:"font-bold flex items-center gap-x-2"},me={class:"text-xs"},ye={class:"flex flex-col"},be={class:"text-sm"},ge={class:"font-bold"},Le={key:1},ke={class:"flex items-center gap-x-8 border-b shadow-md justify-between p-3 rounded-md hover:bg-gray-300"},we={class:"flex flex-col"},Ce={class:"font-bold flex items-center gap-x-2"},xe={class:"text-xs"},_e={class:"text-xs"},Ee={class:"flex flex-col"},Oe={class:"text-sm"},De={class:"font-bold"},je={__name:"DetailsTypeReserva",props:{reservasType:{type:Array,required:!0}},setup(t){const e=m(1),i=[{name:"Agrupados",value:1},{name:"Detalles",value:2}],a=m(),p=m([]),o=m([]),g=(v,h)=>{o.value=h.value.reduce((u,s)=>{const l=s.title;return u[l]||(u[l]={count:0,pasajeros:0,total:0}),u[l].count+=1,u[l].pasajeros+=s.adults,u[l].total+=s.proveedors.reduce((L,z)=>L+z.cost,0),u},{}),p.value=h,a.value.toggle(v)};return(v,h)=>{const u=T;return r(),d(f,null,[n("div",re,[(r(!0),d(f,null,y(t.reservasType,s=>(r(),K($,{key:s.name,reservas:s,onClick:l=>g(l,s)},null,8,["reservas","onClick"]))),128))]),S(u,{ref_key:"op",ref:a},{default:C(()=>[n("div",le,[n("div",null,[n("span",ae,c(p.value.name),1),n("div",ce,[(r(),d(f,null,y(i,s=>n("div",{onClick:l=>e.value=s.value,class:Q(["w-full rounded-lg text-center py-2 text-sm md:text-md cursor-pointer",e.value==s.value?"bg-white":"hover:bg-white/30"])},c(s.name),11,de)),64))]),n("div",ue,[e.value==1?(r(),d("div",pe,[(r(!0),d(f,null,y(o.value,(s,l)=>(r(),d("div",fe,[n("div",ve,[n("span",he,[n("p",null,c(l),1)]),n("span",me,c(s.count)+" Reservas",1)]),n("div",ye,[n("span",be,c(s.pasajeros)+" Pasajeros",1),n("span",ge,c(O(D)(s.total)),1)])]))),256))])):x("",!0),e.value==2?(r(),d("div",Le,[(r(!0),d(f,null,y(p.value.value,s=>(r(),d("div",ke,[n("div",we,[n("span",Ce,[n("p",null,c(s.title),1)]),n("span",xe,c(s.cliente_name),1),n("span",_e,c(s.fecha),1)]),n("div",Ee,[n("span",Oe,c(s.adults)+" Pasajeros",1),n("span",De,c(O(D)(s.proveedors.reduce((l,L)=>l+L.cost,0))),1)])]))),256))])):x("",!0)])])])]),_:1},512)],64)}}};export{je as default};
