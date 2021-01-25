<template>
  <div>
    <card>
      <template v-slot:content>
        <filterchart @change="updateChart" @normal="changeNormal" @total="changeTotal"
                     @fetch="filterLoad = true"></filterchart>
        <hr>
        <div v-if="filterLoad">
          <div v-if="queryChart.pergunta != 0 && indicatorChart" class="chart-options">
            <p class="lead small text-uppercase">Indicador</p>
            <h3 id="chart-indicator" class="lead" :style="`background-color:${indicatorChart.cor}`">
              {{ indicatorChart.label }} - {{ indicatorChart.valor }}%</h3>
            <hr>
          </div>

          <chart :query="queryChart" :normalize="normalChart" :totalize="totalChart" @fetch="chartData"></chart>
          <hr>
          <div class="row" style="overflow-x: auto;">
            <tablechart :fields="queryChart" :pie="queryChart.pergunta == 0" :query="tableChart"></tablechart>
          </div>

        </div>
      </template>
      <template v-slot:footer>
        <div class="stats">
          Dados relacionados a avaliazação de {{ selectedAno }}, com participação de {{ part_pessoas }} pessoas.
        </div>
      </template>

    </card>
  </div>
</template>

<script>
import card from "../components/card";
import filterchart from "../components/filterchart";
import chart from "../components/chart/chart";
import tablechart from "../components/tablechart/tablechart";

export default {
  name: "relatorio",
  components: {card, filterchart, chart, tablechart},
  data: () => ({
    filterLoad: false,
    queryChart: {pergunta: 0, campus: 0, segmento: 0},
    normalChart: false,
    totalChart: false,
    indicatorChart: {},
    tableChart: [],
    part_pessoas: 0,
    selectedAno: 2019
  }),
  methods: {
    changeNormal(val) {
      this.normalChart = val;
    },
    changeTotal(val) {
      this.totalChart = val;
    },
    updateChart(val) {
      this.queryChart = val
      this.selectedAno = val['ano']
    },
    chartData(val) {
      this.indicatorChart = val.indicador;
      this.tableChart = val.data;
      this.part_pessoas = val.total
    },
  },
}
</script>

<style scoped>
#chart-indicator {
  text-align: center;
  line-height: 3em;
  border-radius: 5px;
  color: #fff;
}
</style>
