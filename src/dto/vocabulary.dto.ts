export interface WordDto {
    id: string;
    slug: string;
    language?: string;
    text: string;
    author: string;
    created: string;
    modified: string;
    tags: string[];
    favorite: boolean;
    is_problematic: boolean;
    activity_status: "Inactive" | "Active" | "Mastered";
    activity_progress: number;
    last_exercise_date?: string;
    types: string[];
    translations_count: number;
    translations: string[];
    image?: string;
  }

export interface WordTranslationDto {
    text: string;
    language: string;
}

