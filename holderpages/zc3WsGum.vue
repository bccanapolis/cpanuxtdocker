<template>
<div>
  <answer v-if="segmento" :titulo="segmento" :perguntas="perguntas" :resobjetivas="resObjetivas" :campus="campus"></answer>

</div>
</template>

<script>
    import answer from "../components/answer";

    export default {
        name: "zc3WsGum",
        components: {answer},
        data: () => ({
            segmento: null,
            perguntas: [],
            campus: [],
            resObjetivas: []
        }),
        methods: {
            fetchData() {
                this.$axios.get('/answer?skey=zc3WsGum')
                    .then(res => {
                        console.log(res.data)
                        const {segmento, campus, perguntas, resp_objetivas} = res.data;
                        this.segmento = segmento
                        this.perguntas = perguntas
                        this.resObjetivas = resp_objetivas
                        this.campus = campus
                    })
            }
        },
        mounted() {
            this.fetchData()
        }
    }
</script>

<style scoped>

</style>
