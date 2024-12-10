<script lang="ts">
import Input from '@/components/UI/input/Input.vue';
import Dropdown from '@/components/UI/dropdown/Dropdown.vue';
import NewWordButton from './NewWordButton.vue';
import { useLanguagesStore } from '@/store/languages';
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useVocabularyStore } from '@/store/vocabulary';
import Search from './Search.vue';

export default {
  components: { NewWordButton, Input, Dropdown, Search },
  computed: {
    ...mapState(useLanguagesStore, ['learning_languages']),
    ...mapWritableState(useVocabularyStore, ['filterOptions']),
  },
  methods: {
    ...mapActions(useVocabularyStore, ['getVocabulary']),
  },
  data() {
    return {
      statusWordOptions: [
        {
          value: 'inactive',
          label: 'Неактивные',
          icon_component: 'Inactive1StatusIcon',
          icon_component_custom_color: 'var:neutrals-600',
        },
        {
          value: 'active',
          label: 'Активные',
          icon_component: 'ActiveStatusIcon',
          icon_component_custom_color: 'var:primary-500',
        },
        {
          value: 'mastered',
          label: 'Усвоенные',
          icon_component: 'MasteredStatusIcon',
          icon_component_custom_color: 'var:success-600',
        },
        {
          value: '',
          label: 'Все слова',
          icon_component: 'WordsIcon',
        },
      ],
    };
  },
};
</script>

<template>
  <div class="vocabulary-tools">
    <div class="vocabulary-tools--top">
      <div class="vocabulary-tools--top-left">
        <Dropdown
          placeholder="Все языки"
          :default_item="{
            value: '',
            label: 'Все языки',
            icon_component: 'LanguageIcon',
            is_default_item: true,
          }"
          v-model="filterOptions.language"
          :items="
            learning_languages.map(({ language }) => {
              return {
                value: language.name,
                label: language.name_local,
                icon: language.flag_icon,
                is_default_item: false,
              };
            })
          "
        />
        <Dropdown
          placeholder="Все слова"
          v-model="filterOptions.activity_status"
          :items="statusWordOptions"
        />
      </div>
      <NewWordButton button-size="medium" button-text="Новое слово или фраза" />
    </div>
    <Input
      v-model="filterOptions.search"
      style="width: 100%; display: flex"
      placeholder="Найти слово или фразу..."
      icon="SearchIcon"
      @update:model-value="getVocabulary"
    />
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
