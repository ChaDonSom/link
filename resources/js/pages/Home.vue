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
      bills: BillsModule,
      checks: ChecksModule
    })
    
    const render = reactive({
      bills: computed({
        get() { return $store.getters['bills/data'] },
        set(v) {},
      }),
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

    const logout = async () => {
      try {
        let request = await axios.post('/logout', {}, { headers: {
          accept: 'application/json'
        }})
        location.reload()
      } catch (e) {
        if (e && e.response && e.response.status === 419) {
          location.reload()
        }
      }
    }

    onMounted(() => {
      // $store.dispatch('bills/fetch')
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