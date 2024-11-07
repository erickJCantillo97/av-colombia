import{B as ve,x as H,y as be,z as we,A as ye,C as ge,e as X,D as _e,o as m,c as O,w,f as y,E as c,b as l,G as xe,k as B,r as A,F as J,a as n,n as Q,t as d,g as C,H as ke,d as k,I as Ce,J as Le,K as _,L as Y,M as G,q as Se,u as r,N as h,j as Ve,i as De,h as Ae,O as Be,P as Re}from"./app-B3lIljpa.js";import{s as W,a as Ee,b as Ie}from"./index-BLopcr91.js";import{F as Oe,_ as $e}from"./Modal-D8vxbFaM.js";import{s as je}from"./index-CJ0ceu4E.js";import{_ as Pe}from"./Datatable-CaAtb4KX.js";import{_ as v}from"./Input-BDnz7pxR.js";import{_ as Ue}from"./AppLayout-3G-bbH36.js";import{s as Ke}from"./index-B0mTyMFa.js";import"./toasts-KsEkSVTM.js";import{u as Ne}from"./vee-validate-D-7MQXec.js";import"./index-0XNS5oFm.js";import"./index-s6c3JJ0B.js";import"./postcss-BuSCocHm.js";var Te=function(o){var t=o.dt;return`
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
`)},qe={mask:function(o){var t=o.position;return{position:"fixed",height:"100%",width:"100%",left:0,top:0,display:"flex",justifyContent:t==="left"?"flex-start":t==="right"?"flex-end":"center",alignItems:t==="top"?"flex-start":t==="bottom"?"flex-end":"center"}}},Fe={mask:function(o){var t=o.instance,x=o.props,f=["left","right","top","bottom"],i=f.find(function(L){return L===x.position});return["p-drawer-mask",{"p-overlay-mask p-overlay-mask-enter":x.modal,"p-drawer-open":t.containerVisible,"p-drawer-full":t.fullScreen},i?"p-drawer-".concat(i):""]},root:function(o){var t=o.instance;return["p-drawer p-component",{"p-drawer-full":t.fullScreen}]},header:"p-drawer-header",title:"p-drawer-title",pcCloseButton:"p-drawer-close-button",content:"p-drawer-content",footer:"p-drawer-footer"},ze=ve.extend({name:"drawer",theme:Te,classes:Fe,inlineStyles:qe}),Me={name:"BaseDrawer",extends:je,props:{visible:{type:Boolean,default:!1},position:{type:String,default:"left"},header:{type:null,default:null},baseZIndex:{type:Number,default:0},autoZIndex:{type:Boolean,default:!0},dismissable:{type:Boolean,default:!0},showCloseIcon:{type:Boolean,default:!0},closeButtonProps:{type:Object,default:function(){return{severity:"secondary",text:!0,rounded:!0}}},closeIcon:{type:String,default:void 0},modal:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!1}},style:ze,provide:function(){return{$pcDrawer:this,$parentInstance:this}},watch:{dismissable:function(o){o?this.bindOutsideClickListener():this.unbindOutsideClickListener()}}},ee={name:"Drawer",extends:Me,inheritAttrs:!1,emits:["update:visible","show","hide","after-hide"],data:function(){return{containerVisible:this.visible}},container:null,mask:null,content:null,headerContainer:null,footerContainer:null,closeButton:null,outsideClickListener:null,documentKeydownListener:null,updated:function(){this.visible&&(this.containerVisible=this.visible)},beforeUnmount:function(){this.disableDocumentSettings(),this.mask&&this.autoZIndex&&H.clear(this.mask),this.container=null,this.mask=null},methods:{hide:function(){this.$emit("update:visible",!1)},onEnter:function(){this.$emit("show"),this.focus(),this.bindDocumentKeyDownListener(),this.autoZIndex&&H.set("modal",this.mask,this.baseZIndex||this.$primevue.config.zIndex.modal)},onAfterEnter:function(){this.enableDocumentSettings()},onBeforeLeave:function(){this.modal&&!this.isUnstyled&&be(this.mask,"p-overlay-mask-leave")},onLeave:function(){this.$emit("hide")},onAfterLeave:function(){this.autoZIndex&&H.clear(this.mask),this.unbindDocumentKeyDownListener(),this.containerVisible=!1,this.disableDocumentSettings(),this.$emit("after-hide")},onMaskClick:function(o){this.dismissable&&this.modal&&this.mask===o.target&&this.hide()},focus:function(){var o=function(f){return f&&f.querySelector("[autofocus]")},t=this.$slots.header&&o(this.headerContainer);t||(t=this.$slots.default&&o(this.container),t||(t=this.$slots.footer&&o(this.footerContainer),t||(t=this.closeButton))),t&&we(t)},enableDocumentSettings:function(){this.dismissable&&!this.modal&&this.bindOutsideClickListener(),this.blockScroll&&ye()},disableDocumentSettings:function(){this.unbindOutsideClickListener(),this.blockScroll&&ge()},onKeydown:function(o){o.code==="Escape"&&this.hide()},containerRef:function(o){this.container=o},maskRef:function(o){this.mask=o},contentRef:function(o){this.content=o},headerContainerRef:function(o){this.headerContainer=o},footerContainerRef:function(o){this.footerContainer=o},closeButtonRef:function(o){this.closeButton=o?o.$el:void 0},bindDocumentKeyDownListener:function(){this.documentKeydownListener||(this.documentKeydownListener=this.onKeydown,document.addEventListener("keydown",this.documentKeydownListener))},unbindDocumentKeyDownListener:function(){this.documentKeydownListener&&(document.removeEventListener("keydown",this.documentKeydownListener),this.documentKeydownListener=null)},bindOutsideClickListener:function(){var o=this;this.outsideClickListener||(this.outsideClickListener=function(t){o.isOutsideClicked(t)&&o.hide()},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null)},isOutsideClicked:function(o){return this.container&&!this.container.contains(o.target)}},computed:{fullScreen:function(){return this.position==="full"},closeAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.close:void 0}},directives:{focustrap:Oe},components:{Button:W,Portal:Ee,TimesIcon:Ie}},Ze=["aria-modal"];function He(e,o,t,x,f,i){var L=X("Button"),R=X("Portal"),$=_e("focustrap");return m(),O(R,null,{default:w(function(){return[f.containerVisible?(m(),y("div",c({key:0,ref:i.maskRef,onMousedown:o[0]||(o[0]=function(){return i.onMaskClick&&i.onMaskClick.apply(i,arguments)}),class:e.cx("mask"),style:e.sx("mask",!0,{position:e.position})},e.ptm("mask")),[l(xe,c({name:"p-drawer",onEnter:i.onEnter,onAfterEnter:i.onAfterEnter,onBeforeLeave:i.onBeforeLeave,onLeave:i.onLeave,onAfterLeave:i.onAfterLeave,appear:""},e.ptm("transition")),{default:w(function(){return[e.visible?B((m(),y("div",c({key:0,ref:i.containerRef,class:e.cx("root"),role:"complementary","aria-modal":e.modal},e.ptmi("root")),[e.$slots.container?A(e.$slots,"container",{key:0,closeCallback:i.hide}):(m(),y(J,{key:1},[n("div",c({ref:i.headerContainerRef,class:e.cx("header")},e.ptm("header")),[A(e.$slots,"header",{class:Q(e.cx("title"))},function(){return[e.header?(m(),y("div",c({key:0,class:e.cx("title")},e.ptm("title")),d(e.header),17)):C("",!0)]}),e.showCloseIcon?(m(),O(L,c({key:0,ref:i.closeButtonRef,type:"button",class:e.cx("pcCloseButton"),"aria-label":i.closeAriaLabel,unstyled:e.unstyled,onClick:i.hide},e.closeButtonProps,{pt:e.ptm("pcCloseButton"),"data-pc-group-section":"iconcontainer"}),{icon:w(function(j){return[A(e.$slots,"closeicon",{},function(){return[(m(),O(ke(e.closeIcon?"span":"TimesIcon"),c({class:[e.closeIcon,j.class]},e.ptm("pcCloseButton").icon),null,16,["class"]))]})]}),_:3},16,["class","aria-label","unstyled","onClick","pt"])):C("",!0)],16),n("div",c({ref:i.contentRef,class:e.cx("content")},e.ptm("content")),[A(e.$slots,"default")],16),n("div",c({ref:i.footerContainerRef,class:e.cx("footer")},e.ptm("footer")),[A(e.$slots,"footer")],16)],64))],16,Ze)),[[$]]):C("",!0)]}),_:3},16,["onEnter","onAfterEnter","onBeforeLeave","onLeave","onAfterLeave"])],16)):C("",!0)]}),_:3})}ee.render=He;const Ge={class:"h-[99vh]"},Xe={class:""},Ye={class:"text-xl font-mono font-semibold"},Je={class:"flex justify-end mt-4"},Qe={class:"flex items-center gap-2"},We={class:"font-bold text-lg"},et={class:"flex flex-col gap-y-1.5 text-sm"},tt={class:"flex justify-between border py-1 bg-white/30 rounded-md px-2"},nt=n("strong",null,"Fecha del Servicio:",-1),ot={class:"flex justify-between border py-1 bg-white/30 rounded-md px-2"},rt=n("strong",null,"Hora del Servicio:",-1),st={class:"flex justify-between border py-1 bg-white/30 rounded-md px-2"},at=n("strong",null,"Cliente:",-1),it={class:"flex justify-between border py-1 bg-white/30 rounded-md px-2"},lt=n("strong",null,"Telelfono:",-1),dt=["href"],ut={class:"flex justify-between border py-1 bg-white/30 rounded-md px-2"},ct=n("strong",null,"Edificio:",-1),ft={class:"flex justify-between border py-1 bg-white/30 rounded-md px-2"},mt=n("strong",null,"Adultos:",-1),pt={class:"flex justify-between border py-1 bg-white/30 rounded-md px-2"},ht=n("strong",null,"Niños:",-1),vt={class:"flex justify-between border py-1 bg-white/30 rounded-md px-2"},bt=n("strong",null,"Valor:",-1),wt={key:0,class:"flex justify-between border py-1 bg-white/30 rounded-md px-2"},yt=n("strong",null,"Vendedor:",-1),gt={key:1,class:"flex justify-between border py-1 bg-white/30 rounded-md px-2"},_t=n("strong",null,"Fecha de reserva:",-1),xt={class:"flex flex-col gap-y-2 mt-2"},kt={class:"flex justify-between"},Ct=n("h2",{class:"text-xl font-bold"},"Pagos Realizados ",-1),Lt={class:"bg-blue-600 text-white p-1 rounded-lg"},St={class:"flex items-center text-xs justify-between border shadow-xl rounded-md p-1 bg-white"},Vt={class:"uppercase font-bold"},Dt=n("div",null,null,-1),At={class:"flex flex-col items-center gap-2"},Bt={class:"font-bold text-center"},Rt={class:"flex gap-x-2"},Yt={__name:"Index",props:{bookingServices:Array},setup(e){const o=k(!1),t=k({}),x=Ce(),f=new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}),i=k(!1),L={action:()=>{i.value=!0}},R=k([]),$=Le({service_id:_().required(),date:Y().required(),adults:G().required(),date:Y().required(),adults:G().required(),cliente_name:_().required(),cliente_phone:_().required(),cliente_city:_().required(),cliente_building:_().required(),hour:_().required(),abono:G().required(),method:_().required()}),{values:j,defineField:p,errors:g,meta:Et}=Ne({validationSchema:$}),[E,te]=p("service_id"),[P,ne]=p("date"),[S,It]=p("boys"),[V,Ot]=p("adults"),[U,oe]=p("cliente_name"),[K,re]=p("cliente_phone"),[N,se]=p("cliente_city"),[T,ae]=p("cliente_building"),[q,ie]=p("hour"),[F,le]=p("abono"),[z,de]=p("method");S.value=0,V.value=1;const M=k([]);(()=>{axios.get(route("get.services")).then(u=>{M.value=u.data.services.slice(0,5)})})();const ue=[{label:"Detalles",action:u=>{t.value=u,o.value=!0},icon:"fa-solid fa-circle-info text-sm",severity:"info"},{label:"Registrar Pago",action:u=>{form.service_id=u.id,i.value=!0},icon:"fa-solid fa-dollar text-sm",severity:"success"},{label:"Problematica",action:u=>{form.service_id=u.id,i.value=!0},icon:"fa-solid fa-person-dress-burst text-sm",severity:"danger"}],ce=[{field:"cliente_name",header:"Nombre del pasajero",filter:!0,sortable:!0},{field:"cliente_building",header:"Edificio u Hotel",filter:!0,sortable:!0},{field:"service.title",header:"Actividad",filter:!0,sortable:!0},{field:"date",header:"Fecha",filter:!0,sortable:!0},{field:"status",header:"Estado",filter:!0,sortable:!0,type:"tag",filtertype:"EQUALS",class:"text-center uppercase",severitys:[{text:"reservado",severity:"info",class:""},{text:"CONSTRUCCIÓN",severity:"success",class:""},{text:"DISEÑO",severity:"info",class:""},{text:"GARANTIA",severity:"warning",class:""},{text:"SERVICIO POSTVENTA",severity:"success",class:""},{text:"SIN ESTADO",severity:"danger",class:"animate-pulse"}]}],fe=Se(()=>{let u=M.value.find(a=>a.id==E.value);return u?u.adult_tarifa*V.value+u.boy_tarifa*S.value:0}),Z=k(!1),me=u=>{u.preventDefault(),Z.value=!0,Be.post(route("reservar",j),{onSuccess:()=>{x.add({severity:"success",summary:"Reserva Realizada",detail:"Tu reserva ha sido realizada con exito",life:3e3}),Z.value=!1,i.value=!1}})};return(()=>{axios.get(route("paymentMethods.index")).then(u=>{R.value=u.data}).catch(u=>{console.log(u)})})(),(u,a)=>{const D=W,pe=ee,I=Re;return m(),O(Ue,{title:"Services"},{default:w(()=>[n("div",Ge,[l(Pe,{actions:ue,add:L,columnas:ce,data:e.bookingServices,routecreate:"services.create",title:"Reservas"},null,8,["data"])]),l($e,{modelValue:i.value,"onUpdate:modelValue":a[11]||(a[11]=s=>i.value=s),title:"Añadir Reserva",width:"70vw"},{default:w(()=>[n("form",{onSubmit:Ve(me,["prevent"]),class:"grid grid-cols-3 gap-4 items-center",novalidate:""},[l(v,c({type:"dropdown",modelValue:r(E),"onUpdate:modelValue":a[0]||(a[0]=s=>h(E)?E.value=s:null),"error-message":r(g).service_id,label:"Servicio","option-label":"title","option-value":"id",options:M.value},r(te)),null,16,["modelValue","error-message","options"]),l(v,c({label:"Fecha de Reserva",modelValue:r(P),"onUpdate:modelValue":a[1]||(a[1]=s=>h(P)?P.value=s:null),required:"","min-date":new Date,class:"w-full",type:"date","error-message":u.errorDate},r(ne)),null,16,["modelValue","min-date","error-message"]),l(v,{label:"Pasajeros",type:"number",modelValue:r(V),"onUpdate:modelValue":a[2]||(a[2]=s=>h(V)?V.value=s:null)},null,8,["modelValue"]),l(v,{label:"Niños",type:"number",modelValue:r(S),"onUpdate:modelValue":a[3]||(a[3]=s=>h(S)?S.value=s:null)},null,8,["modelValue"]),l(v,c({label:"Nombre del Pasajero"},r(oe),{modelValue:r(U),"onUpdate:modelValue":a[4]||(a[4]=s=>h(U)?U.value=s:null),"error-message":r(g).cliente_name,class:"w-full"}),null,16,["modelValue","error-message"]),l(v,c({label:"Telefono",modelValue:r(K),"onUpdate:modelValue":a[5]||(a[5]=s=>h(K)?K.value=s:null)},r(re),{"error-message":r(g).cliente_phone,class:"w-full",type:"number"}),null,16,["modelValue","error-message"]),l(v,c({label:"Ciudad de donde Proviene"},r(se),{modelValue:r(N),"onUpdate:modelValue":a[6]||(a[6]=s=>h(N)?N.value=s:null),"error-message":r(g).city,class:"w-full"}),null,16,["modelValue","error-message"]),l(v,c({label:"Edificio u Hotel",class:"w-full"},r(ae),{modelValue:r(T),"onUpdate:modelValue":a[7]||(a[7]=s=>h(T)?T.value=s:null),"error-message":r(g).cliente_building}),null,16,["modelValue","error-message"]),l(v,c({type:"time",label:"Hora de Actividad",class:"w-full"},r(ie),{modelValue:r(q),"onUpdate:modelValue":a[8]||(a[8]=s=>h(q)?q.value=s:null),"error-message":r(g).hour}),null,16,["modelValue","error-message"]),l(v,c({class:"w-full",label:"Abono"},r(le),{modelValue:r(F),"onUpdate:modelValue":a[9]||(a[9]=s=>h(F)?F.value=s:null),"error-message":r(g).abono,min:"1",type:"number"}),null,16,["modelValue","error-message"]),l(v,c({class:"w-full",min:"0"},r(de),{type:"dropdown","option-label":"name","option-value":"id",options:R.value,modelValue:r(z),"onUpdate:modelValue":a[10]||(a[10]=s=>h(z)?z.value=s:null),label:"Medio de Pago"}),null,16,["options","modelValue"]),n("div",Xe,[n("h1",Ye," Precio total: "+d(r(f).format(fe.value)),1)]),n("div",Je,[l(D,{type:"submit",severity:"success",label:"Guardar",loading:Z.value},null,8,["loading"])])],32)]),_:1},8,["modelValue"]),l(r(Ke)),l(pe,{visible:o.value,"onUpdate:visible":a[12]||(a[12]=s=>o.value=s),"pt:root:class":"!bg-blue-100",header:"Detalles de la actividad",position:"right"},{header:w(()=>[n("div",Qe,[n("span",We,d(t.value.service.title),1)])]),footer:w(()=>[n("div",At,[n("h1",Bt,"Saldo: "+d(r(f).format(t.value.total_price-t.value.payment.reduce((s,b)=>s+b.amount,0))),1),n("div",Rt,[B(l(D,{icon:"fa-solid fa-circle-check",text:"",size:"large",class:"flex-auto",severity:"success"},null,512),[[I,"Completar Servicio",void 0,{top:!0}]]),B(l(D,{icon:"fa-solid fa-eye-slash",text:"",size:"large",class:"flex-auto",severity:"warn"},null,512),[[I,"Servicio No show",void 0,{top:!0}]]),B(l(D,{icon:"fa-solid fa-xmark-circle",text:"",size:"large",class:"flex-auto",severity:"danger"},null,512),[[I,"Cancelar Servicio",void 0,{top:!0}]]),B(l(D,{icon:"fa-solid fa-person-dress-burst",text:"",size:"large",class:"flex-auto",severity:"danger"},null,512),[[I,"Servicio Problematico",void 0,{top:!0}]])])])]),default:w(()=>{var s;return[n("div",et,[n("div",tt,[nt,n("p",null,d(t.value.date),1)]),n("div",ot,[rt,n("p",null,d(t.value.hour),1)]),n("div",st,[at,n("p",null,d(t.value.cliente_name),1)]),n("div",it,[lt,n("a",{href:`tel://${t.value.cliente_phone}`},d(t.value.cliente_phone),9,dt)]),n("div",ut,[ct,n("p",null,d(t.value.cliente_building),1)]),n("div",ft,[mt,n("p",null,d(t.value.adults),1)]),n("div",pt,[ht,n("p",null,d(t.value.boys),1)]),n("div",vt,[bt,n("p",null,d(r(f).format(t.value.total_price)),1)]),t.value.user?(m(),y("div",wt,[yt,n("p",null,d((s=t.value.user)==null?void 0:s.name),1)])):C("",!0),t.value.user?(m(),y("div",gt,[_t,n("p",null,d(new Date(t.value.created_at).toLocaleDateString("es-CO")),1)])):C("",!0),n("div",xt,[n("div",kt,[Ct,n("div",Lt,d(r(f).format(t.value.payment.reduce((b,he)=>b+he.amount,0))),1)]),(m(!0),y(J,null,De(t.value.payment,b=>(m(),y("div",St,[n("div",null,[n("div",Vt,d(b.type)+" "+d(r(f).format(b.amount)),1),n("div",null,d(new Date(b.created_at).toLocaleDateString("es-CO"))+" "+d(b.metohd_payment.name),1)]),n("div",{class:Q(["uppercase",b.status=="pendiente"?"bg-red-500 p-1 text-white rounded-lg shadow-md shadow-red-500":""])},[Ae(d(b.status)+" ",1),Dt],2)]))),256))])])]}),_:1},8,["visible"])]),_:1})}}};export{Yt as default};
