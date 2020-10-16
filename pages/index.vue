<template>
  <div>
    <card>
      <template v-slot:content>
        <div style="height: 20vh;"></div>
        <h2 class="text-center">Relatórios de Autoavaliação 2019</h2>
        <p class="text-justify px-5">O Relatório de Autoavaliação Institucional do IFG visa fomentar a cultura de
          avaliação institucional e é compreendido de forma substancial e não só como mero procedimento burocrático ou
          movimento de avaliar por avaliar. Busca contribuir efetivamente para promoção de melhorias na Instituição por
          meio da disponibilização dos dados, análises e sugestões da CPA.</p>
        <div style="display: flex; -moz-column-gap: 2rem; -webkit-column-gap: 2rem; column-gap: 2rem; row-gap: 1rem; -moz-row-gap: 2rem; -webkit-row-gap: 2rem; flex-wrap: wrap; justify-content: center;">
          <a download="true" href="/relatorio_cpa_ifg_2019.pdf" class="btn btn-success text-center text-uppercase">baixar relatório</a>
          <nuxt-link to="/relatorio" class="btn text-center text-uppercase">relatório digital</nuxt-link>
        </div>

        <div style="height: 20vh;"></div>
      </template>
    </card>
  </div>
</template>

<script>
import card from "../components/card";

export default {
  name: "index",
  components: {card}
}
</script>

<style scoped>
.px-5 {
  padding: 0;
}

@media (min-width: 960px) {
  .px-5 {
    padding: 0 5rem;
  }
}

</style>
