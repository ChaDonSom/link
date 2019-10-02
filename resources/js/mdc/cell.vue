<template>
  <div class="mdc-layout-grid__cell" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'
import VueCompositionApi, { reactive, ref } from '@vue/composition-api'
Vue.use(VueCompositionApi)
export default {
  name: 'cell',
  props: {
    phone: Number,
    desktop: Number,
    tablet: Number,
    span: Number,
  },
  setup(props, context) {
    const mlg = ref('mdc-layout-grid')
    const mlgc = ref(mlg.value + "__cell")
    const mlgcs = ref(mlgc.value + "--span-")
    const preClasses = Object.keys(props).reduce((acc, curr) => {
      if (!props[curr]) return acc
      let className = `${mlgcs.value}${props[curr]}-${curr}`
      if (curr === 'span') className = `${mlgcs.value}${props[curr]}`
      acc[className] = true
      return acc
    }, {})
    const classes = reactive(preClasses)
    return {
      classes
    }
  }
}
</script>

<style scoped lang="scss">
</style>