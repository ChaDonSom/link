<template>
  <grid v-cloak v-if="tableRows">
    <grid-inner>
      <cell :span="12" class="centerer">
        <mdc-button @click="logout">Log out</mdc-button>
      </cell>
      <cell :span="12" style="display: flex; flex-direction: column;">
        <data-table v-if="checks" style="margin: auto;">
          <template #header>
            <table-cell tag="th" numeric>Date</table-cell>
            <table-cell tag="th">Label</table-cell>
            <table-cell tag="th" numeric>Amount</table-cell>
          </template>
          <template #body>
            <table-row
                v-for="row of tableRows"
                :key="`${row.label}_${row.id}`"
                @click="editRow(row)"
                :class="{ 'check-row': row.isCheck }"
            >
              <table-cell tag="td" numeric>{{ date(row).format("MM/DD/YY") }}</table-cell>
              <table-cell tag="td">{{ row.label }}</table-cell>
              <table-cell tag="td" numeric>{{ dollars(row.amount) }}</table-cell>
            </table-row>
          </template>
        </data-table>
      </cell>
    </grid-inner>
    <mdc-fab @click="newBill" class="fab">add</mdc-fab>
    <Modal
        v-model="currentEditingBill"
        @close="closeBill"
    >
      <template v-slot="{ value }">
        <grid>
          <grid-inner>
            <cell :span="12">
              <textfield v-model="value.label" autofocus>For</textfield>
            </cell>
            <cell :span="12">
              <textfield type="number" v-model.number="value.amount" autofocus>Amount</textfield>
            </cell>
            <cell :span="12">
              <textfield type="date" v-model="value.date" autofocus>Date</textfield>
            </cell>
            <cell :span="12" style="display: flex;">
              <mdc-button @click="saveBill"
                style="margin: 0 auto 0 0;"
              >
                <button-label>Save</button-label>
                <button-icon>save</button-icon>
              </mdc-button>
              <mdc-icon-button @click="deleteBill"
                style="margin: 0 0 0 auto; color: red;"
              >delete
              </mdc-icon-button>
            </cell>
          </grid-inner>
        </grid>
      </template>
    </Modal>
    <Modal
        v-model="currentAddingBill"
        @close="closeNewBill"
    >
      <template v-slot="{ value }">
        <grid>
          <grid-inner>
            <cell :span="12">
              <textfield v-model="value.label" autofocus>For</textfield>
            </cell>
            <cell :span="12">
              <textfield type="number" v-model="value.amount" autofocus>Amount</textfield>
            </cell>
            <cell :span="12">
              <textfield type="date" v-model="value.date" autofocus>Date</textfield>
            </cell>
            <cell :span="12">
              <mdc-button @click="saveNewBill"
                style="margin: 0 calc(50% - 37px);"
              >
                <button-label>Save</button-label>
                <button-icon>save</button-icon>
              </mdc-button>
            </cell>
          </grid-inner>
        </grid>
      </template>
    </Modal>
  </grid>
</template>

<script>
import { logout } from '@helpers/logout'
import { dollars } from '@helpers/currency'
import { reactive, toRefs, onBeforeMount, onMounted, onBeforeUnmount, computed, ref, watch } from '@vue/composition-api'
import moment from 'moment'
import useEditBill from '@traits/EditBill'
import useCreateBill from '@traits/CreateBill'
import Grid from '@mdc/grid.vue'
import GridInner from '@mdc/grid-inner.vue'
import Cell from '@mdc/cell.vue'
import MdcIconButton from '@mdc/icon-button'
import MdcButton from '@mdc/button'
import MdcFab from '@mdc/fab'
import ButtonLabel from '@mdc/button-label'
import ButtonIcon from '@mdc/button-icon'
import DataTable from '@mdc/data-table'
import TableRow from '@mdc/data-table-row'
import TableCell from '@mdc/data-table-cell'
import ChecksModule from '@store/modules/checks'
import Modal from '@comps/Modal'
import Textfield from '@mdc/textfield.vue'

export default {
  name: 'Bills',
  props: {
  },
  components: {
    Grid,
    GridInner,
    Cell,
    MdcFab,
    MdcButton,
    MdcIconButton,
    DataTable,
    TableRow,
    TableCell,
    Modal,
    Textfield,
    ButtonIcon,
    ButtonLabel,
  },
  setup(props, context) {
    const $store = context.root.$store
    const $router = context.root.$router
    let nicely = true
    $store.usesModules({
      checks: ChecksModule
    })
    
    const checks = computed(() => $store.getters['checks/array'])
    
    const date = x => moment(x.date)
    
    const tableRows = computed(() => {
      let rows = []
      for (let check of checks.value) {
        rows.push({ ...check, label: 'Check', isCheck: true })
        for (let bill of check.bills) rows.push(bill)
      }
      return rows.sort((a, b) => {
        if (b.date > a.date) return 1
        if (a.date > b.date) return -1
        return 0
      })
    })
    const editRow = row => {
      if (row.label === 'Check') return context.root.$router.push(`/check/${row.id}`)
      return editBill(row)
    }
    
    const {
      currentEditingBill,
      editBill,
      saveBill,
      deleteBill,
      closeBill
    } = useEditBill(props, context)
    
    const {
      currentAddingBill,
      newBill,
      saveNewBill,
      closeNewBill
    } = useCreateBill(props, context)
    
    onMounted(() => {
      let checks = $store.getters['checks/array']
      if (!checks || !checks.length) $store.dispatch('checks/fetch')
    })
    
    return {
      checks,
      date,
      logout,
      dollars,
      
      tableRows,
      editRow,

      currentEditingBill,
      editBill,
      saveBill,
      deleteBill,
      closeBill,
      
      currentAddingBill,
      newBill,
      saveNewBill,
      closeNewBill,
    }
  }
}
</script>

<style scoped lang="scss">
.fab {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
}
th {
  background-color: rgba(0,0,0,0.04);
}
.check-row {
  background-color: rgba(0,0,0,0.1);
}
</style>