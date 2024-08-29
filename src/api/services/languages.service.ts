import type { IApi } from '@/types/api/api-types';

export default (api: IApi) => {
    api.languages = {
        getAvailableLanguages() {
            return api.request.get('/api/languages/learning-available/', {
                headers: {
                    Authorization: `Token ${localStorage.getItem('key')}`,
                },
            });
        },
        getLearningLanguages() {
            return api.request.get('/api/languages/', {
                headers: {
                    Authorization: `Token ${localStorage.getItem('key')}`,
                },
            });
        },
        postLearningLanguage(languages) {
            const data = languages.map((language) => {
                return {
                    language: language.name,
                };
            });

            return api.request.post(
                '/api/languages/',
                    data,
                {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('key')}`,
                    },
                },
            );
        },
    };
};
