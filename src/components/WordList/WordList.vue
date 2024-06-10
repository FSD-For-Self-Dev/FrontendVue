<template>
  <section class="section">
    <ul class="list">
      <li v-for="(card, index) in cards" :key="index" class="item">
        <WordCard :card="card" />
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import WordCard from '../WordCard/WordCard.vue';
  export default {
  components: { WordCard },
    props: {
      cards: {type: Array, required: true},
    },
  };
</script>

<style lang="scss" scoped>
  .list {
    @include grid20();
  }
  .item {
    width: 100%;
  }
</style>
