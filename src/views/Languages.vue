<script lang="ts">
import PageLayout from '@/components/UI/page-layout/PageLayout.vue';
import PageTitle from '@/components/UI/page-title/PageTitle.vue';
import LanguagesListView from '@/components/language/LanguagesListView.vue';

export default {
	components: { PageLayout, PageTitle, LanguagesListView },
};
</script>

<template>
	<PageLayout>
		<PageTitle text="Языки" icon="LanguageIcon" />
		<LanguagesListView />
	</PageLayout>
</template>

<style lang="scss" scoped></style>
