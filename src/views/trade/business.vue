<template>
  <div class="body">
    <div class="search">
      <h-form
        :model="searchForm"
        :label-width="80"
        label-position="left"
        class="searchForm"
        ref="searchForm"
      >
        <h-row>
          <h-col span="6">
            <h-form-item label="产品编号">
              <h-input
                v-model="searchForm.fundId"
                placeholder="请输入产品编号"
              ></h-input>
            </h-form-item>
          </h-col>
          <h-col span="6">
            <h-form-item label="用户编号">
              <h-input
                v-model="searchForm.accountId"
                placeholder="请输入用户编号"
              ></h-input>
            </h-form-item>
          </h-col>
          <h-col span="6">
            <h-form-item label="交易编号">
              <h-input
                v-model="searchForm.dealNumber"
                placeholder="请输入交易编号"
              ></h-input>
            </h-form-item>
          </h-col>
          <h-col span="6">
            <h-form-item>
              <h-button
                type="primary"
                @click="search"
              >查询</h-button>
              <h-button @click="handleReset('searchForm')">重置</h-button>
            </h-form-item>
          </h-col>
        </h-row>
        <h-row>
          <h-col span="6">
            <h-form-item label="起始日期">
              <h-date-picker
                type="date"
                placeholder="请选择起始日期"
                @on-change="timeChange"
                v-model="searchForm.fromDate"
              ></h-date-picker>
            </h-form-item>
          </h-col>
          <h-col span="6">
            <h-form-item label="结束日期">
              <h-date-picker
                type="date"
                placeholder="请选择结束日期"
                v-model="searchForm.endDate"
                :options="option"
              ></h-date-picker>
            </h-form-item>
          </h-col>
          <h-col span="6">
            <h-form-item label="交易类型">
              <h-select
                v-model="searchForm.dealType"
                placeholder="请选择交易类型"
              >
                <h-option value="0">申购</h-option>
                <h-option value="1">赎回</h-option>
              </h-select>
            </h-form-item>
          </h-col>
        </h-row>
      </h-form>
    </div>
    <h-table
      :loading="loading"
      :columns="columns"
      :data="data"
      class="table"
      stripe
    ></h-table>
    <!-- 分页 -->
    <div
      v-show="pagination.total > 0"
      class="pagination-wrap"
    >
      <h-page
        v-bind="pagination"
        @on-change="changePagination"
      ></h-page>
    </div>
    <h-msg-box
      v-model="productMsgBoxVisible"
      footerHide
      :escClose="true"
      :title="详情"
      :beforeEscClose="productMsgBoxBeforeEscClose"
      @on-close="productMsgBoxClose"
    >
      <h-form
        ref="dealForm"
        :model="dealForm"
        :label-width="100"
        label-position="left"
      >
        <h-form-item label="产品编号">
          <h-input
            readonly
            v-model="dealForm.fundId"
            placeholder="产品编号"
          />
        </h-form-item>
        <h-form-item label="用户编号">
          <h-input
            readonly
            v-model="dealForm.accountId"
            placeholder="用户编号"
          />
        </h-form-item>
        <h-form-item label="交易编号">
          <h-input
            readonly
            v-model="dealForm.dealNumber"
            placeholder="交易编号"
          />
        </h-form-item>
        <h-form-item label="交易日期">
          <h-input
            readonly
            v-model="dealForm.dealTime"
            placeholder="交易日期"
          />
        </h-form-item>
        <h-form-item label="交易类型">
          <h-input
            readonly
            v-model="dealForm.dealType"
            placeholder="交易类型"
          />
        </h-form-item>
        <h-form-item label="交易金额">
          <h-input
            readonly
            v-model="dealForm.dealAmount"
            placeholder="交易金额"
          />
        </h-form-item>
        <h-form-item label="交易状态">
          <h-input
            readonly
            v-model="dealForm.dealStatus"
            placeholder="交易状态"
          />
        </h-form-item>
        <h-form-item style="text-align: right">
          <h-button
            type="primary"
            @click="productFormCancel"
          > 确定 </h-button>
        </h-form-item>
      </h-form>
    </h-msg-box>
  </div>
