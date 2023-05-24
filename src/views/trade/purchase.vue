<template>
  <div>
    <div
      v-show="!success"
      class="body"
    >
      <div class="title">产品申购</div>
      <div class="search">
        <h-form :label-width="150">
          <h-form-item
            label="账号输入"
            class="label"
          >
            <h-select
              v-model="userForm.accountId"
              filterable
              remote
              :remote-method="userRemote"
              remoteIcon="search"
              @on-change="userChange($event)"
              :loading="loading"
              :loading-text="loadingText"
              style="width: 300px"
            >
              <h-option
                v-for="option in userOptions"
                :value="option.value"
                :key="option.value"
              >{{ option.label }}</h-option>
            </h-select>
          </h-form-item>
        </h-form>
      </div>
      <div class="userInfo">
        <div class="userTitle">客户信息</div>
        <h-form
          :model="userForm"
          label-position="left"
          :label-width="100"
          class="userForm"
        >
          <h-form-item label="客户名称：">
            <h-input
              v-model="userForm.userName"
              readonly
              @on-keydown="onkeydown"
            ></h-input>
          </h-form-item>
          <h-form-item label="客户类型：">
            <h-input
              v-model="userForm.userType"
              readonly
              @on-keydown="onkeydown"
            ></h-input>
          </h-form-item>
          <h-row>
            <h-col span="12">
              <h-form-item label="证件类型：">
                <h-input
                  v-model="userForm.certificateType"
                  readonly
                  @on-keydown="onkeydown"
                ></h-input>
              </h-form-item>
            </h-col>
            <h-col span="12">
              <h-form-item label="证件号码：">
                <h-input
                  v-model="userForm.certificateNum"
                  readonly
                  @on-keydown="onkeydown"
                ></h-input>
              </h-form-item>
            </h-col>
          </h-row>
          <h-form-item label="客户风险等级：">
            <h-input
              v-model="userForm.userRiskLevel"
              readonly
              @on-keydown="onkeydown"
            ></h-input>
          </h-form-item>
        </h-form>
      </div>
      <div class="productInfo">
        <h-tabs v-model="tabName">
          <h-tab-pane
            label="使用银行卡"
            name="bankCard"
            style="height: 250px"
          >
            <h-form
              :model="productForm"
              label-position="left"
              :label-width="100"
              class="productForm"
              ref="productForm"
              :rules="ruleValidate"
            >
              <h-row>
                <h-col span="12">
                  <h-form-item
                    label="产品代码："
                    prop="fundId"
                  >
                    <h-select
                      v-model="productForm.fundId"
                      filterable
                      remote
                      @on-change="productChange"
                      :remote-method="productRemote"
                      remoteIcon="search"
                      :loading="loading"
                      :loading-text="loadingText"
                      style="width: 300px"
                      placeholder="请输入"
                    >
                      <h-option
                        v-for="option in productOptions"
                        :value="option.value"
                        :key="option.value"
                      >{{ option.label }}</h-option>
                    </h-select>
                  </h-form-item>
                </h-col>
                <h-col span="12">
                  <h-form-item label="产品名称：">
                    <h-input
                      v-model="productForm.productName"
                      readonly
                      placeholder="选中产品代码自动填入"
                    ></h-input>
                  </h-form-item>
                </h-col>
              </h-row>
              <h-row>
                <h-col span="12">
                  <h-form-item
                    label="可用银行卡："
                    prop="bankCard"
                  >
                    <h-select
                      v-model="productForm.bankCardNumber"
                      style="width: 300px"
                      @on-change="bankCardChange"
                      widthAdaption
                    >
                      <h-option
                        v-for="(option,index) in bankCardOptions"
                        :key="option.value"
                        :value="index"
                      >{{ option.label }}
                      </h-option>
                    </h-select>
                  </h-form-item>
                </h-col>
                <h-col span="12">
                  <h-form-item label="可用余额：">
                    <h-input
                      readonly
                      v-model="productForm.balance"
                      placeholder="选中银行卡自动填入"
                    ></h-input>
                  </h-form-item>
                </h-col>
              </h-row>
              <h-form-item
                label="购买金额"
                prop="dealAmount"
                required
              >
                <h-input
                  v-model="productForm.dealAmount"
                  placeholder="请输入购买金额"
                  @on-blur="onblur"
                ></h-input>
              </h-form-item>

              <h-form-item label="产品风险等级：">
                <h-input
                  v-model="productForm.riskLevel"
                  readonly
                  placeholder="选中产品代码自动填入"
                ></h-input>
              </h-form-item>
              <h-form-item style="text-align: center">
                <h-button
                  type="primary"
                  @click="handleSubmit('productForm')"
                  :disabled="disabled"
                  style="text-align: center; width: 100px"
                >{{ disabled ? "无法申购" : "申购" }}</h-button>
              </h-form-item>
            </h-form>
          </h-tab-pane>
          <h-tab-pane
            label="使用虚拟账户"
            name="virtualAmount"
            style="height: 250px"
          >
            <h-form
              :model="productForm"
              label-position="left"
              :label-width="100"
              class="tab2"
              ref="productForm_tab2"
              :rules="ruleValidate_tab2"
            >
              <h-row>
                <h-col span="12">
                  <h-form-item
                    label="产品代码："
                    prop="fundId"
                  >
                    <h-select
                      v-model="productForm.fundId"
                      filterable
                      remote
                      @on-change="productChange"
                      :remote-method="productRemote"
                      remoteIcon="search"
                      :loading="loading"
                      :loading-text="loadingText"
                      style="width: 300px"
                      placeholder="请输入"
                    >
                      <h-option
                        v-for="option in productOptions"
                        :value="option.value"
                        :key="option.value"
                      >{{ option.label }}</h-option>
                    </h-select>
                  </h-form-item>
                </h-col>
                <h-col span="12">
                  <h-form-item label="产品名称：">
                    <h-input
                      v-model="productForm.productName"
                      readonly
                      placeholder="选中产品代码自动填入"
                    ></h-input>
                  </h-form-item>
                </h-col>
              </h-row>
              <h-form-item label="虚拟账户余额">
                <h-input
                  readonly
                  v-model="productForm.virtualAmount"
                  placeholder="自动获取填入"
                ></h-input>
              </h-form-item>
              <h-form-item
                label="购买金额"
                prop="dealAmount"
                required
              >
                <h-input
                  v-model="productForm.dealAmount"
                  placeholder="请输入购买金额"
                  @on-blur="onblur"
                ></h-input>
              </h-form-item>
              <h-form-item label="产品风险等级：">
                <h-input
                  v-model="productForm.riskLevel"
                  placeholder="选中产品代码自动填入"
                  readonly
                ></h-input>
              </h-form-item>
              <h-form-item style="text-align: center">
                <h-button
                  :disabled="disabled"
                  type="primary"
                  @click="handleSubmit_tab2('productForm_tab2')"
                  style="text-align: center; width: 100px"
                >{{ disabled ? "无法申购" : "申购" }}
                </h-button>
              </h-form-item>
            </h-form>
          </h-tab-pane>
        </h-tabs>
      </div>
    </div>
    <div
      v-show="success"
      class="successPrompt"
      ref="success"
    >
      <img
        src="../../assets/成功.png"
        alt=""
        class="successPic"
      />
      <div class="msg">申购成功!</div>
      <div class="promptInfo">投资人姓名：{{ userForm.userName }}</div>
      <div class="promptInfo">交易账号：{{ userForm.accountId }}</div>
      <div style="text-align: center">
        <div class="promptCell">
          产品信息
          <br />
          {{ productForm.productName }}
        </div>
        <div class="promptCell">
          购买金额
          <br />
          {{ productForm.dealAmount }}
        </div>
        <div class="promptCell">
          申请编号
          <br />
          {{ applicationNumber }}
        </div>
      </div>
      <div style="text-align: center">
        <div class="date">下单日期：{{ time }}</div>
        <div class="date">预计确认日期：{{ expectedTime }}</div>
      </div>
      <div style="text-align: center; margin-top: 45px">
        <div class="promptButton">
          <h-button
            type="primary"
            @click="further"
          >继续购买</h-button>
        </div>
        <div class="promptButton">
          <h-button @click="back">完成并返回首页</h-button>
        </div>
        <div class="promptButton">
          <h-button @click="print">凭证打印</h-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import html2canvas from "html2canvas";
