<template>
  <grid v-cloak>
    <grid-inner>
      <cell :span="12" class="flex-center"><h2>Login</h2></cell>
      <cell :span="12" class="flex-center">
        <textfield type="email" v-model="email">Email</textfield>
      </cell>
      <cell :span="12" class="flex-center">
        <textfield type="password" v-model="password">Password</textfield>
      </cell>
      <cell :span="12" class="flex-center">
        <!--<div>-->
        <!--  Remember me-->
        <!--</div>-->
        <!--<div>-->
        <!--  Forgot password?-->
        <!--</div>-->
      </cell>
      <cell :span="12" class="flex-center">
        <mdc-button raised color="secondary" big
            @click="login">Log in</mdc-button>
      </cell>
    </grid-inner>
  </grid>
</template>

<script>
import Vue from '@js/bootstrap'
import { reactive, onMounted, toRefs, computed, ref } from '@vue/composition-api'
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
    const $store  = context.root.$store
    const $router = context.root.$router
    $store.usesModule('login', LoginModule)
    const user  = ref(window.user)
    const creds = reactive({
      email: computed({
        get() { return $store.getters['login/email'] },
        set(v) { return $store.dispatch('login/set', ['state', 'email', v]) }
      }),
      password: computed({
        get() { return $store.getters['login/password'] },
        set(v) { return $store.dispatch('login/set', ['state', 'password', v]) }
      }),
      remember: true
    })
    const login = async () => {
      let post = await axios.post('/login', creds, { headers: {
        Accepts: 'application/json'
      }})
      // $router.push($store.getters['auth/intended'])
      location.reload()
    }
    onMounted(() => {
    })
    return {
      ...toRefs(creds),
      user,
      login,
    }
  },
}
</script>

<style scoped lang="scss">
@import '~sass/layout';
</style>