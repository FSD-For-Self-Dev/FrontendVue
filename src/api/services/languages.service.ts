import type { IApi } from '@/types/api/api-types';

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
        getAllLanguages(exclude_language: string = '') {
            return api.request.get(`/api/languages/all/?exclude=${exclude_language}`);
        },
        postLearningLanguage(languages) {
            const data = languages.map((language) => {
                return {
                    language: language.name,
                };
            });

            return api.request.post('/api/languages/', data);
        },
        deleteLanguage(languageSlug, delete_words) {
            if (delete_words) {
                return api.request.delete(`/api/languages/${languageSlug}/?delete_words`);
            }
            return api.request.delete(`/api/languages/${languageSlug}/`);
        },
    };
};
