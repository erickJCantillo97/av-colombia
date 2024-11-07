import{B as O,o as n,f as o,E as k,r as P,h as b,t as m,g as v,d as u,b as I,c as h,F as _,i as x,w as $,a as t,a8 as F,k as M,u as y,p as B,W as j,P as T,_ as A,a3 as J,bf as L,bg as U,n as C}from"./app-B3lIljpa.js";import"./v3-YcUg0m1N.js";import"./postcss-BuSCocHm.js";import{s as R}from"./index-CJ0ceu4E.js";import{s as W}from"./index-s6c3JJ0B.js";import{_ as q}from"./GuestLayout-oYwVT5h_.js";import{_ as G}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./keyboard-Dj8Tu1g6.js";var H=function(s){var a=s.dt;return`
.p-progressbar {
    position: relative;
    overflow: hidden;
    height: `.concat(a("progressbar.height"),`;
    background: `).concat(a("progressbar.background"),`;
    border-radius: `).concat(a("progressbar.border.radius"),`;
}

.p-progressbar-value {
    margin: 0;
    background: `).concat(a("progressbar.value.background"),`;
}

.p-progressbar-label {
    color: `).concat(a("progressbar.label.color"),`;
    font-size: `).concat(a("progressbar.label.font.size"),`;
    font-weight: `).concat(a("progressbar.label.font.weight"),`;
}

.p-progressbar-determinate .p-progressbar-value {
    height: 100%;
    width: 0%;
    position: absolute;
    display: none;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: width 1s ease-in-out;
}

.p-progressbar-determinate .p-progressbar-label {
    display: inline-flex;
}

.p-progressbar-indeterminate .p-progressbar-value::before {
    content: "";
    position: absolute;
    background: inherit;
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, right;
    animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
}

.p-progressbar-indeterminate .p-progressbar-value::after {
    content: "";
    position: absolute;
    background: inherit;
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, right;
    animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    animation-delay: 1.15s;
}

