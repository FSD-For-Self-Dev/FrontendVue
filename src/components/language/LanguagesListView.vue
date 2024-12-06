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
  <div class="learning-languages">
    <div class="learning-languages--header">
      <h2 class="learning-languages--header--title" v-if="count > 0">
        <svg-icon name="LanguageIcon" size="lg" style="stroke-width: 0.2" />
        Изучаемые языки
        <span class="counter">{{ count }}</span>
      </h2>
      <h2 class="learning-languages--header--title" v-else>
        <svg-icon name="LanguageIcon" size="lg" style="stroke-width: 0.2" />
        Нет изучаемых языков
      </h2>
      <AddLanguagesButton button-size="medium" button-text="Добавить язык" />
    </div>
    <div class="learning-languages--content" v-if="count > 0">
      <LanguageCard
        :language="language"
        v-for="language in learning_languages"
        size="large"
      />
    </div>
    <div class="learning-languages--empty" v-else>
      <img :src="emptyImage" alt="empty" class="img" width="240" height="180" />
      <div class="learning-languages--empty-tip">
        <p class="learning-languages--empty-tip-title">Здесь будут ваши изучаемые языки</p>
        <p class="learning-languages--empty-tip-text">
          Начните добавлять слова в свой словарь, и ваши языки отобразятся здесь
          автоматически, или добавьте изучаемые языки вручную
        </p>
      </div>
      <Button text="Перейти в словарь" variant="secondary" @click="$router.push('vocabulary')" />
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
      }
    }
  }
}
</style>
