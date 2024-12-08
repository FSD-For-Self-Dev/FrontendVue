<script lang="ts">
import PageLayout from '@/components/UI/page-layout/PageLayout.vue';
import PageTitle from '@/components/UI/page-title/PageTitle.vue';
import FavoritesTools from '@/components/vocabulary/FavoritesTools.vue';
import VocabularyWords from '@/components/vocabulary/VocabularyWords.vue';

export default {
  components: { PageLayout, PageTitle, FavoritesTools, VocabularyWords },
  computed: {
    isEmpty() {
      return false
    },
  }
};
</script>

<template>
    <PageLayout>
      <PageTitle text="Избранное" icon="FavouriteIcon" />
      <FavoritesTools v-if="!isEmpty" />
      <VocabularyWords v-if="!isEmpty" />
    </PageLayout>
  </template>

<style scoped lang="scss"></style>
