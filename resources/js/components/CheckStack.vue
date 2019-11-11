<template>
  <div class="main">
    <div class="inner">
      <div class="top card"
          ref="topcard"
          :style="topCardStyle"
      >
        <CheckCard
            v-if="top"
            v-model="top"
        />
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
import CheckCard from '@comps/CheckCard'
export default {
  name: "CheckStack",
  components: { CheckCard },
  props: {
    value: Array
  },
  setup(props, context) {
    const checks = computed(() => props.value)
    const topcard = ref(null)
    
    const pos = reactive({ x: 0, y: 0, r: 0, o: 1 })

    const handleDrag = e => {
      pos.x += e.dx
      pos.y += e.dy
      pos.r = pos.x / 10
    }
    
    const topCardStyle = computed(() => ({
      transform: `translateX(${pos.x}px)
                  translateY(${pos.y}px)
                  rotate(${pos.r}deg)`,
      opacity: pos.o
    }))
    
    const handleDragEnd = e => {
      let card = topcard.value
      if (Math.abs(pos.x + e.dx) > 250) {
        pos.o = 0
        // need to update top card before transition
        topIndex.value++
        setTimeout(() => {
          card.style.transition = "opacity 0.2s ease-out"
          pos.x = pos.y = pos.r = 0
          pos.o = 1
        })
      } else {
        // tween them back to 0
        card.style.transition = "transform 0.2s ease-out"
        pos.x = pos.y = pos.r = 0
        // dont increment the cards
      }
      setTimeout(() => {
        card.style.transition = null
        nextIndex.value++
      }, 200)
    }
    
    const topIndex  = ref(0)
    const nextIndex = ref(1)
    const safetyValueAtIndex = i => () => {
      let val = props.value[i]
      console.log(props.value.length)
      if (i) return val
      return {}
    }
    const top  = computed(() => props.value[topIndex.value])
    const next = computed(() => props.value[nextIndex.value])
    
    onMounted(() => {
      interact(topcard.value)
        .draggable({
          inertia: true,
        })
        .on('dragmove', e => handleDrag(e))
        .on('dragend',  e => handleDragEnd(e))
    })
    return {
      checks,
      topcard,
      topCardStyle,
      top,
      next
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
    width: 0.61803398875 * 70vh;
    margin: auto;
    .card {
      position: absolute;
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
      }
      &.stack {
        z-index: 1;
      }
    }
  }
}
</style>