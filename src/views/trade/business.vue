<template>
  <h-button
    type="primary"
    :disabled=" disabled"
    @click="click"
  >Primary(Disabled)</h-button>
</template>
<script>
export default {
  data () {
    return {
      disabled: false,
    }
  },
  methods: {
    click () {
      this.disabled = !this.disabled
    }
  }
}
</script>