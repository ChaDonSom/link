import { VueRouter } from '@js/bootstrap'

import { auth } from '@route/guards'

import Home    from '@pages/Home.vue'
import Login   from '@pages/Login.vue'
import Welcome from '@pages/Welcome.vue'

const routes = [
  { path: '/',        component: Home, },
  { path: '/login',   component: Login, },
  { path: '/welcome', component: Welcome, }
]

const router = new VueRouter({
  routes
})

router.beforeEach(auth)

export {
  router
}