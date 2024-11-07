import{B as P,x as E,y as U,z as Z,A as M,C as G,e as R,D as H,o as u,c as B,w as v,f as b,E as h,b as d,G as X,k as L,r as k,F as A,a as n,n as O,t as r,g as y,H as Y,d as _,I as q,T as J,u as l,j as Q,i as W,h as ee,J as te}from"./app-qsU8nq1M.js";import{s as j,a as ne,b as oe}from"./index-8_W5WTQl.js";import{F as se,_ as re}from"./Modal-Bbuhj8t5.js";import{s as ie}from"./index-D88UEbpO.js";import{_ as ae}from"./Datatable-DWMtM8Dw.js";import{_ as C}from"./Input-BUr7DpP-.js";import{_ as le}from"./AppLayout-Cs4jPY1A.js";import{s as de}from"./index-CJwhcKRM.js";import"./index-CWAUscuP.js";import"./index-BI9z6amO.js";import"./postcss-bv_1MzzM.js";var ce=function(o){var t=o.dt;return`
.p-drawer {
    display: flex;
    flex-direction: column;
    pointer-events: auto;
    transform: translate3d(0px, 0px, 0px);
    position: relative;
    transition: transform 0.3s;
    background: `.concat(t("drawer.background"),`;
    color: `).concat(t("drawer.color"),`;
    border: 1px solid `).concat(t("drawer.border.color"),`;
    box-shadow: `).concat(t("drawer.shadow"),`;
}

.p-drawer-content {
    overflow-y: auto;
    flex-grow: 1;
    padding: `).concat(t("drawer.content.padding"),`;
}

.p-drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    padding: `).concat(t("drawer.header.padding"),`;
}

.p-drawer-footer {
    padding: `).concat(t("drawer.header.padding"),`;
}

.p-drawer-title {
    font-weight: `).concat(t("drawer.title.font.weight"),`;
    font-size: `).concat(t("drawer.title.font.size"),`;
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
`)},ue={mask:function(o){var t=o.position;return{position:"fixed",height:"100%",width:"100%",left:0,top:0,display:"flex",justifyContent:t==="left"?"flex-start":t==="right"?"flex-end":"center",alignItems:t==="top"?"flex-start":t==="bottom"?"flex-end":"center"}}},fe={mask:function(o){var t=o.instance,w=o.props,f=["left","right","top","bottom"],s=f.find(function(g){return g===w.position});return["p-drawer-mask",{"p-overlay-mask p-overlay-mask-enter":w.modal,"p-drawer-open":t.containerVisible,"p-drawer-full":t.fullScreen},s?"p-drawer-".concat(s):""]},root:function(o){var t=o.instance;return["p-drawer p-component",{"p-drawer-full":t.fullScreen}]},header:"p-drawer-header",title:"p-drawer-title",pcCloseButton:"p-drawer-close-button",content:"p-drawer-content",footer:"p-drawer-footer"},pe=P.extend({name:"drawer",theme:ce,classes:fe,inlineStyles:ue}),me={name:"BaseDrawer",extends:ie,props:{visible:{type:Boolean,default:!1},position:{type:String,default:"left"},header:{type:null,default:null},baseZIndex:{type:Number,default:0},autoZIndex:{type:Boolean,default:!0},dismissable:{type:Boolean,default:!0},showCloseIcon:{type:Boolean,default:!0},closeButtonProps:{type:Object,default:function(){return{severity:"secondary",text:!0,rounded:!0}}},closeIcon:{type:String,default:void 0},modal:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!1}},style:pe,provide:function(){return{$pcDrawer:this,$parentInstance:this}},watch:{dismissable:function(o){o?this.bindOutsideClickListener():this.unbindOutsideClickListener()}}},$={name:"Drawer",extends:me,inheritAttrs:!1,emits:["update:visible","show","hide","after-hide"],data:function(){return{containerVisible:this.visible}},container:null,mask:null,content:null,headerContainer:null,footerContainer:null,closeButton:null,outsideClickListener:null,documentKeydownListener:null,updated:function(){this.visible&&(this.containerVisible=this.visible)},beforeUnmount:function(){this.disableDocumentSettings(),this.mask&&this.autoZIndex&&E.clear(this.mask),this.container=null,this.mask=null},methods:{hide:function(){this.$emit("update:visible",!1)},onEnter:function(){this.$emit("show"),this.focus(),this.bindDocumentKeyDownListener(),this.autoZIndex&&E.set("modal",this.mask,this.baseZIndex||this.$primevue.config.zIndex.modal)},onAfterEnter:function(){this.enableDocumentSettings()},onBeforeLeave:function(){this.modal&&!this.isUnstyled&&U(this.mask,"p-overlay-mask-leave")},onLeave:function(){this.$emit("hide")},onAfterLeave:function(){this.autoZIndex&&E.clear(this.mask),this.unbindDocumentKeyDownListener(),this.containerVisible=!1,this.disableDocumentSettings(),this.$emit("after-hide")},onMaskClick:function(o){this.dismissable&&this.modal&&this.mask===o.target&&this.hide()},focus:function(){var o=function(f){return f&&f.querySelector("[autofocus]")},t=this.$slots.header&&o(this.headerContainer);t||(t=this.$slots.default&&o(this.container),t||(t=this.$slots.footer&&o(this.footerContainer),t||(t=this.closeButton))),t&&Z(t)},enableDocumentSettings:function(){this.dismissable&&!this.modal&&this.bindOutsideClickListener(),this.blockScroll&&M()},disableDocumentSettings:function(){this.unbindOutsideClickListener(),this.blockScroll&&G()},onKeydown:function(o){o.code==="Escape"&&this.hide()},containerRef:function(o){this.container=o},maskRef:function(o){this.mask=o},contentRef:function(o){this.content=o},headerContainerRef:function(o){this.headerContainer=o},footerContainerRef:function(o){this.footerContainer=o},closeButtonRef:function(o){this.closeButton=o?o.$el:void 0},bindDocumentKeyDownListener:function(){this.documentKeydownListener||(this.documentKeydownListener=this.onKeydown,document.addEventListener("keydown",this.documentKeydownListener))},unbindDocumentKeyDownListener:function(){this.documentKeydownListener&&(document.removeEventListener("keydown",this.documentKeydownListener),this.documentKeydownListener=null)},bindOutsideClickListener:function(){var o=this;this.outsideClickListener||(this.outsideClickListener=function(t){o.isOutsideClicked(t)&&o.hide()},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null)},isOutsideClicked:function(o){return this.container&&!this.container.contains(o.target)}},computed:{fullScreen:function(){return this.position==="full"},closeAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.close:void 0}},directives:{focustrap:se},components:{Button:j,Portal:ne,TimesIcon:oe}},he=["aria-modal"];function ve(e,o,t,w,f,s){var g=R("Button"),a=R("Portal"),S=H("focustrap");return u(),B(a,null,{default:v(function(){return[f.containerVisible?(u(),b("div",h({key:0,ref:s.maskRef,onMousedown:o[0]||(o[0]=function(){return s.onMaskClick&&s.onMaskClick.apply(s,arguments)}),class:e.cx("mask"),style:e.sx("mask",!0,{position:e.position})},e.ptm("mask")),[d(X,h({name:"p-drawer",onEnter:s.onEnter,onAfterEnter:s.onAfterEnter,onBeforeLeave:s.onBeforeLeave,onLeave:s.onLeave,onAfterLeave:s.onAfterLeave,appear:""},e.ptm("transition")),{default:v(function(){return[e.visible?L((u(),b("div",h({key:0,ref:s.containerRef,class:e.cx("root"),role:"complementary","aria-modal":e.modal},e.ptmi("root")),[e.$slots.container?k(e.$slots,"container",{key:0,closeCallback:s.hide}):(u(),b(A,{key:1},[n("div",h({ref:s.headerContainerRef,class:e.cx("header")},e.ptm("header")),[k(e.$slots,"header",{class:O(e.cx("title"))},function(){return[e.header?(u(),b("div",h({key:0,class:e.cx("title")},e.ptm("title")),r(e.header),17)):y("",!0)]}),e.showCloseIcon?(u(),B(g,h({key:0,ref:s.closeButtonRef,type:"button",class:e.cx("pcCloseButton"),"aria-label":s.closeAriaLabel,unstyled:e.unstyled,onClick:s.hide},e.closeButtonProps,{pt:e.ptm("pcCloseButton"),"data-pc-group-section":"iconcontainer"}),{icon:v(function(I){return[k(e.$slots,"closeicon",{},function(){return[(u(),B(Y(e.closeIcon?"span":"TimesIcon"),h({class:[e.closeIcon,I.class]},e.ptm("pcCloseButton").icon),null,16,["class"]))]})]}),_:3},16,["class","aria-label","unstyled","onClick","pt"])):y("",!0)],16),n("div",h({ref:s.contentRef,class:e.cx("content")},e.ptm("content")),[k(e.$slots,"default")],16),n("div",h({ref:s.footerContainerRef,class:e.cx("footer")},e.ptm("footer")),[k(e.$slots,"footer")],16)],64))],16,he)),[[S]]):y("",!0)]}),_:3},16,["onEnter","onAfterEnter","onBeforeLeave","onLeave","onAfterLeave"])],16)):y("",!0)]}),_:3})}$.render=ve;const be={class:"h-[99vh]"},we={class:"flex justify-end mt-4"},ye={class:"flex items-center gap-2"},ge={class:"font-bold text-lg"},xe={class:"flex flex-col gap-y-1.5 text-sm"},ke={class:"flex justify-between border py-1 bg-white/30 rounded-md px-2"},_e=n("strong",null,"Fecha del Servicio:",-1),Ce={class:"flex justify-between border py-1 bg-white/30 rounded-md px-2"},Le=n("strong",null,"Hora del Servicio:",-1),Se={class:"flex justify-between border py-1 bg-white/30 rounded-md px-2"},De=n("strong",null,"Cliente:",-1),Be={class:"flex justify-between border py-1 bg-white/30 rounded-md px-2"},Ve=n("strong",null,"Telelfono:",-1),Ee=["href"],Ie={class:"flex justify-between border py-1 bg-white/30 rounded-md px-2"},Re=n("strong",null,"Edificio:",-1),Ae={class:"flex justify-between border py-1 bg-white/30 rounded-md px-2"},Oe=n("strong",null,"Adultos:",-1),je={class:"flex justify-between border py-1 bg-white/30 rounded-md px-2"},$e=n("strong",null,"Niños:",-1),Ke={class:"flex justify-between border py-1 bg-white/30 rounded-md px-2"},Te=n("strong",null,"Valor:",-1),Ne={key:0,class:"flex justify-between border py-1 bg-white/30 rounded-md px-2"},ze=n("strong",null,"Vendedor:",-1),Fe={key:1,class:"flex justify-between border py-1 bg-white/30 rounded-md px-2"},Pe=n("strong",null,"Fecha de reserva:",-1),Ue={class:"flex flex-col gap-y-2 mt-2"},Ze={class:"flex justify-between"},Me=n("h2",{class:"text-xl font-bold"},"Pagos Realizados ",-1),Ge={class:"bg-blue-600 text-white p-1 rounded-lg"},He={class:"flex items-center text-xs justify-between border shadow-xl rounded-md p-1 bg-white"},Xe={class:"uppercase font-bold"},Ye=n("div",null,null,-1),qe={class:"flex flex-col items-center gap-2"},Je={class:"font-bold text-center"},Qe={class:"flex gap-x-2"},ct={__name:"Index",props:{bookingServices:Array},setup(e){const o=_(!1),t=_({}),w=q(),f=new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}),s=_(!1),g={action:()=>{a.reset(),s.value=!0}},a=J({service_id:"",user_id:"",date:"",payment:!1,adults:"",boys:0}),S=_([]);(()=>{axios.get(route("get.services")).then(p=>{S.value=p.data.services.slice(0,5)})})();const K=[{label:"Detalles",action:p=>{t.value=p,o.value=!0},icon:"fa-solid fa-circle-info text-sm",severity:"info"},{label:"Registrar Pago",action:p=>{a.service_id=p.id,s.value=!0},icon:"fa-solid fa-dollar text-sm",severity:"success"},{label:"Problematica",action:p=>{a.service_id=p.id,s.value=!0},icon:"fa-solid fa-person-dress-burst text-sm",severity:"danger"}],T=[{field:"cliente_name",header:"Nombre del pasajero",filter:!0,sortable:!0},{field:"cliente_building",header:"Edificio u Hotel",filter:!0,sortable:!0},{field:"service.title",header:"Actividad",filter:!0,sortable:!0},{field:"date",header:"Fecha",filter:!0,sortable:!0},{field:"status",header:"Estado",filter:!0,sortable:!0,type:"tag",filtertype:"EQUALS",class:"text-center uppercase",severitys:[{text:"reservado",severity:"info",class:""},{text:"CONSTRUCCIÓN",severity:"success",class:""},{text:"DISEÑO",severity:"info",class:""},{text:"GARANTIA",severity:"warning",class:""},{text:"SERVICIO POSTVENTA",severity:"success",class:""},{text:"SIN ESTADO",severity:"danger",class:"animate-pulse"}]}],V=_(!1),N=p=>{p.preventDefault(),V.value=!0,a.post(route("reservar"),{onSuccess:()=>{w.add({severity:"success",summary:"Reserva Realizada",detail:"Tu reserva ha sido realizada con exito",life:3e3}),V.value=!1,s.value=!1}})};return(p,c)=>{const x=j,z=$,D=te;return u(),B(le,{title:"Services"},{default:v(()=>[n("div",be,[d(ae,{actions:K,add:g,columnas:T,data:e.bookingServices,routecreate:"services.create",title:"Reservas"},null,8,["data"])]),d(re,{modelValue:s.value,"onUpdate:modelValue":c[5]||(c[5]=i=>s.value=i),title:"Añadir Reserva",width:"40vw"},{default:v(()=>[n("form",{onSubmit:Q(N,["prevent"])},[d(C,{type:"dropdown",modelValue:l(a).service_id,"onUpdate:modelValue":c[0]||(c[0]=i=>l(a).service_id=i),label:"Servicio","option-label":"title","option-value":"id",options:S.value},null,8,["modelValue","options"]),d(C,{label:"Fecha",type:"date",modelValue:l(a).date,"onUpdate:modelValue":c[1]||(c[1]=i=>l(a).date=i)},null,8,["modelValue"]),d(C,{label:"Adultos",type:"number",modelValue:l(a).adults,"onUpdate:modelValue":c[2]||(c[2]=i=>l(a).adults=i)},null,8,["modelValue"]),d(C,{label:"Niños",type:"number",modelValue:l(a).boys,"onUpdate:modelValue":c[3]||(c[3]=i=>l(a).boys=i)},null,8,["modelValue"]),n("div",null,[d(C,{type:"checkbox",inputId:"payment",modelValue:l(a).payment,"onUpdate:modelValue":c[4]||(c[4]=i=>l(a).payment=i),label:"Este Servicio Fue pagado"},null,8,["modelValue"])]),n("div",we,[d(x,{type:"submit",severity:"success",label:"Guardar",loading:V.value},null,8,["loading"])])],32)]),_:1},8,["modelValue"]),d(l(de)),d(z,{visible:o.value,"onUpdate:visible":c[6]||(c[6]=i=>o.value=i),"pt:root:class":"!bg-blue-100",header:"Detalles de la actividad",position:"right"},{header:v(()=>[n("div",ye,[n("span",ge,r(t.value.service.title),1)])]),footer:v(()=>[n("div",qe,[n("h1",Je,"Saldo: "+r(l(f).format(t.value.total_price-t.value.payment.reduce((i,m)=>i+m.amount,0))),1),n("div",Qe,[L(d(x,{icon:"fa-solid fa-circle-check",text:"",size:"large",class:"flex-auto",severity:"success"},null,512),[[D,"Completar Servicio",void 0,{top:!0}]]),L(d(x,{icon:"fa-solid fa-eye-slash",text:"",size:"large",class:"flex-auto",severity:"warn"},null,512),[[D,"Servicio No show",void 0,{top:!0}]]),L(d(x,{icon:"fa-solid fa-xmark-circle",text:"",size:"large",class:"flex-auto",severity:"danger"},null,512),[[D,"Cancelar Servicio",void 0,{top:!0}]]),L(d(x,{icon:"fa-solid fa-person-dress-burst",text:"",size:"large",class:"flex-auto",severity:"danger"},null,512),[[D,"Servicio Problematico",void 0,{top:!0}]])])])]),default:v(()=>{var i;return[n("div",xe,[n("div",ke,[_e,n("p",null,r(t.value.date),1)]),n("div",Ce,[Le,n("p",null,r(t.value.hour),1)]),n("div",Se,[De,n("p",null,r(t.value.cliente_name),1)]),n("div",Be,[Ve,n("a",{href:`tel://${t.value.cliente_phone}`},r(t.value.cliente_phone),9,Ee)]),n("div",Ie,[Re,n("p",null,r(t.value.cliente_building),1)]),n("div",Ae,[Oe,n("p",null,r(t.value.adults),1)]),n("div",je,[$e,n("p",null,r(t.value.boys),1)]),n("div",Ke,[Te,n("p",null,r(l(f).format(t.value.total_price)),1)]),t.value.user?(u(),b("div",Ne,[ze,n("p",null,r((i=t.value.user)==null?void 0:i.name),1)])):y("",!0),t.value.user?(u(),b("div",Fe,[Pe,n("p",null,r(new Date(t.value.created_at).toLocaleDateString("es-CO")),1)])):y("",!0),n("div",Ue,[n("div",Ze,[Me,n("div",Ge,r(l(f).format(t.value.payment.reduce((m,F)=>m+F.amount,0))),1)]),(u(!0),b(A,null,W(t.value.payment,m=>(u(),b("div",He,[n("div",null,[n("div",Xe,r(m.type)+" "+r(l(f).format(m.amount)),1),n("div",null,r(new Date(m.created_at).toLocaleDateString("es-CO"))+" "+r(m.metohd_payment.name),1)]),n("div",{class:O(["uppercase",m.status=="pendiente"?"bg-red-500 p-1 text-white rounded-lg shadow-md shadow-red-500":""])},[ee(r(m.status)+" ",1),Ye],2)]))),256))])])]}),_:1},8,["visible"])]),_:1})}}};export{ct as default};
