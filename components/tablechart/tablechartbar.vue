<template>
  <div>
    <table id="tableChart" class="table table-hover table-striped">
      <thead>
      <tr>
        <th>Segmento</th>
        <th>Resposta</th>
        <th>Quantidade</th>
        <th>Porcentagem</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in tableData">
        <td>{{item.segmento}}</td>
        <td>{{item.resposta}}</td>
        <td>{{item.qtd}}</td>
        <td>{{item.porcentagem}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
    export default {
        name: "tablechartbar",
        props: {
            query: Array
        },
        data: () => ({
            tableData: [],
            loaded: false
        }),
        watch: {
          query(){
              this.sanitizeData()
          }
        },
        methods: {
            sanitizeData() {
                let ans = {}
                this.tableData = []
                this.query.forEach(item => {
                    if (typeof ans[item.segmento] == 'undefined' || ans[item.segmento] == null) {
                        ans[item.segmento] = item.count;
                    } else {
                        ans[item.segmento] += item.count;
                    }
                })

                this.query.forEach(item => {
                    this.tableData.push({
                        segmento: item.segmento,
                        resposta: item.resposta,
                        qtd: item.count,
                        porcentagem: Math.round((item.count * 100 / ans[item.segmento]) * 10) / 10 + "%"
                    })
                })
                this.tableData.sort((a, b) => (a.segmento > b.segmento) ? 1 : ((b.segmento > a.segmento) ? -1 : 0));
                this.loaded = true;
            }
        },
        mounted(){
            this.sanitizeData()
        }
    }
</script>

<style scoped>

</style>
