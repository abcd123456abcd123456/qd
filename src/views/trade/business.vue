<template>
  <div>
    <h-form
      ref="formDynamic"
      :model="formDynamic"
      :label-width="80"
    >
      <h-form-item
        v-for="(item, index) in formDynamic.items"
        :key="index"
        :label="'项目' + (index + 1)"
        :prop="'items.' + index + '.value'"
        :rules="{
          required: true,
          message: '项目' + (index + 1) + '不能为空',
          trigger: 'blur',
        }"
      >
        <h-row>
          <h-col span="18">
            <h-input
              type="text"
              v-model="item.value"
              placeholder="请输入..."
            ></h-input>
          </h-col>
          <h-col
            span="4"
            offset="1"
          >
            <h-button
              type="ghost"
              @click="handleRemove(index)"
            >删除</h-button>
          </h-col>
        </h-row>
      </h-form-item>
      <h-form-item>
        <h-row>
          <h-col span="12">
            <h-button
              type="dashed"
              long
              @click="handleAdd"
              icon="plus-round"
            >新增</h-button>
          </h-col>
        </h-row>
      </h-form-item>
      <h-form-item>
        <h-button
          type="primary"
          @click="handleSubmit('formDynamic')"
        >提交</h-button>
        <h-button
          type="ghost"
          @click="handleReset('formDynamic')"
          style="margin-left: 8px;"
        >重置</h-button>
      </h-form-item>
    </h-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formDynamic: {
        items: [
          {
            value: "",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$hMessage.success("提交成功!");
        } else {
          this.$hMessage.error("表单验证失败!");
        }
      });
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    },
    handleAdd () {
      this.formDynamic.items.push({
        value: "",
      });
    },
    handleRemove (index) {
      this.formDynamic.items.splice(index, 1);
    },
  },
};
</script>