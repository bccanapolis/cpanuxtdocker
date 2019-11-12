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
                {label: 'Home', icon: 'pe-7s-home', link: '/'}
            ]
        })
    }
</script>

<style scoped>

</style>
