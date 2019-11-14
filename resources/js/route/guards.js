// Route guards
import { store } from '@store'

const guestRoutes = [
  '/welcome',
  '/login'
]

export function auth(to, from, next) {
  if (store.getters['auth/user']) {
    if (guestRoutes.includes(to.path)) next('/')
    else next()
  } else if (!guestRoutes.includes(to.path)) {
    if (!guestRoutes.includes(from.path)) store.commit('auth/saveIntended', from)
    next('/welcome')
  }
  else next()
}