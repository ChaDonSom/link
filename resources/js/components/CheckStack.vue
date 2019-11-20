<template>
  <div class="main">
    <div class="inner">
      <div class="top card"
          ref="lastTopcard"
          :style="lastTopCardStyle"
      >
        <CheckCard
            v-if="lastTop"
            v-model="lastTop"
        />
      </div>
      <div class="top card"
          ref="topcard"
          :style="topCardStyle"
      >
        <CheckCard
            v-if="top"
            v-model="top"
        />
        <mdc-button
            v-if="!top"
            class="material-icons"
            style="height: 100%; width: 100%;"
            @click.stop="newCheck"
        >add</mdc-button>
      </div>
      <div class="card stack">
        <CheckCard
            v-if="next"
            v-model="next"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, onMounted, ref } from '@vue/composition-api'
import interact from 'interactjs'
import moment from 'moment'
import CheckCard from '@comps/CheckCard'
import MdcButton from '@mdc/button'
import { DragInstance } from '@store/modules/drag-events'
import useCreateNewCheck from '@traits/CreateNewCheck'
export default {
  name: "CheckStack",
  components: { CheckCard, MdcButton },
  props: {
    value: Array
  },
  setup(props, context) {
    const $store = context.root.$store
    const checks = computed(() => props.value)
    
    const { newCheck } = useCreateNewCheck(props, context)
    
    const topcard = ref(null)
    const lastTopcard = ref(null)
    
    const pos = reactive({ x: 0, y: 0, r: 0, o: 1 })
    const topCardStyle = computed(() => ({
      transform: `translateX(${pos.x}px)
                  translateY(${pos.y}px)
                  rotate(${pos.r}deg)`,
      opacity: pos.o
    }))
    
    const lastPos = reactive({ x: 0, y: 0, r: 0, o: 0, z: 0, placed: false })
    const lastTopCardStyle = computed(() => ({
      transform: `translateX(${lastPos.x}px)
                  translateY(${lastPos.y}px)
                  rotate(${lastPos.r}deg)`,
      opacity: lastPos.o,
      zIndex: lastPos.z,
    }))
    
    const tossed = ref([])
    const card = computed(() => {
      let value = topcard.value
      value.tossed = tossed
      value.off = function(e) {
        pos.x += e.dx
        pos.y += e.dy
        pos.r = pos.x / 10
        lastPos.z = 1
        let endingDistance = Math.sqrt(Math.pow(pos.x, 2) + Math.pow(pos.y, 2))
        let maxDistance = 100
        let o = maxDistance / endingDistance
        pos.o = o < 1 ? o : 1
        // lastPos.o = 0
      }
      value.on = function(e) {
        if (!value.tossed.value.length) {
          let xAmp = Math.abs(pos.x + e.dx)
          let yAmp = Math.abs(pos.y + e.dy)
          pos.x += (e.dx * ( 1/xAmp ) )
          pos.y += (e.dy * ( 1/yAmp ) )
          pos.r = pos.x / 30
          return
        }
        if (value.tossed.value.length && !lastPos.placed) {
          let tossed = value.tossed.value[value.tossed.value.length - 1]
          lastPos.x = tossed.x
          lastPos.y = tossed.y
          lastPos.r = tossed.r
          lastPos.placed = true
        }
        lastPos.x += e.dx
        lastPos.y += e.dy
        lastPos.r = lastPos.x / 10
        let endingDistance = Math.sqrt(Math.pow(lastPos.x, 2) + Math.pow(lastPos.y, 2))
        let maxDistance = 100
        let o = maxDistance / endingDistance
        lastPos.o = o < 1 ? o : 1
        lastPos.z = 3
      }
      value.next = function() {
        console.log('next check')
        pos.o = 0 // hide card
        // need to update top card before transition
        topIndex.value++
        lastTopIndex.value++
        setTimeout(() => {
          let tossed = {}
          tossed.x = lastPos.x = pos.x
          tossed.y = lastPos.y = pos.y
          tossed.r = lastPos.r = pos.r
          value.tossed.value = [ ...value.tossed.value, tossed ]
          lastPos.z = 0
          this.style.transition = "opacity 0.2s ease-out"
          lastTopcard.value.style.transition = "opacity 0.2s ease-out"
          pos.x = pos.y = pos.r = 0
          pos.o = 1
        })
        this.cleanup('next')
      }
      value.prev = function() {
        console.log('previous check')
        // pos.o = 0 // hide topcard
        // need to update top card before transition
        topIndex.value--
        nextIndex.value--
        pos.x = lastPos.x
        pos.y = lastPos.y
        pos.r = lastPos.r
        setTimeout(() => {
          let tossed = value.tossed.value
          tossed.pop()
          value.tossed.value = tossed
          
          this.style.transition = "opacity 0.2s ease-out, transform 0.2s ease-out"
          
          lastTopcard.value.style.transition = "transform 0.2s ease-out"
          lastPos.o = 0
          pos.x = lastPos.x = 0
          pos.y = lastPos.y = 0
          pos.r = lastPos.r = 0
          lastPos.z = 1
          // pos.o = 1
        })
        this.cleanup('prev')
      }
      value.stay = function(tried) {
        // tween them back to 0
        this.style.transition = "transform 0.2s ease-out"
        lastTopcard.value.style.transition = "opacity 0.2s ease-out"
        pos.x = pos.y = pos.r = 0
        if (tried === 'prev') {
          if (value.tossed.value.length && lastPos.placed) {
            let tossed = value.tossed.value[value.tossed.value.length - 1]
            lastPos.x = tossed.x
            lastPos.y = tossed.y
            lastPos.r = tossed.r
            lastPos.o = 0
          }
        }
        this.cleanup()
      }
      value.cleanup = function(going) {
        setTimeout(() => {
          this.style.transition = null
          lastTopcard.value.style.transition = null
          lastPos.placed = false
          if (going === 'next') {
            nextIndex.value++
          } else if (going === 'prev') {
            lastTopIndex.value--
          }
        }, 200)
      }
      return value
    })

    const currentDrag = ref(null)

    const handleDragStart = e => currentDrag.value = new DragInstance($store, e)

    const handleDrag = e => {
      currentDrag.value.addEvent(e)
      let draggingDirection = currentDrag.value.draggingDirection
      let direction = currentDrag.value.initialDirection
      let _card = card.value
      if (direction && direction.includes('up')) {
        if (!top.value) return
        _card.off(e)
      } else if (direction && direction.includes('down')) {
        if (!top.value) {
          if (currentDrag.value.events.length < 7) return
        }
        _card.on(e)
      }
    }
    
    const handleDragEnd = e => {
      let direction = currentDrag.value.initialDirection
      let posToTrack = direction.includes('up') ? pos : lastPos
      let endingY = posToTrack.y + e.dy
      let endingX = posToTrack.x + e.dx
      let endingDistance = Math.sqrt(Math.pow(endingX, 2) + Math.pow(endingY, 2))
      endingDistance = Math.abs(endingDistance)
      let hasTossed = tossed.value.length > 0
      let goUp  = direction.includes('up') && endingDistance > 150
      let goDown = direction.includes('down') && endingDistance < 300 && hasTossed
      let dontGo  = endingDistance < 150
      let _card = card.value
      if (goUp) {
        _card.next()
      } else if (goDown) {
        _card.prev()
      } else {
        // dont increment the cards
        _card.stay(direction.includes('down') ? 'prev' : 'next')
      }
      currentDrag.value.done()
    }
    
    // Find check for now()
    const activeCheckAtLoad = $store.getters['checks/findIndexByDate'](moment())
    // Find check last visited
    let lastCheck = $store.getters['checks/lastIndex']
    
    let indexToShow = lastCheck !== false ? lastCheck : activeCheckAtLoad
    
    for (let x = indexToShow - 1; x > 0; x--) {
      let toss = {}
      toss.x = 150  * ((Math.random() * 2) - 1)
      toss.y = -240 * (Math.random() + 1)
      toss.r = 12
      tossed.value = [ ...tossed.value, toss ]
    }
    
    const lastTopIndex = ref(indexToShow - 1)
    const topIndex  = ref(indexToShow)
    const nextIndex = ref(indexToShow + 1)
    // const safetyValueAtIndex = i => () => {
    //   let val = props.value[i]
    //   if (i) return val
    //   return {}
    // }
    const lastTop = computed(() => props.value[lastTopIndex.value])
    const top  = computed(() => props.value[topIndex.value])
    const next = computed(() => props.value[nextIndex.value])
    
    onMounted(() => {
      interact(topcard.value)
        .draggable({
          inertia: {
            resistance: 40,
          },
          // ignoreFrom: 'a, button'
        })
        .on('dragstart', e => handleDragStart(e))
        .on('dragmove',  e => handleDrag(e))
        .on('dragend',   e => handleDragEnd(e))
    })
    return {
      checks,
      lastTopcard,
      lastTopCardStyle,
      topcard,
      topCardStyle,
      lastTop,
      top,
      next,
      card,
      tossed,
      newCheck,
    }
  }
}
</script>

<style scoped lang="scss">
@import "~sass/cards";
.main {
  .inner {
    position: relative;
    height: 70vh;
    width: calc((0.61803398875 * 70vh) + 40px);
    margin: auto;
    .card {
      position: absolute;
      overflow: hidden;
      height: 70vh;
      width: 0.61803398875 * 70vh;
      box-shadow: 0 0 0 1.2px $card-outline;
      border: 12px solid #dfdfdf;
      border-radius: $card-border-radius;
      background-color: #f0f5f5;
      z-index: 2;
      padding: 8px;
      &.top {
        border: $card-border;
        background-color: $card-color;
        touch-action: none;
        user-select: none;
      }
      &.stack {
        z-index: 1;
      }
    }
  }
}
</style>