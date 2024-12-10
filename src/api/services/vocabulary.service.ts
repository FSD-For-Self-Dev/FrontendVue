import type { IApi } from '@/types/api/api-types';

export default (api: IApi) => {
  api.vocabulary = {
    getVocabulary: (locale?: string) => {
      if (locale) {
        return api.request.get(`/${locale}/api/vocabulary/`);
      }
      return api.request.get('/api/vocabulary/');
    },
    createWord: (word, locale?: string) => {
      if (locale) {
        return api.request.post(`/${locale}/api/vocabulary/`, word);
      }
      return api.request.post('/api/vocabulary/', word);
    },
    getWordProfile: (wordSlug, locale?: string) => {
      if (locale) {
        return api.request.get(`/${locale}/api/vocabulary/${wordSlug}/`);
      }
      return api.request.get(`/api/vocabulary/${wordSlug}/`);
    },
    patchWord: (wordSlug, wordUpdated, locale?: string) => {
      if (locale) {
        return api.request.patch(`/${locale}/api/vocabulary/${wordSlug}/`, wordUpdated);
      }
      return api.request.patch(`/api/vocabulary/${wordSlug}/`, wordUpdated);
    },
    deleteWord: (wordSlug) => {
      return api.request.delete(`/api/vocabulary/${wordSlug}/`);
    },
    addWordToFavorite: (wordSlug) => {
      return api.request.post(`/api/vocabulary/${wordSlug}/favorite/`);
    },
    removeWordFromFavorite: (wordSlug) => {
      return api.request.delete(`/api/vocabulary/${wordSlug}/favorite/`);
    },
  };
};
