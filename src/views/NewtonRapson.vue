<template>
  <div>
    <div class="mt-4">
        <h1>Metodo de Biseccion</h1>
    </div>

    <Funcion />

    <Semillas />
  </div>
</template>

<script>
// @ is an alias to /src
import Funcion from '@/components/Funcion.vue'
import Semillas from '@/components/Semillas.vue'

export default {
  name: 'Biseccion',
  components: {
    Funcion,
    Semillas,
  }
}
</script>
