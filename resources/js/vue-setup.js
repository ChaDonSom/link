import { Vue, VCA, VueRouter, Vuex } from '@js/bootstrap'
import { reactive, ref, toRefs, onMounted } from '@vue/composition-api'

import Home    from '@pages/Home.vue'
import Login   from '@pages/Login.vue'
import Welcome from '@pages/Welcome.vue'

const routes = [
  { path: '/',        component: Home, },
  { path: '/login',   component: Login, },
  { path: '/welcome', component: Welcome, }
]

const store = new Vuex.Store({
  
})

const router = new VueRouter({
  routes
})

export {
  store,
  router
}