@-webkit-keyframes p-progressbar-indeterminate-anim {
    0% {
        left: -35%;
        right: 100%;
    }
    60% {
        left: 100%;
        right: -90%;
    }
    100% {
        left: 100%;
        right: -90%;
    }
}
@keyframes p-progressbar-indeterminate-anim {
    0% {
        left: -35%;
        right: 100%;
    }
    60% {
        left: 100%;
        right: -90%;
    }
    100% {
        left: 100%;
        right: -90%;
    }
}
@-webkit-keyframes p-progressbar-indeterminate-anim-short {
    0% {
        left: -200%;
        right: 100%;
    }
    60% {
        left: 107%;
        right: -8%;
    }
    100% {
        left: 107%;
        right: -8%;
    }
}
@keyframes p-progressbar-indeterminate-anim-short {
    0% {
        left: -200%;
        right: 100%;
    }
    60% {
        left: 107%;
        right: -8%;
    }
    100% {
        left: 107%;
        right: -8%;
    }
}
`)},K={root:function(s){var a=s.instance;return["p-progressbar p-component",{"p-progressbar-determinate":a.determinate,"p-progressbar-indeterminate":a.indeterminate}]},value:"p-progressbar-value",label:"p-progressbar-label"},Q=O.extend({name:"progressbar",theme:H,classes:K}),X={name:"BaseProgressBar",extends:R,props:{value:{type:Number,default:null},mode:{type:String,default:"determinate"},showValue:{type:Boolean,default:!0}},style:Q,provide:function(){return{$pcProgressBar:this,$parentInstance:this}}},D={name:"ProgressBar",extends:X,inheritAttrs:!1,computed:{progressStyle:function(){return{width:this.value+"%",display:"flex"}},indeterminate:function(){return this.mode==="indeterminate"},determinate:function(){return this.mode==="determinate"}}},Y=["aria-valuenow"];function Z(e,s,a,l,p,i){return n(),o("div",k({role:"progressbar",class:e.cx("root"),"aria-valuemin":"0","aria-valuenow":e.value,"aria-valuemax":"100"},e.ptmi("root")),[i.determinate?(n(),o("div",k({key:0,class:e.cx("value"),style:i.progressStyle},e.ptm("value")),[e.value!=null&&e.value!==0&&e.showValue?(n(),o("div",k({key:0,class:e.cx("label")},e.ptm("label")),[P(e.$slots,"default",{},function(){return[b(m(e.value+"%"),1)]})],16)):v("",!0)],16)):i.indeterminate?(n(),o("div",k({key:1,class:e.cx("value")},e.ptm("value")),null,16)):v("",!0)],16,Y)}D.render=Z;const ee={__name:"ProductCard",props:{product:Object},setup(e){return(s,a)=>null}},te={class:"p-4"},ne={key:0,class:"absolute w-[90vw] lg:w-[70vw] rounded-b-lg z-10 p-2 bg-gray-200 space-y-2"},se={class:"p-2 bg-white hidden md:flex my-1 justify-between rounded-lg hover:bg-black cursor-pointer hover:text-white"},ae={class:"flex flex-col w-full"},re={class:"flex space-x-2 items-center"},oe={key:0},le=t("div",{class:"bg-gray-400 text-xs rounded-full py-0.5 px-2"}," Todos los dias ",-1),ie=[le],ce={class:"bg-gray-400 text-xs rounded-full py-0.5 px-2"},de={key:2,class:"text-lg"},ue={key:3,class:"text-lg"},V={__name:"Experiencias",setup(e){const s=u(""),a=u([]),l=u(!1),p=()=>{l.value=!0,a.value=[],j.get(route("get.services",{search:s.value})).then(r=>{a.value=r.data.services,l.value=!1})},i=u(!1),g=r=>{let d=[{initials:"D",name:"Domingo"},{initials:"L",name:"Lunes"},{initials:"M",name:"Martes"},{initials:"M",name:"Miercoles"},{initials:"J",name:"Jueves"},{initials:"V",name:"Viernes"},{initials:"S",name:"Sabado"}];return r.map(S=>d[S])},w=new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0});return(r,d)=>{const z=W,S=D,N=T;return n(),o("div",te,[I(z,{class:"h-12 w-full",onFocus:d[0]||(d[0]=c=>i.value=!0),onBlur:d[1]||(d[1]=c=>i.value=!1),modelValue:s.value,"onUpdate:modelValue":d[2]||(d[2]=c=>s.value=c),onInput:p,placeholder:"Buscar",type:"text",size:"large"},null,8,["modelValue"]),s.value||i.value?(n(),o("div",ne,[l.value?(n(),h(S,{key:0,mode:"indeterminate",style:{height:"6px"}})):a.value.length>0&&s.value?(n(!0),o(_,{key:1},x(a.value,c=>(n(),h(y(B),{href:r.route("show.services",c.slug)},{default:$(()=>[t("div",se,[t("div",ae,[t("p",null,m(c.title),1),t("div",re,[(n(!0),o(_,null,x(c.features,f=>(n(),o("div",{class:"py-0.5 px-3 text-sm font-bold text-white rounded-full",style:F(`background-color: #${f.color};`)},m(f.name),5))),256)),JSON.parse(c.days).length==0?(n(),o("div",oe,ie)):v("",!0),(n(!0),o(_,null,x(g(JSON.parse(c.days)),f=>M((n(),o("div",ce,[b(m(f.initials),1)])),[[N,f.name,void 0,{bottom:!0}]])),256))])]),t("p",null,m(y(w).format(c.price)),1)]),I(ee,{class:"md:hidden block",product:c},null,8,["product"])]),_:2},1032,["href"]))),256)):s.value?(n(),o("div",de,[b(" No encontramos nada relacionado con "),t("strong",null,m(s.value),1),b(" pero te recomendamos ")])):(n(),o("div",ue," Escriba algo para buscar... "))])):v("",!0)])}}},E=e=>(L("data-v-349b1f9a"),e=e(),U(),e),pe={class:"flex flex-col"},me=["src","alt"],ge={class:"h-32 py-4 px-2"},he={class:"md:text-lg font-bold capitalize w-full line-clamp-3"},ve=E(()=>t("div",{class:"flex space-x-2 text-xs"},[t("i",{class:"fa-solid fa-map-pin text-emerald-500"}),t("span",{class:"italic"}," Cartagena ")],-1)),fe={class:"flex w-full justify-end mb-2 px-2"},be={class:"font-semibold text-gray-800"},_e={class:"text-md font-semibold mx-1"},xe=E(()=>t("span",{class:"text-xs"}," / Adulto ",-1)),ye={__name:"ExperienceMiniCard",props:{product:Object},setup(e){const s=e,a=new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}),l=u(s.product.images[0]),p=u(),i=()=>{var r=(s.product.images.indexOf(l.value)+1)%s.product.images.length;l.value=s.product.images[r],console.table({img:l.value,index:r})};A(()=>{g()});const g=()=>{p.value=setInterval(i,5e4)};J(()=>{w()});const w=()=>{p.value&&(clearInterval(p.value),p.value=null)};return(r,d)=>(n(),h(y(B),{href:r.route("show.services",e.product.slug),class:"flex flex-col shadow-slate-400 shadow-lg inset-0 z-10 flex-shrink-0 h-full rounded-tr-[3rem] rounded-bl-[3rem] bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] md:scale-90 hover:scale-100"},{default:$(()=>[t("div",pe,[t("img",{src:"/images/productos/"+l.value,alt:e.product.imageAlt,class:"h-48 w-full object-cover object-center z-10 rounded-tr-[3rem] rounded-bl-[3rem]"},null,8,me),t("div",ge,[t("h1",he,m(e.product.title),1),ve]),t("div",fe,[t("p",be,[t("strong",_e,m(y(a).format(e.product.price)),1),b(),xe])])])]),_:1},8,["href"]))}},we=G(ye,[["__scopeId","data-v-349b1f9a"]]),ke={class:"md:flex justify-center w-full h-[55vh] py-4 hidden"},$e={class:"shadow-2xl shadow-gray-700 flex flex-col items-center rounded-lg md:p-5 w-[98vw] md:w-[90vw] md:px-28 h-full",style:{"background-image":"url('/images/cartagena.webp')","background-size":"cover","background-position":"center"}},Se={class:"py-10 space-y-10 mt-4 w-full"},Ie=t("h1",{"data-aos":"zoom-in-down","data-aos-duration":"2000",class:"text-center text-3xl lg:text-6xl text-white font-extrabold"}," Busca la mejor experiencia para ti ",-1),Be={"data-aos":"flip-down","data-aos-duration":"1000",class:"bg-white p-2 rounded-lg shadow-lg"},ze={class:"w-full bg-gray-200 rounded-md p-2 grid grid-cols-2 divide-y-2 md:flex space-x-2"},Ce=["onClick"],Ve={class:"md:hidden fixed w-full -mt-2 bg-gray-700 p-4 rounded-b"},je=t("h1",{class:"text-white font-bold text-xl capitalize"},"Buscar Experiencias en Cartagena",-1),De={class:"bg-white w-full px-0 md:px-10 mt-44 md:mt-0 z-30"},Ee={class:"px-4 py-2 sm:px-6 sm:py-10 mx-auto lg:px-1"},Ne={class:"flex justify-between"},Oe=t("h2",{class:"text-xl font-bold text-gray-900"},"Vive nuestras Experiencias",-1),Pe=t("div",null,"Ver todas",-1),Fe=t("i",{class:"fa-solid fa-arrow-right"},null,-1),Me={class:"flex w-full space-x-2 overflow-x-auto py-2"},Ge={__name:"Welcome",props:{canLogin:{type:Boolean}},setup(e){u(!1);const s=u([]);(()=>{j.get(route("get.services")).then(g=>{s.value=g.data.services.slice(0,5)})})();const l=u({name:"Option 1",value:1}),p=u([{name:"Experiencias y Tours",value:1},{name:"Alojamiento",value:2},{name:"Transporte",value:3},{name:"Embarcaciones",value:4}]),i=g=>{l.value=g};return(g,w)=>(n(),h(q,null,{default:$(()=>[t("div",ke,[t("div",$e,[t("div",Se,[Ie,t("div",Be,[t("div",ze,[(n(!0),o(_,null,x(p.value,r=>(n(),o("div",{onClick:d=>i(r),class:C(["w-full rounded-full text-center py-2 text-sm md:text-md cursor-pointer",l.value.value==r.value?"bg-white":"hover:bg-white/30"])},m(r.name),11,Ce))),256))]),l.value.value==1?(n(),h(V,{key:0})):v("",!0)])])])]),t("div",Ve,[je,l.value.value==1?(n(),h(V,{key:0})):v("",!0)]),t("div",De,[t("div",Ee,[t("div",Ne,[Oe,I(y(B),{href:"#",class:"text-indigo-500 text-md space-x-1 hover:space-x-3 flex items-center"},{default:$(()=>[Pe,Fe]),_:1})]),t("div",Me,[(n(!0),o(_,null,x(s.value,r=>(n(),h(we,{class:C("w-1/2 lg:w-1/"+s.value.length>6?6:s.value.length),key:r.id,product:r},null,8,["class","product"]))),128))])])])]),_:1}))}};export{Ge as default};
