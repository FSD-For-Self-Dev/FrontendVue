import type { AxiosPromise } from 'axios';
import type { WordDto } from '@/dto/vocabulary.dto';

export interface VocabularyQuery {
  search: string;
  activity_status: 'A' | 'I' | 'M' | '';
  language: string;
}

export type Vocabulary = {
  getVocabulary: (query?: VocabularyQuery) => AxiosPromise<Record<string, string>>;
  createWord: (word: WordDto) => AxiosPromise<Record<string, string>>;
};
