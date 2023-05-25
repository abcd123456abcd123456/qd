<template>
  <div class="body">
    <div class="title">清算</div>
    <div class="step">
      <h-steps :current="current">
        <h-step title="日期初始化"></h-step>
        <h-step title="更新行情"></h-step>
        <h-step title="处理确认"></h-step>
      </h-steps>
    </div>
    <h-tabs
      v-model="tabName"
      panelRight
      :height="450"
      :labelWidth="15"
      class="tab"
    >
      <h-tab-pane
        label="日期初始化"
        name="dateTime"
      >
        <h-form
          :model="timeForm"
          class="timeForm"
          :label-width="120"
          label-position="left"
        >
          <h-row>
            <h-col span="12">
              <h-form-item label="当前时间：">
                <h-input
                  readonly
                  v-model="timeForm.from"
                >
                  {{ timeForm.from }}
                </h-input>
              </h-form-item>
            </h-col>
            <h-col span="6">
              <h-form-item>
                <h-button
                  type="primary"
                  @click="updateDate"
                >日期初始化</h-button>
              </h-form-item>
            </h-col>
            <h-col span="6">
              <h-form-item>
                <h-button
                  type="primary"
                  @click="updateTime"
                >随机增加时刻</h-button>
              </h-form-item>
            </h-col>
          </h-row>
          <h-form-item label="新的日期时刻:">
            <h-input
              readonly
              v-model="timeForm.newtime"
            >
              {{ timeForm.newtime }}
            </h-input>
          </h-form-item>
        </h-form>
        <h-button
          type="primary"
          class="button"
          @click="timeOk"
          :disabled="disabledT"
          title="请先更新时间"
        >下一步
        </h-button>
      </h-tab-pane>
      <h-tab-pane
        label="更新行情"
        name="quotation"
        icon="add"
      >
        <h-button
          type="primary"
          class="quotation"
          @click="quotation"
        >更新行情</h-button>
        <br>
        <h-button
          type="primary"
          class="button"
          @click="quotationOk"
          :disabled="disabledQ"
          title="请先更新时间"
        >下一步
        </h-button>
      </h-tab-pane>
      <h-tab-pane
        label="处理确认"
        name="calculateShare"
        icon="add"
      >
        <h-menu
          mode="horizontal"
          active-name="subscribeColumns"
          class="menu"
          @on-select="change"
        >
          <h-menu-item name="subscribeColumns">
            <h-icon name="ios-paper"></h-icon>
            申购确认
          </h-menu-item>
          <h-menu-item name="redemptionColumns">
            <h-icon name="ios-people"></h-icon>
            赎回确认
          </h-menu-item>
        </h-menu>
        <div class="tableContainer">
          <h-table
            :loading="loading"
            :columns="columns"
            :data="data"
            class="table"
            stripe
          ></h-table>
          <h-button
            type="primary"
            class="button"
            @click="confirm"
            :disabled="data.length"
          >一键确认</h-button>
        </div>
      </h-tab-pane>
    </h-tabs>
  </div>
