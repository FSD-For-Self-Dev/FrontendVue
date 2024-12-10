import api from '@/api';
import type { WordDto } from '@/dto/vocabulary.dto';
import type { VocabularyQuery } from '@/types/api/services';
import { isAxiosError } from 'axios';
import { defineStore } from 'pinia';

export interface VocabularyStore {
  count: number;
  words: WordDto[];
  en_words: WordDto[];
  errors: {
    language: string[];
    text: string[];
  };
  filterOptions: VocabularyQuery;
}

export const useVocabularyStore = defineStore('vocabulary', {
  state: (): VocabularyStore => {
    return {
      count: 0,
      words: [],
      errors: { language: [], text: [] },
      filterOptions: {
        language: '',
        search: '',
        activity_status: '',
      },
      en_words: []
    };
  },
  actions: {
    async getVocabulary() {
      try {
        const { data } = await api.vocabulary.getVocabulary(this.filterOptions);
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
    clearDataVocabulary() {
      this.words = [];
    },
  },
});
