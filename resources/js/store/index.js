import { Vuex } from '@js/bootstrap'

import { mutations, getters, actions } from '@store/base'

import auth from '@store/modules/auth'

const store = new Vuex.Store({
  state: {
    modules: []
  },
  mutations,
  getters,
  actions,
  modules: {
    auth,
  }
})

store.usesModule = function(name, module, nicely) {
  if (!nicely) {
    if (this.state.modules.includes(name)) this.unregisterModule(name)
    this.registerModule(name, module)
  } else /* if nicely */ {
    if (!this.state.modules.includes(name)) this.registerModule(name, module)
  }
  if (!this.state.modules.includes(name)) this.commit('set', ['modules', [
    ...this.state.modules,
    name
  ]])
}
store.usesModules = function(modulesRegistry, nicely) {
  Object.keys(modulesRegistry).forEach(key => {
    this.usesModule(key, modulesRegistry[key], nicely)
  })
}

export {
  store
}