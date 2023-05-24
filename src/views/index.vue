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
    <h-switch
      v-model="switch1"
      @on-change="change"
    ></h-switch>
    {{ switch1 }}
  </div>
</template>
<script>
export default {
  data () {
    return {
      switch1: false,
    };
  },
  methods: {
    change (status) {
      this.$hMessage.info(`开关状态：${status}`);
    },
  },
};
</script>