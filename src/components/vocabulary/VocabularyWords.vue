<script lang="ts">
import { useVocabularyStore } from '@/store/vocabulary';
import { useLanguagesStore } from '@/store/languages';
import { numWord } from '@/utils/numWord';
import { mapState } from 'pinia';
import IconButton from '../UI/button/IconButton.vue';
import WordCard from './WordCard.vue';
import Preloader from '@/components/UI/preloader/Preloader.vue';

export default {
  components: { IconButton, WordCard, Preloader },
  computed: {
    ...mapState(useVocabularyStore, ['words', 'count', 'filterOptions', 'isLoading']),
    ...mapState(useLanguagesStore, ['learning_languages']),
    textInfo() {
      return `Найдено ${this.count} ${numWord(this.count, ['слово', 'слова', 'слов'])} или ${numWord(this.count, ['фраза', 'фразы', 'фраз'])}`;
    },
  },
};
</script>

<template>
  <div class="vocabulary-content">
    <header class="vocabulary-content--header">
      <span class="vocabulary-content--info">{{ textInfo }}</span>
      <div class="vocabulary-content--filters">
        <IconButton icon="FilterIcon" size="md" iconSize="nm" variant="tertiary" />
        <IconButton icon="SortIcon" size="md" iconSize="nm" variant="tertiary" />
      </div>
    </header>
    <div v-if="!isLoading" class="vocabulary-content--cards">
      <WordCard v-for="word in words" :word="word" />
    </div>
    <div v-else class="vocabulary-content--preloader">
      <Preloader />
    </div>
  </div>
</template>

<style lang="scss">
.vocabulary-content {
  &--header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  &--info {
    @include tag-big;
    color: $neutrals-600;
  }

  &--filters {
    display: inline-flex;
    gap: 0.4rem;
  }

  &--cards {
    display: grid;
    grid-template-columns: repeat(4, 29.5rem);
    justify-content: space-between;
    gap: 2rem;
  }

  &--preloader {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20%;
  }
}
</style>
