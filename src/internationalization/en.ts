import { maxProgressInactiveStatus } from "./constants";

export const en = {
  auth: {
    signUp: 'Sign up',
    logIn: 'Log in',
    logOut: 'Log out',
    signUpConfirm: 'Create account',
    noAccount: 'Have no account?',
    alreadyHaveAccount: "Already have account?",
    forgotPassword: 'Forgot your password?',
    rememberMe: 'Remember me',
    welcome: 'Welcome!',
    welcomeAgain: 'Nice to see you again!',
    username: 'Username',
    email: 'Email',
    firstName: 'First name',
    password: 'Password',
    passwordConfirm: 'Password confirmation',
    deleteAccount: 'Delete account',
  },
  user: {
    firstName: 'First name',
    username: `Username (displayed as {'@'}your_username)`,
    nativeLanguage: 'Native language',
    nativeLanguage1: 'Native language 1',
    nativeLanguage2: 'Native language 2',
    addNativeLanguage: 'Add native language',
  },
  settings: {
    interfaceLanguage: 'Default interface language',
  },
  title: {
    vocabulary: 'Vocabulary',
    words: 'Words',
    wordProfile: 'Word profile',
    newWord: 'New word or phrase',
    wordCustomization: 'Customize the word to remember it better',
    editWord: 'Edit word',
    deleteWord: 'Do you want to remove word from your vocabulary?',
    learningLanguages: 'Learning languages',
    nativeLanguages: 'Native languages',
    languages: 'Languages',
    languageCover: 'Change the cover',
    deleteLanguage: 'Do you want to remove language from learning ones?',
    newLearningLanguages: 'Add learning languages',
    settings: 'Settings',
    profile: 'Profile',
    personalization: 'Personalization',
    favorites: 'Favorites',
    deleteAccountConfirm: 'Do you want to delete your account?',
    note: 'Note',
    translations: 'Translations',
    associations: 'Associations',
    status: 'Current status',
  },
  navigation: {
    homePage: 'Home',
    vocabulary: 'Vocabulary',
    learningLanguages: 'Learning languages',
    collections: 'Collections',
    exercises: 'Exercises',
    favorites: 'Favorites',
    aboutUs: 'About us',
  },
  search: {
    search: 'Search...',
    language: 'Search for language...',
    vocabulary: 'Search for word or phrase...',
  },
  emptyTip: {
    vocabularyTitle: 'No words or phrases in your vocabulary yet',
    vocabularyText: 'Write down the words that are relevant to you, which you already know or want to remember, for any language you are learning',
    vocabularyByLanguage: 'No words or phrases with this language yet',
    learningLanguagesTitle: 'No learning languages here yet',
    learningLanguagesText: 'Start adding words to your vocabulary and your languages will be displayed here automatically, or add the languages you are learning manually',
    translationLanguages: 'No native or other learning languages were found',
    translations: 'No translations yet',
    associations: 'No associations yet',
    filteredWordsEmpty: 'No suitable words were found',
    favoriteWordsTitle: 'No favorite words yet',
    favoriteWordsText: 'Add words to your favorites and they will be displayed here',
  },
  tip: {
    fileUpload1: 'Drag and drop the file here or',
    fileUpload2: 'select it from your files',
    fileUpload3: 'Image file (jpg, jpeg, png, gif)',
    translations: 'Translate the word or phrase into your native language or another language you are learning',
    associations: 'Add your own associations with this word',
    dangerAction: 'This action cannot be reverted',
    deleteProcceed: 'Deletion...',
    saveProcceed: 'Saving...',
    deleteLanguageWords: 'The words of this language will be deleted from your vocabulary',
  },
  buttons: {
    addNewWord: 'New word or phrase',
    addFirstWords: 'Add first words',
    addLearningLanguage: 'Add language',
    addFirstLanguage: 'Add first language',
    addTranslation: 'Add translation',
    addAssociation: 'Add association',
    add: 'Add',
    cancel: 'Cancel',
    save: 'Save',
    reset: 'Reset',
    confirm: 'Confirm',
    previous: 'Previous',
    next: 'Next',
    toVocabulary: 'Go to vocabulary',
    toHome: 'Home page',
    uploadImage: 'Upload image',
  },
  action: {
    delete: 'Delete',
    edit: 'Edit',
    deleteLanguageWords: 'Delete words',
  },
  input: {
    translation: 'Enter a translation...',
    translationLanguage: 'Translation language',
    word: 'Enter a word or phrase...',
    learningLanguage: 'Learning language',
    note: 'Enter a useful note, for example: Not used with verbs of feelings...',
    interfaceLanguage: 'Interface language',
  },
  addNew: {
    word: 'Word or phrase',
    severalWords: 'Several words in a row',
    learningLanguage: 'Learning language',
  },
  infoMessage: {
    newWordsCreated: 'Added {n} word to vocabulary | Added {n} words to vocabulary',
    newLanguagesAdded: 'Added {n} learning language | Added {n} learning languages',
    changesSaved: 'Changes saved',
    newWordCreated: 'New word was added to your vocabulary',
    deleteAccount: 'Account is deleted',
    deleteLanguage: 'Language was removed from your learning languages',
    deleteWord: 'Word was removed from your vocabulary',
    wordCopied: 'Word is copied',
    wordRemovedFromFavorite: 'Word was removed from your favorites',
    wordAddedToFavorite: 'Word was added to your favorites',
  },
  errorMessage: {
    wordAlreadyExist: 'Word already exist in your vocabulary',
    languagesAmountLimit: 'Learning languages amount limit exceeded',
    wordAlreadyFavorite: 'Word is already in your favorites',
    wordAlreadyNotFavorite: 'Word is no longer in your favorites',
  },
  error: {
    notFoundTitle: 'The page was not found',
    notFoundSubTitle: 'You might be interested in',
    serverErrorTitle: 'Server error',
    serverErrorSubTitle: 'We are already working on the problem, retry later',
  },
  counter: {
    languages: 'No languages available | {n} language available | {n} languages available',
    words: 'No words found | Found {n} word | Found {n} words'
  },
  filter: {
    allWords: 'All words',
    allLanguages: 'All languages',
  },
  footer: {
    rights: 'All rights reserved.',
    aboutUs: 'About us',
    contacts: 'Contacts',
    reviews: 'Reviews',
    terms: 'Terms and Conditions',
    privacyPolicy: 'Privacy policy',
    personalDataConsent: 'Personal data consent',
  },
  activityStatus: ({ named }) => {
    return named('status')
  },
  activityStatusPlural: ({ named }) => {
    return named('status')
  },
  activityStatusTip: ({ named }) => {
    if (named('status') === 'Inactive') {
      return (
        `Inactive words are words that you added recently or ` +
        `haven't repeated in exercises or used in chat rooms for a certain time. \n` +
        `Repeat this word in exercises or use it in chats ` +
        `${maxProgressInactiveStatus - named('progress')} more times to get the Active status.`
      );
    } else if (named('status') === 'Active') {
      return 'Активное';
    } else if (named('status') === 'Mastered') {
      return 'Усвоенное';
    }
    return '';
  },
}