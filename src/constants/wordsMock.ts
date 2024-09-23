import type { IWordCard } from "@/types/components/word-card";
import type {IHeroWords, IItWords,ILanguageCards} from "@/types/components/ad-landing";
import type {IVocabularyWords} from "@/types/components/vocabulary";

export const words: IWordCard[] = [
  { text: "break a leg" },
  { text: "out of the blue" },
  { text: "stand up to" },
  { text: "get the message across" },
  { text: "kick the bucket" },
  { text: "over the moon" },
  { text: "kill the lights" },
  { text: "kingdom come" },
  { text: "break a leg" },
  { text: "out of the blue" },
  { text: "stand up to" },
  { text: "get the message across" },
  { text: "kick the bucket" },
  { text: "over the moon" },
  { text: "kill the lights" },
  { text: "kingdom come" },
];

export const heroWords: IHeroWords[] = [
  { text: "Примеры" },
  { text: "Коллекции" },
  { text: "Переводчик" },
  { text: "Упражнения" },
  { text: "Антонимы" },
  { text: "Определения" },
  { text: "Синонимы" },
  { text: "Переводы" },
  { text: "Ассоциации" },
  { text: "Мой словарь" },
  { text: "Избранное" }
];

export const itWords: IItWords[] =[
  { text: "Dunder method" },
  { text: "Linter" },
  { text: "Framework" },
  { text: "Agile" },
  { text: "Software" },
  { text: "Database" }
]


export const languageCards: ILanguageCards[] = [
  {
    languageName:"Español",
    backgroundImage:"src/assets/images/adpage-image6.png",
    activeStatus:56,
    inactiveStatus:3,
    markedStatus:1,
    class:"card-8"
  },
  {
    languageName:"Italiano",
    backgroundImage:"src/assets/images/adpage-image7.png",
    activeStatus:56,
    inactiveStatus:3,
    markedStatus:1,
    class:"card-9"
  },
  {
    languageName:"Deutsch",
    backgroundImage:"src/assets/images/adpage-image8.png",
    activeStatus:56,
    inactiveStatus:3,
    markedStatus:1,
    class:"card-10"
  },
]



export const vocabularyWords: IVocabularyWords[] = [
  {
    translation:"la casa de papel",
    language:"spain"
  },
  {
    translation:"money heist",
    language:"spain"
  },
  {
    translation:"ronaldo played for juventus 1 season",
    language:"italy"

  },
  {
    translation:"arsenal doesnt win ucl",
    language:"english"
  },
  {
    translation:"real madrid doesnt have trebl",
    language:"spain"
  },
  {
    translation:"messi best player in the world",
    language:"english"
  },
  {
    translation:"rodri deverse ballon dor",
    language:"spain"

  },
  {
    translation:"bayern won 6 trophies in 1 season ",
    language:"german"
  },
  {
    translation:"flash its best movie i have ever been watched",
    language:"usa"
  },


]