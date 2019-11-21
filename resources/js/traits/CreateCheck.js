import moment from 'moment'
import axios from 'axios'
import { ref } from '@vue/composition-api'

export default (props, context) => {
  const $store = context.root.$store
  
  const currentAddingCheck = ref(null)
  const newCheck = () => {
    currentAddingCheck.value = {
      amount: 0,
      date: moment().format("YYYY-MM-DD"),
    }
  }
  const saveNewCheck = async () => {
    let request = await axios.post('/checks', currentAddingCheck.value)
      .catch(e => console.warn(e))
    $store.dispatch('checks/fetch')
  }
  const closeNewCheck = () => currentAddingCheck.value = null
  
  return {
    currentAddingCheck,
    newCheck,
    saveNewCheck,
    closeNewCheck
  }
}