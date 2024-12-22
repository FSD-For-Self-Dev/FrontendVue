<script lang="ts">
import PageLayout from '@/components/UI/page-layout/PageLayout.vue';
import PageTitle from '@/components/UI/page-title/PageTitle.vue';
import VocabularyTools from '@/components/vocabulary/VocabularyTools.vue';
import VocabularyWords from '@/components/vocabulary/VocabularyWords.vue';
import { useVocabularyStore } from '@/store/vocabulary';
import { useWindowScroll } from '@vueuse/core';
import { mapState, mapWritableState } from 'pinia';

const { y } = useWindowScroll({ behavior: 'instant' });

export default {
  components: { PageLayout, PageTitle, VocabularyTools, VocabularyWords },
  setup() {
    y.value = 0;
  },
  mounted() {
    this.pageKey = 'vocabulary';
  },
  computed: {
    ...mapState(useVocabularyStore, ['vocabularyWords', 'count']),
    ...mapWritableState(useVocabularyStore, [
      'filteredWords',
      'filteredCount',
      'pageKey',
    ]),
  },
};
</script>

<template>
  <PageLayout>
    <PageTitle :text="$t('title.vocabulary')" icon="VocabularyIcon" />
    <VocabularyTools />
    <VocabularyWords />
  </PageLayout>
</template>
