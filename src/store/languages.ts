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
    };
  },
  actions: {
    async getAvailableLanguages() {
      const res = await api.languages.getAvailableLanguages();
      this.available_languages = res.data.results as unknown as LanguageDto[];
    },
    async getLearningLanguages() {
      const res = await api.languages.getLearningLanguages();
      console.log(res.data.results[1]);
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
      } catch (error) {
        if (isAxiosError(error)) {
          return error;
        }
      }
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
    getLanguageObject(langName: string) {
      const lang_obj = this.learning_languages.filter((lang) => { return lang.language.name === langName})[0];
      if (lang_obj) {
        return lang_obj
      } else {
        return
      }
    },
    getLanguageObjectByIsocode(langCode: string | undefined) {
      if (!langCode) return;
      const lang_obj = this.learning_languages.filter((lang) => { return lang.language.isocode === langCode})[0];
      if (lang_obj) {
        return lang_obj
      } else {
        return
      };
    },
    clearDataLanguages() {
      this.available_languages = [];
      this.learning_languages = [];
      this.count = 0;
      this.global_languages = [];
    },
  },
});
