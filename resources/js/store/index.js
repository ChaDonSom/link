import { Vuex } from '@js/bootstrap'

import { mutations, getters, actions } from '@store/base'

import auth from '@store/modules/auth'

const store = new Vuex.Store({
  state: {
    modules: []
  },
  mutations: {
    ...mutations,
    removeModule: (s, p) => {
      let modules = []
      for (let module of s.modules) {
        if (module !== p) modules.push(module)
      }
      s.modules = modules
    }
  },
  getters,
  actions,
  modules: {
    auth,
  }
})


store.unuseModule = function(name) {
  console.log('module name:', name)
  this.commit('removeModule', name)
  console.log('modules left: ', this.state.modules.reduce((c, a) => a +' '+ c, ''))
  this.unregisterModule(name)
}

store.usesModule = function(name, module, nicely) {
  if (!nicely) {
    if (this.state.modules.includes(name)) this.unuseModule(name)
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