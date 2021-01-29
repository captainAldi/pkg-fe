import Vue from 'vue'
import Vuex from 'vuex'
import alert from './alert.js'
import share from './share.js'
import dialog from './dialog.js'
import auth from './auth.js'
import prevUrl from './prevUrl.js'
import pkg from './pkg.js'

import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'pkg',
  storage: window.localStorage,
  modules: ['auth', 'prevUrl']
})

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    alert,
    share,
    dialog,
    auth,
    prevUrl,
    pkg
  }
})
