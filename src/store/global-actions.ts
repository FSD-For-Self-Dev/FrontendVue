import api from '@/api';
import { useUserStore } from '@/store/user';
import { useLanguagesStore } from '@/store/languages';
import { useVocabularyStore } from '@/store/vocabulary';
import { defineStore } from 'pinia';

export const useGlobalActionsStore = defineStore('global-actions', {
  actions: {
    async global_init() {
      const { getUser } = useUserStore();
      const { getAvailableLanguages, getLearningLanguages, getGlobalLanguages, getAllLanguages } =
        useLanguagesStore();
      const { getVocabulary } = useVocabularyStore();

      await Promise.all([
        getUser(),
        getGlobalLanguages(),
        getAvailableLanguages(),
        getLearningLanguages(),
        getAllLanguages(),
        getVocabulary(),
      ]);
    },
    async global_clear() {
      const { logout } = useUserStore();
      const { clearDataVocabulary } = useVocabularyStore();
      const { clearDataLanguages } = useLanguagesStore();

      await Promise.all([
        clearDataLanguages(),
        clearDataVocabulary(),
        logout(),
      ]);
    },
    update_locale(locale: string) {
      api.updateLocale(locale);
    },
  },
});
