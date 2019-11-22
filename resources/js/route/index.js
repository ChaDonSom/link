import { VueRouter } from '@js/bootstrap'

import { auth } from '@route/guards'

import Login    from '@pages/Login.vue'
import Welcome  from '@pages/Welcome.vue'
import Register from '@pages/Register.vue'

import Home     from '@pages/Home.vue'
import Check    from '@pages/Check.vue'
import Bills    from '@pages/Bills.vue'

const routes = [
  { path: '/',          component: Home,     props: true },
  { path: '/check/:id', component: Check,    props: true },
  { path: '/bills',     component: Bills,    props: true },
  
  { path: '/login',     component: Login,    props: true },
  { path: '/welcome',   component: Welcome,  props: true },
  { path: '/register',  component: Register, props: true },
]

const router = new VueRouter({
  routes
})

router.beforeEach(auth)
// router.beforeEach((to, from, next) => {
//   let $store = router.app.$store
//   if ($store) {
//     let modules = $store.state.modules
//     if (modules) {
//       for (let module of modules) {
//         $store.unregisterModule(module)
//       }
//     }
//   }
//   next()
// })

export {
  router
}