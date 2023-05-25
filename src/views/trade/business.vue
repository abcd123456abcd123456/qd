<template>
  <div>
    <h-form-gird
      ref="formGird"
      v-model="formItem1"
      :columns="fcolumn"
      :data="fdata"
      height="200"
      :autoClear="false"
      :stripe="true"
      :border="true"
      :showHeader="true"
      noDataText=""
      :canDrag="true"
      :loading="false"
      @on-row-click="rowClick"
    >
      <h-form
        ref="formItem1"
        :model="formItem1"
        :compareModel="formItem2"
        :label-width="80"
        errorFocus
        cols="2"
      >
        <h-form-item
          label="交易编号"
          prop="input"
          required
        >
          <h-input
            v-model="formItem1.input"
            placeholder="请输入"
          ></h-input>
        </h-form-item>
        <h-form-item label="交易时间">
          <h-row>
            <h-col span="11">
              <h-form-item
                prop="date"
                required
              >
                <h-datePicker
                  type="date"
                  placeholder="选择日期"
                  v-model="formItem1.date"
                ></h-datePicker>
              </h-form-item>
            </h-col>
          </h-row>
        </h-form-item>
        <h-form-item
          label="交易类型"
          prop="select"
          required
        >
          <h-select
            v-model="formItem1.select"
            filterable
          >
            <h-option value="beijing">北京市</h-option>
            <h-option value="shanghai">上海市</h-option>
            <h-option value="shenzhen">深圳市</h-option>
          </h-select>
        </h-form-item>
        <!-- 后添加的 要修改 -->
        <h-form-item
          label="交易状态"
          prop="status"
          required
        >
          <h-select
            v-model="formItem1.status"
            filterable
          >
            <h-option value="beijing">北京市</h-option>
            <h-option value="shanghai">上海市</h-option>
            <h-option value="shenzhen">深圳市</h-option>
          </h-select>
        </h-form-item>
        <h-form-item
          label="交易金额"
          prop="money"
          required
        >
          <h-typefield v-model="formItem1.money"></h-typefield>
        </h-form-item>
        <!-- 后添加的 要修改 -->
        <h-form-item
          label="姓名"
          prop="name"
          required
        >
          <h-input
            v-model="formItem1.name"
            placeholder="请输入"
          ></h-input>
        </h-form-item>
        <h-form-item
          label="性别"
          prop="radio"
          required
        >
          <h-radio-group v-model="formItem1.radio">
            <h-radio label="male">男</h-radio>
            <h-radio label="female">女</h-radio>
          </h-radio-group>
        </h-form-item>
        <h-form-item
          label="关键字"
          prop="textarea"
          required
        >
          <h-input
            v-model="formItem1.textarea"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 5 }"
            placeholder="请输入..."
          ></h-input>
        </h-form-item>
      </h-form>
      <div
        slot="footer"
        style="margin-top: 8px;"
      >
        <!-- 点击提交后进行过滤 -->
        <Button
          type="primary"
          @on-click="fdata = fdataFilter()"
        >提交</Button>
        <Button @on-click="fdata = originData">取消</Button>
      </div>
    </h-form-gird>
  </div>
</template>
<script>
export default {
  data () {
    return {
      fcolumn: [
        { key: 'check', title: '选择', type: 'selection', width: 50 },
        { key: 'input', title: '交易编号', align: 'center' },
        { key: 'date', title: '交易时间', align: 'center' },
        { key: 'select', title: '交易类型', align: 'center' },
        { key: 'status', title: '交易状态', align: 'center' },
        { key: 'money', title: '交易金额', align: 'center' },
        { key: 'name', title: '姓名', align: 'center' },
        { key: 'radio', title: '性别', align: 'center' },
        // { key: 'textarea', title: '关键字', align: 'center' },
      ],
      originData: [
        {
          input: '1',
          date: 'Wed May 03 2023 00:00:00 GMT+0800 (中国标准时间)',
          select: 'shanghai',
          status: 'shanghai',
          money: '1.00',
          name: '1',
          radio: 'male',
          textarea: '123a',
        },
        {
          input: '',
          date: '',
          select: '',
          status: '',
          money: '',
          name: '',
          radio: '',
        },
        {
          input: '',
          date: '',
          select: '',
          status: '',
          money: '',
          name: '',
          radio: '',
        },
      ],
      fdata: [
        {
          input: '1',
          date: 'Wed May 03 2023 00:00:00 GMT+0800 (中国标准时间)',
          select: 'shanghai',
          status: 'shanghai',
          money: '1.00',
          name: '1',
          radio: 'male',
          textarea: '123a',
        },
        {
          input: '',
          date: '',
          select: '',
          status: '',
          money: '',
          name: '',
          radio: '',
        },
        {
          input: '',
          date: '',
          select: '',
          status: '',
          money: '',
          name: '',
          radio: '',
        },
      ],
      formItem1: {
        input: '',
        date: '',
        select: '',
        status: '',
        money: '',
        name: '',
        radio: '',
        textarea: '',
      },
      formItem2: {
        input: '',
        date: '',
        select: '',
        status: '',
        money: '',
        name: '',
        radio: '',
        textarea: '',
      },
      select2: '',
    }
  },
  methods: {
    rowClick (e) {
      console.log(e)
    },
    getAllData () {
      // 将fdata中的数据重新加载到表单中
      this.$refs.formGird.setData(this.fdata)
      // 获取表单中的数据
      console.log(this.$refs.formGird.getAllData())
    },
    // 过滤出fdata中满足formItem1有值的数据项, 并将其赋值给fdata
    fdataFilter () {
      let fdata = this.originData
      let formItem1 = this.formItem1
      let fdataFilter = []
      for (let i = 0; i < fdata.length; i++) {
        let item = fdata[i]
        let flag = true
        for (let key in formItem1) {
          if (formItem1[key] !== '' && item[key] !== formItem1[key]) {
            // fdata.textarea字符串在formItem1.textarea字符串中则加入其中
            if (key === 'textarea' && item[key].indexOf(formItem1[key]) !== -1) {
              continue
            }
            flag = false
            break
          }
        }
        if (flag) {
          fdataFilter.push(item)
        }
      }
      return fdataFilter
    },
  },
}
</script>

<style scoped>
</style>