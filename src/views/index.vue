<!-- <template>
  <h-form>
    <h-form-item>
      <h-switch v-model="switchValue">
        <span slot="open">是</span>
        <span slot="close">否</span>
      </h-switch>
    </h-form-item>
  </h-form>
</template>
<script>
export default {
  data () {
    return {
      switchValue: false,
    }
  },
  methods: {
    getDate () {
      this.$hMessage.info(window.sessionStorage.getItem('date'))
    }
  }
}
</script> -->
<template>
  <div>
    <h-tabs value="name1">
      <h-tab-pane
        label="标签一"
        name="name1"
      >
        <h-tabs value="name2">
          <h-tab-pane
            label="标签一"
            name="name1"
          >标签一的内容</h-tab-pane>
          <h-tab-pane
            label="标签二"
            name="name2"
          >标签二的内容</h-tab-pane>
          <h-tab-pane
            label="标签三"
            name="name3"
          >标签三的内容</h-tab-pane>
        </h-tabs>
      </h-tab-pane>
      <h-tab-pane
        label="标签二"
        name="name2"
      >标签二的内容</h-tab-pane>
      <h-tab-pane
        label="标签三"
        name="name3"
      >标签三的内容</h-tab-pane>
    </h-tabs>
  </div>
</template>