<template>
  <div>
    <div
      v-show="!success"
      class="body"
    >
      <div class="title">产品赎回</div>
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
              style="width: 300px;"
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
                  :remote-method="productRemote"
                  @on-change="productChange($event)"
                  remoteIcon="search"
                  :loading="loading"
                  :loading-text="loadingText"
                  style="width: 300px;"
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
              <h-form-item label="可用份额：">
                <h-input
                  readonly
                  v-model="productForm.balance"
                  placeholder="选中银行卡自动填入"
                ></h-input>
              </h-form-item>
            </h-col>
            <h-col span="12">
              <h-form-item label="全部赎回：">
                <h-switch
                  v-model="switchValue"
                  @on-change="switchChange"
                >
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </h-switch>
              </h-form-item>
            </h-col>
          </h-row>
          <h-row>
            <h-form-item
              label="选择银行卡："
              prop="bankCardNumber"
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
          </h-row>
          <h-form-item
            label="赎回份额"
            prop="amount"
          >
            <h-input
              v-model="productForm.amount"
              placeholder="请输入"
            ></h-input>
          </h-form-item>
          <h-form-item style="text-align: center;">
            <h-button
              type="primary"
              @click="handleSubmit('productForm')"
              style="text-align: center; width: 100px;"
            >赎回</h-button>
          </h-form-item>
        </h-form>
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
      >
      <div class="msg">赎回成功!</div>
      <div class="promptInfo">赎回人姓名：{{ userForm.userName }}</div>
      <div class="promptInfo">交易账号：{{ applicationNumber }}</div>
      <div style="text-align: center;">
        <div class="promptCell">
          产品信息
          <br>
          {{productForm.productName }}
        </div>
        <div class="promptCell">
          购买金额
          <br>
          {{ productForm.amount }}
        </div>
        <div class="promptCell">
          赎回编号
          <br>
          {{ applicationNumber }}
        </div>
      </div>
      <div style="text-align: center">
        <div class="date">下单日期：{{ time }}</div>
        <div class="date">预计确认日期：{{ expectedTime }}</div>
      </div>
      <div style="text-align: center; margin-top: 45px;">
        <div class="promptButton">
          <h-button
            type="primary"
            @click="further"
          >继续赎回</h-button>
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
import html2canvas from 'html2canvas';
import core from '@hsui/core'
export default {
  data () {
    return {
      loading: false,
      switchValue: false,
      applicationNumber: '',
      loadingText: '',
      time: '',
      expectedTime: '',
      userOptions: [],
      productOptions: [],
      bankCardOptions: [],
      success: false,
      userForm: {
        accountId: '',
        userName: "姚测1", //客户名称
        userType: "客户类型", //客户类型
        certificateType: "证件类型", //证件类型
        certificateNum: "证件号码", //证件号码
        userRiskLevel: "客户风险等级", //客户风险等级
      },
      productForm: {
        fundId: '',   //产品代码
        productName: '',   //产品名称
        balance: '',   //可用份额
        amount: null,   //赎回份额
        bankCardNumber: ''
      },
      ruleValidate: {
        bankCardNumber: [{ required: true, message: "请选择使用的银行卡", trigger: "change" }],
        amount: [{ required: true, message: "购买余额不能为空", trigger: "blur" }],
        fundId: [{ required: true, message: "请选择产品代码", trigger: "change" }],
      },
    };
  },
  methods: {
    switchChange (val) {
      if (val) {
        this.productForm.amount = this.productForm.balance
      }
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
          })
          .catch(() => {
            this.$hMessage.error("获取产品ID出错");
          });
      }
      else {
        this.productOptions = []
      }
    },
    bankCardChange (val) {
      this.productForm.bankCardNumber = this.bankCardOptions[val].label;
      if (this.productForm.fundId == null || this.userForm.accountId == null) {
        return
      }
      core
        .fetch({
          url: '/purchase/userFund/getShareByID',
          method: 'get',
          data: {
            accountId: this.userForm.accountId,
            fundId: this.productForm.fundId,
            bankCardNumber: this.productForm.bankCardNumber
          }
        })
        .then((res) => {
          if (res.code == '10000') {
            this.productForm.balance = res.data.ownShare;
          }
          else {
            this.$hMessage.error(res.msg)
          }
        })
        .catch(() => {
          this.$hMessage.error('网络出现错误,请稍后再来！')
        })
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
        })
        .catch(() => {
          this.$hMessage.error("获取产品信息出错");
          this.disabled = true;
        });
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
              label: item.bankCardNumber,
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
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.time = window.sessionStorage.getItem('time')
          core
            .fetch({
              url: "/purchase/redemption/addRedemption",
              data: {
                accountId: parseInt(this.userForm.accountId),
                fundId: parseInt(this.productForm.fundId),
                dealTime: this.time,
                bankCardNumber: this.productForm.bankCardNumber,
                dealShare: parseFloat(this.productForm.amount),
                solveStatus: 0,
              },
              method: "post",
            })
            .then((res) => {
              const applicationNumber = res.data
              const time = window.sessionStorage.getItem('time');
              if (res.code == '10000') {
                core
                  .fetch({
                    url: '/purchase/nexttime',
                    data: {
                      from: time
                    },
                    method: 'get'
                  })
                  .then((res) => {
                    if (res.code == '10000') {
                      this.applicationNumber = applicationNumber
                      this.expectedTime = res.data;
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
              this.$hMessage.error("赎回出现错误");
            });
        } else {
          this.$hMessage.error("表单验证失败!");
          this.success = true;
        }
      });
    },
    print () {
      let scale = 2;
      html2canvas(this.$refs.success, {
        backgroundColor: '#ffffff',
        scale: scale,
        useCORS: true,
      }).then(canvas => {
        var imgData = canvas.toDataURL("image/jpeg");
        this.fileDownload(imgData);
      })
    },
    fileDownload (downloadUrl) {
      let aLink = document.createElement("a");
      aLink.style.display = "none";
      aLink.href = downloadUrl;
      aLink.download = `赎回凭证${this.applicationNumber}.png`;
      // 触发点击-然后移除
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink);
    },
    back () {
      this.$router.push('/')
    },
    further () {
      this.success = false
    }
  }
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
  padding-top: 20px;
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
</style >
 <style >
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
.layout-footer {
  display: none;
}
.productForm .h-input {
  width: 300px;
}
.productForm .h-form-item {
  margin-bottom: 20px;
}
</style>
