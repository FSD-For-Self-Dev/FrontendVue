<script lang="ts">
import { watchDebounced } from '@vueuse/core';
import Dropdown from '@/components/UI/dropdown/Dropdown.vue';
import NewWordButton from './NewWordButton.vue';
import { useLanguagesStore } from '@/store/languages';
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useVocabularyStore } from '@/store/vocabulary';
import Search from './Search.vue';

export default {
  components: {
    NewWordButton,
    Dropdown,
    Search,
  },
  props: {
    hideLanguageFilter: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(useLanguagesStore, ["learning_languages"]),
    ...mapState(useVocabularyStore, ["count"]),
    ...mapWritableState(useVocabularyStore, ["filterOptions"]),
  },
  setup(props, ctx) {
    const { filterOptions, getVocabulary } = useVocabularyStore();

    if (!props.hideLanguageFilter) {
      filterOptions.language = ''
    }
    filterOptions.activity_status = ''
    filterOptions.search = ''

    watchDebounced(
      () => filterOptions.search,
      () => {
        getVocabulary(true);
      },
      { debounce: 1000, maxWait: 5000 },
    );

    return {
      filterOptions,
      getVocabulary
    };
  },
  data() {
    return {
      statusWordOptions: [
        {
          value: 'I',
          label: this.$t('activityStatusPlural', { status: 'Inactive' }),
          icon_component: 'Inactive1StatusIcon',
          icon_component_custom_color: 'var:neutrals-600',
        },
        {
          value: 'A',
          label: this.$t('activityStatusPlural', { status: 'Active' }),
          icon_component: 'ActiveStatusIcon',
          icon_component_custom_color: 'var:primary-500',
        },
        {
          value: 'M',
          label: this.$t('activityStatusPlural', { status: 'Mastered' }),
          icon_component: 'MasteredStatusIcon',
          icon_component_custom_color: 'var:success-600',
        },
        {
          value: '',
          label: this.$t('filter.allWords'),
          icon_component: 'WordsIcon',
        },
      ],
    };
  },
  methods: {
    ...mapActions(useLanguagesStore, ['getLanguageObjectByIsocode']),
    ...mapActions(useVocabularyStore, ['getVocabulary']),
    handleFilter() {
      this.getVocabulary(true);
    },
    updateWords() {
      this.getVocabulary(true);
    },
  },
};
</script>

<template>
  <div class="vocabulary-tools" v-if="count > 0">
    <div class="vocabulary-tools--top">
      <div class="vocabulary-tools--top-left">
        <Dropdown
          :placeholder="$t('filter.allLanguages')"
          :default_item="{
            value: '',
            label: $t('filter.allLanguages'),
            icon_component: 'LanguageIcon',
            is_default_item: true,
          }"
          v-model="filterOptions.language"
          :items="
            learning_languages.map(({ language }) => {
              return {
                value: language.isocode,
                label: language.name_local,
                icon: language.flag_icon,
                is_default_item: false,
              };
            })
          "
          @update:model-value="handleFilter"
          v-if="!hideLanguageFilter"
          style="min-width: 18.6rem;"
        />
        <Dropdown
          :placeholder="$t('filter.allWords')"
          v-model="filterOptions.activity_status"
          :items="statusWordOptions"
          @update:model-value="handleFilter"
          style="min-width: 18.6rem;"
        />
      </div>
      <NewWordButton
        button-size="medium"
        :button-text="$t('buttons.addNewWord')"
        :chosenLanguage="filterOptions.language"
        @word-created="updateWords"
      />
    </div>
    <Search v-model="filterOptions.search" />
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
