export interface WordDto {
    text: string;
    language: LanguageDto;
    translations: WordTranslationDto[];
    note: string;
    status: string;
}

export interface WordTranslationDto {
    text: string;
    language: string;
}

export interface LanguageDto {
    flag_icon: string;
    isocode: string;
    name: string;
    name_local: string;
}
