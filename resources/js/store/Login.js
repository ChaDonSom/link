import { mutations, getters, actions } from '@store/base'

export default {
  namespaced: true,
  state() { return {
    email: '',
    password: '',
  }},
  mutations: { ...mutations },
  getters: {
    ...getters,
    email(s, g, rS, rG) { return s.email },
    password(s, g, rS, rG) { return s.password },
  },
  actions: { ...actions },
}