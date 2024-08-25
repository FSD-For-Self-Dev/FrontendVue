import type { LanguageDto } from '@/dto/languages.dto';
import type { AxiosPromise } from 'axios';

export type Languages = {
    getAvailableLanguages: () => AxiosPromise<Record<string, string>>;
    getLearningLanguages: () => AxiosPromise<Record<string, string>>;
    postLearningLanguage: (language: LanguageDto[]) => AxiosPromise<Record<string, string>>;
};