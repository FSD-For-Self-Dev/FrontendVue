<template>
    <PageLayout>
        <NewWordForm />
    </PageLayout>
</template>

<script lang="ts">
import PageLayout from '@/components/UI/page-layout/PageLayout.vue';
import NewWordForm from '@/components/vocabulary/NewWordForm.vue';

export default {
    components: { PageLayout, NewWordForm },
};
</script>

<style lang="scss" scoped>
</style>
