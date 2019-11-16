const mutations = {
  set: (state, payload) => {
    let baseProp = payload[0], p = payload[1], v = payload[2]
    baseProp = baseProp.split('.')
    let prop = state
    if (baseProp.length > 1) for (let load of baseProp) { if (prop) prop = prop[load] }
    if (payload.length === 3) {
      if (payload[0] && prop[payload[0]]) prop = prop[payload[0]]
      prop[p] = v
    } else if (payload.length === 2) prop[payload[0]] = p
  }
}

const getters = {
  
}

const actions = {
  set: ({ dispatch, commit, getters, rootGetters }, payload) => {
    commit('set', payload)
  }
}

export { mutations, getters, actions }