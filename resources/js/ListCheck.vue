<template>
  <div class="mdc-layout-grid__cell--span-12">
    <p @click="edit" :key="check.id" :ref="'check'+check.id"
        v-show="!editing" style="cursor: pointer;">
      {{ check.date }}: ${{ check.amount }}
    </p>
    <p class="total" v-show="!editing">
      leftover: ${{ total }}... total expense: ${{ billTotal }}
    </p>
    <div class="mdc-text-field mdc-text-field--with-trailing-icon" ref="mdc-textfield" v-show="editing">
      <input type="text" :id="'check-edit-'+check.id" class="mdc-text-field__input" v-model="text"
          @keyup.enter="finish" @change="finish" @blur="finish" ref="textfieldInput">
      <label class="mdc-floating-label" :for="'check-edit-'+check.id">edit...</label>
      <i class="material-icons mdc-text-field__icon delete" tabindex="0" role="button" @click="trash">delete</i>
      <div class="mdc-line-ripple"></div>
    </div>
    <budget-bill v-for="bill of check.bills" :bill="bill" :key="'bill-'+bill.id"
        @bill-remove="$emit('bill-remove', $event)" @bill-update="$emit('bill-update', $event)">
    </budget-bill>
  </div>
</template>


<script>
import {MDCTextField} from '@material/textfield'
import budgetBill from './BudgetBill.vue'

export default {
  props: ['check'],
  components: {
    budgetBill
  },
  data() {
    return {
      text: '',
      editing: false,
      beforeEdit: '',
      billTotal: 0
    }
  },
  computed: {
    total() {
      var tot = this.check.amount
      if (!tot) return 0
      var bills = this.check.bills
      if (!bills) return tot
      var totBill = 0
      for (let bill of bills) {
        tot -= +bill.amount
        totBill += +bill.amount
      }
      this.billTotal = totBill
      return tot
    }
  },
  methods: {
    edit() {
      this.text = this.check.date + ': $'+ this.check.amount
      this.beforeEdit = this.text
      this.editing = true
      setTimeout(() => {
        this.$refs.textfieldInput.focus()
      }, 100)
    },
    finish() {
      // validate text
      if (!this.text.includes(':') || !this.text.includes('$')) return alert("Please format the text with 'date: $amount'")
      this.editing = false
      // parse text
      if (this.text == this.beforeEdit) return // we don't need to update if it wasn't changed
      let date = this.text.split(':')[0]
      let amount = this.text.split('$')[1]
      // update database
      let check = this.check
      check.date = date
      check.amount = amount
      axios.post('/budget/checks/'+this.check.id, check).then(resp => {
        console.log(resp)
        // update local
        this.$emit('check-update', resp) // plan this will have root update checks
      }).catch(err => console.warn(err))
    },
    trash() {
      // Delete check from database
      if (!confirm("Are you sure you want to delete this check?")) return
      axios.post('/budget/checks/'+this.check.id+'/delete').then(resp => {
        console.log(resp)
        this.$emit('check-remove', this.check.id)
      }).catch(err => console.warn(err))
    }
  },
  mounted() {
    this.textfield = new MDCTextField(this.$refs['mdc-textfield'])
  }
}
</script>


<style scoped lang="scss">
.mdc-layout-grid__cell--span-12 {
  border-top: 1.5px solid #dfdfdf;
}
p {
  display: inline-block;
  max-width: 50%;
  &:last-of-type {
    margin-left: 60px;
  }
}
.mdc-textfield {
  max-width: 200px;
}
.delete {
  color: red;
}
</style>