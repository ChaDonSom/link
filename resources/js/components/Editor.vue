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
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from '@js/vue-setup'
import {
  getCursorXY,
  getHTMLCaretPosition,
  setCurrentCursorPosition,
  getLineHeight
} from '@helpers/caret'
import _ from 'lodash'
export default {
  setup(props, context) {
    const main = ref(null)
    
    const value = ref('')
    const caret = reactive({
      x: 0,
      y: 0,
    })
    const caretStyle = reactive({
      top:  computed(() => caret.y + 'px'),
      left: computed(() => caret.x + 'px')
    })
    const input = event => {
      let div = event.target
      
      let textElement  = getSelection().getRangeAt(0).commonAncestorContainer.parentElement
      let top          = textElement.getBoundingClientRect().top
      let lineHeight   = getLineHeight(textElement)
      let bottomOfLine = top + lineHeight
      // console.log(bottomOfLine)
      
      if (textElement.tagName !== 'DIV') textElement = textElement.closest('div')
      
      let selection = getHTMLCaretPosition(textElement)
      // console.log(selection)

      let pos = getCursorXY(textElement, selection)
      caret.x = pos.x
      caret.y = pos.y
      // console.log(pos)
      
      value.value = div.innerHTML
      // setCurrentCursorPosition(div, selection)
    }
    const click = event => {
      let pos = getSelection()
      console.log(pos)
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
      input,
      click,
      caret,
      caretStyle
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