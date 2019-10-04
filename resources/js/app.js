require('bootstrap')

import { store, router } from '@js/vue-setup'
import Vue from 'vue'

const app = new Vue({
  store,
  router,
  el: '#app',
  mounted() {
    if (!window.user && !['/welcome', '/login'].includes(this.$route.path)) this.$router.replace('/welcome')
  }
})
