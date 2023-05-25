<template>
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
    <h-table
      :loading="productLoading"
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
  </div>
</template>
<script>
export default {
  data () {
    return {
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
    }
  }
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
<style>