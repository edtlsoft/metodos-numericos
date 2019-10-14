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
                        <td class="w-50 text-center">{{ semillaChecked.b }}</td>
                    </tr>
                    <tr>
                        <td class="w-50">
                            <b>B:</b>
                        </td>
                        <td class="w-50 text-center">{{ semillaChecked.b + paso }}</td>
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
                        <th colspan="7" class="text-center">ITERACIÓNES</th>
                    </tr>
                    <tr>
                        <th>i</th>
                        <th>Xi</th>
                        <th>Xi-1</th>
                        <th>F(Xi)</th>
                        <th>F(Xi-1)</th>
                        <th>Xi+1</th>
                        <th>Error</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="iteraciones.length">
                        <tr v-for="(iteracion, indice) in iteraciones">
                            <td>{{ indice + 1 }}</td>
                            <td>{{ iteracion['Xi'] }}</td>
                            <td>{{ iteracion['Xi-1'] }}</td>
                            <td>{{ iteracion['F(Xi)'] }}</td>
                            <td>{{ iteracion['F(Xi-1)'] }}</td>
                            <td>{{ iteracion['Xi+1'] }}</td>
                            <td>{{ iteracion['error'] }}</td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="7" class="text-center"> No se ah realizado ninguna iteración. </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>        
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
    name: "RaizSecante",
    data(){
        return({
            iteraciones: [],
        })
    },

    computed: {
        ...mapState(['raiz', 'semillas', 'funcion', 'paso']),

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
                let Xi    = this.semillaChecked.b + this.paso;
                let Xi_1  = this.semillaChecked.b;
                let FXi   = null;
                let FXi_1 = null;
                let Xim1  = null;
                let error = null;

                while ( error !== 0 && iteraciones <= 256 ) {
                    FXi   = this.calcularFuncion(Xi);
                    FXi_1 = this.calcularFuncion(Xi_1);
                    Xim1  = this.calcularFuncionXim1(Xi, FXi, Xi_1, FXi_1);
                    error = this.error(Xim1, Xi);
                    
                    iteraciones += 1;

                    this.iteraciones.push({
                        'Xi': Xi,
                        'Xi-1': Xi_1,
                        'F(Xi)': FXi,
                        'F(Xi-1)': FXi_1,
                        'Xi+1': Xim1,
                        'error': error,
                    });

                    if( error !== 0 ){
                        Xi_1 = Xi,
                        Xi   = Xim1; 
                    }
                }

                raiz = this.formatDecimales(Xim1);
            }

            this.raiz.valor       = raiz;
            this.raiz.iteraciones = iteraciones;

            setTimeout(() => { Swal.close(); }, 500);
        },

        calcularFuncion(x) {
            let e = 2.71828;
            return this.formatDecimales(eval(this.funcion.code), 6);
        },

        calcularFuncionXim1(Xi, FXi, Xi_1, FXi_1) {
            return this.formatDecimales(Xi - ((FXi * (Xi_1 - Xi)) / (FXi_1 - FXi)))
        },

        error(Xim1, Xi) {
            console.log(Xim1 , ' - ', Xi, ' / ', Xim1, ' * 100');
            return this.formatDecimales(((Xim1 - Xi) / Xim1) * 100)
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
