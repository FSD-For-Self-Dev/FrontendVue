import type { IApi } from '@/types/api/api-types';
import type { VocabularyQuery } from '@/types/api/services';

export default (api: IApi) => {
  api.vocabulary = {
    getVocabulary: (query?: VocabularyQuery) => {
      if (!query) {
        return api.request.get('/api/vocabulary/');
      }

      const url = `/api/vocabulary/${query.search ? `?search=${query.search}` : ''}${query.activity_status ? `?activity_status=${query.activity_status}` : ''}${query.language ? `?language=${query.language}` : ''}`;

      return api.request.get(url);
    },
    createWord: (word) => {
      return api.request.post('/api/vocabulary/', word);
    },
  };
};
