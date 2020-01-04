<template>
  <div>
    <div
        ref="top"
        v-if="$slots['toolbar-top']"
        class="toolbar top"
    >
      <slot name="toolbar-top"></slot>
    </div>
    <div :style="style">
      <slot></slot>
    </div>
    <div
        ref="bottom"
        v-if="$slots['toolbar-bottom']"
        class="toolbar bottom"
    >
      <slot name="toolbar-bottom"></slot>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive, watch } from '@js/vue-setup'
export default {
  setup(props, context) {
    const bars = {
      top: ref(null),
      bottom: ref(null)
    }
    
    const windowInnerWidth = ref(null)
    window.addEventListener('resize', () => windowInnerWidth.value = window.innerWidth)

    const style  = reactive({
      marginTop:      computed(() => heightInPixels.top),
      marginBottom:   computed(() => heightInPixels.bottom),
      '--min-height': computed(() => `calc(100vh - ${(heightOf.top + heightOf.bottom)}px)`),
      // minHeight:      `var(--min-height)`,
    })
    const getHeightOf = name => () => {
      let inner = windowInnerWidth.value
      if (!bars[name].value) return null
      return bars[name].value.getBoundingClientRect().height
    }
    const heightOf = reactive({
      top:    computed(getHeightOf('top', bars)),
      bottom: computed(getHeightOf('bottom', bars))
    })
    const heightInPixels = reactive({
      top:    computed(() => heightOf.top    + 'px'),
      bottom: computed(() => heightOf.bottom + 'px')
    })
    
    return {
      ...bars,
      style,
      heightOf
    }
  }
}
</script>

<style scoped lang="scss">
.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  padding: 8px;
  &.top {
    top: 0;
  }
  &.bottom {
    bottom: 0;
  }
}
</style>