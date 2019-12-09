<template>
  <div class="wrapper">
    <div class="sidebar" data-color="green" data-image="img/sidebar-4.jpg">
      <div class="sidebar-wrapper">
        <div class="logo">
          <div>
            <nuxt-link tag="img" to="/" style="height: 180px; margin-right: auto; margin-left: auto; display: block;"
                 class="mx-auto d-block" src="img/ifg-logo.png"
                 alt="Logo Instituto Federal de Goiás">
            </nuxt-link>
          </div>

          <h1 class="lead text-center" style="margin: 0.2em;" ><nuxt-link tag="a" to="/" style="color: white;">
            Comissão Própria de Avaliação
            </nuxt-link></h1>

        </div>

        <navbar></navbar>
        <a style="position: absolute; bottom: 5px; padding: 10px; margin-top: 30px;" href="http://computacaoifg.com.br"><img
          width="240" src="img/ciencia-computacao-pequeno.png"
          alt="Logo Curso de Ciência da Computação - IFG Campus Anápolis"></a>
      </div>
    </div>

    <div class="main-panel">
      <nav class="navbar navbar-default navbar-fixed">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <nuxt-link class="navbar-brand" tag="a" to="/">Home</nuxt-link>
          </div>
          <div class="collapse navbar-collapse">
<!--            <ul class="nav navbar-nav navbar-left">-->
<!--              <li>-->
<!--                <a href="#" class="dropdown-toggle" data-toggle="dropdown">-->
<!--                  <i class="fa fa-dashboard"></i>-->
<!--                </a>-->
<!--              </li>-->
<!--            </ul>-->

<!--            <ul class="nav navbar-nav navbar-right">-->
<!--              <li>-->
<!--                <a href="">-->
<!--                  Account-->
<!--                </a>-->
<!--              </li>-->
<!--            </ul>-->
          </div>
        </div>
      </nav>


      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <nuxt/>
          </div>
        </div>
      </div>


      <footer class="footer">
        <div class="container-fluid">
<!--          <nav class="pull-left">-->
<!--            <ul>-->
<!--              <li>-->
<!--                <a href="#">-->
<!--                  Home-->
<!--                </a>-->
<!--              </li>-->

<!--            </ul>-->
<!--          </nav>-->
          <p class="copyright pull-right">
          </p>
        </div>
      </footer>

    </div>
  </div>

</template>

<script>
  import navbar from "../components/navbar";
  export default {
      components: {
          navbar
      }
  }
</script>

<style>

</style>
