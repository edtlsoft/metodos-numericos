<template>
    <div class="col-12 mt-5">
        <div class="col-xs-6 col-md-4 ml-auto div-input-paso">
            <div class="a">
                <div class="input-group">
                    <input type="number" class="form-control" v-model="x" placeholder="X">
                    <input type="number" class="form-control" v-model="y" placeholder="Y">
                    <div class="input-group-append">
                        <button type="button" class="btn btn-outline-primary" @click="agregarCoordenada">
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <table class="table table-sm table-bordered">
            <thead>
            <tr>
                <th colspan="4" class="text-center">COORDENADAS</th>
            </tr>
            <tr>
                <th class="text-center">#</th>
                <th class="text-center">Valor X</th>
                <th class="text-center">Valor Y</th>
                <th class="text-center">Eliminar</th>
            </tr>
            </thead>
            <tbody>
                <template v-if="coordenadas.length">
                    <tr v-for="(coordenada, indice) in coordenadas" :key="indice">
                        <td class="w-10 text-right">{{ indice + 1 }}</td>
                        <td class="w-30 text-right">{{ coordenada.x }}</td>
                        <td class="w-30 text-right">{{ coordenada.y }}</td>
                        <td class="w-10 text-center">                              
                            <button type="button" class="btn btn-sm btn-danger center-block" @click="eliminarCoordenada(indice)">
                                X
                            </button>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td colspan="4" class="text-center"> No se ha agregado ninguna coordenada. </td>
                    </tr>
                </template>
                <tr>
                    <td colspan="4" class="text-right">
                        <button class="btn btn-primary d-none" @click="x = 0">Hallar semillas</button>
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
            x: '',
            y: '',
        })
    },

    computed: {
        ...mapState(['coordenadas']),
    },

    methods: {
        ...mapMutations(['pushCoordenada', 'eliminarCoordenada']),

        agregarCoordenada() {
            if( this.x !== '' && this.y !== '' ){
                this.pushCoordenada({x: this.x, y: this.y});

                this.x = '', this.y = '';
            }
        },

    },
};
</script>

<style scoped>

.div-input-paso {
    padding-right: 0px;
}

button.btn-danger {
    color: #fff !important;
    font-weight: bold;
}

</style>
