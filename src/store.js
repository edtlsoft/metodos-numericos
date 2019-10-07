import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    funcion: {
      text: '',
      code: '',
    },
    semillas: [],
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
    seleccionarSemilla(state, indice) {
      state.semillas.forEach((obj, i) => { obj.checked = i === indice ? true : false })
    }

  },
  actions: {

  }
})
