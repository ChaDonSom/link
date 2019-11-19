<template>
  <div>
    <h2 style="text-align: center;">{{ monthDay }}</h2>
    <p style="text-align: center;">{{ year }}</p>
    <p class="align-money">{{ dollars(value.amount) }}</p>
    <p class="align-money">Used: {{ dollars(used) }}</p>
    <p class="align-money">Leftover: {{ leftover }}</p>
    <div class="consumption-bar" :style="consumptionBarStyle"></div>
    <mdc-button tag="router-link" :to="`/check/${value.id}`">
      <button-label>Open</button-label>
      <button-icon>chevron_right</button-icon>
    </mdc-button>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'
import moment from 'moment'
import { dollars, rounded } from '@js/helpers/currency'
import MdcButton from '@mdc/button'
import ButtonLabel from '@mdc/button-label'
import ButtonIcon from '@mdc/button-icon'
export default {
  name: "CheckCard",
  props: {
    value: true
  },
  components: { MdcButton, ButtonLabel, ButtonIcon, },
  setup(props, context) {
    // Date
    const date = computed(() => moment.utc(props.value.date))
    const day = computed(() => date.value.format('dddd [the] Do'))
    const year = computed(() => date.value.format('YYYY'))
    const month = computed(() => date.value.format('MMMM'))
    const monthDay = computed(() => date.value.format('MMMM Do'))
    
    // Money
    const used = computed(() => props.value.bills.reduce((acc, curr) => {
      return acc + curr.amount
    }, 0))
    const leftover = computed(() => props.value.amount - used.value)
    
    // Stats
    const percentLeft = computed(() => leftover.value / props.value.amount)
    const percentUsed = computed(() => used.value / props.value.amount)
    const billsCount = computed(() => props.value.bills.length)
    
    // Consumption Bar
    const consumptionBarStyle = computed(() => {
      let percent = rounded(percentUsed.value)
      return {
        '--percent-used': percent,
        '--percent-readable': `'${percent * 100}%'`
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
}
</script>

<style scoped lang="scss">
.consumption-bar {
  margin: 24px;
  height: 22px;
  border: 1.4px solid #ededed;
  background-color: #cccccc;
  box-shadow: inset 0 0 3px 3px rgba(0,0,0,0.1);
  border-radius: 12px;
  &::before {
    content: var(--percent-readable);
    display: block;
    height: 100%;
    width: calc(var(--percent-used) * 100%);
    background-color: hsl(calc((1 - var(--percent-used)) * 100), 100%, 40%);
    border-radius: 12px;
    color: white;
    text-align: right;
    padding-right: 8px;
    line-height: 18px;
  }
}
.align-money {
  text-align: right;
  width: 85%;
}
</style>