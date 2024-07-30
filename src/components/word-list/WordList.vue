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
import type { PropType } from 'vue'
import type { IWordCard } from '@/types/components/word-card'
import WordCard from '@/components/word-card/WordCard.vue'

export default {
  components: { WordCard },
  props: {
    cards: { type: Array as PropType<IWordCard[]>, required: true },
  },
}
</script>

<style lang="scss" scoped>
.list {
  @include grid20();
}
.item {
  width: 100%;
}
</style>
