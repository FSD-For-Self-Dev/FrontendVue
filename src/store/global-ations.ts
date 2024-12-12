import { useUserStore } from '@/store/user';
import { useLanguagesStore } from '@/store/languages';
import { useVocabularyStore } from '@/store/vocabulary';
import { defineStore } from 'pinia';

export const useGlobalActionsStore = defineStore('global-actions', {
  actions: {
    async global_init(locale?: string) {
      const { getUser } = useUserStore();
      const { getAvailableLanguages, getLearningLanguages, getGlobalLanguages, getAllLanguages } =
        useLanguagesStore();
      const { getVocabulary } = useVocabularyStore();

      await Promise.all([
        getUser(locale),
        getGlobalLanguages(locale),
        getAvailableLanguages(locale),
        getLearningLanguages(locale),
        getAllLanguages(locale),
        getVocabulary(locale),
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
  },
});
