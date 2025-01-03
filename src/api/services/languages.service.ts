import type { IApi } from '@/types/api/api-types';

export const coverImagesPerPage = 16;

export default (api: IApi) => {
  api.languages = {
    getAvailableLanguages() {
      return api.request.get('/api/languages/learning-available/');
    },
    getLearningLanguages() {
      return api.request.get('/api/languages/');
    },
    getGlobalLanguages() {
      return api.request.get('/api/global-languages/');
    },
    getAllLanguages() {
      return api.request.get('/api/languages/all/');
    },
    postLearningLanguage(languages) {
      const data = languages.map((language) => {
        return {
          language: language.isocode,
        };
      });
      return api.request.post('/api/languages/', data);
    },
    deleteLanguage(languageSlug, delete_words) {
      if (delete_words) {
        return api.request.delete(`/api/languages/${languageSlug}/?delete_words`);
      } else {
        return api.request.delete(`/api/languages/${languageSlug}/`);
      }
    },
    getLanguageCovers(languageSlug) {
      const url = `/api/languages/${languageSlug}/cover-choices/`;
      const paginationQuery = `?limit=${coverImagesPerPage}`;
      return api.request.get(url + paginationQuery);
    },
    setLanguageCover(languageSlug, data) {
      return api.request.post(`/api/languages/${languageSlug}/set-cover/`, data);
    },
    deleteLanguageCover(languageSlug, data) {
      return api.request.post(`/api/languages/${languageSlug}/delete-cover/`, data);
    },
  };
};
