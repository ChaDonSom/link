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
  name: 'mdc-button',
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
      'mdc-button': true,
      'mdc-button--raised': props.raised,
      'big': props.big,
      'secondary': props.color === 'secondary',
    })
    onMounted(() => {
      if (props.tag !== 'router-link') ripple.value = new MDCRipple(main.value)
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
@import '@material/button/mdc-button';
.mdc-button {
  &:focus, &:active, &:hover {
    outline: none;
    text-decoration: none;
  }
  @include mdc-button-shape-radius(18px);
  &.big {
    padding: 32px;
    line-height: 0;
    @include mdc-button-shape-radius(48px);
  }
  &.secondary {
    @include mdc-button-filled-accessible($mdc-theme-secondary);
  }
}
</style>