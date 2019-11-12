<template>
  <div>
    <chartpie v-if="query.pergunta == 0" :query="query" @fetch="(data) => {this.$emit('fetch', data)}"></chartpie>
    <div  v-else>

      <chartbar :query="query" :normalize="normalize" :totalize="totalize" @fetch="(data) => {this.$emit('fetch', data)}"></chartbar>
    </div>

  </div>
</template>

<script>
    import chartpie from "./chartpie";
    import chartbar from "./chartbar";

    export default {
        props: {
            query: {
                type: Object,
                default: {pergunta: 0}
            },
            normalize: Boolean,
            totalize: Boolean,
        },
        name: "chart",
        components: {chartbar, chartpie},

    }
</script>

<style scoped>
  #chart-indicator{
    text-align: center;
    line-height: 3em;
    border-radius: 5px;
    color: #fff;
  }
</style>
