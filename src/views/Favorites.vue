<script lang="ts">
import PageLayout from '@/components/UI/page-layout/PageLayout.vue';
import PageTitle from '@/components/UI/page-title/PageTitle.vue';
import VocabularyTools from '@/components/vocabulary/VocabularyTools.vue';
import VocabularyWords from '@/components/vocabulary/VocabularyWords.vue';
import { useVocabularyStore } from '@/store/vocabulary';
import { useWindowScroll } from '@vueuse/core';
import { mapActions, mapState } from 'pinia';

const { y } = useWindowScroll({ behavior: 'instant' });

export default {
  components: {
    PageLayout,
    PageTitle,
    VocabularyWords,
    VocabularyTools,
  },
  setup() {
    y.value = 0;
  },
  data() {
    const { favoriteWords, favoriteCount } = useVocabularyStore();
    return {
      favoriteWords,
      favoriteCount,
    }
  },
  computed: {
    ...mapState(useVocabularyStore, ['favoriteCount']),
    isEmpty() {
      return this.favoriteCount === 0;
    },
    emptyImage(): string {
      return new URL(`/src/assets/images/emptyImage.svg`, import.meta.url).href;
    },
  },
  methods: {
    ...mapActions(useVocabularyStore, ['getFavoriteWords']),
  },
};
</script>

<template>
    <PageLayout>
      <PageTitle :text="$t('title.favorites')" icon="FavouriteIcon" />
      <VocabularyTools
        :getFilteredWords="getFavoriteWords"
        :hideStatusFilter="true"
        :hideAddButton="true"
        v-if="!isEmpty"
      />
      <VocabularyWords
        :words="favoriteWords"
        :wordsCount="favoriteCount"
        :getWords="getFavoriteWords"
        v-if="!isEmpty"
      />
      <div class="favorite-words--empty" v-else>
        <img :src="emptyImage" alt="empty" class="img" width="240" height="180" />
        <div class="favorite-words--empty-tip">
          <p class="favorite-words--empty-tip-title">
            {{ $t('emptyTip.favoriteWordsTitle') }}
          </p>
          <p class="favorite-words--empty-tip-text">
            {{ $t('emptyTip.favoriteWordsText') }}
          </p>
        </div>
      </div>
    </PageLayout>
  </template>

<style scoped lang="scss">
.favorite-words--empty {
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
