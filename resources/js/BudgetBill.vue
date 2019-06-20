<template>
  <div class="budget-bill">
    <p @click="edit" :key="bill.id" :ref="'bill'+bill.id"
        v-show="!editing" style="cursor: pointer;">
      {{ date }}: ${{ bill.amount }}, {{ bill.for }}
    </p>
    <div class="mdc-text-field mdc-text-field--with-trailing-icon" ref="mdc-textfield" v-show="editing">
      <input type="text" :id="'bill-edit-'+bill.id" class="mdc-text-field__input" v-model="text"
          @keyup.enter="finish" @change="finish" @blur="finish" ref="textfieldInput">
      <label class="mdc-floating-label" :for="'bill-edit-'+bill.id">edit...</label>
      <i class="material-icons mdc-text-field__icon delete" tabindex="0" role="button" @click="trash">delete</i>
      <div class="mdc-line-ripple"></div>
    </div>
  </div>
</template>


<script>
import {MDCTextField} from '@material/textfield'
export default {
  props: ['bill'],
  data() {
    return {
      text: '',
      editing: false,
      beforeEdit: ''
    }
  },
  computed: {
    date() {
      var date = this.bill.date
      if (typeof date == 'string') return date.slice(-5)
      return date.date.split(' ')[0].slice(-5) // 2018-04-18
    }
  },
  methods: {
    edit() {
      this.text = this.bill.date +": $"+ this.bill.amount +", "+this.bill.for
      this.beforeEdit = this.text
      this.editing = true
      setTimeout(() => {
        this.$refs.textfieldInput.focus()
      }, 100)
    },
    finish() {
      // validate text
      if (!this.text.includes(':')
          || !this.text.includes('$')
          || !this.text.includes(',')) return alert("Please format the text with 'date: $amount, for'")
      this.editing = false
      // parse text
      if (this.text == this.beforeEdit) return // we don't need to update if it wasn't changed
      let date      = this.text.split(':')[0]
      let preAmount = this.text.split('$')[1]
      let amount    = preAmount.split(',')[0]
      let ifor      = preAmount.split(', ')[1]
      // update database
      let bill      = this.bill
      bill.date     = date
      bill.amount   = amount
      bill.for      = ifor
      axios.post('/budget/bills/'+this.bill.id, bill).then(resp => {
        console.log(resp)
        // update local
        this.$emit('bill-update', resp) // plan this will have root update checks
      }).catch(err => console.warn(err))
    },
    trash() {
      // Delete check from database
      if (!confirm("Are you sure you want to delete this bill?")) return
      axios.post('/budget/bills/'+this.bill.id+'/delete').then(resp => {
        console.log(resp)
        this.$emit('bill-remove', this.bill.id)
      }).catch(err => console.warn(err))
    }
  },
  mounted() {
    this.textfield = new MDCTextField(this.$refs['mdc-textfield'])
  }
}
</script>



<style scoped lang="scss">
p {
  max-width: 50%;
  padding-left: 20px;
}
</style>