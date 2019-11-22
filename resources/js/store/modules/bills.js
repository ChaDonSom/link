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
    array: (s, g) => {
      if (g.includeOld) return Object.keys(g.data).map(k => g.data[k])
      return Object.keys(s.data).map(k => s.data[k]).filter(bill => !bill.is_legacy)
    },
  },
  mutations: {
    ...mutations,
  },
  actions: {
    ...actions,
    async fetch({ dispatch, getters }, p) {
      let request = await axios.get('/api/bills')

      if (request.status !== 200) return console.error("Request failed: ", request)

      dispatch('set', ['', 'data', request.data.reduce((acc, curr) => {
        acc[curr.id] = curr
        return acc
      }, {})])
    },
    async page({ dispatch, getters }, p) {
      let request = await axios.get(`/api/bills?page=${p}`)

      if (request.status !== 200) return console.error("Request failed: ", request)

      dispatch('set', ['', 'data', request.data.reduce((acc, curr) => {
        acc[curr.id] = curr
        return acc
      }, {})])
    }
  }
}