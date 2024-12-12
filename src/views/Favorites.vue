<script lang="ts">
import PageLayout from '@/components/UI/page-layout/PageLayout.vue';
import PageTitle from '@/components/UI/page-title/PageTitle.vue';
import FavoritesTools from '@/components/vocabulary/FavoritesTools.vue';
import VocabularyWords from '@/components/vocabulary/VocabularyWords.vue';
import { useWindowScroll } from '@vueuse/core';

const { y } = useWindowScroll({ behavior: 'instant' });

export default {
  components: { PageLayout, PageTitle, FavoritesTools, VocabularyWords },
  computed: {
    isEmpty() {
      return false
    },
  },
  setup() {
    y.value = 0;
  },
};
</script>

<template>
    <PageLayout>
      <PageTitle :text="$t('title.favorites')" icon="FavouriteIcon" />
      <FavoritesTools v-if="!isEmpty" />
      <VocabularyWords v-if="!isEmpty" />
    </PageLayout>
  </template>

<style scoped lang="scss"></style>
