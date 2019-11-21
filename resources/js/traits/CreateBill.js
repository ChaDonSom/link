import moment from 'moment'
import axios from 'axios'
import { ref } from '@vue/composition-api'

export default (props, context) => {
  const $store = context.root.$store
  
  const currentAddingBill = ref(null)
  const newBill = () => {
    currentAddingBill.value = {
      amount: 0,
      date: moment().format("YYYY-MM-DD"),
      label: '',
    }
  }
  const saveNewBill = async () => {
    let request = await axios.post('/bills', currentAddingBill.value)
      .catch(e => console.warn(e))
    $store.dispatch('checks/fetch')
  }
  const closeNewBill = () => currentAddingBill.value = null
  
  return {
    currentAddingBill,
    newBill,
    saveNewBill,
    closeNewBill
  }
}