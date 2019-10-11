<template>
  <div>
    <Titulo titulo="Metodo de Newton Rapson" />

    <Funcion />

    <Semillas />
  </div>
</template>

<script>
// @ is an alias to /src
import Titulo from '@/components/Titulo.vue'
import Funcion from '@/components/Funcion.vue'
import Semillas from '@/components/Semillas.vue'

export default {
  name: 'Biseccion',
  components: {
    Titulo,
    Funcion,
    Semillas,
  }
}
</script>
