<template>
    <PageLayout>
        <div v-if="authStatus">
            <LanguagesMainView />
        </div>
        <Landing v-else />
    </PageLayout>
</template>

<script lang="ts">
import PageLayout from '@/components/UI/page-layout/PageLayout.vue';
import LanguagesMainView from '@/components/language/LanguagesMainView.vue';
import Landing from '@/components/landing/Landing.vue';
import { mapState } from 'pinia';
import { useUserStore } from '@/store/user';
export default {
    components: { PageLayout, LanguagesMainView, Landing },
    computed: {
        ...mapState(useUserStore, ['authStatus'])
    }
};
</script>

<style lang="scss" scoped></style>
