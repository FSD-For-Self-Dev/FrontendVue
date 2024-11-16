<script lang="ts">
import Input from '@/components/UI/input/Input.vue';
import Dropdown from '@/components/UI/dropdown/Dropdown.vue';
import VocabularyButtonForModal from './VocabularyButtonForModal.vue';
import { useLanguagesStore } from '@/store/languages';
import { mapState, mapWritableState } from 'pinia';
import { useVocabularyStore } from '@/store/vocabulary';


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
          label: 'Неактивное',
        },
        {
          value: 'active',
          label: 'Активное',
        },
        {
          value: 'mastered',
          label: 'Изучено',
        }
      ]
    }
  },
  components: { VocabularyButtonForModal, Input, Dropdown },
}
</script>

<template>
  <div class="vocabulary-tools">
    <div class="vocabulary-tools--top">
      <div class="vocabulary-tools--top-left">
        <Dropdown placeholder="Язык слов" v-model="filterOptions.language" :items="learning_languages.map(({ language }) => {
          return {
            value: language.name,
            label: language.name_local,
            icon: language.flag_icon
          }
        })" />
        <Dropdown placeholder="Статус слов" v-model="filterOptions.status" :items="statusWordOptions" />
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
      gap: 1rem;
    }
  }
}
</style>