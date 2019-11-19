<template>
  <grid v-cloak>
    <grid-inner>
      <cell :span="12" class="centerer">
        <mdc-button @click="logout">Log out</mdc-button>
      </cell>
      <cell :span="12" class="centerer">
        <data-table v-if="check">
          <template #header>
            <table-cell tag="th" numeric>Date</table-cell>
            <table-cell tag="th">Label</table-cell>
            <table-cell tag="th" numeric>Amount</table-cell>
          </template>
          <template #body>
            <table-row v-for="bill of check.bills" :key="`bill_${bill.id}`">
              <table-cell tag="td" numeric>{{ date(bill).format("MM/DD/YY") }}</table-cell>
              <table-cell tag="td">{{ bill.label }}</table-cell>
              <table-cell tag="td" numeric>{{ dollars(bill.amount) }}</table-cell>
            </table-row>
          </template>
        </data-table>
      </cell>
    </grid-inner>
  </grid>
</template>

<script>
import { logout } from '@helpers/logout'
import { dollars } from '@helpers/currency'
import { reactive, toRefs, onBeforeMount, onMounted, onBeforeUnmount, computed, ref } from '@vue/composition-api'
import moment from 'moment'
import Grid from '@mdc/grid.vue'
import GridInner from '@mdc/grid-inner.vue'
import Cell from '@mdc/cell.vue'
import MdcButton from '@mdc/button'
import DataTable from '@mdc/data-table'
import TableRow from '@mdc/data-table-row'
import TableCell from '@mdc/data-table-cell'
import ChecksModule from '@store/modules/checks'

export default {
  name: 'Check',
  props: {
    id: true,
  },
  components: {
    Grid,
    GridInner,
    Cell,
    MdcButton,
    DataTable,
    TableRow,
    TableCell,
  },
  setup(props, context) {
    const $store = context.root.$store
    const $router = context.root.$router
    let nicely = true
    $store.usesModules({
      checks: ChecksModule
    })
    
    const check = computed({
      get: () => {
        let checks = $store.getters['checks/array']
        return $store.getters['checks/getCheckById'](Number(props.id))
      },
      set: v => {}
    })
    
    const date = bill => moment.utc(bill.date).local()
    
    
    onMounted(() => {
      let checks = $store.getters['checks/array']
      if (!checks || !checks.length) $store.dispatch('checks/fetch')
    })
    
    return {
      check,
      date,
      logout,
      dollars,
    }
  }
}
</script>

<style scoped lang="scss">

</style>