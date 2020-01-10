<template>
  <transition name="fade-zoom">
    <div
        class="scrim"
        ref="scrim"
        :style="cssPositionVars"
    >
      <div class="container" ref="container">
        <div class="modal" ref="modal">
          <slot name="close-button"></slot>
          <slot :value="value"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { reactive, onMounted, computed, ref } from '@vue/composition-api'

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
    const container = ref(null)
    const modal     = ref(null)
    const scrim     = ref(null)
    
    const calculatedPosition = computed(() => {
      let top  = props.position.top
      let left = props.position.left
      
      if (scrim.value) {
        let container = scrim.value.querySelector('.container')
        let rect = container.getBoundingClientRect()
        let style = getComputedStyle(container)
        let padding = Number(style.padding.split('px')[0])
        var maxX = window.innerWidth - (rect.width + padding)
      } else {
        var maxX = 1000
      }
      
      return {
        top,
        left: left > maxX ? maxX : left
      }
    })
    const cssPositionVars = reactive({
      '--top':   computed(() => calculatedPosition.value.top  + 'px'),
      '--left':  computed(() => calculatedPosition.value.left + 'px')
    })
    
    onMounted(() => {
    })
    
    
    return {
      container,
      modal,
      
      relevantPositioningInfo,
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