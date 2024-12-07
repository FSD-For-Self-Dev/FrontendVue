import type { AxiosPromise } from "axios";
import type { NewWordDto } from "@/dto/vocabulary.dto";

export type Vocabulary = {
    getVocabulary: () => AxiosPromise<Record<string, string>>;
    createWord: (word: NewWordDto) => AxiosPromise<Record<string, string>>;
    patchWord: (wordSlug: string, wordUpdated: NewWordDto) => AxiosPromise<Record<string, string>>;
    deleteWord: (wordSlug: string) => AxiosPromise<Record<string, string>>;
    addWordToFavorite: (wordSlug: string) => AxiosPromise<Record<string, string>>;
    removeWordFromFavorite: (wordSlug: string) => AxiosPromise<Record<string, string>>;
    getWordProfile: (wordSlug: string) => AxiosPromise<Record<string, string>>;
}