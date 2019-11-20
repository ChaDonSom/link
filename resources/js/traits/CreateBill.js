import moment from 'moment'
import { ref } from '@vue/composition-api'

export default () => {
  const currentAddingBill = ref(null)
  const newBill = () => {
    currentAddingBill.value = {
      amount: 0,
      date: moment().format("MM/DD/YYYY"),
      label: '',
    }
  }
  const saveNewBill = () => {}
  const closeNewBill = () => currentAddingBill.value = null
  
  return {
    currentAddingBill,
    newBill,
    saveNewBill,
    closeNewBill
  }
}