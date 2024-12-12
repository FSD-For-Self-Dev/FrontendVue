<script lang="ts">
import type { PropType } from 'vue';
import type { LearningLanguageDto } from '@/dto/languages.dto';
import IconButton from '../UI/button/IconButton.vue';
import LanguageTools from './LanguageTools.vue';
import Modal from '../UI/modal/Modal.vue';

export default {
  components: { IconButton, LanguageTools, Modal },
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
    }
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
  <div class="language-cover">
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
  <Modal
    size="lg"
    v-if="showDeleteLanguageModal"
    :close-modal="() => (showDeleteLanguageModal = false)"
    :title-modal="$t('title.deleteLanguage')"
    icon="InfoIcon"
    modalContent="DeleteLanguageForm"
    :objectLookup="language.language.name"
  />
  <Modal
    size="lg"
    v-if="showLanguageCoversModal"
    :close-modal="() => (showLanguageCoversModal = false)"
    :title-modal="$t('title.languageCover')"
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
</style>
