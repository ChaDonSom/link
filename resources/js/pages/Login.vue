<template>
  <grid>
    <grid-inner>
      <cell :span="12" class="flex-center"><h2>Login</h2></cell>
      <cell :span="12" class="flex-center">
        <textfield type="email" v-model="email">Email</textfield>
      </cell>
      <cell :span="12" class="flex-center">
        <textfield type="password" v-model="password">Password</textfield>
      </cell>
      <cell :span="2">
        Remember me
      </cell>
      <cell :span="2">
        Forgot password?
      </cell>
      <cell :span="12" class="flex-center">
        <mdc-button raised color="secondary" big
            @click="login">Log in</mdc-button>
      </cell>
    </grid-inner>
  </grid>
</template>

<script>
import Vue from 'vue'
import { reactive, onMounted, toRefs, computed } from '@vue/composition-api'
import { mapGetters, mapActions } from 'vuex'
import LoginModule from '@store/Login'
import FlatPickr from 'flatpickr'
import Grid from '@mdc/grid.vue'
import GridInner from '@mdc/grid-inner.vue'
import Cell from '@mdc/cell.vue'
import MdcButton from '@mdc/button.vue'
import Textfield from '@mdc/textfield.vue'
export default {
  name: "Login",
  components: { FlatPickr, Grid, GridInner, Cell, Textfield, MdcButton },
  setup(props, context) {
    const $store = context.root.$store
    if ($store.state.login) $store.unregisterModule('login')
    $store.registerModule('login', LoginModule)
    const state = reactive({
      user: window.user,
      email: computed({
        get() { return $store.getters['login/email'] },
        set(v) { return $store.dispatch('login/set', ['state', 'email', v]) }
      }),
      password: computed({
        get() { return $store.getters['login/password'] },
        set(v) { return $store.dispatch('login/set', ['state', 'password', v]) }
      }),
    })
    const login = () => {
      axios.post('/login')
    }
    onMounted(() => {
    })
    return {
      ...toRefs(state),
      login,
    }
  },
}
</script>

<style scoped lang="scss">
@import '~sass/layout';
</style>