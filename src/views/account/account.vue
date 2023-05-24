<template>
  <div class="body">
    <div class="title">开户</div>
    <div class="step">
      <h-steps :current="current">
        <h-step title="填写信息"></h-step>
        <h-step title="绑定银行卡"></h-step>
        <h-step title="问卷调查"></h-step>
      </h-steps>
    </div>
    <div class="userInfo">
      <h-tabs
        v-model="tabName"
        panelRight
        :height="450"
        :labelWidth="15"
        class="tab"
      >
        <h-tab-pane
          label="填写基本信息"
          name="userForm"
        >
          <div class="userForm">
            <h-form
              ref="userForm"
              :model="userForm"
              :rules="ruleValidate"
              :label-width="80"
            >
              <h-row>
                <h-col span="12">
                  <h-form-item
                    label="客户姓名"
                    prop="userName"
                  >
                    <h-input
                      v-model="userForm.userName"
                      placeholder="请输入客户姓名"
                    ></h-input>
                  </h-form-item>
                </h-col>
                <h-col span="12">
                  <h-form-item
                    label="客户类型"
                    prop="userType"
                  >
                    <h-select
                      v-model="userForm.userType"
                      placeholder="请选择客户类型"
                    >
                      <h-option value="个人">个人</h-option>
                      <h-option value="企业">企业</h-option>
                    </h-select>
                  </h-form-item>
                </h-col>
              </h-row>
              <h-form-item
                label="证件类型"
                prop="certificateType"
              >
                <h-select
                  v-model="userForm.certificateType"
                  placeholder="请选择证件类型"
                >
                  <h-option value="护照">护照</h-option>
                  <h-option value="身份证">身份证</h-option>
                </h-select>
              </h-form-item>
              <h-form-item
                label="证件号码"
                prop="certificateNum"
              >
                <h-input
                  v-model="userForm.certificateNum"
                  placeholder="请输入证件号"
                ></h-input>
              </h-form-item>
              <h-form-item
                label="手机号码"
                prop="phoneNumber"
              >
                <h-input
                  v-model="userForm.phoneNumber"
                  placeholder="请输入手机号"
                ></h-input>
              </h-form-item>
              <h-form-item
                label="顾客性别"
                prop="gender"
              >
                <h-radio-group v-model="userForm.gender">
                  <h-radio label="male">男</h-radio>
                  <h-radio label="female">女</h-radio>
                </h-radio-group>
              </h-form-item>
              <h-form-item class="button">
                <h-button
                  type="primary"
                  @click="userInfoOk"
                >下一步</h-button>
              </h-form-item>
            </h-form>
          </div>
        </h-tab-pane>
        <h-tab-pane
          label="绑定银行卡"
          name="bankForm"
          icon="add"
        >
          <h-form
            ref="bankInfo"
            :model="bankInfo"
            :label-width="80"
            class="bankForm"
          >
            <h-form-item label="客户姓名">
              <h-input
                placeholder="无需填写"
                v-model="userForm.userName"
                readonly
              >
              </h-input>
            </h-form-item>
            <h-form-item
              v-for="(item, index) in bankInfo.items"
              :key="index"
              :label="'银行卡' + (index + 1)"
              :prop="'items.' + index + '.value'"
              :rules="{
                required: true,
                message: '银行卡号' + (index + 1) + '不能为空',
                trigger: 'blur',
              }"
            >
              <h-row>
                <h-col span="10">
                  <h-input
                    type="text"
                    v-model="item.value"
                    placeholder="请输入..."
                  ></h-input>
                </h-col>
                <h-col span="10">
                  <h-form-item
                    label="发行银行"
                    :prop="'items.' + index + '.type'"
                    :rules="{
                      required: true,
                      message: '请选择银行卡号' + (index + 1) + '的发行银行',
                      trigger: 'change',
                    }"
                  >
                    <h-select
                      v-model="item.type"
                      placeholder="请选择客户类型"
                    >
                      <h-option value="中国工商银行">中国工商银行</h-option>
                      <h-option value="中国农业银行">中国农业银行</h-option>
                      <h-option value="中国建设银行">中国建设银行</h-option>
                      <h-option value="中国银行">中国银行</h-option>
                      <h-option value="交通银行">交通银行</h-option>
                      <h-option value="浦发银行">浦发银行</h-option>
                      <h-option value="招商银行">招商银行</h-option>
                      <h-option value="民生银行">民生银行</h-option>
                      <h-option value="平安银行">平安银行</h-option>
                      <h-option value="中信银行">中信银行</h-option>
                      <h-option value="恒丰银行">恒丰银行</h-option>
                    </h-select>
                  </h-form-item>
                </h-col>
                <h-col span="2">
                  <h-button
                    type="ghost"
                    @click="handleRemove(index)"
                  >删除</h-button>
                </h-col>
              </h-row>
            </h-form-item>
            <h-form-item>
              <h-button
                type="dashed"
                long
                @click="handleAdd"
                icon="plus-round"
              >新增</h-button>
            </h-form-item>
            <h-form-item>
              <h-button
                type="primary"
                @click="bankInfoOk"
                class="button"
              >下一步</h-button>
            </h-form-item>
          </h-form>
        </h-tab-pane>
        <h-tab-pane
          label="问卷调查"
          name="questionnaire"
          icon="add"
        >
          <questionnaireVue :accountId="accountId"></questionnaireVue>
        </h-tab-pane>
      </h-tabs>
    </div>
  </div>
