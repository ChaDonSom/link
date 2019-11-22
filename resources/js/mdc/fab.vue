<template>
  <component
      ref="main"
      :is="tag ? tag : 'button'"
      :to="to"
      :href="href"
      @click="$emit('click', $event)"
      :class="classes"
      id="uid"
  >
    <slot></slot>
  </component>
</template>

<script>
// import interact from 'interactjs'
import { reactive, ref, onMounted, computed } from '@vue/composition-api'
import { MDCRipple } from '@material/ripple'
export default {
  name: 'mdc-fab',
  props: {
    tag: String,
    href: String,
    to: String,
    color: String,
  },
  setup(props, context) {
    const main = ref(null)
    const ripple = ref(null)
    const classes = reactive({
      'mdc-fab': true,
      'material-icons': true,
      'secondary': computed(() => props.color === 'secondary'),
    })
    const uid = ref(Math.random() * 10000)
    
    onMounted(() => {
      if (props.tag !== 'router-link') ripple.value = new MDCRipple(main.value)
      // interact(main.value).on('tap', event => context.emit('click', event))
    })
    return {
      main,
      classes,
      uid
    }
  }
}
</script>

<style lang="scss">
@import '~sass/before-mdc';
@import '@material/fab/mdc-fab';
.mdc-fab {
  &> span { width: 100%; }
  &:focus, &:active, &:hover {
    outline: none;
    text-decoration: none;
  }
  &.secondary {
    @include mdc-fab-accessible($mdc-theme-secondary);
  }
}
</style>