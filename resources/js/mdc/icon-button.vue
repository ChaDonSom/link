<template>
  <component
      ref="main"
      :is="tag ? tag : 'button'"
      :to="to"
      :href="href"
      @click="$emit('click', $event)"
      :class="classes"  >
    <slot></slot>
  </component>
</template>

<script>
import { reactive, ref, onMounted } from '@vue/composition-api'
import { MDCRipple } from '@material/ripple'
export default {
  name: 'mdc-icon-button',
  props: {
    tag: String,
    href: String,
    to: String,
    raised: Boolean,
    color: String,
    big: Boolean,
  },
  setup(props, context) {
    const main = ref(null)
    const ripple = ref(null)
    const classes = reactive({
      'mdc-icon-button': true,
      'material-icons': true,
      'mdc-icon-button--raised': props.raised,
      'big': props.big,
      'secondary': props.color === 'secondary',
    })
    onMounted(() => {
      if (props.tag !== 'router-link') {
        ripple.value = new MDCRipple(main.value)
        ripple.value.unbounded = true
      }
    })
    return {
      main,
      classes
    }
  }
}
</script>

<style lang="scss">
@import '~sass/before-mdc';
@import '@material/icon-button/mdc-icon-button';
.mdc-icon-button {
  &:focus, &:active, &:hover {
    outline: none;
    text-decoration: none;
  }
  &.big {
    padding: 32px;
    line-height: 0;
  }
  &.secondary {
    @include mdc-icon-button-ink-color($mdc-theme-secondary);
  }
}
</style>