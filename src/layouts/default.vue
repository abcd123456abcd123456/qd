<template>
  <div class="layout">
    <h-menu
      mode="horizontal"
      active-name="1"
      class="topMenu"
    >
      <h-menu-item name="1">
        <img
          src="../assets/title.png"
          alt=""
          style="width: 80px;"
        >
      </h-menu-item>
      <div id="title">
        理财销售柜台系统
      </div>
      <div class="date">
        <h-icon name="time"></h-icon>
        {{ time }}
        {{ week }}
      </div>
    </h-menu>
    <div class="layout-content">
      <h-row name="flex">
        <h-col
          span="5"
          class="layout-menu-left"
        >
          <h-menu
            theme="dark"
            width="auto"
            @on-select="Onselect($event)"
          >
            <div class="layout-logo-left"></div>
            <h-menu-item name="/">
              <h-icon name="home"></h-icon>
              首页
            </h-menu-item>
            <h-submenu name="products">
              <template v-slot:title>
                <h-icon name="order_fill"></h-icon>
                产品管理
              </template>
              <h-menu-item name="product">
                列表
              </h-menu-item>
            </h-submenu>
            <h-submenu name="account">
              <template v-slot:title>
                <h-icon name="android-person"></h-icon>
                账户管理
              </template>
              <h-menu-item name="/account/account">
                开户
              </h-menu-item>
              <h-menu-item name="/account/information">
                资料修改
              </h-menu-item>
            </h-submenu>
            <h-submenu name="trade">
              <template v-slot:title>
                <h-icon name="financial_fill"></h-icon>
                交易管理
              </template>
              <h-menu-item name="/trade/purchase">
                产品申购
              </h-menu-item>
              <h-menu-item name="/trade/redeem">
                产品赎回
              </h-menu-item>
              <h-menu-item name="/trade/business">
                业务查询
              </h-menu-item>
            </h-submenu>
            <h-menu-item name="/liquidation">
              <h-icon name="clipboard"></h-icon>
              清算
            </h-menu-item>
          </h-menu>
        </h-col>
        <h-col span="19">
          <div class="layout-content">
            <div class="layout-content-main">
              <router-view />
            </div>
          </div>
          <div class="layout-footer layout-copy">&copy;2022 HUNDSUN 版权所有</div>
        </h-col>
      </h-row>
    </div>
  </div>
</template>

<script>
import core from '@hsui/core'
export default {
  data () {
    return {
      time: '2023-05-23 10:22:11',
      week: '星期五'
    }
  },
  methods: {
    Onselect (name) {
      this.$router.push(name)
    },
    getDate (val) {
      const date = new Date(val)
      const year = date.getFullYear();
      const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
      const day = date.getDate()
      return `${year}-${month}-${day}`
    }
  },
  mounted () {
    core
      .fetch({
        url: '/time/gettime',
        method: 'get',
      })
      .then((res) => {
        if (res.code != '10000') {
          this.$hMessage.error('获取当前时间出现错误！')
        }
        else {
          this.time = res.data.tmpTime
          this.week = res.data.week
          window.sessionStorage.setItem('time', res.data.tmpTime)
          window.sessionStorage.setItem('date', this.getDate(res.data.tmpTime))
        }
      })
      .catch(() => {
        window.sessionStorage.setItem('time', this.time)
        window.sessionStorage.setItem('date', this.getDate(this.time))
      })
  }
};
</script>
<style scoped>
#title {
  color: #fff;
  font-size: 16px;
}
.date {
  position: absolute;
  right: 50px;
  top: 1px;
  color: #fff;
}
.topMenu {
  position: relative;
}
</style>
<style lang="less">
.h-menu-vertical {
  height: 100vh;
}

.h-menu-item-active {
  > a {
    color: #fff;
  }
}

.layout-content {
  height: 100vh;
  background-image: url("../assets/bg.jpg");
  background-repeat: no-repeat;
}

.layout-content-main {
  padding: 24px;
}

.layout-footer {
  text-align: center;
  height: 30px;
}
.h-menu-light {
  background-color: #43a7fd;
}
.h-menu-logo {
  display: inline-block;
}
</style>
