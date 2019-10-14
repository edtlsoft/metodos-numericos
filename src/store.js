import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    funcion: {
      text: '',
      code: '',
    },

    funcion_derivada: {
      text: '',
      code: '',
    },

    semillas: [],
    paso: 1,
    
    raiz: {
      valor: null,
      iteraciones: null,
    },

    coordenadas: [],
  },
  mutations: {
    setTextFuncion(state, valor){
      state.funcion.text = valor
    },
    setCodeFuncion(state, valor){
      state.funcion.code = valor
    },
    setTextFuncionDerivada(state, valor){
      state.funcion_derivada.text = valor
    },
    setCodeFuncionDerivada(state, valor){
      state.funcion_derivada.code = valor
    },

    pushSemilla(state, semilla) {
      state.semillas.push(semilla);
    },
    vaciarSemillas(state) {
      state.semillas = []
    },
    seleccionarSemilla(state, indice) {
      state.semillas.forEach((obj, i) => { obj.checked = i === indice ? true : false })
    },
    setValorPaso(state, valor) {
      state.paso = parseFloat(valor)
    },

    vaciarRaiz(state) {
      state.raiz = {
        valor: '',
        iteraciones: '',
      }
    },

    pushCoordenada(state, coordenada) {
      state.coordenadas.push(coordenada);
    },
    eliminarCoordenada(state, indice) {
      let x = state.coordenadas.splice(indice, 1);
    },

  },
  actions: {

  }
})
