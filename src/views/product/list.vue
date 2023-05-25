<template>
  <div>
    <div class="body">
      <div class="search">
        <h-form
          :model="searchForm"
          :label-width="100"
          label-position="left"
          class="searchForm"
        >
          <h-row>
            <h-col span="10">
              <h-form-item label="产品代码">
                <h-input
                  v-model="searchForm.fundId"
                  placeholder="请输入产品代码"
                ></h-input>
              </h-form-item>
            </h-col>
            <h-col span="8">
              <h-form-item label="产品名称">
                <h-input
                  v-model="searchForm.fundName"
                  placeholder="请输入产品名称"
                ></h-input>
              </h-form-item>
            </h-col>
            <h-col span="6">
              <h-form-item>
                <h-button
                  type="primary"
                  @click="search"
                >查询</h-button>
                <h-button @click="handleReset('formValid')">重置</h-button>
              </h-form-item>
            </h-col>
          </h-row>
          <h-row>
            <h-col span="10">
              <h-form-item label="产品类型">
                <h-select
                  v-model="searchForm.fundType"
                  placeholder="请选择产品类型"
                >
                  <h-option value="货币">货币基金</h-option>
                  <h-option value="债券型">债券型基金</h-option>
                  <h-option value="混合型">混合型基金</h-option>
                  <h-option value="指数">指数基金</h-option>
                  <h-option value="股票型">股票型基金</h-option>
                  <h-option value="特种">特种基金</h-option>
                </h-select>
              </h-form-item>
            </h-col>
            <h-col span="8">
              <h-form-item label="产品风险等级">
                <h-select
                  v-model="searchForm.fundRiskLevel"
                  placeholder="请选择产品风险等级"
                >
                  <h-option value="1">1</h-option>
                  <h-option value="2">2</h-option>
                  <h-option value="3">3</h-option>
                  <h-option value="4">4</h-option>
                  <h-option value="5">5</h-option>
                </h-select>
              </h-form-item>
            </h-col>
          </h-row>
        </h-form>
      </div>
      <!-- 表格操作 -->
      <div class="product-action-bar">
        <h-button
          type="primary"
          @click="addProduct"
        >新增</h-button>
      </div>
      <!-- 表格 -->
      <h-table
        :loading="false"
        :columns="productColumns"
        :data="productList"
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
      <!-- 弹框-产品新增/编辑 -->
      <h-msg-box
        v-model="productMsgBoxVisible"
        footerHide
        :escClose="true"
        :title="
        productFormMsgBoxData.fundId
          ? `编辑${productFormMsgBoxData.fundName}`
          : '新增'
      "
        :beforeEscClose="productMsgBoxBeforeEscClose"
        @on-close="productMsgBoxClose"
      >
        <h-form
          ref="productForm"
          :model="productFormData"
          :rules="productRuleValidate"
          :label-width="100"
          label-position="left"
        >
          <h-form-item
            label="产品名称"
            prop="fundName"
            required
          >
            <h-input
              v-model="productFormData.fundName"
              placeholder="请输入"
            />
          </h-form-item>
          <h-form-item
            label="产品类型"
            prop="fundType"
            cols="2"
          >
            <h-radio-group v-model="productFormData.fundType">
              <h-radio
                v-for="(fundType,key) in productTypeOrm"
                :key="key"
                style="margin-right: 24px"
                :label="key"
              >
                {{ fundType }}
              </h-radio>
            </h-radio-group>
          </h-form-item>
          <h-form-item
            label="产品风险等级"
            prop="fundRiskLevel"
            required
          >
            <h-select
              v-model="productFormData.fundRiskLevel"
              placeholder="请输入"
            >
              <h-option value="1">1</h-option>
              <h-option value="2">2</h-option>
              <h-option value="3">3</h-option>
              <h-option value="4">4</h-option>
              <h-option value="5">5</h-option>
            </h-select>
          </h-form-item>
          <h-form-item
            label="产品状态"
            prop="fundStatus"
            required
          >
            <h-radio-group
              v-model="productFormData.fundStatus"
              @on-change="radioChange"
            >
              <h-radio
                v-for="(fundStatus,key) in productStatusOrm"
                :key="key"
                style="margin-right: 24px"
                :label="key"
              >
                {{ fundStatus }}
              </h-radio>
            </h-radio-group>
          </h-form-item>
          <h-form-item
            label="开放状态"
            prop="dealStatus"
            required
          >
            <h-radio-group v-model="productFormData.dealStatus">
              <h-radio
                v-for="(fundStatus,key) in productDealStatusOrm"
                :key="key"
                style="margin-right: 24px"
                :label="key"
              >
                {{ fundStatus }}
              </h-radio>
            </h-radio-group>
          </h-form-item>
          <h-form-item
            label="公司"
            prop="fundFirm"
            required
          >
            <h-input
              v-model="productFormData.fundFirm"
              placeholder="请输入"
            />
          </h-form-item>
          <h-form-item style="text-align: right">
            <h-button
              type="ghost"
              @click="productFormCancel"
            > 取消 </h-button>
            <h-button
              type="ghost"
              @click="productFormReset"
            > 重置 </h-button>
            <h-button
              type="primary"
              @click="productFormOk"
            > 提交 </h-button>
          </h-form-item>
        </h-form>
      </h-msg-box>
    </div>
  </div>
