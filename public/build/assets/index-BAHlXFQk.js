import{a4 as P,d2 as a,am as v,ak as g,ar as R,af as j,bp as S,aD as B,as as H,at as F,e as C,ai as K,o as c,c as L,w as l,b as y,$ as I,J as r,k as D,f as p,r as u,F as T,a7 as w,n as N,g as z,a as f,t as U,av as O}from"./app-DVpdczqw.js";import{s as V}from"./index-DFpfw_2G.js";import{F as X}from"./index-CUVgbKiM.js";import{O as q}from"./index-BYA20F9C.js";import{s as J}from"./index-B5fVcnNG.js";import{s as Y}from"./index-DmB24AAk.js";var Z=function(n){var t=n.dt;return`
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
    margin-top: calc(`).concat(t("confirmpopup.gutter"),` * -1);
    margin-bottom: `).concat(t("confirmpopup.gutter"),`;
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
    left: `).concat(t("confirmpopup.arrow.offset"),`;
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
`)},G={root:"p-confirmpopup p-component",content:"p-confirmpopup-content",icon:"p-confirmpopup-icon",message:"p-confirmpopup-message",footer:"p-confirmpopup-footer",pcRejectButton:"p-confirmpopup-reject-button",pcAcceptButton:"p-confirmpopup-accept-button"},M=P.extend({name:"confirmpopup",theme:Z,classes:G}),Q={name:"BaseConfirmPopup",extends:Y,props:{group:String},style:M,provide:function(){return{$pcConfirmPopup:this,$parentInstance:this}}},W={name:"ConfirmPopup",extends:Q,inheritAttrs:!1,data:function(){return{visible:!1,confirmation:null,autoFocusAccept:null,autoFocusReject:null}},target:null,outsideClickListener:null,scrollHandler:null,resizeListener:null,container:null,confirmListener:null,closeListener:null,mounted:function(){var n=this;this.confirmListener=function(t){t&&t.group===n.group&&(n.confirmation=t,n.target=t.target,n.confirmation.onShow&&n.confirmation.onShow(),n.visible=!0)},this.closeListener=function(){n.visible=!1,n.confirmation=null},a.on("confirm",this.confirmListener),a.on("close",this.closeListener)},beforeUnmount:function(){a.off("confirm",this.confirmListener),a.off("close",this.closeListener),this.unbindOutsideClickListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.unbindResizeListener(),this.container&&(v.clear(this.container),this.container=null),this.target=null,this.confirmation=null},methods:{accept:function(){this.confirmation.accept&&this.confirmation.accept(),this.visible=!1},reject:function(){this.confirmation.reject&&this.confirmation.reject(),this.visible=!1},onHide:function(){this.confirmation.onHide&&this.confirmation.onHide(),this.visible=!1},onAcceptKeydown:function(n){(n.code==="Space"||n.code==="Enter"||n.code==="NumpadEnter")&&(this.accept(),g(this.target),n.preventDefault())},onRejectKeydown:function(n){(n.code==="Space"||n.code==="Enter"||n.code==="NumpadEnter")&&(this.reject(),g(this.target),n.preventDefault())},onEnter:function(n){this.autoFocusAccept=this.confirmation.defaultFocus===void 0||this.confirmation.defaultFocus==="accept",this.autoFocusReject=this.confirmation.defaultFocus==="reject",this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),v.set("overlay",n,this.$primevue.config.zIndex.overlay)},onAfterEnter:function(){this.focus()},onLeave:function(){this.autoFocusAccept=null,this.autoFocusReject=null,this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener()},onAfterLeave:function(n){v.clear(n)},alignOverlay:function(){R(this.container,this.target,!1);var n=j(this.container),t=j(this.target),m=0;n.left<t.left&&(m=t.left-n.left),this.container.style.setProperty(S("overlay.arrow.left").name,"".concat(m,"px")),n.top<t.top&&(this.container.setAttribute("data-p-confirmpopup-flipped","true"),!this.isUnstyled&&B(this.container,"p-confirmpopup-flipped"))},bindOutsideClickListener:function(){var n=this;this.outsideClickListener||(this.outsideClickListener=function(t){n.visible&&n.container&&!n.container.contains(t.target)&&!n.isTargetClicked(t)?(n.confirmation.onHide&&n.confirmation.onHide(),n.visible=!1):n.alignOverlay()},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null)},bindScrollListener:function(){var n=this;this.scrollHandler||(this.scrollHandler=new H(this.target,function(){n.visible&&(n.visible=!1)})),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var n=this;this.resizeListener||(this.resizeListener=function(){n.visible&&!F()&&(n.visible=!1)},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},focus:function(){var n=this.container.querySelector("[autofocus]");n&&n.focus({preventScroll:!0})},isTargetClicked:function(n){return this.target&&(this.target===n.target||this.target.contains(n.target))},containerRef:function(n){this.container=n},onOverlayClick:function(n){q.emit("overlay-click",{originalEvent:n,target:this.target})},onOverlayKeydown:function(n){n.code==="Escape"&&(a.emit("close",this.closeListener),g(this.target))},getCXOptions:function(n,t){return{contenxt:{icon:n,iconClass:t.class}}}},computed:{message:function(){return this.confirmation?this.confirmation.message:null},acceptLabel:function(){if(this.confirmation){var n=this.confirmation;return n.acceptLabel?n.acceptLabel:n.acceptProps?n.acceptProps.label||this.$primevue.config.locale.accept:null}return null},rejectLabel:function(){if(this.confirmation){var n=this.confirmation;return n.rejectLabel?n.rejectLabel:n.rejectProps?n.rejectProps.label||this.$primevue.config.locale.reject:null}return null},acceptIcon:function(){var n;return this.confirmation?this.confirmation.acceptIcon:(n=this.confirmation)!==null&&n!==void 0&&n.acceptProps?this.confirmation.acceptProps.icon:null},rejectIcon:function(){var n;return this.confirmation?this.confirmation.rejectIcon:(n=this.confirmation)!==null&&n!==void 0&&n.rejectProps?this.confirmation.rejectProps.icon:null}},components:{Button:V,Portal:J},directives:{focustrap:X}},$=["aria-modal"];function x(e,n,t,m,i,o){var k=C("Button"),A=C("Portal"),E=K("focustrap");return c(),L(A,null,{default:l(function(){return[y(I,r({name:"p-confirmpopup",onEnter:o.onEnter,onAfterEnter:o.onAfterEnter,onLeave:o.onLeave,onAfterLeave:o.onAfterLeave},e.ptm("transition")),{default:l(function(){var d,h,b;return[i.visible?D((c(),p("div",r({key:0,ref:o.containerRef,role:"alertdialog",class:e.cx("root"),"aria-modal":i.visible,onClick:n[2]||(n[2]=function(){return o.onOverlayClick&&o.onOverlayClick.apply(o,arguments)}),onKeydown:n[3]||(n[3]=function(){return o.onOverlayKeydown&&o.onOverlayKeydown.apply(o,arguments)})},e.ptmi("root")),[e.$slots.container?u(e.$slots,"container",{key:0,message:i.confirmation,acceptCallback:o.accept,rejectCallback:o.reject}):(c(),p(T,{key:1},[e.$slots.message?(c(),L(w(e.$slots.message),{key:1,message:i.confirmation},null,8,["message"])):(c(),p("div",r({key:0,class:e.cx("content")},e.ptm("content")),[u(e.$slots,"icon",{},function(){return[e.$slots.icon?(c(),L(w(e.$slots.icon),{key:0,class:N(e.cx("icon"))},null,8,["class"])):i.confirmation.icon?(c(),p("span",r({key:1,class:[i.confirmation.icon,e.cx("icon")]},e.ptm("icon")),null,16)):z("",!0)]}),f("span",r({class:e.cx("message")},e.ptm("message")),U(i.confirmation.message),17)],16)),f("div",r({class:e.cx("footer")},e.ptm("footer")),[y(k,r({class:[e.cx("pcRejectButton"),i.confirmation.rejectClass],autofocus:i.autoFocusReject,unstyled:e.unstyled,size:((d=i.confirmation.rejectProps)===null||d===void 0?void 0:d.size)||"small",text:((h=i.confirmation.rejectProps)===null||h===void 0?void 0:h.text)||!1,onClick:n[0]||(n[0]=function(s){return o.reject()}),onKeydown:o.onRejectKeydown},i.confirmation.rejectProps,{label:o.rejectLabel,pt:e.ptm("pcRejectButton")}),O({_:2},[o.rejectIcon||e.$slots.rejecticon?{name:"icon",fn:l(function(s){return[u(e.$slots,"rejecticon",{},function(){return[f("span",r({class:[o.rejectIcon,s.class]},e.ptm("pcRejectButton").icon,{"data-pc-section":"rejectbuttonicon"}),null,16)]})]}),key:"0"}:void 0]),1040,["class","autofocus","unstyled","size","text","onKeydown","label","pt"]),y(k,r({class:[e.cx("pcAcceptButton"),i.confirmation.acceptClass],autofocus:i.autoFocusAccept,unstyled:e.unstyled,size:((b=i.confirmation.acceptProps)===null||b===void 0?void 0:b.size)||"small",onClick:n[1]||(n[1]=function(s){return o.accept()}),onKeydown:o.onAcceptKeydown},i.confirmation.acceptProps,{label:o.acceptLabel,pt:e.ptm("pcAcceptButton")}),O({_:2},[o.acceptIcon||e.$slots.accepticon?{name:"icon",fn:l(function(s){return[u(e.$slots,"accepticon",{},function(){return[f("span",r({class:[o.acceptIcon,s.class]},e.ptm("pcAcceptButton").icon,{"data-pc-section":"acceptbuttonicon"}),null,16)]})]}),key:"0"}:void 0]),1040,["class","autofocus","unstyled","size","onKeydown","label","pt"])],16)],64))],16,$)),[[E]]):z("",!0)]}),_:3},16,["onEnter","onAfterEnter","onLeave","onAfterLeave"])]}),_:3})}W.render=x;export{W as s};
