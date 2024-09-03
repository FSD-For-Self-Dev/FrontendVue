import type { IApi } from '@/types/api/api-types';

export default (api: IApi) => {
    api.vocabulary = {
        getVocabulary: () => {
            return api.request.get('/api/vocabulary/')
        },
        createWord: (word) => {
            console.log(word);
            return api.request.post('/api/vocabulary/', word);
        },
    };
};
