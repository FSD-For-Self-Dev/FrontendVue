<template>
    <PageLayout>
        <LanguagesMainView />
    </PageLayout>
</template>

<script lang="ts">
import PageLayout from '@/components/UI/page-layout/PageLayout.vue';
import LanguagesMainView from '@/components/language/LanguagesMainView.vue';
export default {
    components: { PageLayout, LanguagesMainView }
};
</script>

<style lang="scss" scoped></style>
