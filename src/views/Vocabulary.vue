<template>
    <PageLayout>
        <VocabularyButtonForModal text-button="Новое слово или фраза" />
    </PageLayout>
</template>

<script lang="ts">
import PageLayout from '@/components/UI/page-layout/PageLayout.vue';
import VocabularyButtonForModal from '@/components/vocabulary/VocabularyButtonForModal.vue';

export default {
    components: { PageLayout, VocabularyButtonForModal },
};
</script>

<style lang="scss" scoped></style>
