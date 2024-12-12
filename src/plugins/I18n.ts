import { app } from './main-app';
import { createI18n } from 'vue-i18n'
import { en } from '@/internationalization/en';
import { ru } from '@/internationalization/ru'

const i18n = createI18n({
  locale: 'ru',
  fallbackLocale: 'ru',
  messages: {
    ru: ru,
    en: en,
  }
})

app.use(i18n);
