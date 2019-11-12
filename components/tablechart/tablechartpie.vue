<template>
  <div>
    <table id="tableChart" class="table table-hover table-striped">
      <thead>
      <tr>
        <th v-if="fields.campus != 0 && fields.segmento != 0">Area</th>
        <th v-else-if="fields.campus == 0">Campus</th>
        <th v-else-if="fields.segmento == 0">Segmento</th>
        <th>Quantidade</th>
        <th>Porcentagem</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in tableData">
        <td>{{item.label}}</td>
        <td>{{item.qtd}}</td>
        <td>{{item.pct}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
    export default {
        name: "tablechartpie",
        props: {
            query: Array,
            fields: Object
        },
        data: () => ({
            tableData: [],
            loaded: false
        }),
        watch: {
            query() {
                this.sanitizeData()
            }
        },
        methods: {
            sanitizeData() {
                let ans = 0
                this.tableData = []
                this.query.forEach(item => {
                    ans += item.count
                })

                this.query.forEach(item => {
                    this.tableData.push({
                        label: item.label,
                        qtd: item.count,
                        pct: Math.round((item.count * 100 / ans) * 10) / 10 + "%"
                    })
                })
                this.loaded = true;
            }
        },
        mounted() {
            this.sanitizeData()
        }
    }
</script>

<style scoped>

</style>
