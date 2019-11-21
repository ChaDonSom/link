import moment from 'moment'
import axios from 'axios'
import { ref } from '@vue/composition-api'

export default (props, context) => {
  const $store = context.root.$store
  
  const currentEditingBill = ref(null)
  const editBill = bill => {
    currentEditingBill.value = bill
    // currentEditingBill.value.date = moment(bill.date).format("MM/DD/YY")
  }
  const saveBill = async () => {
    let request = await axios.post('/bills', currentEditingBill.value)
      .catch(e => console.warn(e))
    $store.dispatch('checks/fetch')
  }
  const closeBill = () => currentEditingBill.value = null
  
  return {
    currentEditingBill,
    editBill,
    saveBill,
    closeBill
  }
}