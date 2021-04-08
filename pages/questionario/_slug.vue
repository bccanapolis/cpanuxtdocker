<template>
  <div>
    <form @submit.prevent="postForm">
      <card>
        <template v-slot:header>
          <h2 class="mx-auto text-center">{{ fetched.segmento.nome }}</h2>
          <p>Prezado(a) participante, seja bem-vindo(a) ao QUESTIONÁRIO DE AUTOAVALIAÇÃO INSTITUCIONAL do
            IFG. Este questionário é anônimo e visa a obter avaliações referentes às atividades
            realizadas pelo IFG no ano de {{ ano }}. As questões abordam de forma concisa e objetiva os
            eixos: Desenvolvimento Institucional, Políticas de Gestão e Infraestrutura. A sua opinião
            subsidiará a
            elaboração do Relatório de Autoavaliação Institucional {{ ano }}, que será divulgado à comunidade
            acadêmica e norteará às tomadas de decisões da gestão para melhorias no IFG. </p>
        </template>
        <template v-slot:content>
          <div v-if="skey !== '4jn7qduk'" class="row">
            <div class="col-sm-12">
              <hr>
              <div class="title">Selecione os campos que se adequam a você:</div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Campus</label>
                <select
                  @change="changedCampus()"
                  class="form-control"
                  id="campusList"
                  name="campus"
                  required
                  oninvalid="this.setCustomValidity('Por favor selecione um campus da lista')"
                  oninput="this.setCustomValidity('')"
                  v-model="campus"
                >
                  <option value="" disabled selected>Selecione seu campus</option>
                  <option v-for="it in fetched.campus" :value="it.id">{{ it.nome }}</option>
                </select>
              </div>
            </div>
            <div v-if="skey === 's4UkHMQC'" class="col-md-6">
              <div class="form-group">
                <label for="cursosList">Curso</label>
                <select
                  class="form-control"
                  id="cursosList"
                  name="curso"
                  v-model="curso"
                  v-bind:disabled="campus === ''"
                  required
                  oninvalid="this.setCustomValidity('Por favor selecione um curso da lista')"
                  oninput="this.setCustomValidity('')"
                >
                  <option value="" disabled selected>Selecione seu curso</option>
                  <option v-for="it in fetched.cursos" :value="it.id">{{ it.nome }}</option>
                </select>
              </div>
            </div>
            <div v-if="skey === 'g3YTAfpT'" class="col-md-6">
              <div class="form-group">
                <label for="lotacaoList">Lotação</label>
                <select
                  class="form-control"
                  id="lotacaoList"
                  name="lotacao"
                  v-bind:disabled="campus === ''"
                  required
                  v-model="lotacao"
                  oninvalid="this.setCustomValidity('Por favor selecione uma lotação da lista')"
                  oninput="this.setCustomValidity('')"
                >
                  <option value="" disabled selected>Selecione sua lotação</option>
                  <option v-for="it in fetched.lotacao" :value="it.id">{{ it.nome }}</option>
                </select>
              </div>
            </div>
            <div v-if="skey === 'zc3WsGum'" class="col-md-6">
              <div class="form-group">
                <label for="atuacaoList">Atuação</label>
                <select
                  class="form-control"
                  id="atuacaoList"
                  name="atuacao"
                  v-bind:disabled="campus === ''"
                  required
                  v-model="atuacao"
                  oninvalid="this.setCustomValidity('Por favor selecione uma atuação da lista')"
                  oninput="this.setCustomValidity('')"
                >
                  <option value="" disabled selected>Selecione sua atuação</option>
                  <option v-for="it in fetched.atuacao" :value="it.id">{{ it.nome }}</option>
                </select>
              </div>
            </div>
          </div>
        </template>
      </card>
      <card>
        <template v-slot:header>
          <p class="text-muted"><small>Perguntas seguidas de <b class="text-danger">*</b> são obrigatórias</small>
          </p>
        </template>
        <template v-slot:content>
          <div class="row" id="perguntaList">
            <div class="col-md-12 mt-1" v-for="eixo in Object.keys(fetched.perguntas)"
                 :key="Math.random()">
              <p><small class="text-muted">{{ eixo }}</small></p>
              <template v-for="dimensao in Object.keys(fetched.perguntas[eixo])">
                <p style="margin-left: 1rem;"><small style="margin-top: 1rem;" class="text-muted">{{ dimensao }}</small>
                </p>
                <template v-for="pergunta in fetched.perguntas[eixo][dimensao]">
                  <div class="form-group" style="margin-left: 2rem;">
                    <p class="h3">
                      {{ pergunta.titulo }}
                      <span v-if="pergunta.tipo == 1"><b class="text-danger">*</b></span>
                    </p>
                    <div v-if="pergunta.tipo == 1" class="row" style="flex-direction: row;">
                      <div v-for="obj in fetched.objetivas"
                           class="form-check col-xs-4 col-sm-2 flex items-center">
                        <input class="form-check-input respostas" type="radio"
                               :name="`resposta-${pergunta.id}`"
                               :id="`resposta-${pergunta.id}-${obj.value}`"
                               :value="obj.id"
                               v-bind:required="obj === fetched.objetivas[0]"
                               v-model="answers[pergunta.id]">
                        <label class="form-check-label lead margin-0"
                               :for="`resposta-${pergunta.id}-${obj.value}`">
                          {{ obj.titulo }}
                        </label>
                      </div>
                    </div>

                    <textarea v-else class="form-control respostas"
                              placeholder="Critica ou sugestão"
                              v-model.trim="answers[pergunta.id]"

                              rows="3"></textarea>
                  </div>
                </template>
                <hr v-if="eixo !== Object.keys(fetched.perguntas).slice(-1).pop()">
              </template>
            </div>
            <input class="btn btn-success btn-fill pull-right" style="margin-right: 1rem;" type="submit"
                   value="Enviar respostas">
            <div class="clearfix"></div>
          </div>
        </template>
      </card>
    </form>
  </div>
