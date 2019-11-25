<template>
  <div class="card">
    <div class="header">
      <slot name="header">

      </slot>
    </div>
    <div class="content">
      <slot name="content">

      </slot>
      <div class="footer">
        <slot name="footer">

        </slot>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: "card",
        props: ['cardtitle', 'cardfooter'],
    }
</script>

<style scoped>

</style>
