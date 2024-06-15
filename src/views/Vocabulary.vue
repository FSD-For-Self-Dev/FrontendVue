<template>
  <PageLayout>
    <WordList :cards="words"/>
  </PageLayout>
</template>

<script lang="ts">
import { PageLayout } from '@/components/UI';
import { WordList } from '@/components';
import { words } from "@/constants/wordsMock";

export default {
  components: { PageLayout, WordList },
  data() {
    return { words }
  }
};
</script>

<style lang="scss" scoped></style>
