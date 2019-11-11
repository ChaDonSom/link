import { Vuex } from '@js/bootstrap'

import { mutations, getters, actions } from '@store/base'

import auth from '@store/modules/auth'

const store = new Vuex.Store({
  mutations,
  getters,
  actions,
  modules: {
    auth
  }
})

store.usesModule = function(name, module) {
  if (this.state[name]) this.unregisterModule(name)
  this.registerModule(name, module)
}
store.usesModules = function(modulesRegistry) {
  Object.keys(modulesRegistry).forEach(key => {
    this.usesModule(key, modulesRegistry[key])
  })
}

export {
  store
}