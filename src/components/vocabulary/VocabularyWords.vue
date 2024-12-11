<script lang="ts">
import { useVocabularyStore } from '@/store/vocabulary';
import { useLanguagesStore } from '@/store/languages';
import { mapState, mapWritableState } from 'pinia';
import IconButton from '../UI/button/IconButton.vue';
import WordCard from './WordCard.vue';
import type { LearningLanguageDto } from '@/dto/languages.dto';
import NewWordButton from './NewWordButton.vue';
import type { PropType } from 'vue';
import Preloader from '@/components/UI/preloader/Preloader.vue';

export default {
  components: { IconButton, WordCard, NewWordButton, Preloader },
  props: {
    chosenLanguage: {
      type: Object as PropType<LearningLanguageDto>,
      required: false,
    },
  },
  mounted() {
    this.filteredWords = this.vocabularyWords;
    this.filteredCount = this.count;
  },
  
  computed: {
    ...mapState(useVocabularyStore, ['vocabularyWords', 'count', 'filterOptions', 'isLoading']),
    ...mapWritableState(useVocabularyStore, ['filteredWords', 'filteredCount']),
    ...mapState(useLanguagesStore, ['learning_languages']),
    noResults(): string {
      return new URL(`/src/assets/images/noResults.svg`, import.meta.url).href;
    },
  },
};
</script>

<template>
  <div class="vocabulary-content" v-if="count > 0">
    <header class="vocabulary-content--header">
      <span class="vocabulary-content--info">
        {{ $t('counter.words', filteredCount, { named: { n: filteredCount } }) }}
      </span>
      <div class="vocabulary-content--filters">
        <IconButton icon="FilterIcon" size="md" iconSize="nm" variant="tertiary" />
        <IconButton icon="SortIcon" size="md" iconSize="nm" variant="tertiary" />
      </div>
    </header>
    <div v-if="!isLoading" class="vocabulary-content--cards">
      <WordCard :word="word" v-for="word in filteredWords" />
    </div>
    <div class="empty-tip" v-if="filteredCount === 0">
      <img :src="noResults" alt="No results" class="img" width="574" height="400" />
      <p class="tip">{{ $t('emptyTip.filteredWordsEmpty') }}</p>
    </div>
    <div v-else class="vocabulary-content--preloader">
      <Preloader />
    </div>
  </div>
  <div class="empty-tip" v-else>
    <p class="tip">{{ $t('emptyTip.vocabulary') }}</p>
    <NewWordButton
      button-size="medium"
      :button-text="$t('buttons.addNewWord')"
      :chosenLanguage="
        chosenLanguage ? chosenLanguage.language.name : filterOptions.language
      "
    />
  </div>
</template>

<style lang="scss">
.vocabulary-content {
  &--header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  &--info {
    @include tag-big;
    color: $neutrals-700;
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

.empty-tip {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  .tip {
    @include subheading-2;
    color: $primary-700;
  }
}
</style>
