import type { AxiosPromise } from "axios";
import type { WordDto } from "@/dto/vocabulary.dto";

export type Vocabulary = {
    getVocabulary: () => AxiosPromise<Record<string, string>>;
    createWord: (word: WordDto) => AxiosPromise<Record<string, string>>;
}