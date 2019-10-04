import Vue from 'vue'
import VueCompositionApi, { reactive, ref, toRefs, onMounted } from '@vue/composition-api'
Vue.use(VueCompositionApi)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Vuex from 'vuex'
Vue.use(Vuex)

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