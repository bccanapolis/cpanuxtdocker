<template>
  <div class="card">
    <div class="card-head">
      <h4 class="card-title">{{cardtitle}}</h4>
    </div>
    <div class="card-body">
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "card",
        props: ['cardtitle']
    }
</script>

<style scoped>

</style>
