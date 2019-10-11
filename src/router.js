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
    {
      path: '/erl',
      component: () => import(/* webpackChunkName: "erl" */ './views/Erl.vue')
    },
    {
      path: '/erc',
      component: () => import(/* webpackChunkName: "erc" */ './views/Erc.vue')
    },
  ]
})
