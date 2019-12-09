<template>
  <card>
    <template v-slot:content>
      <div style="height: 25vh;"></div>
      <h1 class="text-center" v-if="error.statusCode === 404">Página não encontrada</h1>
      <h1 class="text-center" v-else>Aconteceu algum problema.</h1>
      <div style="height: 25vh;"></div>
      <h4>
        Volte para a página inicial: <nuxt-link tag="a" to="/">Home</nuxt-link>
      </h4>
    </template>
  </card>

</template>

<script>
    import card from "../components/card";

    export default {
        props: ['error'],
        components: {
            card
        }
    }
</script>
