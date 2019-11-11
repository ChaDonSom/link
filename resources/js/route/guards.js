// Route guards
import authModule from '@store/modules/auth'

const guestRoutes = [
  '/welcome',
  '/login'
]

export function auth(to, from, next) {
  if (authModule.getters.user) next()
  else if (!guestRoutes.includes(to.path)) {
    authModule.commit('saveIntended', from)
    next('/welcome')
  }
  else next()
}