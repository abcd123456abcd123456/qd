<template>
  <h-button @click="getDate">获取日期</h-button>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    getDate () {
      this.$hMessage.info(window.sessionStorage.getItem('date'))
    }
  }
}
</script>