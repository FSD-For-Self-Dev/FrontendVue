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

<script lang="ts">
import PageLayout from '@/components/UI/page-layout/PageLayout.vue';
import LanguagesMainView from '@/components/language/LanguagesMainView.vue';
import VocabularyMainView from '@/components/vocabulary/VocabularyMainView.vue';
import Landing from '@/components/landing/Landing.vue';
import { mapState } from 'pinia';
import { useUserStore } from '@/store/user';
import FriendsMainView from "@/components/friends/FriendsMainView.vue";
import TeachersMainView from "@/components/teachers/TeachersMainView.vue";
export default {
  components: { TeachersMainView, FriendsMainView, PageLayout, LanguagesMainView, VocabularyMainView, Landing },
  computed: {
    ...mapState(useUserStore, ['authStatus', 'username']),
  }
};
</script>

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
