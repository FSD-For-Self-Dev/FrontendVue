<script lang="ts">
import PageLayout from '@/components/UI/page-layout/PageLayout.vue';
import LanguageProfileTools from '@/components/language/LanguageProfileTools.vue';
import VocabularyWords from '@/components/vocabulary/VocabularyWords.vue';
import { useLanguagesStore } from '@/store/languages';
import { useWindowScroll } from '@vueuse/core';
import { mapState } from 'pinia';

const { y } = useWindowScroll({ behavior: 'instant' });

export default {
  components: { PageLayout, LanguageProfileTools, VocabularyWords },
  computed: {
    ...mapState(useLanguagesStore, ['learning_languages']),
    getLanguageObject() {
      const lang_obj = this.learning_languages.filter((lang) => { return lang.language.name === this.$route.params.slug})[0];
      if (lang_obj) {
        return lang_obj
      } else {
        this.$router.push({ name: '404' });
        return
      }
    }
  },
  setup() {
    y.value = 0;
  },
};
</script>

<template>
  <PageLayout>
    <LanguageProfileTools :language="getLanguageObject" v-if="getLanguageObject" />
    <VocabularyWords :chosen-language="getLanguageObject" v-if="getLanguageObject" />
  </PageLayout>
</template>

<style lang="scss" scoped></style>
