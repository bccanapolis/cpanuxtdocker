<template>
  <div>
    <card>
      <slot>
          <div class="d-block mx-auto">
            <img style="display: block; margin-left:auto; margin-right: auto; max-width: 80vw; max-height:100vh;"
                 src="img/comissao2019.png" title="Comissão Própria de Avaliação 2019"
                 alt="Banner Comissão Própria de Avaliação 2019">
          </div>
          <div style="margin-top: 2em;" class="mt-10">
            <div class="col-sm-offset-1 col-sm-10 row">
              <div class="col-sm-6 col-md-3"><a class="lead" href="/s4UkHMQC">Estudante</a></div>
              <div class="col-sm-6 col-md-3"><a class="lead" href="/zc3WsGum">Docente</a></div>
              <div class="col-sm-6 col-md-3"><a class="lead" href="/g3YTAfpT">Técnico Administrativo (câmpus)</a></div>
              <div class="col-sm-6 col-md-3"><a class="lead" href="/4jn7qduk">Técnico Administrativo (reitoria)</a>
              </div>
            </div>
          </div>
      </slot>
    </card>
  </div>


</template>

<script>
    import card from "../components/card";

    export default {
        components: {
            card
        }
    }
</script>

<style>
</style>
