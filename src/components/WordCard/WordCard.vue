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
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.2s, transform 0.4s ease;
  }
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
    transform: translateY(100px);
  }
  .v-enter-to,
  .v-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
</style>
