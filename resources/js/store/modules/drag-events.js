// UI Drag Events module
import { mutations, actions } from '@store/base'

export default {
  namespaced: true,
  state: {
    events: [],
    drags: [],
  },
  getters: {
    
  },
  mutations: {
    ...mutations,
  },
  actions: {
    ...actions,
  },
  modules: {
    history: {
      namespaced: true,
      state: {
        event: 10,
        drag: 5,
      },
      getters: {
        event: s => s.event,
        drag:  s => s.drag,
      },
      actions: {
        reset: (c, p) => {
          c.commit('set', {
            key: p,
            value: []
          }, { root: true })
        }
      }
    }
  }
}