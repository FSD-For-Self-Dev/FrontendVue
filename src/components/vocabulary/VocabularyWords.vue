<script lang="ts">
import { useVocabularyStore } from '@/store/vocabulary';
import { useLanguagesStore } from '@/store/languages';
import { mapActions, mapState, mapWritableState } from 'pinia';
import IconButton from '../UI/button/IconButton.vue';
import WordCard from './WordCard.vue';
import NewWordButton from './NewWordButton.vue';
import Preloader from '@/components/UI/preloader/Preloader.vue';

export default {
  components: { IconButton, WordCard, NewWordButton, Preloader },
  props: {
    makeRequest: {
      type: Boolean,
      required: false,
    },
  },
  mounted() {
    if (this.makeRequest) {
      this.getVocabulary(true)
    } else {
      this.filteredWords = this.vocabularyWords;
      this.filteredCount = this.count;
    }
  },
  computed: {
    ...mapState(useVocabularyStore, ['vocabularyWords', 'count', 'filterOptions', 'isLoading']),
    ...mapWritableState(useVocabularyStore, ['filteredWords', 'filteredCount']),
    ...mapState(useLanguagesStore, ['learning_languages']),
    noResults(): string {
      return new URL(`/src/assets/images/noResults.svg`, import.meta.url).href;
    },
  },
  methods: {
    ...mapActions(useVocabularyStore, ['getVocabulary']),
    updateWords() {
      this.getVocabulary(true);
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
      <WordCard
        :word="word"
        v-for="word in filteredWords"
        @word-edited="updateWords"
        @word-deleted="updateWords"
      />
    </div>
    <div v-else class="vocabulary-content--preloader">
      <Preloader />
    </div>
    <div class="empty-tip" v-if="filteredCount === 0">
      <img :src="noResults" alt="No results" class="img" width="574" height="400" />
      <p class="tip">{{ $t('emptyTip.filteredWordsEmpty') }}</p>
    </div>
  </div>
  <div class="empty-tip" v-else>
    <p class="tip">{{ $t('emptyTip.vocabulary') }}</p>
    <NewWordButton
      button-size="medium"
      :button-text="$t('buttons.addNewWord')"
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
