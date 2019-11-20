// Checks Module
import { mutations, actions } from '@store/base'
import axios from 'axios'
import moment from 'moment'

export default {
  namespaced: true,
  state: {
    data: {},
    oldData: {},
    includeOld: true,
    open: null,
    opens: [],
  },
  getters: {
    includeOld: s => s.includeOld,
    data: (s, g) => {
      if (g.includeOld) return s.data
      let resp = {}
      for (let key of Object.keys(s.data)) {
        let check = s.data[key]
        if (!check.is_legacy) resp[key] = check
      }
      return resp
    },
    array: (s, g) => {
      if (g.includeOld) return Object.keys(g.data).map(k => g.data[k])
      return Object.keys(s.data).map(k => s.data[k]).filter(check => !check.is_legacy)
    },
    getCheckById: (s, g) => id => {
      let checks = g.array
      return checks.find(check => check.id === id)
    },
    findIndexByDate: (s, g) => date => {
      let checks = g.array
      return checks.findIndex(check => {
        // check date <= arg date,
        // AND check's end date > arg date
        let start = moment.utc(check.date)
        let end   = moment.utc(check.end_date)
        let date  = moment(date)
        return date.diff(start) >= 0 && end.diff(date) > 0
      })
    },
    last: (s, g) =>  s.opens[s.opens.length - 1],
    lastIndex: (s, g) => {
      let checks = g.array
      let last = g.last
      if (!last) return false
      return checks.findIndex(check => check.id === last.id)
    }
  },
  mutations: {
    ...mutations,
    recordVisit: (s, p) => {
      s.open = p
      s.opens = [
        ...s.opens,
        p,
      ]
    }
  },
  actions: {
    ...actions,
    async fetch({ dispatch, getters }, p) {
      let request = await axios.get('/api/checks')
      // if (getters.includeOld) var requestForOld = await axios.get('/api/old/checks')
      
      if (request.status !== 200) return console.error("Request failed: ", request)
      // if (requestForOld && requestForOld.status !== 200) return console.error("Request for legacy failed: ", requestForOld)
      
      dispatch('set', ['', 'data', request.data.reduce((acc, curr) => {
        acc[curr.id] = { ...curr, uid: curr.id }
        return acc
      }, {})])
      // if (getters.includeOld) dispatch('set', ['', 'oldData', requestForOld.data.reduce((acc, curr) => {
      //   acc[curr.id + .5] = { ...curr, uid: curr.id + .5 }
      //   return acc
      // }, {})])
    }
  }
}