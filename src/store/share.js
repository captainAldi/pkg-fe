export default {
  namespaced: true,

  state: {
    statusAuth: false,
    decrypted_text: {},
    dialog: true
  },

  mutations: {
    setDecryptedText: (state, payload) => {
      state.decrypted_text  = payload.decrypted_text
      state.statusAuth      = payload.statusAuth
    },

    setDialog: (state, payload) => {
      state.dialog = payload
    }
  },

  actions: {
    doDecrypt: ({commit}, payload) => {
      commit('setDecryptedText', payload)
    },

    closeDialog: ({commit}, payload) => {
      commit('setDialog', payload)
    }
  },

  getters: {
    statusAuth : state => state.statusAuth,
    decrypted_text : state => state.decrypted_text,
    dialog: state => state.dialog
  }
}