import core from "@hsui/core";
export default {
  data () {
    return {
      loading: false,
      tabName: 'bankCard',
      applicationNumber: "0012345678971237",
      loadingText: "",
      time: '',
      expectedTime: '',
      disabled: false,
      userOptions: [],
      productOptions: [],
      bankCardOptions: [],
      success: false,
      userForm: {
        accountId: 0,
        userName: "姚测1", //客户名称
        userType: "客户类型", //客户类型
        certificateType: "证件类型", //证件类型
        certificateNum: "证件号码", //证件号码
        userRiskLevel: "客户风险等级", //客户风险等级
      },
      productForm: {
        fundId: "", //产品代码
        productName: "产品名称", //产品名称
        bankCardNumber: "", // 银行卡号
        balance: 100, //可用余额
        dealAmount: "购买金额", //购买金额
        riskLevel: "", //产品风险等级
        virtualAmount: "", //虚拟账户余额
      },
      ruleValidate: {
        bankCardNumber: [
          { required: true, message: "请选择使用的银行卡", trigger: "change" },
        ],
        fundId: [
          { required: true, message: "基金ID不得为空", trigger: "change" },
        ],
      },
      ruleValidate_tab2: {
        fundId: [
          { required: true, message: "请选择产品代码", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    onblur () {
      if (this.tabName == 'virtualAmount') {
        if (this.productForm.dealAmount > this.productForm.virtualAmount) {
          this.productForm.dealAmount = this.productForm.virtualAmount;
        }
      }
      else {
        if (this.productForm.dealAmount > this.productForm.balance) {
          this.productForm.dealAmount = this.productForm.balance;
        }
      }
    },
    bankCardChange (val) {
      this.productForm.bankCardNumber = this.bankCardOptions[val].number;
      this.productForm.balance = this.bankCardOptions[val].value;
    },
    userChange (val) {
      core
        .fetch({
          method: "get",
          url: "/purchase/user/getUserVoByID",
          data: {
            accountId: val,
          },
        })
        .then((res) => {
          this.userForm.accountId = val;
          this.bankCardOptions = res.data.bankCards.map((item) => {
            return {
              value: item.balanceAmount,
              label: `${item.bankCardNumber} | ${item.bankName}`,
              number: item.bankCardNumber
            };
          });
          console.log(this.bankCardOptions);
          this.userForm.certificateNum = res.data.certificateNum;
          this.userForm.certificateType = res.data.certificateType;
          this.userForm.userName = res.data.userName;
          this.userForm.userType = res.data.userType;
          this.userForm.userRiskLevel = res.data.userRiskLevel;
        })
        .catch(() => {
          this.$hMessage.error("获取用户信息出错");
          this.disabled = true;
        });
    },
    productChange (val) {
      core
        .fetch({
          method: "get",
          url: "/purchase/fund/getFundByID",
          data: {
            fundId: val,
          },
        })
        .then((res) => {
          this.productForm.productName = res.data.fundName;
          this.productForm.riskLevel = res.data.fundRiskLevel;
        })
        .catch(() => {
          this.$hMessage.error("获取产品信息出错");
          this.disabled = true;
        });
    },
    onkeydown () {
      this.$hMessage.info("选中账号自动填入");
    },
    userRemote (id) {
      if (id != '') {
        core
          .fetch({
            method: "get",
            url: "/purchase/user/getUsersByID",
            data: {
              accountId: id,
            },
          })
          .then((res) => {
            console.log(res.data);
            this.userOptions = res.data.map((item) => {
              return {
                value: item + "",
                label: item + "",
              };
            });
          })
          .catch(() => {
            this.$hMessage.error("获取用户ID出错");
          });
      }
      else {
        this.userOptions = []
      }
    },
    productRemote (id) {
      if (id != '') {
        core
          .fetch({
            method: "get",
            url: "/purchase/fund/getFundsByID",
            data: {
              fundId: id,
            },
          })
          .then((res) => {
            this.productOptions = res.data.map((item) => {
              return {
                value: item + "",
                label: item + "",
              };
            });
            console.log(this.productOptions);
          })
          .catch(() => {
            this.$hMessage.error("获取产品ID出错");
          });
      }
      else {
        this.productOptions = []
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.time = window.sessionStorage.getItem('time')
          core
            .fetch({
              url: "/purchase/subscribe/addSubscribe",
              data: {
                accountId: parseInt(this.userForm.accountId),
                fundId: parseInt(this.productForm.fundId),
                dealTime: this.time,
                bankCardNumber: this.productForm.bankCardNumber,
                dealAmount: this.productForm.dealAmount,
                solveStatus: 0,
              },
              method: "post",
            })
            .then((res) => {
              const time = window.sessionStorage.getItem('time');
              if (res.code == '10000') {
                core
                  .fetch({
                    url: '/time/nexttime',
                    data: {
                      from: time
                    },
                    method: 'get'
                  })
                  .then((res) => {
                    if (res.code == '10000') {
                      this.applicationNumber = res.data
                      this.expectedDate = res.data;
                      this.success = true;
                    } else {
                      this.$hMessage.error(res.msg)
                    }
                  })
              }
              else {
                this.$hMessage.error(res.msg)
              }
            })
            .catch(() => {
              this.$hMessage.error("申购出现错误");
            });
        } else {
          this.$hMessage.error("表单验证失败!");
          this.success = true;
        }
      });
    },
    handleSubmit_tab2 (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          core
            .fetch({
              url: "/purchase/subscribe/addSubscribe",
              data: {
                accountId: parseInt(this.userForm.accountId),
                fundId: parseInt(this.productForm.fundId),
                dealTime: this.date,
                bankCardNumber: '0000000000000000000',
                dealAmount: this.productForm.dealAmount,
                solveStatus: 0,
              },
              method: "post",
            })
            .then((res) => {
              const time = window.sessionStorage.getItem('time');
              if (res.code == '10000') {
                core
                  .fetch({
                    url: '/time/nexttime',
                    data: {
                      from: time
                    },
                    method: 'get'
                  })
                  .then((res) => {
                    if (res.code == '10000') {
                      this.applicationNumber = res.data
                      this.expectedDate = res.data;
                      this.success = true;
                    } else {
                      this.$hMessage.error(res.msg)
                    }
                  })
              }
              else {
                this.$hMessage.error(res.msg)
              }
            })
            .catch(() => {
              this.$hMessage.error("申购出现错误");
            });
        } else {
          this.$hMessage.error("表单验证失败!");
        }
      });
    },
    print () {
      let scale = 2;
      html2canvas(this.$refs.success, {
        backgroundColor: "#ffffff",
        scale: scale,
        useCORS: true,
      }).then((canvas) => {
        var imgData = canvas.toDataURL("image/jpeg");
        this.fileDownload(imgData);
      });
    },
    fileDownload (downloadUrl) {
      let aLink = document.createElement("a");
      aLink.style.display = "none";
      aLink.href = downloadUrl;
      aLink.download = `申购凭证${this.applicationNumber}.png`;
      // 触发点击-然后移除
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink);
    },
    back () {
      this.$router.push("/");
    },
    further () {
      this.success = false;
    },
  },
};
</script>
<style scoped>
.body {
  background-color: #fff;
}
.title {
  font-size: 16px;
  font-weight: bold;
  color: #464c5b;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #e9eaec;
  padding-left: 20px;
}
.search {
  margin-top: 20px;
}
.userTitle {
  font-weight: bold;
  position: absolute;
  left: 40px;
  top: 20px;
}
.userInfo {
  background-color: #f7f7f7;
  height: 250px;
  position: relative;
}
.userForm {
  position: absolute;
  left: 40px;
  top: 50px;
}
.productInfo {
  background-color: #f7f7f7;
  margin-top: 20px;
  position: relative;
  height: 300px;
}
.productForm {
  margin-left: 40px;
}
.productTitle {
  font-weight: bold;
  position: absolute;
  left: 40px;
  top: 20px;
}
.tab2 {
  margin-left: 40px;
}
.successPrompt {
  background-color: #fff;
  height: 500px;
  margin-top: 100px;
  padding-top: 40px;
}
.successPic {
  height: 80px;
  margin: 0 auto;
}
.msg {
  font-size: 20px;
  text-align: center;
  margin-top: 10px;
}
.promptInfo {
  font-size: 16px;
  margin-top: 5px;
  text-align: center;
}
.promptCell {
  font-weight: bold;
  height: 80px;
  background-color: #f7f7f7;
  display: inline-block;
  width: 200px;
  padding-top: 20px;
  padding-left: 20px;
  text-align: left;
  margin-top: 10px;
}
.promptCellInfo {
  font-weight: normal;
  margin-top: 7px;
}
.promptButton {
  display: inline-block;
}
.promptButton .button {
  height: 60px;
  line-height: 60px;
}
.date {
  font-size: 12px;
  display: inline-block;
  margin-top: 16px;
  color: red;
}
</style>
<style>
.label .h-form-item-label {
  background-color: #f7f7f7;
  color: #999999;
  font-size: 12px;
}
.userForm .h-input {
  border: 0px;
  width: 300px;
}
.userForm .h-form-item {
  margin-bottom: 20px;
}
.productForm .h-input {
  width: 300px;
}
.productForm .h-form-item {
  margin-bottom: 20px;
}
.tab2 .h-input {
  width: 300px;
}
.tab2 .h-form-item {
  margin-bottom: 20px;
}
.layout-footer {
  display: none;
}
</style>
