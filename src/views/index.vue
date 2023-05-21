<template>
  <h-tabs value="name1">
    <h-tab-pane
      label="标签一"
      name="name1"
      style="height: 400px;"
    >
      <div>
        <h-form
          :model="productForm"
          label-position="left"
          :label-width="100"
          class="productForm"
          ref="productForm"
          :rules="ruleValidate"
        >
          <h-row>
            <h-col span="16">
              <h-form-item
                label="产品代码："
                prop="productId"
              >
                <h-select
                  v-model="productForm.input1"
                  filterable
                  remote
                  :remote-method="remoteMethod"
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
          </h-row>
          <h-row>
            <h-col span="16">
              <h-form-item
                label="可用银行卡："
                prop="bankCard"
              >
                <h-select
                  v-model="productForm.input3"
                  style="width:300px"
                >
                  <h-option
                    v-for="option in bankCardOptions"
                    :key="option.value"
                    :value="option.value"
                  >{{ option.value }}
                  </h-option>
                </h-select>
              </h-form-item>
            </h-col>
          </h-row>
          <h-row>
            <h-col span="16">
              <h-form-item
                label="姓名"
                prop="amount"
              >
                <h-input
                  v-model="productForm.name"
                  placeholder="请输入姓名"
                ></h-input>
              </h-form-item>
            </h-col>
          </h-row>
          <h-form-item label="产品风险等级：">
            <h-input
              v-model="productForm.input6"
              placeholder="请输入"
            ></h-input>
          </h-form-item>
          <h-form-item style="text-align: center;">
            <h-button
              type="primary"
              @click="handleSubmit('productForm')"
              style="text-align: center; width: 100px;"
            >申购</h-button>
          </h-form-item>
        </h-form>
      </div>
    </h-tab-pane>
    <h-tab-pane
      label="标签二"
      name="name2"
    >
    </h-tab-pane>
  </h-tabs>
</template>
<script>
export default {
  data () {
    return {
      value: "",
      loading: false,
      loadingText: '',
      userOptions: [],
      productOptions: [],
      bankCardOptions: [],
      userForm: {
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
      },
      productForm: {
        input1: "",
        input2: "",
        input3: "",
        input4: "",
        input5: "",
        input6: "",
        name: "",
      },
      productOptions: [
        {
          label: 'Plabel1',
          value: 'Pvalue1'
        },
        {
          label: 'Plabel2',
          value: 'Pvalue2'
        },
        {
          label: 'Plabel3',
          value: 'Pvalue3'
        },
      ],
      bankCardOptions: [
        {
          label: 'Blabel1',
          value: 'Bvalue1'
        },
        {
          label: 'Blabel2',
          value: 'Bvalue2'
        },
        {
          label: 'Blabel3',
          value: 'Bvalue3'
        },
      ],
      ruleValidate: {
        bankCard: [{ required: true, message: "请选择使用的银行卡", trigger: "change" }],
        amount: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        productId: [{ required: true, message: "请选择产品代码", trigger: "change" }],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
      },
    };
  },
  methods: {
    onkeydown () {
      this.$hMessage.info("选中账号自动填入");
    },
    remoteMethod () {

    },
    handleSubmit (name) {
      console.log(this.$refs.productForm.validate);
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$hMessage.success("申购成功!");
        } else {
          this.$hMessage.error("表单验证失败!");
        }
      });
    },
  }
};
</script>