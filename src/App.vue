<script lang="ts">
import { mapActions, mapState } from 'pinia';
import { useUserStore } from './store/user';
import Preloader from '@/components/UI/preloader/Preloader.vue';
import { useLanguagesStore } from './store/languages';
import { useVocabularyStore } from './store/vocabulary';
import HomePage from '@/views/HomePage.vue';

export default {
  components: { HomePage, Preloader },
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    ...mapState(useUserStore, ['authStatus']),
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
  },
  mounted() {
    if (this.authStatus) {
      Promise.all([
        this.getUser(),
      ]).finally(async () => {
        const { interface_language } = useUserStore();
        this.$i18n.locale = interface_language;

        await this.getUser(this.$i18n.locale);
        await this.getVocabulary(this.$i18n.locale);
        await this.getLearningLanguages(this.$i18n.locale);
        await this.getGlobalLanguages(this.$i18n.locale);
        await this.getAvailableLanguages(this.$i18n.locale);
        await this.getAllLanguages(this.$i18n.locale);

        this.isLoading = false;
      });
    } else {
      Promise.all([
        this.getGlobalLanguages(),
      ]).finally(() => {
        this.isLoading = false;
      })
    };
  },
};
</script>

<template>
  <RouterView v-if="!isLoading" />
  <RouterView name="helper" v-if="!isLoading" />
  <div v-else class="preloader">
    <Preloader />
  </div>
</template>

<style scoped lang="scss">
.preloader {
  width: 100svw;
  height: 100svh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
