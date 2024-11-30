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
    filterOptions: {
        language: string;
        text: string;
        activity_status: string;
    };
}

export const useVocabularyStore = defineStore('vocabulary', {
    state: (): VocabularyStore => {
        return {
            count: 0,
            words: [],
            errors: { language: [], text: [] },
            filterOptions: { language: '', text: '', activity_status: '' },
        };
    },
    actions: {
        async getVocabulary() {
            try {
                const { data } = await api.vocabulary.getVocabulary();
                if (data && data.results) {
                    this.words = data.results as unknown as WordDto[];
                    this.count = data.count as unknown as number;
                }
            } catch (error) {
                console.error('Error fetching vocabulary:', error);
                this.words = [];
                this.count = 0;
            }
        },
        async createWord(word: WordDto) {
            try {
                await api.vocabulary.createWord(word);
            } catch (error) {
                if (isAxiosError(error)) {
                    this.errors = error.response?.data;
                }
                return error;
            }
        },
    },
});
