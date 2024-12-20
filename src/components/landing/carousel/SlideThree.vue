<script lang="ts">
import WordCard from '@/components/vocabulary/WordCard.vue';
import Img1 from '@/assets/images/landing-slide3.png';
import Img2 from '@/assets/images/landing-slide3-2.png';
import { Slide } from 'vue3-carousel';
import type { WordDto } from '@/dto/vocabulary.dto';

export default {
  components: { Slide, WordCard },
  setup() {
    const word: WordDto = {
      activity_progress: 0,
      activity_status: 'Inactive',
      author: 'user',
      created: '2024-12-06 16:04',
      favorite: false,
      id: '8ed43223-58dc-488d-b0c3-2d9fa12ccc23',
      image: Img1,
      is_problematic: false,
      language: 'English',
      modified: '2024-12-06 16:04',
      slug: 'spiaggia-user',
      tags: ['IT', 'WORK'],
      text: 'Develop',
      translations: ['Разрабатывать', 'Cовершенствовать', 'Развивать', 'Конструировать'],
      translations_count: 4,
      types: ['Глагол'],
    };
    return {
      word,
      Img2,
    };
  },
};
</script>

<template>
  <Slide :slide-size="{width: '344px', height: '545px'}"
    ><div :class="$style.wrapper">
      <WordCard :style="{ width: '100%' }" :word="word" />
      <div :class="$style.sub_images">
        <img :class="$style.image" :src="Img2" />
      </div>
    </div>
    <div></div
  ></Slide>
</template>

<style lang="scss" module>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 34.5rem;
  height: 54.5rem;
  justify-content: space-between;
  box-sizing: content-box;
}

.word_card {
  width: 100%;
  height: 100%;
}

.sub_images {
  display: flex;
  gap: 0.7rem;
  flex-direction: row;
  position: relative;
  user-select: none;

  &::before {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    content: 'В разарабоктке';
    @include subheading-3;
    padding: 1rem;
    background-color: $neutrals-100;
    opacity: 80%;
  }
}

.image {
  width: 100%;
  height: 16.9rem;
  border-radius: 2rem;
}
</style>
