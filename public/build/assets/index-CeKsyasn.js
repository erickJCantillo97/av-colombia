import{B as b,ej as g,en as k,el as s,eo as c,ep as f,I as w,eq as S,er as A,em as O,M as E,es as j}from"./app-DRkRqkwG.js";import{s as P}from"./index-Dcbi4Hs_.js";var $=function(t){var n=t.dt;return`
.p-ink {
    display: block;
    position: absolute;
    background: `.concat(n("ripple.background"),`;
    border-radius: 100%;
    transform: scale(0);
    pointer-events: none;
}

.p-ink-active {
    animation: ripple 0.4s linear;
}

@keyframes ripple {
    100% {
        opacity: 0;
        transform: scale(2.5);
    }
}
`)},_={root:"p-ink"},I=b.extend({name:"ripple-directive",theme:$,classes:_}),x=g.extend({style:I});function o(e){"@babel/helpers - typeof";return o=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(e)}function T(e){return M(e)||B(e)||R(e)||D()}function D(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function R(e,t){if(e){if(typeof e=="string")return p(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}function B(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function M(e){if(Array.isArray(e))return p(e)}function p(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,i=Array(t);n<t;n++)i[n]=e[n];return i}function d(e,t,n){return(t=U(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function U(e){var t=C(e,"string");return o(t)=="symbol"?t:t+""}function C(e,t){if(o(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var i=n.call(e,t||"default");if(o(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var Y=x.extend("ripple",{watch:{"config.ripple":function(t){t?(this.createRipple(this.$host),this.bindEvents(this.$host),this.$host.setAttribute("data-pd-ripple",!0),this.$host.style.overflow="hidden",this.$host.style.position="relative"):(this.remove(this.$host),this.$host.removeAttribute("data-pd-ripple"))}},unmounted:function(t){this.remove(t)},timeout:void 0,methods:{bindEvents:function(t){t.addEventListener("mousedown",this.onMouseDown.bind(this))},unbindEvents:function(t){t.removeEventListener("mousedown",this.onMouseDown.bind(this))},createRipple:function(t){var n=k("span",d(d({role:"presentation","aria-hidden":!0,"data-p-ink":!0,"data-p-ink-active":!1,class:!this.isUnstyled()&&this.cx("root"),onAnimationEnd:this.onAnimationEnd.bind(this)},this.$attrSelector,""),"p-bind",this.ptm("root")));t.appendChild(n),this.$el=n},remove:function(t){var n=this.getInk(t);n&&(this.$host.style.overflow="",this.$host.style.position="",this.unbindEvents(t),n.removeEventListener("animationend",this.onAnimationEnd),n.remove())},onMouseDown:function(t){var n=this,i=t.currentTarget,r=this.getInk(i);if(!(!r||getComputedStyle(r,null).display==="none")){if(!this.isUnstyled()&&s(r,"p-ink-active"),r.setAttribute("data-p-ink-active","false"),!c(r)&&!f(r)){var l=Math.max(w(i),S(i));r.style.height=l+"px",r.style.width=l+"px"}var u=A(i),h=t.pageX-u.left+document.body.scrollTop-f(r)/2,v=t.pageY-u.top+document.body.scrollLeft-c(r)/2;r.style.top=v+"px",r.style.left=h+"px",!this.isUnstyled()&&O(r,"p-ink-active"),r.setAttribute("data-p-ink-active","true"),this.timeout=setTimeout(function(){r&&(!n.isUnstyled()&&s(r,"p-ink-active"),r.setAttribute("data-p-ink-active","false"))},401)}},onAnimationEnd:function(t){this.timeout&&clearTimeout(this.timeout),!this.isUnstyled()&&s(t.currentTarget,"p-ink-active"),t.currentTarget.setAttribute("data-p-ink-active","false")},getInk:function(t){return t&&t.children?T(t.children).find(function(n){return E(n,"data-pc-name")==="ripple"}):void 0}}}),L=`
.p-icon {
    display: inline-block;
}

.p-icon-spin {
    -webkit-animation: p-icon-spin 2s infinite linear;
    animation: p-icon-spin 2s infinite linear;
}

@-webkit-keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}

@keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
`,H=b.extend({name:"baseicon",css:L});function a(e){"@babel/helpers - typeof";return a=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(e)}function m(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),n.push.apply(n,i)}return n}function y(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?m(Object(n),!0).forEach(function(i){K(e,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach(function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(n,i))})}return e}function K(e,t,n){return(t=W(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function W(e){var t=N(e,"string");return a(t)=="symbol"?t:t+""}function N(e,t){if(a(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var i=n.call(e,t||"default");if(a(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var z={name:"BaseIcon",extends:P,props:{label:{type:String,default:void 0},spin:{type:Boolean,default:!1}},style:H,provide:function(){return{$pcIcon:this,$parentInstance:this}},methods:{pti:function(){var t=j(this.label);return y(y({},!this.isUnstyled&&{class:["p-icon",{"p-icon-spin":this.spin}]}),{},{role:t?void 0:"img","aria-label":t?void 0:this.label,"aria-hidden":t})}}};export{Y as R,z as s};
