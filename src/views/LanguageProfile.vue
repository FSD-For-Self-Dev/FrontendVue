<script lang="ts">
import PageLayout from '@/components/UI/page-layout/PageLayout.vue';
import LanguageProfileHeader from '@/components/language/LanguageProfileHeader.vue';
import VocabularyTools from '@/components/vocabulary/VocabularyTools.vue';
import VocabularyWords from '@/components/vocabulary/VocabularyWords.vue';
import { useLanguagesStore } from '@/store/languages';
import { useVocabularyStore } from '@/store/vocabulary';
import { useWindowScroll } from '@vueuse/core';
import { mapActions, mapWritableState } from 'pinia';

const { y } = useWindowScroll({ behavior: 'instant' });

export default {
  components: { PageLayout, LanguageProfileHeader, VocabularyWords, VocabularyTools },
  setup() {
    y.value = 0;
  },
  beforeMount() {
    const lang_obj = this.languageObject;
    this.filterOptions.language = lang_obj ? lang_obj.language.isocode : '';
  },
  mounted() {
    this.pageKey = 'languageProfile';
  },
  computed: {
    ...mapWritableState(useVocabularyStore, ['filterOptions', 'pageKey']),
    languageObject() {
      if (typeof this.$route.params.slug === 'string') {
        const lang_obj = this.getLanguageObjectByIsocode(this.$route.params.slug);
        if (lang_obj) {
          return lang_obj;
        } else {
          this.$router.push({ name: '404' });
          return;
        }
      } else {
        this.$router.push({ name: '404' });
        return;
      }
    },
  },
  methods: {
    ...mapActions(useLanguagesStore, ['getLanguageObjectByIsocode']),
  },
};
</script>

<template>
  <PageLayout>
    <LanguageProfileHeader :language="languageObject" v-if="languageObject" />
    <VocabularyTools :hideLanguageFilter="true" />
    <VocabularyWords :makeRequest="true" />
  </PageLayout>
</template>

<style lang="scss" scoped></style>
