import { defineStore } from 'pinia';
import type { LanguageDto, LearningLanguageDto } from '@/dto/languages.dto';
import api from '@/api';
import { isAxiosError } from 'axios';

export interface ILanguagesState {
    available_languages: LanguageDto[];
    learning_languages: LearningLanguageDto[];
    global_languages: LanguageDto[];
    count: number;
}

export const useLanguagesStore = defineStore('languages', {
    state: (): ILanguagesState => {
        return {
            available_languages: [],
            learning_languages: [],
            count: 0,
            global_languages: [],
        };
    },
    getters: {
        getAvailableWithOutLearningLanguages(state: ILanguagesState) {
            return state.available_languages.filter(
                (lang) =>
                    !state.learning_languages.some(
                        (learningLang) => learningLang.id === lang.id,
                    ),
            );
        },
    },
    actions: {
        async getAvailableLanguages() {
            const res = await api.languages.getAvailableLanguages();
            this.available_languages = res.data
                .results as unknown as LanguageDto[];
        },
        async getLearningLanguages() {
            const res = await api.languages.getLearningLanguages();
            this.count = res.data.count as unknown as number;
            this.learning_languages = res.data
                .results as unknown as LearningLanguageDto[];
        },
        async getGlobalLanguages() {
            const res = await api.languages.getGlobalLanguages();
            this.global_languages = res.data
                .results as unknown as LanguageDto[];
        },
        async postLearningLanguage(languages: LanguageDto[]) {
            try {
                const res = await api.languages.postLearningLanguage(languages);
                this.count = res.data.count as unknown as number;
                this.learning_languages = res.data
                    .results as unknown as LearningLanguageDto[];
                return res;
            } catch (error) {
                if (isAxiosError(error)) {
                    return error
                }
            }
        },
    },
});
