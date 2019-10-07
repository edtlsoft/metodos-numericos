import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/biseccion',
    },
    {
      path: '/biseccion',
      component: () => import(/* webpackChunkName: "biseccion" */ './views/Biseccion.vue')
    },
    {
      path: '/newton-rapson',
      component: () => import(/* webpackChunkName: "newton-rapson" */ './views/NewtonRapson.vue')
    },
    {
      path: '/secante',
      component: () => import(/* webpackChunkName: "secante" */ './views/Secante.vue')
    },
  ]
})
