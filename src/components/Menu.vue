<template>
    <nav class="navbar navbar-expand-lg navbar-dark primary-color">
        <a class="navbar-brand" href="#">
            <img src="@/assets/remington-logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
            Métodos numéricos
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <router-link to="/biseccion" class="nav-item" exact-active-class="active">
                    <a class="nav-link">Biseccion</a>
                </router-link>
                <router-link to="/newton-rapson" class="nav-item" exact-active-class="active">
                    <a class="nav-link">Newton Rapson</a>
                </router-link>
                <router-link to="/secante" class="nav-item" exact-active-class="active">
                    <a class="nav-link">Secante</a>
                </router-link>
                <router-link to="/erl" class="nav-item" exact-active-class="active">
                    <a class="nav-link">Ecuación de regresión lineal</a>
                </router-link>
                <router-link to="/erc" class="nav-item" exact-active-class="active">
                    <a class="nav-link">Ecuación de regresión cuadrática</a>
                </router-link>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'Menu',
}
</script>
