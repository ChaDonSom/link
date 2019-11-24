
window._ = require('lodash')
window.axios = require('axios')

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

window.axios.get('/refresh_token')
  .then(response => {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.token
  })
  .catch(error => {
    // axios.get('/logout')
  })

window.user = document.head.querySelector('meta[name="user"]');
if (window.user && window.user.content) window.user = JSON.parse(window.user.content)
else window.user = null
let api_token = window.user ? window.user.api_token : false

if (api_token) window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + api_token
else console.warn("API Token not found: user: ", window.user)


import Vue       from 'vue'
import Vuex      from 'vuex'
import VueRouter from 'vue-router'
import VCA       from '@vue/composition-api'

window.Vue       = Vue
window.Vuex      = Vuex
window.VueRouter = VueRouter
window.VCA       = VCA
Vue.use(VCA)
Vue.use(Vuex)
Vue.use(VueRouter)

window.Bus = new Vue({ name: 'Bus' })

export {
  Vue,
  Vuex,
  VueRouter,
  VCA
}