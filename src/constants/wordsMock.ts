import type { IWordCard } from '@/types/components/word-card';
import type {
    IHeroWords,
    IItWords,
    ILanguageCards,
} from '@/types/components/ad-landing';
import type { IMenuItems } from '@/types/components/menu';

export const words: IWordCard[] = [
    { text: 'break a leg' },
    { text: 'out of the blue' },
    { text: 'stand up to' },
    { text: 'get the message across' },
    { text: 'kick the bucket' },
    { text: 'over the moon' },
    { text: 'kill the lights' },
    { text: 'kingdom come' },
    { text: 'break a leg' },
    { text: 'out of the blue' },
    { text: 'stand up to' },
    { text: 'get the message across' },
    { text: 'kick the bucket' },
    { text: 'over the moon' },
    { text: 'kill the lights' },
    { text: 'kingdom come' },
];

export const heroWords: IHeroWords[] = [
    { text: 'Примеры' },
    { text: 'Коллекции' },
    { text: 'Переводчик' },
    { text: 'Упражнения' },
    { text: 'Антонимы' },
    { text: 'Определения' },
    { text: 'Синонимы' },
    { text: 'Переводы' },
    { text: 'Ассоциации' },
    { text: 'Словарь' },
    { text: 'Избранное' },
];

export const itWords: IItWords[] = [
    { text: 'Dunder method' },
    { text: 'Linter' },
    { text: 'Framework' },
    { text: 'Agile' },
    { text: 'Software' },
    { text: 'Database' },
];

export const languageCards: ILanguageCards[] = [
    {
        languageName: 'Español',
        backgroundImage: 'src/assets/images/adpage-image6.png',
        activeStatus: 56,
        inactiveStatus: 3,
        markedStatus: 1,
        class: 'card-8',
    },
    {
        languageName: 'Italiano',
        backgroundImage: 'src/assets/images/adpage-image7.png',
        activeStatus: 56,
        inactiveStatus: 3,
        markedStatus: 1,
        class: 'card-9',
    },
    {
        languageName: 'Deutsch',
        backgroundImage: 'src/assets/images/adpage-image8.png',
        activeStatus: 56,
        inactiveStatus: 3,
        markedStatus: 1,
        class: 'card-10',
    },
];

export const menuItems: IMenuItems[] = [
    { name: 'Главная', link: '', icon: 'HomeIcon' },
    { name: 'Изучаемые языки', link: '', icon: 'TranslationIcon' },
    { name: 'Словарь', link: '', icon: 'VocabularyIcon' },
    { name: 'Коллекции', link: '', icon: 'CollectionsIcon' },
    { name: 'Избранное', link: '', icon: 'FavouriteIcon' },
    { name: 'Упражнения', link: '', icon: 'ExercisesIcon' },
    { name: 'О платформе', link: '', icon: 'InfoIcon' },
];
