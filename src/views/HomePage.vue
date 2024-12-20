<script lang="ts">
import PageLayout from '@/components/UI/page-layout/PageLayout.vue';
import LanguagesMainView from '@/components/language/LanguagesMainView.vue';
import VocabularyMainView from '@/components/vocabulary/VocabularyMainView.vue';
import Landing from '@/components/landing/Landing.vue';
import { mapState } from 'pinia';
import { useUserStore } from '@/store/user';
import { useWindowScroll } from '@vueuse/core';

const { y } = useWindowScroll({ behavior: 'instant' });

export default {
  components: { PageLayout, LanguagesMainView, VocabularyMainView, Landing },
  computed: {
    ...mapState(useUserStore, ['authStatus', 'username']),
  },
  setup() {
    y.value = 0;
  },
};
</script>

<template>
  <PageLayout v-if="authStatus">
    <div class="home-page">
      <div class="home-page-top">
        <div class="home-page-top--left-section">
          <LanguagesMainView />
        </div>
      </div>
      <VocabularyMainView />
    </div>
  </PageLayout>
  <PageLayout v-else landing-page><Landing /></PageLayout>
</template>

<style lang="scss" scoped>
.home-page {  
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.home-page-top {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.home-page-top--left-section {
  width: 100%;
  height: 100%;
}

.home-page-top--right-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
