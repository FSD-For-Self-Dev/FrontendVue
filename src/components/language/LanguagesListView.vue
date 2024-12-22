<script lang="ts">
import { mapState } from 'pinia';
import { useLanguagesStore } from '@/store/languages';
import AddLanguagesButton from './AddLanguagesButton.vue';
import LanguageCard from './LanguageCard.vue';
import Button from '../UI/button/Button.vue';

export default {
  components: { AddLanguagesButton, LanguageCard, Button },
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    ...mapState(useLanguagesStore, ['learning_languages', 'count']),
    emptyImage(): string {
      return new URL(`/src/assets/images/emptyImage.svg`, import.meta.url).href;
    },
  },
  methods: {
    handleToggleModal(state: boolean) {
      this.showModal = state;
    },
  },
};
</script>

<template>
  <div class="learning-languages" v-if="count > 0">
    <div class="learning-languages--header">
      <h2 class="learning-languages--header--title">
        <svg-icon name="LanguageIcon" size="lg" style="stroke-width: 0.2" />
        {{ $t('title.learningLanguages') }}
        <span class="counter">{{ count }}</span>
      </h2>
      <AddLanguagesButton
        button-size="medium"
        :button-text="$t('buttons.addLearningLanguage')"
      />
    </div>
    <div class="learning-languages--content" v-if="count > 0">
      <LanguageCard
        :language="language"
        v-for="language in learning_languages"
        size="large"
      />
    </div>
  </div>
  <div class="learning-languages--empty" v-else>
    <img :src="emptyImage" alt="empty" class="img" width="240" height="180" />
    <div class="learning-languages--empty-tip">
      <p class="learning-languages--empty-tip-title">
        {{ $t('emptyTip.learningLanguagesTitle') }}
      </p>
      <p class="learning-languages--empty-tip-text">
        {{ $t('emptyTip.learningLanguagesText') }}
      </p>
    </div>
    <div class="learning-languages--empty-buttons">
      <Button
        :text="$t('buttons.toVocabulary')"
        variant="secondary"
        @click="$router.push('vocabulary')"
        icon="ArrowForwardLineIcon"
      />
      <AddLanguagesButton
        button-size="medium"
        :button-text="$t('buttons.addLearningLanguage')"
        style="min-width: 22.5rem;"
      />
    </div>
  </div>
</template>

<style lang="scss">
.learning-languages {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  &--header {
    display: flex;
    justify-content: space-between;
    width: 100%;

    &--title {
      @include subheading-3;
      color: $neutrals-900;
      display: flex;
      gap: 0.8rem;
      align-items: center;

      .counter {
        color: $neutrals-600;
      }
    }
  }

  &--content {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }

  &--empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4rem;

    &-tip {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      text-align: center;

      &-title {
        @include subheading-2;
      }

      &-text {
        @include text-2;
        max-width: 60rem;
      }
    }

    &-buttons {
      display: flex;
      gap: 2rem;
      justify-content: center;
    }
  }
}
</style>
