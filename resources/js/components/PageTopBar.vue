<template>
  <div class="flex-container toolbar-top">
    <div class="flex-row" :style="flexRowStyle">
      <span style="margin: 8px;">Other things here: page info, timestamp</span>
    </div>
    <div class="top-right" ref="topRight">
      <mdc-button>Log out</mdc-button>
    </div>
  </div>
</template>

<script>
import { logout } from '@helpers/logout'
import MdcButton from '@mdc/button'
import { ref, reactive, computed } from '@js/vue-setup'
export default {
  components: {
    MdcButton
  },
  setup(props, context) {
    const topRight = ref(null)
    
    const flexRowStyle = reactive({
      maxWidth: computed(() => {
        let tR = topRight.value
        if (!tR) return null
        let width = tR.getBoundingClientRect().width
        return `calc(100% - ${width}px)`
      })
    })
    
    return {
      logout,
      topRight,
      flexRowStyle,
    }
  }
}
</script>

<style scoped lang="scss">
@import "~sass/flex";
</style>