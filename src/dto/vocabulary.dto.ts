export interface WordDto {
    text: string;
    language: string;
    translations: WordTranslationDto[];
    note: string;
    "activity_status": string;
}

export interface WordTranslationDto {
    text: string;
    language: string;
}
