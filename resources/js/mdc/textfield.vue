<template>
  <div
      ref="main"
      class="mdc-text-field" >
    <component
        :is="inputTag ? inputTag : 'input'"
        :type="type ? type : 'text'"
        :id="id ? id : uid"
        :value="value"
        ref="input"
        @input="$emit('input', $event.target.value)"
        class="mdc-text-field__input" ></component>
    <label class="mdc-floating-label" for="my-text-field"><slot>Text...</slot></label>
    <div class="mdc-line-ripple"></div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from '@vue/composition-api'
import { MDCTextField } from '@material/textfield'
export default {
  name: 'Textfield',
  props: {
    inputTag: String,
    type: String,
    id: [ String, Number ],
    value: true,
    autofocus: Boolean,
  },
  setup(props, context) {
    const main = ref(null)
    const textfield = ref(null)
    const input = ref(null)
    const uid = ref(Math.round(Math.random() * 1000000))
    onMounted(() => {
      if (props.tag !== 'router-link') textfield.value = new MDCTextField(main.value)
      if (props.autofocus) input.value.addEventListener('focus', input.value.select)
    })
    return {
      main,
      uid,
      input,
    }
  }
}
</script>

<style lang="scss">
@import '~sass/before-mdc';
@import "@material/textfield/mdc-text-field";
</style>