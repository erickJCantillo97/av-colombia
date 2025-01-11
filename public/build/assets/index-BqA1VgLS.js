import{B as d,et as c,S as b,l as p,o as r,f as i,a as g,r as u,n as f,z as a,g as h,t as m}from"./app-BZsVBZM0.js";import{R as v}from"./index-DQM8xvXQ.js";import{s as k}from"./index-Drki_R-n.js";var y=function(n){var t=n.dt;return`
.p-togglebutton {
    display: inline-flex;
    cursor: pointer;
    user-select: none;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    color: `.concat(t("togglebutton.color"),`;
    background: `).concat(t("togglebutton.background"),`;
    border: 1px solid `).concat(t("togglebutton.border.color"),`;
    padding: `).concat(t("togglebutton.padding"),`;
    font-size: 1rem;
    font-family: inherit;
    font-feature-settings: inherit;
    transition: background `).concat(t("togglebutton.transition.duration"),", color ").concat(t("togglebutton.transition.duration"),", border-color ").concat(t("togglebutton.transition.duration"),`,
        outline-color `).concat(t("togglebutton.transition.duration"),", box-shadow ").concat(t("togglebutton.transition.duration"),`;
    border-radius: `).concat(t("togglebutton.border.radius"),`;
    outline-color: transparent;
    font-weight: `).concat(t("togglebutton.font.weight"),`;
}

.p-togglebutton-content {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: `).concat(t("togglebutton.gap"),`;
}

.p-togglebutton-label,
.p-togglebutton-icon {
    position: relative;
    transition: none;
}

.p-togglebutton::before {
    content: "";
    background: transparent;
    transition: background `).concat(t("togglebutton.transition.duration"),", color ").concat(t("togglebutton.transition.duration"),", border-color ").concat(t("togglebutton.transition.duration"),`,
            outline-color `).concat(t("togglebutton.transition.duration"),", box-shadow ").concat(t("togglebutton.transition.duration"),`;
    position: absolute;
    left: `).concat(t("togglebutton.content.left"),`;
    top: `).concat(t("togglebutton.content.top"),`;
    width: calc(100% - calc(2 *  `).concat(t("togglebutton.content.left"),`));
    height: calc(100% - calc(2 *  `).concat(t("togglebutton.content.top"),`));
    border-radius: `).concat(t("togglebutton.border.radius"),`;
}

.p-togglebutton.p-togglebutton-checked::before {
    background: `).concat(t("togglebutton.content.checked.background"),`;
    box-shadow: `).concat(t("togglebutton.content.checked.shadow"),`;
}

.p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover {
    background: `).concat(t("togglebutton.hover.background"),`;
    color: `).concat(t("togglebutton.hover.color"),`;
}

.p-togglebutton.p-togglebutton-checked {
    background: `).concat(t("togglebutton.checked.background"),`;
    border-color: `).concat(t("togglebutton.checked.border.color"),`;
    color: `).concat(t("togglebutton.checked.color"),`;
}

.p-togglebutton:focus-visible {
    box-shadow: `).concat(t("togglebutton.focus.ring.shadow"),`;
    outline: `).concat(t("togglebutton.focus.ring.width")," ").concat(t("togglebutton.focus.ring.style")," ").concat(t("togglebutton.focus.ring.color"),`;
    outline-offset: `).concat(t("togglebutton.focus.ring.offset"),`;
}

.p-togglebutton.p-invalid {
    border-color: `).concat(t("togglebutton.invalid.border.color"),`;
}

.p-togglebutton:disabled {
    opacity: 1;
    cursor: default;
    background: `).concat(t("togglebutton.disabled.background"),`;
    border-color: `).concat(t("togglebutton.disabled.border.color"),`;
    color: `).concat(t("togglebutton.disabled.color"),`;
}

.p-togglebutton-icon {
    color: `).concat(t("togglebutton.icon.color"),`;
}

.p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover .p-togglebutton-icon {
    color: `).concat(t("togglebutton.icon.hover.color"),`;
}

.p-togglebutton.p-togglebutton-checked .p-togglebutton-icon {
    color: `).concat(t("togglebutton.icon.checked.color"),`;
}

.p-togglebutton:disabled .p-togglebutton-icon {
    color: `).concat(t("togglebutton.icon.disabled.color"),`;
}
`)},B={root:function(n){var t=n.instance,l=n.props;return["p-togglebutton p-component",{"p-togglebutton-checked":t.active,"p-invalid":l.invalid}]},content:"p-togglebutton-content",icon:"p-togglebutton-icon",label:"p-togglebutton-label"},w=d.extend({name:"togglebutton",theme:y,classes:B}),S={name:"BaseToggleButton",extends:k,props:{modelValue:Boolean,onIcon:String,offIcon:String,onLabel:{type:String,default:"Yes"},offLabel:{type:String,default:"No"},iconPos:{type:String,default:"left"},invalid:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},tabindex:{type:Number,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:w,provide:function(){return{$pcToggleButton:this,$parentInstance:this}}},L={name:"ToggleButton",extends:S,inheritAttrs:!1,emits:["update:modelValue","change"],methods:{getPTOptions:function(n){var t=n==="root"?this.ptmi:this.ptm;return t(n,{context:{active:this.active,disabled:this.disabled}})},onChange:function(n){!this.disabled&&!this.readonly&&(this.$emit("update:modelValue",!this.modelValue),this.$emit("change",n))}},computed:{active:function(){return this.modelValue===!0},hasLabel:function(){return c(this.onLabel)&&c(this.offLabel)},label:function(){return this.hasLabel?this.modelValue?this.onLabel:this.offLabel:"&nbsp;"}},directives:{ripple:v}},V=["tabindex","disabled","aria-pressed","data-p-checked","data-p-disabled"];function T(o,n,t,l,P,e){var s=b("ripple");return p((r(),i("button",a({type:"button",class:o.cx("root"),tabindex:o.tabindex,disabled:o.disabled,"aria-pressed":o.modelValue,onClick:n[0]||(n[0]=function(){return e.onChange&&e.onChange.apply(e,arguments)})},e.getPTOptions("root"),{"data-p-checked":e.active,"data-p-disabled":o.disabled}),[g("span",a({class:o.cx("content")},e.getPTOptions("content")),[u(o.$slots,"default",{},function(){return[u(o.$slots,"icon",{value:o.modelValue,class:f(o.cx("icon"))},function(){return[o.onIcon||o.offIcon?(r(),i("span",a({key:0,class:[o.cx("icon"),o.modelValue?o.onIcon:o.offIcon]},e.getPTOptions("icon")),null,16)):h("",!0)]}),g("span",a({class:o.cx("label")},e.getPTOptions("label")),m(e.label),17)]})],16)],16,V)),[[s]])}L.render=T;export{L as s};
