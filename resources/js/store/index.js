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


let cacheUnregisterModule = store.unregisterModule
store.unregisterModule = name => {
  console.log('module name:', name)
  store.commit('removeModule', name)
  console.log('modules left: ', store.state.modules.reduce((c, a) => a +' '+ c, ''))
  cacheUnregisterModule.apply(store, name)
}

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