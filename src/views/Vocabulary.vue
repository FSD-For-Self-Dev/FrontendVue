<template>
  <PageLayout>
    <WordList :cards="words" />
  </PageLayout>
</template>

<script lang="ts">
import PageLayout from '@/components/UI/page-layout/PageLayout.vue'
import WordList from '@/components/word-list/WordList.vue'
import { words } from '@/constants/wordsMock'

export default {
  components: { PageLayout, WordList },
  data() {
    return { words }
  },
}
</script>

<style lang="scss" scoped></style>
