import{o as l,f as d,a as r,a4 as mt,aB as Z,am as E,aC as pt,aD as nt,aE as y,aj as it,ad as j,ai as F,k as _,J as u,c as h,a7 as g,g as m,F as C,i as A,aF as J,ay as ft,aG as bt,aH as vt,a5 as K,e as L,b as S,w as I,$ as gt,d as k,q as yt,a0 as W,n as $,t as P,u as x}from"./app-CvZALwpT.js";import{F as It}from"./index-D43Ym9R2.js";import{s as wt}from"./index-uwnBIrGc.js";import{s as D,R as M}from"./index-DJWndnZi.js";import{s as xt}from"./index-BCIAPP2L.js";import{s as at}from"./index-BjJd1GlU.js";import{s as rt}from"./index-CP_Wm-Zv.js";import{s as St}from"./index-96IvCkpP.js";import{s as kt}from"./index-dOPr8Qgr.js";import{_ as Pt}from"./GuestLayout-o4lTwSki.js";import{N as Ct,Q as At,V as _t}from"./disclosure-74HozttP.js";import"./keyboard-8lXSdolY.js";function Ot(e,t){return l(),d("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true","data-slot":"icon"},[r("path",{"fill-rule":"evenodd",d:"M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z","clip-rule":"evenodd"})])}function Tt(e,t){return l(),d("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true","data-slot":"icon"},[r("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"})])}function Bt(e,t){return l(),d("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true","data-slot":"icon"},[r("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M5 12h14"})])}function Vt(e,t){return l(),d("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true","data-slot":"icon"},[r("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 4.5v15m7.5-7.5h-15"})])}var $t=function(t){var n=t.dt;return`
.p-galleria {
    overflow: hidden;
    border-style: solid;
    border-width: `.concat(n("galleria.border.width"),`;
    border-color: `).concat(n("galleria.border.color"),`;
    border-radius: `).concat(n("galleria.border.radius"),`;
}

.p-galleria-content {
    display: flex;
    flex-direction: column;
}

.p-galleria-items-container {
    display: flex;
    flex-direction: column;
    position: relative;
}

.p-galleria-items {
    position: relative;
    display: flex;
    height: 100%;
}

.p-galleria-nav-button {
    position: absolute;
    top: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background: `).concat(n("galleria.nav.button.background"),`;
    color: `).concat(n("galleria.nav.button.color"),`;
    width: `).concat(n("galleria.nav.button.size"),`;
    height: `).concat(n("galleria.nav.button.size"),`;
    transition: background `).concat(n("galleria.transition.duration"),", color ").concat(n("galleria.transition.duration"),", outline-color ").concat(n("galleria.transition.duration"),", box-shadow ").concat(n("galleria.transition.duration"),`;
    margin: calc(-1 * calc(`).concat(n("galleria.nav.button.size"),") / 2) ").concat(n("galleria.nav.button.gutter")," 0 ").concat(n("galleria.nav.button.gutter"),`;
    padding: 0;
    user-select: none;
    border: 0 none;
    cursor: pointer;
    outline-color: transparent;
}

.p-galleria-nav-button:not(.p-disabled):hover {
    background: `).concat(n("galleria.nav.button.hover.background"),`;
    color: `).concat(n("galleria.nav.button.hover.color"),`;
}

.p-galleria-nav-button:not(.p-disabled):focus-visible {
    box-shadow: `).concat(n("galleria.nav.button.focus.ring.shadow"),`;
    outline: `).concat(n("galleria.nav.button.focus.ring.width")," ").concat(n("galleria.nav.button.focus.ring.style")," ").concat(n("galleria.nav.button.focus.ring.color"),`;
    outline-offset: `).concat(n("galleria.nav.button.focus.ring.offset"),`;
}

.p-galleria-next-icon,
.p-galleria-prev-icon {
    font-size: `).concat(n("galleria.nav.icon.size"),`;
    width: `).concat(n("galleria.nav.icon.size"),`;
    height: `).concat(n("galleria.nav.icon.size"),`;
}

.p-galleria-prev-button {
    border-radius: `).concat(n("galleria.nav.button.prev.border.radius"),`;
    left: 0;
}

.p-galleria-next-button {
    border-radius: `).concat(n("galleria.nav.button.next.border.radius"),`;
    right: 0;
}

.p-galleria-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}

.p-galleria-hover-navigators .p-galleria-nav-button {
    pointer-events: none;
    opacity: 0;
    transition: opacity `).concat(n("galleria.transition.duration"),` ease-in-out;
}

.p-galleria-hover-navigators .p-galleria-items-container:hover .p-galleria-nav-button {
    pointer-events: all;
    opacity: 1;
}

.p-galleria-hover-navigators .p-galleria-items-container:hover .p-galleria-nav-button.p-disabled {
    pointer-events: none;
}

.p-galleria-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: `).concat(n("galleria.caption.background"),`;
    color: `).concat(n("galleria.caption.color"),`;
    padding: `).concat(n("galleria.caption.padding"),`;
}

.p-galleria-thumbnails {
    display: flex;
    flex-direction: column;
    overflow: auto;
    flex-shrink: 0;
}

.p-galleria-thumbnail-nav-button {
    align-self: center;
    flex: 0 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    margin: 0 `).concat(n("galleria.thumbnail.nav.button.gutter"),`;
    padding: 0;
    border: none;
    user-select: none;
    cursor: pointer;
    background: transparent;
    color: `).concat(n("galleria.thumbnail.nav.button.color"),`;
    width: `).concat(n("galleria.thumbnail.nav.button.size"),`;
    height: `).concat(n("galleria.thumbnail.nav.button.size"),`;
    transition: background `).concat(n("galleria.transition.duration"),", color ").concat(n("galleria.transition.duration"),", outline-color ").concat(n("galleria.transition.duration"),`;
    outline-color: transparent;
    border-radius: `).concat(n("galleria.thumbnail.nav.button.border.radius"),`;
}

.p-galleria-thumbnail-nav-button:hover {
    background: `).concat(n("galleria.thumbnail.nav.button.hover.background"),`;
    color: `).concat(n("galleria.thumbnail.nav.button.hover.color"),`;
}

.p-galleria-thumbnail-nav-button:focus-visible {
    box-shadow: `).concat(n("galleria.thumbnail.nav.button.focus.ring.shadow"),`;
    outline: `).concat(n("galleria.thumbnail.nav.button.focus.ring.width")," ").concat(n("galleria.thumbnail.nav.button.focus.ring.style")," ").concat(n("galleria.thumbnail.nav.button.focus.ring.color"),`;
    outline-offset: `).concat(n("galleria.thumbnail.nav.button.focus.ring.offset"),`;
}

.p-galleria-thumbnail-nav-button .p-galleria-thumbnail-next-icon,
.p-galleria-thumbnail-nav-button .p-galleria-thumbnail-prev-icon {
    font-size: `).concat(n("galleria.thumbnail.nav.button.icon.size"),`;
    width: `).concat(n("galleria.thumbnail.nav.button.icon.size"),`;
    height: `).concat(n("galleria.thumbnail.nav.button.icon.size"),`;
}

.p-galleria-thumbnails-content {
    display: flex;
    flex-direction: row;
    background: `).concat(n("galleria.thumbnails.content.background"),`;
    padding: `).concat(n("galleria.thumbnails.content.padding"),`;
}

.p-galleria-thumbnails-viewport {
    overflow: hidden;
    width: 100%;
}

.p-galleria-thumbnail-items {
    display: flex;
}

.p-galleria-thumbnail-item {
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0.5;
}

.p-galleria-thumbnail {
    outline-color: transparent;
}

.p-galleria-thumbnail-item:hover {
    opacity: 1;
    transition: opacity 0.3s;
}

.p-galleria-thumbnail-item-current {
    opacity: 1;
}

.p-galleria-thumbnails-left .p-galleria-content,
.p-galleria-thumbnails-right .p-galleria-content {
    flex-direction: row;
}

.p-galleria-thumbnails-left .p-galleria-items-container,
.p-galleria-thumbnails-right .p-galleria-items-container {
    flex-direction: row;
}

.p-galleria-thumbnails-left .p-galleria-items-container,
.p-galleria-thumbnails-top .p-galleria-items-container {
    order: 2;
}

.p-galleria-thumbnails-left .p-galleria-thumbnails,
.p-galleria-thumbnails-top .p-galleria-thumbnails {
    order: 1;
}

.p-galleria-thumbnails-left .p-galleria-thumbnails-content,
.p-galleria-thumbnails-right .p-galleria-thumbnails-content {
    flex-direction: column;
    flex-grow: 1;
}

.p-galleria-thumbnails-left .p-galleria-thumbnail-items,
.p-galleria-thumbnails-right .p-galleria-thumbnail-items {
    flex-direction: column;
    height: 100%;
}

.p-galleria-indicator-list {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: `).concat(n("galleria.indicator.list.padding"),`;
    gap: `).concat(n("galleria.indicator.list.gap"),`;
    margin: 0;
    list-style: none;
}

.p-galleria-indicator-button {
    display: inline-flex;
    align-items: center;
    background: `).concat(n("galleria.indicator.button.background"),`;
    width: `).concat(n("galleria.indicator.button.width"),`;
    height: `).concat(n("galleria.indicator.button.height"),`;
    transition: background `).concat(n("galleria.transition.duration"),", color ").concat(n("galleria.transition.duration"),", outline-color ").concat(n("galleria.transition.duration"),", box-shadow ").concat(n("galleria.transition.duration"),`;
    outline-color: transparent;
    border-radius: `).concat(n("galleria.indicator.button.border.radius"),`;
    margin: 0;
    padding: 0;
    border: none;
    user-select: none;
    cursor: pointer;
}

.p-galleria-indicator-button:hover {
    background: `).concat(n("galleria.indicator.button.hover.background"),`;
}

.p-galleria-indicator-button:focus-visible {
    box-shadow: `).concat(n("galleria.indicator.button.focus.ring.shadow"),`;
    outline: `).concat(n("galleria.indicator.button.focus.ring.width")," ").concat(n("galleria.indicator.button.focus.ring.style")," ").concat(n("galleria.indicator.button.focus.ring.color"),`;
    outline-offset: `).concat(n("galleria.indicator.button.focus.ring.offset"),`;
}

.p-galleria-indicator-active .p-galleria-indicator-button {
    background: `).concat(n("galleria.indicator.button.active.background"),`;
}

.p-galleria-indicators-left .p-galleria-items-container,
.p-galleria-indicators-right .p-galleria-items-container {
    flex-direction: row;
    align-items: center;
}

.p-galleria-indicators-left .p-galleria-items,
.p-galleria-indicators-top .p-galleria-items {
    order: 2;
}

.p-galleria-indicators-left .p-galleria-indicator-list,
.p-galleria-indicators-top .p-galleria-indicator-list {
    order: 1;
}

.p-galleria-indicators-left .p-galleria-indicator-list,
.p-galleria-indicators-right .p-galleria-indicator-list {
    flex-direction: column;
}

.p-galleria-inset-indicators .p-galleria-indicator-list {
    position: absolute;
    display: flex;
    z-index: 1;
    background: `).concat(n("galleria.inset.indicator.list.background"),`;
}

.p-galleria-inset-indicators .p-galleria-indicator-button {
    background: `).concat(n("galleria.inset.indicator.button.background"),`;
}

.p-galleria-inset-indicators .p-galleria-indicator-button:hover {
    background: `).concat(n("galleria.inset.indicator.button.hover.background"),`;
}

.p-galleria-inset-indicators .p-galleria-indicator-active .p-galleria-indicator-button {
    background: `).concat(n("galleria.inset.indicator.button.active.background"),`;
}

.p-galleria-inset-indicators.p-galleria-indicators-top .p-galleria-indicator-list {
    top: 0;
    left: 0;
    width: 100%;
    align-items: flex-start;
}

.p-galleria-inset-indicators.p-galleria-indicators-right .p-galleria-indicator-list {
    right: 0;
    top: 0;
    height: 100%;
    align-items: flex-end;
}

.p-galleria-inset-indicators.p-galleria-indicators-bottom .p-galleria-indicator-list {
    bottom: 0;
    left: 0;
    width: 100%;
    align-items: flex-end;
}

.p-galleria-inset-indicators.p-galleria-indicators-left .p-galleria-indicator-list {
    left: 0;
    top: 0;
    height: 100%;
    align-items: flex-start;
}

.p-galleria-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.p-galleria-close-button {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin: `).concat(n("galleria.close.button.gutter"),`;
    background: `).concat(n("galleria.close.button.background"),`;
    color: `).concat(n("galleria.close.button.color"),`;
    width: `).concat(n("galleria.close.button.size"),`;
    height: `).concat(n("galleria.close.button.size"),`;
    padding: 0;
    border: none;
    user-select: none;
    cursor: pointer;
    border-radius: `).concat(n("galleria.close.button.border.radius"),`;
    outline-color: transparent;
    transition: background `).concat(n("galleria.transition.duration"),", color ").concat(n("galleria.transition.duration"),", outline-color ").concat(n("galleria.transition.duration"),`;
}

.p-galleria-close-icon {
    font-size: `).concat(n("galleria.close.button.icon.size"),`;
    width: `).concat(n("galleria.close.button.icon.size"),`;
    height: `).concat(n("galleria.close.button.icon.size"),`;
}

.p-galleria-close-button:hover {
    background: `).concat(n("galleria.close.button.hover.background"),`;
    color: `).concat(n("galleria.close.button.hover.color"),`;
}

.p-galleria-close-button:focus-visible {
    box-shadow: `).concat(n("galleria.close.button.focus.ring.shadow"),`;
    outline: `).concat(n("galleria.close.button.focus.ring.width")," ").concat(n("galleria.close.button.focus.ring.style")," ").concat(n("galleria.close.button.focus.ring.color"),`;
    outline-offset: `).concat(n("galleria.close.button.focus.ring.offset"),`;
}

.p-galleria-mask .p-galleria-nav-button {
    position: fixed;
    top: 50%;
}

.p-galleria-enter-active {
    transition: all 150ms cubic-bezier(0, 0, 0.2, 1);
}

.p-galleria-leave-active {
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.p-galleria-enter-from,
.p-galleria-leave-to {
    opacity: 0;
    transform: scale(0.7);
}

.p-galleria-enter-active .p-galleria-nav-button {
    opacity: 0;
}

.p-items-hidden .p-galleria-thumbnail-item {
    visibility: hidden;
}

.p-items-hidden .p-galleria-thumbnail-item.p-galleria-thumbnail-item-active {
    visibility: visible;
}
`)},Nt={mask:"p-galleria-mask p-overlay-mask p-overlay-mask-enter",root:function(t){var n=t.instance,i=n.$attrs.showThumbnails&&n.getPositionClass("p-galleria-thumbnails",n.$attrs.thumbnailsPosition),o=n.$attrs.showIndicators&&n.getPositionClass("p-galleria-indicators",n.$attrs.indicatorsPosition);return["p-galleria p-component",{"p-galleria-fullscreen":n.$attrs.fullScreen,"p-galleria-inset-indicators":n.$attrs.showIndicatorsOnItem,"p-galleria-hover-navigators":n.$attrs.showItemNavigatorsOnHover&&!n.$attrs.fullScreen},i,o]},closeButton:"p-galleria-close-button",closeIcon:"p-galleria-close-icon",header:"p-galleria-header",content:"p-galleria-content",footer:"p-galleria-footer",itemsContainer:"p-galleria-items-container",items:"p-galleria-items",previousItemButton:function(t){var n=t.instance;return["p-galleria-prev-button p-galleria-nav-button",{"p-disabled":n.isNavBackwardDisabled()}]},previousItemIcon:"p-galleria-prev-icon",item:"p-galleria-item",nextItemButton:function(t){var n=t.instance;return["p-galleria-next-button p-galleria-nav-button",{"p-disabled":n.isNavForwardDisabled()}]},nextItemIcon:"p-galleria-next-icon",caption:"p-galleria-caption",indicatorList:"p-galleria-indicator-list",indicator:function(t){var n=t.instance,i=t.index;return["p-galleria-indicator",{"p-galleria-indicator-active":n.isIndicatorItemActive(i)}]},indicatorButton:"p-galleria-indicator-button",thumbnails:"p-galleria-thumbnails",thumbnailContent:"p-galleria-thumbnails-content",previousThumbnailButton:function(t){var n=t.instance;return["p-galleria-thumbnail-prev-button p-galleria-thumbnail-nav-button",{"p-disabled":n.isNavBackwardDisabled()}]},previousThumbnailIcon:"p-galleria-thumbnail-prev-icon",thumbnailsViewport:"p-galleria-thumbnails-viewport",thumbnailItems:"p-galleria-thumbnail-items",thumbnailItem:function(t){var n=t.instance,i=t.index,o=t.activeIndex;return["p-galleria-thumbnail-item",{"p-galleria-thumbnail-item-current":o===i,"p-galleria-thumbnail-item-active":n.isItemActive(i),"p-galleria-thumbnail-item-start":n.firstItemAciveIndex()===i,"p-galleria-thumbnail-item-end":n.lastItemActiveIndex()===i}]},thumbnail:"p-galleria-thumbnail",nextThumbnailButton:function(t){var n=t.instance;return["p-galleria-thumbnail-next-button  p-galleria-thumbnail-nav-button",{"p-disabled":n.isNavForwardDisabled()}]},nextThumbnailIcon:"p-galleria-thumbnail-next-icon"},jt=mt.extend({name:"galleria",theme:$t,classes:Nt}),Lt={name:"BaseGalleria",extends:D,props:{id:{type:String,default:null},value:{type:Array,default:null},activeIndex:{type:Number,default:0},fullScreen:{type:Boolean,default:!1},visible:{type:Boolean,default:!1},numVisible:{type:Number,default:3},responsiveOptions:{type:Array,default:null},showItemNavigators:{type:Boolean,default:!1},showThumbnailNavigators:{type:Boolean,default:!0},showItemNavigatorsOnHover:{type:Boolean,default:!1},changeItemOnIndicatorHover:{type:Boolean,default:!1},circular:{type:Boolean,default:!1},autoPlay:{type:Boolean,default:!1},transitionInterval:{type:Number,default:4e3},showThumbnails:{type:Boolean,default:!0},thumbnailsPosition:{type:String,default:"bottom"},verticalThumbnailViewPortHeight:{type:String,default:"300px"},showIndicators:{type:Boolean,default:!1},showIndicatorsOnItem:{type:Boolean,default:!1},indicatorsPosition:{type:String,default:"bottom"},baseZIndex:{type:Number,default:0},maskClass:{type:String,default:null},containerStyle:{type:null,default:null},containerClass:{type:null,default:null},containerProps:{type:null,default:null},prevButtonProps:{type:null,default:null},nextButtonProps:{type:null,default:null},ariaLabel:{type:String,default:null},ariaRoledescription:{type:String,default:null}},style:jt,provide:function(){return{$pcGalleria:this,$parentInstance:this}}};function O(e){return Kt(e)||Et(e)||Dt(e)||Ft()}function Ft(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Dt(e,t){if(e){if(typeof e=="string")return R(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?R(e,t):void 0}}function Et(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Kt(e){if(Array.isArray(e))return R(e)}function R(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,i=Array(t);n<t;n++)i[n]=e[n];return i}var ot={name:"GalleriaItem",hostName:"Galleria",extends:D,emits:["start-slideshow","stop-slideshow","update:activeIndex"],props:{circular:{type:Boolean,default:!1},activeIndex:{type:Number,default:0},value:{type:Array,default:null},showItemNavigators:{type:Boolean,default:!0},showIndicators:{type:Boolean,default:!0},slideShowActive:{type:Boolean,default:!0},changeItemOnIndicatorHover:{type:Boolean,default:!0},autoPlay:{type:Boolean,default:!1},templates:{type:null,default:null},id:{type:String,default:null}},mounted:function(){this.autoPlay&&this.$emit("start-slideshow")},methods:{getIndicatorPTOptions:function(t){return{context:{highlighted:this.activeIndex===t}}},next:function(){var t=this.activeIndex+1,n=this.circular&&this.value.length-1===this.activeIndex?0:t;this.$emit("update:activeIndex",n)},prev:function(){var t=this.activeIndex!==0?this.activeIndex-1:0,n=this.circular&&this.activeIndex===0?this.value.length-1:t;this.$emit("update:activeIndex",n)},stopSlideShow:function(){this.slideShowActive&&this.stopSlideShow&&this.$emit("stop-slideshow")},navBackward:function(t){this.stopSlideShow(),this.prev(),t&&t.cancelable&&t.preventDefault()},navForward:function(t){this.stopSlideShow(),this.next(),t&&t.cancelable&&t.preventDefault()},onIndicatorClick:function(t){this.stopSlideShow(),this.$emit("update:activeIndex",t)},onIndicatorMouseEnter:function(t){this.changeItemOnIndicatorHover&&(this.stopSlideShow(),this.$emit("update:activeIndex",t))},onIndicatorKeyDown:function(t,n){switch(t.code){case"Enter":case"NumpadEnter":case"Space":this.stopSlideShow(),this.$emit("update:activeIndex",n),t.preventDefault();break;case"ArrowRight":this.onRightKey();break;case"ArrowLeft":this.onLeftKey();break;case"Home":this.onHomeKey(),t.preventDefault();break;case"End":this.onEndKey(),t.preventDefault();break;case"Tab":this.onTabKey();break;case"ArrowDown":case"ArrowUp":case"PageUp":case"PageDown":t.preventDefault();break}},onRightKey:function(){var t=O(y(this.$refs.indicatorContent,'[data-pc-section="indicator"]')),n=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(n,n+1===t.length?t.length-1:n+1)},onLeftKey:function(){var t=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(t,t-1<=0?0:t-1)},onHomeKey:function(){var t=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(t,0)},onEndKey:function(){var t=O(y(this.$refs.indicatorContent,'[data-pc-section="indicator"]')),n=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(n,t.length-1)},onTabKey:function(){var t=O(y(this.$refs.indicatorContent,'[data-pc-section="indicator"]')),n=t.findIndex(function(a){return it(a,"data-p-active")===!0}),i=j(this.$refs.indicatorContent,'[data-pc-section="indicator"] > button[tabindex="0"]'),o=t.findIndex(function(a){return a===i.parentElement});t[o].children[0].tabIndex="-1",t[n].children[0].tabIndex="0"},findFocusedIndicatorIndex:function(){var t=O(y(this.$refs.indicatorContent,'[data-pc-section="indicator"]')),n=j(this.$refs.indicatorContent,'[data-pc-section="indicator"] > button[tabindex="0"]');return t.findIndex(function(i){return i===n.parentElement})},changedFocusedIndicator:function(t,n){var i=O(y(this.$refs.indicatorContent,'[data-pc-section="indicator"]'));i[t].children[0].tabIndex="-1",i[n].children[0].tabIndex="0",i[n].children[0].focus()},isIndicatorItemActive:function(t){return this.activeIndex===t},isNavBackwardDisabled:function(){return!this.circular&&this.activeIndex===0},isNavForwardDisabled:function(){return!this.circular&&this.activeIndex===this.value.length-1},ariaSlideNumber:function(t){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.slideNumber.replace(/{slideNumber}/g,t):void 0},ariaPageLabel:function(t){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.pageLabel.replace(/{page}/g,t):void 0}},computed:{activeItem:function(){return this.value[this.activeIndex]},ariaSlideLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.slide:void 0}},components:{ChevronLeftIcon:at,ChevronRightIcon:rt},directives:{ripple:M}},zt=["disabled"],Rt=["id","aria-label","aria-roledescription"],Ht=["disabled"],Mt=["aria-label","aria-selected","aria-controls","onClick","onMouseenter","onKeydown","data-p-active"],Ut=["tabindex"];function Gt(e,t,n,i,o,a){var f=F("ripple");return l(),d("div",u({class:e.cx("itemsContainer")},e.ptm("itemsContainer")),[r("div",u({class:e.cx("items")},e.ptm("items")),[n.showItemNavigators?_((l(),d("button",u({key:0,type:"button",class:e.cx("previousItemButton"),onClick:t[0]||(t[0]=function(c){return a.navBackward(c)}),disabled:a.isNavBackwardDisabled()},e.ptm("previousItemButton"),{"data-pc-group-section":"itemnavigator"}),[(l(),h(g(n.templates.previousitemicon||"ChevronLeftIcon"),u({class:e.cx("previousItemIcon")},e.ptm("previousItemIcon")),null,16,["class"]))],16,zt)),[[f]]):m("",!0),r("div",u({id:n.id+"_item_"+n.activeIndex,class:e.cx("item"),role:"group","aria-label":a.ariaSlideNumber(n.activeIndex+1),"aria-roledescription":a.ariaSlideLabel},e.ptm("item")),[n.templates.item?(l(),h(g(n.templates.item),{key:0,item:a.activeItem},null,8,["item"])):m("",!0)],16,Rt),n.showItemNavigators?_((l(),d("button",u({key:1,type:"button",class:e.cx("nextItemButton"),onClick:t[1]||(t[1]=function(c){return a.navForward(c)}),disabled:a.isNavForwardDisabled()},e.ptm("nextItemButton"),{"data-pc-group-section":"itemnavigator"}),[(l(),h(g(n.templates.nextitemicon||"ChevronRightIcon"),u({class:e.cx("nextItemIcon")},e.ptm("nextItemIcon")),null,16,["class"]))],16,Ht)),[[f]]):m("",!0),n.templates.caption?(l(),d("div",u({key:2,class:e.cx("caption")},e.ptm("caption")),[n.templates.caption?(l(),h(g(n.templates.caption),{key:0,item:a.activeItem},null,8,["item"])):m("",!0)],16)):m("",!0)],16),n.showIndicators?(l(),d("ul",u({key:0,ref:"indicatorContent",class:e.cx("indicatorList")},e.ptm("indicatorList")),[(l(!0),d(C,null,A(n.value,function(c,s){return l(),d("li",u({key:"p-galleria-indicator-".concat(s),class:e.cx("indicator",{index:s}),"aria-label":a.ariaPageLabel(s+1),"aria-selected":n.activeIndex===s,"aria-controls":n.id+"_item_"+s,onClick:function(w){return a.onIndicatorClick(s)},onMouseenter:function(w){return a.onIndicatorMouseEnter(s)},onKeydown:function(w){return a.onIndicatorKeyDown(w,s)},ref_for:!0},e.ptm("indicator",a.getIndicatorPTOptions(s)),{"data-p-active":a.isIndicatorItemActive(s)}),[n.templates.indicator?m("",!0):(l(),d("button",u({key:0,type:"button",tabindex:n.activeIndex===s?"0":"-1",class:e.cx("indicatorButton"),ref_for:!0},e.ptm("indicatorButton",a.getIndicatorPTOptions(s))),null,16,Ut)),n.templates.indicator?(l(),h(g(n.templates.indicator),{key:1,index:s},null,8,["index"])):m("",!0)],16,Mt)}),128))],16)):m("",!0)],16)}ot.render=Gt;function z(e){return Wt(e)||Jt(e)||Zt(e)||qt()}function qt(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Zt(e,t){if(e){if(typeof e=="string")return H(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?H(e,t):void 0}}function Jt(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Wt(e){if(Array.isArray(e))return H(e)}function H(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,i=Array(t);n<t;n++)i[n]=e[n];return i}var lt={name:"GalleriaThumbnails",hostName:"Galleria",extends:D,emits:["stop-slideshow","update:activeIndex"],props:{containerId:{type:String,default:null},value:{type:Array,default:null},numVisible:{type:Number,default:3},activeIndex:{type:Number,default:0},isVertical:{type:Boolean,default:!1},slideShowActive:{type:Boolean,default:!1},circular:{type:Boolean,default:!1},responsiveOptions:{type:Array,default:null},contentHeight:{type:String,default:"300px"},showThumbnailNavigators:{type:Boolean,default:!0},templates:{type:null,default:null},prevButtonProps:{type:null,default:null},nextButtonProps:{type:null,default:null}},startPos:null,thumbnailsStyle:null,sortedResponsiveOptions:null,data:function(){return{d_numVisible:this.numVisible,d_oldNumVisible:this.numVisible,d_activeIndex:this.activeIndex,d_oldActiveItemIndex:this.activeIndex,totalShiftedItems:0,page:0}},watch:{numVisible:function(t,n){this.d_numVisible=t,this.d_oldNumVisible=n},activeIndex:function(t,n){this.d_activeIndex=t,this.d_oldActiveItemIndex=n}},mounted:function(){this.createStyle(),this.calculatePosition(),this.responsiveOptions&&this.bindDocumentListeners()},updated:function(){var t=this.totalShiftedItems;(this.d_oldNumVisible!==this.d_numVisible||this.d_oldActiveItemIndex!==this.d_activeIndex)&&(this.d_activeIndex<=this.getMedianItemIndex()?t=0:this.value.length-this.d_numVisible+this.getMedianItemIndex()<this.d_activeIndex?t=this.d_numVisible-this.value.length:this.value.length-this.d_numVisible<this.d_activeIndex&&this.d_numVisible%2===0?t=this.d_activeIndex*-1+this.getMedianItemIndex()+1:t=this.d_activeIndex*-1+this.getMedianItemIndex(),t!==this.totalShiftedItems&&(this.totalShiftedItems=t),this.$refs.itemsContainer.style.transform=this.isVertical?"translate3d(0, ".concat(t*(100/this.d_numVisible),"%, 0)"):"translate3d(".concat(t*(100/this.d_numVisible),"%, 0, 0)"),this.d_oldActiveItemIndex!==this.d_activeIndex&&(document.body.setAttribute("data-p-items-hidden","false"),!this.isUnstyled&&J(this.$refs.itemsContainer,"p-items-hidden"),this.$refs.itemsContainer.style.transition="transform 500ms ease 0s"),this.d_oldActiveItemIndex=this.d_activeIndex,this.d_oldNumVisible=this.d_numVisible)},beforeUnmount:function(){this.responsiveOptions&&this.unbindDocumentListeners(),this.thumbnailsStyle&&this.thumbnailsStyle.parentNode.removeChild(this.thumbnailsStyle)},methods:{step:function(t){var n=this.totalShiftedItems+t;t<0&&-1*n+this.d_numVisible>this.value.length-1?n=this.d_numVisible-this.value.length:t>0&&n>0&&(n=0),this.circular&&(t<0&&this.value.length-1===this.d_activeIndex?n=0:t>0&&this.d_activeIndex===0&&(n=this.d_numVisible-this.value.length)),this.$refs.itemsContainer&&(document.body.setAttribute("data-p-items-hidden","false"),!this.isUnstyled&&J(this.$refs.itemsContainer,"p-items-hidden"),this.$refs.itemsContainer.style.transform=this.isVertical?"translate3d(0, ".concat(n*(100/this.d_numVisible),"%, 0)"):"translate3d(".concat(n*(100/this.d_numVisible),"%, 0, 0)"),this.$refs.itemsContainer.style.transition="transform 500ms ease 0s"),this.totalShiftedItems=n},stopSlideShow:function(){this.slideShowActive&&this.stopSlideShow&&this.$emit("stop-slideshow")},getMedianItemIndex:function(){var t=Math.floor(this.d_numVisible/2);return this.d_numVisible%2?t:t-1},navBackward:function(t){this.stopSlideShow();var n=this.d_activeIndex!==0?this.d_activeIndex-1:0,i=n+this.totalShiftedItems;this.d_numVisible-i-1>this.getMedianItemIndex()&&(-1*this.totalShiftedItems!==0||this.circular)&&this.step(1);var o=this.circular&&this.d_activeIndex===0?this.value.length-1:n;this.$emit("update:activeIndex",o),t.cancelable&&t.preventDefault()},navForward:function(t){this.stopSlideShow();var n=this.d_activeIndex===this.value.length-1?this.value.length-1:this.d_activeIndex+1;n+this.totalShiftedItems>this.getMedianItemIndex()&&(-1*this.totalShiftedItems<this.getTotalPageNumber()-1||this.circular)&&this.step(-1);var i=this.circular&&this.value.length-1===this.d_activeIndex?0:n;this.$emit("update:activeIndex",i),t.cancelable&&t.preventDefault()},onItemClick:function(t){this.stopSlideShow();var n=t;if(n!==this.d_activeIndex){var i=n+this.totalShiftedItems,o=0;n<this.d_activeIndex?(o=this.d_numVisible-i-1-this.getMedianItemIndex(),o>0&&-1*this.totalShiftedItems!==0&&this.step(o)):(o=this.getMedianItemIndex()-i,o<0&&-1*this.totalShiftedItems<this.getTotalPageNumber()-1&&this.step(o)),this.$emit("update:activeIndex",n)}},onThumbnailKeydown:function(t,n){switch((t.code==="Enter"||t.code==="NumpadEnter"||t.code==="Space")&&(this.onItemClick(n),t.preventDefault()),t.code){case"ArrowRight":this.onRightKey();break;case"ArrowLeft":this.onLeftKey();break;case"Home":this.onHomeKey(),t.preventDefault();break;case"End":this.onEndKey(),t.preventDefault();break;case"ArrowUp":case"ArrowDown":t.preventDefault();break;case"Tab":this.onTabKey();break}},onRightKey:function(){var t=y(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]'),n=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(n,n+1===t.length?t.length-1:n+1)},onLeftKey:function(){var t=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(t,t-1<=0?0:t-1)},onHomeKey:function(){var t=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(t,0)},onEndKey:function(){var t=y(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]'),n=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(n,t.length-1)},onTabKey:function(){var t=z(y(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]')),n=t.findIndex(function(a){return it(a,"data-p-active")===!0}),i=j(this.$refs.itemsContainer,'[tabindex="0"]'),o=t.findIndex(function(a){return a===i.parentElement});t[o].children[0].tabIndex="-1",t[n].children[0].tabIndex="0"},findFocusedIndicatorIndex:function(){var t=z(y(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]')),n=j(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"] > [tabindex="0"]');return t.findIndex(function(i){return i===n.parentElement})},changedFocusedIndicator:function(t,n){var i=y(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]');i[t].children[0].tabIndex="-1",i[n].children[0].tabIndex="0",i[n].children[0].focus()},onTransitionEnd:function(t){this.$refs.itemsContainer&&t.propertyName==="transform"&&(document.body.setAttribute("data-p-items-hidden","true"),!this.isUnstyled&&nt(this.$refs.itemsContainer,"p-items-hidden"),this.$refs.itemsContainer.style.transition="")},onTouchStart:function(t){var n=t.changedTouches[0];this.startPos={x:n.pageX,y:n.pageY}},onTouchMove:function(t){t.cancelable&&t.preventDefault()},onTouchEnd:function(t){var n=t.changedTouches[0];this.isVertical?this.changePageOnTouch(t,n.pageY-this.startPos.y):this.changePageOnTouch(t,n.pageX-this.startPos.x)},changePageOnTouch:function(t,n){n<0?this.navForward(t):this.navBackward(t)},getTotalPageNumber:function(){return this.value.length>this.d_numVisible?this.value.length-this.d_numVisible+1:0},createStyle:function(){if(!this.thumbnailsStyle){var t;this.thumbnailsStyle=document.createElement("style"),this.thumbnailsStyle.type="text/css",ft(this.thumbnailsStyle,"nonce",(t=this.$primevue)===null||t===void 0||(t=t.config)===null||t===void 0||(t=t.csp)===null||t===void 0?void 0:t.nonce),document.body.appendChild(this.thumbnailsStyle)}var n=`
                #`.concat(this.containerId,` [data-pc-section="thumbnailitem"] {
                    flex: 1 0 `).concat(100/this.d_numVisible,`%
                }
            `);if(this.responsiveOptions&&!this.isUnstyled){this.sortedResponsiveOptions=z(this.responsiveOptions);var i=bt();this.sortedResponsiveOptions.sort(function(f,c){var s=f.breakpoint,p=c.breakpoint;return vt(s,p,-1,i)});for(var o=0;o<this.sortedResponsiveOptions.length;o++){var a=this.sortedResponsiveOptions[o];n+=`
                        @media screen and (max-width: `.concat(a.breakpoint,`) {
                            #`).concat(this.containerId,` .p-galleria-thumbnail-item {
                                flex: 1 0 `).concat(100/a.numVisible,`%
                            }
                        }
                    `)}}this.thumbnailsStyle.innerHTML=n},calculatePosition:function(){if(this.$refs.itemsContainer&&this.sortedResponsiveOptions){for(var t=window.innerWidth,n={numVisible:this.numVisible},i=0;i<this.sortedResponsiveOptions.length;i++){var o=this.sortedResponsiveOptions[i];parseInt(o.breakpoint,10)>=t&&(n=o)}this.d_numVisible!==n.numVisible&&(this.d_numVisible=n.numVisible)}},bindDocumentListeners:function(){var t=this;this.documentResizeListener||(this.documentResizeListener=function(){t.calculatePosition()},window.addEventListener("resize",this.documentResizeListener))},unbindDocumentListeners:function(){this.documentResizeListener&&(window.removeEventListener("resize",this.documentResizeListener),this.documentResizeListener=null)},isNavBackwardDisabled:function(){return!this.circular&&this.d_activeIndex===0||this.value.length<=this.d_numVisible},isNavForwardDisabled:function(){return!this.circular&&this.d_activeIndex===this.value.length-1||this.value.length<=this.d_numVisible},firstItemAciveIndex:function(){return this.totalShiftedItems*-1},lastItemActiveIndex:function(){return this.firstItemAciveIndex()+this.d_numVisible-1},isItemActive:function(t){return this.firstItemAciveIndex()<=t&&this.lastItemActiveIndex()>=t},ariaPageLabel:function(t){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.pageLabel.replace(/{page}/g,t):void 0}},computed:{ariaPrevButtonLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.prevPageLabel:void 0},ariaNextButtonLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.nextPageLabel:void 0}},components:{ChevronLeftIcon:at,ChevronRightIcon:rt,ChevronUpIcon:kt,ChevronDownIcon:St},directives:{ripple:M}};function T(e){"@babel/helpers - typeof";return T=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},T(e)}function X(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,i)}return n}function N(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?X(Object(n),!0).forEach(function(i){Xt(e,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):X(Object(n)).forEach(function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(n,i))})}return e}function Xt(e,t,n){return(t=Yt(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Yt(e){var t=Qt(e,"string");return T(t)=="symbol"?t:t+""}function Qt(e,t){if(T(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var i=n.call(e,t||"default");if(T(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var te=["disabled","aria-label"],ee=["data-p-active","aria-selected","aria-controls","onKeydown","data-p-galleria-thumbnail-item-current","data-p-galleria-thumbnail-item-active","data-p-galleria-thumbnail-item-start","data-p-galleria-thumbnail-item-end"],ne=["tabindex","aria-label","aria-current","onClick"],ie=["disabled","aria-label"];function ae(e,t,n,i,o,a){var f=F("ripple");return l(),d("div",u({class:e.cx("thumbnails")},e.ptm("thumbnails")),[r("div",u({class:e.cx("thumbnailContent")},e.ptm("thumbnailContent")),[n.showThumbnailNavigators?_((l(),d("button",u({key:0,class:e.cx("previousThumbnailButton"),disabled:a.isNavBackwardDisabled(),type:"button","aria-label":a.ariaPrevButtonLabel,onClick:t[0]||(t[0]=function(c){return a.navBackward(c)})},N(N({},n.prevButtonProps),e.ptm("previousThumbnailButton")),{"data-pc-group-section":"thumbnailnavigator"}),[(l(),h(g(n.templates.previousthumbnailicon||(n.isVertical?"ChevronUpIcon":"ChevronLeftIcon")),u({class:e.cx("previousThumbnailIcon")},e.ptm("previousThumbnailIcon")),null,16,["class"]))],16,te)),[[f]]):m("",!0),r("div",u({class:e.cx("thumbnailsViewport"),style:{height:n.isVertical?n.contentHeight:""}},e.ptm("thumbnailsViewport")),[r("div",u({ref:"itemsContainer",class:e.cx("thumbnailItems"),role:"tablist",onTransitionend:t[1]||(t[1]=function(c){return a.onTransitionEnd(c)}),onTouchstart:t[2]||(t[2]=function(c){return a.onTouchStart(c)}),onTouchmove:t[3]||(t[3]=function(c){return a.onTouchMove(c)}),onTouchend:t[4]||(t[4]=function(c){return a.onTouchEnd(c)})},e.ptm("thumbnailItems")),[(l(!0),d(C,null,A(n.value,function(c,s){return l(),d("div",u({key:"p-galleria-thumbnail-item-".concat(s),class:e.cx("thumbnailItem",{index:s,activeIndex:n.activeIndex}),role:"tab","data-p-active":n.activeIndex===s,"aria-selected":n.activeIndex===s,"aria-controls":n.containerId+"_item_"+s,onKeydown:function(w){return a.onThumbnailKeydown(w,s)},ref_for:!0},e.ptm("thumbnailItem"),{"data-p-galleria-thumbnail-item-current":n.activeIndex===s,"data-p-galleria-thumbnail-item-active":a.isItemActive(s),"data-p-galleria-thumbnail-item-start":a.firstItemAciveIndex()===s,"data-p-galleria-thumbnail-item-end":a.lastItemActiveIndex()===s}),[r("div",u({class:e.cx("thumbnail"),tabindex:n.activeIndex===s?"0":"-1","aria-label":a.ariaPageLabel(s+1),"aria-current":n.activeIndex===s?"page":void 0,onClick:function(w){return a.onItemClick(s)},ref_for:!0},e.ptm("thumbnail")),[n.templates.thumbnail?(l(),h(g(n.templates.thumbnail),{key:0,item:c},null,8,["item"])):m("",!0)],16,ne)],16,ee)}),128))],16)],16),n.showThumbnailNavigators?_((l(),d("button",u({key:1,class:e.cx("nextThumbnailButton"),disabled:a.isNavForwardDisabled(),type:"button","aria-label":a.ariaNextButtonLabel,onClick:t[5]||(t[5]=function(c){return a.navForward(c)})},N(N({},n.nextButtonProps),e.ptm("nextThumbnailButton")),{"data-pc-group-section":"thumbnailnavigator"}),[(l(),h(g(n.templates.nextthumbnailicon||(n.isVertical?"ChevronDownIcon":"ChevronRightIcon")),u({class:e.cx("nextThumbnailIcon")},e.ptm("nextThumbnailIcon")),null,16,["class"]))],16,ie)),[[f]]):m("",!0)],16)],16)}lt.render=ae;function B(e){"@babel/helpers - typeof";return B=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},B(e)}function Y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,i)}return n}function Q(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Y(Object(n),!0).forEach(function(i){re(e,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Y(Object(n)).forEach(function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(n,i))})}return e}function re(e,t,n){return(t=oe(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function oe(e){var t=le(e,"string");return B(t)=="symbol"?t:t+""}function le(e,t){if(B(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var i=n.call(e,t||"default");if(B(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var st={name:"GalleriaContent",hostName:"Galleria",extends:D,inheritAttrs:!1,interval:null,emits:["activeitem-change","mask-hide"],data:function(){return{id:this.$attrs.id||K(),activeIndex:this.$attrs.activeIndex,numVisible:this.$attrs.numVisible,slideShowActive:!1}},watch:{"$attrs.id":function(t){this.id=t||K()},"$attrs.value":function(t){t&&t.length<this.numVisible&&(this.numVisible=t.length)},"$attrs.activeIndex":function(t){this.activeIndex=t},"$attrs.numVisible":function(t){this.numVisible=t},"$attrs.autoPlay":function(t){t?this.startSlideShow():this.stopSlideShow()}},mounted:function(){this.id=this.id||K()},updated:function(){this.$emit("activeitem-change",this.activeIndex)},beforeUnmount:function(){this.slideShowActive&&this.stopSlideShow()},methods:{getPTOptions:function(t){return this.ptm(t,{props:Q(Q({},this.$attrs),{},{pt:this.pt,unstyled:this.unstyled})})},isAutoPlayActive:function(){return this.slideShowActive},startSlideShow:function(){var t=this;this.interval=setInterval(function(){var n=t.$attrs.circular&&t.$attrs.value.length-1===t.activeIndex?0:t.activeIndex+1;t.activeIndex=n},this.$attrs.transitionInterval),this.slideShowActive=!0},stopSlideShow:function(){this.interval&&clearInterval(this.interval),this.slideShowActive=!1},getPositionClass:function(t,n){var i=["top","left","bottom","right"],o=i.find(function(a){return a===n});return o?"".concat(t,"-").concat(o):""},isVertical:function(){return this.$attrs.thumbnailsPosition==="left"||this.$attrs.thumbnailsPosition==="right"}},computed:{closeAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.close:void 0}},components:{GalleriaItem:ot,GalleriaThumbnails:lt,TimesIcon:xt},directives:{ripple:M}};function V(e){"@babel/helpers - typeof";return V=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},V(e)}function tt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,i)}return n}function et(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?tt(Object(n),!0).forEach(function(i){se(e,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):tt(Object(n)).forEach(function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(n,i))})}return e}function se(e,t,n){return(t=ce(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ce(e){var t=ue(e,"string");return V(t)=="symbol"?t:t+""}function ue(e,t){if(V(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var i=n.call(e,t||"default");if(V(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var de=["id","aria-label","aria-roledescription"],he=["aria-label"],me=["aria-live"];function pe(e,t,n,i,o,a){var f=L("GalleriaItem"),c=L("GalleriaThumbnails"),s=F("ripple");return e.$attrs.value&&e.$attrs.value.length>0?(l(),d("div",u({key:0,id:o.id,role:"region",class:[e.cx("root"),e.$attrs.containerClass],style:e.$attrs.containerStyle,"aria-label":e.$attrs.ariaLabel,"aria-roledescription":e.$attrs.ariaRoledescription},et(et({},e.$attrs.containerProps),a.getPTOptions("root"))),[e.$attrs.fullScreen?_((l(),d("button",u({key:0,autofocus:"",type:"button",class:e.cx("closeButton"),"aria-label":a.closeAriaLabel,onClick:t[0]||(t[0]=function(p){return e.$emit("mask-hide")})},a.getPTOptions("closeButton")),[(l(),h(g(e.$attrs.templates.closeicon||"TimesIcon"),u({class:e.cx("closeIcon")},a.getPTOptions("closeIcon")),null,16,["class"]))],16,he)),[[s]]):m("",!0),e.$attrs.templates&&e.$attrs.templates.header?(l(),d("div",u({key:1,class:e.cx("header")},a.getPTOptions("header")),[(l(),h(g(e.$attrs.templates.header)))],16)):m("",!0),r("div",u({class:e.cx("content"),"aria-live":e.$attrs.autoPlay?"polite":"off"},a.getPTOptions("content")),[S(f,{id:o.id,activeIndex:o.activeIndex,"onUpdate:activeIndex":t[1]||(t[1]=function(p){return o.activeIndex=p}),slideShowActive:o.slideShowActive,"onUpdate:slideShowActive":t[2]||(t[2]=function(p){return o.slideShowActive=p}),value:e.$attrs.value,circular:e.$attrs.circular,templates:e.$attrs.templates,showIndicators:e.$attrs.showIndicators,changeItemOnIndicatorHover:e.$attrs.changeItemOnIndicatorHover,showItemNavigators:e.$attrs.showItemNavigators,autoPlay:e.$attrs.autoPlay,onStartSlideshow:a.startSlideShow,onStopSlideshow:a.stopSlideShow,pt:e.pt,unstyled:e.unstyled},null,8,["id","activeIndex","slideShowActive","value","circular","templates","showIndicators","changeItemOnIndicatorHover","showItemNavigators","autoPlay","onStartSlideshow","onStopSlideshow","pt","unstyled"]),e.$attrs.showThumbnails?(l(),h(c,{key:0,activeIndex:o.activeIndex,"onUpdate:activeIndex":t[3]||(t[3]=function(p){return o.activeIndex=p}),slideShowActive:o.slideShowActive,"onUpdate:slideShowActive":t[4]||(t[4]=function(p){return o.slideShowActive=p}),containerId:o.id,value:e.$attrs.value,templates:e.$attrs.templates,numVisible:o.numVisible,responsiveOptions:e.$attrs.responsiveOptions,circular:e.$attrs.circular,isVertical:a.isVertical(),contentHeight:e.$attrs.verticalThumbnailViewPortHeight,showThumbnailNavigators:e.$attrs.showThumbnailNavigators,prevButtonProps:e.$attrs.prevButtonProps,nextButtonProps:e.$attrs.nextButtonProps,onStopSlideshow:a.stopSlideShow,pt:e.pt,unstyled:e.unstyled},null,8,["activeIndex","slideShowActive","containerId","value","templates","numVisible","responsiveOptions","circular","isVertical","contentHeight","showThumbnailNavigators","prevButtonProps","nextButtonProps","onStopSlideshow","pt","unstyled"])):m("",!0)],16,me),e.$attrs.templates&&e.$attrs.templates.footer?(l(),d("div",u({key:2,class:e.cx("footer")},a.getPTOptions("footer")),[(l(),h(g(e.$attrs.templates.footer)))],16)):m("",!0)],16,de)):m("",!0)}st.render=pe;var ct={name:"Galleria",extends:Lt,inheritAttrs:!1,emits:["update:activeIndex","update:visible"],container:null,mask:null,data:function(){return{containerVisible:this.visible}},updated:function(){this.fullScreen&&this.visible&&(this.containerVisible=this.visible)},beforeUnmount:function(){this.fullScreen&&Z(),this.mask=null,this.container&&(E.clear(this.container),this.container=null)},methods:{onBeforeEnter:function(t){E.set("modal",t,this.baseZIndex||this.$primevue.config.zIndex.modal)},onEnter:function(t){this.mask.style.zIndex=String(parseInt(t.style.zIndex,10)-1),pt(),this.focus()},onBeforeLeave:function(){!this.isUnstyled&&nt(this.mask,"p-overlay-mask-leave")},onAfterLeave:function(t){E.clear(t),this.containerVisible=!1,Z()},onActiveItemChange:function(t){this.activeIndex!==t&&this.$emit("update:activeIndex",t)},maskHide:function(){this.$emit("update:visible",!1)},containerRef:function(t){this.container=t},maskRef:function(t){this.mask=t},focus:function(){var t=this.container.$el.querySelector("[autofocus]");t&&t.focus()}},components:{GalleriaContent:st,Portal:wt},directives:{focustrap:It}},fe=["aria-modal"];function be(e,t,n,i,o,a){var f=L("GalleriaContent"),c=L("Portal"),s=F("focustrap");return e.fullScreen?(l(),h(c,{key:0},{default:I(function(){return[o.containerVisible?(l(),d("div",u({key:0,ref:a.maskRef,class:[e.cx("mask"),e.maskClass],role:"dialog","aria-modal":e.fullScreen?"true":void 0},e.ptm("mask")),[S(gt,u({name:"p-galleria",onBeforeEnter:a.onBeforeEnter,onEnter:a.onEnter,onBeforeLeave:a.onBeforeLeave,onAfterLeave:a.onAfterLeave,appear:""},e.ptm("transition")),{default:I(function(){return[e.visible?_((l(),h(f,u({key:0,ref:a.containerRef,onMaskHide:a.maskHide,templates:e.$slots,onActiveitemChange:a.onActiveItemChange,pt:e.pt,unstyled:e.unstyled},e.$props),null,16,["onMaskHide","templates","onActiveitemChange","pt","unstyled"])),[[s]]):m("",!0)]}),_:1},16,["onBeforeEnter","onEnter","onBeforeLeave","onAfterLeave"])],16,fe)):m("",!0)]}),_:1})):(l(),h(f,u({key:1,templates:e.$slots,onActiveitemChange:a.onActiveItemChange,pt:e.pt,unstyled:e.unstyled},e.$props),null,16,["templates","onActiveitemChange","pt","unstyled"]))}ct.render=be;const ve=r("div",{class:"absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"},null,-1),ge={class:"mx-4 md:mx-10"},ye={class:"w-full md:p-10"},Ie={class:"lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8"},we={class:"w-full shadow-2xl"},xe=["src","alt"],Se={class:"grid gap-4 justify-center"},ke=["src"],Pe={class:"flex items-stretch bg-gray-500 text-white h-10"},Ce=r("i",{class:"pi pi-th-large"},null,-1),Ae=[Ce],_e={class:"mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0"},Oe={class:"text-5xl font-bold tracking-tight text-gray-900"},Te={class:"mt-3"},Be=r("h2",{class:"sr-only"},"Product information",-1),Ve={class:"text-3xl tracking-tight text-gray-900"},$e={class:"mt-3"},Ne=r("h3",{class:"sr-only"},"Reviews",-1),je={class:"flex items-center"},Le={class:"flex items-center"},Fe={class:"sr-only"},De={class:"mt-6"},Ee=r("h3",{class:"sr-only"},"Description",-1),Ke=["innerHTML"],ze={class:"mt-6"},Re={class:"flex space-x-2"},He={class:"mt-10 flex"},Me=r("button",{type:"submit",class:"flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"},"Reservar",-1),Ue={type:"button",class:"ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"},Ge=r("span",{class:"sr-only"},"Add to favorites",-1),qe={"aria-labelledby":"details-heading",class:"mt-12"},Ze=r("h2",{id:"details-heading",class:"sr-only"},"Additional details",-1),Je={class:"divide-y divide-gray-200 border-t"},We={class:"ml-6 flex items-center"},Xe={role:"list"},dn={__name:"Show",props:{service:Object},setup(e){const t=e,n=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}),i={name:t.service.title,price:n.format(t.service.price),rating:4,images:["/images/productos/baru-1.webp","/images/productos/baru-2.webp","/images/productos/baru-3.webp","/images/productos/baru-1.webp","/images/productos/baru-2.webp","/images/productos/baru-3.webp","/images/productos/baru-1.webp","/images/productos/baru-2.webp","/images/productos/baru-3.webp"],features:t.service.features,description:t.service.description,details:[{name:"Incluidos",items:JSON.parse(t.service.includes)},{name:"No Incluidos",items:JSON.parse(t.service.notIncludes)}]},o=k([{breakpoint:"1300px",numVisible:4},{breakpoint:"575px",numVisible:1}]),a=k();k(),k(0);const f=k(!1),c=k(!1),s=()=>{f.value=!f.value},p=()=>{c.value?ut():w()},w=()=>{let v=a.value.$el;v.requestFullscreen?v.requestFullscreen():v.mozRequestFullScreen?v.mozRequestFullScreen():v.webkitRequestFullscreen?v.webkitRequestFullscreen():v.msRequestFullscreen&&v.msRequestFullscreen()},ut=()=>{document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.msExitFullscreen&&document.msExitFullscreen()},dt=yt(()=>`pi ${c.value?"pi-window-minimize":"pi-window-maximize"}`);return(v,U)=>{const ht=ct;return l(),h(Pt,null,{default:I(()=>[ve,r("div",ge,[r("div",ye,[r("div",Ie,[r("div",we,[S(ht,{ref_key:"galleria",ref:a,value:i.images,numVisible:5,showThumbnails:f.value,showItemNavigators:!0,showItemNavigatorsOnHover:!0,circular:!0,autoPlay:!0,transitionInterval:2e3,responsiveOptions:o.value,pt:{root:{class:[{"flex flex-col":c.value}]},content:{class:["relative",{"flex-1 justify-center":c.value}]},thumbnails:"absolute w-full left-0 bottom-0"}},{item:I(b=>[r("img",{src:b.item,alt:b.item.alt,style:W([{width:c.value?"":"100%",display:c.value?"":"block"}])},null,12,xe)]),thumbnail:I(b=>[r("div",Se,[r("img",{src:b.item,alt:"images",style:{display:"block"}},null,8,ke)])]),footer:I(()=>[r("div",Pe,[r("button",{type:"button",onClick:s,class:"bg-transparent border-none rounded-none hover:bg-white/10 text-white inline-flex justify-center items-center cursor-pointer px-3"},Ae),r("button",{type:"button",onClick:U[0]||(U[0]=(...b)=>v.toggleAutoSlide&&v.toggleAutoSlide(...b)),class:"bg-transparent border-none rounded-none hover:bg-white/10 text-white inline-flex justify-center items-center cursor-pointer px-3"},[r("i",{class:$(v.slideButtonIcon)},null,2)]),r("button",{type:"button",onClick:p,class:"bg-transparent border-none rounded-none hover:bg-white/10 text-white inline-flex justify-center items-center cursor-pointer px-3 ml-auto"},[r("i",{class:$(dt.value)},null,2)])])]),_:1},8,["value","showThumbnails","responsiveOptions","pt"])]),r("div",_e,[r("h1",Oe,P(i.name),1),r("div",Te,[Be,r("p",Ve,P(i.price),1)]),r("div",$e,[Ne,r("div",je,[r("div",Le,[(l(),d(C,null,A([0,1,2,3,4],b=>S(x(Ot),{key:b,class:$([i.rating>b?"text-indigo-500":"text-gray-300","h-5 w-5 flex-shrink-0"]),"aria-hidden":"true"},null,8,["class"])),64))]),r("p",Fe,P(i.rating)+" out of 5 stars",1)])]),r("div",De,[Ee,r("div",{class:"space-y-6 text-base text-gray-700",innerHTML:i.description},null,8,Ke)]),r("form",ze,[r("div",Re,[(l(!0),d(C,null,A(i.features,b=>(l(),d("div",{class:"py-1 px-2 text-xs font-bold text-white rounded-xl",style:W(`background-color: #${b.color};`)},P(b.name),5))),256))]),r("div",He,[Me,r("button",Ue,[S(x(Tt),{class:"h-6 w-6 flex-shrink-0","aria-hidden":"true"}),Ge])])]),r("section",qe,[Ze,r("div",Je,[(l(!0),d(C,null,A(i.details,b=>(l(),h(x(Ct),{as:"div",key:b.name},{default:I(({open:G})=>[r("h3",null,[S(x(At),{class:"group relative flex w-full items-center justify-between py-6 text-left"},{default:I(()=>[r("span",{class:$([G?"text-indigo-600":"text-gray-900","text-sm font-medium"])},P(b.name),3),r("span",We,[G?(l(),h(x(Bt),{key:1,class:"block h-6 w-6 text-indigo-400 group-hover:text-indigo-500","aria-hidden":"true"})):(l(),h(x(Vt),{key:0,class:"block h-6 w-6 text-gray-400 group-hover:text-gray-500","aria-hidden":"true"}))])]),_:2},1024)]),S(x(_t),{as:"div",class:"prose prose-sm pb-6"},{default:I(()=>[r("ul",Xe,[(l(!0),d(C,null,A(b.items,q=>(l(),d("li",{key:q},P(q),1))),128))])]),_:2},1024)]),_:2},1024))),128))])])])])])])]),_:1})}}};export{dn as default};
