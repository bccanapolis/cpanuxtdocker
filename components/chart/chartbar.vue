<template>
  <div>
    <apexchart ref="chart" v-if="loaded" type=bar height=350 :options="chartOptions" :series="series"/>
  </div>
</template>

<script>
    export default {
        name: "chartbar",
        props: {
            normalize: {
                type: Boolean,
                default: false,
            },
            totalize: {
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
        watch: {
            query() {
                this.fetchData().then(() => {
                    this.$refs.chart.updateOptions({
                        xaxis: {
                            categories: this.roles
                        },
                        yaxis: {
                            title: {
                                text: this.normalize ? "Porcentagem" : "Pessoas"
                            }
                        }
                    });
                });
            },
            normalize(val){
                this.$refs.chart.updateSeries(this.sanitizeData(this.rawData));
                this.$refs.chart.updateOptions({
                    yaxis: {
                        title: {
                            text: this.normalize ? "Porcentagem" : "Pessoas"
                        }
                    }
                });
            },
            totalize(val){
                this.$refs.chart.updateSeries(this.sanitizeData(this.rawData));
                this.$refs.chart.updateOptions({
                    xaxis: {
                        categories: this.roles
                    }
                });
            }
        },
        data: () => ({
            labels: ['Ótimo', 'Bom', 'Regular', 'Ruim', 'Péssimo', 'Não sei'],
            rawData: [],
            rawRoles: [],
            roles: [],
            loaded: false,
            series: [],
            chartOptions: {
                legend: {
                    position: 'bottom',
                    offsetY: -10
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                        return `${val}`;
                    }
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
                colors: ['#008ffb', '#00e396', '#feb019', '#ff4560', '#775dd0', '#2e294e'],
                fill: {
                    colors: ['#008ffb', '#00e396', '#feb019', '#ff4560', '#775dd0', '#2e294e'],
                    opacity: 1
                },
                chart: {
                    height: 350,
                    columnWidth: '90%'
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        endingShape: 'rounded',
                        columnWidth: '98%'
                    }
                },
                xaxis: {
                    categories: []
                }
            },
        }),
        methods: {
            sanitizeData(data) {
                let series = {};
                this.roles = this.rawRoles.slice()

                this.labels.forEach(item => {
                    series[item] = {name: item, data: new Array(this.roles.length).fill(0)}
                })
                data.forEach(item => {
                    series[item.resposta].data[this.roles.lastIndexOf(item.segmento)] = item.count
                })
                let final = []
                if (this.totalize && this.roles.length > 1) {
                    for (let [key, value] of Object.entries(series)) {
                        let sum = 0
                        for (let i = 0; i < value.data.length; i++) {
                            sum += value.data[i]
                        }
                        series[key].data.push(sum)

                    }
                    this.roles.push('Total')
                }
                for (let [key, value] of Object.entries(series)) {
                    final.push(value)
                }

                if (this.normalize) {
                    final = this.normalizeData(final)
                }
                return final
            },
            normalizeData(series) {
                for (let i = 0; i < series[0].data.length; i++) {
                    let sum = 0
                    series.forEach(item => {
                        sum += item.data[i]
                    });
                    for (let j = 0; j < series.length; j++) {
                        series[j]['data'][i] = Math.round((series[j]['data'][i] / sum * 100) * 10) / 10
                    }
                }
                return series
            },
            async fetchData() {
                let reqCampus = typeof this.query.campus != 'undefined' && this.query.campus != null && this.query.campus != 0 ? `&campus=${this.query.campus}` : ''
                let reqCurso = typeof this.query.curso != 'undefined' && this.query.curso != null && this.query.curso != 0 ? `&curso=${this.query.curso}` : ''
                let reqAtuacao = typeof this.query.atuacao != 'undefined' && this.query.atuacao != null && this.query.atuacao != 0 ? `&atuacao=${this.query.atuacao}` : ''
                let reqLotacao = typeof this.query.lotacao != 'undefined' && this.query.lotacao != null && this.query.lotacao != 0 ? `&lotacao=${this.query.lotacao}` : ''
                let reqSegmento = typeof this.query.segmento != 'undefined' && this.query.segmento != null && this.query.segmento != 0 ? `&segmento=${this.query.segmento}` : ''
                return this.$axios.get(`/grafico?pergunta=${this.query.pergunta}${reqSegmento}${reqAtuacao}${reqLotacao}${reqCampus}${reqCurso}`)
                    .then(result => {
                        this.rawRoles = result.data.roles;
                        this.chartOptions.xaxis.categories = result.data.roles;
                        this.rawData = result.data.data;
                        this.series = this.sanitizeData(result.data.data);
                        this.emitData(result.data);
                        this.loaded = true;
                    }).then(() => {
                        this.$refs.chart.updateOptions({
                            yaxis: {
                                title: {
                                    text: this.normalize ? "Porcentagem" : "Pessoas"
                                }
                            }
                        })
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
