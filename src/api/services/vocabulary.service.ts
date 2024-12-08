import type { IApi } from '@/types/api/api-types';

export default (api: IApi) => {
    api.vocabulary = {
        getVocabulary: () => {
            return api.request.get('/api/vocabulary/')
        },
        createWord: (word) => {
            return api.request.post('/api/vocabulary/', word);
        },
        addWordToFavorite: (wordSlug) => {
            return api.request.post(`/api/vocabulary/${wordSlug}/favorite/`);
        },
        removeWordFromFavorite: (wordSlug) => {
            return api.request.delete(`/api/vocabulary/${wordSlug}/favorite/`);
        },
    };
};
