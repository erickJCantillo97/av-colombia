<<<<<<<< HEAD:public/build/assets/index-DQO60pJI.js
import{D as p,e4 as c}from"./app-Dgn1WH-d.js";import{s as f}from"./index-BdJR5ShC.js";var l=`
========
import{D as p,e4 as c}from"./app-CotVKWk0.js";import{s as f}from"./index-YXukCeeU.js";var l=`
>>>>>>>> d563b7334f92db974bba3b2e034d449f353c6718:public/build/assets/index-BF37pvTL.js
.p-icon {
    display: inline-block;
    vertical-align: baseline;
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
`,u=p.extend({name:"baseicon",css:l});function i(n){"@babel/helpers - typeof";return i=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(n)}function o(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter(function(s){return Object.getOwnPropertyDescriptor(n,s).enumerable})),t.push.apply(t,r)}return t}function a(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?o(Object(t),!0).forEach(function(r){b(n,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach(function(r){Object.defineProperty(n,r,Object.getOwnPropertyDescriptor(t,r))})}return n}function b(n,e,t){return(e=y(e))in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function y(n){var e=m(n,"string");return i(e)=="symbol"?e:e+""}function m(n,e){if(i(n)!="object"||!n)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var r=t.call(n,e);if(i(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}var v={name:"BaseIcon",extends:f,props:{label:{type:String,default:void 0},spin:{type:Boolean,default:!1}},style:u,provide:function(){return{$pcIcon:this,$parentInstance:this}},methods:{pti:function(){var e=c(this.label);return a(a({},!this.isUnstyled&&{class:["p-icon",{"p-icon-spin":this.spin}]}),{},{role:e?void 0:"img","aria-label":e?void 0:this.label,"aria-hidden":e})}}};export{v as s};
