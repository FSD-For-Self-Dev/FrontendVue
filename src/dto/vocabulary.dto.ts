export interface WordDto {
    text: string;
    language: string;
    translations: WordTranslationDto[];
    note: string;
    status: string;
}

export interface WordTranslationDto {
    text: string;
    language: string;
}