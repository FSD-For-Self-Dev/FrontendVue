<template>
	<PageLayout>
		<HeaderPage text="словарь" :icon="vocabIcon" />
		<VocabularyPageTools />
		<VocabularyPageContent />
	</PageLayout>
</template>

<script lang="ts">
import PageLayout from '@/components/UI/page-layout/PageLayout.vue';
import HeaderPage from '@/components/UI/header-page/HeaderPage.vue';
import VocabularyIcon from '@/components/icons/VocabularyIcon.vue';
import VocabularyPageTools from '@/components/vocabulary/VocabularyPageTools.vue';
import VocabularyPageContent from '@/components/vocabulary/VocabularyPageContent.vue';

export default {
	components: { PageLayout, HeaderPage, VocabularyPageTools, VocabularyPageContent },
	data() {
		return {
			vocabIcon: VocabularyIcon
		}
	}
};
</script>
