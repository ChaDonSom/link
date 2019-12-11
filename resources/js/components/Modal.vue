<template>
  <transition name="fade-zoom">
    <div
        v-if="value"
        class="scrim"
        @click="closeIfNoCloseButton"
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
  },
  setup(props, context) {
    
    onMounted(() => {
    })
    
    const closeIfNoCloseButton = ev => {
      if (ev.target.closest('.container')) return
      
      let closeButton = context.slots.closeButton
      if (!closeButton) context.emit('close')
    }
    return {
      closeIfNoCloseButton,
    }
  }
}
</script>

<style scoped lang="scss">
.scrim {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  align-content: center;
  background-color: rgba(0,0,0,0.5);
  outline: 100vw solid rgba(0,0,0,0.5);
  z-index: 20;
  .container {
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: fit-content;
    height: fit-content;
    overflow-y: auto;
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