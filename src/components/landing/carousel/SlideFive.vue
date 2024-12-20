<script lang="ts">
import WordCard from '@/components/vocabulary/WordCard.vue';
import Img1 from '@/assets/images/landing-slide5-1.png';
import Img2 from '@/assets/images/landing-slide5-2.png';
import Img3 from '@/assets/images/landing-slide5-3.png';
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
      id: '8ed43223-58dc-488d-b0c3-2d9fa12zzz23',
      image: Img3,
      is_problematic: false,
      language: 'English',
      modified: '2024-12-06 16:04',
      slug: 'spiaggia-user',
      tags: ['Легкое', 'Meal'],
      text: 'Cookie',
      translations: ['Печенька'],
      translations_count: 1,
      types: ['существительное'],
    };
    return {
      word,
      Img1,
      Img2,
    };
  },
};
</script>

<template>
  <Slide
    ><div :class="$style.wrapper">
      <div :class="$style.sub_images">
        <img :class="$style.image" :src="Img1" />
        <img :class="$style.image" :src="Img2" />
      </div>
      <WordCard :style="{ width: '100%' }" :word="word" />
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
}

.image {
  width: 16.9rem;
  height: 16.9rem;
  border-radius: 2rem;
}
</style>
