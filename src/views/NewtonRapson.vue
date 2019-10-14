<template>
  <div>
    <Titulo titulo="Metodo de Newton Rapson" />

    <Funcion :derivada="true" />

    <Semillas />

    <RaizNewtonRapson />
  </div>
</template>

<script>
// @ is an alias to /src
import Titulo from '@/components/Titulo.vue'
import Funcion from '@/components/Funcion.vue'
import Semillas from '@/components/Semillas.vue'
import RaizNewtonRapson from '@/components/RaizNewtonRapson.vue'

export default {
  name: 'Biseccion',
  components: {
    Titulo,
    Funcion,
    Semillas,
    RaizNewtonRapson,
  }
}
</script>
