<template>
  <grid v-cloak>
    <grid-inner>
      <cell :span="12">
        <mdc-button @click="logout">Log out</mdc-button>
      </cell>
      <cell :span="12">
     	 
      </cell>
      <cell :span="12" style="display: flex;">
      </cell>
      <cell :span="12" style="display: flex;">
      </cell>
    </grid-inner>
 </grid>
</template>

<script>
import Vue from '@js/bootstrap'
import { reactive, toRefs, onBeforeMount, onMounted, onBeforeUnmount, computed, ref } from '@vue/composition-api'
import FlatPickr from 'flatpickr'
import { appUrl, user, session } from '@traits/AccessesHeadMeta'
import moment from 'moment'
import axios from 'axios'
import { logout } from '@helpers/logout'
import Modal from '@comps/Modal'
import Grid from '@mdc/grid.vue'
import GridInner from '@mdc/grid-inner.vue'
import Cell from '@mdc/cell.vue'
import MdcButton from '@mdc/button'
import ButtonLabel from '@mdc/button-label'
import ButtonIcon from '@mdc/button-icon'
import Textfield from '@mdc/textfield.vue'
export default {
  name: "Home",
  components: {
    FlatPickr,
    Grid,
    GridInner,
    Cell,
    MdcButton,
    Modal,
    Textfield,
    ButtonLabel,
    ButtonIcon,
  },
  setup(props, context) {
    const $store = context.root.$store
    const $router = context.root.$router
    // $store.usesModules({
    //   checks: ChecksModule
    // })
    
    const render = reactive({
      // checks: computed({
	// get() { return $store.getters['checks/array'] },
        // set(v) {},
      // })
    })
     
    onMounted(() => {
    //  $store.dispatch('checks/fetch')
    })
    
    return {
      ...toRefs(render),
      logout,
   }
  },
}
</script>

<style scoped lang="scss">
</style>
