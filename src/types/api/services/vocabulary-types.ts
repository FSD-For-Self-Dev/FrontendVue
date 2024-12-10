import type { AxiosPromise } from "axios";
import type { NewWordDto } from "@/dto/vocabulary.dto";

export type Vocabulary = {
    getVocabulary: (locale?: string) => AxiosPromise<Record<string, string>>;
    createWord: (word: NewWordDto, locale?: string) => AxiosPromise<Record<string, string>>;
    getWordProfile: (wordSlug: string, locale?: string) => AxiosPromise<Record<string, string>>;
    patchWord: (wordSlug: string, wordUpdated: NewWordDto, locale?: string) => AxiosPromise<Record<string, string>>;
    deleteWord: (wordSlug: string) => AxiosPromise<Record<string, string>>;
    addWordToFavorite: (wordSlug: string) => AxiosPromise<Record<string, string>>;
    removeWordFromFavorite: (wordSlug: string) => AxiosPromise<Record<string, string>>;
}