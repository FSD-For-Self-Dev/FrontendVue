/**
 * Represents a language data transfer object.
 * @interface
 * @property {string} id - The unique identifier for the language.
 * @property {string} slug - The slugified version of the language name.
 * @property {string} language - The name of the language.
 * @property {string} level - The proficiency level of the language.
 * @property {string} cover - image for language
 * */

export interface LearningLanguageDto {
    id: string;
    slug: string;
    language: LanguageDto;
    level: string;
    cover: string;
    words_count: number;
    inactive_words_count: number;
    active_words_count: number;
    mastered_words_count: number;
}


/**
 * Represents a language data transfer object.
 * @interface
 * @property {string} id - The unique identifier for the language.
 * @property {string} name - The name of the language in English.
 * @property {string} name_local - The name of the language in its native form.
 * @property {string} flag_icon - The URL or path to the flag icon representing the language.
 */

export interface LanguageDto {
    id: string;
    name: string;
    name_local: string;
    flag_icon: string;
}
