import{M as O,o as n,f as r,B as k,r as M,h as b,t as m,g as v,d as u,b as B,c as h,F as _,i as x,w as $,a as e,a3 as P,k as F,u as y,p as z,L as j,E as T,S as L,_ as J,bg as U,bh as A,n as C}from"./app-Bu3SGlft.js";import"./v3-CCpziHwT.js";import"./postcss-RDrrCDRK.js";import{s as R}from"./index-BZnDWmvM.js";import{s as W}from"./index-CuJKRFGH.js";import{_ as q}from"./GuestLayout-j5nkXFj-.js";import{_ as G}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./keyboard-DZ_a7a-p.js";var H=function(s){var a=s.dt;return`
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
`)},K={root:function(s){var a=s.instance;return["p-progressbar p-component",{"p-progressbar-determinate":a.determinate,"p-progressbar-indeterminate":a.indeterminate}]},value:"p-progressbar-value",label:"p-progressbar-label"},Q=O.extend({name:"progressbar",theme:H,classes:K}),X={name:"BaseProgressBar",extends:R,props:{value:{type:Number,default:null},mode:{type:String,default:"determinate"},showValue:{type:Boolean,default:!0}},style:Q,provide:function(){return{$pcProgressBar:this,$parentInstance:this}}},D={name:"ProgressBar",extends:X,inheritAttrs:!1,computed:{progressStyle:function(){return{width:this.value+"%",display:"flex"}},indeterminate:function(){return this.mode==="indeterminate"},determinate:function(){return this.mode==="determinate"}}},Y=["aria-valuenow"];function Z(t,s,a,o,p,i){return n(),r("div",k({role:"progressbar",class:t.cx("root"),"aria-valuemin":"0","aria-valuenow":t.value,"aria-valuemax":"100"},t.ptmi("root")),[i.determinate?(n(),r("div",k({key:0,class:t.cx("value"),style:i.progressStyle},t.ptm("value")),[t.value!=null&&t.value!==0&&t.showValue?(n(),r("div",k({key:0,class:t.cx("label")},t.ptm("label")),[M(t.$slots,"default",{},function(){return[b(m(t.value+"%"),1)]})],16)):v("",!0)],16)):i.indeterminate?(n(),r("div",k({key:1,class:t.cx("value")},t.ptm("value")),null,16)):v("",!0)],16,Y)}D.render=Z;const ee={__name:"ProductCard",props:{product:Object},setup(t){return(s,a)=>null}},te={class:"p-4"},ne={key:0,class:"absolute w-[90vw] lg:w-[70vw] rounded-b-lg z-10 p-2 bg-gray-200 space-y-2"},se={class:"p-2 bg-white hidden md:flex my-1 justify-between rounded-lg hover:bg-black cursor-pointer hover:text-white"},ae={class:"flex flex-col w-full"},re={class:"flex space-x-2 items-center"},oe={key:0},le=e("div",{class:"bg-gray-400 text-xs rounded-full py-0.5 px-2"}," Todos los dias ",-1),ie=[le],ce={class:"bg-gray-400 text-xs rounded-full py-0.5 px-2"},de={key:2,class:"text-lg"},ue={key:3,class:"text-lg"},V={__name:"Experiencias",setup(t){const s=u(""),a=u([]),o=u(!1),p=()=>{o.value=!0,a.value=[],j.get(route("get.services",{search:s.value})).then(c=>{a.value=c.data.services,o.value=!1})},i=u(!1),g=c=>{let l=[{initials:"D",name:"Domingo"},{initials:"L",name:"Lunes"},{initials:"M",name:"Martes"},{initials:"M",name:"Miercoles"},{initials:"J",name:"Jueves"},{initials:"V",name:"Viernes"},{initials:"S",name:"Sabado"}];return c.map(I=>l[I])},w=new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0});return(c,l)=>{const S=W,I=D,N=T;return n(),r("div",te,[B(S,{class:"h-12 w-full",onFocus:l[0]||(l[0]=d=>i.value=!0),onBlur:l[1]||(l[1]=d=>i.value=!1),modelValue:s.value,"onUpdate:modelValue":l[2]||(l[2]=d=>s.value=d),onInput:p,placeholder:"Buscar",type:"text",size:"large"},null,8,["modelValue"]),s.value||i.value?(n(),r("div",ne,[o.value?(n(),h(I,{key:0,mode:"indeterminate",style:{height:"6px"}})):a.value.length>0&&s.value?(n(!0),r(_,{key:1},x(a.value,d=>(n(),h(y(z),{href:c.route("show.services",d.slug)},{default:$(()=>[e("div",se,[e("div",ae,[e("p",null,m(d.title),1),e("div",re,[(n(!0),r(_,null,x(d.features,f=>(n(),r("div",{class:"py-0.5 px-3 text-sm font-bold text-white rounded-full",style:P(`background-color: #${f.color};`)},m(f.name),5))),256)),JSON.parse(d.days).length==0?(n(),r("div",oe,ie)):v("",!0),(n(!0),r(_,null,x(g(JSON.parse(d.days)),f=>F((n(),r("div",ce,[b(m(f.initials),1)])),[[N,f.name,void 0,{bottom:!0}]])),256))])]),e("p",null,m(y(w).format(d.price)),1)]),B(ee,{class:"md:hidden block",product:d},null,8,["product"])]),_:2},1032,["href"]))),256)):s.value?(n(),r("div",de,[b(" No encontramos nada relacionado con "),e("strong",null,m(s.value),1),b(" pero te recomendamos ")])):(n(),r("div",ue," Escriba algo para buscar... "))])):v("",!0)])}}},E=t=>(U("data-v-40c228b4"),t=t(),A(),t),pe={class:"flex flex-col"},me=["src","alt"],ge={class:"h-32 py-4 px-2"},he={class:"md:text-lg font-bold capitalize w-full line-clamp-3"},ve=E(()=>e("div",{class:"flex space-x-2 text-xs"},[e("i",{class:"fa-solid fa-map-pin text-emerald-500"}),e("span",{class:"italic"}," Cartagena ")],-1)),fe={class:"flex w-full justify-end mb-2 px-2"},be={class:"font-semibold text-gray-800"},_e={class:"text-md font-semibold mx-1"},xe=E(()=>e("span",{class:"text-xs"}," / Adulto ",-1)),ye={__name:"ExperienceMiniCard",props:{product:Object},setup(t){const s=t,a=new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}),o=u(s.product.images.map(l=>l.filepath)),p=u(o[0]),i=u(),g=()=>{console.log(s.product.title),console.log(o.value);var l=(o.value.indexOf(p.value)+1)%o.value.length;p.value=o.value[l].filepath,console.log(p.value)};L(()=>{w()});const w=()=>{i.value=setInterval(g,5e3)};J(()=>{c()});const c=()=>{i.value&&(clearInterval(i.value),i.value=null)};return(l,S)=>(n(),h(y(z),{href:l.route("show.services",t.product.slug),class:"flex flex-col shadow-slate-400 shadow-lg inset-0 z-10 flex-shrink-0 h-full rounded-tr-[3rem] rounded-bl-[3rem] bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] md:scale-90 hover:scale-100"},{default:$(()=>[e("div",pe,[e("img",{src:p.value,alt:p.value,class:"h-48 w-full object-cover object-center z-10 rounded-tr-[3rem] rounded-bl-[3rem]"},null,8,me),e("div",ge,[e("h1",he,m(t.product.title),1),ve]),e("div",fe,[e("p",be,[e("strong",_e,m(y(a).format(t.product.price)),1),b(),xe])])])]),_:1},8,["href"]))}},we=G(ye,[["__scopeId","data-v-40c228b4"]]),ke={class:"md:flex justify-center w-full h-[55vh] py-4 hidden"},$e={class:"shadow-2xl shadow-gray-700 flex flex-col items-center rounded-lg md:p-5 w-[98vw] md:w-[90vw] md:px-28 h-full",style:{"background-image":"url('/images/cartagena.webp')","background-size":"cover","background-position":"center"}},Se={class:"py-10 space-y-10 mt-4 w-full"},Ie=e("h1",{"data-aos":"zoom-in-down","data-aos-duration":"2000",class:"text-center text-3xl lg:text-6xl text-white font-extrabold"}," Busca la mejor experiencia para ti ",-1),Be={"data-aos":"flip-down","data-aos-duration":"1000",class:"bg-white p-2 rounded-lg shadow-lg"},ze={class:"w-full bg-gray-200 rounded-md p-2 grid grid-cols-2 divide-y-2 md:flex space-x-2"},Ce=["onClick"],Ve={class:"md:hidden fixed w-full -mt-2 bg-gray-700 p-4 rounded-b"},je=e("h1",{class:"text-white font-bold text-xl capitalize"},"Buscar Experiencias en Cartagena",-1),De={class:"bg-white w-full px-0 md:px-10 mt-44 md:mt-0 z-30"},Ee={class:"px-4 py-2 sm:px-6 sm:py-10 mx-auto lg:px-1"},Ne={class:"flex justify-between"},Oe=e("h2",{class:"text-xl font-bold text-gray-900"},"Vive nuestras Experiencias",-1),Me=e("div",null,"Ver todas",-1),Pe=e("i",{class:"fa-solid fa-arrow-right"},null,-1),Fe={class:"flex w-full space-x-2 overflow-x-auto py-2"},Ge={__name:"Welcome",props:{canLogin:{type:Boolean}},setup(t){u(!1);const s=u([]);(()=>{j.get(route("get.services")).then(g=>{s.value=g.data.services.slice(0,5)})})();const o=u({name:"Option 1",value:1}),p=u([{name:"Experiencias y Tours",value:1},{name:"Alojamiento",value:2},{name:"Transporte",value:3},{name:"Embarcaciones",value:4}]),i=g=>{o.value=g};return(g,w)=>(n(),h(q,null,{default:$(()=>[e("div",ke,[e("div",$e,[e("div",Se,[Ie,e("div",Be,[e("div",ze,[(n(!0),r(_,null,x(p.value,c=>(n(),r("div",{onClick:l=>i(c),class:C(["w-full rounded-full text-center py-2 text-sm md:text-md cursor-pointer",o.value.value==c.value?"bg-white":"hover:bg-white/30"])},m(c.name),11,Ce))),256))]),o.value.value==1?(n(),h(V,{key:0})):v("",!0)])])])]),e("div",Ve,[je,o.value.value==1?(n(),h(V,{key:0})):v("",!0)]),e("div",De,[e("div",Ee,[e("div",Ne,[Oe,B(y(z),{href:"#",class:"text-indigo-500 text-md space-x-1 hover:space-x-3 flex items-center"},{default:$(()=>[Me,Pe]),_:1})]),e("div",Fe,[(n(!0),r(_,null,x(s.value,c=>(n(),h(we,{class:C("w-1/2 lg:w-1/"+s.value.length>6?6:s.value.length),key:c.id,product:c},null,8,["class","product"]))),128))])])])]),_:1}))}};export{Ge as default};
