import api from '@/api';
import type { WordDto, NewWordDto, WordProfileDto } from '@/dto/vocabulary.dto';
import { isAxiosError } from 'axios';
import { defineStore } from 'pinia';

export interface VocabularyStore {
  count: number;
  words: WordDto[];
  wordProfile: WordProfileDto;
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
      wordProfile: {},
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
    async createWord(word: NewWordDto) {
      try {
        await api.vocabulary.createWord(word);
      } catch (error) {
        if (isAxiosError(error)) {
          this.errors = error.response?.data;
        }
        return error;
      }
    },
    async patchWord(wordSlug: string, wordUpdated: NewWordDto) {
      try {
        await api.vocabulary.patchWord(wordSlug, wordUpdated);
      } catch (error) {
        if (isAxiosError(error)) {
          this.errors = error.response?.data;
        }
        return error;
      }
    },
    async getWordProfile(wordSlug: string) {
      try {
        const { data } = await api.vocabulary.getWordProfile(wordSlug);
        if (data) {
          this.wordProfile = data as WordProfileDto;
        }
      } catch (error) {
        if (isAxiosError(error)) {
          this.errors = error.response?.data;
        }
        return error;
      }
    },
    async deleteWord(wordSlug: string) {
      try {
        await api.vocabulary.deleteWord(wordSlug);
      } catch (error) {
        if (isAxiosError(error)) {
          this.errors = error.response?.data;
        }
        return error;
      }
    },
    async addWordToFavorite(wordSlug: string) {
      try {
        await api.vocabulary.addWordToFavorite(wordSlug);
      } catch (error) {
        if (isAxiosError(error)) {
          this.errors = error.response?.data;
        }
        return error;
      }
    },
    async removeWordFromFavorite(wordSlug: string) {
      try {
        await api.vocabulary.removeWordFromFavorite(wordSlug);
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
