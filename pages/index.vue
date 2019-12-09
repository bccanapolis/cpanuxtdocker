<template>
  <div>
    <card>
      <template v-slot:content>
        <div style="height: 20vh;"></div>
        <h2 class="text-center">Relátorio será divulgado em breve.</h2>
        <h3 class="text-center">Dados em análise.</h3>
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

</style>
