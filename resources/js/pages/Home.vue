<template>
  <grid v-cloak>
    <grid-inner>
      <cell :span="12">
        <mdc-button @click="logout">Log out</mdc-button>
      </cell>
      <cell :span="12">
        <CheckStack
            v-if="checks && checks.length"
            v-model="checks"
            @new-check="newCheck"
        />
      </cell>
      <cell :span="12" style="display: flex;">
        <mdc-button @click="newCheck" style="margin: auto;">New check</mdc-button>
      </cell>
      <cell :span="12" style="display: flex;">
        <mdc-button @click="newBill" style="margin: auto;">New bill</mdc-button>
      </cell>
    </grid-inner>
    <Modal
        v-model="currentAddingCheck"
        @close="closeNewCheck"
    >
      <template v-slot="{ value }">
        <grid>
          <grid-inner>
            <cell :span="12">
              <textfield type="number" v-model.number="value.amount" autofocus>Amount</textfield>
            </cell>
            <cell :span="12">
              <textfield type="date" v-model="value.date" autofocus>Date</textfield>
            </cell>
            <cell :span="12">
              <mdc-button @click="saveNewCheck"
                style="margin: 0 calc(50% - 37px);"
              >
                <button-label>Save</button-label>
                <button-icon>save</button-icon>
              </mdc-button>
            </cell>
          </grid-inner>
        </grid>
      </template>
    </Modal>
    <Modal
        v-model="currentAddingBill"
        @close="closeNewBill"
    >
      <template v-slot="{ value }">
        <grid>
          <grid-inner>
            <cell :span="12">
              <textfield v-model="value.label" autofocus>For</textfield>
            </cell>
            <cell :span="12">
              <textfield type="number" v-model="value.amount" autofocus>Amount</textfield>
            </cell>
            <cell :span="12">
              <textfield type="date" v-model="value.date" autofocus>Date</textfield>
            </cell>
            <cell :span="12">
              <mdc-button @click="saveNewBill"
                style="margin: 0 calc(50% - 37px);"
              >
                <button-label>Save</button-label>
                <button-icon>save</button-icon>
              </mdc-button>
            </cell>
          </grid-inner>
        </grid>
      </template>
    </Modal>
  </grid>
</template>

<script>
import Vue from '@js/bootstrap'
import { reactive, toRefs, onBeforeMount, onMounted, onBeforeUnmount, computed, ref } from '@vue/composition-api'
import FlatPickr from 'flatpickr'
import { appUrl, user, session } from '@traits/AccessesHeadMeta'
import moment from 'moment'
import axios from 'axios'
import { logout } from '@helpers/logout'
import useCreateBill from '@traits/CreateBill'
import useCreateCheck from '@traits/CreateCheck'
import BillsModule from '@store/modules/bills'
import ChecksModule from '@store/modules/checks'
import Modal from '@comps/Modal'
import Grid from '@mdc/grid.vue'
import GridInner from '@mdc/grid-inner.vue'
import Cell from '@mdc/cell.vue'
import CheckStack from '@comps/CheckStack'
import MdcButton from '@mdc/button'
import ButtonLabel from '@mdc/button-label'
import ButtonIcon from '@mdc/button-icon'
import Textfield from '@mdc/textfield.vue'
export default {
  name: "Home",
  components: {
    FlatPickr,
    Grid,
    GridInner,
    Cell,
    CheckStack,
    MdcButton,
    Modal,
    Textfield,
    ButtonLabel,
    ButtonIcon,
  },
  setup(props, context) {
    const $store = context.root.$store
    const $router = context.root.$router
    $store.usesModules({
      checks: ChecksModule
    })
    
    const render = reactive({
      checks: computed({
        get() { return $store.getters['checks/array'] },
        set(v) {},
      })
    })
    
    const {
      currentAddingCheck,
      newCheck,
      saveNewCheck,
      closeNewCheck
    } = useCreateCheck(props, context)
    
    const {
      currentAddingBill,
      newBill,
      saveNewBill,
      closeNewBill
    } = useCreateBill(props, context)

    onMounted(() => {
      $store.dispatch('checks/fetch')
    })
    return {
      ...toRefs(render),
      logout,
      newCheck,
      closeNewCheck,
      currentAddingCheck,
      saveNewCheck,
      newBill,
      closeNewBill,
      currentAddingBill,
      saveNewBill,
    }
  },
}
</script>

<style scoped lang="scss">
</style>