<template>
  <grid v-cloak>
    <grid-inner>
      <cell :span="12" class="centerer">
        <mdc-button @click="logout">Log out</mdc-button>
      </cell>
      <cell :span="12" class="centerer">
        <CheckStack
            v-if="checks && checks.length"
            v-model="checks"
            @new-check="newCheck"
        />
      </cell>
    </grid-inner>
    <Modal
        v-model="currentAddingCheck"
        @close="closeNewCheck"
    >
      <template v-slot="{ value }">
        <p>{{ value.amount }}</p>
        <p>{{ value.date }}</p>
        <p>{{ value.label }}</p>
      </template>
    </Modal>
  </grid>
</template>

<script>
import Vue from '@js/bootstrap'
import { reactive, toRefs, onBeforeMount, onMounted, onBeforeUnmount, computed, ref } from '@vue/composition-api'
import FlatPickr from 'flatpickr'
import { appUrl, user, session } from '@traits/AccessesHeadMeta'
import axios from 'axios'
import { logout } from '@helpers/logout'
import BillsModule from '@store/modules/bills'
import ChecksModule from '@store/modules/checks'
import Modal from '@comps/Modal'
import Grid from '@mdc/grid.vue'
import GridInner from '@mdc/grid-inner.vue'
import Cell from '@mdc/cell.vue'
import CheckStack from '@comps/CheckStack'
import MdcButton from '@mdc/button'
export default {
  name: "Home",
  components: { FlatPickr, Grid, GridInner, Cell, CheckStack, MdcButton, Modal },
  setup(props, context) {
    const $store = context.root.$store
    const $router = context.root.$router
    $store.usesModules({
      checks: ChecksModule
    })
    
    const render = reactive({
      checks: computed({
        get() { return $store.getters['checks/array'] },
        set(v) {},
      })
    })
    
    const currentAddingCheck = ref(null)
    const newCheck = (check) => {
      currentAddingCheck.value = check
    }
    const closeNewCheck = () => currentAddingCheck.value = null

    onMounted(() => {
      $store.dispatch('checks/fetch')
    })
    return {
      ...toRefs(render),
      logout,
      newCheck,
      closeNewCheck,
      currentAddingCheck,
    }
  },
}
</script>

<style scoped lang="scss">
</style>