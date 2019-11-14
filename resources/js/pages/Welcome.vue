<template>
  <grid v-cloak>
    <grid-inner>
      <cell :span="12" class="flex-center"><h2>Welcome!</h2></cell>
      <cell :span="12" class="flex-center">
        <img src="/storage/images/budget-192.png" />
      </cell>
      <cell :span="12" class="flex-center">To use Somero Budget, you must log in.</cell>
      <cell :desktop="6" :tablet="4" :phone="2" class="flex-center">
        <mdc-button tag="router-link" to="/login">
          <button-icon>send</button-icon>
          <button-label>Login</button-label>
        </mdc-button>
      </cell>
      <cell :desktop="6" :tablet="4" :phone="2" class="flex-center">
        <mdc-button tag="a" href="https://somero.dev">
          <button-icon>home</button-icon>
          <button-label>Somero.dev</button-label>
        </mdc-button>
      </cell>
    </grid-inner>
  </grid>
</template>

<script>
import Vue from 'vue'
import { reactive, toRefs, onMounted } from '@vue/composition-api'
import FlatPickr from 'flatpickr'
import Grid from '@mdc/grid.vue'
import GridInner from '@mdc/grid-inner.vue'
import Cell from '@mdc/cell.vue'
import MdcButton from '@mdc/button.vue'
import ButtonIcon from '@mdc/button-icon.vue'
import ButtonLabel from '@mdc/button-label.vue'
import { appUrl, user, session } from '@traits/AccessesHeadMeta'
export default {
  name: "Welcome",
  components: { FlatPickr, Grid, GridInner, Cell, MdcButton, ButtonIcon, ButtonLabel },
  props: {
    intended: true,
  },
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
@import '~sass/layout';
</style>