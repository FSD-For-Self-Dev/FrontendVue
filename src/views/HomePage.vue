<script lang="ts">
import PageLayout from '@/components/UI/page-layout/PageLayout.vue';
import LanguagesMainView from '@/components/language/LanguagesMainView.vue';
import VocabularyMainView from '@/components/vocabulary/VocabularyMainView.vue';
import Landing from '@/components/landing/Landing.vue';
import { mapState } from 'pinia';
import { useUserStore } from '@/store/user';

export default {
  components: { PageLayout, LanguagesMainView, VocabularyMainView, Landing },
  computed: {
    ...mapState(useUserStore, ['authStatus', 'username']),
  }
};
</script>

<template>
  <PageLayout>
    <div class="home-page" v-if="authStatus">
      <div class="home-page-top">
        <div class="home-page-top--left-section">
          <LanguagesMainView />
        </div>
      </div>
      <VocabularyMainView />
    </div>
    <Landing v-else />
  </PageLayout>
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