</template>

<script>
import Card from "../../components/card";

export default {
  name: "slug",
  head() {
    return {
      title: `Questionário do ${this.fetched.segmento.nome} | IFG Comissão Própria de Avaliação`
    };
  },
  components: {
    Card
  },
  computed: {
    skey() {
      return this.$route.params.slug;
    }
  },
  async asyncData({ $axios, route, redirect }) {
    let skey = route.params.slug;
    let res, campus;

    try {
      res = await $axios.get(`resposta?skey=${skey}`);
    } catch (e) {
      return redirect(200, "/");
    }

    const { segmento, perguntas, resp_objetivas, ano } = res.data;

    if (skey != "4jn7qduk") {
      campus = (await $axios.get("campus")).data.campus;
    }

    return {
      fetched: {
        segmento,
        perguntas,
        campus,
        objetivas: resp_objetivas
      },
      ano
    };
  },
  data: () => ({
    segmento_nome: "",
    ano: 0,
    colors: ["#fde3cc", "#fbfdcc", "#ccfcd6", "#ccfcec", "#ced3fb"],
    fetched: {
      campus: [],
      cursos: [],
      lotacao: [],
      atuacao: []
    },
    curso: "",
    lotacao: "",
    campus: "",
    atuacao: "",
    answers: {}
  }),
  methods: {
    fetchCurso() {
      this.$axios.get(`curso?campus=${this.campus}`).then(res => {
        this.fetched.cursos = res.data.cursos;
        this.curso = "";
      });
    },
    fetchLotacao() {
      this.$axios.get(`lotacao?campus=${this.campus}`).then(res => {
        this.fetched.lotacao = res.data.lotacao;
        this.lotacao = "";
      });
    },
    fetchAtuacao() {
      this.$axios.get(`atuacao?campus=${this.campus}`).then(res => {
        this.fetched.atuacao = res.data.atuacao;
        this.atuacao = "";
      });
    },
    changedCampus() {
      this.fetchCurso();
      this.fetchAtuacao();
      this.fetchLotacao();
    },
    postForm($e) {
      this.segmento = this.fetched.segmento.id;
      if (this.skey === "4jn7qduk") {
        this.campus = 15;
      }
      this.$axios({
        method: "post",
        url: "resposta",
        data: {
          segmento: this.fetched.segmento.id,
          campus: this.campus,
          curso: this.curso,
          atuacao: this.atuacao,
          lotacao: this.lotacao,
          respostas: this.answers,
          ano: this.ano
        }
      }).then(() => {
        this.$router.push({ name: "index" });
        $.notify({
          icon: "pe-7s-like2",
          message: "Obrigado!<br>Suas repostas foram armazenadas com êxito."

        }, {
          type: "success",
          timer: 5000,
          placement: {
            from: "top",
            align: "right"
          }
        });
      }).catch(e => {
        $.notify({
          icon: "pe-7s-close",
          message: "Não foi possível armazenar suas respostas.<br>Tente novamente mais tarde!"
        }, {
          type: "danger",
          timer: 5000,
          placement: {
            from: "top",
            align: "right"
          }
        });
      });
    }
  }
};
</script>

<style scoped>
.margin-0 {
  margin: 0;
}

.items-center {
  align-items: center;
}

.mt-1 + .mt-1 {
  margin-top: 1rem;
}
</style>
