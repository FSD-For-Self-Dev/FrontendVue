import api from '@/api';
import type { WordDto } from '@/dto/vocabulary.dto';
import { isAxiosError } from 'axios';
import { defineStore } from 'pinia';

export interface VocabularyStore {
    count: number;
    words: WordDto[];
    errors: {
        language: string[];
        text: string[];
    };
}

export const useVocabularyStore = defineStore('vocabulary', {
    state: (): VocabularyStore => {
        return { count: 0, words: [], errors: { language: [], text: [] } };
    },
    actions: {
        async getVocabulary() {
            const { data } = await api.vocabulary.getVocabulary();
            this.words = data.results as unknown as WordDto[];
            this.count = data.count as unknown as number;
        },
        async createWord(word: WordDto) {
            try {
                await api.vocabulary.createWord(word);
            } catch (error) {
                if(isAxiosError(error)) {
                    this.errors = error.response?.data;
                }
                return error;
            }
        },
    },
});
