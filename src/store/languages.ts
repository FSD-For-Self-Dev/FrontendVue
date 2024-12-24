import { defineStore } from 'pinia';
import type { LanguageCoverDto, LanguageDto, LearningLanguageDto } from '@/dto/languages.dto';
import api from '@/api';
import { isAxiosError } from 'axios';

export interface ILanguagesState {
  available_languages: LanguageDto[];
  learning_languages: LearningLanguageDto[];
  global_languages: LanguageDto[];
  all_languages: LanguageDto[];
  count: number;
  covers: LanguageCoverDto[];
  nextPageLink: {
    'covers': string;
  };
  isLoadingMore: boolean;
}

export const useLanguagesStore = defineStore('languages', {
  state: (): ILanguagesState => {
    return {
      available_languages: [],
      learning_languages: [],
      count: 0,
      global_languages: [],
      all_languages: [],
      covers: [],
      nextPageLink: {
        'covers': '',
      },
      isLoadingMore: false,
    };
  },
  actions: {
    async getAvailableLanguages() {
      const res = await api.languages.getAvailableLanguages();
      this.available_languages = res.data.results as unknown as LanguageDto[];
    },
    async getLearningLanguages() {
      const res = await api.languages.getLearningLanguages();
      this.count = res.data.count as unknown as number;
      this.learning_languages = res.data.results as unknown as LearningLanguageDto[];
    },
    async getGlobalLanguages() {
      const res = await api.languages.getGlobalLanguages();
      this.global_languages = res.data.results as unknown as LanguageDto[];
    },
    async getAllLanguages() {
      const res = await api.languages.getAllLanguages();
      this.all_languages = res.data.results as unknown as LanguageDto[];
    },
    async postLearningLanguage(languages: LanguageDto[]) {
      try {
        const res = await api.languages.postLearningLanguage(languages);
        this.count = res.data.count as unknown as number;
        this.learning_languages = res.data.results as unknown as LearningLanguageDto[];
        return res;
      } catch (error) {
        if (isAxiosError(error)) {
          return error;
        }
      }
    },
    async deleteLanguage(languageSlug: string, delete_words: boolean = false) {
      try {
        await api.languages.deleteLanguage(languageSlug, delete_words);
      } catch (error) {
        if (isAxiosError(error)) {
          return error;
        }
      }
    },
    async getLanguageCovers(languageSlug: string) {
      try {
        const res = await api.languages.getLanguageCovers(languageSlug);
        this.covers = res.data.results as unknown as LanguageCoverDto[];
        this.nextPageLink['covers'] = res.data.next as unknown as string;
      } catch (error) {
        if (isAxiosError(error)) {
          return error;
        }
      }
    },
    async getLanguageCoversNextPage() {
      this.isLoadingMore = true;
      try {
        const nextPage = this.nextPageLink['covers']
        const { data } = nextPage ? await api.request.get(nextPage) : {};
        if (data && data.results) {
          this.covers.push.apply(this.covers, data.results);
          this.nextPageLink['covers'] = data.next as unknown as string;
        }
      } catch (error) {
        console.error('Error fetching vocabulary:', error);
      }
      this.isLoadingMore = false;
    },
    async setLanguageCover(languageSlug: string, data: Object) {
      try {
        await api.languages.setLanguageCover(languageSlug, data);
      } catch (error) {
        if (isAxiosError(error)) {
          return error;
        }
      }
    },
    async deleteLanguageCover(languageSlug: string, data: Object) {
      try {
        await api.languages.deleteLanguageCover(languageSlug, data);
      } catch (error) {
        if (isAxiosError(error)) {
          return error;
        }
      }
    },
    getLearningLanguageByName(langName: string) {
      const lang_obj = this.learning_languages.filter((lang) => {
        return lang.language.name === langName
      })[0];
      return lang_obj ? lang_obj : undefined;
    },
    getLanguageByName(langName: string) {
      const lang_obj = this.global_languages.filter((lang) => {
        return lang.name === langName
      })[0];
      return lang_obj ? lang_obj : undefined;
    },
    getLearningLanguageByIsocode(langCode: string | undefined) {
      if (!langCode) return;
      const lang_obj = this.learning_languages.filter((lang) => {
        return lang.language.isocode === langCode
      })[0];
      return lang_obj ? lang_obj : undefined;
    },
    getLanguageByIsocode(langCode: string | undefined) {
      if (!langCode) return;
      const lang_obj = this.global_languages.filter((lang) => {
        return lang.isocode === langCode
      })[0];
      return lang_obj ? lang_obj : undefined;
    },
    getFlagIcon(neededLang: string | undefined) {
      return this.global_languages.find((lang) => lang.isocode === neededLang)?.flag_icon;
    },
    clearDataLanguages() {
      this.available_languages = [];
      this.learning_languages = [];
      this.count = 0;
      this.global_languages = [];
    },
  },
});
