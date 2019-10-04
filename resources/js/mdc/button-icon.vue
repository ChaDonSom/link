<template>
  <span class="mdc-button__icon material-icons">
    <slot></slot>
  </span>
</template>

<script>
import { reactive, ref } from '@vue/composition-api'
export default {
  name: 'button-icon',
  props: {
  },
  setup(props, context) {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
</style>