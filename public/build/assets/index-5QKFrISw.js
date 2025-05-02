import{o as d,f as l,a as r,A as i,B as u,dO as p,e_ as w,e as h,r as g,c as b,g as y,n as C}from"./app-C86xMVSU.js";import{s as B}from"./index-q6QNEmRt.js";import{s as $}from"./index-CBU7g8u-.js";import{a as k}from"./index-BoZNN3v_.js";import{s as S}from"./index-DnxoQoQ5.js";import{s as z}from"./index-Da39xIws.js";var f={name:"MinusIcon",extends:$};function T(o,t,n,c,a,e){return d(),l("svg",i({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},o.pti()),t[0]||(t[0]=[r("path",{d:"M13.2222 7.77778H0.777778C0.571498 7.77778 0.373667 7.69584 0.227806 7.54998C0.0819442 7.40412 0 7.20629 0 7.00001C0 6.79373 0.0819442 6.5959 0.227806 6.45003C0.373667 6.30417 0.571498 6.22223 0.777778 6.22223H13.2222C13.4285 6.22223 13.6263 6.30417 13.7722 6.45003C13.9181 6.5959 14 6.79373 14 7.00001C14 7.20629 13.9181 7.40412 13.7722 7.54998C13.6263 7.69584 13.4285 7.77778 13.2222 7.77778Z",fill:"currentColor"},null,-1)]),16)}f.render=T;var O=function(t){var n=t.dt;return`
.p-checkbox {
    position: relative;
    display: inline-flex;
    user-select: none;
    vertical-align: bottom;
    width: `.concat(n("checkbox.width"),`;
    height: `).concat(n("checkbox.height"),`;
}

.p-checkbox-input {
    cursor: pointer;
    appearance: none;
    position: absolute;
    inset-block-start: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: 1;
    outline: 0 none;
    border: 1px solid transparent;
    border-radius: `).concat(n("checkbox.border.radius"),`;
}

.p-checkbox-box {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: `).concat(n("checkbox.border.radius"),`;
    border: 1px solid `).concat(n("checkbox.border.color"),`;
    background: `).concat(n("checkbox.background"),`;
    width: `).concat(n("checkbox.width"),`;
    height: `).concat(n("checkbox.height"),`;
    transition: background `).concat(n("checkbox.transition.duration"),", color ").concat(n("checkbox.transition.duration"),", border-color ").concat(n("checkbox.transition.duration"),", box-shadow ").concat(n("checkbox.transition.duration"),", outline-color ").concat(n("checkbox.transition.duration"),`;
    outline-color: transparent;
    box-shadow: `).concat(n("checkbox.shadow"),`;
}

.p-checkbox-icon {
    transition-duration: `).concat(n("checkbox.transition.duration"),`;
    color: `).concat(n("checkbox.icon.color"),`;
    font-size: `).concat(n("checkbox.icon.size"),`;
    width: `).concat(n("checkbox.icon.size"),`;
    height: `).concat(n("checkbox.icon.size"),`;
}

.p-checkbox:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
    border-color: `).concat(n("checkbox.hover.border.color"),`;
}

.p-checkbox-checked .p-checkbox-box {
    border-color: `).concat(n("checkbox.checked.border.color"),`;
    background: `).concat(n("checkbox.checked.background"),`;
}

.p-checkbox-checked .p-checkbox-icon {
    color: `).concat(n("checkbox.icon.checked.color"),`;
}

.p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
    background: `).concat(n("checkbox.checked.hover.background"),`;
    border-color: `).concat(n("checkbox.checked.hover.border.color"),`;
}

.p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-icon {
    color: `).concat(n("checkbox.icon.checked.hover.color"),`;
}

.p-checkbox:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
    border-color: `).concat(n("checkbox.focus.border.color"),`;
    box-shadow: `).concat(n("checkbox.focus.ring.shadow"),`;
    outline: `).concat(n("checkbox.focus.ring.width")," ").concat(n("checkbox.focus.ring.style")," ").concat(n("checkbox.focus.ring.color"),`;
    outline-offset: `).concat(n("checkbox.focus.ring.offset"),`;
}

.p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
    border-color: `).concat(n("checkbox.checked.focus.border.color"),`;
}

.p-checkbox.p-invalid > .p-checkbox-box {
    border-color: `).concat(n("checkbox.invalid.border.color"),`;
}

.p-checkbox.p-variant-filled .p-checkbox-box {
    background: `).concat(n("checkbox.filled.background"),`;
}

.p-checkbox-checked.p-variant-filled .p-checkbox-box {
    background: `).concat(n("checkbox.checked.background"),`;
}

.p-checkbox-checked.p-variant-filled:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
    background: `).concat(n("checkbox.checked.hover.background"),`;
}

.p-checkbox.p-disabled {
    opacity: 1;
}

.p-checkbox.p-disabled .p-checkbox-box {
    background: `).concat(n("checkbox.disabled.background"),`;
    border-color: `).concat(n("checkbox.checked.disabled.border.color"),`;
}

.p-checkbox.p-disabled .p-checkbox-box .p-checkbox-icon {
    color: `).concat(n("checkbox.icon.disabled.color"),`;
}

.p-checkbox-sm,
.p-checkbox-sm .p-checkbox-box {
    width: `).concat(n("checkbox.sm.width"),`;
    height: `).concat(n("checkbox.sm.height"),`;
}

.p-checkbox-sm .p-checkbox-icon {
    font-size: `).concat(n("checkbox.icon.sm.size"),`;
    width: `).concat(n("checkbox.icon.sm.size"),`;
    height: `).concat(n("checkbox.icon.sm.size"),`;
}

.p-checkbox-lg,
.p-checkbox-lg .p-checkbox-box {
    width: `).concat(n("checkbox.lg.width"),`;
    height: `).concat(n("checkbox.lg.height"),`;
}

.p-checkbox-lg .p-checkbox-icon {
    font-size: `).concat(n("checkbox.icon.lg.size"),`;
    width: `).concat(n("checkbox.icon.lg.size"),`;
    height: `).concat(n("checkbox.icon.lg.size"),`;
}
`)},F={root:function(t){var n=t.instance,c=t.props;return["p-checkbox p-component",{"p-checkbox-checked":n.checked,"p-disabled":c.disabled,"p-invalid":n.$pcCheckboxGroup?n.$pcCheckboxGroup.$invalid:n.$invalid,"p-variant-filled":n.$variant==="filled","p-checkbox-sm p-inputfield-sm":c.size==="small","p-checkbox-lg p-inputfield-lg":c.size==="large"}]},box:"p-checkbox-box",input:"p-checkbox-input",icon:"p-checkbox-icon"},I=u.extend({name:"checkbox",theme:O,classes:F}),G={name:"BaseCheckbox",extends:k,props:{value:null,binary:Boolean,indeterminate:{type:Boolean,default:!1},trueValue:{type:null,default:!0},falseValue:{type:null,default:!1},readonly:{type:Boolean,default:!1},required:{type:Boolean,default:!1},tabindex:{type:Number,default:null},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:I,provide:function(){return{$pcCheckbox:this,$parentInstance:this}}};function P(o){return L(o)||j(o)||N(o)||A()}function A(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function N(o,t){if(o){if(typeof o=="string")return s(o,t);var n={}.toString.call(o).slice(8,-1);return n==="Object"&&o.constructor&&(n=o.constructor.name),n==="Map"||n==="Set"?Array.from(o):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(o,t):void 0}}function j(o){if(typeof Symbol<"u"&&o[Symbol.iterator]!=null||o["@@iterator"]!=null)return Array.from(o)}function L(o){if(Array.isArray(o))return s(o)}function s(o,t){(t==null||t>o.length)&&(t=o.length);for(var n=0,c=Array(t);n<t;n++)c[n]=o[n];return c}var R={name:"Checkbox",extends:G,inheritAttrs:!1,emits:["change","focus","blur","update:indeterminate"],inject:{$pcCheckboxGroup:{default:void 0}},data:function(){return{d_indeterminate:this.indeterminate}},watch:{indeterminate:function(t){this.d_indeterminate=t}},methods:{getPTOptions:function(t){var n=t==="root"?this.ptmi:this.ptm;return n(t,{context:{checked:this.checked,indeterminate:this.d_indeterminate,disabled:this.disabled}})},onChange:function(t){var n=this;if(!this.disabled&&!this.readonly){var c=this.$pcCheckboxGroup?this.$pcCheckboxGroup.d_value:this.d_value,a;this.binary?a=this.d_indeterminate?this.trueValue:this.checked?this.falseValue:this.trueValue:this.checked||this.d_indeterminate?a=c.filter(function(e){return!p(e,n.value)}):a=c?[].concat(P(c),[this.value]):[this.value],this.d_indeterminate&&(this.d_indeterminate=!1,this.$emit("update:indeterminate",this.d_indeterminate)),this.$pcCheckboxGroup?this.$pcCheckboxGroup.writeValue(a,t):this.writeValue(a,t),this.$emit("change",t)}},onFocus:function(t){this.$emit("focus",t)},onBlur:function(t){var n,c;this.$emit("blur",t),(n=(c=this.formField).onBlur)===null||n===void 0||n.call(c,t)}},computed:{groupName:function(){return this.$pcCheckboxGroup?this.$pcCheckboxGroup.groupName:this.$formName},checked:function(){var t=this.$pcCheckboxGroup?this.$pcCheckboxGroup.d_value:this.d_value;return this.d_indeterminate?!1:this.binary?t===this.trueValue:w(this.value,t)}},components:{CheckIcon:B,MinusIcon:f}},V=["data-p-checked","data-p-indeterminate","data-p-disabled"],q=["id","value","name","checked","tabindex","disabled","readonly","required","aria-labelledby","aria-label","aria-invalid","aria-checked"];function D(o,t,n,c,a,e){var x=h("CheckIcon"),v=h("MinusIcon");return d(),l("div",i({class:o.cx("root")},e.getPTOptions("root"),{"data-p-checked":e.checked,"data-p-indeterminate":a.d_indeterminate||void 0,"data-p-disabled":o.disabled}),[r("input",i({id:o.inputId,type:"checkbox",class:[o.cx("input"),o.inputClass],style:o.inputStyle,value:o.value,name:e.groupName,checked:e.checked,tabindex:o.tabindex,disabled:o.disabled,readonly:o.readonly,required:o.required,"aria-labelledby":o.ariaLabelledby,"aria-label":o.ariaLabel,"aria-invalid":o.invalid||void 0,"aria-checked":a.d_indeterminate?"mixed":void 0,onFocus:t[0]||(t[0]=function(){return e.onFocus&&e.onFocus.apply(e,arguments)}),onBlur:t[1]||(t[1]=function(){return e.onBlur&&e.onBlur.apply(e,arguments)}),onChange:t[2]||(t[2]=function(){return e.onChange&&e.onChange.apply(e,arguments)})},e.getPTOptions("input")),null,16,q),r("div",i({class:o.cx("box")},e.getPTOptions("box")),[g(o.$slots,"icon",{checked:e.checked,indeterminate:a.d_indeterminate,class:C(o.cx("icon"))},function(){return[e.checked?(d(),b(x,i({key:0,class:o.cx("icon")},e.getPTOptions("icon")),null,16,["class"])):a.d_indeterminate?(d(),b(v,i({key:1,class:o.cx("icon")},e.getPTOptions("icon")),null,16,["class"])):y("",!0)]})],16)],16,V)}R.render=D;var H=function(t){var n=t.dt;return`
.p-radiobutton {
    position: relative;
    display: inline-flex;
    user-select: none;
    vertical-align: bottom;
    width: `.concat(n("radiobutton.width"),`;
    height: `).concat(n("radiobutton.height"),`;
}

.p-radiobutton-input {
    cursor: pointer;
    appearance: none;
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: 1;
    outline: 0 none;
    border: 1px solid transparent;
    border-radius: 50%;
}

.p-radiobutton-box {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 1px solid `).concat(n("radiobutton.border.color"),`;
    background: `).concat(n("radiobutton.background"),`;
    width: `).concat(n("radiobutton.width"),`;
    height: `).concat(n("radiobutton.height"),`;
    transition: background `).concat(n("radiobutton.transition.duration"),", color ").concat(n("radiobutton.transition.duration"),", border-color ").concat(n("radiobutton.transition.duration"),", box-shadow ").concat(n("radiobutton.transition.duration"),", outline-color ").concat(n("radiobutton.transition.duration"),`;
    outline-color: transparent;
    box-shadow: `).concat(n("radiobutton.shadow"),`;
}

.p-radiobutton-icon {
    transition-duration: `).concat(n("radiobutton.transition.duration"),`;
    background: transparent;
    font-size: `).concat(n("radiobutton.icon.size"),`;
    width: `).concat(n("radiobutton.icon.size"),`;
    height: `).concat(n("radiobutton.icon.size"),`;
    border-radius: 50%;
    backface-visibility: hidden;
    transform: translateZ(0) scale(0.1);
}

.p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:hover) .p-radiobutton-box {
    border-color: `).concat(n("radiobutton.hover.border.color"),`;
}

.p-radiobutton-checked .p-radiobutton-box {
    border-color: `).concat(n("radiobutton.checked.border.color"),`;
    background: `).concat(n("radiobutton.checked.background"),`;
}

.p-radiobutton-checked .p-radiobutton-box .p-radiobutton-icon {
    background: `).concat(n("radiobutton.icon.checked.color"),`;
    transform: translateZ(0) scale(1, 1);
    visibility: visible;
}

.p-radiobutton-checked:not(.p-disabled):has(.p-radiobutton-input:hover) .p-radiobutton-box {
    border-color: `).concat(n("radiobutton.checked.hover.border.color"),`;
    background: `).concat(n("radiobutton.checked.hover.background"),`;
}

.p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:hover).p-radiobutton-checked .p-radiobutton-box .p-radiobutton-icon {
    background: `).concat(n("radiobutton.icon.checked.hover.color"),`;
}

.p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {
    border-color: `).concat(n("radiobutton.focus.border.color"),`;
    box-shadow: `).concat(n("radiobutton.focus.ring.shadow"),`;
    outline: `).concat(n("radiobutton.focus.ring.width")," ").concat(n("radiobutton.focus.ring.style")," ").concat(n("radiobutton.focus.ring.color"),`;
    outline-offset: `).concat(n("radiobutton.focus.ring.offset"),`;
}

.p-radiobutton-checked:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {
    border-color: `).concat(n("radiobutton.checked.focus.border.color"),`;
}

.p-radiobutton.p-invalid > .p-radiobutton-box {
    border-color: `).concat(n("radiobutton.invalid.border.color"),`;
}

.p-radiobutton.p-variant-filled .p-radiobutton-box {
    background: `).concat(n("radiobutton.filled.background"),`;
}

.p-radiobutton.p-variant-filled.p-radiobutton-checked .p-radiobutton-box {
    background: `).concat(n("radiobutton.checked.background"),`;
}

.p-radiobutton.p-variant-filled:not(.p-disabled):has(.p-radiobutton-input:hover).p-radiobutton-checked .p-radiobutton-box {
    background: `).concat(n("radiobutton.checked.hover.background"),`;
}

.p-radiobutton.p-disabled {
    opacity: 1;
}

.p-radiobutton.p-disabled .p-radiobutton-box {
    background: `).concat(n("radiobutton.disabled.background"),`;
    border-color: `).concat(n("radiobutton.checked.disabled.border.color"),`;
}

.p-radiobutton-checked.p-disabled .p-radiobutton-box .p-radiobutton-icon {
    background: `).concat(n("radiobutton.icon.disabled.color"),`;
}

.p-radiobutton-sm,
.p-radiobutton-sm .p-radiobutton-box {
    width: `).concat(n("radiobutton.sm.width"),`;
    height: `).concat(n("radiobutton.sm.height"),`;
}

.p-radiobutton-sm .p-radiobutton-icon {
    font-size: `).concat(n("radiobutton.icon.sm.size"),`;
    width: `).concat(n("radiobutton.icon.sm.size"),`;
    height: `).concat(n("radiobutton.icon.sm.size"),`;
}

.p-radiobutton-lg,
.p-radiobutton-lg .p-radiobutton-box {
    width: `).concat(n("radiobutton.lg.width"),`;
    height: `).concat(n("radiobutton.lg.height"),`;
}

.p-radiobutton-lg .p-radiobutton-icon {
    font-size: `).concat(n("radiobutton.icon.lg.size"),`;
    width: `).concat(n("radiobutton.icon.lg.size"),`;
    height: `).concat(n("radiobutton.icon.lg.size"),`;
}
`)},U={root:function(t){var n=t.instance,c=t.props;return["p-radiobutton p-component",{"p-radiobutton-checked":n.checked,"p-disabled":c.disabled,"p-invalid":n.$pcRadioButtonGroup?n.$pcRadioButtonGroup.$invalid:n.$invalid,"p-variant-filled":n.$variant==="filled","p-radiobutton-sm p-inputfield-sm":c.size==="small","p-radiobutton-lg p-inputfield-lg":c.size==="large"}]},box:"p-radiobutton-box",input:"p-radiobutton-input",icon:"p-radiobutton-icon"},Z=u.extend({name:"radiobutton",theme:H,classes:U}),E={name:"BaseRadioButton",extends:k,props:{value:null,binary:Boolean,readonly:{type:Boolean,default:!1},tabindex:{type:Number,default:null},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:Z,provide:function(){return{$pcRadioButton:this,$parentInstance:this}}},M={name:"RadioButton",extends:E,inheritAttrs:!1,emits:["change","focus","blur"],inject:{$pcRadioButtonGroup:{default:void 0}},methods:{getPTOptions:function(t){var n=t==="root"?this.ptmi:this.ptm;return n(t,{context:{checked:this.checked,disabled:this.disabled}})},onChange:function(t){if(!this.disabled&&!this.readonly){var n=this.binary?!this.checked:this.value;this.$pcRadioButtonGroup?this.$pcRadioButtonGroup.writeValue(n,t):this.writeValue(n,t),this.$emit("change",t)}},onFocus:function(t){this.$emit("focus",t)},onBlur:function(t){var n,c;this.$emit("blur",t),(n=(c=this.formField).onBlur)===null||n===void 0||n.call(c,t)}},computed:{groupName:function(){return this.$pcRadioButtonGroup?this.$pcRadioButtonGroup.groupName:this.$formName},checked:function(){var t=this.$pcRadioButtonGroup?this.$pcRadioButtonGroup.d_value:this.d_value;return t!=null&&(this.binary?!!t:p(t,this.value))}}},W=["data-p-checked","data-p-disabled"],J=["id","value","name","checked","tabindex","disabled","readonly","aria-labelledby","aria-label","aria-invalid"];function K(o,t,n,c,a,e){return d(),l("div",i({class:o.cx("root")},e.getPTOptions("root"),{"data-p-checked":e.checked,"data-p-disabled":o.disabled}),[r("input",i({id:o.inputId,type:"radio",class:[o.cx("input"),o.inputClass],style:o.inputStyle,value:o.value,name:e.groupName,checked:e.checked,tabindex:o.tabindex,disabled:o.disabled,readonly:o.readonly,"aria-labelledby":o.ariaLabelledby,"aria-label":o.ariaLabel,"aria-invalid":o.invalid||void 0,onFocus:t[0]||(t[0]=function(){return e.onFocus&&e.onFocus.apply(e,arguments)}),onBlur:t[1]||(t[1]=function(){return e.onBlur&&e.onBlur.apply(e,arguments)}),onChange:t[2]||(t[2]=function(){return e.onChange&&e.onChange.apply(e,arguments)})},e.getPTOptions("input")),null,16,J),r("div",i({class:o.cx("box")},e.getPTOptions("box")),[r("div",i({class:o.cx("icon")},e.getPTOptions("icon")),null,16)],16)],16,W)}M.render=K;var Q=function(t){var n=t.dt;return`
.p-toggleswitch {
    display: inline-block;
    width: `.concat(n("toggleswitch.width"),`;
    height: `).concat(n("toggleswitch.height"),`;
}

.p-toggleswitch-input {
    cursor: pointer;
    appearance: none;
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: 1;
    outline: 0 none;
    border-radius: `).concat(n("toggleswitch.border.radius"),`;
}

.p-toggleswitch-slider {
    cursor: pointer;
    width: 100%;
    height: 100%;
    border-width: `).concat(n("toggleswitch.border.width"),`;
    border-style: solid;
    border-color: `).concat(n("toggleswitch.border.color"),`;
    background: `).concat(n("toggleswitch.background"),`;
    transition: background `).concat(n("toggleswitch.transition.duration"),", color ").concat(n("toggleswitch.transition.duration"),", border-color ").concat(n("toggleswitch.transition.duration"),", outline-color ").concat(n("toggleswitch.transition.duration"),", box-shadow ").concat(n("toggleswitch.transition.duration"),`;
    border-radius: `).concat(n("toggleswitch.border.radius"),`;
    outline-color: transparent;
    box-shadow: `).concat(n("toggleswitch.shadow"),`;
}

.p-toggleswitch-handle {
    position: absolute;
    top: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: `).concat(n("toggleswitch.handle.background"),`;
    color: `).concat(n("toggleswitch.handle.color"),`;
    width: `).concat(n("toggleswitch.handle.size"),`;
    height: `).concat(n("toggleswitch.handle.size"),`;
    inset-inline-start: `).concat(n("toggleswitch.gap"),`;
    margin-block-start: calc(-1 * calc(`).concat(n("toggleswitch.handle.size"),` / 2));
    border-radius: `).concat(n("toggleswitch.handle.border.radius"),`;
    transition: background `).concat(n("toggleswitch.transition.duration"),", color ").concat(n("toggleswitch.transition.duration"),", inset-inline-start ").concat(n("toggleswitch.slide.duration"),", box-shadow ").concat(n("toggleswitch.slide.duration"),`;
}

.p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider {
    background: `).concat(n("toggleswitch.checked.background"),`;
    border-color: `).concat(n("toggleswitch.checked.border.color"),`;
}

.p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-handle {
    background: `).concat(n("toggleswitch.handle.checked.background"),`;
    color: `).concat(n("toggleswitch.handle.checked.color"),`;
    inset-inline-start: calc(`).concat(n("toggleswitch.width")," - calc(").concat(n("toggleswitch.handle.size")," + ").concat(n("toggleswitch.gap"),`));
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-slider {
    background: `).concat(n("toggleswitch.hover.background"),`;
    border-color: `).concat(n("toggleswitch.hover.border.color"),`;
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-handle {
    background: `).concat(n("toggleswitch.handle.hover.background"),`;
    color: `).concat(n("toggleswitch.handle.hover.color"),`;
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-slider {
    background: `).concat(n("toggleswitch.checked.hover.background"),`;
    border-color: `).concat(n("toggleswitch.checked.hover.border.color"),`;
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-handle {
    background: `).concat(n("toggleswitch.handle.checked.hover.background"),`;
    color: `).concat(n("toggleswitch.handle.checked.hover.color"),`;
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:focus-visible) .p-toggleswitch-slider {
    box-shadow: `).concat(n("toggleswitch.focus.ring.shadow"),`;
    outline: `).concat(n("toggleswitch.focus.ring.width")," ").concat(n("toggleswitch.focus.ring.style")," ").concat(n("toggleswitch.focus.ring.color"),`;
    outline-offset: `).concat(n("toggleswitch.focus.ring.offset"),`;
}

.p-toggleswitch.p-invalid > .p-toggleswitch-slider {
    border-color: `).concat(n("toggleswitch.invalid.border.color"),`;
}

.p-toggleswitch.p-disabled {
    opacity: 1;
}

.p-toggleswitch.p-disabled .p-toggleswitch-slider {
    background: `).concat(n("toggleswitch.disabled.background"),`;
}

.p-toggleswitch.p-disabled .p-toggleswitch-handle {
    background: `).concat(n("toggleswitch.handle.disabled.background"),`;
}
`)},X={root:{position:"relative"}},Y={root:function(t){var n=t.instance,c=t.props;return["p-toggleswitch p-component",{"p-toggleswitch-checked":n.checked,"p-disabled":c.disabled,"p-invalid":n.$invalid}]},input:"p-toggleswitch-input",slider:"p-toggleswitch-slider",handle:"p-toggleswitch-handle"},_=u.extend({name:"toggleswitch",theme:Q,classes:Y,inlineStyles:X}),nn={name:"BaseToggleSwitch",extends:S,props:{trueValue:{type:null,default:!0},falseValue:{type:null,default:!1},readonly:{type:Boolean,default:!1},tabindex:{type:Number,default:null},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:_,provide:function(){return{$pcToggleSwitch:this,$parentInstance:this}}},m={name:"ToggleSwitch",extends:nn,inheritAttrs:!1,emits:["change","focus","blur"],methods:{getPTOptions:function(t){var n=t==="root"?this.ptmi:this.ptm;return n(t,{context:{checked:this.checked,disabled:this.disabled}})},onChange:function(t){if(!this.disabled&&!this.readonly){var n=this.checked?this.falseValue:this.trueValue;this.writeValue(n,t),this.$emit("change",t)}},onFocus:function(t){this.$emit("focus",t)},onBlur:function(t){var n,c;this.$emit("blur",t),(n=(c=this.formField).onBlur)===null||n===void 0||n.call(c,t)}},computed:{checked:function(){return this.d_value===this.trueValue}}},on=["data-p-checked","data-p-disabled"],tn=["id","checked","tabindex","disabled","readonly","aria-checked","aria-labelledby","aria-label","aria-invalid"];function en(o,t,n,c,a,e){return d(),l("div",i({class:o.cx("root"),style:o.sx("root")},e.getPTOptions("root"),{"data-p-checked":e.checked,"data-p-disabled":o.disabled}),[r("input",i({id:o.inputId,type:"checkbox",role:"switch",class:[o.cx("input"),o.inputClass],style:o.inputStyle,checked:e.checked,tabindex:o.tabindex,disabled:o.disabled,readonly:o.readonly,"aria-checked":e.checked,"aria-labelledby":o.ariaLabelledby,"aria-label":o.ariaLabel,"aria-invalid":o.invalid||void 0,onFocus:t[0]||(t[0]=function(){return e.onFocus&&e.onFocus.apply(e,arguments)}),onBlur:t[1]||(t[1]=function(){return e.onBlur&&e.onBlur.apply(e,arguments)}),onChange:t[2]||(t[2]=function(){return e.onChange&&e.onChange.apply(e,arguments)})},e.getPTOptions("input")),null,16,tn),r("div",i({class:o.cx("slider")},e.getPTOptions("slider")),[r("div",i({class:o.cx("handle")},e.getPTOptions("handle")),[g(o.$slots,"handle",{checked:e.checked})],16)],16)],16,on)}m.render=en;var un={name:"InputSwitch",extends:m,mounted:function(){console.warn("Deprecated since v4. Use ToggleSwitch component instead.")}},hn={name:"Dropdown",extends:z,mounted:function(){console.warn("Deprecated since v4. Use Select component instead.")}};export{R as a,hn as b,un as c,M as s};
