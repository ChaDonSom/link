import moment from 'moment'
import axios from 'axios'
import { ref } from '@vue/composition-api'

export default (props, context) => {
  const $store = context.root.$store
  
  const currentEditingCheck = ref(null)
  const editCheck = check => {
    let c = check
    c.date = moment(c.date).format("YYYY-MM-DD")
    currentEditingCheck.value = c
  }
  const saveCheck = async () => {
    let request = await axios.patch(`/checks/${currentEditingCheck.value.id}`, currentEditingCheck.value)
      .catch(e => console.warn(e))
    closeCheck()
    await $store.dispatch('checks/fetch')
    context.emit('check-updated')
  }
  const deleteCheck = async () => {
    let request = await axios.delete(`/checks/${currentEditingCheck.value.id}`)
      .catch(e => console.warn(e))
    closeCheck()
    await $store.dispatch('checks/fetch')
    context.emit('check-deleted')
  }
  const closeCheck = () => currentEditingCheck.value = null
  
  return {
    currentEditingCheck,
    editCheck,
    saveCheck,
    deleteCheck,
    closeCheck
  }
}