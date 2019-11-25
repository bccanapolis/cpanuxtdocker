<template>
  <div>
    <apexchart ref="chart" v-if="loaded" type=pie height=350 :options="chartOptions" :series="series"/>
  </div>
</template>

<script>
    export default {
        name: "chartpie",
        props: {
            normalize: {
                type: Boolean,
                default: false,
            },
            query: {
                type: Object,
                default: {
                    campus: 0,
                    pergunta: 0,
                    segmento: 0,
                    atuacao: 0,
                    lotacao: 0,
                    curso: 0,
                },
            },
        },
        watch:{
            query(val) {
                this.fetchData().then(() => {
                    this.$refs.chart.updateOptions({
                        labels: this.labels
                    });
                });
            }
        },
        data: () => ({
            loaded: false,
            series: [],
            chartOptions: {
                sparkline: {
                    enabled: true
                },
                labels: [],
                legend: {
                    position: "right"
                },
                responsive: [{
                    breakpoint: 780,
                    options: {
                        legend: {
                            position: 'bottom'
                        },
                        height: '800px'
                    }
                }],
                dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                        return Math.round(val * 10) / 10 + "%"
                    },
                },
                tooltip: {
                    followCursor: true,
                    y: {
                        formatter: function (val) {
                            return this.normalize ? `${val}%` : `${val}`;
                        }
                    },
                    x: {
                        show: true
                    }
                },
                toolbar: {
                    show: false,
                    tools: {
                        download: false
                    }
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ["transparent"]
                },
                colors: [
                    "#008ffb","#00e396","#feb019","#ff4560","#775dd0","#ff9800","#4caf50",
                    "#03a9f4","#3f51b5","#546e7a","#d4526e","#13d8aa","#a5978b","#fd6a6a",
                    "#546e7a","#4ecdc4","#449dd1","#f9a3a4","#fa4443","#662e9b", "#e2c044",
                    "#f86624","#5c4742","#8d5b4c","#a5978b","#5653fe","#c4bbaf","#2e294e"
                ],
                fill: {
                    colors: [
                        "#008ffb","#00e396","#feb019","#ff4560","#775dd0","#ff9800","#4caf50",
                        "#03a9f4","#3f51b5","#546e7a","#d4526e","#13d8aa","#a5978b","#fd6a6a",
                        "#546e7a","#4ecdc4","#449dd1","#f9a3a4","#fa4443","#662e9b", "#e2c044",
                        "#f86624","#5c4742","#8d5b4c","#a5978b","#5653fe","#c4bbaf","#2e294e"
                    ],
                    opacity: 1
                },
            },
        }),
        methods: {
            sanitizeData(data) {
                let final = new Array(this.labels.length).fill(0)
                data.forEach(item => {
                    final[this.labels.lastIndexOf(item.label)] = item.count
                })
                return final
            },
            normalizeData() {

            },
            async fetchData() {
                let reqCampus = typeof this.query.campus != 'undefined' && this.query.campus != null && this.query.campus != 0 ? `&campus=${this.query.campus}` : ''
                let reqSegmento = typeof this.query.segmento != 'undefined' && this.query.segmento != null && this.query.segmento != 0 ? `&segmento=${this.query.segmento}` : ''
                return this.$axios.get(`/grafico?pergunta=${this.query.pergunta}${reqSegmento}${reqCampus}`)
                    .then(result => {
                        this.labels = result.data.roles;
                        this.series = this.sanitizeData(result.data.data)
                        this.chartOptions.labels = result.data.roles;
                        this.emitData(result.data);
                        this.loaded = true;
                    });
            },
            emitData(data){
                this.$emit("fetch", data)
            }
        },
        mounted() {
            this.fetchData();
        }
    }
</script>

<style scoped>

</style>
