import { ref, reactive, computed } from '@vue/composition-api'
import axios from 'axios'
import moment from 'moment'

export default function (props, context) {
  const $store = context.root.$store
  
  const check = reactive({
    label: '',
    amount: 0,
    date: moment(),
  })
  const clearCheck = () => {
    check.label = ''
    check.amount = 0,
    check.date = moment()
  }
  const newCheck = () => {
    console.log('adding new check...')
    // popup // .then ...
    clearCheck()
    context.emit('new-check', check)
    // axios.post()
  }
  
  return {
    newCheck
  }
}