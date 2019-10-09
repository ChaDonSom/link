<template>
  <grid>
    <grid-inner>
      <cell :span="3">Tester tester</cell>
    </grid-inner>
  </grid>
</template>

<script>
import Vue from '@js/bootstrap'
import { reactive, toRefs, onMounted } from '@vue/composition-api'
import FlatPickr from 'flatpickr'
import Grid from '@mdc/grid.vue'
import GridInner from '@mdc/grid-inner.vue'
import Cell from '@mdc/cell.vue'
import { appUrl, user, session } from '@traits/AccessesHeadMeta'
export default {
  name: "Home",
  components: { FlatPickr, Grid, GridInner, Cell },
  setup(props, context) {
    const state = reactive({
      user: window.user,
    })
    
    onMounted(() => {
    })
    return {
      ...toRefs(state),
    }
  },
}
</script>

<style scoped lang="scss">
</style>