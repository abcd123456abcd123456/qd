(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{"1e4b":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("h-tabs",{attrs:{value:"name1"}},[r("h-tab-pane",{staticStyle:{height:"400px"},attrs:{label:"标签一",name:"name1"}},[r("div",[r("h-form",{ref:"productForm",staticClass:"productForm",attrs:{model:t.productForm,"label-position":"left","label-width":100,rules:t.ruleValidate}},[r("h-row",[r("h-col",{attrs:{span:"16"}},[r("h-form-item",{attrs:{label:"产品代码：",prop:"productId"}},[r("h-select",{staticStyle:{width:"300px"},attrs:{filterable:"",remote:"","remote-method":t.remoteMethod,remoteIcon:"search",loading:t.loading,"loading-text":t.loadingText,placeholder:"请输入"},model:{value:t.productForm.input1,callback:function(e){t.$set(t.productForm,"input1",e)},expression:"productForm.input1"}},t._l(t.productOptions,(function(e){return r("h-option",{key:e.value,attrs:{value:e.value}},[t._v(t._s(e.label))])})),1)],1)],1)],1),t._v(" "),r("h-row",[r("h-col",{attrs:{span:"16"}},[r("h-form-item",{attrs:{label:"可用银行卡：",prop:"bankCard"}},[r("h-select",{staticStyle:{width:"300px"},model:{value:t.productForm.input3,callback:function(e){t.$set(t.productForm,"input3",e)},expression:"productForm.input3"}},t._l(t.bankCardOptions,(function(e){return r("h-option",{key:e.value,attrs:{value:e.value}},[t._v(t._s(e.value)+"\n                ")])})),1)],1)],1)],1),t._v(" "),r("h-row",[r("h-col",{attrs:{span:"16"}},[r("h-form-item",{attrs:{label:"姓名",prop:"amount"}},[r("h-input",{attrs:{placeholder:"请输入姓名"},model:{value:t.productForm.name,callback:function(e){t.$set(t.productForm,"name",e)},expression:"productForm.name"}})],1)],1)],1),t._v(" "),r("h-form-item",{attrs:{label:"产品风险等级："}},[r("h-input",{attrs:{placeholder:"请输入"},model:{value:t.productForm.input6,callback:function(e){t.$set(t.productForm,"input6",e)},expression:"productForm.input6"}})],1),t._v(" "),r("h-form-item",{staticStyle:{"text-align":"center"}},[r("h-button",{staticStyle:{"text-align":"center",width:"100px"},attrs:{type:"primary"},on:{click:function(e){return t.handleSubmit("productForm")}}},[t._v("申购")])],1)],1)],1)]),t._v(" "),r("h-tab-pane",{attrs:{label:"标签二",name:"name2"}})],1)},n=[],o=r("9523"),l=r.n(o),i={data:function(){var t;return t={value:"",loading:!1,loadingText:"",userOptions:[],productOptions:[],bankCardOptions:[],userForm:{input1:"",input2:"",input3:"",input4:"",input5:""},productForm:{input1:"",input2:"",input3:"",input4:"",input5:"",input6:"",name:""}},l()(t,"productOptions",[{label:"Plabel1",value:"Pvalue1"},{label:"Plabel2",value:"Pvalue2"},{label:"Plabel3",value:"Pvalue3"}]),l()(t,"bankCardOptions",[{label:"Blabel1",value:"Bvalue1"},{label:"Blabel2",value:"Bvalue2"},{label:"Blabel3",value:"Bvalue3"}]),l()(t,"ruleValidate",{bankCard:[{required:!0,message:"请选择使用的银行卡",trigger:"change"}],amount:[{required:!0,message:"姓名不能为空",trigger:"blur"}],productId:[{required:!0,message:"请选择产品代码",trigger:"change"}],name:[{required:!0,message:"姓名不能为空",trigger:"blur"}]}),t},methods:{onkeydown:function(){this.$hMessage.info("选中账号自动填入")},remoteMethod:function(){},handleSubmit:function(t){var e=this;console.log(this.$refs.productForm.validate),this.$refs[t].validate((function(t){t?e.$hMessage.success("申购成功!"):e.$hMessage.error("表单验证失败!")}))}}},u=i,s=r("be97"),p=Object(s["a"])(u,a,n,!1,null,null,null);e["default"]=p.exports},be97:function(t,e,r){"use strict";function a(t,e,r,a,n,o,l,i){var u,s="function"===typeof t?t.options:t;if(e&&(s.render=e,s.staticRenderFns=r,s._compiled=!0),a&&(s.functional=!0),o&&(s._scopeId="data-v-"+o),l?(u=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),n&&n.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(l)},s._ssrRegister=u):n&&(u=i?function(){n.call(this,(s.functional?this.parent:this).$root.$options.shadowRoot)}:n),u)if(s.functional){s._injectStyles=u;var p=s.render;s.render=function(t,e){return u.call(e),p(t,e)}}else{var c=s.beforeCreate;s.beforeCreate=c?[].concat(c,u):[u]}return{exports:t,options:s}}r.d(e,"a",(function(){return a}))}}]);