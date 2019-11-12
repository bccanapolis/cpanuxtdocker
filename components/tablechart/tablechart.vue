<template>
  <div>
    <tablechartpie :fields="fields" v-if="pie" :query="query"></tablechartpie>
    <tablechartbar v-else :query="query"></tablechartbar>
  </div>
</template>

<script>
  import tablechartbar from "./tablechartbar";
  import tablechartpie from "./tablechartpie";
    export default {
        name: "tablechart",
        props: {
            fields: Object,
            query: Array,
            pie: Boolean
        },
        components: {
            tablechartpie, tablechartbar
        }
    }
</script>

<style scoped>

</style>
