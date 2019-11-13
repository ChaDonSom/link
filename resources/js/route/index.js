import { VueRouter } from '@js/bootstrap'

import { auth } from '@route/guards'

import Home     from '@pages/Home.vue'
import Login    from '@pages/Login.vue'
import Welcome  from '@pages/Welcome.vue'
import Register from '@pages/Register.vue'

const routes = [
  { path: '/',         component: Home,     props: true },
  { path: '/login',    component: Login,    props: true },
  { path: '/welcome',  component: Welcome,  props: true },
  { path: '/register', component: Register, props: true },
]

const router = new VueRouter({
  routes
})

router.beforeEach(auth)

export {
  router
}