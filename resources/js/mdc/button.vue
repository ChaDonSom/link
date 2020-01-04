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
    <div class="mdc-button__ripple"></div>
    <slot></slot>
  </component>
</template>

<script>
import { reactive, ref, onMounted, computed, watch } from '@js/vue-setup'
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
    const ripple = ref(null)
    const classes = reactive({
      'mdc-button': true,
      'mdc-button--raised': props.raised,
      'big': props.big,
      'secondary': computed(() => props.color === 'secondary'),
    })
    const uid = ref(Math.random() * 10000)
    
    const main = ref(null)
    watch(main, () => {
      if (props.tag !== 'router-link' && main.value) ripple.value = new MDCRipple(main.value)
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