(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[14],{2150:function(t,n,e){},"3d01":function(t,n,e){"use strict";var a=e("5d54"),s=e.n(a);s.a},"5d54":function(t,n,e){},"7b3d":function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{staticClass:"layout"},[a("h-menu",{staticClass:"topMenu",attrs:{mode:"horizontal","active-name":"1"}},[a("h-menu-item",{attrs:{name:"1"}},[a("img",{staticStyle:{width:"80px"},attrs:{src:e("f773"),alt:""}})]),t._v(" "),a("div",{attrs:{id:"title"}},[t._v("\n      理财销售柜台系统\n    ")]),t._v(" "),a("div",{staticClass:"date"},[a("h-icon",{attrs:{name:"time"}}),t._v(" "+t._s(t.date)+"\n    ")],1)],1),t._v(" "),a("div",{staticClass:"layout-content"},[a("h-row",{attrs:{name:"flex"}},[a("h-col",{staticClass:"layout-menu-left",attrs:{span:"5"}},[a("h-menu",{attrs:{theme:"dark",width:"auto"},on:{"on-select":function(n){return t.Onselect(n)}}},[a("div",{staticClass:"layout-logo-left"}),t._v(" "),a("h-menu-item",{attrs:{name:"/"}},[a("h-icon",{attrs:{name:"home"}}),t._v("\n            首页\n          ")],1),t._v(" "),a("h-submenu",{attrs:{name:"product"},scopedSlots:t._u([{key:"title",fn:function(){return[a("h-icon",{attrs:{name:"order_fill"}}),t._v("\n              产品管理\n            ")]},proxy:!0}])},[t._v(" "),a("h-menu-item",{attrs:{name:"list"}},[t._v("\n              列表\n            ")])],1),t._v(" "),a("h-submenu",{attrs:{name:"account"},scopedSlots:t._u([{key:"title",fn:function(){return[a("h-icon",{attrs:{name:"android-person"}}),t._v("\n              账户管理\n            ")]},proxy:!0}])},[t._v(" "),a("h-menu-item",{attrs:{name:"/account"}},[t._v("\n              开户\n            ")]),t._v(" "),a("h-menu-item",{attrs:{name:"/account/information"}},[t._v("\n              资料修改\n            ")])],1),t._v(" "),a("h-submenu",{attrs:{name:"trade"},scopedSlots:t._u([{key:"title",fn:function(){return[a("h-icon",{attrs:{name:"financial_fill"}}),t._v("\n              交易管理\n            ")]},proxy:!0}])},[t._v(" "),a("h-menu-item",{attrs:{name:"/trade/purchase"}},[t._v("\n              产品申购\n            ")]),t._v(" "),a("h-menu-item",{attrs:{name:"/trade/redeem"}},[t._v("\n              产品赎回\n            ")]),t._v(" "),a("h-menu-item",{attrs:{name:"/trade/business"}},[t._v("\n              业务查询\n            ")])],1),t._v(" "),a("h-menu-item",{attrs:{name:"/liquidation"}},[a("h-icon",{attrs:{name:"clipboard"}}),t._v("\n            清算\n          ")],1)],1)],1),t._v(" "),a("h-col",{attrs:{span:"19"}},[a("div",{staticClass:"layout-content"},[a("div",{staticClass:"layout-content-main"},[a("router-view")],1)]),t._v(" "),a("div",{staticClass:"layout-footer layout-copy"},[t._v("©2022 HUNDSUN 版权所有")])])],1)],1)],1)},s=[],o={data:function(){return{date:"2023-05-20"}},methods:{Onselect:function(t){this.$router.push(t)}}},i=o,r=(e("a671"),e("3d01"),e("be97")),u=Object(r["a"])(i,a,s,!1,null,"4d9bff54",null);n["default"]=u.exports},a671:function(t,n,e){"use strict";var a=e("2150"),s=e.n(a);s.a},be97:function(t,n,e){"use strict";function a(t,n,e,a,s,o,i,r){var u,c="function"===typeof t?t.options:t;if(n&&(c.render=n,c.staticRenderFns=e,c._compiled=!0),a&&(c.functional=!0),o&&(c._scopeId="data-v-"+o),i?(u=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),s&&s.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(i)},c._ssrRegister=u):s&&(u=r?function(){s.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:s),u)if(c.functional){c._injectStyles=u;var l=c.render;c.render=function(t,n){return u.call(n),l(t,n)}}else{var d=c.beforeCreate;c.beforeCreate=d?[].concat(d,u):[u]}return{exports:t,options:c}}e.d(n,"a",(function(){return a}))},f773:function(t,n,e){t.exports=e.p+"img/title.png"}}]);