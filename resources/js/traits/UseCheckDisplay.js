
import { computed } from '@vue/composition-api'
import moment from 'moment'
import { dollars, rounded } from '@js/helpers/currency'

export default (check, context) => {
  // Date
  const date = computed(() => moment.utc(check.value.date))
  const day = computed(() => date.value.format('dddd [the] Do'))
  const year = computed(() => date.value.format('YYYY'))
  const month = computed(() => date.value.format('MMMM'))
  const monthDay = computed(() => date.value.format('MMMM Do'))
  
  // Money
  const used = computed(() => check.value.bills.reduce((acc, curr) => {
    return acc + curr.amount
  }, 0))
  const leftover = computed(() => check.value.amount - used.value)
  
  // Stats
  const percentLeft = computed(() => leftover.value / check.value.amount)
  const percentUsed = computed(() => used.value / check.value.amount)
  const billsCount  = computed(() => check.value.bills.length)
  
  // Consumption Bar
  const consumptionBarStyle = computed(() => {
    let percent = rounded(percentUsed.value)
    return {
      '--percent-used': percent,
      '--percent-readable': `'${rounded(percent * 100, 1)}%'`
    }
  })
  
  return {
    date,
    day,
    year,
    month,
    monthDay,
    dollars,
    leftover: computed(() => dollars(leftover.value)),
    used,
    consumptionBarStyle,
  }
}