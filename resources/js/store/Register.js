import { mutations, getters, actions } from '@store/base'

export default {
  namespaced: true,
  state() { return {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }},
  mutations: { ...mutations },
  getters: {
    ...getters,
    name(s, g, rS, rG) { return s.name },
    email(s, g, rS, rG) { return s.email },
    password(s, g, rS, rG) { return s.password },
    password_confirmation(s, g, rS, rG) { return s.password_confirmation },
  },
  actions: { ...actions },
}