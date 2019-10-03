<template>
    <div class="col-12">
        <table class="table table-sm table-bordered">
            <thead>
            <tr>
                <th colspan="5" class="text-center">SEMILLAS</th>
            </tr>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Valor A</th>
                <th scope="col">Valor B</th>
                <th scope="col">Punto de corte</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="(semilla, indice) in semillas" :key="semilla.id">
                    <td>{{ indice + 1 }}</td>
                    <td>{{ semilla.a }}</td>
                    <td>{{ semilla.b }}</td>
                    <td>{{ semilla.c === 100 ? '' : semilla.c }}</td>
                </tr>
            </tbody>
        </table>

        <div class="col-12">
			<button class="btn btn-primary" @click="hallarSemillas">Hallar semillas</button>
		</div>
    </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
    name: "Semillas",
    data(){
        return({
            logo: 'https://getbootstrap.com/docs/4.3/assets/brand/bootstrap-solid.svg',
        })
    },

    computed: {
        ...mapState(['semillas', 'funcion']),
    },

    methods: {
        ...mapMutations(['pushSemilla', 'vaciarSemillas']),

        hallarSemillas() {
            let a = -50, b = -49.5, c = 0, fa = 0, fb = 0;

            this.vaciarSemillas();
            
            if( this.funcion.code === '' ){
                alert('Funcion no definida.');
            }

            while ( a <= 50 ) {
                fa = this.calcularFuncion(a);
                fb = this.calcularFuncion(b);

                if( fa * fb <= 0 ){
                    c = fa === 0 ? a : (fb === 0 ? b : 100);
                    this.pushSemilla({a: a, b: b, c: c});
                }
                console.log('a:', a, 'b:', b, 'fa:', fa, 'fb:', fb, 'c:', c);

                a += 0.5, b += 0.5;
            }
        },

        calcularFuncion: function(x){
            return eval(this.funcion.code);
        },

    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.flex {
    display: flex;
    justify-content: space-between;
}

</style>