</template>

<script>
import core from "@hsui/core";
import { PRODUCT_TYPE_ORM, PRODUCT_STATUS_ORM, PRODUCT_DEAL_STATUS_ORM } from "../../constant";

export default {
  data () {
    this.productTypeOrm = PRODUCT_TYPE_ORM;
    this.productStatusOrm = PRODUCT_STATUS_ORM;
    this.productDealStatusOrm = PRODUCT_DEAL_STATUS_ORM;
    const router = this.$router;
    const that = this;
    return {
      disabled: false,
      searchForm: {
        fundName: '',
        fundType: '',
        fundId: '',
        fundRiskLevel: '',
      },
      pagination: {
        current: 1,
        "page-size": 10,
        total: 0,
      },
      productLoading: true,
      productMsgBoxVisible: false,
      productFormMsgBoxData: {},
      productFormData: {
        productName: '',
        productType: '',
      },
      productRuleValidate: {
        fundName: [
          {
            required: true,
            message: "产品名称不能为空",
            trigger: "blur",
          },
        ],
        fundStatus: [
          {
            required: true,
            message: "请选择产品状态",
            trigger: "change",
          },
        ],
        fundType: [
          {
            required: true,
            message: "请选择产品类型",
            trigger: "change",
          },
        ],
        dealStatus: [
          {
            required: true,
            message: "请选择开放类型",
            trigger: "change",
          },
        ],
      },
      productColumns: [
        {
          title: "序号",
          type: "index",
        },
        {
          title: "产品编号",
          key: "fundId",
        },
        {
          title: "产品名称",
          key: "fundName",
        },
        {
          title: "产品类型",
          key: "fundType",
          render: (h, { row: { fundType } }) => {
            return h("span", {}, this.productTypeOrm[fundType]);
          },
        },
        {
          title: "产品风险等级",
          key: "fundRiskLevel",
        },
        {
          title: "产品状态",
          key: "fundStatus",
          render: (h, { row: { fundStatus } }) => {
            return h("span", {}, this.productStatusOrm[fundStatus]);
          },
        },
        {
          title: "开放状态",
          key: "dealStatus",
          render: (h, { row: { dealStatus } }) => {
            return h("span", {}, this.productDealStatusOrm[dealStatus]);
          },
        },
        {
          title: "发行公司",
          key: "fundFirm",
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          render (h, { row, row: { fundId } = {} }) {
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
                "编辑"
              ),
              h(
                "Button",
                {
                  props: { type: "text", size: "small" },
                  on: {
                    click () {
                      window.sessionStorage.setItem('fundId', fundId)
                      router.push({
                        name: 'product-id',
                        params: {
                          id: fundId
                        }
                      });
                    },
                  },
                },
                "查看"
              ),
            ]);
          },
        },
      ],
      productList: [
        {
          index: '1',
        }
      ],
    };
  },
  created () {
    // 获取产品列表;
    this.getProductList();
  },
  methods: {
    radioChange (val) {
    },
    handleReset () {
      this.searchForm = {};
    },
    search () {
      let fundName = null;
      let fundType = null;
      let fundId = null;
      let fundRiskLevel = null;
      if (this.searchForm.fundName != '') {
        fundName = this.searchForm.fundName
      }
      if (this.searchForm.fundType !== '') {
        fundType = this.searchForm.fundType
      }
      if (this.searchForm.fundId != '') {
        fundId = this.searchForm.fundId
      }
      if (this.searchForm.fundRiskLevel != '') {
        fundRiskLevel = this.searchForm.fundRiskLevel
      }
      core
        .fetch({
          method: "post",
          url: "/purchase/fund/queryFund",
          data: {
            page: 1,
            num: 10,
            fundName: fundName,
            fundType: fundType,
            fundId: fundId,
            fundRiskLevel: fundRiskLevel
          },
        })
        .then((res) => {
          if (res.code == '10000') {
            this.productList = res.data
          }
          else {
            this.$hMessage.error(res.msg)
          }
        })
    },
    addProduct () {
      this.productMsgBoxVisible = true;
    },
    getProductList () {
      core
        .fetch({
          method: "post",
          url: "/purchase/fund/queryFund",
          data: {
            page: 1,
            num: 10,
          },
        })
        .then((res) => {
          if (res.code == '10000') {
            this.productLoading = false;
            this.productList = res.data;
            this.pagination = {
              "page-size": 10,
              current: 1,
              total: res.data.length
            }
          }
        });
    },
    createProduct () {
      core
        .fetch({
          method: "post",
          url: "/purchase/fund/addFund",
          data: { ...this.productFormData },
        })
        .then((res) => {
          if (res.code == '10000') {
            this.getProductList();
            this.resetProductFormMsgBoxData();
            this.resetProductFormData();
          }
        });
    },
    updateProduct () {
      core
        .fetch({
          method: "post",
          url: "/purchase/fund/updateFund",
          data: { ...this.productFormData },
        })
        .then((res) => {
          if (res.code == '10000') {
            this.getProductList();
            this.resetProductFormMsgBoxData();
            this.resetProductFormData();
          }
        });
    },
    productFormOk () {
      this.$refs["productForm"].validate((valid) => {
        if (valid) {
          if (this.productFormData.fundId) {
            this.updateProduct();
          } else {
            this.createProduct();
          }
        } else {
          this.$Message.error("表单验证失败!");
          return;
        }
      });
    },
    productFormCancel () {
      this.resetProductFormMsgBoxData();
      this.resetProductFormData();
    },
    productFormReset () {
      this.resetProductFormData();
    },
    productMsgBoxBeforeEscClose () {
      this.resetProductFormMsgBoxData();
      this.resetProductFormData();
      return ture;
    },
    productMsgBoxClose () {
      this.resetProductFormMsgBoxData();
      this.resetProductFormData();
    },
    resetProductFormMsgBoxData () {
      this.productMsgBoxVisible = false;
      this.productFormMsgBoxData = {};
    },
    resetProductFormData () {
      this.productFormData = {};
      this.$refs["productForm"].resetValidate();

    },
    changePagination (page) {
      core
        .fetch({
          method: "post",
          url: "/purchase/fund/queryFund",
          data: {
            page: page,
            num: 10,
          },
        })
        .then((res) => {
          if (res.code == '10000') {
            this.productLoading = false;
            this.productList = res.data;
            this.pagination = {
              "page-size": 10,
              current: 1,
              total: res.data.length + page * 10
            }
          }
        });
    },
  },
};
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
<style>
.searchForm .h-input {
  width: 300px;
}
.searchForm .h-select {
  width: 300px;
}
</style>