</template>
<script>
import core from '@hsui/core'
import questionnaireVue from '../../components/questionnaire.vue'
export default {
  components: {
    questionnaireVue
  },
  data () {
    return {
      current: 0,
      tabName: 'userForm',
      accountId: '123456',
      bankInfo: {
        items: [
          {
            value: "",
            type: "",
          },
        ],
      },
      userForm: {
        userName: "",
        certificateNum: "",
        phoneNumber: "",
        certificateType: "",
        userType: '',
        gender: "",
      },
      ruleValidate: {
        userName: [{ required: true, message: "客户姓名不能为空", trigger: "blur" }],
        certificateNum: [{ required: true, message: "证件号码不能为空", trigger: "blur" }],
        phoneNumber: [{ required: true, message: "手机号码不能为空", trigger: "blur" }],
        certificateType: [{ required: true, message: "请选择证件类型", trigger: "change" }],
        userType: [{ required: true, message: "请选择用户类型", trigger: "change" }],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
      },
    }
  },
  methods: {
    userInfoOk () {
      const registerDate = window.sessionStorage.getItem('date')
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          core.
            fetch({
              url: '/purchase/user/addUser',
              method: 'post',
              data: {
                userType: this.userForm.userType,
                userName: this.userForm.userName,
                userRiskLevel: 0,
                certificateType: this.userForm.certificateType,
                certificateNum: this.userForm.certificateNum,
                registerDate: registerDate,
                userStatus: 0,
                virtualAmount: 0
              }
            })
            .then((res) => {
              if (res.code == '10000') {
                this.current += 1;
                this.tabName = 'bankForm'
                this.accountId = res.data
              }
              else {
                this.$hMessage.error(res.msg);
              }
            })
            .catch(() => {
              this.$hMessage.error('开户出现错误')
            })

        } else {
          this.$hMessage.error("表单验证失败!");
        }
      });
    },
    bankInfoOk () {
      this.$refs.bankInfo.validate((valid) => {
        if (valid) {
          let flag = false;
          for (const item of this.bankInfo.items) {
            core
              .fetch({
                url: '/purchase/user/addBankCard',
                method: 'post',
                data: {
                  accountId: this.accountId,
                  bankCardNumber: item.value,
                  bankName: item.type,
                  balanceAmount: 5000,
                }
              })
              .then((res) => {
                if (res.code != '10000') {
                  this.$hMessage.info(res.msg)
                  flag = false;
                }
                else {
                  flag = true;
                }
              })
              .catch(() => {
                flag = false;
              })
          }
          if (flag) {
            this.current += 1;
            this.tabName = 'questionnaire'
          }
          else {
            this.$hMessage.info('出现错误,稍后再来')
          }

        } else {
          this.$hMessage.error("表单验证失败!");
        }
      });
    },
    handleAdd () {
      this.bankInfo.items.push({
        value: "",
        type: "",
      });
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    },
    handleRemove (index) {
      this.bankInfo.items.splice(index, 1);
    },
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
}
.userForm {
  background-color: #f7f7f7;
  padding-top: 20px;
}

.button {
  margin-left: 260px;
}
.bankForm {
  height: 400px;
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
.userForm .h-input {
  width: 300px;
}
.userForm .h-select {
  width: 300px;
}
.userForm .h-form-item {
  margin-bottom: 30px;
}
.bankForm .h-input {
  width: 270px;
}
.bankForm .h-select {
  width: 270px;
}
</style>