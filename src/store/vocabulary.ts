import api from '@/api';
import type { WordDto, NewWordDto, WordProfileDto } from '@/dto/vocabulary.dto';
import type { VocabularyQuery } from '@/types/api/services';
import { isAxiosError } from 'axios';
import { defineStore } from 'pinia';

export interface VocabularyStore {
  count: number;
  vocabularyWords: WordDto[];
  filteredCount: number;
  filteredWords: WordDto[];
  wordProfile: WordProfileDto;
  errors: {
    language: string[];
    text: string[];
  };
  filterOptions: VocabularyQuery;
  isLoading: boolean;
}

export const useVocabularyStore = defineStore('vocabulary', {
  state: (): VocabularyStore => {
    return {
      count: 0,
      vocabularyWords: [],
      filteredCount: 0,
      filteredWords: [],
      wordProfile: {},
      errors: { language: [], text: [] },
      filterOptions: {
        language: '',
        search: '',
        activity_status: '',
      },
      isLoading: false,
    };
  },
  actions: {
    async getVocabulary(filtered: boolean = false) {
      this.isLoading = true;
      try {
        const { data } = await api.vocabulary.getVocabulary(this.filterOptions);
        if (data && data.results) {
          if (filtered) {
            this.filteredWords = data.results as unknown as WordDto[];
            this.filteredCount = data.count as unknown as number;
          } else {
            this.vocabularyWords = data.results as unknown as WordDto[];
            this.count = data.count as unknown as number;
          }
        }
      } catch (error) {
        console.error('Error fetching vocabulary:', error);
        this.vocabularyWords = [];
        this.count = 0;
      }
      this.isLoading = false;
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
      this.vocabularyWords = [];
    },
  },
});
