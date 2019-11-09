// Route guards

export function auth(to, from, next) {
  if (window.user) next()
  else next('/welcome')
}