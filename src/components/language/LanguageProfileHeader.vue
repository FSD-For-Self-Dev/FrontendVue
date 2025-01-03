<script lang="ts">
import type { PropType } from 'vue';
import type { LearningLanguageDto } from '@/dto/languages.dto';
import IconButton from '../UI/button/IconButton.vue';
import LanguageTools from './LanguageTools.vue';
import { mapActions } from 'pinia';
import { useModalStore } from '@/store/modal';
import PopupTip from '../UI/tip/PopupTip.vue';

export default {
  components: { IconButton, LanguageTools, PopupTip },
  props: {
    language: {
      type: Object as PropType<LearningLanguageDto>,
      required: true,
    },
  },
  data() {
    return {
      showLanguageTools: false,
      showTip: false,
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
    ...mapActions(useModalStore, ['openModal']),
  },
};
</script>

<template>
  <div class="language-cover">
    <img class="cover-image" :src="language.cover" />
    <div class="language-cover-header">
      <div
        class="language-cover-header-title"
        @mouseover="showTip = true"
        @mouseleave="showTip = false"
      >
        <PopupTip
          :text="`${language.language.name} (${language.language.country})`"
          :icon-url="language.language.flag_icon"
          :showTip="showTip"
          :style="{
            'margin-bottom': 0,
            'margin-left': '5%',
            'margin-top': '50%',
            transform: 'translate(-50%, 50%)',
          }"
        />
        <img :src="language.language.flag_icon" alt="Icon" class="language-icon" />
        <p>{{ language.language.name_local }}</p>
      </div>
      <div class="language-cover-header-actions">
        <IconButton
          icon="ImageIcon"
          size="lg"
          variant="lucid"
          @click.stop="
            () => {
              openModal(
                'LanguageCoverChange',
                $t('title.languageCover'),
                'ImageIcon',
                'lg',
                language.language.isocode,
              );
            }
          "
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
        :handle-delete="
          () => {
            openModal(
              'DeleteLanguageForm',
              $t('title.deleteLanguage'),
              'InfoIcon',
              'lg',
              language.language.isocode,
            );
            showLanguageTools = false;
          }
        "
      />
    </div>
  </div>
</template>

<style lang="scss">
.language-cover {
  position: relative;
  display: flex;
  padding: 1.6rem;
  width: 100%;
  height: 29.4rem;
  border-radius: $radius-2xl;

  .cover-image {
    @include abs-center;
    display: flex;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: $radius-2xl;
  }

  &-header {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: max-content;

    &-title {
      position: relative;
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
