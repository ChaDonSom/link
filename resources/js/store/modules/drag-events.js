// UI Drag Events module
import { mutations, actions } from '@store/base'
import { Vue } from '@js/bootstrap'

const store = {
  namespaced: true,
  state: {
    events: {},
    drags: {},
    dragId: 0,
    eventId: 0,
  },
  getters: {
    drags: (s, g) => id => {
      if (!id && id !== 0) {
        let resp = []
        for (let x = 0; x < s.dragId; x++) {
          resp.push(s.drags[x])
        }
        return resp
      } else {
        let drag = s.drags[id]
        if (!drag) return console.error(`Couldn't find drag id ${id}.`)
        drag.events = g.eventsFor(id)
        return drag
      }
    },
    eventsFor: (s, g) => id => {
      let resp = []
      let minimumId = s.eventId - g['history/event']
      if (minimumId < 0) minimumId = 0
      for (let x = minimumId; x < s.eventId; x++) {
        let event = s.events[x]
        if (event.drag_id === id) resp.push(event)
      }
      return resp
    },
  },
  mutations: {
    ...mutations,
    nextId: (state, name) => {
      let id = state[`${name}Id`]
      state[`${name}Id`] = id + 1
    },
    setInitialDirection: (state, { id, direction }) => {
      let drag = state.drags[id]
      if (!drag.initialDirection) Vue.set(drag, 'initialDirection', direction)
    },
    done: (state, id) => {
      let drag = state.drags[id]
      Vue.set(drag, 'done', true)
    },
    'delete': (state, payload) => {
      if (state[payload[0]][payload[1]]) delete state[payload[0]][payload[1]]
    },
  },
  actions: {
    ...actions,
    newInstance({ commit, state, getters, dispatch }, p) {
      let g = getters
      let id = state.dragId
      let maxIds = getters['history/drag']
      commit('nextId', 'drag')
      p.id = id
      commit('set', ['drags', id, p])
      let idToRemove = id - maxIds
      if (idToRemove >= 0) commit('delete', ['drags', idToRemove])
    },
    newEvent({ commit, state, getters, dispatch }, p) {
      let g = getters
      let id = state.eventId
      commit('nextId', 'event')
      commit('set', ['events', id, {
        ...p,
        id
      }])
    }
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
        reset: ({ commit }, p) => {
          let reset = p => commit('set', {
            key: p,
            value: []
          }, {
            root: true
          })
          
          if (p) reset(p)
          else {
            reset('events')
            reset('drags')
          }
        }
      }
    }
  }
}

export class DragInstance {
  constructor($store, e) {
    let nicely = true
    this.$store = $store
    
    $store.usesModule('dragEvents', store, nicely)
    
    this.state = {
      done: false,
      initialDirection: null
    }
    $store.dispatch('dragEvents/newInstance', this.state)

    if (e) this.addEvent(e)
    
    this.done = () => this.$store.commit('dragEvents/done', this.state.id)
  }
  
    
  addEvent(event) {
    let directionH = event.dx > 0 ? 'right' : 'left'
    let directionV = event.dy > 0 ? 'down'  : 'up'
    let drag_id = this.state.id
    this.$store.dispatch('dragEvents/newEvent', {
      directionH,
      directionV,
      drag_id,
      dx: event.dx,
      dy: event.dy
    })
  }
  
  get events() {
    return this.$store.getters['dragEvents/eventsFor'](this.state.id)
  }
  
  get draggingDirection() {
    let events = this.events
    let totalLeft = 0, totalRight = 0
    let totalUp = 0, totalDown = 0
    for (let ev of events) {
      if (ev.directionH === 'right') totalRight ++
      else totalLeft ++
      if (ev.directionV === 'up') totalUp ++
      else totalDown ++
    }
    let v = totalUp > totalDown ? 'up' : 'down'
    let h = totalLeft > totalRight ? 'left': 'right'
    let vh = `${v}_${h}`
    
    if (events.length < this.$store.getters['dragEvents/history/event']) {
      if (!this.initialDirection) { this.initialDirection = vh }
    }
    
    return vh
  }
  
  get initialDirection() { return this.$store.getters['dragEvents/drags'](this.state.id).initialDirection }
  set initialDirection(v) {
    this.$store.commit('dragEvents/setInitialDirection', { id: this.state.id, direction: v })
  }
}

export default store