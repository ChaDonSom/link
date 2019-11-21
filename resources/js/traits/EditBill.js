import moment from 'moment'
import axios from 'axios'
import { ref } from '@vue/composition-api'

export default (props, context) => {
  const $store = context.root.$store
  
  const currentEditingBill = ref(null)
  const editBill = bill => {
    let b = bill
    b.date = moment(b.date).format("YYYY-MM-DD")
    currentEditingBill.value = b
    // currentEditingBill.value.date = moment(bill.date).format("MM/DD/YY")
  }
  const saveBill = async () => {
    let request = await axios.patch(`/bills/${currentEditingBill.value.id}`, currentEditingBill.value)
      .catch(e => console.warn(e))
    closeBill()
    await $store.dispatch('checks/fetch')
    context.emit('bill-updated')
  }
  const deleteBill = async () => {
    let request = await axios.delete(`/bills/${currentEditingBill.value.id}`)
      .catch(e => console.warn(e))
    closeBill()
    await $store.dispatch('checks/fetch')
    context.emit('bill-deleted')
  }
  const closeBill = () => currentEditingBill.value = null
  
  return {
    currentEditingBill,
    editBill,
    saveBill,
    deleteBill,
    closeBill
  }
}