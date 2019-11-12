<template>
  <card>
    <slot>
      <filterchart @change="updateChart" @normal="(val) => { this.normalChart = val }" @total="(val) => { this.totalChart = val }"
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
        <tablechart :fields="queryChart" :pie="queryChart.pergunta == 0" :query="tableChart"></tablechart>
      </div>
    </slot>
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
            tableChart: []
        }),
        methods: {
            updateChart(val) {
                this.queryChart = val
            },
            chartData(val){
                this.indicatorChart = val.indicador;
                this.tableChart = val.data;
            }
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
