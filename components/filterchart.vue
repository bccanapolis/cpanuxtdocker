<template>
  <div class="col">

    <div>
      <div class="row">
        <div class="col-md-2 form-group">
          <label for="anoChart">Ano</label>
          <select v-model="selectedAno" @change="() => {this.fetchEixo(); this.clearAll(); this.emitChange();}"
                  class="form-control select-title" id="anoChart">
            <option v-for="item in listAno" @select="item == listAno[0]" :value="item">{{ item }}</option>
          </select>
        </div>
        <div class="col-sm-4 form-group">
          <label for="eixoChart">Eixo</label>
          <select v-model="selectedEixo" @change="() => {this.fetchDimensao(); this.clearAll(); this.emitChange();}"
                  class="form-control select-title" id="eixoChart">
            <option value=0 selected>Todos</option>
            <option v-for="item in listEixo" :value="item.id">{{ item.nome }}</option>
          </select>
        </div>
        <div class="col-md-6 form-group" v-if="selectedEixo != 0">
          <label for="dimensaoChart">Dimensão</label>
          <select v-model="selectedDimensao" @change="() => {this.fetchPergunta(); this.clearAll(); this.emitChange();}"
                  class="form-control select-title" id="dimensaoChart">
            <option value=0 selected>Todos</option>
            <option v-for="item in listDimensao" :value="item.id"><abbr :title="item.nome">{{ item.nome }}</abbr>
            </option>
          </select>
        </div>

        <div class="col-sm-12 form-group">
          <label for="perguntaChart">Perguntas</label>
          <select v-model="selectedPergunta"
                  @change="() => {this.fetchSegmento(); this.emitChange();  }"
                  id="perguntaChart"
                  class="form-control select-title">
            <option value=0 selected>Participação de pessoas em {{ this.selectedAno }}</option>
            <option v-for="item in listPergunta" :value="item.id">{{ item.titulo }}</option>
          </select>
        </div>

        <div class="col-md-4 form-group">
          <label for="segmentoChart">Segmento</label>
          <select v-model="selectedSegmento" @change="() => {this.fetchCampus(); this.emitChange();}"
                  class="form-control" id="segmentoChart">
            <option value=0 selected>Todos</option>
            <option v-for="item in listSegmento" :value="item.id">{{ item.nome }}</option>
          </select>
        </div>

        <div class="col-md-4 form-group">
          <label for="campusChart">Campus</label>
          <select v-model="selectedCampus" @change="() => {switch (this.selectedSegmento) {
            case 7:
              this.fetchCurso();
              break;
            case 1:
              this.fetchAtuacao();
              break;
            case 6:
              this.fetchLotacao();
              break;
            case 4:
              this.fetchLotacao();
              break;
          } this.emitChange(); }" class="form-control" id="campusChart">
            <option value="0">Todos</option>
            <option v-for="item in listCampus" :value="item.id">{{ item.campus }}</option>
          </select>
        </div>

        <div v-if="selectedSegmento == 7 && selectedPergunta != 0" id="cursoList" class="col-md-4 form-group">
          <label for="cursoChart">Curso</label>
          <select v-model="selectedCurso" @change="emitChange" :disabled="selectedCampus == 0"
                  class="form-control"
                  id="cursoChart">
            <option value="0" selected>Todos</option>
            <option v-for="item in listCurso" :value="item.id">{{ item.nome }}</option>
          </select>
        </div>

        <div v-if="selectedSegmento == 1 && selectedPergunta != 0" id="atuacaoList" class="col-md-4 form-group">
          <label for="atuacaoChart">Atuação</label>
          <select v-model="selectedAtuacao" @change="emitChange" :disabled="selectedCampus == 0"
                  class="form-control"
                  id="atuacaoChart">
            <option value="0" selected>Todos</option>
            <option v-for="item in listAtuacao" :value="item.id">{{ item.nome }}</option>
          </select>
        </div>

        <div v-if="(selectedSegmento == 6 || selectedSegmento == 4) && selectedPergunta != 0" id="lotacaoList"
             class="col-md-4 form-group">
          <label for="lotacaoChart">Lotação</label>
          <select v-model="selectedLotacao" @change="emitChange" :disabled="selectedCampus == 0"
                  class="form-control"
                  id="lotacaoChart">
            <option value="0" selected>Todos</option>
            <option v-for="item in listLotacao" :value="item.id">{{ item.nome }}</option>
          </select>
        </div>

      </div>
      <div class="row" v-if="selectedPergunta != 0">
        <div class="form-group col-md-3 col-sm-6 ">
          <label class="switch">
            <input id="chart-visualization" v-model="selectedNormal" @change="emitNormal" type="checkbox">
            <span class="slider round slider-normal"></span>
          </label>
          <span class="small text-muted" v-if="selectedNormal">Dados Relativos</span>
          <span class="small text-muted" v-else>Dados Reais</span>
        </div>
        <div class="form-group col-md-3 col-sm-6 ">
          <label class="switch">
            <input id="chart-total" type="checkbox" v-model="selectedTotal" @change="emitTotal">
            <span class="slider round slider-total"></span>
          </label>
          <span class="small text-muted" v-if="selectedTotal">Com Total</span>
          <span class="small text-muted" v-else>Sem Total</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "filterchart",
  components: {},
  props: {
    anos: Array
  },
  data: () => ({
    selectedPergunta: 0,
    selectedSegmento: 0,
    selectedCampus: 0,
    selectedAtuacao: 0,
    selectedLotacao: 0,
    selectedCurso: 0,
    selectedAno: null,
    selectedEixo: 0,
    selectedDimensao: 0,
    selectedNormal: false,
    selectedTotal: false,
    listPergunta: [],
    listAno: [],
    listSegmento: [],
    listCurso: [],
    listLotacao: [],
    listCampus: [],
    listAtuacao: [],
    listEixo: [],
    listDimensao: [],
  }),
  methods: {
    clearAll() {
      this.selectedCampus = 0;
      this.selectedSegmento = 0;
      this.selectedCurso = 0;
      this.selectedAtuacao = 0;
      this.selectedLotacao = 0;
      this.selectedPergunta = 0;
    },
    fetchPergunta() {
      this.selectedPergunta = 0;
      this.$axios.get(`/pergunta?ano=${this.selectedAno}&eixo=${this.selectedEixo}&dimensao=${this.selectedDimensao}`).then(res => {
        this.listPergunta = res.data.dados;
        this.fetchSegmento()
      })
    },
    fetchEixo() {
      this.selectedEixo = 0;
      this.$axios.get(`/eixo?ano=${this.selectedAno}`).then(res => {
        this.listEixo = res.data.eixos;
        this.fetchDimensao()
      })
    },
    fetchDimensao() {
      this.selectedDimensao = 0;
      this.$axios.get(`/dimensao?ano=${this.selectedAno}&eixo=${this.selectedEixo}`).then(res => {
        this.listDimensao = res.data.dimensoes;
        this.fetchPergunta()
      })
    },

    fetchSegmento() {
      this.selectedSegmento = 0;
      this.$axios.get(`/segmento?pergunta=${this.selectedPergunta}&ano=${this.selectedAno}${this.selectedEixo != 0 ? '&eixo=' + this.selectedEixo : ''}${this.selectedDimensao != 0 ? '&dimensao=' + this.selectedDimensao : ''}`).then(res => {
        this.listSegmento = res.data.segmentos;
        this.fetchCampus()
      })
    },
    fetchCampus() {
      this.selectedCampus = 0;
      this.$axios.get(`/campus?pergunta=${this.selectedPergunta}&ano=${this.selectedAno}${this.selectedEixo != 0 ? '&eixo=' + this.selectedEixo : ''}${this.selectedDimensao != 0 ? '&dimensao=' + this.selectedDimensao : ''}${this.selectedSegmento != 0 ? '&segmento=' + this.selectedSegmento : ''}`).then(res => {
        this.listCampus = res.data.campus;
        this.emitLoaded();
      })
    },
    fetchCurso() {
      this.selectedCurso = 0;
      this.$axios.get(`/curso?pergunta=${this.selectedPergunta}&ano=${this.selectedAno}${this.selectedEixo != 0 ? '&eixo=' + this.selectedEixo : ''}${this.selectedDimensao != 0 ? '&dimensao=' + this.selectedDimensao : ''}&campus=${this.selectedCampus}${this.selectedSegmento != 0 ? '&segmento=' + this.selectedSegmento : ''}`).then(res => {
        this.listCurso = res.data.cursos;
      })
    },
    fetchAtuacao() {
      this.selectedAtuacao = 0;
      this.$axios.get(`/atuacao?pergunta=${this.selectedPergunta}&ano=${this.selectedAno}${this.selectedEixo != 0 ? '&eixo=' + this.selectedEixo : ''}${this.selectedDimensao != 0 ? '&dimensao=' + this.selectedDimensao : ''}&campus=${this.selectedCampus}${this.selectedSegmento != 0 ? '&segmento=' + this.selectedSegmento : ''}`).then(res => {
        this.listAtuacao = res.data.atuacao;
      })
    },
    fetchLotacao() {
      this.selectedLotacao = 0;
      this.$axios.get(`/lotacao?pergunta=${this.selectedPergunta}&ano=${this.selectedAno}${this.selectedEixo != 0 ? '&eixo=' + this.selectedEixo : ''}${this.selectedDimensao != 0 ? '&dimensao=' + this.selectedDimensao : ''}&campus=${this.selectedCampus}${this.selectedSegmento != 0 ? '&segmento=' + this.selectedSegmento : ''}`).then(res => {
        this.listLotacao = res.data.lotacao;
      })
    },
    fetchAno() {
      this.$axios.get(`/ano`).then(res => {
        this.listAno = this.anos || res.data.ano;
        if (this.anos) {
          this.selectedAno = this.anos[0];
        } else {
          this.selectedAno = this.listAno[0];
        }
        this.emitChange();
        this.fetchEixo();
      })
    },
    emitChange() {
      this.$emit("change", {
        campus: this.selectedCampus,
        curso: this.selectedCurso,
        lotacao: this.selectedLotacao,
        pergunta: this.selectedPergunta,
        segmento: this.selectedSegmento,
        atuacao: this.selectedAtuacao,
        eixo: this.selectedEixo,
        dimensao: this.selectedDimensao,
        ano: this.selectedAno,
      })
    },
    emitNormal() {
      this.$emit("normal", this.selectedNormal)
    },
    emitTotal() {
      this.$emit("total", this.selectedTotal)
    },
    emitLoaded() {
      this.$emit("fetch")
    }
  },

  mounted() {
    this.fetchAno();
  }
}
</script>

<style scoped>
.select-title {
  font-size: 18px;
  font-weight: 300;
  line-height: 30px;
  min-height: 48px;
  border: 1px solid transparent;
}

.select-title:focus {
  border: 1px solid transparent;
}


.select-title:hover {
  border: 1px solid #E3E3E3;
}

.switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #008ffb;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider-total {
  background-color: #feb019;
}

.slider:before {
  position: absolute;
  content: "";
  height: 12px;
  width: 12px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #FF4560;
}

input:focus + .slider {
  box-shadow: 0 0 1px #FF4560;
}

input:checked + .slider-total {
  background-color: #00e396;
}

input:focus + .slider-total {
  box-shadow: 0 0 1px #00e396;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>
