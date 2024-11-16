<script lang="ts">
import FilterIcon from '@/assets/icons/common/FilterIcon.vue';
import { useVocabularyStore } from '@/store/vocabulary';
import { numWord } from '@/utils/numWord';
import { mapState } from 'pinia';

export default {
  components: { FilterIcon },
  computed: {
    ...mapState(useVocabularyStore, ["words", "count", "filterOptions"]),
    textInfo() {
      return `Найдено ${this.count} ${numWord(this.count, ['слово', 'слова', 'слов'])} или ${numWord(this.count, ['фраза', 'фразы', 'фраз'])}`;
    }
  }
}
</script>

<template>
  <div class="vocabulary-content">
    <header class="vocabulary-content--header">
      <span class="vocabulary-content--info">{{ textInfo }}</span>
      <div class="vocabulary-content--filters">
        <FilterIcon size="24" custom-color="#737782" />
      </div>
    </header>
    <div class="vocabulary-content--cards">
      <div v-for="word in words
        .filter(word => word.text.toLocaleLowerCase().includes(filterOptions.text.toLocaleLowerCase()))
        .filter(word => filterOptions.language ? word.language.name === filterOptions.language : word)"
        class="word-card-mock">
        <span class="word-card-mock--text">
          <img :src="word.language.flag_icon" /> {{ word.text }}
        </span>
        <div class="word-card-mock--translations">
          <span class="word-card-mock--translation" v-for="translation in word.translations">
            {{ translation }}
          </span>
        </div>
      </div>
    </div>
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
    font-family: 'Inter';
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 2rem;
    text-transform: uppercase;
    color: $neutrals-600;
  }

  &--cards {
    display: grid;
    grid-template-columns: repeat(4, 29.5rem);
    justify-content: space-between;
    gap: 2rem;
  }

  .word-card-mock {
    width: 29.5rem;
    height: 34.4rem;
    border-radius: 1.2rem;
    border: .1rem solid $neutrals-300;
    background-color: $neutrals-100;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1.6rem;
    box-shadow: $regular-shadow;

    &--text {
      display: flex;
      align-items: center;
      gap: .5rem
    }
  }
}
</style>