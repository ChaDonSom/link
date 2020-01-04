<template>
  <layout>
    <template #toolbar-top>
      <page-top-bar
      />
    </template>
    <template #default>
      <grid v-cloak
          :style="gridStyle"
          ref="grid"
      >
        <grid-inner style="min-height: calc(var(--min-height) - var(--padding);">
          <cell :span="12">
            <editor class="editor" />
            <!-- input box / content display/edit -->
              <!-- input / editable itself -->
              <!-- typing options dropdown -->
                <!-- quick mention -->
                <!-- custom-named mention -->
          </cell>
        </grid-inner>
     </grid>
    </template>
    <template #toolbar-bottom>
      <page-edit-bar
      />
    </template>
  </layout>
</template>

<script>
import Vue from '@js/bootstrap'
import {
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  onBeforeUnmount,
  computed,
  ref,
  watch
} from '@js/vue-setup'
import FlatPickr from 'flatpickr'
import { appUrl, user, session } from '@traits/AccessesHeadMeta'
import moment from 'moment'
import axios from 'axios'
import Modal from '@comps/Modal'
import PageTopBar from '@comps/PageTopBar'
import PageEditBar from '@comps/PageEditBar'
import Layout from '@js/layout/Editor'
import Grid from '@mdc/grid.vue'
import GridInner from '@mdc/grid-inner.vue'
import Cell from '@mdc/cell.vue'
import MdcButton from '@mdc/button'
import IconButton from '@mdc/icon-button'
import ButtonLabel from '@mdc/button-label'
import ButtonIcon from '@mdc/button-icon'
import Textfield from '@mdc/textfield.vue'
import Editor from '@comps/Editor'
export default {
  name: "Home",
  components: {
    FlatPickr,
    Layout,
    Grid,
    GridInner,
    Cell,
    MdcButton,
    IconButton,
    Modal,
    Textfield,
    ButtonLabel,
    ButtonIcon,
    Editor,
    PageTopBar,
    PageEditBar,
  },
  setup(props, context) {
    const $store = context.root.$store
    const $router = context.root.$router
    // $store.usesModules({
    //   checks: ChecksModule
    // })
    
    const grid    = ref(null)
    const padding = ref(null)
    function updatePaddingValue() {
      if (!grid.value) return
      let gridComputedStyle = window.getComputedStyle(grid.value.$el)
      let propertyValue = gridComputedStyle.getPropertyValue('padding-top')
      padding.value = (Number(propertyValue.split('px')[0]) * 2) + 'px'
    }
    
    window.addEventListener('resize', updatePaddingValue)
    watch(() => grid.value, updatePaddingValue)
    
    const gridStyle = reactive({
      '--padding': computed(() => padding.value)
    })
     
    onMounted(() => {
    //  $store.dispatch('checks/fetch')
    })
    
    return {
      grid,
      gridStyle
    }
  },
}
</script>

<style scoped lang="scss">
@import "~sass/flex";

.editor {
  display: block;
  width: 100%;
  height: 100%;
  &:focus { outline: none; }
  outline: 2px solid blue;
}
</style>
