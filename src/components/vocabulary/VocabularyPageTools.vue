<script lang="ts">
import Input from '@/components/UI/input/Input.vue';
import Dropdown from '@/components/UI/dropdown/Dropdown.vue';
import VocabularyButtonForModal from './VocabularyButtonForModal.vue';
import { useLanguagesStore } from '@/store/languages';
import { mapState, mapWritableState } from 'pinia';
import { useVocabularyStore } from '@/store/vocabulary';
import LanguageIcon from '@/assets/icons/languages/LanguageIcon.vue';
import WordsIcon from '@/assets/icons/vocabulary/WordsIcon.vue';
import MasteredStatusIcon from '@/assets/icons/vocabulary/status/MasteredStatusIcon.vue';
import Inactive1StatusIcon from '@/assets/icons/vocabulary/status/Inactive1StatusIcon.vue';
import ActiveStatusIcon from '@/assets/icons/vocabulary/status/ActiveStatusIcon.vue';


export default {
  computed: {
    ...mapState(useLanguagesStore, ["learning_languages"]),
    ...mapWritableState(useVocabularyStore, ["filterOptions"]),
  },
  data() {
    return {
      statusWordOptions: [
        {
          value: 'inactive',
          label: 'Неактивные',
          icon_component: 'inactive1-status-icon',
          icon_component_custom_color: '#737782',
        },
        {
          value: 'active',
          label: 'Активные',
          icon_component: 'active-status-icon',
          icon_component_custom_color: '#6C8DFF',
        },
        {
          value: 'mastered',
          label: 'Усвоенные',
          icon_component: 'mastered-status-icon',
          icon_component_custom_color: '#2FBC48',
        },
        {
          value: '',
          label: 'Все слова',
          icon_component: 'words-icon',
        },
      ]
    }
  },
  components: { VocabularyButtonForModal, Input, Dropdown, LanguageIcon, WordsIcon, Inactive1StatusIcon, ActiveStatusIcon, MasteredStatusIcon },
};
</script>

<template>
  <div class="vocabulary-tools">
    <div class="vocabulary-tools--top">
      <div class="vocabulary-tools--top-left">
        <Dropdown
          placeholder="Все языки"
          :default_item="{value: '', label: 'Все языки', icon_component: 'language-icon', is_default_item: true}"
          v-model="filterOptions.language" :items="learning_languages.map(({ language }) => {
          return {
            value: language.name,
            label: language.name_local,
            icon: language.flag_icon,
            is_default_item: false
          }
        })" />
        <Dropdown
          placeholder="Все слова"
          v-model="filterOptions.activity_status" :items="statusWordOptions"
        />
      </div>
      <VocabularyButtonForModal size-button="medium" text-button="Новое слово или фраза" />
    </div>
    <Input v-model="filterOptions.text" placeholder="Найти слово или фразу..." />
  </div>
</template>

<style lang="scss">
.vocabulary-tools {
  display: flex;
  flex-direction: column;
  gap: 4rem;

  &--top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-left {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
  }
}
</style>
