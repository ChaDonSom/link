<template>
  <div>
    <div
        ref="main"
        style="height: 100%;"
        contenteditable="true"
        id="editable"
        @input="input"
        @click="click"
    ></div>
    <div class="caret" :style="caretStyle"></div>
    <TypingModal
        :position="caretAsTopAndLeft"
        v-show="activelySuggesting"
    >
      <h3>{{ phrase.value }}</h3>
    </TypingModal>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from '@js/vue-setup'
import { getCursorXY, getHTMLCaretPosition } from '@helpers/caret'
import { cleanHTML } from '@helpers/string'
import _ from 'lodash'
import TypingModal from '@comps/TypingModal'
export default {
  components: { TypingModal },
  setup(props, context) {
    const main = ref(null)
    
    const value = ref('')
    const triggerCharacters = reactive({
      direct: '@',
      named: '#'
    })
    const phrase = computed(() => {
      let val = value.value
      let checkFor = triggerCharacters
      
      let mostRecentType
      let highestIndex = 0
      for (let key in checkFor) {
        let lastIndex = val.lastIndexOf(checkFor[key])
        if (lastIndex >= highestIndex) {
          highestIndex = lastIndex
          mostRecentType = key
        }
      }
      
      context.root.$emit('phrase-calculated')
      return {
        value: mostRecentType ? cleanHTML(val.slice(highestIndex + 1)) : '',
        trigger: checkFor[mostRecentType],
        type: mostRecentType,
        active: Boolean(mostRecentType)
      }
    })
    const caret = reactive({
      x: 0,
      y: 0,
    })
    const caretStyle = reactive({
      top:  computed(() => caret.y + 'px'),
      left: computed(() => caret.x + 'px')
    })
    const caretAsTopAndLeft = reactive({
      top: computed(() => caret.y),
      left: computed(() => caret.x)
    })
    const activelySuggesting = computed(() => phrase.value.active)
    
    const input = event => {
      // locateCaret(event)
      value.value = event.target.innerHTML
      context.root.$once('phrase-calculated', locateCaret.bind(null, event))
    }
    const click = event => {
      locateCaret(event)
    }
    function locateCaret(event) {
      let div = event.target
      
      let textElement = getSelection().getRangeAt(0).endContainer.parentElement
      
      if (textElement.tagName !== 'DIV') textElement = textElement.closest('div')
      
      let selection = getHTMLCaretPosition(textElement)

      let pos = getCursorXY(textElement, selection)
      
      if (phrase.value.active) {
        caret.x = pos.x
        caret.y = pos.y
      }
    }
    
    const command = payload => {
      document.execCommand(payload.action, false, null)
    }
    
    onMounted(() => {
      main.value.focus()
      
      Bus.$on('doc-command', command)
    })
    
    return {
      main,
      value,
      phrase,
      
      input,
      click,
      
      caret,
      caretStyle,
      caretAsTopAndLeft,
      activelySuggesting
    }
  }
}
</script>

<style scoped lang="scss">
@import "~sass/variables";
#editable {
  caret-color: $mdc-theme-primary;
}
.caret {
  position: absolute;
  display: block;
  height: 20px;
  width: 2px;
  background-color: black;
}
</style>