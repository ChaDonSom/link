// Bills module
import { mutations, actions } from '@store/base'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    data: {},
    oldData: {},
    includeOld: true,
  },
  getters: {
    includeOld: s => s.includeOld,
    data: (s, g) => {
      if (g.includeOld) return {
        ...s.data,
        ...s.oldData
      }
      return s.data
    },
  },
  mutations: {
    ...mutations,
  },
  actions: {
    ...actions,
    async fetch({ dispatch, getters }, p) {
      let request = await axios.get('/api/bills')
      if (getters.includeOld) var requestForOld = await axios.get('/api/old/bills')
      dispatch('set', ['', 'data', request.data.reduce((acc, curr) => {
        acc[curr.id] = curr
        return acc
      }, {})])
      if (getters.includeOld) dispatch('set', ['', 'oldData', requestForOld.data.reduce((acc, curr) => {
        acc[curr.id + .5] = curr
        return acc
      }, {})])
    }
  }
}