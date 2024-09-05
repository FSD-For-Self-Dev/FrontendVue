import api from '@/api';
import type { WordDto } from '@/dto/vocabulary.dto';
import { defineStore } from 'pinia';

export interface VocabularyStore {
    count: number;
    words: WordDto[];
}

export const useVocabularyStore = defineStore('vocabulary', {
    state: (): VocabularyStore => {
        return { count: 0, words: [] };
    },
    actions: {
        async getVocabulary() {
            const { data } = await api.vocabulary.getVocabulary();
            this.words = data.results as unknown as WordDto[];
            this.count = data.count as unknown as number;
        },
        async createWord(word: WordDto) {
            await api.vocabulary.createWord(word);
        }
    },
});
