import{C as A,D as B,eB as P,ex as j,ey as H,em as I,dT as N,ez as Z,e5 as K,ep as U,dQ as F,dU as C,eK as V,e as q,dV as M,c as S,o as a,w as O,b as T,dW as Q,E as x,m as W,g as L,f as d,r as D,d as b,a as s,F as v,i as m,t as l,n as Y,u as _,h as G}from"./app-BwhPsljL.js";import{F as J}from"./index-ZvHcGSgV.js";import{O as g}from"./index-BKOpW1h_.js";import{s as X}from"./index-BZm2E25-.js";import{R as $}from"./index-ztwUFxkl.js";import{s as ee}from"./index-mnkmwl0Y.js";import{c as E}from"./useCommonUtilities-BgDhORlD.js";import te from"./ItemDetailTypeReserva-DdtAsmJg.js";var oe=A`
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
`,ne={root:"p-popover p-component",content:"p-popover-content"},se=B.extend({name:"popover",style:oe,classes:ne}),ie={name:"BasePopover",extends:ee,props:{dismissable:{type:Boolean,default:!0},appendTo:{type:[String,Object],default:"body"},baseZIndex:{type:Number,default:0},autoZIndex:{type:Boolean,default:!0},breakpoints:{type:Object,default:null},closeOnEscape:{type:Boolean,default:!0}},style:se,provide:function(){return{$pcPopover:this,$parentInstance:this}}},z={name:"Popover",extends:ie,inheritAttrs:!1,emits:["show","hide"],data:function(){return{visible:!1}},watch:{dismissable:{immediate:!0,handler:function(e){e?this.bindOutsideClickListener():this.unbindOutsideClickListener()}}},selfClick:!1,target:null,eventTarget:null,outsideClickListener:null,scrollHandler:null,resizeListener:null,container:null,styleElement:null,overlayEventListener:null,documentKeydownListener:null,beforeUnmount:function(){this.dismissable&&this.unbindOutsideClickListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.destroyStyle(),this.unbindResizeListener(),this.target=null,this.container&&this.autoZIndex&&C.clear(this.container),this.overlayEventListener&&(g.off("overlay-click",this.overlayEventListener),this.overlayEventListener=null),this.container=null},mounted:function(){this.breakpoints&&this.createStyle()},methods:{toggle:function(e,r){this.visible?this.hide():this.show(e,r)},show:function(e,r){this.visible=!0,this.eventTarget=e.currentTarget,this.target=r||e.currentTarget},hide:function(){this.visible=!1},onContentClick:function(){this.selfClick=!0},onEnter:function(e){var r=this;V(e,{position:"absolute",top:"0"}),this.alignOverlay(),this.dismissable&&this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.autoZIndex&&C.set("overlay",e,this.baseZIndex+this.$primevue.config.zIndex.overlay),this.overlayEventListener=function(c){r.container.contains(c.target)&&(r.selfClick=!0)},this.focus(),g.on("overlay-click",this.overlayEventListener),this.$emit("show"),this.closeOnEscape&&this.bindDocumentKeyDownListener()},onLeave:function(){this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.unbindDocumentKeyDownListener(),g.off("overlay-click",this.overlayEventListener),this.overlayEventListener=null,this.$emit("hide")},onAfterLeave:function(e){this.autoZIndex&&C.clear(e)},alignOverlay:function(){Z(this.container,this.target,!1);var e=K(this.container),r=K(this.target),c=0;e.left<r.left&&(c=r.left-e.left),this.container.style.setProperty(U("popover.arrow.left").name,"".concat(c,"px")),e.top<r.top&&(this.container.setAttribute("data-p-popover-flipped","true"),!this.isUnstyled&&F(this.container,"p-popover-flipped"))},onContentKeydown:function(e){e.code==="Escape"&&this.closeOnEscape&&(this.hide(),N(this.target))},onButtonKeydown:function(e){switch(e.code){case"ArrowDown":case"ArrowUp":case"ArrowLeft":case"ArrowRight":e.preventDefault()}},focus:function(){var e=this.container.querySelector("[autofocus]");e&&e.focus()},onKeyDown:function(e){e.code==="Escape"&&this.closeOnEscape&&(this.visible=!1)},bindDocumentKeyDownListener:function(){this.documentKeydownListener||(this.documentKeydownListener=this.onKeyDown.bind(this),window.document.addEventListener("keydown",this.documentKeydownListener))},unbindDocumentKeyDownListener:function(){this.documentKeydownListener&&(window.document.removeEventListener("keydown",this.documentKeydownListener),this.documentKeydownListener=null)},bindOutsideClickListener:function(){var e=this;!this.outsideClickListener&&I()&&(this.outsideClickListener=function(r){e.visible&&!e.selfClick&&!e.isTargetClicked(r)&&(e.visible=!1),e.selfClick=!1},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null,this.selfClick=!1)},bindScrollListener:function(){var e=this;this.scrollHandler||(this.scrollHandler=new H(this.target,function(){e.visible&&(e.visible=!1)})),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(){e.visible&&!j()&&(e.visible=!1)},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},isTargetClicked:function(e){return this.eventTarget&&(this.eventTarget===e.target||this.eventTarget.contains(e.target))},containerRef:function(e){this.container=e},createStyle:function(){if(!this.styleElement&&!this.isUnstyled){var e;this.styleElement=document.createElement("style"),this.styleElement.type="text/css",P(this.styleElement,"nonce",(e=this.$primevue)===null||e===void 0||(e=e.config)===null||e===void 0||(e=e.csp)===null||e===void 0?void 0:e.nonce),document.head.appendChild(this.styleElement);var r="";for(var c in this.breakpoints)r+=`
                        @media screen and (max-width: `.concat(c,`) {
                            .p-popover[`).concat(this.$attrSelector,`] {
                                width: `).concat(this.breakpoints[c],` !important;
                            }
                        }
                    `);this.styleElement.innerHTML=r}},destroyStyle:function(){this.styleElement&&(document.head.removeChild(this.styleElement),this.styleElement=null)},onOverlayClick:function(e){g.emit("overlay-click",{originalEvent:e,target:this.target})}},directives:{focustrap:J,ripple:$},components:{Portal:X}},re=["aria-modal"];function le(t,e,r,c,h,n){var y=q("Portal"),k=M("focustrap");return a(),S(y,{appendTo:t.appendTo},{default:O(function(){return[T(Q,x({name:"p-popover",onEnter:n.onEnter,onLeave:n.onLeave,onAfterLeave:n.onAfterLeave},t.ptm("transition")),{default:O(function(){return[h.visible?W((a(),d("div",x({key:0,ref:n.containerRef,role:"dialog","aria-modal":h.visible,onClick:e[3]||(e[3]=function(){return n.onOverlayClick&&n.onOverlayClick.apply(n,arguments)}),class:t.cx("root")},t.ptmi("root")),[t.$slots.container?D(t.$slots,"container",{key:0,closeCallback:n.hide,keydownCallback:function(p){return n.onButtonKeydown(p)}}):(a(),d("div",x({key:1,class:t.cx("content"),onClick:e[0]||(e[0]=function(){return n.onContentClick&&n.onContentClick.apply(n,arguments)}),onMousedown:e[1]||(e[1]=function(){return n.onContentClick&&n.onContentClick.apply(n,arguments)}),onKeydown:e[2]||(e[2]=function(){return n.onContentKeydown&&n.onContentKeydown.apply(n,arguments)})},t.ptm("content")),[D(t.$slots,"default")],16))],16,re)),[[k]]):L("",!0)]}),_:3},16,["onEnter","onLeave","onAfterLeave"])]}),_:3},8,["appendTo"])}z.render=le;const ae={class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between"},de={class:"flex flex-col gap-4"},ce={class:"font-medium block mb-2"},ue={class:"w-full bg-gray-200 rounded-md p-2 grid grid-cols-2 divide-y-2 md:flex space-x-2"},pe=["onClick"],fe={class:"flex flex-col gap-y-2 h-64 overflow-auto"},ve={key:0},he={class:"flex items-center gap-x-8 border-b shadow-md justify-between p-3 rounded-md hover:bg-gray-300"},ye={class:"flex flex-col"},be={class:"font-bold flex items-center gap-x-2"},me={class:"text-xs"},ge={class:"flex flex-col"},Le={class:"text-sm"},ke={class:"font-bold"},we={key:1},Ce={class:"flex items-center gap-x-8 border-b shadow-md justify-between p-3 rounded-md hover:bg-gray-300"},xe={class:"flex flex-col"},_e={class:"font-bold flex items-center gap-x-2"},Ee={class:"text-xs"},Oe={key:0,class:"px-1.5 py-0.5 border border-red-700 text-red-700 rounded-lg"},Ke={class:"text-xs"},De={class:"flex flex-col"},Se={class:"text-sm"},Te={class:"font-bold text-end"},Ne={__name:"DetailsTypeReserva",props:{reservasType:{type:Array,required:!0},proveedor:{type:[Number,String],required:!0}},setup(t){const e=b(1),r=[{name:"Agrupados",value:1},{name:"Detalles",value:2}],c=b(),h=t,n=b([]),y=b([]),k=(w,p)=>{y.value=p.value.reduce((u,o)=>{const i=o.title;return u[i]||(u[i]={count:0,pasajeros:0,total:0,boys:0}),u[i].count+=1,u[i].pasajeros+=o.adults,u[i].boys+=o.boys,u[i].total+=o.proveedors.filter(f=>f.proveedor_id==h.proveedor).reduce((f,R)=>f+R.cost_total,0),u},{}),n.value=p,c.value.toggle(w)};return(w,p)=>{const u=z;return a(),d(v,null,[s("div",ae,[(a(!0),d(v,null,m(t.reservasType,o=>(a(),S(te,{key:o.name,reservas:o,onClick:i=>k(i,o),proveedor:t.proveedor},null,8,["reservas","onClick","proveedor"]))),128))]),T(u,{ref_key:"op",ref:c},{default:O(()=>[s("div",de,[s("div",null,[s("span",ce,l(n.value.name),1),s("div",ue,[(a(),d(v,null,m(r,o=>s("div",{onClick:i=>e.value=o.value,class:Y(["w-full rounded-lg text-center py-2 text-sm md:text-md cursor-pointer",e.value==o.value?"bg-white":"hover:bg-white/30"])},l(o.name),11,pe)),64))]),s("div",fe,[e.value==1?(a(),d("div",ve,[(a(!0),d(v,null,m(y.value,(o,i)=>(a(),d("div",he,[s("div",ye,[s("span",be,[s("p",null,l(i),1)]),s("span",me,l(o.count)+" Reservas",1)]),s("div",ge,[s("span",Le,l(o.pasajeros)+" Pasajeros / "+l(o.boys)+" Niños",1),s("span",ke,l(_(E)(o.total)),1)])]))),256))])):L("",!0),e.value==2?(a(),d("div",we,[(a(!0),d(v,null,m(n.value.value,o=>(a(),d("div",Ce,[s("div",xe,[s("span",_e,[s("p",null,l(o.title),1)]),s("span",Ee,[G(l(o.cliente_name)+" ",1),o.proveedors.find(i=>i.proveedor_id==t.proveedor).discount>0?(a(),d("span",Oe," - "+l(_(E)(o.proveedors.find(i=>i.proveedor_id==t.proveedor).discount)),1)):L("",!0)]),s("span",Ke,l(o.fecha),1)]),s("div",De,[s("span",Se,l(o.adults)+" Pasajeros / "+l(o.boys)+" Niños",1),s("span",Te,l(_(E)(o.proveedors.filter(i=>i.proveedor_id==t.proveedor).reduce((i,f)=>i+f.cost_total,0))),1)])]))),256))])):L("",!0)])])])]),_:1},512)],64)}}};export{Ne as default};
