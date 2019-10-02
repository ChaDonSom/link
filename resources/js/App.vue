<template>
  <grid>
    <grid-inner>
      <cell v-if="!user"
          :desktop="4"
           :tablet="2"
            :phone="2" >
        You must be signed in to use the Budget app. <br>
        <a href="/login">Log in</a>
      </cell>
      <cell v-else class="add-check-row"
          :desktop="8"
           :tablet="5"
            :phone="3" >
        <button class="mdc-icon-button material-icons" @click="addCheck"
            title="add new paycheck">add</button>
        <flat-pickr :config="cal.config" v-model="cal.value" @on-change="saveNewCheck"
            ref="flatPickr"></flat-pickr>
        <div class="mdc-text-field mdc-text-field--with-leading-icon" ref="checkAmount">
          <i class="mdc-text-field__icon" tabindex="0">$</i>
          <input type="text" id="check-amount" class="mdc-text-field__input" v-model="checkAmount">
          <label class="mdc-floating-label" for="check-amount">Deposit Amount</label>
          <div class="mdc-line-ripple"></div>
        </div>
      </cell>
      <list-check v-for="check of checks" :check="check" :key="'check-'+check.id"
          @check-remove="deletedCheck" @bill-remove="deletedBill"
          @bill-update="updatedBill"></list-check>
      <!--<div class="mdc-layout-grid__cell--span-12 add-bill-line"><em>add bill:</em></div>-->
      <add-bill @bill-add="addedBill"></add-bill>
    </grid-inner>
  </grid>
</template>

<script>
import FlatPickr from 'flatpickr'
import AddBill from '@js/AddBill.vue'
import Grid from '@mdc/grid.vue'
import GridInner from '@mdc/grid-inner.vue'
import Cell from '@mdc/cell.vue'
import { appUrl, user, session } from '@traits/AccessesHeadMeta'
export default {
  name: "App",
  components: { FlatPickr, AddBill, Grid, GridInner, Cell },
  data() { return {
    user: window.user,
  }},
  methods: {
    addCheck() {},
    saveNewCheck() {},
    checkAmount() {},
    checks() {},
    cal() {},
    addedBill() {},
  },
  mounted() {
    // just to save us from bad users who have no api token
    if (!this.user && location.href.includes('/login')) this.user = true
  }
}
</script>

<style scoped lang="scss">
</style>