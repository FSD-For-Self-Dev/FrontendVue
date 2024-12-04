import type { IApi } from '@/types/api/api-types';

export default (api: IApi) => {
    api.vocabulary = {
        getVocabulary: () => {
            return api.request.get('/api/vocabulary/')
        },
        createWord: (word) => {
            return api.request.post('/api/vocabulary/', word);
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
        getWordProfile: (wordSlug) => {
            return api.request.get(`/api/vocabulary/${wordSlug}/`);
        },
    };
};
