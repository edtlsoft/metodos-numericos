<template>
    <div class="col-12 mt-5">
        <form>
            <div class="form-group row">
                <label for="funcion" class="col-sm-1 col-form-label">Funcion</label>
                <div class="col-sm-5">
                    <div class="input-group">
                        <input type="text" class="form-control" id="funcion" v-model="inp_funcion" placeholder="2X^2 + 2X + 5">
                        <div class="input-group-append" v-if="inp_funcion !== ''">
                            <button type="button" class="btn btn-outline-primary" @click="inp_funcion = ''">
                                <i class="far fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                    <div class="btn-group w-100" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-outline-primary"  @click="addSimboloEnLaFuncion(' + ')">+</button>
                        <button type="button" class="btn btn-outline-primary"  @click="addSimboloEnLaFuncion(' - ')">-</button>
                        <button type="button" class="btn btn-outline-primary"  @click="addSimboloEnLaFuncion(' * ')">*</button>
                        <button type="button" class="btn btn-outline-primary"  @click="addSimboloEnLaFuncion(' / ')">/</button>
                        <button type="button" class="btn btn-outline-primary"  @click="addSimboloEnLaFuncion('cos()')">cos</button>
                        <button type="button" class="btn btn-outline-primary"  @click="addSimboloEnLaFuncion('sin()')">sin</button>
                        <button type="button" class="btn btn-outline-primary"  @click="addSimboloEnLaFuncion('tan()')">tan</button>
                        <button type="button" class="btn btn-outline-primary"  @click="addSimboloEnLaFuncion('^')">^</button>
                    </div>
                    <div class="mt-2">
                        <input type="text" class="form-control" :value="funcion.code">
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
    name: "Funcion",
    data(){
        return({
        })
    },

    computed: {
        inp_funcion: {
            get() {
                return this.funcion.text
            },
            set(valor) {
                this.setTextFuncion(valor);
                this.setCodeFuncion(this.formatearCodeFuncion(valor));

                if( this.semillas.length ){
                    this.vaciarSemillas();
                }

                if( this.raiz.valor !== null ){
                    this.vaciarRaiz();
                }
            }
        },

        ...mapState(['funcion', 'semillas', 'raiz']),
    },

    methods: {
        ...mapMutations(['setTextFuncion', 'setCodeFuncion', 'vaciarSemillas', 'vaciarRaiz']),

        addSimboloEnLaFuncion: function(append) {
            this.inp_funcion += append;
            document.getElementById('funcion').focus();
        },

        formatearCodeFuncion: function(funcion) {
            funcion = funcion.toString().toLowerCase();
            funcion = this.formatearFuncionNporX(funcion);
            funcion = this.formatearFuncionPotencia(funcion);
            funcion = this.formatearFuncionSenCosTan(funcion);
            //funcion = this.formatearFuncionCos(funcion);
            //funcion = this.formatearFuncionTan(funcion);

            return funcion;
        },

        formatearFuncionNporX: function(funcion){
            return funcion.replace(/(\d{1,10})(x{1,1}\^?[\d]?)/g, '($1*$2)')
        },

        formatearFuncionPotencia: function(funcion){
            return funcion.replace(/(\w+)\^([\(\w\*\)]*)/g, 'Math.pow($1, $2)')
        },

        formatearFuncionSenCosTan: function(funcion){
            return funcion.replace(/(cos|sin|tan)\((\w*)\)/g, 'Math.$1($2)');
        },

    }
};
</script>
