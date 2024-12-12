<script lang="ts">
import PageLayout from '@/components/UI/page-layout/PageLayout.vue';
import { useWindowScroll } from '@vueuse/core';

const { y } = useWindowScroll({ behavior: 'instant' });

export default {
  components: { PageLayout },
  setup() {
    y.value = 0;
  },
};
</script>

<template>
  <PageLayout></PageLayout>
</template>

<style scoped lang="scss"></style>
