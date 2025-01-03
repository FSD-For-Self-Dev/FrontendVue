import type { AxiosPromise } from 'axios';
import type { NewWordDto } from '@/dto/vocabulary.dto';

export interface VocabularyQuery {
  search: string;
  activity_status: 'A' | 'I' | 'M' | '';
  language: string;
}

export type Vocabulary = {
    getVocabulary: (query?: VocabularyQuery) => AxiosPromise<Record<string, string>>;
    createWord: (word: NewWordDto) => AxiosPromise<Record<string, string>>;
    getWordProfile: (wordSlug: string) => AxiosPromise<Record<string, string>>;
    patchWord: (wordSlug: string, wordUpdated: NewWordDto) => AxiosPromise<Record<string, string>>;
    deleteWord: (wordSlug: string) => AxiosPromise<Record<string, string>>;
    addWordToFavorite: (wordSlug: string) => AxiosPromise<Record<string, string>>;
    removeWordFromFavorite: (wordSlug: string) => AxiosPromise<Record<string, string>>;
    getFavorite: (query?: VocabularyQuery) => AxiosPromise<Record<string, string>>;
}