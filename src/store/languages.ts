import { defineStore } from 'pinia';
import type { LanguageDto, LearningLanguageDto } from '@/dto/languages.dto';
import api from '@/api';

export interface ILanguagesState {
    available_languages: LanguageDto[];
    learning_languages: LearningLanguageDto[];
    count: number;
}

export const useLanguagesStore = defineStore('languages', {
    state: (): ILanguagesState => {
        return {
            available_languages: [],
            learning_languages: [],
            count: 0,
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
            console.log(res);
            this.available_languages = res.data
                .results as unknown as LanguageDto[];
        },
        async getLearningLanguages() {
            const res = await api.languages.getLearningLanguages();
            console.log(res);
            this.count = res.data.count as unknown as number; 
            this.learning_languages = res.data
                .results as unknown as LearningLanguageDto[];
        },
        async postLearningLanguage(languages: LanguageDto[]) {
            const res = await api.languages.postLearningLanguage(languages);
            console.log(res);
            this.count = res.data.count as unknown as number; 
            this.learning_languages = res.data
                .results as unknown as LearningLanguageDto[];
        }
    },
});
