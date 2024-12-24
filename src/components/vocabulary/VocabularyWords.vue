<script lang="ts">
import { useVocabularyStore } from '@/store/vocabulary';
import { useLanguagesStore } from '@/store/languages';
import { mapActions, mapState, mapWritableState } from 'pinia';
import IconButton from '../UI/button/IconButton.vue';
import WordCard from './WordCard.vue';
import NewWordButton from './NewWordButton.vue';
import Preloader from '@/components/UI/preloader/Preloader.vue';
import type { PropType } from 'vue';
import type { WordDto } from '@/dto/vocabulary.dto';
import { handleScroll } from '@/utils/handleInfiniteScroll';

export default {
  components: { IconButton, WordCard, NewWordButton, Preloader },
  props: {
    makeRequest: {
      type: Boolean,
      required: false,
    },
    words: {
      type: Array as PropType<WordDto[]>,
      required: false,
    },
    wordsCount: {
      type: Number,
      required: false,
    },
  },
  mounted() {
    if (this.makeRequest) {
      this.updateWords(true);
    } else {
      this.filteredWords = this.words ? this.words : this.vocabularyWords;
      this.filteredCount = this.wordsCount ? this.wordsCount : this.count;
    }
    window.addEventListener('scroll', this.handleWordsScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleWordsScroll);
    this.resetPage();
  },
  computed: {
    ...mapState(useVocabularyStore, [
      'vocabularyWords',
      'count',
      'filterOptions',
      'isLoading',
      'isLoadingMore',
    ]),
    ...mapWritableState(useVocabularyStore, [
      'filteredWords',
      'filteredCount',
      'nextPageLink',
    ]),
    ...mapState(useLanguagesStore, ['learning_languages']),
    noResults(): string {
      return new URL(`/src/assets/images/noResults.svg`, import.meta.url).href;
    },
    emptyImage(): string {
      return new URL(`/src/assets/images/emptyImage.svg`, import.meta.url).href;
    },
  },
  methods: {
    ...mapActions(useVocabularyStore, [
      'getVocabulary',
      'getVocabularyNextPage',
      'resetPage',
      'updateWords',
    ]),
    async handleWordsScroll() {
      handleScroll(async () => {
        this.getVocabularyNextPage(true);
      });
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
    <div v-if="isLoading || isLoadingMore" class="preloader-inner">
      <Preloader />
    </div>
    <div class="empty-tip" v-if="filteredCount === 0">
      <img :src="noResults" alt="No results" class="img" width="574" height="400" />
      <p class="tip">{{ $t('emptyTip.filteredWordsEmpty') }}</p>
    </div>
  </div>
  <div class="vocabulary-empty" v-else>
    <img :src="emptyImage" alt="empty" class="img" width="240" height="180" />
    <div class="vocabulary-empty-tip">
      <p class="vocabulary-empty-tip-title">
        {{ $t('emptyTip.vocabularyTitle') }}
      </p>
      <p class="vocabulary-empty-tip-text">
        {{ $t('emptyTip.vocabularyText') }}
      </p>
    </div>
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

.vocabulary-empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4rem;

  &-tip {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    text-align: center;

    &-title {
      @include subheading-2;
    }

    &-text {
      @include text-2;
      max-width: 60rem;
    }
  }
}
</style>
