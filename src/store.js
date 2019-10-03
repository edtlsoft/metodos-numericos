import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    funcion: {
      text: '',
      code: '',
    },
    semillas: [
      {
        a: 1,
        b: 2,
        c: 100
      },
      {
        a: 5,
        b: 6,
        c: 5
      }
    ],
  },
  mutations: {
    setTextFuncion(state, valor){
      state.funcion.text = valor
    },
    setCodeFuncion(state, valor){
      state.funcion.code = valor
    },

    pushSemilla(state, semilla) {
      state.semillas.push(semilla);
    },
    vaciarSemillas(state) {
      state.semillas = []
    },

  },
  actions: {

  }
})
