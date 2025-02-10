import{af as R,fq as a,am as g,eA as l,as as S,ey as j,fk as B,et as P,ao as H,ap as F,e as C,aA as K,o as c,c as y,w as p,b as L,aD as I,ah as r,k as D,f as u,r as f,F as T,aC as w,n as N,g as z,a as m,t as U,d$ as A}from"./app-CAgEonYK.js";import{s as V}from"./index-Bkag-uyN.js";import{F as q}from"./index-IY_USx6-.js";import{O as Y}from"./postcss-Dlrh4i1X.js";import{s as Z}from"./index-CO_8rx0L.js";import{s as G}from"./index-Cvfp_s06.js";var J=function(n){var t=n.dt;return`
.p-confirmpopup {
    position: absolute;
    margin-top: `.concat(t("confirmpopup.gutter"),`;
    top: 0;
    left: 0;
    background: `).concat(t("confirmpopup.background"),`;
    color: `).concat(t("confirmpopup.color"),`;
    border: 1px solid `).concat(t("confirmpopup.border.color"),`;
    border-radius: `).concat(t("confirmpopup.border.radius"),`;
    box-shadow: `).concat(t("confirmpopup.shadow"),`;
}

.p-confirmpopup-content {
    display: flex;
    align-items: center;
    padding: `).concat(t("confirmpopup.content.padding"),`;
    gap: `).concat(t("confirmpopup.content.gap"),`;
}

.p-confirmpopup-icon {
    font-size: `).concat(t("confirmpopup.icon.size"),`;
    width: `).concat(t("confirmpopup.icon.size"),`;
    height: `).concat(t("confirmpopup.icon.size"),`;
    color: `).concat(t("confirmpopup.icon.color"),`;
}

.p-confirmpopup-footer {
    display: flex;
    justify-content: flex-end;
    gap: `).concat(t("confirmpopup.footer.gap"),`;
    padding: `).concat(t("confirmpopup.footer.padding"),`;
}

.p-confirmpopup-footer button {
    width: auto;
}

.p-confirmpopup-footer button:last-child {
    margin: 0;
}

.p-confirmpopup-flipped {
    margin-block-start: calc(`).concat(t("confirmpopup.gutter"),` * -1);
    margin-block-end: `).concat(t("confirmpopup.gutter"),`;
}

.p-confirmpopup-enter-from {
    opacity: 0;
    transform: scaleY(0.8);
}

.p-confirmpopup-leave-to {
    opacity: 0;
}

.p-confirmpopup-enter-active {
    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1), opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
}

.p-confirmpopup-leave-active {
    transition: opacity 0.1s linear;
}

.p-confirmpopup:after,
.p-confirmpopup:before {
    bottom: 100%;
    left: calc(`).concat(t("confirmpopup.arrow.offset")," + ").concat(t("confirmpopup.arrow.left"),`);
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
}

.p-confirmpopup:after {
    border-width: calc(`).concat(t("confirmpopup.gutter"),` - 2px);
    margin-left: calc(-1 * (`).concat(t("confirmpopup.gutter"),` - 2px));
    border-style: solid;
    border-color: transparent;
    border-bottom-color: `).concat(t("confirmpopup.background"),`;
}

.p-confirmpopup:before {
    border-width: `).concat(t("confirmpopup.gutter"),`;
    margin-left: calc(-1 * `).concat(t("confirmpopup.gutter"),`);
    border-style: solid;
    border-color: transparent;
    border-bottom-color: `).concat(t("confirmpopup.border.color"),`;
}

.p-confirmpopup-flipped:after,
.p-confirmpopup-flipped:before {
    bottom: auto;
    top: 100%;
}

.p-confirmpopup-flipped:after {
    border-bottom-color: transparent;
    border-top-color: `).concat(t("confirmpopup.background"),`;
}

.p-confirmpopup-flipped:before {
    border-bottom-color: transparent;
    border-top-color: `).concat(t("confirmpopup.border.color"),`;
}
`)},M={root:"p-confirmpopup p-component",content:"p-confirmpopup-content",icon:"p-confirmpopup-icon",message:"p-confirmpopup-message",footer:"p-confirmpopup-footer",pcRejectButton:"p-confirmpopup-reject-button",pcAcceptButton:"p-confirmpopup-accept-button"},Q=R.extend({name:"confirmpopup",theme:J,classes:M}),W={name:"BaseConfirmPopup",extends:G,props:{group:String},style:Q,provide:function(){return{$pcConfirmPopup:this,$parentInstance:this}}},X={name:"ConfirmPopup",extends:W,inheritAttrs:!1,data:function(){return{visible:!1,confirmation:null,autoFocusAccept:null,autoFocusReject:null,target:null}},target:null,outsideClickListener:null,scrollHandler:null,resizeListener:null,container:null,confirmListener:null,closeListener:null,mounted:function(){var n=this;this.confirmListener=function(t){t&&t.group===n.group&&(n.confirmation=t,n.target=t.target,n.confirmation.onShow&&n.confirmation.onShow(),n.visible=!0)},this.closeListener=function(){n.visible=!1,n.confirmation=null},a.on("confirm",this.confirmListener),a.on("close",this.closeListener)},beforeUnmount:function(){a.off("confirm",this.confirmListener),a.off("close",this.closeListener),this.unbindOutsideClickListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.unbindResizeListener(),this.container&&(g.clear(this.container),this.container=null),this.target=null,this.confirmation=null},methods:{accept:function(){this.confirmation.accept&&this.confirmation.accept(),this.visible=!1},reject:function(){this.confirmation.reject&&this.confirmation.reject(),this.visible=!1},onHide:function(){this.confirmation.onHide&&this.confirmation.onHide(),this.visible=!1},onAcceptKeydown:function(n){(n.code==="Space"||n.code==="Enter"||n.code==="NumpadEnter")&&(this.accept(),l(this.target),n.preventDefault())},onRejectKeydown:function(n){(n.code==="Space"||n.code==="Enter"||n.code==="NumpadEnter")&&(this.reject(),l(this.target),n.preventDefault())},onEnter:function(n){this.autoFocusAccept=this.confirmation.defaultFocus===void 0||this.confirmation.defaultFocus==="accept",this.autoFocusReject=this.confirmation.defaultFocus==="reject",this.target=this.target||document.activeElement,this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),g.set("overlay",n,this.$primevue.config.zIndex.overlay)},onAfterEnter:function(){this.focus()},onLeave:function(){this.autoFocusAccept=null,this.autoFocusReject=null,l(this.target),this.target=null,this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener()},onAfterLeave:function(n){g.clear(n)},alignOverlay:function(){S(this.container,this.target,!1);var n=j(this.container),t=j(this.target),d=0;n.left<t.left&&(d=t.left-n.left),this.container.style.setProperty(B("confirmpopup.arrow.left").name,"".concat(d,"px")),n.top<t.top&&(this.container.setAttribute("data-p-confirmpopup-flipped","true"),!this.isUnstyled&&P(this.container,"p-confirmpopup-flipped"))},bindOutsideClickListener:function(){var n=this;this.outsideClickListener||(this.outsideClickListener=function(t){n.visible&&n.container&&!n.container.contains(t.target)&&!n.isTargetClicked(t)?(n.confirmation.onHide&&n.confirmation.onHide(),n.visible=!1):n.alignOverlay()},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null)},bindScrollListener:function(){var n=this;this.scrollHandler||(this.scrollHandler=new H(this.target,function(){n.visible&&(n.visible=!1)})),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var n=this;this.resizeListener||(this.resizeListener=function(){n.visible&&!F()&&(n.visible=!1)},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},focus:function(){var n=this.container.querySelector("[autofocus]");n&&n.focus({preventScroll:!0})},isTargetClicked:function(n){return this.target&&(this.target===n.target||this.target.contains(n.target))},containerRef:function(n){this.container=n},onOverlayClick:function(n){Y.emit("overlay-click",{originalEvent:n,target:this.target})},onOverlayKeydown:function(n){n.code==="Escape"&&(a.emit("close",this.closeListener),l(this.target))}},computed:{message:function(){return this.confirmation?this.confirmation.message:null},acceptLabel:function(){if(this.confirmation){var n,t=this.confirmation;return t.acceptLabel||((n=t.acceptProps)===null||n===void 0?void 0:n.label)||this.$primevue.config.locale.accept}return this.$primevue.config.locale.accept},rejectLabel:function(){if(this.confirmation){var n,t=this.confirmation;return t.rejectLabel||((n=t.rejectProps)===null||n===void 0?void 0:n.label)||this.$primevue.config.locale.reject}return this.$primevue.config.locale.reject},acceptIcon:function(){var n;return this.confirmation?this.confirmation.acceptIcon:(n=this.confirmation)!==null&&n!==void 0&&n.acceptProps?this.confirmation.acceptProps.icon:null},rejectIcon:function(){var n;return this.confirmation?this.confirmation.rejectIcon:(n=this.confirmation)!==null&&n!==void 0&&n.rejectProps?this.confirmation.rejectProps.icon:null}},components:{Button:V,Portal:Z},directives:{focustrap:q}},$=["aria-modal"];function x(e,n,t,d,i,o){var k=C("Button"),E=C("Portal"),O=K("focustrap");return c(),y(E,null,{default:p(function(){return[L(I,r({name:"p-confirmpopup",onEnter:o.onEnter,onAfterEnter:o.onAfterEnter,onLeave:o.onLeave,onAfterLeave:o.onAfterLeave},e.ptm("transition")),{default:p(function(){var h,b,v;return[i.visible?D((c(),u("div",r({key:0,ref:o.containerRef,role:"alertdialog",class:e.cx("root"),"aria-modal":i.visible,onClick:n[2]||(n[2]=function(){return o.onOverlayClick&&o.onOverlayClick.apply(o,arguments)}),onKeydown:n[3]||(n[3]=function(){return o.onOverlayKeydown&&o.onOverlayKeydown.apply(o,arguments)})},e.ptmi("root")),[e.$slots.container?f(e.$slots,"container",{key:0,message:i.confirmation,acceptCallback:o.accept,rejectCallback:o.reject}):(c(),u(T,{key:1},[e.$slots.message?(c(),y(w(e.$slots.message),{key:1,message:i.confirmation},null,8,["message"])):(c(),u("div",r({key:0,class:e.cx("content")},e.ptm("content")),[f(e.$slots,"icon",{},function(){return[e.$slots.icon?(c(),y(w(e.$slots.icon),{key:0,class:N(e.cx("icon"))},null,8,["class"])):i.confirmation.icon?(c(),u("span",r({key:1,class:[i.confirmation.icon,e.cx("icon")]},e.ptm("icon")),null,16)):z("",!0)]}),m("span",r({class:e.cx("message")},e.ptm("message")),U(i.confirmation.message),17)],16)),m("div",r({class:e.cx("footer")},e.ptm("footer")),[L(k,r({class:[e.cx("pcRejectButton"),i.confirmation.rejectClass],autofocus:i.autoFocusReject,unstyled:e.unstyled,size:((h=i.confirmation.rejectProps)===null||h===void 0?void 0:h.size)||"small",text:((b=i.confirmation.rejectProps)===null||b===void 0?void 0:b.text)||!1,onClick:n[0]||(n[0]=function(s){return o.reject()}),onKeydown:o.onRejectKeydown},i.confirmation.rejectProps,{label:o.rejectLabel,pt:e.ptm("pcRejectButton")}),A({_:2},[o.rejectIcon||e.$slots.rejecticon?{name:"icon",fn:p(function(s){return[f(e.$slots,"rejecticon",{},function(){return[m("span",r({class:[o.rejectIcon,s.class]},e.ptm("pcRejectButton").icon,{"data-pc-section":"rejectbuttonicon"}),null,16)]})]}),key:"0"}:void 0]),1040,["class","autofocus","unstyled","size","text","onKeydown","label","pt"]),L(k,r({class:[e.cx("pcAcceptButton"),i.confirmation.acceptClass],autofocus:i.autoFocusAccept,unstyled:e.unstyled,size:((v=i.confirmation.acceptProps)===null||v===void 0?void 0:v.size)||"small",onClick:n[1]||(n[1]=function(s){return o.accept()}),onKeydown:o.onAcceptKeydown},i.confirmation.acceptProps,{label:o.acceptLabel,pt:e.ptm("pcAcceptButton")}),A({_:2},[o.acceptIcon||e.$slots.accepticon?{name:"icon",fn:p(function(s){return[f(e.$slots,"accepticon",{},function(){return[m("span",r({class:[o.acceptIcon,s.class]},e.ptm("pcAcceptButton").icon,{"data-pc-section":"acceptbuttonicon"}),null,16)]})]}),key:"0"}:void 0]),1040,["class","autofocus","unstyled","size","onKeydown","label","pt"])],16)],64))],16,$)),[[O]]):z("",!0)]}),_:3},16,["onEnter","onAfterEnter","onLeave","onAfterLeave"])]}),_:3})}X.render=x;export{X as s};
