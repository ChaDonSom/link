window.axios = require('axios')
window.Vue = require('vue')
window.mdc = require('material-components-web/dist/material-components-web')

import {qu, qua} from './modules/helpers.js'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

import {MDCTextField} from '@material/textfield'

/*
// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/budget/budget-sw.js').then(reg => {
    console.log("registered worker: scope is ",reg.scope)
    return navigator.serviceWorker.ready
  }).then(() => {
    console.log('sending message to worker...')
    sendMessage('hi there').then(res => console.log(res)).catch(e => console.warn(e))
  }).catch(e => console.warn(e))
}
*/

// Send a message to the service worker
function sendMessage(message) {
  // This wraps the message posting/response in a promise, which will resolve if the response doesn't
  // contain an error, and reject with the error if it does. If you'd prefer, it's possible to call
  // controller.postMessage() and set up the onmessage handler independently of a promise, but this is
  // a convenient wrapper.
  return new Promise(function(resolve, reject) {
    var messageChannel = new MessageChannel()
    messageChannel.port1.onmessage = function(event) {
      if (event.data.error) {
        reject(event.data.error)
      } else {
        resolve(event.data)
      }
    }

    // This sends the message data as well as transferring messageChannel.port2 to the service worker.
    // The service worker can then use the transferred port to reply via postMessage(), which
    // will in turn trigger the onmessage handler on messageChannel.port1.
    // See https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage
    navigator.serviceWorker.controller.postMessage(message,
      [messageChannel.port2])
  })
}

// Event bus must be defined before components
window.Events = new Vue()

import listCheck from './budget/ListCheck.vue'
import addBill   from './budget/AddBill.vue'

const app = new Vue({
    el: '#main',
    components: {
      flatPickr, listCheck, addBill
    },

    data: {
      Events,
      checks: [],
      bills: [],
      cal: {
        value: '',
        config: {},
        fp: null
      },
      checkAmount: 1458
    },

    methods: {
      pageLoaded() {
        if (this.checks.length < 1) {
          axios.get('/budget/checks').then(resp => {
            this.checks = resp.data
            if (this.bills.length < 1) {
              axios.get('/budget/bills').then(resp => {
                this.bills = resp.data
                this.allocateBills()
              }).catch(e => console.warn(e))
            }
          }).catch(e => console.warn(e))
        }
      },
      addCheck() {
        this.cal.fp.open()
      },
      saveNewCheck(ev) {
        // Close calendar picker
        this.cal.fp.close()
        // build check object (date & amount)
        let check = {
          date: ev,
          amount: this.checkAmount
        }
        // Post to database
        console.log("saving new check with date: ",check)
        axios.post('/budget/checks', check).then(resp => {
          // Update local checks
          let check = resp.data
          check.date = check.date.date.split(" ")[0]
          this.checks.push(resp.data)
        }).catch(err => console.warn(err))
      },
      findCheckAfter(id) {
        var startCheck
        for (let check of this.checks) {
          if (check.id == id) startCheck = check
        }
        if (!startCheck) return new Date()
        var startDate = new Date(startCheck.date)
        var earliestDate, earliestCheck
        for (let check of this.checks) {
          let compareDate = new Date(check.date)
          if (compareDate > startDate) {
            if (!earliestDate) earliestDate = compareDate
            if (compareDate < earliestDate) {
              earliestDate = compareDate
              earliestCheck = check
            }
          }
        }
        if (!earliestCheck) return {date: startDate.getTime() + 12096e5} // 2 weeks in milliseconds
        return earliestCheck
      },
      addedBill(bill) {
        this.bills.push(bill)
        this.placeBill(bill.id)
      },
      updatedBill(resp) {
        console.log(resp)
      },
      allocateBills() {
        console.log("allocating bills...")
        for (let bill of this.bills) {
          this.placeBill(bill.id)
          // update list-checks w/ their bills?
        }
        this.sortBills()
      },
      sortBills() {
        for (let check of this.checks) {
          if (!check.bills) continue
          let anySwitched = true
          while (anySwitched === true) {
            anySwitched = false
            for (let i=1; i<check.bills.length; i++) {
              let bill = check.bills[i]
              let thisDate = new Date(bill.date)
              let lastDate = new Date(check.bills[i-1].date)
              if (thisDate.getTime() < lastDate.getTime()) {
                let temp = bill
                check.bills[i] = check.bills[i-1]
                check.bills[i-1] = temp
                anySwitched = true
              }
            }
          }
        }
      },
      placeBill(id) {
        let bill = this.getBill(id)
        if (!bill.id) return
        for (let check of this.checks) {
          // Vue.set(check, 'bills', [])
          // get start date
          let startDate = new Date(check.date)
          // get end date
          // find soonest check after this one
          let endDate = new Date(this.findCheckAfter(check.id).date)
          // < end date && > start date?
          var billDate = new Date(bill.date)
          if (isNaN(billDate.getTime())) billDate = new Date(bill.date.date)
          // console.log("start: ",startDate.getMonth()+"-"+startDate.getDate(), "; end: ",endDate.getMonth()+"-"+endDate.getDate(), "; bill: ", billDate.getMonth()+"-"+billDate.getDate())
          if (startDate.getTime() <= billDate.getTime() && billDate.getTime() < endDate.getTime()) {
            bill.check = check.id
          }
        }
        if (bill.check) {
          for (let check of this.checks) {
            if (check.id == bill.check) {
              if (check.bills) {
                check.bills.push(bill)
              } else {
                Vue.set(check, 'bills', [bill])
              }
            }
          }
          
        } else {
          console.log("no check was found for bill: ",billDate)
        }
      },
      getBill(id) {
        for (let bill of this.bills) {
          if (bill.id == id) return bill
        }
        return {}
      },
      deletedCheck(id) {
        for (let c in this.checks) {
          if (this.checks[c].id == id) this.checks.splice(c,1)
        }
      },
      deletedBill(id) {
        for (let b in this.bills) {
          if (this.bills[b].id == id) this.bills.splice(b,1)
        }
        this.allocateBills()
      }
    },

    mounted() {
      axios.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      }
      mdc.autoInit()
      Vue.set(this.cal, 'fp', this.$refs.flatPickr.fp)
      this.textfield = new MDCTextField(this.$refs.checkAmount)
      this.pageLoaded()
    }
})



console.log('budget-app.js loaded')
