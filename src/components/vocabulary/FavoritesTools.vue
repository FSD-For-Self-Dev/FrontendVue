<script lang="ts">
import type { PropType } from 'vue';
import Dropdown from '@/components/UI/dropdown/Dropdown.vue';
import { mapState } from 'pinia';
import { useVocabularyStore } from '@/store/vocabulary';
import Search from '@/components/vocabulary/Search.vue';
import { useLanguagesStore } from '@/store/languages';

export default {
  components: { Dropdown, Search },
  data() {
    return {}
  },
  computed: {
    ...mapState(useLanguagesStore, ["learning_languages"]),
    ...mapState(useVocabularyStore, ["filterOptions"]),
  },
}
</script>

<template>
  <div class="vocabulary-tools">
    <div class="vocabulary-tools--top">
      <div class="vocabulary-tools--top-left">
        <Dropdown
          :placeholder="$t('filter.allLanguages')"
          :default_item="{value: '', label: $t('filter.allLanguages'), icon_component: 'LanguageIcon', is_default_item: true}"
          v-model="filterOptions.language"
          :items="learning_languages.map(({ language }) => {
            return {
              value: language.name,
              label: language.name_local,
              icon: language.flag_icon,
              is_default_item: false
            }
          })"
        />
      </div>
    </div>
    <Search v-model="filterOptions.search" />
  </div>
</template>

<style lang="scss"></style>
