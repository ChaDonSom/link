<template>
  <div class="mdc-layout-grid">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'grid'
}
</script>

<style lang="scss">
@import "@material/layout-grid/mdc-layout-grid";
</style>