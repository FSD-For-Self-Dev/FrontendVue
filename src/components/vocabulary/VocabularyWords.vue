<script lang="ts">
import { useVocabularyStore } from '@/store/vocabulary';
import { useLanguagesStore } from '@/store/languages';
import { numWord } from '@/utils/numWord';
import { mapState } from 'pinia';
import IconButton from '../UI/button/IconButton.vue';
import WordCard from './WordCard.vue';
import type { LearningLanguageDto } from '@/dto/languages.dto';
import NewWordButton from './NewWordButton.vue';
import type { PropType } from 'vue';

export default {
  components: { IconButton, WordCard, NewWordButton },
  props: {
    chosenLanguage: {
      type: Object as PropType<LearningLanguageDto>,
      required: false
    },
  },
  data() {
    return {
      words_count: 0,
      tip: '',
    }
  },
  computed: {
    ...mapState(useVocabularyStore, ["words", "count", "filterOptions"]),
    ...mapState(useLanguagesStore, ["learning_languages"]),
    textInfo() {
      return `Найдено ${this.count} ${numWord(this.count, ['слово', 'слова', 'слов'])} и ${numWord(this.count, ['фраза', 'фразы', 'фраз'])}`;
    },
    wordsCounter() {
      const chosen_lang = this.chosenLanguage ? this.chosenLanguage : this.learning_languages.filter((lang) => { return lang.language.name === this.filterOptions.language})[0];
      try {
        this.words_count = chosen_lang.words_count;
        this.tip = 'В вашем словаре пока нет слов этого языка';
      } catch {
        this.words_count = this.count;
        this.tip = 'В вашем словаре пока нет слов';
      }
      return this.words_count;
    },
  }
}
</script>

<template>
  <div class="vocabulary-content" v-if="wordsCounter > 0">
    <header class="vocabulary-content--header">
      <span class="vocabulary-content--info">{{ textInfo }}</span>
      <div class="vocabulary-content--filters">
        <IconButton icon="FilterIcon" size="md" iconSize="nm" variant="tertiary" />
        <IconButton icon="SortIcon" size="md" iconSize="nm" variant="tertiary" />
      </div>
    </header>
    <div class="vocabulary-content--cards">
      <div v-for="word in words">
        <WordCard :word="word"/>
      </div>
    </div>
  </div>
  <div class="empty-tip" v-else >
    <p class="tip">{{ tip }}</p>
    <NewWordButton button-size="medium" button-text="Новое слово или фраза" :chosenLanguage="chosenLanguage ? chosenLanguage.language.name : filterOptions.language" />
  </div>
</template>

<style lang="scss">
.vocabulary-content {
  &--header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

  }

  &--info {
    @include tag-big;
    color: $neutrals-700;
  }

  &--filters {
    display: inline-flex;
    gap: 0.4rem;
  }

  &--cards {
    display: grid;
    grid-template-columns: repeat(4, 29.5rem);
    justify-content: space-between;
    gap: 2rem;
  }
}

.empty-tip {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: $radius-xs;
  gap: 4rem;
  background-color: $primary-200;
  height: 12.4rem;

  .tip {
    @include text-2;
    color: $primary-700;
  }
}
</style>
