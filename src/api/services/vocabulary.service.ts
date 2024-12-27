import type { IApi } from '@/types/api/api-types';
import type { VocabularyQuery } from '@/types/api/services';

export const wordsPerPage = 32;

export default (api: IApi) => {
  api.vocabulary = {
    getVocabulary: (query?: VocabularyQuery) => {
      const url = '/api/vocabulary/';

      const paginationQuery = `?limit=${wordsPerPage}`;
      const searchQuery = `${query?.search ? `&search=${query.search}` : ''}`
      const filterByStatusQuery = `${query?.activity_status ? `&activity_status=${query.activity_status}` : ''}`
      const filterByLanguageQuery = `${query?.language ? `&language=${query.language}` : ''}`
      const queryParams = paginationQuery + searchQuery + filterByStatusQuery + filterByLanguageQuery;

      return api.request.get(url + queryParams);
    },

    createWord: (word) => {
      return api.request.post('/api/vocabulary/', word);
    },

    getWordProfile: (wordSlug) => {
      return api.request.get(`/api/vocabulary/${wordSlug}/`);
    },

    patchWord: (wordSlug, wordUpdated) => {
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

    getFavorite: (query?: VocabularyQuery) => {
      const url = '/api/vocabulary/favorites/';

      const paginationQuery = `?limit=${wordsPerPage}`;
      const searchQuery = `${query?.search ? `&search=${query.search}` : ''}`
      const filterByStatusQuery = `${query?.activity_status ? `&activity_status=${query.activity_status}` : ''}`
      const filterByLanguageQuery = `${query?.language ? `&language=${query.language}` : ''}`
      const queryParams = paginationQuery + searchQuery + filterByStatusQuery + filterByLanguageQuery;

      return api.request.get(url + queryParams);
    },
  };
};
