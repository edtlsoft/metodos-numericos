<template>
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
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
    name: "Raiz",
    data(){
        return({
            //
        })
    },

    computed: {
        ...mapState(['raiz', 'semillas', 'funcion']),

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

                    if( fx * fa < 0  ) {
                        b = this.formatDecimales(x, 4);
                    }
                    else {
                        a = this.formatDecimales(x, 4);
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
            return ((a + b) / 2);
        },

        calcularFuncion(x) {
            let e = 2.71828;
            return eval(this.funcion.code);
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
