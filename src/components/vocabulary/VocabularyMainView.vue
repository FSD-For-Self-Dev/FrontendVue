<script lang="ts">
import { mapState } from 'pinia';
import { useLanguagesStore } from '@/store/languages';
import { useVocabularyStore } from '@/store/vocabulary';
import NewWordButton from './NewWordButton.vue';
import WordCard from './WordCard.vue';

export default {
  components: { NewWordButton, WordCard },
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    ...mapState(useVocabularyStore, ['count', 'words']),
    ...mapState(useLanguagesStore, ['learning_languages']),
  },
  methods: {
    handleWheel(event: WheelEvent) {
      const container = event.currentTarget as HTMLElement;
      event.preventDefault();
      container.scrollLeft += event.deltaY;
    },
  },
};
</script>

<template>
  <button class="vocabulary-main-view" @click="$router.push('vocabulary')">
    <div class="vocabulary-main-view--header">
      <h2 class="vocabulary-main-view--title">
        <svg-icon name="VocabularyIcon" size="lg" style="stroke-width: 0.2" />
        {{ $t('title.vocabulary') }}
        <span class="counter">{{ count }}</span>
      </h2>
      <svg-icon id="forward-arrow" name="ArrowForwardLineIcon" size="lg" />
    </div>
    <div class="vocabulary-main-view--content">
      <div class="vocabulary-main-view--not-found" v-if="!words.length">
        {{ $t('emptyTip.vocabulary') }}
        <NewWordButton :button-text="$t('buttons.addFirstWords')" />
      </div>
      <div class="vocabulary-main-view--words" v-else @wheel.prevent="handleWheel">
        <div v-for="word in words">
          <WordCard :word="word" />
        </div>
      </div>
    </div>
  </button>
</template>

<style lang="scss">
.vocabulary-main-view {
  position: relative;
  width: 100%;
  background-color: $neutrals-100;
  padding: 4rem;
  border-radius: $radius-2xl;
  box-shadow: $regular-shadow;
  border: 0.1rem solid transparent;
  cursor: pointer;

  @include hover {
    border: 0.1rem solid $primary-300;

    .vocabulary-main-view--header {
      #forward-arrow {
        color: $primary-300;
      }
    }
  }

  @include active {
    border: 0.1rem solid $primary-500;

    .vocabulary-main-view--header {
      #forward-arrow {
        color: $primary-500;
      }
    }
  }

  .vocabulary-main-view--header {
    padding-bottom: 2rem;
    border-bottom: 0.1rem solid $neutrals-400;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .vocabulary-main-view--title {
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

  .vocabulary-main-view--content {
    padding-top: 2rem;
    width: 100%;

    .vocabulary-main-view--not-found {
      @include text-2;
      color: $neutrals-700;
      text-align: left;

      display: flex;
      justify-content: space-between;
    }

    .vocabulary-main-view--words {
      padding: 0.2rem 0.4rem 2rem 0.4rem;
      display: flex;
      gap: 2rem;
      padding-bottom: 1.6rem;
      overflow-x: auto;
      @include scroll;
    }
  }
}
</style>
