<template>
  <div>
    <h2>{{ year }}</h2>
    <p>{{ monthDay }}</p>
    <p>${{ value.amount }}</p>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'
import moment from 'moment'
export default {
  name: "CheckCard",
  props: {
    value: true
  },
  setup(props, context) {
    const date = computed(() => moment.utc(props.value.date))
    const year = computed(() => date.value.format('YYYY'))
    const monthDay = computed(() => date.value.format('dddd, MMMM Do'))
    return {
      date,
      year,
      monthDay
    }
  }
}
</script>

<style scoped lang="scss"></style>