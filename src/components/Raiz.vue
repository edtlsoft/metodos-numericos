<template>
    <div class="col-12 mt-5">
        <table class="table table-sm table-bordered">
            <thead>
                <tr>
                    <th colspan="5" class="text-center">RAIZ</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="w-50">
                        <b>A:</b>
                    </td>
                    <td class="w-50 text-center">{{ semillaChecked.a }}</td>
                </tr>
                <tr>
                    <td class="w-50">
                        <b>B:</b>
                    </td>
                    <td class="w-50 text-center">{{ semillaChecked.b }}</td>
                </tr>
                <tr>
                    <td class="w-50">
                        <b>Valor raiz:</b>
                    </td>
                    <td class="w-50 text-center">{{ raiz }}</td>
                </tr>
                <tr>
                    <td class="w-50">
                        <b>Iteraciónes:</b>
                    </td>
                    <td class="w-50 text-center">{{ iteraciones }}</td>
                </tr>
                <tr>
                    <td colspan="2" class="text-right">
                        <button class="btn btn-primary" @click="hallarRaiz">Hallar Raiz</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
    name: "Raiz",
    data(){
        return({
            raiz: '?',
            iteraciones: '?',
        })
    },

    computed: {
        ...mapState(['semillas', 'funcion']),

        semillaChecked: {
            get(){
                return this.getSemillaChecked()
            }
        }
    },

    methods: {
        //...mapMutations(['pushSemilla', 'vaciarSemillas', 'seleccionarSemilla']),

        hallarRaiz() {
            if( this.semillaChecked.c !== 100 ){
                this.raiz = this.semillaChecked.c,  this.iteraciones = 0
            }
            else {
                this.raiz = 'Z'
            }
        },

        funcionX(a, b) {
            return ((a + b) / 2);
        },

        getSemillaChecked() {
            let semilla = this.semillas.filter(obj => obj.checked === true );

            return semilla.length ? semilla[0] : {a: '?', b: '?'};
        },

        calcularFuncion: function(x){
            return eval(this.funcion.code);
        },

    },
};
</script>

<style scoped>

</style>
