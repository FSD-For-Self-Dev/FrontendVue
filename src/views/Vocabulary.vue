<script lang="ts">
import PageLayout from '@/components/UI/page-layout/PageLayout.vue';
import PageTitle from '@/components/UI/page-title/PageTitle.vue';
import VocabularyTools from '@/components/vocabulary/VocabularyTools.vue';
import VocabularyWords from '@/components/vocabulary/VocabularyWords.vue';

export default {
	components: { PageLayout, PageTitle, VocabularyTools, VocabularyWords },
};
</script>

<template>
	<PageLayout>
		<PageTitle text="Словарь" icon="VocabularyIcon" />
		<VocabularyTools />
		<VocabularyWords />
	</PageLayout>
</template>
