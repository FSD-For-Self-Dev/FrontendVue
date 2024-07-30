<template>
  <article class="card">
    {{ card.text }}
  </article>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { IWordCard } from '@/types/components/word-card'

export default {
  props: {
    card: { type: Object as PropType<IWordCard>, required: true },
  },
}
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 35rem;
  background-color: $primary-300;
  border-radius: $radius-xl;
  box-shadow: $regular-shadow;
  @include flex-center;
}
</style>
