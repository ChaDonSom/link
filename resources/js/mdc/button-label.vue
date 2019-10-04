<template>
  <span class="mdc-button__label">
    <slot></slot>
  </span>
</template>

<script>
import { reactive, ref } from '@vue/composition-api'
export default {
  name: 'button-label',
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