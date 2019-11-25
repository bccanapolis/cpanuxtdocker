<template>
  <card>
    <template v-slot:content>
      <filterchart @change="updateChart" @normal="changeNormal" @total="changeTotal"
                   @fetch="filterLoad = true"></filterchart>
      <hr>
      <div v-if="filterLoad">
        <div v-if="queryChart.pergunta != 0 && indicatorChart" class="chart-options">
          <p class="lead small text-uppercase">Indicador</p>
          <h3 id="chart-indicator" class="lead" :style="`background-color:${indicatorChart.cor}`">{{indicatorChart.label}} - {{indicatorChart.valor}}%</h3>
          <hr>
        </div>

        <chart :query="queryChart" :normalize="normalChart" :totalize="totalChart" @fetch="chartData"></chart>
        <hr>
        <div class="row">
          <div class="col-sm-12">
<tablechart :fields="queryChart" :pie="queryChart.pergunta == 0" :query="tableChart"></tablechart>
          </div>
        </div>

      </div>
    </template>
    <template v-slot:footer>
      <div class="stats">
        Dados relacionados a avaliazação de 2019, com participação de {{ part_pessoas }} pessoas.
      </div>
    </template>

  </card>
</template>

<script>
    import card from "../components/card";
    import filterchart from "../components/filterchart";
    import chart from "../components/chart/chart";
    import tablechart from "../components/tablechart/tablechart";

    export default {
        name: "grafico",
        components: {card, filterchart, chart, tablechart},
        data: () => ({
            filterLoad: false,
            queryChart: {pergunta: 0, campus:0, segmento: 0},
            normalChart: false,
            totalChart: false,
            indicatorChart: {},
            tableChart: [],
            part_pessoas: 0
        }),
        methods: {
            changeNormal(val){
                this.normalChart = val;
            },
            changeTotal(val){
                this.totalChart = val;
            },
            updateChart(val) {
                this.queryChart = val
            },
            chartData(val){
                this.indicatorChart = val.indicador;
                this.tableChart = val.data;
            },
            fetchInfo(){
                this.$axios.get('/info').then(res => {
                    this.part_pessoas = res.data.pessoas
                })
            }
        },
        mounted(){
            this.fetchInfo()
        }
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
