<template>
  <div class="body">
    <div class="qForm1">
      <div class="formTitle">本组测试帮您了解自己实际承担风险的能力</div>
      <h-form
        :model="qForm1"
        label-position="left"
        :label-width="700"
        ref="questionnaire1"
      >
        <h-form-item
          :label="item.label"
          v-for="(item,index) in qForm1.items"
          :key="index"
          required
          :prop="`items.${index}.value`"
        >
          <h-radio-group v-model="item.value">
            <h-radio label="yes">是</h-radio>
            <h-radio label="no">否</h-radio>
          </h-radio-group>
        </h-form-item>
      </h-form>
    </div>
    <div class="qForm2">
      <div class="formTitle">本组问题可以测试您面对风险所采取的态度</div>
      <h-form
        :model="qForm2"
        label-position="left"
        :label-width="700"
        ref="questionnaire2"
      >
        <h-form-item
          :label="item.label"
          v-for="(item,index) in qForm2.items"
          :key="index"
          required
          :prop="`items.${index}.value`"
        >
          <h-radio-group v-model="item.value">
            <h-radio label="yes">是</h-radio>
            <h-radio label="no">否</h-radio>
          </h-radio-group>
        </h-form-item>
      </h-form>
      <h-button
        type="primary"
        class="button"
        @click="submit"
      >提交问卷</h-button>
    </div>
  </div>
</template>
<script>
import core from '@hsui/core'
export default {
  props: {
    accountId: String,
    required: true
  },
  data () {
    return {
      qForm1: {
        items: [
          {
            label: '您有足够的收入应对家庭日常开支吗？',
            value: '',
          },
          {
            label: '如果发生财务困难，急需用钱，您能确定借到钱度过难关吗？',
            value: '',
          },
          {
            label: '除了工资，您是否还有其他稳定的收入来源？',
            value: '',
          },
          {
            label: '您如果投资损失了部分钱，您能承受吗？',
            value: '',
          },
        ]
      },
      qForm2: {
        items: [
          {
            label: '如果展示用的电脑样机能够打折，您会购买吗？',
            value: '',
          },
          {
            label: '假如现在有一份工作比您目前工作的待遇高很多，但要求承受非常大的压力，而且工作要求很高，您会选择吗？',
            value: '',
          },
          {
            label: '您喜欢彩票吗？',
            value: '',
          },
          {
            label: '如果投资出现亏损，您还能保持良好心态吗？',
            value: '',
          },
          {
            label: '您是否极少犹豫不决，患得患失？',
            value: '',
          },
          {
            label: '您是否宁愿购买高风险的股票也不愿意把钱存在银行？',
            value: '',
          },
          {
            label: '您相信自己所做的决定吗？',
            value: '',
          },
          {
            label: '您愿意独自做决定吗？',
            value: '',
          },
          {
            label: '您面对股票交易行情屏幕，还能控制情绪吗？',
            value: '',
          },
        ]
      },
    };
  },
  methods: {
    count () {
      let count1 = 0;
      let count2 = 0;
      for (const item of this.qForm1.items) {
        if (item.value == 'yes') {
          count1++;
        }
      }
      for (const item of this.qForm2.items) {
        if (item.value == 'yes') {
          count2++;
        }
      }
      return count1 + count2
    },
    submit () {
      let flag = true;
      this.$refs.questionnaire1.validate((valid) => {
        if (!valid) {
          this.$hMessage.error('您还有问题没有填写！')
          flag = false;
        }
      })
      this.$refs.questionnaire2.validate((valid) => {
        if (!valid) {
          this.$hMessage.error('您还有问题没有填写！')
          flag = false;
        }
      })
      if (flag) {
        const count = this.count();
        let userRiskLevel = 0;
        if (count >= 11) {
          userRiskLevel = 5;
        }
        else if (count >= 8) {
          userRiskLevel = 4;
        }
        else if (count >= 5) {
          userRiskLevel = 3;
        }
        else if (count >= 2) {
          userRiskLevel = 2;
        }
        else {
          userRiskLevel = 1;
        }
        core
          .fetch({
            url: '/purchase/user/setRiskLevel',
            data: {
              accountId: this.accountId,
              riskLevel: userRiskLevel
            },
            method: 'get'
          })
          .then((res) => {
            if (res.code == '10000') {
              this.$hMessage.success('开户成功！')
            }
          })
          .catch(() => {
            this.$hMessage.error('开户出现错误')
          })
      }
    }
  }
};
</script>
<style scoped>
.formTitle {
  font-weight: 600;
  font-size: 16px;
}
.body {
  background-color: #fff;
  height: 400px;
  overflow: auto;
}
.button {
  margin-left: 320px;
}
</style>