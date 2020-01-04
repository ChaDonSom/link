<!-- toolbar / nav / info-bar --> <!-- This bar may include two pieces, one staying on top and
  one on bottom for formatting / edit actions -->
<template>
  <nav :style="style">
    <slot></slot>
  </nav>
</template>

<script>
import { reactive, computed } from '@vue/composition-api'
import MdcButton from '@mdc/button'
import IconButton from '@mdc/icon-button'
import ButtonLabel from '@mdc/button-label'
import ButtonIcon from '@mdc/button-icon'

export default {
  props: {
    top: {
      type: Boolean
    },
    bottom: {
      type: Boolean
    }
  },
  components: {
    MdcButton,
    IconButton,
    ButtonLabel,
    ButtonIcon,
  },
  setup(props, context) {
    const style = reactive({
      position: 'fixed',
      top: computed(() => props.top ? '0' : null),
      bottom: computed(() => props.bottom ? '0' : null)
    })
    return {
      style
    }
  }
}
</script>

<style scoped lang="scss">
nav {
  width: 100%;
  display: flex;
}
</style>