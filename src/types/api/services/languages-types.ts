import type { LanguageDto } from '@/dto/languages.dto';
import type { AxiosPromise } from 'axios';

export type Languages = {
    getAvailableLanguages: (locale?: string) => AxiosPromise<Record<string, string>>;
    getLearningLanguages: (locale?: string) => AxiosPromise<Record<string, string>>; 
    getGlobalLanguages: (locale?: string) => AxiosPromise<Record<string, string>>;
    getAllLanguages: (locale?: string) => AxiosPromise<Record<string, string>>;
    postLearningLanguage: (language: LanguageDto[], locale?: string) => AxiosPromise<Record<string, string>>;
    deleteLanguage: (languageSlug: string, delete_words: boolean, locale?: string) => AxiosPromise<Record<string, string>>;
    getLanguageCovers: (languageSlug: string, locale?: string) => AxiosPromise<Record<string, string>>;
    setLanguageCover: (languageSlug: string, data: Object, locale?: string) => AxiosPromise<Record<string, string>>;
};
