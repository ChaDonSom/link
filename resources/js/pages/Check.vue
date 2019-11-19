<template>
  <grid v-cloak>
    <grid-inner>
      <cell :span="12" class="centerer">
        <mdc-button @click="logout">Log out</mdc-button>
      </cell>
      <cell :span="12" class="centerer"
          v-if="check"
      >
        <h2 style="text-align: center;">{{ monthDay }}</h2>
        <p style="text-align: center;">{{ year }}</p>
        <p class="align-money">{{ dollars(check.amount) }}</p>
        <p class="align-money">Used: {{ dollars(used) }}</p>
        <p class="align-money">Leftover: {{ leftover }}</p>
        <div class="consumption-bar" :style="consumptionBarStyle"></div>
      </cell>
      <cell :span="12" style="display: flex;">
        <data-table v-if="check" style="margin: auto;">
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
import useCheckDisplay from '@traits/UseCheckDisplay'
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
    
    const {
      monthDay,
      year,
      used,
      leftover,
      consumptionBarStyle
    } = useCheckDisplay(check, context)
    
    onMounted(() => {
      let checks = $store.getters['checks/array']
      if (!checks || !checks.length) $store.dispatch('checks/fetch')
    })
    
    return {
      check,
      date,
      logout,
      dollars,
      monthDay,
      year,
      used,
      leftover,
      consumptionBarStyle,
    }
  }
}
</script>

<style scoped lang="scss">
@import "~sass/consumption-bar";
.align-money {
  text-align: right;
  width: 85%;
}
</style>