<script lang="ts">
import PageLayout from '@/components/UI/page-layout/PageLayout.vue';
import PageTitle from '@/components/UI/page-title/PageTitle.vue';
import LanguagesListView from '@/components/language/LanguagesListView.vue';
import { useWindowScroll } from '@vueuse/core';

const { y } = useWindowScroll({ behavior: 'instant' });

export default {
  components: { PageLayout, PageTitle, LanguagesListView },
  setup() {
    y.value = 0;
  },
};
</script>

<template>
  <PageLayout>
    <PageTitle :text="$t('title.languages')" icon="LanguageIcon" />
    <LanguagesListView />
  </PageLayout>
</template>

<style lang="scss" scoped></style>
