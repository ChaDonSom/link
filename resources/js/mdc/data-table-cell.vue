<template>
  <component :is="tag ? tag : 'td'"
      :class="classes"
      :role="role"
      :scope="scope"
  >
    <slot>
      Carbs (g)
    </slot>
  </component>
</template>

<script>
import { computed } from '@vue/composition-api'

export default {
  props: {
    tag: true,
    numeric: Boolean,
  },
  setup(props, context) {
    const role  = computed(() => props.tag === 'th' ? 'columnheader' : null)
    const scope = computed(() => props.tag === 'th' ? 'col' : null)
    
    const classes = computed(() => ({
      'mdc-data-table__header-cell':          props.tag === 'th',
      'mdc-data-table__header-cell--numeric': props.tag === 'th' && props.numeric,
      'mdc-data-table__cell':                 props.tag === 'td',
      'mdc-data-table__cell--numeric':        props.tag === 'td' && props.numeric,
    }))
    
    return {
      role,
      classes,
      scope,
    }
  }
}
</script>

<style scoped lang="scss">
</style>