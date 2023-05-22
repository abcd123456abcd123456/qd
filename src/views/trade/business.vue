<template>
  <div>
    <div class="qForm1">
      <h-form
        :model="qForm1"
        label-position="left"
        :label-width="500"
      >
        <h-form-item
          :label="item.label"
          v-for="(item,index) in qForm1.items"
          :key="index"
          :prop="'items.' + index + '.value'"
          :rules="{
          required: true,
          message: '项目' + (index + 1) + '不能为空',
          trigger: 'change',
        }"
          :validate-event="false"
        >
          <h-radio-group v-model="item.value">
            <h-radio label="yes">是</h-radio>
            <h-radio label="no">否</h-radio>
          </h-radio-group>
        </h-form-item>
      </h-form>
    </div>
  </div>
</template>
<script>
export default {
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
      }
    };
  },
};
</script>