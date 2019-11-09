import { Vuex } from '@js/bootstrap'

import { mutations, getters, actions } from '@store/base'

export const store = new Vuex.Store({
  mutations,
  getters,
  actions
})