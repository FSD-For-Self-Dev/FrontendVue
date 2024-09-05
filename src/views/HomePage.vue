<template>
    
    <PageLayout>
        <div class="home-page" v-if="authStatus">
            <LanguagesMainView />
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
export default {
    components: { PageLayout, LanguagesMainView, VocabularyMainView, Landing },
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
</style>
