import { Vue } from '@js/bootstrap'

import { store, router } from '@js/vue-setup'

const app = new Vue({
  store,
  router,
  el: '#app',
  mounted() {
    if (!window.user && !['/welcome', '/login'].includes(this.$route.path)) this.$router.replace('/welcome')
  }
})
