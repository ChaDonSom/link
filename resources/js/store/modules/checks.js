// Checks Module
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
    array: (s, g) => {
      if (g.includeOld) return Object.keys(s.data).map(k => s.data[k])
        .concat(Object.keys(s.oldData).map(k => s.oldData[k]))
      return Object.keys(s.data).map(k => s.data[k])
    }
  },
  mutations: {
    ...mutations,
  },
  actions: {
    ...actions,
    async fetch({ dispatch, getters }, p) {
      let request = await axios.get('/api/checks')
      if (getters.includeOld) var requestForOld = await axios.get('/api/old/checks')
      dispatch('set', ['', 'data', request.data.reduce((acc, curr) => {
        acc[curr.id] = { ...curr, uid: curr.id }
        return acc
      }, {})])
      if (getters.includeOld) dispatch('set', ['', 'oldData', requestForOld.data.reduce((acc, curr) => {
        acc[curr.id + .5] = { ...curr, uid: curr.id + .5 }
        return acc
      }, {})])
    }
  }
}