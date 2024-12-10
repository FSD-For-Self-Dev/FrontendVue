import type { IApi } from '@/types/api/api-types';

export default (api: IApi) => {
  api.languages = {
    getAvailableLanguages(locale?: string) {
      if (locale) {
        return api.request.get(`/${locale}/api/languages/learning-available/`);
      }
      return api.request.get('/api/languages/learning-available/');
    },
    getLearningLanguages(locale?: string) {
      if (locale) {
        return api.request.get(`/${locale}/api/languages/`);
      }
      return api.request.get('/api/languages/');
    },
    getGlobalLanguages(locale?: string) {
      if (locale) {
        return api.request.get(`/${locale}/api/global-languages/`);
      }
      return api.request.get('/api/global-languages/');
    },
    getAllLanguages(locale?: string) {
      if (locale) {
        return api.request.get(`/${locale}/api/languages/all/`);
      }
      return api.request.get('/api/languages/all/');
    },
    postLearningLanguage(languages, locale?: string) {
      const data = languages.map((language) => {
        return {
          language: language.name,
        };
      });

      if (locale) {
        return api.request.post(`/${locale}/api/languages/`, data);
      }
      return api.request.post('/api/languages/', data);
    },
    deleteLanguage(languageSlug, delete_words, locale?: string) {
      if (locale && delete_words) {
        return api.request.delete(`/${locale}/api/languages/${languageSlug}/?delete_words`);
      } else if (locale) {
        return api.request.delete(`/${locale}/api/languages/${languageSlug}/`);
      } else if (delete_words) {
        return api.request.delete(`/api/languages/${languageSlug}/?delete_words`);
      } else {
        return api.request.delete(`/api/languages/${languageSlug}/`);
      }
    },
    getLanguageCovers(languageSlug, locale?: string) {
      if (locale) {
        return api.request.get(`/${locale}/api/languages/${languageSlug}/cover-choices/`);
      }
      return api.request.get(`/api/languages/${languageSlug}/cover-choices/`);
    },
    setLanguageCover(languageSlug, data, locale?: string) {
      if (locale) {
        return api.request.post(`/${locale}/api/languages/${languageSlug}/set-cover/`, data);
      }
      return api.request.post(`/api/languages/${languageSlug}/set-cover/`, data);
    },
  };
};
