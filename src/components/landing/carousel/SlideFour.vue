<script lang="ts">
import { Slide } from 'vue3-carousel';
import LanguageCard from '@/components/language/LanguageCard.vue';
export default {
  components: { Slide, LanguageCard },
  data() {
    return {
      langEn: {
        id: 'a5a4d75b-c674-4396-9deb-9baa27eff885',
        slug: 'sasha-english',
        language: {
          name: 'English',
          name_local: 'English',
          isocode: 'en',
          flag_icon: 'https://linguista.online/media/languages/flag_icons/en.svg',
        },
        level: '',
        cover: 'https://linguista.online/media/languages/images/en-gb/en-GB.jpg',
        cover_id: '27b28e55-f451-44f3-9f71-bea09b46958e',
        cover_height: 2500,
        cover_width: 2000,
        words_count: 3,
        inactive_words_count: 3,
        active_words_count: 56,
        mastered_words_count: 1,
        last_10_words: [],
      },
      langIt: {
        id: '0e9a2524-a534-45c4-848c-e0cb957b9634',
        slug: 'sasha-italian',
        language: {
          name: 'Italian',
          name_local: 'Italiano',
          isocode: 'it',
          flag_icon: 'https://linguista.online/media/languages/flag_icons/it.svg',
        },
        level: '',
        cover: 'https://linguista.online/media/languages/images/it-it/it-IT.jpg',
        cover_id: '0b81b774-b6e1-443c-8527-e35268f7821d',
        cover_height: 1803,
        cover_width: 3205,
        words_count: 0,
        inactive_words_count: 10,
        active_words_count: 75,
        mastered_words_count: 2,
        last_10_words: [],
      },
      langFr: {
    "id": "e71bef58-b6c7-4b33-9b71-22201de1b550",
    "slug": "sasha-french",
    "language": {
        "name": "French",
        "name_local": "Français",
        "isocode": "fr",
        "flag_icon": "https://linguista.online/media/languages/flag_icons/fr.svg"
    },
    "level": "",
    "cover": "https://linguista.online/media/languages/images/fr-fr/fr-FR.jpg",
    "cover_id": "11af8754-f94e-4e04-a0de-43da76cf14ec",
    "cover_height": 2745,
    "cover_width": 4106,
    "words_count": 0,
    "inactive_words_count": 100,
    "active_words_count": 230,
    "mastered_words_count": 30,
    "last_10_words": []
}
    };
  },
};
</script>

<template>
  <Slide :class="$style.slide"
    ><div :class="$style.wrapper">
      <LanguageCard size="extra-small" :language="langEn" />
      <LanguageCard size="extra-small" :language="langIt" />
      <LanguageCard size="extra-small" :language="langFr" /></div
      </div
  ></Slide>
</template>

<style lang="scss" module>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  width: 34.5rem;
  height: 54.5rem;
}
</style>
