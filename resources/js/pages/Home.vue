<template>
  <grid>
    <grid-inner>
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
import { reactive, toRefs, onMounted, computed } from '@vue/composition-api'
import FlatPickr from 'flatpickr'
import { appUrl, user, session } from '@traits/AccessesHeadMeta'
import BillsModule from '@store/modules/bills'
import ChecksModule from '@store/modules/checks'
import Grid from '@mdc/grid.vue'
import GridInner from '@mdc/grid-inner.vue'
import Cell from '@mdc/cell.vue'
import CheckStack from '@comps/CheckStack'
export default {
  name: "Home",
  components: { FlatPickr, Grid, GridInner, Cell, CheckStack },
  setup(props, context) {
    const $store = context.root.$store
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

    $store.dispatch('bills/fetch')
    $store.dispatch('checks/fetch')
    onMounted(() => {
    })
    return {
      ...toRefs(render)
    }
  },
}
</script>

<style scoped lang="scss">
</style>