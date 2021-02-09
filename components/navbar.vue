<template>
  <div>

    <ul v-if="!sidebar" class="nav">

      <li v-for="link in links">
        <nuxt-link tag="a" :to="link.link">
          <i :class="link.icon"></i>
          <p>{{link.label}}</p>
        </nuxt-link>
      </li>

    </ul>
    <nav v-else class="pull-left">
      <ul>
        <li v-for="link in links">
          <nuxt-link tag="a" :to="link.link">
            <i :class="link.icon"></i>
            <p>{{link.label}}</p>
          </nuxt-link>
        </li>

      </ul>
    </nav>

  </div>

</template>

<script>
  export default {
    name: "navbar",
    props: {
      sidebar: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      links: [
        {label: 'Home', icon: 'pe-7s-home', link: '/'},
        {label: 'Estudante', icon: 'pe-7s-note2', link: '/questionario/s4UkHMQC'},
        {label: 'Docente', icon: 'pe-7s-note2', link: '/questionario/zc3WsGum'},
        {label: 'Servidor Técnico', icon: 'pe-7s-note2', link: '/questionario/g3YTAfpT'},
        {label: 'Reitoria', icon: 'pe-7s-note2', link: '/questionario/4jn7qduk'},
        {label: 'Relatório', icon: 'pe-7s-graph', link: '/relatorio'},
      ]
    })
  }
</script>

<style scoped>

</style>
