<template>
  <PageLayout>
    <WordList :cards="words"/>
  </PageLayout>
</template>

<script lang="ts">
import PageLayout from '../components/UI/PageLayout/PageLayout.vue';
import WordList from '../components/WordList/WordList.vue';
import { words } from "../constants/wordsMock";

export default {
  components: { PageLayout, WordList },
  setup() {
    return { words }
  }
};
</script>

<style lang="scss" scoped></style>
