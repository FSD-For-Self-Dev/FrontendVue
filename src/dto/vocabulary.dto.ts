export interface WordDto {
    text: string;
    language: string;
    translations: WordTranslationDto[];
}

export interface WordTranslationDto {
    text: string;
    language: string;
}

