<template>
  <div>
    <Titulo titulo="Metodo de Biseccion" />

    <Funcion />

    <Semillas />

    <Raiz />
  </div>
</template>

<script>
// @ is an alias to /src
import Titulo from '@/components/Titulo.vue'
import Funcion from '@/components/Funcion.vue'
import Semillas from '@/components/Semillas.vue'
import Raiz from '@/components/Raiz.vue'

export default {
  name: 'Biseccion',
  components: {
    Titulo,
    Funcion,
    Semillas,
    Raiz,
  }
}
</script>
