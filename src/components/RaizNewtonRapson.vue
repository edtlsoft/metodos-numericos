<template>
    <div>
        <div class="col-12 mt-5 mb-5">
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
                        <td class="w-50 text-center">{{ raiz.valor }}</td>
                    </tr>
                    <tr>
                        <td class="w-50">
                            <b>Iteraciónes:</b>
                        </td>
                        <td class="w-50 text-center">{{ raiz.iteraciones }}</td>
                    </tr>
                    <tr>
                        <td colspan="2" class="text-right">
                            <button class="btn btn-primary" @click="hallarRaiz">Hallar Raiz</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="col-12 mt-5 mb-5">
            <table class="table table-sm table-bordered">
                <thead>
                    <tr>
                        <th colspan="2" class="text-center">ITERACIÓNES</th>
                    </tr>
                    <tr>
                        <th>Xn</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(iteracion, indice) in iteraciones">
                        <td>X{{ indice + 1 }}</td>
                        <td>{{ iteracion }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>        
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
    name: "RaizNewtonRapson",
    data(){
        return({
            iteraciones: [],
        })
    },

    computed: {
        ...mapState(['raiz', 'semillas', 'funcion', 'funcion_derivada']),

        semillaChecked: {
            get(){
                return this.getSemillaChecked()
            }
        }
    },

    methods: {
        //...mapMutations(['pushSemilla', 'vaciarSemillas', 'seleccionarSemilla']),

        alertaSemillaVacia() {
            Swal.fire({
                type: 'error',
                title: 'No ha seleccionado ninguna semilla.',
            });
        },

        alertaHallandoRaiz() {
            Swal.fire({ 
                title: 'Hallando raíz', 
                allowEscapeKey: false, 
                allowOutsideClick: false,
                //timer: 2000,
                onOpen: () => {
                    Swal.showLoading();
                }
            })
        },

        hallarRaiz() {
            let raiz = null;
            let iteraciones = 0;

            this.alertaHallandoRaiz();
            this.iteraciones = [];

            if( this.semillaChecked.c !== 100 ){
                raiz = this.semillaChecked.c
            }
            else {
                let a  = this.semillaChecked.a;
                let fa = null;

                let fa_ant = 0;

                this.iteraciones.push(a);

                while ( fa_ant !== null && iteraciones <= 1000 ) {
                    fa = this.calcularFuncionNewtonRapson(a);

                    fa_ant = fa === fa_ant ? null : fa;

                    a = fa;

                    iteraciones += 1;
                    this.iteraciones.push(a);
                    console.log(iteraciones, 'a:', a, 'fa_ant:', fa_ant);
                }

                raiz = this.formatDecimales(a);
            }

            this.raiz.valor       = raiz;
            this.raiz.iteraciones = iteraciones;

            setTimeout(() => { Swal.close(); }, 500);
        },

        calcularFuncionNewtonRapson(a) {
            return this.formatDecimales(a - (this.calcularFuncion(a) / this.calcularFuncionDerivada(a)), 6)
        },

        calcularFuncion(x) {
            let e = 2.71828;
            return eval(this.funcion.code);
        },
        calcularFuncionDerivada(x) {
            let e = 2.71828;
            return eval(this.funcion_derivada.code);
        },

        formatDecimales(numero, decimales=4) {
            decimales = Math.pow(10, decimales);

            return parseInt(numero * decimales) / decimales;
        },

        getSemillaChecked() {
            let semilla = this.semillas.filter(obj => obj.checked === true );

            return semilla.length ? semilla[0] : {a: '?', b: '?'};
        },

    },
};
</script>

<style scoped>

</style>
