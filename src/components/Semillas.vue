<template>
    <div class="col-12 mt-5">
        <div class="col-6 col-md-4 ml-auto div-input-paso">
            <div>
                <div class="input-group">
                    <div class="input-group-append">
                        <button type="button" class="btn btn-outline-primary">
                            Paso:
                        </button>
                    </div>
                    <input type="number" step="0.1" class="form-control" v-model="cantidad_paso">
                </div>
                <div class="input-group">
                    <div class="input-group-append">
                        <button type="button" class="btn btn-outline-primary">
                            Aproximación:
                        </button>
                    </div>
                    <input type="number" step="1" class="form-control" v-model="ceros_aprox">
                </div>
            </div>
        </div>
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
        ...mapState(['semillas', 'paso', 'aproximacion', 'funcion']),

        cantidad_paso: {
            get() {
                return this.paso
            },
            set(val) {
                this.setValorPaso(val);
            },
        },

        ceros_aprox: {
            get() {
                return this.aproximacion
            },
            set(val) {
                this.setValorAproximacion(val);
            },
        }
    },

    methods: {
        ...mapMutations(['pushSemilla', 'vaciarSemillas', 'seleccionarSemilla', 'setValorPaso', 'setValorAproximacion']),

        alertaFuncionVacia() {
            Swal.fire({
                type: 'error',
                title: 'El campo funcion no tiene una expresion valida.',
            });
        },

        alertaHallandoSemillas() {
            Swal.fire({ 
                title: 'Hallando semillas', 
                allowEscapeKey: false, 
                allowOutsideClick: false,
                //timer: 2000,
                onOpen: () => {
                    Swal.showLoading();
                }
            })
        },

        hallarSemillas() {
            let a = -60, b = 0, c = 0, paso = this.paso, fa = 0, fb = 0, checked = false;
             
            if( this.funcion.code === '' ){
                this.alertaFuncionVacia();
                return false;
            }

            this.alertaHallandoSemillas();
            this.vaciarSemillas();

            fa = this.calcularFuncion(a);

            while ( a < 50 ) {
                b = a + paso;
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

            setTimeout(() => { Swal.close(); }, 500);
        },

        calcularFuncion: function(x){
            let e = 2.71828;
            return eval(this.funcion.code);
        },

    },
};
</script>

<style scoped>

.div-input-paso {
    padding-right: 0px;
}

</style>
