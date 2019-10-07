<template>
    <div class="col-12">
        <table class="table table-sm table-bordered">
            <thead>
            <tr>
                <th colspan="5" class="text-center">SEMILLAS</th>
            </tr>
            <tr>
                <th>#</th>
                <th>Valor A</th>
                <th>Valor B</th>
                <th>Raíz</th>
            </tr>
            </thead>
            <tbody>
                <template v-if="semillas.length">
                    <tr v-for="(semilla, indice) in semillas" :key="semilla.id">
                        <td class="w-10 text-center">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" 
                                :value="indice"
                                :checked="semilla.checked"
                                @change="seleccionarSemilla(indice)">
                            </div>
                        </td>
                        <td class="w-30 text-center">{{ semilla.a }}</td>
                        <td class="w-30 text-center">{{ semilla.b }}</td>
                        <td class="w-30 text-center">{{ semilla.c === 100 ? '' : semilla.c }}</td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td colspan="4" class="text-center"> No se ha encontrado ninguna semilla. </td>
                    </tr>
                </template>
                <tr>
                    <td colspan="5" class="text-right">
                        <button class="btn btn-primary" @click="hallarSemillas">Hallar semillas</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
    name: "Semillas",
    data(){
        return({
            //
        })
    },

    computed: {
        ...mapState(['semillas', 'funcion']),
    },

    methods: {
        ...mapMutations(['pushSemilla', 'vaciarSemillas', 'seleccionarSemilla']),

        hallarSemillas() {
            let a = -50, b = 0, c = 0, paso = 0.5, fa = 0, fb = 0, checked = false;
             
            if( this.funcion.code === '' ){
                alert('Funcion no definida.');
            }

            this.vaciarSemillas();
            fa = this.calcularFuncion(a);

            while ( a < 50 ) {
                b = a + 0.5
                fb = this.calcularFuncion(b);

                if( fa * fb <= 0 ){
                    c = fa === 0 ? a : (fb === 0 ? b : 100);
                    checked = this.semillas.length ? false : true;

                    this.pushSemilla({a: a, b: b, c: c, checked: checked});
                }

                //console.log('a:', a, 'b:', b, 'fa:', fa, 'fb:', fb, 'c:', c);

                a += paso;
                fa = fb;
            }
        },

        calcularFuncion: function(x){
            return eval(this.funcion.code);
        },

    },
};
</script>

<style scoped>

</style>
