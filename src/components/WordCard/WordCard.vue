<template>
  <article class="card">
    {{card.name}}
  </article>
</template>

<script lang="ts">
  export default {
    props: {
      card: {type: Object, required: true},
    },
  };
</script>

<style lang="scss" scoped>
  .card {
    width: 100%;
    height: 35rem;
    background-color: $primary-300;
    border-radius: $radius-lg;
    box-shadow: $regular-shadow;
    @include flex-center;
  }
</style>
