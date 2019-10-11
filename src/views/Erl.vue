<template>
  <div>
    <Titulo titulo="ERL" />

    <Coordenadas />
  </div>
</template>

<script>
// @ is an alias to /src
import Titulo from '@/components/Titulo.vue'
import Coordenadas from '@/components/Coordenadas.vue'

export default {
  name: 'Erl',
  components: {
    Titulo,
    Coordenadas,
  }
}
</script>
