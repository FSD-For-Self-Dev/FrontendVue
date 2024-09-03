import type { IApi } from '@/types/api/api-types';

export default (api: IApi) => {
    api.languages = {
        getAvailableLanguages() {
            return api.request.get('/api/languages/learning-available/');
        },
        getLearningLanguages() {
            return api.request.get('/api/languages/');
        },
        postLearningLanguage(languages) {
            const data = languages.map((language) => {
                return {
                    language: language.name,
                };
            });

            return api.request.post('/api/languages/', data);
        },
    };
};
