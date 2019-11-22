<template>
<div class="mdc-data-table" ref="main">
  <table class="mdc-data-table__table" aria-label="Dessert calories">
    <thead v-if="$slots.header">
      <tr class="mdc-data-table__header-row">
        <slot name="header">
          <table-cell tag="th">Dessert</table-cell>
          <table-cell tag="th" numeric>Carbs (g)</table-cell>
          <table-cell tag="th" numeric>Protein (g)</table-cell>
          <table-cell tag="th">Comments</table-cell>
        </slot>
      </tr>
    </thead>
    <tbody class="mdc-data-table__content" v-if="$slots.body">
      <slot name="body">
        <table-row>
          <table-cell tag="td">Frozen yogurt</table-cell>
          <table-cell tag="td" numeric>24</table-cell>
          <table-cell tag="td" numeric>4.0</table-cell>
          <table-cell tag="td">Super tasty</table-cell>
        </table-row>
      </slot>
    </tbody>
  </table>
</div>
</template>

<script>
import { onMounted, ref } from '@vue/composition-api'
import { MDCDataTable } from '@material/data-table'
import TableCell from '@mdc/data-table-cell'
import TableRow from '@mdc/data-table-row'
export default {
  components: { TableRow, TableCell },
  setup(props, context) {
    const main      = ref(null)
    const dataTable = ref(null)
    
    onMounted(() => {
      setTimeout(() => dataTable.value = new MDCDataTable(main.value))
    })
    
    return {
      main,
      dataTable,
    }
  }
}
</script>

<style lang="scss">
@import "~sass/variables";
@import "@material/checkbox/mdc-checkbox"; // Required only for data table with row selection.
@import "@material/data-table/mdc-data-table";

.mdc-data-table__header-row th {
  font-weight: 600;
}
</style>