<template>
  <div class="mdc-layout-grid__cell--span-12 add-bill">
    <div class="mdc-text-field" ref="dateMdc" v-show="adding">
      <flat-pickr :config="cal.config" v-model="text.date"
          ref="flatPickr" class="mdc-text-field__input">
      </flat-pickr>
      <label class="mdc-floating-label" for="add-bill-date-input">date</label>
      <div class="mdc-line-ripple"></div>
    </div>
    <div class="mdc-text-field" ref="amountMdc" v-show="adding">
      <input type="text" id="add-bill-amount-input" class="mdc-text-field__input"
          v-model="text.amount" @blur="modifyAmount" ref="amountInput">
      <label class="mdc-floating-label" for="add-bill-amount-input">amount</label>
      <div class="mdc-line-ripple"></div>
    </div>
    <div class="mdc-text-field" ref="forMdc" v-show="adding">
      <input type="text" id="add-bill-for-input" class="mdc-text-field__input"
          v-model="text.for" @keyup.enter="addBill" ref="forInput">
      <label class="mdc-floating-label" for="add-bill-for-input">for</label>
      <div class="mdc-line-ripple"></div>
    </div>
    <button class="mdc-icon-button material-icons" :class="{'fab': !adding, 'mdc-fab': !adding}"
        @click="addBill" title="add new bill">add</button>
  </div>
</template>



<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import {MDCTextField} from '@material/textfield'

export default {
  components: {
    flatPickr
  },
  data() {
    return {
      adding: false,
      text: {
        date: '',
        amount: '',
        for: ''
      },
      cal: {
        config: {
          
        },
        value: ''
      }
    }
  },
  methods: {
    modifyAmount() {
      if (!this.text.amount) return
      if (this.text.amount.includes('$')) return
      this.text.amount = '$' + this.text.amount
    },
    addBill() {
      if (!this.adding) return this.adding = true
      // validate
      if (!this.text.date)   return alert("Please fill in a date.")
      if (!this.text.amount) return alert("Plase fill in an amount.")
      if (!this.text.for)    return alert("Please fill in a purpose for this bill.")
      // send to server
      axios.post('/budget/bills', this.text).then(resp => {
        // update our local info
        console.log(resp)
        this.text.date   = ''
        this.text.amount = ''
        this.text.for    = ''
        this.adding = false
        this.$emit('bill-add', resp.data)
      }).catch(err => {
        console.warn(err)
      })
    }
  },
  mounted() {
    this.mdcDate   = new MDCTextField(this.$refs.dateMdc)
    this.mdcAmount = new MDCTextField(this.$refs.amountMdc)
    this.mdcFor    = new MDCTextField(this.$refs.forMdc)
    console.log("add-bill.vue mounted")
  }
}
</script>



<style scoped lang="scss">
.add-bill {
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  .mdc-text-field {
    margin: 0 5px;
    max-width: 150px;
  }
  button.mdc-icon-button {
    margin-right: auto;
    &.fab {
      position: relative;
      bottom: 14px;
      right: 14px;
      
    }
  }
}
</style>