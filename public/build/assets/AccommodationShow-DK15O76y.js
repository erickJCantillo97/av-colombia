import{J as Tt,a8 as tt,$ as $t,a9 as yt,aZ as Vt,bf as jt,bg as Et,b5 as L,ay as q,ag as It,ah as ut,aa as Y,f as c,o as l,a as i,g as p,E,M as b,c as w,N as C,F as D,j as V,e as M,b as B,w as j,ab as xt,d as S,A as $,B as K,a0 as _t,p as Kt,h as O,S as Ft,t as f,U as Mt,i as et,n as Rt}from"./app-nM7IgwiO.js";import{F as Ht}from"./index-B_8i-d5l.js";import{s as zt}from"./index-kU80C0xy.js";import{u as ct,b as Gt}from"./index-CMSGMWI4.js";import{s as X}from"./index-B2zbfQ3I.js";import{s as Ut}from"./index-D9r2NKeU.js";import{R as ot}from"./index-fLvorgGC.js";import{s as wt}from"./index-KQ4C2z0x.js";import{s as St}from"./index-C1jU5W3Z.js";import{s as Wt}from"./index-Bu0RjH8L.js";import{s as qt}from"./index-DXKsatbI.js";import{s as I}from"./searchStore-Dic7r284.js";import{H as Yt}from"./GuestLayout.vue_vue_type_style_index_0_scoped_373cbc76_lang-CG4UBzwW.js";import{_ as Xt}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{s as mt}from"./index-CTUFSvLS.js";import{S as ht}from"./sweetalert2.esm.all-Y6IUEg8t.js";import"./index-CxjB5XKf.js";import"./useCommonUtilities-BgDhORlD.js";import"./index-DbG6-ht9.js";import"./index-AkgCs6W0.js";import"./index-BGx4CqZm.js";import"./index-C9zaHMZJ.js";import"./index-BrtrGxT7.js";import"./logo-MQ7lr2I0.js";import"./index-BPe4vmSG.js";var Zt=`
    .p-galleria {
        overflow: hidden;
        border-style: solid;
        border-width: dt('galleria.border.width');
        border-color: dt('galleria.border.color');
        border-radius: dt('galleria.border.radius');
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
        position: absolute !important;
        top: 50%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        background: dt('galleria.nav.button.background');
        color: dt('galleria.nav.button.color');
        width: dt('galleria.nav.button.size');
        height: dt('galleria.nav.button.size');
        transition:
            background dt('galleria.transition.duration'),
            color dt('galleria.transition.duration'),
            outline-color dt('galleria.transition.duration'),
            box-shadow dt('galleria.transition.duration');
        margin: calc(-1 * calc(dt('galleria.nav.button.size')) / 2) dt('galleria.nav.button.gutter') 0 dt('galleria.nav.button.gutter');
        padding: 0;
        user-select: none;
        border: 0 none;
        cursor: pointer;
        outline-color: transparent;
    }

    .p-galleria-nav-button:not(.p-disabled):hover {
        background: dt('galleria.nav.button.hover.background');
        color: dt('galleria.nav.button.hover.color');
    }

    .p-galleria-nav-button:not(.p-disabled):focus-visible {
        box-shadow: dt('galleria.nav.button.focus.ring.shadow');
        outline: dt('galleria.nav.button.focus.ring.width') dt('galleria.nav.button.focus.ring.style') dt('galleria.nav.button.focus.ring.color');
        outline-offset: dt('galleria.nav.button.focus.ring.offset');
    }

    .p-galleria-next-icon,
    .p-galleria-prev-icon {
        font-size: dt('galleria.nav.icon.size');
        width: dt('galleria.nav.icon.size');
        height: dt('galleria.nav.icon.size');
    }

    .p-galleria-prev-button {
        border-radius: dt('galleria.nav.button.prev.border.radius');
        left: 0;
    }

    .p-galleria-next-button {
        border-radius: dt('galleria.nav.button.next.border.radius');
        right: 0;
    }

    .p-galleria-prev-button:dir(rtl) {
        left: auto;
        right: 0;
        transform: rotate(180deg);
    }

    .p-galleria-next-button:dir(rtl) {
        right: auto;
        left: 0;
        transform: rotate(180deg);
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
        transition: opacity dt('galleria.transition.duration') ease-in-out;
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
        background: dt('galleria.caption.background');
        color: dt('galleria.caption.color');
        padding: dt('galleria.caption.padding');
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
        margin: 0 dt('galleria.thumbnail.nav.button.gutter');
        padding: 0;
        border: none;
        user-select: none;
        cursor: pointer;
        background: transparent;
        color: dt('galleria.thumbnail.nav.button.color');
        width: dt('galleria.thumbnail.nav.button.size');
        height: dt('galleria.thumbnail.nav.button.size');
        transition:
            background dt('galleria.transition.duration'),
            color dt('galleria.transition.duration'),
            outline-color dt('galleria.transition.duration');
        outline-color: transparent;
        border-radius: dt('galleria.thumbnail.nav.button.border.radius');
    }

    .p-galleria-thumbnail-nav-button:hover {
        background: dt('galleria.thumbnail.nav.button.hover.background');
        color: dt('galleria.thumbnail.nav.button.hover.color');
    }

    .p-galleria-thumbnail-nav-button:focus-visible {
        box-shadow: dt('galleria.thumbnail.nav.button.focus.ring.shadow');
        outline: dt('galleria.thumbnail.nav.button.focus.ring.width') dt('galleria.thumbnail.nav.button.focus.ring.style') dt('galleria.thumbnail.nav.button.focus.ring.color');
        outline-offset: dt('galleria.thumbnail.nav.button.focus.ring.offset');
    }

    .p-galleria-thumbnail-nav-button .p-galleria-thumbnail-next-icon,
    .p-galleria-thumbnail-nav-button .p-galleria-thumbnail-prev-icon {
        font-size: dt('galleria.thumbnail.nav.button.icon.size');
        width: dt('galleria.thumbnail.nav.button.icon.size');
        height: dt('galleria.thumbnail.nav.button.icon.size');
    }

    .p-galleria-thumbnails-content {
        display: flex;
        flex-direction: row;
        background: dt('galleria.thumbnails.content.background');
        padding: dt('galleria.thumbnails.content.padding');
    }

    .p-galleria-thumbnails-viewport {
        overflow: hidden;
        width: 100%;
    }

    .p-galleria:not(.p-galleria-thumbnails-right):not(.p-galleria-thumbnails-left) .p-galleria-thumbnail-prev-button:dir(rtl),
    .p-galleria:not(.p-galleria-thumbnails-right):not(.p-galleria-thumbnails-left) .p-galleria-thumbnail-next-button:dir(rtl) {
        transform: rotate(180deg);
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
        padding: dt('galleria.indicator.list.padding');
        gap: dt('galleria.indicator.list.gap');
        margin: 0;
        list-style: none;
    }

    .p-galleria-indicator-button {
        display: inline-flex;
        align-items: center;
        background: dt('galleria.indicator.button.background');
        width: dt('galleria.indicator.button.width');
        height: dt('galleria.indicator.button.height');
        transition:
            background dt('galleria.transition.duration'),
            color dt('galleria.transition.duration'),
            outline-color dt('galleria.transition.duration'),
            box-shadow dt('galleria.transition.duration');
        outline-color: transparent;
        border-radius: dt('galleria.indicator.button.border.radius');
        margin: 0;
        padding: 0;
        border: none;
        user-select: none;
        cursor: pointer;
    }

    .p-galleria-indicator-button:hover {
        background: dt('galleria.indicator.button.hover.background');
    }

    .p-galleria-indicator-button:focus-visible {
        box-shadow: dt('galleria.indicator.button.focus.ring.shadow');
        outline: dt('galleria.indicator.button.focus.ring.width') dt('galleria.indicator.button.focus.ring.style') dt('galleria.indicator.button.focus.ring.color');
        outline-offset: dt('galleria.indicator.button.focus.ring.offset');
    }

    .p-galleria-indicator-active .p-galleria-indicator-button {
        background: dt('galleria.indicator.button.active.background');
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
        background: dt('galleria.inset.indicator.list.background');
    }

    .p-galleria-inset-indicators .p-galleria-indicator-button {
        background: dt('galleria.inset.indicator.button.background');
    }

    .p-galleria-inset-indicators .p-galleria-indicator-button:hover {
        background: dt('galleria.inset.indicator.button.hover.background');
    }

    .p-galleria-inset-indicators .p-galleria-indicator-active .p-galleria-indicator-button {
        background: dt('galleria.inset.indicator.button.active.background');
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
        position: absolute !important;
        top: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        margin: dt('galleria.close.button.gutter');
        background: dt('galleria.close.button.background');
        color: dt('galleria.close.button.color');
        width: dt('galleria.close.button.size');
        height: dt('galleria.close.button.size');
        padding: 0;
        border: none;
        user-select: none;
        cursor: pointer;
        border-radius: dt('galleria.close.button.border.radius');
        outline-color: transparent;
        transition:
            background dt('galleria.transition.duration'),
            color dt('galleria.transition.duration'),
            outline-color dt('galleria.transition.duration');
    }

    .p-galleria-close-icon {
        font-size: dt('galleria.close.button.icon.size');
        width: dt('galleria.close.button.icon.size');
        height: dt('galleria.close.button.icon.size');
    }

    .p-galleria-close-button:hover {
        background: dt('galleria.close.button.hover.background');
        color: dt('galleria.close.button.hover.color');
    }

    .p-galleria-close-button:focus-visible {
        box-shadow: dt('galleria.close.button.focus.ring.shadow');
        outline: dt('galleria.close.button.focus.ring.width') dt('galleria.close.button.focus.ring.style') dt('galleria.close.button.focus.ring.color');
        outline-offset: dt('galleria.close.button.focus.ring.offset');
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
`,Jt={mask:"p-galleria-mask p-overlay-mask p-overlay-mask-enter",root:function(e){var n=e.instance,o=n.$attrs.showThumbnails&&n.getPositionClass("p-galleria-thumbnails",n.$attrs.thumbnailsPosition),s=n.$attrs.showIndicators&&n.getPositionClass("p-galleria-indicators",n.$attrs.indicatorsPosition);return["p-galleria p-component",{"p-galleria-fullscreen":n.$attrs.fullScreen,"p-galleria-inset-indicators":n.$attrs.showIndicatorsOnItem,"p-galleria-hover-navigators":n.$attrs.showItemNavigatorsOnHover&&!n.$attrs.fullScreen},o,s]},closeButton:"p-galleria-close-button",closeIcon:"p-galleria-close-icon",header:"p-galleria-header",content:"p-galleria-content",footer:"p-galleria-footer",itemsContainer:"p-galleria-items-container",items:"p-galleria-items",prevButton:function(e){var n=e.instance;return["p-galleria-prev-button p-galleria-nav-button",{"p-disabled":n.isNavBackwardDisabled}]},prevIcon:"p-galleria-prev-icon",item:"p-galleria-item",nextButton:function(e){var n=e.instance;return["p-galleria-next-button p-galleria-nav-button",{"p-disabled":n.isNavForwardDisabled}]},nextIcon:"p-galleria-next-icon",caption:"p-galleria-caption",indicatorList:"p-galleria-indicator-list",indicator:function(e){var n=e.instance,o=e.index;return["p-galleria-indicator",{"p-galleria-indicator-active":n.isIndicatorItemActive(o)}]},indicatorButton:"p-galleria-indicator-button",thumbnails:"p-galleria-thumbnails",thumbnailContent:"p-galleria-thumbnails-content",thumbnailPrevButton:function(e){var n=e.instance;return["p-galleria-thumbnail-prev-button p-galleria-thumbnail-nav-button",{"p-disabled":n.isNavBackwardDisabled}]},thumbnailPrevIcon:"p-galleria-thumbnail-prev-icon",thumbnailsViewport:"p-galleria-thumbnails-viewport",thumbnailItems:"p-galleria-thumbnail-items",thumbnailItem:function(e){var n=e.instance,o=e.index,s=e.activeIndex;return["p-galleria-thumbnail-item",{"p-galleria-thumbnail-item-current":s===o,"p-galleria-thumbnail-item-active":n.isItemActive(o),"p-galleria-thumbnail-item-start":n.firstItemAciveIndex()===o,"p-galleria-thumbnail-item-end":n.lastItemActiveIndex()===o}]},thumbnail:"p-galleria-thumbnail",thumbnailNextButton:function(e){var n=e.instance;return["p-galleria-thumbnail-next-button p-galleria-thumbnail-nav-button",{"p-disabled":n.isNavForwardDisabled}]},thumbnailNextIcon:"p-galleria-thumbnail-next-icon"},Qt=Tt.extend({name:"galleria",style:Zt,classes:Jt}),te={name:"BaseGalleria",extends:X,props:{id:{type:String,default:null},value:{type:Array,default:null},activeIndex:{type:Number,default:0},fullScreen:{type:Boolean,default:!1},visible:{type:Boolean,default:!1},numVisible:{type:Number,default:3},responsiveOptions:{type:Array,default:null},showItemNavigators:{type:Boolean,default:!1},showThumbnailNavigators:{type:Boolean,default:!0},showItemNavigatorsOnHover:{type:Boolean,default:!1},changeItemOnIndicatorHover:{type:Boolean,default:!1},circular:{type:Boolean,default:!1},autoPlay:{type:Boolean,default:!1},transitionInterval:{type:Number,default:4e3},showThumbnails:{type:Boolean,default:!0},thumbnailsPosition:{type:String,default:"bottom"},verticalThumbnailViewPortHeight:{type:String,default:"300px"},showIndicators:{type:Boolean,default:!1},showIndicatorsOnItem:{type:Boolean,default:!1},indicatorsPosition:{type:String,default:"bottom"},baseZIndex:{type:Number,default:0},maskClass:{type:String,default:null},containerStyle:{type:null,default:null},containerClass:{type:null,default:null},containerProps:{type:null,default:null},prevButtonProps:{type:null,default:null},nextButtonProps:{type:null,default:null},ariaLabel:{type:String,default:null},ariaRoledescription:{type:String,default:null}},style:Qt,provide:function(){return{$pcGalleria:this,$parentInstance:this}}};function F(t){return ae(t)||ie(t)||ne(t)||ee()}function ee(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ne(t,e){if(t){if(typeof t=="string")return it(t,e);var n={}.toString.call(t).slice(8,-1);return n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set"?Array.from(t):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?it(t,e):void 0}}function ie(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function ae(t){if(Array.isArray(t))return it(t)}function it(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,o=Array(e);n<e;n++)o[n]=t[n];return o}var kt={name:"GalleriaItem",hostName:"Galleria",extends:X,emits:["start-slideshow","stop-slideshow","update:activeIndex"],props:{circular:{type:Boolean,default:!1},activeIndex:{type:Number,default:0},value:{type:Array,default:null},showItemNavigators:{type:Boolean,default:!0},showIndicators:{type:Boolean,default:!0},slideShowActive:{type:Boolean,default:!0},changeItemOnIndicatorHover:{type:Boolean,default:!0},autoPlay:{type:Boolean,default:!1},templates:{type:null,default:null},id:{type:String,default:null}},mounted:function(){this.autoPlay&&this.$emit("start-slideshow")},methods:{getIndicatorPTOptions:function(e){return{context:{highlighted:this.activeIndex===e}}},next:function(){var e=this.activeIndex+1,n=this.circular&&this.value.length-1===this.activeIndex?0:e;this.$emit("update:activeIndex",n)},prev:function(){var e=this.activeIndex!==0?this.activeIndex-1:0,n=this.circular&&this.activeIndex===0?this.value.length-1:e;this.$emit("update:activeIndex",n)},stopSlideShow:function(){this.slideShowActive&&this.stopSlideShow&&this.$emit("stop-slideshow")},navBackward:function(e){this.stopSlideShow(),this.prev(),e&&e.cancelable&&e.preventDefault()},navForward:function(e){this.stopSlideShow(),this.next(),e&&e.cancelable&&e.preventDefault()},onIndicatorClick:function(e){this.stopSlideShow(),this.$emit("update:activeIndex",e)},onIndicatorMouseEnter:function(e){this.changeItemOnIndicatorHover&&(this.stopSlideShow(),this.$emit("update:activeIndex",e))},onIndicatorKeyDown:function(e,n){switch(e.code){case"Enter":case"NumpadEnter":case"Space":this.stopSlideShow(),this.$emit("update:activeIndex",n),e.preventDefault();break;case"ArrowRight":this.onRightKey();break;case"ArrowLeft":this.onLeftKey();break;case"Home":this.onHomeKey(),e.preventDefault();break;case"End":this.onEndKey(),e.preventDefault();break;case"Tab":this.onTabKey();break;case"ArrowDown":case"ArrowUp":case"PageUp":case"PageDown":e.preventDefault();break}},onRightKey:function(){var e=F(L(this.$refs.indicatorContent,'[data-pc-section="indicator"]')),n=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(n,n+1===e.length?e.length-1:n+1)},onLeftKey:function(){var e=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(e,e-1<=0?0:e-1)},onHomeKey:function(){var e=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(e,0)},onEndKey:function(){var e=F(L(this.$refs.indicatorContent,'[data-pc-section="indicator"]')),n=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(n,e.length-1)},onTabKey:function(){var e=F(L(this.$refs.indicatorContent,'[data-pc-section="indicator"]')),n=e.findIndex(function(r){return It(r,"data-p-active")===!0}),o=q(this.$refs.indicatorContent,'[data-pc-section="indicator"] > [tabindex="0"]'),s=e.findIndex(function(r){return r===o.parentElement});e[s].children[0].tabIndex="-1",e[n].children[0].tabIndex="0"},findFocusedIndicatorIndex:function(){var e=F(L(this.$refs.indicatorContent,'[data-pc-section="indicator"]')),n=q(this.$refs.indicatorContent,'[data-pc-section="indicator"] > [tabindex="0"]');return e.findIndex(function(o){return o===n.parentElement})},changedFocusedIndicator:function(e,n){var o=F(L(this.$refs.indicatorContent,'[data-pc-section="indicator"]'));o[e].children[0].tabIndex="-1",o[n].children[0].tabIndex="0",o[n].children[0].focus()},isIndicatorItemActive:function(e){return this.activeIndex===e},ariaSlideNumber:function(e){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.slideNumber.replace(/{slideNumber}/g,e):void 0},ariaPageLabel:function(e){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.pageLabel.replace(/{page}/g,e):void 0}},computed:{activeItem:function(){return this.value[this.activeIndex]},ariaSlideLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.slide:void 0},isNavBackwardDisabled:function(){return!this.circular&&this.activeIndex===0},isNavForwardDisabled:function(){return!this.circular&&this.activeIndex===this.value.length-1}},components:{ChevronLeftIcon:wt,ChevronRightIcon:St},directives:{ripple:ot}},oe=["disabled"],re=["id","aria-label","aria-roledescription"],le=["disabled"],se=["aria-label","aria-selected","aria-controls","onClick","onMouseenter","onKeydown","data-p-active"],de=["tabindex"];function ue(t,e,n,o,s,r){var x=Y("ripple");return l(),c("div",b({class:t.cx("itemsContainer")},t.ptm("itemsContainer")),[i("div",b({class:t.cx("items")},t.ptm("items")),[n.showItemNavigators?E((l(),c("button",b({key:0,type:"button",class:t.cx("prevButton"),onClick:e[0]||(e[0]=function(m){return r.navBackward(m)}),disabled:r.isNavBackwardDisabled},t.ptm("prevButton"),{"data-pc-group-section":"itemnavigator"}),[(l(),w(C(n.templates.previousitemicon||"ChevronLeftIcon"),b({class:t.cx("prevIcon")},t.ptm("prevIcon")),null,16,["class"]))],16,oe)),[[x]]):p("",!0),i("div",b({id:n.id+"_item_"+n.activeIndex,class:t.cx("item"),role:"group","aria-label":r.ariaSlideNumber(n.activeIndex+1),"aria-roledescription":r.ariaSlideLabel},t.ptm("item")),[n.templates.item?(l(),w(C(n.templates.item),{key:0,item:r.activeItem},null,8,["item"])):p("",!0)],16,re),n.showItemNavigators?E((l(),c("button",b({key:1,type:"button",class:t.cx("nextButton"),onClick:e[1]||(e[1]=function(m){return r.navForward(m)}),disabled:r.isNavForwardDisabled},t.ptm("nextButton"),{"data-pc-group-section":"itemnavigator"}),[(l(),w(C(n.templates.nextitemicon||"ChevronRightIcon"),b({class:t.cx("nextIcon")},t.ptm("nextIcon")),null,16,["class"]))],16,le)),[[x]]):p("",!0),n.templates.caption?(l(),c("div",b({key:2,class:t.cx("caption")},t.ptm("caption")),[n.templates.caption?(l(),w(C(n.templates.caption),{key:0,item:r.activeItem},null,8,["item"])):p("",!0)],16)):p("",!0)],16),n.showIndicators?(l(),c("ul",b({key:0,ref:"indicatorContent",class:t.cx("indicatorList")},t.ptm("indicatorList")),[(l(!0),c(D,null,V(n.value,function(m,h){return l(),c("li",b({key:"p-galleria-indicator-".concat(h),class:t.cx("indicator",{index:h}),"aria-label":r.ariaPageLabel(h+1),"aria-selected":n.activeIndex===h,"aria-controls":n.id+"_item_"+h,onClick:function(k){return r.onIndicatorClick(h)},onMouseenter:function(k){return r.onIndicatorMouseEnter(h)},onKeydown:function(k){return r.onIndicatorKeyDown(k,h)}},{ref_for:!0},t.ptm("indicator",r.getIndicatorPTOptions(h)),{"data-p-active":r.isIndicatorItemActive(h)}),[n.templates.indicator?p("",!0):(l(),c("button",b({key:0,type:"button",tabindex:n.activeIndex===h?"0":"-1",class:t.cx("indicatorButton")},{ref_for:!0},t.ptm("indicatorButton",r.getIndicatorPTOptions(h))),null,16,de)),n.templates.indicator?(l(),w(C(n.templates.indicator),{key:1,index:h,activeIndex:n.activeIndex,tabindex:n.activeIndex===h?"0":"-1"},null,8,["index","activeIndex","tabindex"])):p("",!0)],16,se)}),128))],16)):p("",!0)],16)}kt.render=ue;function nt(t){return fe(t)||he(t)||me(t)||ce()}function ce(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function me(t,e){if(t){if(typeof t=="string")return at(t,e);var n={}.toString.call(t).slice(8,-1);return n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set"?Array.from(t):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?at(t,e):void 0}}function he(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function fe(t){if(Array.isArray(t))return at(t)}function at(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,o=Array(e);n<e;n++)o[n]=t[n];return o}var Pt={name:"GalleriaThumbnails",hostName:"Galleria",extends:X,emits:["stop-slideshow","update:activeIndex"],props:{containerId:{type:String,default:null},value:{type:Array,default:null},numVisible:{type:Number,default:3},activeIndex:{type:Number,default:0},isVertical:{type:Boolean,default:!1},slideShowActive:{type:Boolean,default:!1},circular:{type:Boolean,default:!1},responsiveOptions:{type:Array,default:null},contentHeight:{type:String,default:"300px"},showThumbnailNavigators:{type:Boolean,default:!0},templates:{type:null,default:null},prevButtonProps:{type:null,default:null},nextButtonProps:{type:null,default:null}},startPos:null,thumbnailsStyle:null,sortedResponsiveOptions:null,data:function(){return{d_numVisible:this.numVisible,d_oldNumVisible:this.numVisible,d_activeIndex:this.activeIndex,d_oldActiveItemIndex:this.activeIndex,totalShiftedItems:0,page:0}},watch:{numVisible:function(e,n){this.d_numVisible=e,this.d_oldNumVisible=n},activeIndex:function(e,n){this.d_activeIndex=e,this.d_oldActiveItemIndex=n}},mounted:function(){this.createStyle(),this.calculatePosition(),this.responsiveOptions&&this.bindDocumentListeners()},updated:function(){var e=this.totalShiftedItems;(this.d_oldNumVisible!==this.d_numVisible||this.d_oldActiveItemIndex!==this.d_activeIndex)&&(this.d_activeIndex<=this.getMedianItemIndex()?e=0:this.value.length-this.d_numVisible+this.getMedianItemIndex()<this.d_activeIndex?e=this.d_numVisible-this.value.length:this.value.length-this.d_numVisible<this.d_activeIndex&&this.d_numVisible%2===0?e=this.d_activeIndex*-1+this.getMedianItemIndex()+1:e=this.d_activeIndex*-1+this.getMedianItemIndex(),e!==this.totalShiftedItems&&(this.totalShiftedItems=e),this.$refs.itemsContainer.style.transform=this.isVertical?"translate3d(0, ".concat(e*(100/this.d_numVisible),"%, 0)"):"translate3d(".concat(e*(100/this.d_numVisible),"%, 0, 0)"),this.d_oldActiveItemIndex!==this.d_activeIndex&&(document.body.setAttribute("data-p-items-hidden","false"),!this.isUnstyled&&ut(this.$refs.itemsContainer,"p-items-hidden"),this.$refs.itemsContainer.style.transition="transform 500ms ease 0s"),this.d_oldActiveItemIndex=this.d_activeIndex,this.d_oldNumVisible=this.d_numVisible)},beforeUnmount:function(){this.responsiveOptions&&this.unbindDocumentListeners(),this.thumbnailsStyle&&this.thumbnailsStyle.parentNode.removeChild(this.thumbnailsStyle)},methods:{step:function(e){var n=this.totalShiftedItems+e;e<0&&-1*n+this.d_numVisible>this.value.length-1?n=this.d_numVisible-this.value.length:e>0&&n>0&&(n=0),this.circular&&(e<0&&this.value.length-1===this.d_activeIndex?n=0:e>0&&this.d_activeIndex===0&&(n=this.d_numVisible-this.value.length)),this.$refs.itemsContainer&&(document.body.setAttribute("data-p-items-hidden","false"),!this.isUnstyled&&ut(this.$refs.itemsContainer,"p-items-hidden"),this.$refs.itemsContainer.style.transform=this.isVertical?"translate3d(0, ".concat(n*(100/this.d_numVisible),"%, 0)"):"translate3d(".concat(n*(100/this.d_numVisible),"%, 0, 0)"),this.$refs.itemsContainer.style.transition="transform 500ms ease 0s"),this.totalShiftedItems=n},stopSlideShow:function(){this.slideShowActive&&this.stopSlideShow&&this.$emit("stop-slideshow")},getMedianItemIndex:function(){var e=Math.floor(this.d_numVisible/2);return this.d_numVisible%2?e:e-1},navBackward:function(e){this.stopSlideShow();var n=this.d_activeIndex!==0?this.d_activeIndex-1:0,o=n+this.totalShiftedItems;this.d_numVisible-o-1>this.getMedianItemIndex()&&(-1*this.totalShiftedItems!==0||this.circular)&&this.step(1);var s=this.circular&&this.d_activeIndex===0?this.value.length-1:n;this.$emit("update:activeIndex",s),e.cancelable&&e.preventDefault()},navForward:function(e){this.stopSlideShow();var n=this.d_activeIndex===this.value.length-1?this.value.length-1:this.d_activeIndex+1;n+this.totalShiftedItems>this.getMedianItemIndex()&&(-1*this.totalShiftedItems<this.getTotalPageNumber()-1||this.circular)&&this.step(-1);var o=this.circular&&this.value.length-1===this.d_activeIndex?0:n;this.$emit("update:activeIndex",o),e.cancelable&&e.preventDefault()},onItemClick:function(e){this.stopSlideShow();var n=e;if(n!==this.d_activeIndex){var o=n+this.totalShiftedItems,s=0;n<this.d_activeIndex?(s=this.d_numVisible-o-1-this.getMedianItemIndex(),s>0&&-1*this.totalShiftedItems!==0&&this.step(s)):(s=this.getMedianItemIndex()-o,s<0&&-1*this.totalShiftedItems<this.getTotalPageNumber()-1&&this.step(s)),this.$emit("update:activeIndex",n)}},onThumbnailKeydown:function(e,n){switch((e.code==="Enter"||e.code==="NumpadEnter"||e.code==="Space")&&(this.onItemClick(n),e.preventDefault()),e.code){case"ArrowRight":this.onRightKey();break;case"ArrowLeft":this.onLeftKey();break;case"Home":this.onHomeKey(),e.preventDefault();break;case"End":this.onEndKey(),e.preventDefault();break;case"ArrowUp":case"ArrowDown":e.preventDefault();break;case"Tab":this.onTabKey();break}},onRightKey:function(){var e=L(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]'),n=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(n,n+1===e.length?e.length-1:n+1)},onLeftKey:function(){var e=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(e,e-1<=0?0:e-1)},onHomeKey:function(){var e=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(e,0)},onEndKey:function(){var e=L(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]'),n=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(n,e.length-1)},onTabKey:function(){var e=nt(L(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]')),n=e.findIndex(function(r){return It(r,"data-p-active")===!0}),o=q(this.$refs.itemsContainer,'[tabindex="0"]'),s=e.findIndex(function(r){return r===o.parentElement});e[s].children[0].tabIndex="-1",e[n].children[0].tabIndex="0"},findFocusedIndicatorIndex:function(){var e=nt(L(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]')),n=q(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"] > [tabindex="0"]');return e.findIndex(function(o){return o===n.parentElement})},changedFocusedIndicator:function(e,n){var o=L(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]');o[e].children[0].tabIndex="-1",o[n].children[0].tabIndex="0",o[n].children[0].focus()},onTransitionEnd:function(e){this.$refs.itemsContainer&&e.propertyName==="transform"&&(document.body.setAttribute("data-p-items-hidden","true"),!this.isUnstyled&&yt(this.$refs.itemsContainer,"p-items-hidden"),this.$refs.itemsContainer.style.transition="")},onTouchStart:function(e){var n=e.changedTouches[0];this.startPos={x:n.pageX,y:n.pageY}},onTouchMove:function(e){e.cancelable&&e.preventDefault()},onTouchEnd:function(e){var n=e.changedTouches[0];this.isVertical?this.changePageOnTouch(e,n.pageY-this.startPos.y):this.changePageOnTouch(e,n.pageX-this.startPos.x)},changePageOnTouch:function(e,n){var o=10;Math.abs(n)<o||(n<0?this.navForward(e):this.navBackward(e))},getTotalPageNumber:function(){return this.value.length>this.d_numVisible?this.value.length-this.d_numVisible+1:0},createStyle:function(){if(!this.thumbnailsStyle){var e;this.thumbnailsStyle=document.createElement("style"),this.thumbnailsStyle.type="text/css",Vt(this.thumbnailsStyle,"nonce",(e=this.$primevue)===null||e===void 0||(e=e.config)===null||e===void 0||(e=e.csp)===null||e===void 0?void 0:e.nonce),document.body.appendChild(this.thumbnailsStyle)}var n=`
                #`.concat(this.containerId,` [data-pc-section="thumbnailitem"] {
                    flex: 1 0 `).concat(100/this.d_numVisible,`%
                }
            `);if(this.responsiveOptions&&!this.isUnstyled){this.sortedResponsiveOptions=nt(this.responsiveOptions);var o=jt();this.sortedResponsiveOptions.sort(function(x,m){var h=x.breakpoint,g=m.breakpoint;return Et(h,g,-1,o)});for(var s=0;s<this.sortedResponsiveOptions.length;s++){var r=this.sortedResponsiveOptions[s];n+=`
                        @media screen and (max-width: `.concat(r.breakpoint,`) {
                            #`).concat(this.containerId,` .p-galleria-thumbnail-item {
                                flex: 1 0 `).concat(100/r.numVisible,`%
                            }
                        }
                    `)}}this.thumbnailsStyle.innerHTML=n},calculatePosition:function(){if(this.$refs.itemsContainer&&this.sortedResponsiveOptions){for(var e=window.innerWidth,n={numVisible:this.numVisible},o=0;o<this.sortedResponsiveOptions.length;o++){var s=this.sortedResponsiveOptions[o];parseInt(s.breakpoint,10)>=e&&(n=s)}this.d_numVisible!==n.numVisible&&(this.d_numVisible=n.numVisible)}},bindDocumentListeners:function(){var e=this;this.documentResizeListener||(this.documentResizeListener=function(){e.calculatePosition()},window.addEventListener("resize",this.documentResizeListener))},unbindDocumentListeners:function(){this.documentResizeListener&&(window.removeEventListener("resize",this.documentResizeListener),this.documentResizeListener=null)},firstItemAciveIndex:function(){return this.totalShiftedItems*-1},lastItemActiveIndex:function(){return this.firstItemAciveIndex()+this.d_numVisible-1},isItemActive:function(e){return this.firstItemAciveIndex()<=e&&this.lastItemActiveIndex()>=e},ariaPageLabel:function(e){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.pageLabel.replace(/{page}/g,e):void 0}},computed:{ariaPrevButtonLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.prevPageLabel:void 0},ariaNextButtonLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.nextPageLabel:void 0},isNavBackwardDisabled:function(){return!this.circular&&this.d_activeIndex===0||this.value.length<=this.d_numVisible},isNavForwardDisabled:function(){return!this.circular&&this.d_activeIndex===this.value.length-1||this.value.length<=this.d_numVisible}},components:{ChevronLeftIcon:wt,ChevronRightIcon:St,ChevronUpIcon:qt,ChevronDownIcon:Wt},directives:{ripple:ot}};function R(t){"@babel/helpers - typeof";return R=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},R(t)}function ft(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter(function(s){return Object.getOwnPropertyDescriptor(t,s).enumerable})),n.push.apply(n,o)}return n}function W(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?ft(Object(n),!0).forEach(function(o){ve(t,o,n[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):ft(Object(n)).forEach(function(o){Object.defineProperty(t,o,Object.getOwnPropertyDescriptor(n,o))})}return t}function ve(t,e,n){return(e=be(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function be(t){var e=pe(t,"string");return R(e)=="symbol"?e:e+""}function pe(t,e){if(R(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var o=n.call(t,e);if(R(o)!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var ge=["disabled","aria-label"],ye=["data-p-active","aria-selected","aria-controls","onKeydown","data-p-galleria-thumbnail-item-current","data-p-galleria-thumbnail-item-active","data-p-galleria-thumbnail-item-start","data-p-galleria-thumbnail-item-end"],Ie=["tabindex","aria-label","aria-current","onClick"],xe=["disabled","aria-label"];function we(t,e,n,o,s,r){var x=Y("ripple");return l(),c("div",b({class:t.cx("thumbnails")},t.ptm("thumbnails")),[i("div",b({class:t.cx("thumbnailContent")},t.ptm("thumbnailContent")),[n.showThumbnailNavigators?E((l(),c("button",b({key:0,class:t.cx("thumbnailPrevButton"),disabled:r.isNavBackwardDisabled,type:"button","aria-label":r.ariaPrevButtonLabel,onClick:e[0]||(e[0]=function(m){return r.navBackward(m)})},W(W({},n.prevButtonProps),t.ptm("thumbnailPrevButton")),{"data-pc-group-section":"thumbnailnavigator"}),[(l(),w(C(n.templates.previousthumbnailicon||(n.isVertical?"ChevronUpIcon":"ChevronLeftIcon")),b({class:t.cx("thumbnailPrevIcon")},t.ptm("thumbnailPrevIcon")),null,16,["class"]))],16,ge)),[[x]]):p("",!0),i("div",b({class:t.cx("thumbnailsViewport"),style:{height:n.isVertical?n.contentHeight:""}},t.ptm("thumbnailsViewport")),[i("div",b({ref:"itemsContainer",class:t.cx("thumbnailItems"),role:"tablist",onTransitionend:e[1]||(e[1]=function(m){return r.onTransitionEnd(m)}),onTouchstart:e[2]||(e[2]=function(m){return r.onTouchStart(m)}),onTouchmove:e[3]||(e[3]=function(m){return r.onTouchMove(m)}),onTouchend:e[4]||(e[4]=function(m){return r.onTouchEnd(m)})},t.ptm("thumbnailItems")),[(l(!0),c(D,null,V(n.value,function(m,h){return l(),c("div",b({key:"p-galleria-thumbnail-item-".concat(h),class:t.cx("thumbnailItem",{index:h,activeIndex:n.activeIndex}),role:"tab","data-p-active":n.activeIndex===h,"aria-selected":n.activeIndex===h,"aria-controls":n.containerId+"_item_"+h,onKeydown:function(k){return r.onThumbnailKeydown(k,h)}},{ref_for:!0},t.ptm("thumbnailItem"),{"data-p-galleria-thumbnail-item-current":n.activeIndex===h,"data-p-galleria-thumbnail-item-active":r.isItemActive(h),"data-p-galleria-thumbnail-item-start":r.firstItemAciveIndex()===h,"data-p-galleria-thumbnail-item-end":r.lastItemActiveIndex()===h}),[i("div",b({class:t.cx("thumbnail"),tabindex:n.activeIndex===h?"0":"-1","aria-label":r.ariaPageLabel(h+1),"aria-current":n.activeIndex===h?"page":void 0,onClick:function(k){return r.onItemClick(h)}},{ref_for:!0},t.ptm("thumbnail")),[n.templates.thumbnail?(l(),w(C(n.templates.thumbnail),{key:0,item:m},null,8,["item"])):p("",!0)],16,Ie)],16,ye)}),128))],16)],16),n.showThumbnailNavigators?E((l(),c("button",b({key:1,class:t.cx("thumbnailNextButton"),disabled:r.isNavForwardDisabled,type:"button","aria-label":r.ariaNextButtonLabel,onClick:e[5]||(e[5]=function(m){return r.navForward(m)})},W(W({},n.nextButtonProps),t.ptm("thumbnailNextButton")),{"data-pc-group-section":"thumbnailnavigator"}),[(l(),w(C(n.templates.nextthumbnailicon||(n.isVertical?"ChevronDownIcon":"ChevronRightIcon")),b({class:t.cx("thumbnailNextIcon")},t.ptm("thumbnailNextIcon")),null,16,["class"]))],16,xe)),[[x]]):p("",!0)],16)],16)}Pt.render=we;function H(t){"@babel/helpers - typeof";return H=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},H(t)}function vt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter(function(s){return Object.getOwnPropertyDescriptor(t,s).enumerable})),n.push.apply(n,o)}return n}function bt(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?vt(Object(n),!0).forEach(function(o){Se(t,o,n[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):vt(Object(n)).forEach(function(o){Object.defineProperty(t,o,Object.getOwnPropertyDescriptor(n,o))})}return t}function Se(t,e,n){return(e=ke(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function ke(t){var e=Pe(t,"string");return H(e)=="symbol"?e:e+""}function Pe(t,e){if(H(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var o=n.call(t,e);if(H(o)!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var At={name:"GalleriaContent",hostName:"Galleria",extends:X,inheritAttrs:!1,interval:null,emits:["activeitem-change","mask-hide"],data:function(){return{activeIndex:this.$attrs.activeIndex,numVisible:this.$attrs.numVisible,slideShowActive:!1}},watch:{"$attrs.value":function(e){e&&e.length<this.numVisible&&(this.numVisible=e.length)},"$attrs.activeIndex":function(e){this.activeIndex=e},"$attrs.numVisible":function(e){this.numVisible=e},"$attrs.autoPlay":function(e){e?this.startSlideShow():this.stopSlideShow()}},updated:function(){this.$emit("activeitem-change",this.activeIndex)},beforeUnmount:function(){this.slideShowActive&&this.stopSlideShow()},methods:{getPTOptions:function(e){return this.ptm(e,{props:bt(bt({},this.$attrs),{},{pt:this.pt,unstyled:this.unstyled})})},isAutoPlayActive:function(){return this.slideShowActive},startSlideShow:function(){var e=this;this.interval=setInterval(function(){var n=e.$attrs.circular&&e.$attrs.value.length-1===e.activeIndex?0:e.activeIndex+1;e.activeIndex=n},this.$attrs.transitionInterval),this.slideShowActive=!0},stopSlideShow:function(){this.interval&&clearInterval(this.interval),this.slideShowActive=!1},getPositionClass:function(e,n){var o=["top","left","bottom","right"],s=o.find(function(r){return r===n});return s?"".concat(e,"-").concat(s):""},isVertical:function(){return this.$attrs.thumbnailsPosition==="left"||this.$attrs.thumbnailsPosition==="right"}},computed:{closeAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.close:void 0}},components:{GalleriaItem:kt,GalleriaThumbnails:Pt,TimesIcon:Ut},directives:{ripple:ot}};function z(t){"@babel/helpers - typeof";return z=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},z(t)}function pt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter(function(s){return Object.getOwnPropertyDescriptor(t,s).enumerable})),n.push.apply(n,o)}return n}function gt(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?pt(Object(n),!0).forEach(function(o){Ae(t,o,n[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):pt(Object(n)).forEach(function(o){Object.defineProperty(t,o,Object.getOwnPropertyDescriptor(n,o))})}return t}function Ae(t,e,n){return(e=Ce(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Ce(t){var e=Oe(t,"string");return z(e)=="symbol"?e:e+""}function Oe(t,e){if(z(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var o=n.call(t,e);if(z(o)!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var Le=["id","aria-label","aria-roledescription"],Be=["aria-label"],Ne=["aria-live"];function De(t,e,n,o,s,r){var x=M("GalleriaItem"),m=M("GalleriaThumbnails"),h=Y("ripple");return t.$attrs.value&&t.$attrs.value.length>0?(l(),c("div",b({key:0,id:t.$id,role:"region",class:[t.cx("root"),t.$attrs.containerClass],style:t.$attrs.containerStyle,"aria-label":t.$attrs.ariaLabel,"aria-roledescription":t.$attrs.ariaRoledescription},gt(gt({},t.$attrs.containerProps),r.getPTOptions("root"))),[t.$attrs.fullScreen?E((l(),c("button",b({key:0,autofocus:"",type:"button",class:t.cx("closeButton"),"aria-label":r.closeAriaLabel,onClick:e[0]||(e[0]=function(g){return t.$emit("mask-hide")})},r.getPTOptions("closeButton")),[(l(),w(C(t.$attrs.templates.closeicon||"TimesIcon"),b({class:t.cx("closeIcon")},r.getPTOptions("closeIcon")),null,16,["class"]))],16,Be)),[[h]]):p("",!0),t.$attrs.templates&&t.$attrs.templates.header?(l(),c("div",b({key:1,class:t.cx("header")},r.getPTOptions("header")),[(l(),w(C(t.$attrs.templates.header)))],16)):p("",!0),i("div",b({class:t.cx("content"),"aria-live":t.$attrs.autoPlay?"polite":"off"},r.getPTOptions("content")),[B(x,{id:t.$id,activeIndex:s.activeIndex,"onUpdate:activeIndex":e[1]||(e[1]=function(g){return s.activeIndex=g}),slideShowActive:s.slideShowActive,"onUpdate:slideShowActive":e[2]||(e[2]=function(g){return s.slideShowActive=g}),value:t.$attrs.value,circular:t.$attrs.circular,templates:t.$attrs.templates,showIndicators:t.$attrs.showIndicators,changeItemOnIndicatorHover:t.$attrs.changeItemOnIndicatorHover,showItemNavigators:t.$attrs.showItemNavigators,autoPlay:t.$attrs.autoPlay,onStartSlideshow:r.startSlideShow,onStopSlideshow:r.stopSlideShow,pt:t.pt,unstyled:t.unstyled},null,8,["id","activeIndex","slideShowActive","value","circular","templates","showIndicators","changeItemOnIndicatorHover","showItemNavigators","autoPlay","onStartSlideshow","onStopSlideshow","pt","unstyled"]),t.$attrs.showThumbnails?(l(),w(m,{key:0,activeIndex:s.activeIndex,"onUpdate:activeIndex":e[3]||(e[3]=function(g){return s.activeIndex=g}),slideShowActive:s.slideShowActive,"onUpdate:slideShowActive":e[4]||(e[4]=function(g){return s.slideShowActive=g}),containerId:t.$id,value:t.$attrs.value,templates:t.$attrs.templates,numVisible:s.numVisible,responsiveOptions:t.$attrs.responsiveOptions,circular:t.$attrs.circular,isVertical:r.isVertical(),contentHeight:t.$attrs.verticalThumbnailViewPortHeight,showThumbnailNavigators:t.$attrs.showThumbnailNavigators,prevButtonProps:t.$attrs.prevButtonProps,nextButtonProps:t.$attrs.nextButtonProps,onStopSlideshow:r.stopSlideShow,pt:t.pt,unstyled:t.unstyled},null,8,["activeIndex","slideShowActive","containerId","value","templates","numVisible","responsiveOptions","circular","isVertical","contentHeight","showThumbnailNavigators","prevButtonProps","nextButtonProps","onStopSlideshow","pt","unstyled"])):p("",!0)],16,Ne),t.$attrs.templates&&t.$attrs.templates.footer?(l(),c("div",b({key:2,class:t.cx("footer")},r.getPTOptions("footer")),[(l(),w(C(t.$attrs.templates.footer)))],16)):p("",!0)],16,Le)):p("",!0)}At.render=De;var Ct={name:"Galleria",extends:te,inheritAttrs:!1,emits:["update:activeIndex","update:visible"],container:null,mask:null,documentKeydownListener:null,data:function(){return{containerVisible:this.visible,target:null}},updated:function(){this.fullScreen&&this.visible&&(this.containerVisible=this.visible)},beforeUnmount:function(){this.fullScreen&&ct(),this.mask=null,this.container&&(tt.clear(this.container),this.container=null)},methods:{onBeforeEnter:function(e){tt.set("modal",e,this.baseZIndex||this.$primevue.config.zIndex.modal)},onEnter:function(e){this.target=document.activeElement,this.mask.style.zIndex=String(parseInt(e.style.zIndex,10)-1),Gt(),this.focus(),this.bindGlobalListeners()},onBeforeLeave:function(){!this.isUnstyled&&yt(this.mask,"p-overlay-mask-leave")},onLeave:function(){$t(this.target),this.target=null},onAfterLeave:function(e){tt.clear(e),this.containerVisible=!1,ct(),this.unbindGlobalListeners()},onActiveItemChange:function(e){this.activeIndex!==e&&this.$emit("update:activeIndex",e)},maskHide:function(){this.$emit("update:visible",!1)},containerRef:function(e){this.container=e},maskRef:function(e){this.mask=e},onKeyDown:function(e){e.code==="Escape"&&this.maskHide()},bindDocumentKeyDownListener:function(){this.documentKeydownListener||(this.documentKeydownListener=this.onKeyDown.bind(this),window.document.addEventListener("keydown",this.documentKeydownListener))},unbindDocumentKeyDownListener:function(){this.documentKeydownListener&&(window.document.removeEventListener("keydown",this.documentKeydownListener),this.documentKeydownListener=null)},bindGlobalListeners:function(){this.fullScreen&&this.bindDocumentKeyDownListener()},unbindGlobalListeners:function(){this.fullScreen&&this.unbindDocumentKeyDownListener()},focus:function(){var e=this.container.$el.querySelector("[autofocus]");e&&e.focus()}},components:{GalleriaContent:At,Portal:zt},directives:{focustrap:Ht}},Te=["aria-modal"];function $e(t,e,n,o,s,r){var x=M("GalleriaContent"),m=M("Portal"),h=Y("focustrap");return t.fullScreen?(l(),w(m,{key:0},{default:j(function(){return[s.containerVisible?(l(),c("div",b({key:0,ref:r.maskRef,class:[t.cx("mask"),t.maskClass],role:"dialog","aria-modal":t.fullScreen?"true":void 0},t.ptm("mask")),[B(xt,b({name:"p-galleria",onBeforeEnter:r.onBeforeEnter,onEnter:r.onEnter,onBeforeLeave:r.onBeforeLeave,onLeave:r.onLeave,onAfterLeave:r.onAfterLeave,appear:""},t.ptm("transition")),{default:j(function(){return[t.visible?E((l(),w(x,b({key:0,ref:r.containerRef,onMaskHide:r.maskHide,templates:t.$slots,onActiveitemChange:r.onActiveItemChange,pt:t.pt,unstyled:t.unstyled},t.$props),null,16,["onMaskHide","templates","onActiveitemChange","pt","unstyled"])),[[h]]):p("",!0)]}),_:1},16,["onBeforeEnter","onEnter","onBeforeLeave","onLeave","onAfterLeave"])],16,Te)):p("",!0)]}),_:1})):(l(),w(x,b({key:1,templates:t.$slots,onActiveitemChange:r.onActiveItemChange,pt:t.pt,unstyled:t.unstyled},t.$props),null,16,["templates","onActiveitemChange","pt","unstyled"]))}Ct.render=$e;const Ve={class:"px-4 py-36 md:py-48 md:px-56 max-w-full mx-auto pb-20 lg:pb-8"},je={class:"mb-6"},Ee={class:"text-2xl md:text-3xl font-semibold text-gray-900 mb-2"},_e={class:"flex flex-wrap items-center gap-4 text-sm"},Ke={class:"flex items-center gap-2"},Fe={class:"text-gray-600"},Me={key:0,class:"flex items-center gap-1"},Re={key:1,class:"flex items-center gap-2"},He={class:"font-medium"},ze={class:"text-gray-600"},Ge={key:0,class:"relative"},Ue=["src","alt"],We={class:"grid grid-cols-4 gap-2 rounded-2xl overflow-hidden mb-8 h-[400px] cursor-pointer"},qe=["src","alt"],Ye=["onClick"],Xe=["src","alt"],Ze={key:1,class:"w-full h-[400px] bg-gray-200 rounded-2xl flex items-center justify-center mb-8"},Je={class:"grid grid-cols-1 lg:grid-cols-3 gap-8"},Qe={class:"lg:col-span-2 space-y-6"},tn={class:"border-b pb-6"},en={class:"text-xl font-semibold text-gray-900 mb-2"},nn={class:"flex items-center gap-4 text-gray-600"},an={class:"border-b pb-6"},on={class:"prose max-w-none text-gray-700"},rn={key:"full"},ln={key:"short"},sn={key:0,class:"border-b pb-6"},dn={class:"grid grid-cols-2 gap-4"},un={class:"text-gray-700"},cn={class:"border-b pb-6"},mn={class:"flex items-center gap-3 mb-3"},hn={key:0,class:"text-sm text-gray-600"},fn={key:1,class:"text-sm text-gray-600"},vn={key:2,class:"text-sm text-red-600"},bn={class:"space-y-4"},pn=["onClick"],gn={class:"flex justify-between items-start"},yn={class:"flex-1"},In={class:"font-semibold text-gray-900"},xn={class:"text-sm text-gray-600 mt-1"},wn={class:"flex items-center gap-4 mt-2 text-sm text-gray-600"},Sn={key:0},kn={class:"text-right"},Pn={class:"text-xl font-bold text-gray-900"},An={key:0,class:"absolute inset-0 bg-white/60 flex items-center justify-center rounded-lg pointer-events-none"},Cn={class:"border-b pb-6"},On={class:"text-gray-700"},Ln={class:"lg:col-span-1"},Bn={class:"sticky top-24 hidden lg:block"},Nn={class:"bg-white border rounded-2xl shadow-md p-6"},Dn={class:"flex items-baseline justify-start gap-x-2 mb-4"},Tn={class:"text-2xl md:text-3xl font-bold text-gray-900"},$n={class:"space-y-3"},Vn={class:"flex gap-2"},jn={class:"w-full"},En={class:"text-sm text-gray-900 font-medium"},_n={class:"w-full"},Kn={class:"text-sm text-gray-900 font-medium"},Fn={class:"p-0 h-[330px]"},Mn={class:"text-sm text-gray-900 font-medium"},Rn={class:"p-4 min-w-[300px]"},Hn={class:"space-y-4"},zn={class:"flex items-center justify-between"},Gn={class:"flex items-center gap-3"},Un={class:"w-8 text-center"},Wn={class:"flex items-center justify-between"},qn={class:"flex items-center gap-3"},Yn={class:"w-8 text-center"},Xn={class:"pt-2 w-full"},Zn={key:0,type:"button",class:"w-full bg-gray-400 text-white rounded-lg py-3 font-semibold cursor-not-allowed",disabled:""},Jn={key:1,type:"button",class:"w-full bg-gray-400 text-white rounded-lg py-3 font-semibold cursor-not-allowed",disabled:""},Qn={key:0,class:"mt-4"},ti={class:"border-t pt-3"},ei={class:"flex items-center justify-between text-sm text-gray-600"},ni={class:"font-medium text-gray-900"},ii={class:"flex items-center justify-between text-base font-semibold text-gray-900 mt-3 pt-3 border-t"},ai={__name:"AccommodationShow",props:{accommodation:Object},setup(t){const e=t,n=S(!1),o=S(null),s=S(2),r=S(null),x=S(null);S(!1);const m=S(null),h=S(!1),g=S([]),k=S(null),Ot=$(()=>!m.value||!P.value||!A.value?!1:h.value?!0:g.value.includes(m.value.id));function T(d){return d?d.toISOString():null}function Lt(d){try{if(!d){o.value=null,I.checkin.value="",I.checkout.value="";return}if(Array.isArray(d)){const[a,v]=d;o.value=d,I.checkin.value=a?T(a):"",I.checkout.value=v?T(v):"",a&&v&&setTimeout(()=>{try{r.value?.hide()}catch{}},500)}}catch(a){console.error("Error handling calendar change:",a)}}const P=S(null),A=S(null);K(o,d=>{if(!d){P.value=null,A.value=null;return}Array.isArray(d)&&(P.value=d[0]?T(d[0]):null,A.value=d[1]?T(d[1]):null)}),K([P,A,s],async([d,a,v])=>{if(!d||!a){g.value=[],k.value=null;return}h.value=!0,k.value=null;try{const y={check_in:d,check_out:a,guests:v||1},u=route("api.accommodations.availability",e.accommodation.id),{data:N}=await _t.get(u,{params:y}),dt=N.available_rooms||[];g.value=dt.map(Dt=>Dt.id),m.value&&!g.value.includes(m.value.id)&&(m.value=null)}catch(y){console.error("Error checking availability",y),k.value=y.response?.data?.message||"Error al verificar disponibilidad",g.value=[]}finally{h.value=!1}}),Kt(()=>{try{const d=I.checkin?.value,a=I.checkout?.value;if(d&&a){const y=new Date(d),u=new Date(a);!isNaN(y)&&!isNaN(u)&&(o.value=[y,u])}const v=I.guests?.value;if(v){const y=Number(v.adults||0)+Number(v.children||0)||2;s.value=y}}catch(d){console.error("Error mounting component:",d)}}),K([()=>I.checkin.value,()=>I.checkout.value],([d,a])=>{try{if(d&&a){const v=new Date(d),y=new Date(a);if(!isNaN(v)&&!isNaN(y)){const u=o.value?.[0],N=o.value?.[1];(!u||!N||T(u)!==d||T(N)!==a)&&(o.value=[v,y])}}else o.value=null}catch(v){console.error("Error watching store changes:",v)}}),K(()=>I.guests.value,d=>{if(!d)return;const a=Number(d.adults||0)+Number(d.children||0)||2;s.value=a},{deep:!0}),K(s,d=>{const a=I.guests.value||{adults:2,children:0,infants:0},v=Math.max(1,Number(d)-Number(a.children||0));I.guests.value={...a,adults:v}});function rt(d){const v={...I.guests.value||{adults:2,children:0,infants:0}};v[d]=Math.max(0,(v[d]||0)+1),I.guests.value=v;const y=v.adults+v.children+v.infants;s.value=y||2}function lt(d){const v={...I.guests.value||{adults:2,children:0,infants:0}};d==="adults"?v[d]=Math.max(1,(v[d]||1)-1):v[d]=Math.max(0,(v[d]||0)-1),I.guests.value=v;const y=v.adults+v.children+v.infants;s.value=y||2}const _=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}),Bt=$(()=>{if(e.accommodation.photos&&e.accommodation.photos.length>0){const d=e.accommodation.photos[0].path;return d.startsWith("http")?d:`/storage/${d.replace("public/","")}`}return"https://avcolombia.net/images/logo.webp"}),G=$(()=>!e.accommodation.photos||e.accommodation.photos.length===0?[]:e.accommodation.photos.map(d=>{const a=d.path;return a.startsWith("http")?a:`/storage/${a.replace("public/","")}`})),Z=S(0),J=S(!1),Q=d=>{Z.value=d,J.value=!0};$(()=>e.accommodation.rooms?.filter(d=>d.is_available)||[]);const U=$(()=>{if(!P.value||!A.value)return 0;const d=new Date(P.value),a=new Date(A.value),v=Math.ceil((a-d)/(1e3*60*60*24));return v>0?v:0}),st=$(()=>!m.value||U.value===0?0:m.value.price_per_night*U.value),Nt=()=>{if(!m.value){ht.fire({title:"Habitación Requerida",text:"Por favor selecciona una habitación",icon:"warning",confirmButtonColor:"#3085d6",confirmButtonText:"Entendido"});return}if(!P.value||!A.value){ht.fire({title:"Fechas Requeridas",text:"Por favor selecciona las fechas de check-in y check-out",icon:"warning",confirmButtonColor:"#3085d6",confirmButtonText:"Entendido"});return}const d=route("accommodations.checkout",{accommodation:e.accommodation.id,room:m.value.id}),a=new URLSearchParams({check_in:P.value,check_out:A.value,guests:s.value});window.location.href=`${d}?${a.toString()}`};return(d,a)=>{const v=Ct,y=M("VueDatePicker");return l(),c(D,null,[B(O(Ft),{title:`Av Colombia - ${t.accommodation.name}`},null,8,["title"]),B(Yt),i("div",Ve,[i("div",je,[i("h1",Ee,f(t.accommodation.name),1),i("div",_e,[i("div",Ke,[a[13]||(a[13]=i("i",{class:"fa-solid fa-location-dot text-gray-600"},null,-1)),i("span",Fe,f(t.accommodation.city)+", "+f(t.accommodation.country),1)]),t.accommodation.star_rating?(l(),c("div",Me,[(l(!0),c(D,null,V(t.accommodation.star_rating,u=>(l(),c("i",{key:u,class:"fa-solid fa-star text-yellow-400"}))),128))])):p("",!0),t.accommodation.average_rating>0?(l(),c("div",Re,[a[14]||(a[14]=i("i",{class:"fa-solid fa-heart text-red-400"},null,-1)),i("span",He,f(t.accommodation.average_rating),1),i("span",ze,"("+f(t.accommodation.reviews?.length||0)+" reseñas)",1)])):p("",!0),a[15]||(a[15]=Mt('<div class="flex items-center gap-3 ml-auto" data-v-08aad77d><button class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg border" data-v-08aad77d><i class="fa-solid fa-share-nodes" data-v-08aad77d></i> Compartir </button><button class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg border" data-v-08aad77d><i class="fa-regular fa-heart" data-v-08aad77d></i> Guardar </button></div>',1))])]),G.value.length>0?(l(),c("div",Ge,[B(v,{activeIndex:Z.value,"onUpdate:activeIndex":a[0]||(a[0]=u=>Z.value=u),visible:J.value,"onUpdate:visible":a[1]||(a[1]=u=>J.value=u),value:G.value,numVisible:7,containerStyle:"max-width: 100%",circular:!0,fullScreen:!0,showItemNavigators:!0,showThumbnails:!1},{item:j(u=>[i("img",{src:u.item,alt:t.accommodation.name,style:{width:"100%",display:"block"}},null,8,Ue)]),_:1},8,["activeIndex","visible","value"]),i("div",We,[i("div",{class:"col-span-2 row-span-2",onClick:a[2]||(a[2]=u=>Q(0))},[i("img",{src:Bt.value,alt:t.accommodation.name,class:"w-full h-full object-cover hover:opacity-90 transition-opacity"},null,8,qe)]),(l(!0),c(D,null,V(G.value.slice(1,5),(u,N)=>(l(),c("div",{key:N,onClick:dt=>Q(N+1)},[i("img",{src:u,alt:`${t.accommodation.name} - ${N+2}`,class:"w-full h-full object-cover hover:opacity-90 transition-opacity"},null,8,Xe)],8,Ye))),128)),G.value.length>5?(l(),c("button",{key:0,class:"absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow font-medium",onClick:a[3]||(a[3]=u=>Q(5))},[...a[16]||(a[16]=[i("i",{class:"fa-solid fa-images mr-2"},null,-1),et(" Mostrar todas las fotos ",-1)])])):p("",!0)])])):(l(),c("div",Ze,[...a[17]||(a[17]=[i("div",{class:"text-center text-gray-500"},[i("i",{class:"fa-solid fa-image text-6xl mb-4"}),i("p",null,"No hay fotos disponibles")],-1)])])),i("div",Je,[i("main",Qe,[i("div",tn,[i("h2",en,f(t.accommodation.type)+" · "+f(t.accommodation.city),1),i("div",nn,[i("span",null,f(t.accommodation.rooms?.length||0)+" habitaciones",1)])]),i("section",an,[a[18]||(a[18]=i("h3",{class:"text-lg font-semibold text-gray-900 mb-3"},"Acerca de este lugar",-1)),i("div",on,[B(xt,{name:"expand"},{default:j(()=>[n.value||t.accommodation.description?.length<=500?(l(),c("div",rn,f(t.accommodation.description),1)):(l(),c("div",ln,f(t.accommodation.description?.slice(0,500))+"... ",1))]),_:1}),t.accommodation.description?.length>500?(l(),c("button",{key:0,onClick:a[4]||(a[4]=u=>n.value=!n.value),class:"text-gray-900 hover:underline mt-2 font-medium"},f(n.value?"Mostrar menos":"Mostrar más")+" › ",1)):p("",!0)])]),t.accommodation.amenities?.length?(l(),c("section",sn,[a[20]||(a[20]=i("h3",{class:"text-lg font-semibold text-gray-900 mb-4"},"Lo que ofrece este lugar",-1)),i("div",dn,[(l(!0),c(D,null,V(t.accommodation.amenities,u=>(l(),c("div",{key:u.id,class:"flex items-center gap-3"},[a[19]||(a[19]=i("i",{class:"fa-solid fa-check text-teal-500"},null,-1)),i("span",un,f(u.name),1)]))),128))])])):p("",!0),i("section",cn,[a[25]||(a[25]=i("h3",{class:"text-lg font-semibold text-gray-900 mb-4"},"Habitaciones disponibles",-1)),i("div",mn,[h.value?(l(),c("div",hn,"Comprobando disponibilidad...")):(l(),c("div",fn,"Disponibles: "+f(g.value.length)+" / "+f(t.accommodation.rooms?.length||0),1)),k.value?(l(),c("div",vn,f(k.value),1)):p("",!0)]),i("div",bn,[(l(!0),c(D,null,V(e.accommodation.rooms,u=>(l(),c("div",{key:u.id,class:Rt(["border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer relative",{"ring-2 ring-indigo-500":m.value?.id===u.id,"opacity-50 cursor-not-allowed":!g.value.includes(u.id)}]),onClick:()=>{g.value.includes(u.id)&&(m.value=u)}},[i("div",gn,[i("div",yn,[i("h4",In,f(u.name),1),i("p",xn,f(u.description),1),i("div",wn,[i("span",null,[a[21]||(a[21]=i("i",{class:"fa-solid fa-user"},null,-1)),et(" "+f(u.capacity_adults)+" adultos",1)]),u.capacity_children>0?(l(),c("span",Sn,[a[22]||(a[22]=i("i",{class:"fa-solid fa-child"},null,-1)),et(" "+f(u.capacity_children)+" niños",1)])):p("",!0)])]),i("div",kn,[i("div",Pn,f(O(_).format(u.price_per_night)),1),a[23]||(a[23]=i("div",{class:"text-sm text-gray-600"},"por noche",-1))])]),g.value.includes(u.id)?p("",!0):(l(),c("div",An,[...a[24]||(a[24]=[i("div",{class:"text-sm text-red-600 font-medium"},"No disponible en las fechas seleccionadas",-1)])]))],10,pn))),128))])]),i("section",Cn,[a[26]||(a[26]=i("h3",{class:"text-lg font-semibold text-gray-900 mb-4"},"Ubicación",-1)),i("div",On,[i("p",null,f(t.accommodation.address_line_1),1),i("p",null,f(t.accommodation.city)+", "+f(t.accommodation.state)+" "+f(t.accommodation.postal_code),1),i("p",null,f(t.accommodation.country),1)])])]),i("aside",Ln,[i("div",Bn,[i("div",Nn,[i("div",Dn,[i("div",Tn,f(O(_).format(t.accommodation.min_price||0)),1),a[27]||(a[27]=i("div",{class:"text-sm text-gray-600"},"por noche",-1))]),i("form",$n,[i("div",Vn,[i("div",jn,[a[28]||(a[28]=i("label",{class:"text-xs font-medium text-gray-700 block mb-1"},"LLEGADA",-1)),i("button",{type:"button",class:"w-full text-left border border-gray-300 rounded-lg px-3 py-3 bg-white hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400",onClick:a[5]||(a[5]=u=>r.value?.toggle(u))},[i("div",En,f(P.value?new Date(P.value).toLocaleDateString("es-ES",{day:"numeric",month:"short"}):"Agregar fecha"),1)])]),i("div",_n,[a[29]||(a[29]=i("label",{class:"text-xs font-medium text-gray-700 block mb-1"},"SALIDA",-1)),i("button",{type:"button",class:"w-full text-left border border-gray-300 rounded-lg px-3 py-3 bg-white hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400",onClick:a[6]||(a[6]=u=>r.value?.toggle(u))},[i("div",Kn,f(A.value?new Date(A.value).toLocaleDateString("es-ES",{day:"numeric",month:"short"}):"Agregar fecha"),1)])]),B(O(mt),{ref_key:"op",ref:r,appendTo:"body",class:"!w-auto"},{default:j(()=>[i("div",Fn,[B(y,{modelValue:o.value,"onUpdate:modelValue":[a[7]||(a[7]=u=>o.value=u),Lt],range:"","min-date":new Date,inline:"","auto-apply":"",teleport:!1,locale:"es",format:"dd/MM/yyyy","preview-format":"dd/MM/yyyy",placeholder:"Selecciona fechas"},null,8,["modelValue","min-date"])])]),_:1},512)]),i("div",null,[a[37]||(a[37]=i("label",{class:"text-xs font-medium text-gray-700 block mb-1"},"HUÉSPEDES",-1)),i("button",{type:"button",class:"w-full text-left border border-gray-300 rounded-lg px-3 py-3 bg-white hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400",onClick:a[8]||(a[8]=u=>x.value?.toggle(u))},[i("div",Mn,f(s.value)+" huésped"+f(s.value>1?"es":""),1)]),B(O(mt),{ref_key:"guestsOp",ref:x,appendTo:"body",class:"!w-auto"},{default:j(()=>[i("div",Rn,[a[36]||(a[36]=i("h3",{class:"text-lg font-semibold text-gray-900 mb-4"},"¿Cuántos huéspedes?",-1)),i("div",Hn,[i("div",zn,[a[32]||(a[32]=i("div",null,[i("div",{class:"font-medium text-gray-900"},"Adultos"),i("div",{class:"text-sm text-gray-500"},"13 años o más")],-1)),i("div",Gn,[i("button",{type:"button",onClick:a[9]||(a[9]=u=>lt("adults")),class:"w-8 h-8 rounded-full border border-gray-300 hover:border-gray-400 flex items-center justify-center"},[...a[30]||(a[30]=[i("i",{class:"fa-solid fa-minus text-xs"},null,-1)])]),i("span",Un,f(O(I).guests.value?.adults||1),1),i("button",{type:"button",onClick:a[10]||(a[10]=u=>rt("adults")),class:"w-8 h-8 rounded-full border border-gray-300 hover:border-gray-400 flex items-center justify-center"},[...a[31]||(a[31]=[i("i",{class:"fa-solid fa-plus text-xs"},null,-1)])])])]),i("div",Wn,[a[35]||(a[35]=i("div",null,[i("div",{class:"font-medium text-gray-900"},"Niños"),i("div",{class:"text-sm text-gray-500"},"2-12 años")],-1)),i("div",qn,[i("button",{type:"button",onClick:a[11]||(a[11]=u=>lt("children")),class:"w-8 h-8 rounded-full border border-gray-300 hover:border-gray-400 flex items-center justify-center"},[...a[33]||(a[33]=[i("i",{class:"fa-solid fa-minus text-xs"},null,-1)])]),i("span",Yn,f(O(I).guests.value?.children||0),1),i("button",{type:"button",onClick:a[12]||(a[12]=u=>rt("children")),class:"w-8 h-8 rounded-full border border-gray-300 hover:border-gray-400 flex items-center justify-center"},[...a[34]||(a[34]=[i("i",{class:"fa-solid fa-plus text-xs"},null,-1)])])])])])])]),_:1},512)]),i("div",Xn,[!P.value||!A.value||!m.value?(l(),c("button",Zn,f(m.value?"Selecciona fechas":"Selecciona una habitación"),1)):m.value&&!Ot.value?(l(),c("button",Jn," Habitación no disponible ")):(l(),c("button",{key:2,onClick:Nt,type:"button",class:"w-full bg-[#FF385C] hover:bg-[#E31C5F] text-white rounded-lg py-3 font-semibold transition duration-200"}," Reservar "))])]),P.value&&A.value&&m.value?(l(),c("div",Qn,[i("div",ti,[i("div",ei,[i("div",null,f(O(_).format(m.value.price_per_night))+" x "+f(U.value)+" noche"+f(U.value>1?"s":""),1),i("div",ni,f(O(_).format(st.value)),1)]),i("div",ii,[a[38]||(a[38]=i("div",null,"Total",-1)),i("div",null,f(O(_).format(st.value)),1)])])])):p("",!0),a[39]||(a[39]=i("p",{class:"mt-3 text-xs text-gray-500"},"Cancelación gratuita hasta 48 horas antes del check-in",-1))])])])])])],64)}}},Bi=Xt(ai,[["__scopeId","data-v-08aad77d"]]);export{Bi as default};
