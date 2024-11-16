<template>
    <PageLayout>
        <h1>ЯЗЫКИ</h1>
        <LanguageButtonForModal text-button="Добавить язык" />
    </PageLayout>
</template>

<script lang="ts">
import PageLayout from '@/components/UI/page-layout/PageLayout.vue';
import LanguageButtonForModal from '@/components/language/LanguageButtonForModal.vue';
export default {
    components: { PageLayout, LanguageButtonForModal },
};
</script>

<style lang="scss" scoped></style>
