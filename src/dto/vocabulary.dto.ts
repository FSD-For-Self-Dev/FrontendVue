export type activityStatus = "Inactive" | "Active" | "Mastered";

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
  activity_status: activityStatus;
  activity_progress: number;
  last_exercise_date?: string;
  types: string[];
  translations_count: number;
  translations: string[];
  image?: string;
}

export interface NewWordDto {
  language?: string;
  text: string;
  types?: string[];
  tags?: WordTagDto[];
  translations?: WordTranslationDto[];
  image_associations?: ImageAssociationsDto[];
  note?: string;
}

export interface WordTranslationDto {
  id?: string;
  text: string;
  language: string;
}

export interface ImageAssociationsDto {
  id?: string;
  image?: string;
  image_url?: string;
}

export interface WordProfileDto {
  id?: string;
  language?: string;
  text?: string;
  slug?: string;
  author?: AuthorDto;
  favorite?: boolean;
  activity_status?: activityStatus;
  activity_progress?: number;
  types?: string[];
  tags?: WordTagDto[];
  translations?: WordTranslationDto[];
  image_associations?: ImageAssociationsDto[];
  note?: string;
  translations_count?: number;
  image_associations_count?: number;
  created?: string;
  modified?: string;
  is_problematic?: boolean;
  last_exercise_date?: string;
}

export interface WordTagDto {
  name?: string;
}

export interface AuthorDto {
  username?: string;
  first_name?: string;
  image?: string;
}
