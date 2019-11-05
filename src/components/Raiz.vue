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
                        <th colspan="4" class="text-center">ITERACIÓNES</th>
                    </tr>
                    <tr>
                        <th>#</th>
                        <th>Valor A</th>
                        <th>Valor B</th>
                        <th>Valor X</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(iteracion, indice) in iteraciones">
                        <td>{{ indice + 1 }}</td>
                        <td>{{ iteracion['a'] }}</td>
                        <td>{{ iteracion['b'] }}</td>
                        <td>{{ iteracion['x'] }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
    name: "Raiz",
    data(){
        return({
            iteraciones: [],
        })
    },

    computed: {
        ...mapState(['raiz', 'semillas', 'funcion', 'aproximacion']),

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
                let b  = this.semillaChecked.b;
                let fx = null;
                let fa = null;
                let fb = null;
                let x  = null;

                let fx_ant = 0;

                while ( fx !== 0 && a !== b && fx_ant !== null && iteraciones <= 1000 ) {
                    x  = this.funcionX(a, b);
                    fx = this.calcularFuncion(x);
                    fa = this.calcularFuncion(a);
                    fb = this.calcularFuncion(b);

                    this.iteraciones.push({
                        'a': a,
                        'b': b,
                        'x': x,
                    });

                    if( fx * fa < 0  ) {
                        b = this.formatDecimales(x);
                    }
                    else {
                        a = this.formatDecimales(x);
                    }

                    fx_ant = fx === fx_ant ? null : fx;

                    iteraciones += 1;
                    //console.log(iteraciones, 'a:', a, 'b:', b, 'x:', x, 'fx:', fx , 'fx_ant:', fx_ant);
                }

                raiz = this.formatDecimales(x);
            }

            this.raiz.valor        = raiz;
            this.raiz.iteraciones = iteraciones;

            setTimeout(() => { Swal.close(); }, 500);
        },

        funcionX(a, b) {
            return this.formatDecimales((a + b) / 2);
        },

        calcularFuncion(x) {
            let e = 2.71828;
            return this.formatDecimales(eval(this.funcion.code));
        },

        formatDecimales(numero) {
            let decimales = Math.pow(10, this.aproximacion || 4);

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
