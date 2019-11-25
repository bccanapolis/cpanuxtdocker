<template>
  <div class="row">
    <div class="col-sm-12">
      <card>
        <template v-slot:header>
          <h2 class="mx-auto text-center">{{titulo}}</h2>
          <p>Prezado(a) participante, seja bem-vindo(a) ao QUESTIONÁRIO DE AUTOAVALIAÇÃO INSTITUCIONAL do
            IFG. Este questionário é anônimo e visa a obter avaliações referentes às atividades
            realizadas pelo IFG no ano de 2019. As questões abordam de forma concisa e objetiva os
            eixos: Desenvolvimento Institucional, Políticas de Gestão e Infraestrutura. A sua opinião subsidiará a
            elaboração do Relatório de Autoavaliação Institucional 2019, que será divulgado à comunidade
            acadêmica e norteará às tomadas de decisões da gestão para melhorias no IFG. </p>

        </template>
        <template v-slot:content>
          <div class="row">
            <div class="col-sm-12">
              <hr>
              <div class="title">Selecione os campos que se adequam a você:</div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="campusList">Campus</label>
                <select class="form-control" name="campus" id="campusList">
                  <option v-for="cp in campus" :value="cp.id">{{cp.nome}}</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="areaList">
                  <span v-if="titulo === 'Estudante'">Curso</span>
                  <span v-else-if="titulo === 'Docente'">Atuação</span>
                  <span v-else>Lotação</span>
                </label>
                <select v-model="selectedArea" name="" id="areaList" class="form-control">
                  <option v-for="ae in areas" :value="ae.id">{{ae.nome}}</option>
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
          <form action="">


            <div class="row">
              <div v-for="pg in perguntas" class="col-sm-12">
                <div class="form-group">
                  <p class="h3">
                    {{pg.titulo}}
                    <span v-if="pg.tipo == 1"><b class="text-danger">*</b></span>
                  </p>
                  <div v-if="pg.tipo == 1" class="row">
                    <div v-for="rp in resobjetivas" class="form-check col-xs-4 col-sm-2">
                      <label :for="`resposta-${pg.id}-${rp.value}` " class="form-check-label lead">{{rp.titulo}}</label>
                      <input type="radio" v-model="selectResp[`resposta-${pg.id}`]" :name="`resposta-${pg.id}`"
                             :id="`resposta-${pg.id}-${rp.value}`" class="form-check-input respostas"
                             :required="rp.value == 1 ? 'required' : 'false'" :value="rp.id">
                    </div>
                  </div>
                  <textarea v-else class="form-control respostas"
                            placeholder="Critica ou sugestão"
                            v-model="selectResp[`resposta-${pg.id}`]"
                            :name="`resposta-${pg.id}`"
                            :id="`resposta-${pg.id}`"
                            rows="3"></textarea>
                </div>
              </div>
            </div>
            <input class="btn btn-info btn-fill pull-right" type="submit" value="ENVIAR">
            <div class="clearfix"></div>
          </form>
        </template>
      </card>
    </div>
  </div>
</template>

<script>
    import card from "./card";

    export default {
        name: "answer",
        props: {titulo: String, perguntas: Array, campus: Array, resobjetivas: Array},
        components: {card},
        data: () => ({
            selectedArea: null,
            selectResp: {},
            selectedCampus: null,
            areas: []
        })
    }
</script>

<style scoped>

</style>
