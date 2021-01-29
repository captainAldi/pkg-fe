export default {
  namespaced: true,

  state: {

    indikator: [],
    data_guru: '',
    nilai_komp1: '',
    nilai_komp2: '',
    nilai_komp3: '',
    nilai_komp4: '',
    nilai_komp5: '',
    nilai_komp6: '',
    nilai_komp7: '',
    nilai_komp8: '',
    nilai_komp9: '',
    nilai_komp10: '',
    nilai_komp11: '',
    nilai_komp12: '',
    nilai_komp13: '',
    nilai_komp14: '',
    tanggal: '',
    masukan: ''

  },

  mutations: {

    setIndikator: (state, value) => {
      value.forEach(element => {
        state.indikator.push(element)
      });
    },

    setDataGuru: (state, value) => {
      state.data_guru = value
    },

    setNilaiKomp1: (state, value) => {
      state.nilai_komp1 = value
    },

    setNilaiKomp2: (state, value) => {
      state.nilai_komp2 = value
    },

    setNilaiKomp3: (state, value) => {
      state.nilai_komp3 = value
    },

    setNilaiKomp4: (state, value) => {
      state.nilai_komp4 = value
    },

    setNilaiKomp5: (state, value) => {
      state.nilai_komp5 = value
    },

    setNilaiKomp6: (state, value) => {
      state.nilai_komp6 = value
    },

    setNilaiKomp7: (state, value) => {
      state.nilai_komp7 = value
    },

    setNilaiKomp8: (state, value) => {
      state.nilai_komp8 = value
    },

    setNilaiKomp9: (state, value) => {
      state.nilai_komp9 = value
    },

    setNilaiKomp10: (state, value) => {
      state.nilai_komp10 = value
    },

    setNilaiKomp11: (state, value) => {
      state.nilai_komp11 = value
    },

    setNilaiKomp12: (state, value) => {
      state.nilai_komp12 = value
    },

    setNilaiKomp13: (state, value) => {
      state.nilai_komp13 = value
    },

    setNilaiKomp14: (state, value) => {
      state.nilai_komp14 = value
    },

    setTanggal: (state, value) => {
      state.tanggal = value
    },

    setMasukan: (state, value) => {
      state.masukan = value
    },

    setClear: state => {
      Object.assign(state, {

        indikator: [],
        data_guru: '',
        nilai_komp1: '',
        nilai_komp2: '',
        nilai_komp3: '',
        nilai_komp4: '',
        nilai_komp5: '',
        nilai_komp6: '',
        nilai_komp7: '',
        nilai_komp8: '',
        nilai_komp9: '',
        nilai_komp10: '',
        nilai_komp11: '',
        nilai_komp12: '',
        nilai_komp13: '',
        nilai_komp14: '',
        tanggal: '',
        masukan: ''

      })
    }

  },

  actions: {

    doSetIndikator: ({ commit }, value) => {
      commit('setIndikator', value)
    },

    doSetDataGuru: ({ commit }, value) => {
      commit('setDataGuru', value)
    },

    doSetNilaiKomp1: ({ commit }, value) => {
      commit('setNilaiKomp1', value)
    },

    doSetNilaiKomp2: ({ commit }, value) => {
      commit('setNilaiKomp2', value)
    },

    doSetNilaiKomp3: ({ commit }, value) => {
      commit('setNilaiKomp3', value)
    },

    doSetNilaiKomp4: ({ commit }, value) => {
      commit('setNilaiKomp4', value)
    },

    doSetNilaiKomp5: ({ commit }, value) => {
      commit('setNilaiKomp5', value)
    },

    doSetNilaiKomp6: ({ commit }, value) => {
      commit('setNilaiKomp6', value)
    },

    doSetNilaiKomp7: ({ commit }, value) => {
      commit('setNilaiKomp7', value)
    },

    doSetNilaiKomp8: ({ commit }, value) => {
      commit('setNilaiKomp8', value)
    },

    doSetNilaiKomp9: ({ commit }, value) => {
      commit('setNilaiKomp9', value)
    },

    doSetNilaiKomp10: ({ commit }, value) => {
      commit('setNilaiKomp10', value)
    },

    doSetNilaiKomp11: ({ commit }, value) => {
      commit('setNilaiKomp11', value)
    },

    doSetNilaiKomp12: ({ commit }, value) => {
      commit('setNilaiKomp12', value)
    },

    doSetNilaiKomp13: ({ commit }, value) => {
      commit('setNilaiKomp13', value)
    },

    doSetNilaiKomp14: ({ commit }, value) => {
      commit('setNilaiKomp14', value)
    },

    doSetTanggal: ({ commit }, value) => {
      commit('setTanggal', value)
    },

    doSetMasukan: ({ commit }, value) => {
      commit('setMasukan', value)
    },

    doSetClear: ({ commit }, value) => {
      commit('setClear', value)
    }
    
  },

  getters: {
    dataPkg: state => state,
  },
}