<template>
  <div class="flex-container toolbar-bottom">
    <icon-button @click="bold"  >format_bold</icon-button>
    <icon-button @click="italic">format_italic</icon-button>
    <icon-button @click="underline" >format_underline</icon-button>
    <icon-button @click="strikethrough">format_strikethrough</icon-button>
    <icon-button @click="link"  >swap_horiz</icon-button>
  </div>
</template>

<script>
import IconButton from '@mdc/icon-button'
export default {
  components: {
    IconButton,
  },
  setup(props, context) {
    const actionNames = [
      'bold',
      'underline',
      'strikethrough',
      'italic',
      'link'
    ]
    let createAction  = action => event => Bus.$emit('doc-command', { action, event })
    const actions = actionNames.reduce((acc, curr) => {
      acc[curr] = createAction(curr)
      return acc
    }, {})
    console.log(actions)
    
    return {
      ...actions
    }
  }
}
</script>

<style scoped lang="scss">
@import "~sass/flex";
@import "@material/icon-button/mdc-icon-button";
.toolbar-bottom {
  button.mdc-icon-button {
    @include mdc-icon-button-density(-2);
  }
}
</style>