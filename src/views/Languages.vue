<script lang="ts">
import PageLayout from '@/components/UI/page-layout/PageLayout.vue';
import AddLanguagesButton from '@/components/language/AddLanguagesButton.vue';
import PageTitle from '@/components/UI/page-title/PageTitle.vue';

export default {
	components: { PageLayout, PageTitle, AddLanguagesButton },
};
</script>

<template>
	<PageLayout>
		<PageTitle text="Языки" icon="LanguageIcon" />
		<AddLanguagesButton button-size="medium" button-text="Добавить язык" />
	</PageLayout>
</template>

<style lang="scss" scoped></style>
