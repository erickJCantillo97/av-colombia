import{C as A,D as B,eA as P,ew as j,ex as H,em as I,dU as Z,ey as N,e3 as D,ep as U,dQ as F,dV as C,eJ as V,e as q,dW as J,c as S,o as l,w as O,b as T,dX as M,E as x,m as Q,g as L,f as d,r as K,d as b,a as s,F as v,i as m,t as a,n as W,u as _,h as X}from"./app-C1o6uP0Y.js";import{F as Y}from"./index-FEKhHWPJ.js";import{O as g}from"./index-B3fvUZpt.js";import{s as G}from"./index-CT54wmyb.js";import{R as $}from"./index-CE27VjON.js";import{s as ee}from"./index-DSFJFu7x.js";import{c as E}from"./useCommonUtilities-EmANIG9p.js";import te from"./ItemDetailTypeReserva-DiTAhI0z.js";var oe=A`
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
`,ne={root:"p-popover p-component",content:"p-popover-content"},se=B.extend({name:"popover",style:oe,classes:ne}),ie={name:"BasePopover",extends:ee,props:{dismissable:{type:Boolean,default:!0},appendTo:{type:[String,Object],default:"body"},baseZIndex:{type:Number,default:0},autoZIndex:{type:Boolean,default:!0},breakpoints:{type:Object,default:null},closeOnEscape:{type:Boolean,default:!0}},style:se,provide:function(){return{$pcPopover:this,$parentInstance:this}}},z={name:"Popover",extends:ie,inheritAttrs:!1,emits:["show","hide"],data:function(){return{visible:!1}},watch:{dismissable:{immediate:!0,handler:function(e){e?this.bindOutsideClickListener():this.unbindOutsideClickListener()}}},selfClick:!1,target:null,eventTarget:null,outsideClickListener:null,scrollHandler:null,resizeListener:null,container:null,styleElement:null,overlayEventListener:null,documentKeydownListener:null,beforeUnmount:function(){this.dismissable&&this.unbindOutsideClickListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.destroyStyle(),this.unbindResizeListener(),this.target=null,this.container&&this.autoZIndex&&C.clear(this.container),this.overlayEventListener&&(g.off("overlay-click",this.overlayEventListener),this.overlayEventListener=null),this.container=null},mounted:function(){this.breakpoints&&this.createStyle()},methods:{toggle:function(e,i){this.visible?this.hide():this.show(e,i)},show:function(e,i){this.visible=!0,this.eventTarget=e.currentTarget,this.target=i||e.currentTarget},hide:function(){this.visible=!1},onContentClick:function(){this.selfClick=!0},onEnter:function(e){var i=this;V(e,{position:"absolute",top:"0"}),this.alignOverlay(),this.dismissable&&this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.autoZIndex&&C.set("overlay",e,this.baseZIndex+this.$primevue.config.zIndex.overlay),this.overlayEventListener=function(c){i.container.contains(c.target)&&(i.selfClick=!0)},this.focus(),g.on("overlay-click",this.overlayEventListener),this.$emit("show"),this.closeOnEscape&&this.bindDocumentKeyDownListener()},onLeave:function(){this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.unbindDocumentKeyDownListener(),g.off("overlay-click",this.overlayEventListener),this.overlayEventListener=null,this.$emit("hide")},onAfterLeave:function(e){this.autoZIndex&&C.clear(e)},alignOverlay:function(){N(this.container,this.target,!1);var e=D(this.container),i=D(this.target),c=0;e.left<i.left&&(c=i.left-e.left),this.container.style.setProperty(U("popover.arrow.left").name,"".concat(c,"px")),e.top<i.top&&(this.container.setAttribute("data-p-popover-flipped","true"),!this.isUnstyled&&F(this.container,"p-popover-flipped"))},onContentKeydown:function(e){e.code==="Escape"&&this.closeOnEscape&&(this.hide(),Z(this.target))},onButtonKeydown:function(e){switch(e.code){case"ArrowDown":case"ArrowUp":case"ArrowLeft":case"ArrowRight":e.preventDefault()}},focus:function(){var e=this.container.querySelector("[autofocus]");e&&e.focus()},onKeyDown:function(e){e.code==="Escape"&&this.closeOnEscape&&(this.visible=!1)},bindDocumentKeyDownListener:function(){this.documentKeydownListener||(this.documentKeydownListener=this.onKeyDown.bind(this),window.document.addEventListener("keydown",this.documentKeydownListener))},unbindDocumentKeyDownListener:function(){this.documentKeydownListener&&(window.document.removeEventListener("keydown",this.documentKeydownListener),this.documentKeydownListener=null)},bindOutsideClickListener:function(){var e=this;!this.outsideClickListener&&I()&&(this.outsideClickListener=function(i){e.visible&&!e.selfClick&&!e.isTargetClicked(i)&&(e.visible=!1),e.selfClick=!1},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null,this.selfClick=!1)},bindScrollListener:function(){var e=this;this.scrollHandler||(this.scrollHandler=new H(this.target,function(){e.visible&&(e.visible=!1)})),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(){e.visible&&!j()&&(e.visible=!1)},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},isTargetClicked:function(e){return this.eventTarget&&(this.eventTarget===e.target||this.eventTarget.contains(e.target))},containerRef:function(e){this.container=e},createStyle:function(){if(!this.styleElement&&!this.isUnstyled){var e;this.styleElement=document.createElement("style"),this.styleElement.type="text/css",P(this.styleElement,"nonce",(e=this.$primevue)===null||e===void 0||(e=e.config)===null||e===void 0||(e=e.csp)===null||e===void 0?void 0:e.nonce),document.head.appendChild(this.styleElement);var i="";for(var c in this.breakpoints)i+=`
                        @media screen and (max-width: `.concat(c,`) {
                            .p-popover[`).concat(this.$attrSelector,`] {
                                width: `).concat(this.breakpoints[c],` !important;
                            }
                        }
                    `);this.styleElement.innerHTML=i}},destroyStyle:function(){this.styleElement&&(document.head.removeChild(this.styleElement),this.styleElement=null)},onOverlayClick:function(e){g.emit("overlay-click",{originalEvent:e,target:this.target})}},directives:{focustrap:Y,ripple:$},components:{Portal:G}},re=["aria-modal"];function le(t,e,i,c,h,n){var y=q("Portal"),k=J("focustrap");return l(),S(y,{appendTo:t.appendTo},{default:O(function(){return[T(M,x({name:"p-popover",onEnter:n.onEnter,onLeave:n.onLeave,onAfterLeave:n.onAfterLeave},t.ptm("transition")),{default:O(function(){return[h.visible?Q((l(),d("div",x({key:0,ref:n.containerRef,role:"dialog","aria-modal":h.visible,onClick:e[3]||(e[3]=function(){return n.onOverlayClick&&n.onOverlayClick.apply(n,arguments)}),class:t.cx("root")},t.ptmi("root")),[t.$slots.container?K(t.$slots,"container",{key:0,closeCallback:n.hide,keydownCallback:function(p){return n.onButtonKeydown(p)}}):(l(),d("div",x({key:1,class:t.cx("content"),onClick:e[0]||(e[0]=function(){return n.onContentClick&&n.onContentClick.apply(n,arguments)}),onMousedown:e[1]||(e[1]=function(){return n.onContentClick&&n.onContentClick.apply(n,arguments)}),onKeydown:e[2]||(e[2]=function(){return n.onContentKeydown&&n.onContentKeydown.apply(n,arguments)})},t.ptm("content")),[K(t.$slots,"default")],16))],16,re)),[[k]]):L("",!0)]}),_:3},16,["onEnter","onLeave","onAfterLeave"])]}),_:3},8,["appendTo"])}z.render=le;const ae={class:"flex justify-between gap-x-4"},de={class:"flex flex-col gap-4"},ce={class:"font-medium block mb-2"},ue={class:"w-full bg-gray-200 rounded-md p-2 grid grid-cols-2 divide-y-2 md:flex space-x-2"},pe=["onClick"],fe={class:"flex flex-col gap-y-2 h-64 overflow-auto"},ve={key:0},he={class:"flex items-center gap-x-8 border-b shadow-md justify-between p-3 rounded-md hover:bg-gray-300"},ye={class:"flex flex-col"},be={class:"font-bold flex items-center gap-x-2"},me={class:"text-xs"},ge={class:"flex flex-col"},Le={class:"text-sm"},ke={class:"font-bold"},we={key:1},Ce={class:"flex items-center gap-x-8 border-b shadow-md justify-between p-3 rounded-md hover:bg-gray-300"},xe={class:"flex flex-col"},_e={class:"font-bold flex items-center gap-x-2"},Ee={class:"text-xs"},Oe={key:0,class:"px-1.5 py-0.5 border border-red-700 text-red-700 rounded-lg"},De={class:"text-xs"},Ke={class:"flex flex-col"},Se={class:"text-sm"},Te={class:"font-bold"},Ze={__name:"DetailsTypeReserva",props:{reservasType:{type:Array,required:!0},proveedor:{type:[Number,String],required:!0}},setup(t){const e=b(1),i=[{name:"Agrupados",value:1},{name:"Detalles",value:2}],c=b(),h=t,n=b([]),y=b([]),k=(w,p)=>{y.value=p.value.reduce((u,o)=>{const r=o.title;return u[r]||(u[r]={count:0,pasajeros:0,total:0}),u[r].count+=1,u[r].pasajeros+=o.adults,u[r].total+=o.proveedors.filter(f=>f.proveedor_id==h.proveedor).reduce((f,R)=>f+R.cost_total,0),u},{}),n.value=p,c.value.toggle(w)};return(w,p)=>{const u=z;return l(),d(v,null,[s("div",ae,[(l(!0),d(v,null,m(t.reservasType,o=>(l(),S(te,{key:o.name,reservas:o,onClick:r=>k(r,o),proveedor:t.proveedor},null,8,["reservas","onClick","proveedor"]))),128))]),T(u,{ref_key:"op",ref:c},{default:O(()=>[s("div",de,[s("div",null,[s("span",ce,a(n.value.name),1),s("div",ue,[(l(),d(v,null,m(i,o=>s("div",{onClick:r=>e.value=o.value,class:W(["w-full rounded-lg text-center py-2 text-sm md:text-md cursor-pointer",e.value==o.value?"bg-white":"hover:bg-white/30"])},a(o.name),11,pe)),64))]),s("div",fe,[e.value==1?(l(),d("div",ve,[(l(!0),d(v,null,m(y.value,(o,r)=>(l(),d("div",he,[s("div",ye,[s("span",be,[s("p",null,a(r),1)]),s("span",me,a(o.count)+" Reservas",1)]),s("div",ge,[s("span",Le,a(o.pasajeros)+" Pasajeros",1),s("span",ke,a(_(E)(o.total)),1)])]))),256))])):L("",!0),e.value==2?(l(),d("div",we,[(l(!0),d(v,null,m(n.value.value,o=>(l(),d("div",Ce,[s("div",xe,[s("span",_e,[s("p",null,a(o.title),1)]),s("span",Ee,[X(a(o.cliente_name)+" ",1),o.proveedors.find(r=>r.proveedor_id==t.proveedor).discount>0?(l(),d("span",Oe," - "+a(_(E)(o.proveedors.find(r=>r.proveedor_id==t.proveedor).discount)),1)):L("",!0)]),s("span",De,a(o.fecha),1)]),s("div",Ke,[s("span",Se,a(o.adults)+" Pasajeros",1),s("span",Te,a(_(E)(o.proveedors.filter(r=>r.proveedor_id==t.proveedor).reduce((r,f)=>r+f.cost_total,0))),1)])]))),256))])):L("",!0)])])])]),_:1},512)],64)}}};export{Ze as default};
