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
  favoriteCount: number;
  favoriteWords: WordDto[];
  nextPageLink: {
    vocabulary: {
      constant: string;
      variable: string;
    };
    favorites: {
      constant: string;
      variable: string;
    };
    languageProfile: {
      constant: string;
      variable: string;
    };
  };
  pageKey: string;
  errors: {
    language: string[];
    text: string[];
  };
  filterOptions: VocabularyQuery;
  isLoading: boolean;
  isLoadingMore: boolean;
}

export const useVocabularyStore = defineStore('vocabulary', {
  state: (): VocabularyStore => {
    return {
      count: 0,
      vocabularyWords: [],
      filteredCount: 0,
      filteredWords: [],
      wordProfile: {},
      favoriteCount: 0,
      favoriteWords: [],
      errors: { language: [], text: [] },
      filterOptions: {
        language: '',
        search: '',
        activity_status: '',
      },
      nextPageLink: {
        vocabulary: {
          constant: '',
          variable: '',
        },
        favorites: {
          constant: '',
          variable: '',
        },
        languageProfile: {
          constant: '',
          variable: '',
        },
      },
      pageKey: 'vocabulary',
      isLoading: false,
      isLoadingMore: false,
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
          this.nextPageLink[this.pageKey as keyof typeof this.nextPageLink]['constant'] =
            data.next as unknown as string;
          this.nextPageLink[this.pageKey as keyof typeof this.nextPageLink]['variable'] =
            this.nextPageLink[this.pageKey as keyof typeof this.nextPageLink]['constant'];
        }
      } catch (error) {
        console.error('Error fetching vocabulary:', error);
        this.vocabularyWords = [];
        this.count = 0;
      }
      this.isLoading = false;
    },
    async getVocabularyNextPage(filtered: boolean = false) {
      this.isLoadingMore = true;
      try {
        const nextPage =
          this.nextPageLink[this.pageKey as keyof typeof this.nextPageLink]['variable'];
        const { data } = nextPage ? await api.request.get(nextPage) : {};
        if (data && data.results) {
          if (filtered) {
            this.filteredWords = this.filteredWords.concat(data.results);
          } else {
            this.vocabularyWords = this.vocabularyWords.concat(data.results);
          }
          this.nextPageLink[this.pageKey as keyof typeof this.nextPageLink]['variable'] =
            data.next as unknown as string;
        }
      } catch (error) {
        console.error('Error fetching vocabulary:', error);
      }
      this.isLoadingMore = false;
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
    async getFavoriteWords(filtered: boolean = false) {
      this.isLoading = true;
      try {
        const { data } = await api.vocabulary.getFavorite(this.filterOptions);
        if (data && data.results) {
          if (filtered) {
            this.filteredWords = data.results as unknown as WordDto[];
            this.filteredCount = data.count as unknown as number;
          } else {
            this.favoriteWords = data.results as unknown as WordDto[];
            this.favoriteCount = data.count as unknown as number;
          }
          this.nextPageLink['favorites']['constant'] = data.next as unknown as string;
          this.nextPageLink['favorites']['variable'] =
            this.nextPageLink['favorites']['constant'];
        }
      } catch (error) {
        console.error('Error fetching vocabulary:', error);
        this.favoriteWords = [];
        this.favoriteCount = 0;
      }
      this.isLoading = false;
    },
    async updateWords(filtered: boolean = false) {
      const mapWords = {
        vocabulary: this.getVocabulary,
        languageProfile: this.getVocabulary,
        favorites: this.getFavoriteWords,
      };
      return mapWords[this.pageKey as keyof typeof mapWords](filtered);
    },
    updateFavoriteWords(value: boolean, wordId: string): boolean {
      if (value) {
        const word = this.vocabularyWords.filter((word) => {
          return word.id === wordId;
        })[0];
        this.favoriteWords.unshift(word);
        this.favoriteCount += 1;
      } else {
        this.favoriteWords = this.favoriteWords.filter((word) => {
          return word.id !== wordId;
        });
        this.favoriteCount -= 1;
      }
      const vocabularyWord = this.vocabularyWords.find((word) => {
        return word.id === wordId;
      });
      if (vocabularyWord) {
        vocabularyWord.favorite = value;
      }
      return value;
    },
    resetFilteredWords() {
      this.isLoading = true;
      const mapWords = {
        vocabulary: this.vocabularyWords,
        languageProfile: this.vocabularyWords.filter((word) => {
          return word.language === this.filterOptions.language
        }),
        favorites: this.favoriteWords,
      };
      const mapCounter = {
        vocabulary: this.count,
        languageProfile: this.count,
        favorites: this.favoriteCount,
      };
      this.filteredWords = mapWords[this.pageKey as keyof typeof mapWords];
      this.filteredCount = mapCounter[this.pageKey as keyof typeof mapCounter];
      this.isLoading = false;
    },
    resetPage() {
      this.nextPageLink[this.pageKey as keyof typeof this.nextPageLink]['variable'] =
        this.nextPageLink[this.pageKey as keyof typeof this.nextPageLink]['constant'];
    },
    clearDataVocabulary() {
      this.vocabularyWords = [];
    },
  },
});
