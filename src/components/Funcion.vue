<template>
    <div class="mt-4">
        <form>
            <div class="form-group row">
            <label for="funcion" class="col-sm-2 col-form-label">Funcion</label>
            <div class="col-sm-6">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" id="funcion" v-model="inp_funcion" placeholder="2X^2 + 2X + 5">
                    <div class="input-group-append">
                        <button class="btn btn-outline-primary" type="button" @click="addSimbolPotencia" onclick="metodos.addSimbolPotencia()">
                            ^
                        </button>
                    </div>
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
            inp_funcion: '',
        })
    },

    computed: {
        ...mapState(['funcion']),
    },

    watch: {
        'inp_funcion': function(e){
            let code = this.formatearCodeFuncion(e);

            this.setTextFuncion(e);
            this.setCodeFuncion(code);
        }
    },

    methods: {
        ...mapMutations(['setTextFuncion', 'setCodeFuncion']),

        addSimbolPotencia: function() {
            this.funcion += '^';

            document.getElementById('funcion').focus();
        },

        formatearCodeFuncion: function(funcion) {
            funcion = this.formatearFuncionNporX(funcion);
            funcion = this.formatearFuncionPotencia(funcion);

            return funcion;
        },

        formatearFuncionNporX: function(funcion){
            return funcion.replace(/(\d{1,10})([A-z]+)/g, '$1 * $2')
        },

        formatearFuncionPotencia: function(funcion){
            return funcion.replace(/(\w+)\^(\d{1,5})/g, 'Math.pow($1, $2)')
        },
    }
};
</script>
