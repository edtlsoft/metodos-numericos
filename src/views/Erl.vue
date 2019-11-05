<template>
  <div>
    <Titulo titulo="Ecuación de regresión lineal" />

    <Coordenadas />

    <div class="col-12 mt-5 mb-5">
        <table class="table table-sm table-bordered">
            <thead>
            <tr>
                <th colspan="5" class="text-center">RESULTADOS</th>
            </tr>
            <tr>
                <th class="text-center">#</th>
                <th class="text-center">X</th>
                <th class="text-center">Y</th>
                <th class="text-center">XY</th>
                <th class="text-center">X^2</th>
            </tr>
            </thead>
            <tbody>
                <template v-if="coordenadas.length">
                    <tr v-for="(coordenada, indice) in coordenadas" :key="indice">
                        <td class="w-10 text-right">{{ indice + 1 }}</td>
                        <td class="w-30 text-right">{{ coordenada.x }}</td>
                        <td class="w-30 text-right">{{ coordenada.y }}</td>
                        <td class="w-30 text-right">{{ coordenada.x * coordenada.y }}</td>
                        <td class="w-30 text-right">{{ coordenada.x * coordenada.x }}</td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td colspan="5" class="text-center"> No se ha agregado ninguna coordenada. </td>
                    </tr>
                </template>
            </tbody>
            <tfoot>
            	<th class="text-center">EZ</th>
            	<th class="text-right">{{ autoSuma(coordenadas, 'x') }}</th>
            	<th class="text-right">{{ autoSuma(coordenadas, 'y') }}</th>
            	<th class="text-right">{{ autoSumaXY(coordenadas, 'x', 'y') }}</th>
            	<th class="text-right">{{ autoSumaX2(coordenadas, 'x') }}</th>
            </tfoot>
        </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Titulo from '@/components/Titulo.vue'
import Coordenadas from '@/components/Coordenadas.vue'

import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Erl',
  components: {
    Titulo,
    Coordenadas,
  },
  computed: {
    ...mapState(['coordenadas']),
  },
  methods: {
  	autoSuma(array, indice) {
  		return array.reduce((acomulado, objeto) => acomulado + parseInt(objeto[indice]), 0);
  	},
  	autoSumaXY(array, x, y) {
  		return array.reduce((acomulado, objeto) => acomulado + (objeto[x] * objeto[y]), 0);
  	},
  	autoSumaX2(array, x) {
  		return array.reduce((acomulado, objeto) => acomulado + (objeto[x] * objeto[x]), 0);
  	},
  }
}
</script>
