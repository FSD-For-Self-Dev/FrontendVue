<script lang="ts">
import { useVocabularyStore } from '@/store/vocabulary';
import { useLanguagesStore } from '@/store/languages';
import { numWord } from '@/utils/numWord';
import { mapState } from 'pinia';
import IconButton from '../UI/button/IconButton.vue';
import WordCard from './WordCard.vue';

export default {
  components: { IconButton, WordCard },
  computed: {
    ...mapState(useVocabularyStore, ["words", "count", "filterOptions"]),
    ...mapState(useLanguagesStore, ["learning_languages"]),
    textInfo() {
      return `Найдено ${this.count} ${numWord(this.count, ['слово', 'слова', 'слов'])} или ${numWord(this.count, ['фраза', 'фразы', 'фраз'])}`;
    }
  }
}
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
    <div class="vocabulary-content--cards">
      <div v-for="word in words">
        <WordCard :word="word"/>
      </div>
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
}
</style>
