<template>
  <RouterView v-if="!isLoading" />
  <RouterView name="helper" v-if="!isLoading" />
  <div v-else class="preloader">
    <Preloader />
  </div>
</template>

<script lang="ts">
import { mapActions } from 'pinia';
import { useGlobalActionsStore } from '@/store/global-ations';
import Preloader from '@/components/UI/preloader/Preloader.vue';
import { useLanguagesStore } from './store/languages';
import { useVocabularyStore } from './store/vocabulary';
import HomePage from '@/views/HomePage.vue';

export default {
  components: { HomePage, Preloader },
  data() {
    return {
      isLoading: true,
      isLoading: true,
    };
  },
  methods: {
    ...mapActions(useUserStore, ['getUser']),
    ...mapActions(useLanguagesStore, [
      'getAvailableLanguages',
      'getLearningLanguages',
      'getGlobalLanguages',
      'getAllLanguages',
    ]),
    ...mapActions(useVocabularyStore, ['getVocabulary']),
    ...mapActions(useGlobalActionsStore, ['global_init']),
  },
  mounted() {
    this.global_init().finally(() => {
      this.isLoading = false;
    });
  },
};
</script>

<style scoped lang="scss">
.preloader {
  width: 100svw;
  height: 100svh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
