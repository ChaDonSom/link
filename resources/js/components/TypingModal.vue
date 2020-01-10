<template>
  <transition name="fade-zoom">
    <div
        class="scrim"
        :style="cssPositionVars"
    >
      <div class="container">
        <div class="modal">
          <slot name="close-button"></slot>
          <slot :value="value"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { reactive, onMounted, computed } from '@vue/composition-api'

export default {
  props: {
    value: true,
    position: {
      required: true,
      validator: function validatePosition(val) {
        let isObject = typeof val == 'object'
        if (!isObject) return false
        let hasBoth = Object.keys(val).includes('top', 'left')
        if (!hasBoth) return false
        let bothAreNumbers = typeof val.top == 'number' && typeof val.left == 'number'
        return bothAreNumbers
      }
    }
  },
  setup(props, context) {
    
    const cssPositionVars = reactive({
      '--top':   computed(() => props.position.top  + 'px'),
      '--left':  computed(() => props.position.left + 'px'),
      '--topN':  computed(() => (props.position.top * -1) + 'px'),
      '--leftN': computed(() => (props.position.left * -1) + 'px'),
    })
    
    onMounted(() => {
    })
    
    
    return {
      cssPositionVars
    }
  }
}
</script>

<style scoped lang="scss">
.scrim {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  align-content: center;
  z-index: -1;
  .container {
    display: block;
    position: absolute;
    left: var(--left);
    top: var(--top);
    /*transform: translate(var(--leftN), var(--topN));*/
    width: fit-content;
    height: fit-content;
    overflow-y: auto;
    padding: 12px;
    @media screen and (max-width: 479px) {
      top: unset;
      bottom: 0;
      transform: translateX(-50%);
    }
    .modal {
      display: block;
      background-color: #efefef;
      padding: 12px;
      border-radius: 10px;
      box-shadow: 0 6px 12px rgba(0,0,0,0.4);
    }
  }
}

.fade-zoom-enter-active,
.fade-zoom-leave-active {
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
  & .modal {
    transition: box-shadow 0.2s ease-out;
  }
}
.fade-zoom-enter,
.fade-zoom-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
  @media screen and (max-width: 479px) {
    transform: scale(0.95) translateY(100vw);
  }
  & .modal {
    box-shadow: none;
  }
}
</style>