(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[11],{"10f8":function(t,e,a){},"2ba3":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{directives:[{name:"show",rawName:"v-show",value:!t.success,expression:"!success"}],staticClass:"body"},[o("div",{staticClass:"title"},[t._v("产品申购")]),t._v(" "),o("div",{staticClass:"search"},[o("h-form",{attrs:{"label-width":150}},[o("h-form-item",{staticClass:"label",attrs:{label:"账号输入"}},[o("h-select",{staticStyle:{width:"300px"},attrs:{filterable:"",remote:"","remote-method":t.userRemote,remoteIcon:"search",loading:t.loading,"loading-text":t.loadingText},on:{"on-change":function(e){return t.userChange(e)}},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},t._l(t.userOptions,(function(e){return o("h-option",{key:e.value,attrs:{value:e.value}},[t._v(t._s(e.label))])})),1)],1)],1)],1),t._v(" "),o("div",{staticClass:"userInfo"},[o("div",{staticClass:"userTitle"},[t._v("客户信息")]),t._v(" "),o("h-form",{staticClass:"userForm",attrs:{model:t.userForm,"label-position":"left","label-width":100}},[o("h-form-item",{attrs:{label:"客户名称："}},[o("h-input",{attrs:{readonly:""},on:{"on-keydown":t.onkeydown},model:{value:t.userForm.input1,callback:function(e){t.$set(t.userForm,"input1",e)},expression:"userForm.input1"}})],1),t._v(" "),o("h-form-item",{attrs:{label:"客户类型："}},[o("h-input",{attrs:{readonly:""},on:{"on-keydown":t.onkeydown},model:{value:t.userForm.input2,callback:function(e){t.$set(t.userForm,"input2",e)},expression:"userForm.input2"}})],1),t._v(" "),o("h-row",[o("h-col",{attrs:{span:"12"}},[o("h-form-item",{attrs:{label:"证件类型："}},[o("h-input",{attrs:{readonly:""},on:{"on-keydown":t.onkeydown},model:{value:t.userForm.input3,callback:function(e){t.$set(t.userForm,"input3",e)},expression:"userForm.input3"}})],1)],1),t._v(" "),o("h-col",{attrs:{span:"12"}},[o("h-form-item",{attrs:{label:"证件号码："}},[o("h-input",{attrs:{readonly:""},on:{"on-keydown":t.onkeydown},model:{value:t.userForm.input4,callback:function(e){t.$set(t.userForm,"input4",e)},expression:"userForm.input4"}})],1)],1)],1),t._v(" "),o("h-form-item",{attrs:{label:"客户风险等级："}},[o("h-input",{attrs:{readonly:""},on:{"on-keydown":t.onkeydown},model:{value:t.userForm.input5,callback:function(e){t.$set(t.userForm,"input5",e)},expression:"userForm.input5"}})],1)],1)],1),t._v(" "),o("div",{staticClass:"productInfo"},[o("h-tabs",{attrs:{value:"name1"}},[o("h-tab-pane",{staticStyle:{height:"250px"},attrs:{label:"使用银行卡",name:"name1"}},[o("h-form",{ref:"productForm",staticClass:"productForm",attrs:{model:t.productForm,"label-position":"left","label-width":100,rules:t.ruleValidate}},[o("h-row",[o("h-col",{attrs:{span:"12"}},[o("h-form-item",{attrs:{label:"产品代码：",prop:"productId"}},[o("h-select",{staticStyle:{width:"300px"},attrs:{filterable:"",remote:"","remote-method":t.productRemote,remoteIcon:"search",loading:t.loading,"loading-text":t.loadingText,placeholder:"请输入"},on:{"on-change":t.productChange},model:{value:t.productForm.productId,callback:function(e){t.$set(t.productForm,"productId",e)},expression:"productForm.productId"}},t._l(t.productOptions,(function(e){return o("h-option",{key:e.value,attrs:{value:e.value}},[t._v(t._s(e.label))])})),1)],1)],1),t._v(" "),o("h-col",{attrs:{span:"12"}},[o("h-form-item",{attrs:{label:"产品名称："}},[o("h-input",{attrs:{readonly:"",placeholder:"选中产品代码自动填入"},model:{value:t.productForm.productName,callback:function(e){t.$set(t.productForm,"productName",e)},expression:"productForm.productName"}})],1)],1)],1),t._v(" "),o("h-row",[o("h-col",{attrs:{span:"12"}},[o("h-form-item",{attrs:{label:"可用银行卡：",prop:"bankCard"}},[o("h-select",{staticStyle:{width:"300px"},model:{value:t.productForm.bankCard,callback:function(e){t.$set(t.productForm,"bankCard",e)},expression:"productForm.bankCard"}},t._l(t.bankCardOptions,(function(e){return o("h-option",{key:e.value,attrs:{value:e.value}},[t._v(t._s(e.label)+"\n                    ")])})),1)],1)],1),t._v(" "),o("h-col",{attrs:{span:"12"}},[o("h-form-item",{attrs:{label:"可用余额："}},[o("h-input",{attrs:{readonly:"",placeholder:"选中银行卡自动填入"},model:{value:t.productForm.balance,callback:function(e){t.$set(t.productForm,"balance",e)},expression:"productForm.balance"}})],1)],1)],1),t._v(" "),o("h-form-item",{attrs:{label:"购买金额",prop:"amount"}},[o("h-input",{attrs:{placeholder:"请输入"},model:{value:t.productForm.amount,callback:function(e){t.$set(t.productForm,"amount",e)},expression:"productForm.amount"}})],1),t._v(" "),o("h-form-item",{attrs:{label:"产品风险等级："}},[o("h-input",{attrs:{readonly:"",placeholder:"选中产品代码自动填入"},model:{value:t.productForm.riskLevel,callback:function(e){t.$set(t.productForm,"riskLevel",e)},expression:"productForm.riskLevel"}})],1),t._v(" "),o("h-form-item",{staticStyle:{"text-align":"center"}},[o("h-button",{staticStyle:{"text-align":"center",width:"100px"},attrs:{type:"primary",disabled:t.disabled},on:{click:function(e){return t.handleSubmit("productForm")}}},[t._v(t._s(t.disabled?"无法申购":"申购"))])],1)],1)],1),t._v(" "),o("h-tab-pane",{staticStyle:{height:"250px"},attrs:{label:"使用虚拟账户",name:"name2"}},[o("h-form",{ref:"productForm_tab2",staticClass:"tab2",attrs:{model:t.productForm,"label-position":"left","label-width":100,rules:t.ruleValidate_tab2}},[o("h-row",[o("h-col",{attrs:{span:"12"}},[o("h-form-item",{attrs:{label:"产品代码：",prop:"productId"}},[o("h-select",{staticStyle:{width:"300px"},attrs:{filterable:"",remote:"","remote-method":t.productRemote,remoteIcon:"search",loading:t.loading,"loading-text":t.loadingText,placeholder:"请输入"},on:{"on-change":t.productChange},model:{value:t.productForm.productId,callback:function(e){t.$set(t.productForm,"productId",e)},expression:"productForm.productId"}},t._l(t.productOptions,(function(e){return o("h-option",{key:e.value,attrs:{value:e.value}},[t._v(t._s(e.label))])})),1)],1)],1),t._v(" "),o("h-col",{attrs:{span:"12"}},[o("h-form-item",{attrs:{label:"产品名称："}},[o("h-input",{attrs:{readonly:"",placeholder:"选中产品代码自动填入"},model:{value:t.productForm.productName,callback:function(e){t.$set(t.productForm,"productName",e)},expression:"productForm.productName"}})],1)],1)],1),t._v(" "),o("h-form-item",{attrs:{label:"虚拟账户余额"}},[o("h-input",{attrs:{readonly:"",placeholder:"自动获取填入"},model:{value:t.productForm.virtualAmount,callback:function(e){t.$set(t.productForm,"virtualAmount",e)},expression:"productForm.virtualAmount"}})],1),t._v(" "),o("h-form-item",{attrs:{label:"购买金额",prop:"amount"}},[o("h-input",{attrs:{placeholder:"请输入"},model:{value:t.productForm.amount,callback:function(e){t.$set(t.productForm,"amount",e)},expression:"productForm.amount"}})],1),t._v(" "),o("h-form-item",{attrs:{label:"产品风险等级："}},[o("h-input",{attrs:{placeholder:"选中产品代码自动填入",readonly:""},model:{value:t.productForm.riskLevel,callback:function(e){t.$set(t.productForm,"riskLevel",e)},expression:"productForm.riskLevel"}})],1),t._v(" "),o("h-form-item",{staticStyle:{"text-align":"center"}},[o("h-button",{staticStyle:{"text-align":"center",width:"100px"},attrs:{disabled:t.disabled,type:"primary"},on:{click:function(e){return t.handleSubmit_tab2("productForm_tab2")}}},[t._v(t._s(t.disabled?"无法申购":"申购")+"\n              ")])],1)],1)],1)],1)],1)]),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:t.success,expression:"success"}],ref:"success",staticClass:"successPrompt"},[o("img",{staticClass:"successPic",attrs:{src:a("82b2"),alt:""}}),t._v(" "),o("div",{staticClass:"msg"},[t._v("申购成功!")]),t._v(" "),o("div",{staticClass:"promptInfo"},[t._v("投资人姓名："+t._s(t.userForm.input1))]),t._v(" "),o("div",{staticClass:"promptInfo"},[t._v("交易账号："+t._s(t.value))]),t._v(" "),o("div",{staticStyle:{"text-align":"center"}},[o("div",{staticClass:"promptCell"},[t._v("\n        产品信息\n        "),o("br"),t._v("\n        "+t._s(t.productForm.productName)+"\n      ")]),t._v(" "),o("div",{staticClass:"promptCell"},[t._v("\n        购买金额\n        "),o("br"),t._v("\n        "+t._s(t.productForm.amount)+"\n      ")]),t._v(" "),o("div",{staticClass:"promptCell"},[t._v("\n        申请编号\n        "),o("br"),t._v("\n        "+t._s(t.applicationNumber)+"\n      ")])]),t._v(" "),o("div",{staticStyle:{"text-align":"center"}},[o("div",{staticClass:"date"},[t._v("下单日期："+t._s(t.date))]),t._v(" "),o("div",{staticClass:"date"},[t._v("预计确认日期："+t._s(t.expectedDate))])]),t._v(" "),o("div",{staticStyle:{"text-align":"center","margin-top":"45px"}},[o("div",{staticClass:"promptButton"},[o("h-button",{attrs:{type:"primary"},on:{click:t.further}},[t._v("继续购买")])],1),t._v(" "),o("div",{staticClass:"promptButton"},[o("h-button",{on:{click:t.back}},[t._v("完成并返回首页")])],1),t._v(" "),o("div",{staticClass:"promptButton"},[o("h-button",{on:{click:t.print}},[t._v("凭证打印")])],1)])])])},r=[],n=a("9523"),s=a.n(n),l=a("c0e9"),i=a.n(l),c=a("b802"),u={data:function(){var t,e=this,a=function(t){c["a"].fetch({method:"get",url:"http://timor.tech/api/holiday/info/2021-6-18"}).then((function(t){e.expectedDate=t})).catch((function(){e.$hMessage.error("sad")}))};return t={value:"000096",loading:!1,applicationNumber:"0012345678971237",loadingText:"",date:"2022-05-20",expectedDate:a(),disabled:!1,userOptions:[]},s()(t,"disabled",!1),s()(t,"productOptions",[]),s()(t,"bankCardOptions",[]),s()(t,"success",!1),s()(t,"userForm",{input1:"姚测1",input2:"客户名称",input3:"证件类型",input4:"证件号码",input5:"客户风险等级"}),s()(t,"productForm",{productId:"",productName:"产品名称",bankCard:"",balance:"",amount:"购买金额",riskLevel:"",virtualAmount:""}),s()(t,"ruleValidate",{bankCard:[{required:!0,message:"请选择使用的银行卡",trigger:"change"}],amount:[{required:!0,message:"购买余额不能为空",trigger:"blur"}],productId:[{required:!0,message:"请选择产品代码",trigger:"change"}]}),s()(t,"ruleValidate_tab2",{amount:[{required:!0,message:"购买余额不能为空",trigger:"blur"}],productId:[{required:!0,message:"请选择产品代码",trigger:"change"}]}),t},methods:{userChange:function(t){var e=this;c["a"].fetch({method:"get",url:"http://www.baidu.com",data:{userId:t}}).then((function(t){console.log(t.data)})).catch((function(){e.$hMessage.error("获取用户信息出错"),e.disabled=!0}))},productChange:function(t){var e=this;c["a"].fetch({method:"get",url:"http://www.baidu.com",data:{productId:t}}).then((function(t){console.log(t.data)})).catch((function(){e.$hMessage.error("获取用户信息出错"),e.disabled=!0}))},onkeydown:function(){this.$hMessage.info("选中账号自动填入")},userRemote:function(t){var e=this;c["a"].fetch({method:"get",url:"http://www.baidu.com",data:{userId:t}}).then((function(t){e.userOptions=t.data.map((function(t){return{value:t,label:t}}))})).catch((function(){e.$hMessage.error("获取用户ID出错")}))},productRemote:function(t){var e=this;c["a"].fetch({method:"get",url:"http://www.baidu.com",data:{prductId:t}}).then((function(t){e.productOptions=t.data.map((function(t){return{value:t,label:t}}))})).catch((function(){e.$hMessage.error("获取产品ID出错")}))},handleSubmit:function(t){var e=this;this.$refs[t].validate((function(t){t?c["a"].fetch({url:"#",data:{},method:"post"}).then((function(t){e.success=!0})).catch((function(){e.$hMessage.error("申购出现错误")})):(e.$hMessage.error("表单验证失败!"),e.success=!0)}))},handleSubmit_tab2:function(t){var e=this;this.$refs[t].validate((function(t){t?c["a"].fetch({url:"#",data:{},method:"post"}).then((function(t){e.success=!0})).catch((function(){e.$hMessage.error("申购出现错误")})):e.$hMessage.error("表单验证失败!")}))},print:function(){var t=this,e=2;i()(this.$refs.success,{backgroundColor:"#ffffff",scale:e,useCORS:!0}).then((function(e){var a=e.toDataURL("image/jpeg");t.fileDownload(a)}))},fileDownload:function(t){var e=window.document.createElement("a");e.style.display="none",e.href=t,e.download="申购凭证".concat(this.applicationNumber,".png"),document.body.appendChild(e),e.click(),document.body.removeChild(e)},back:function(){this.$router.push("/")},further:function(){this.success=!1}}},d=u,p=(a("33bd"),a("f41a"),a("be97")),m=Object(p["a"])(d,o,r,!1,null,"fd12e9fc",null);e["default"]=m.exports},"33bd":function(t,e,a){"use strict";var o=a("10f8"),r=a.n(o);r.a},"3b01":function(t,e,a){},"82b2":function(t,e,a){t.exports=a.p+"img/成功.png"},f41a:function(t,e,a){"use strict";var o=a("3b01"),r=a.n(o);r.a}}]);