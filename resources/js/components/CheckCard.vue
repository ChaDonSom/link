<template>
  <div>
    <h2 style="text-align: center;">{{ monthDay }}</h2>
    <p style="text-align: center;">{{ year }}</p>
    <p class="align-money">{{ dollars(value.amount) }}</p>
    <p class="align-money">Used: {{ dollars(used) }}</p>
    <p class="align-money">Leftover: {{ leftover }}</p>
    <div class="consumption-bar" :style="consumptionBarStyle"></div>
    <mdc-button
        tag="router-link"
        :to="`/check/${value.id}`"
        style="margin: 0 calc(50% - 68.5px);"
        big
        @click.stop="() => {}"
    >
      <button-label>Open</button-label>
      <button-icon>chevron_right</button-icon>
    </mdc-button>
  </div>
</template>

<script>
import useCheckDisplay from '@traits/UseCheckDisplay'
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
    const {
      date,
      day,
      year,
      month,
      monthDay,
      dollars,
      leftover,
      used,
      consumptionBarStyle
    } = useCheckDisplay(props, context)
    
    return {
      date,
      day,
      year,
      month,
      monthDay,
      dollars,
      leftover,
      used,
      consumptionBarStyle,
    }
  }
}
</script>

<style scoped lang="scss">
@import "~sass/consumption-bar";
.align-money {
  text-align: right;
  width: 85%;
}
</style>