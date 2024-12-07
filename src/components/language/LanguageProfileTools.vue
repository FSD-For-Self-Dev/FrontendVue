<script lang="ts">
import type { PropType } from 'vue';
import Input from '@/components/UI/input/Input.vue';
import Dropdown from '@/components/UI/dropdown/Dropdown.vue';
import NewWordButton from '@/components/vocabulary/NewWordButton.vue';
import { mapState } from 'pinia';
import { useVocabularyStore } from '@/store/vocabulary';
import type { LearningLanguageDto } from '@/dto/languages.dto';
import Search from '@/components/vocabulary/Search.vue';
import IconButton from '../UI/button/IconButton.vue';
import LanguageTools from './LanguageTools.vue';
import Modal from '../UI/modal/Modal.vue';

export default {
  components: { NewWordButton, Input, Dropdown, Search, IconButton, LanguageTools, Modal },
  props: {
    language: {
      type: Object as PropType<LearningLanguageDto>,
      required: true,
    },
  },
  data() {
    return {
      showLanguageTools: false,
      showLanguageCoversModal: false,
      showDeleteLanguageModal: false,
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
    }
  },
  computed: {
    ...mapState(useVocabularyStore, ['filterOptions']),
  },
  methods: {
    handleDelete() {
      this.showLanguageTools = false;
      this.showDeleteLanguageModal = true;
      return;
    },
  }
};
</script>

<template>
  <div
    class="language-cover"
  >
    <img class="cover-image" :src="language.cover" />
    <div class="language-cover-header">
      <div class="language-cover-header-title">
        <img :src="language.language.flag_icon" alt="Icon" class="language-icon" />
        <p>{{ language.language.name_local }}</p>
      </div>
      <div class="language-cover-header-actions">
        <IconButton
            icon="ImageIcon"
            size="lg"
            variant="lucid"
            @click.stop="() => (showLanguageCoversModal = !showLanguageCoversModal)"
        />
        <IconButton
          icon="MoreIcon"
          size="lg"
          variant="lucid"
          @click.stop="() => (showLanguageTools = !showLanguageTools)"
          :active="showLanguageTools"
        />
      </div>
      <LanguageTools
        :handleClose="() => (showLanguageTools = false)"
        v-if="showLanguageTools"
        :handle-delete="handleDelete"
      />
    </div>
  </div>
  <div class="language-words-tools" v-if="language.words_count > 0">
    <div class="language-words-tools--top">
      <div class="language-words-tools--top-left">
        <Dropdown
          placeholder="Все слова"
          v-model="filterOptions.activity_status" :items="statusWordOptions"
        />
      </div>
      <NewWordButton
        button-size="medium"
        button-text="Новое слово или фраза"
        :chosenLanguage="filterOptions.language"
      />
    </div>
    <Search v-model="filterOptions.text" />
  </div>
  <Modal
    size="lg"
    v-if="showDeleteLanguageModal"
    :close-modal="() => (showDeleteLanguageModal = false)"
    title-modal="Вы уверены, что хотите удалить язык из изучаемых?"
    icon="InfoIcon"
    modalContent="DeleteLanguageForm"
    :objectLookup="language.language.name"
  />
  <Modal
    size="lg"
    v-if="showLanguageCoversModal"
    :close-modal="() => (showLanguageCoversModal = false)"
    title-modal="Сменить обложку"
    icon="ImageIcon"
    modalContent="LanguageCoverChange"
    :objectLookup="language.language.name"
  />
</template>

<style lang="scss">
.language-cover {
  position: relative;
  display: flex;
  padding: 1.6rem;
  width: 100%;
  height: 29.4rem;
  border-radius: $radius-2xl;
  overflow: hidden;

  .cover-image {
    @include abs-center;
    display: flex;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &-header {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: max-content;

    &-title {
      display: flex;
      align-items: center;
      gap: 1.2rem;
      @include subheading-3;
      background-color: $white-lucid;
      height: max-content;
      width: max-content;
      border-radius: $radius-2xl;
      padding: 1.6rem 2rem 1.6rem 1.6rem;

      .language-icon {
        width: 2.4rem;
        height: 2.4rem;
      }
    }

    &-actions {
      display: flex;
      flex-direction: row;
      gap: 1.2rem;
      height: max-content;
    }
  }
}

.language-words-tools {
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
