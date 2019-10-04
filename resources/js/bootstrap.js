
window._ = require('lodash')
window.axios = require('axios')

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

let token = document.head.querySelector('meta[name="csrf-token"]')

if (token) window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content
else console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token')

window.user = document.head.querySelector('meta[name="user"]');
if (window.user) window.user = JSON.parse(window.user.content)
let api_token = window.user ? window.user.api_token : false

if (api_token) window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + api_token
else console.warn("API Token not found: user: ", window.user)

window.Vue = require('vue')

import VueCompositionApi from '@vue/composition-api'
Vue.use(VueCompositionApi)

window.Bus = new Vue({ name: 'Bus' })