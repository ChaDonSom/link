import moment from 'moment'
import axios from 'axios'
import { ref } from '@vue/composition-api'

export default (props, context) => {
  const $store = context.root.$store
  
  const currentEditingCheck = ref(null)
  const editCheck = check => {
    currentAddingCheck.value = check
  }
  const saveCheck = async () => {
    let request = await axios.post('/checks', currentEditingCheck.value)
      .catch(e => console.warn(e))
    $store.dispatch('checks/fetch')
  }
  const closeCheck = () => currentEditingCheck.value = null
  
  return {
    currentEditingCheck,
    editCheck,
    saveCheck,
    closeCheck
  }
}