</template>
<script>
import core from '@hsui/core'
export default {
  data () {
    const that = this;
    return {
      option: {},
      data: [],
      loading: true,
      dealForm: {},
      productMsgBoxVisible: false,
      searchForm: {
        dealNumber: '',
        accountId: '',
        fundId: '',
        fromDate: '',
        endDate: '',
        dealType: '',
      },
      pagination: {
        current: 1,
        "page-size": 10,
        total: 0,
      },
      columns: [
        {
          title: "序号",
          type: "index",
        },
        {
          title: "产品编号",
          key: "fundId",
        },
        {
          title: "用户编号",
          key: "accountId",
        },
        {
          title: "交易编号",
          key: "dealNumber",
        },
        {
          title: "交易日期",
          key: "dealTime",
        },
        {
          title: "交易类型",
          key: "dealType",
          render: (h, params) => {
            let type = params.row.sex === 1 ? "赎回" : "申购";
            return h(
              "div",
              {
                // title可以显示成任意值
                attrs: {
                  title: type,
                },
              },
              type
            );
          },
        },
        {
          title: "交易金额",
          key: "dealAmount",
        },
        {
          title: "交易状态",
          key: "dealStatus",
          render: (h, params) => {
            let status = params.row.sex === 1 ? "已确认" : "未确认";
            return h(
              "div",
              {
                // title可以显示成任意值
                attrs: {
                  title: status,
                },
              },
              status
            );
          },
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          render (h, { row }) {
            return h("div", [
              h(
                "Button",
                {
                  props: { type: "text", size: "small" },
                  on: {
                    click () {
                      that.productMsgBoxVisible = true;
                      that.productFormMsgBoxData = { ...row };
                      that.productFormData = { ...row };
                    },
                  },
                },
                "详情"
              ),
            ]);
          },
        },
      ],
    }
  },
  methods: {
    handleReset (name) {
      this.searchForm = {};
      this.$refs[name].resetValidate();
    },
    timeChange (val) {
      this.option = {
        disabledDate (date) {
          return date && date.valueOf() < new Date(val) - 86400000;
        },
      }
    },
    clear () {
      this.productMsgBoxVisible = false;
      this.dealForm = {};
    },
    productMsgBoxBeforeEscClose () {
      this.handleReset();
      this.clear();
      return ture;
    },
    productMsgBoxClose () {
      this.handleReset();
      this.clear();
    },
    productFormCancel () {
      this.handleReset();
      this.clear();
    },
    search () {
      console.log(this.searchForm);
      let dealNumber = null;
      let accountId = null;
      let fundId = null;
      let queryDealStartTime = null;
      let queryDealEndTime = null;
      let dealType = null;
      if (this.searchForm.dealNumber != '') {
        dealNumber = this.searchForm.dealNumber
      }
      if (this.searchForm.accountId !== '') {
        accountId = this.searchForm.accountId
      }
      if (this.searchForm.fundId != '') {
        fundId = this.searchForm.fundId
      }
      if (this.searchForm.fromDate != '') {
        queryDealStartTime = this.searchForm.fromDate
      }
      if (this.searchForm.endDate != '') {
        queryDealEndTime = this.searchForm.endDate
      }
      if (this.searchForm.dealType != '') {
        dealType = this.searchForm.dealType
      }
      core
        .fetch({
          method: "post",
          url: "/purchase/deal/queryByDeal",
          data: {
            page: 1,
            num: 10,
            dealNumber: dealNumber,
            accountId: accountId,
            fundId: fundId,
            queryDealStartTime: queryDealStartTime,
            queryDealEndTime: queryDealEndTime,
            dealType: dealType,
          },
        })
        .then((res) => {
          if (res.code == '10000') {
            this.loading = false;
            this.data = res.data;
            this.pagination = {
              "page-size": 10,
              current: 1,
              total: res.data.length + page * 10
            }
          }
        });

    },
    changePagination () {
      let dealNumber = null;
      let accountId = null;
      let fundId = null;
      let queryDealStartTime = null;
      let queryDealEndTime = null;
      let dealType = null;
      if (this.searchForm.dealNumber != '') {
        dealNumber = this.searchForm.dealNumber
      }
      if (this.searchForm.accountId !== '') {
        accountId = this.searchForm.accountId
      }
      if (this.searchForm.fundId != '') {
        fundId = this.searchForm.fundId
      }
      if (this.searchForm.fromDate != '') {
        queryDealStartTime = this.searchForm.fromDate
      }
      if (this.searchForm.endDate != '') {
        queryDealEndTime = this.searchForm.endDate
      }
      if (this.searchForm.dealType != '') {
        dealType = this.searchForm.dealType
      }
      core
        .fetch({
          method: "post",
          url: "/purchase/deal/queryByDeal",
          data: {
            page: page,
            num: 10,
            dealNumber: dealNumber,
            accountId: accountId,
            fundId: fundId,
            queryDealStartTime: queryDealStartTime,
            queryDealEndTime: queryDealEndTime,
            dealType: dealType,
          },
        })
        .then((res) => {
          if (res.code == '10000') {
            this.loading = false;
            this.data = res.data;
            this.pagination = {
              "page-size": 10,
              current: 1,
              total: res.data.length + page * 10
            }
          }
        });
    }
  },
  computed: {
    getDate () {
      return this.searchForm.fromDate
    },
  },
}
</script>
<style lang="less" scoped>
.product-action-bar {
  margin-bottom: 12px;
  margin-left: 7px;
}

.pagination-wrap {
  margin-top: 12px;
  text-align: right;
}
.body {
  background-color: #f7f7f7;
}
.table {
  height: 450px;
}
.searchForm {
  margin-left: 20px;
  padding-top: 20px;
}
</style>
<style >
.searchForm .h-input {
  width: 200px;
}
</style>