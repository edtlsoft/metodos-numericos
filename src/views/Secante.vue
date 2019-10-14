<template>
  <div>
    <Titulo titulo="Metodo de Secante" />

    <Funcion />

    <Semillas />

    <RaizSecante />
  </div>
</template>

<script>
// @ is an alias to /src
import Titulo from '@/components/Titulo.vue'
import Funcion from '@/components/Funcion.vue'
import Semillas from '@/components/Semillas.vue'
import RaizSecante from '@/components/RaizSecante.vue'

export default {
  name: 'Biseccion',
  components: {
    Titulo,
    Funcion,
    Semillas,
    RaizSecante,
  }
}
</script>
