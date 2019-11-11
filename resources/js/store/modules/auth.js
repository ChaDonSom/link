// Auth Module

export default {
  namespaced: true,
  state: {
    intended: '/'
  },
  getters: {
    user(s, g, rS, rG) { return window.user },
    intended(s) { return s.intended },
  },
  mutations: {
    saveIntended(s, p) { s.intended = p }
  }
}