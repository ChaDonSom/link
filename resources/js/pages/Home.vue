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
        />
      </cell>
    </grid-inner>
  </grid>
</template>

<script>
import Vue from '@js/bootstrap'
import { reactive, toRefs, onBeforeMount, onMounted, onBeforeUnmount, computed } from '@vue/composition-api'
import FlatPickr from 'flatpickr'
import { appUrl, user, session } from '@traits/AccessesHeadMeta'
import axios from 'axios'
import BillsModule from '@store/modules/bills'
import ChecksModule from '@store/modules/checks'
import Grid from '@mdc/grid.vue'
import GridInner from '@mdc/grid-inner.vue'
import Cell from '@mdc/cell.vue'
import CheckStack from '@comps/CheckStack'
import MdcButton from '@mdc/button'
export default {
  name: "Home",
  components: { FlatPickr, Grid, GridInner, Cell, CheckStack, MdcButton },
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
      $store.dispatch('bills/fetch')
      $store.dispatch('checks/fetch')
    })
    return {
      ...toRefs(render),
      logout
    }
  },
}
</script>

<style scoped lang="scss">
</style>