</template>
<script>
import core from '@hsui/core'
import EmitBus from '../../constant/EmitBus.js'
export default {
  data () {
    return {
      current: 0,
      tabName: 'dateTime',
      disabledT: true,
      disabledQ: true,
      loading: true,
      activeName: 'subscribeColumns',
      timeForm: {
        from: '',
        newtime: ''
      },
      columns: [],
      data: [],
      subscribeColumns: [
        {
          title: "序号",
          type: "index",
        },
        {
          title: "申购交易编号",
          key: "subscribeId",
        },
        {
          title: "账户编号",
          key: "accountId",
        },
        {
          title: "基金编号",
          key: "fundId",
        },
        {
          title: "申购时间",
          key: "dealTime",
        },
        {
          title: "申购金额",
          key: "dealAmount",
        },
        {
          title: "银行卡号",
          key: "bankCardNumber",
        },
      ],
      redemptionColumns: [
        {
          title: "序号",
          type: "index",
        },
        {
          title: "赎回交易编号",
          key: "redemptionId",
        },
        {
          title: "账户编号",
          key: "accountId",
        },
        {
          title: "基金编号",
          key: "fundId",
        },
        {
          title: "赎回时间",
          key: "dealTime",
        },
        {
          title: "赎回份额",
          key: "dealShare",
        },
        {
          title: "银行卡号",
          key: "bankCardNumber",
        },
      ],
    }
  },
  mounted () {
    this.timeForm.from = window.sessionStorage.getItem('time')
  },
  methods: {
    change (name) {
      this.activeName = name;
      this.getData();
    },
    getData () {
      if (this.activeName == 'redemptionColumns') {
        core
          .fetch({
            url: '/purchase/liquidation/getRedemptionMsg',
            method: 'get',
          })
          .then((res) => {
            if (res.code == '10000') {
              this.data = res.data;
              this.columns = this.redemptionColumns;
              this.loading = false;
            }
            else {
              this.$hMessage.error(res.msg)
              this.data = []
            }
          })
          .catch(() => {
            this.$hMessage.error('获取赎回信息出错')
          })
      }
      else {
        core
          .fetch({
            url: '/purchase/liquidation/getSubscribeMsg',
            method: 'get',
          })
          .then((res) => {
            if (res.code == '10000') {
              this.data = res.data;
              this.columns = this.subscribeColumns;
              this.loading = false;
            }
            else {
              this.$hMessage.error(res.msg)
              this.data = []
            }
          })
          .catch(() => {
            this.$hMessage.error('获取申购信息出错')
          })
      }
    },
    updateDate () {
      core
        .fetch({
          url: '/purchase/updateDate',
          method: 'get'
        })
        .then((res) => {
          if (res.code == '10000') {
            this.timeForm.newtime = res.data.tmpTime;
            this.disabledT = false;
            const time = {
              week: res.data.week,
              time: res.data.tmpTime
            }
            EmitBus.$emit('update', time)
            window.sessionStorage.setItem('time', res.data.tmpTime)
          }
          else {
            this.$hMessage.error(res.msg)
          }
        })
        .catch(() => {
          this.$hMessage.error('日初始化出现错误')
        })
    },
    updateTime () {
      core
        .fetch({
          url: '/purchase/updatetime',
          method: 'get'
        })
        .then((res) => {
          if (res.code == '10000') {
            this.timeForm.newtime = res.data.tmpTime;
            this.disabledT = false;
            const time = {
              week: res.data.week,
              time: res.data.tmpTime
            }
            EmitBus.$emit('update', time)
            window.sessionStorage.setItem('time', res.data.tmpTime)
          }
          else {
            this.$hMessage.error(res.msg);
          }
        })
        .catch(() => {
          this.$hMessage.error('时刻更新出现错误')
        })
    },
    timeOk () {
      this.current += 1;
      this.tabName = 'quotation'
    },
    quotation () {
      core
        .fetch({
          url: '/purchase/liquidation/quotation',
          method: 'get'
        })
        .then((res) => {
          if (res.code == '10000') {
            this.$hMessage.success('更新成功！')
            this.disabledQ = false;
          }
          else {
            this.$hMessage.error(res.msg)
          }
        })
        .catch(() => {
          this.$hMessage.error('清算出现错误')
        })
    },
    quotationOk () {
      this.current += 1;
      this.tabName = 'calculateShare'
      this.getData()
    },
    confirm () {
      console.log(this.activeName);
      if (this.activeName == 'subscribeColumns') {
        core
          .fetch({
            url: '/purchase/liquidation/calculateShare',
            method: 'get'
          })
          .then((res) => {
            if (res.code == '10000') {
              this.$hMessage.success('确认成功')
              this.getData();
            }
            else {
              this.$hMessage.error(res.msg)
            }
          })
          .catch(() => {
            this.$hMessage.error('申购确认失败')
          })
      }
      else {
        core
          .fetch({
            url: '/purchase/liquidation/calculateAmount',
            method: 'get'
          })
          .then((res) => {
            if (res.code == '10000') {
              this.$hMessage.success('确认成功')
              this.getData();
            }
            else {
              this.$hMessage.error(res.msg)
            }
          })
          .catch(() => {
            this.$hMessage.error('赎回确认失败')
          })
      }
    }
  }
}
</script>
<style scoped>
.body {
  background-color: #fff;
}
.title {
  font-size: 18px;
  font-weight: 600;
  border-bottom: 1px solid #e9eaec;
  height: 40px;
  line-height: 40px;
  color: #464c5b;
  padding-left: 20px;
}
.step {
  padding-left: 240px;
  margin-top: 20px;
  background-color: #f7f7f7;
}
.tab {
  margin-top: 20px;
  overflow: auto;
}
.button {
  margin-left: 360px;
  margin-top: 200px;
}
.quotation {
  margin-top: 100px;
  margin-left: 360px;
}
.tableContainer {
  margin-top: 10px;
}
</style>
<style>
.h-tabs-nav-right .h-tabs-tab-active {
  font-weight: 500;
  font-size: 12px;
}
.h-tabs-nav-right {
  font-weight: 500;
  font-size: 12px;
}
.timeForm .h-input {
  width: 300px;
}
.menu .h-menu-light {
  background-color: #fff;
}
</style>