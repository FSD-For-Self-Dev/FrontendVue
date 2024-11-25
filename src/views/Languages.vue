<template>
	<PageLayout>
		<HeaderPage text="Языки" :icon="LangIcon" />
		<LanguageButtonForModal size-button="medium" text-button="Добавить язык" />
	</PageLayout>
</template>

<script lang="ts">
import PageLayout from '@/components/UI/page-layout/PageLayout.vue';
import LanguageButtonForModal from '@/components/language/LanguageButtonForModal.vue';
import HeaderPage from '@/components/UI/header-page/HeaderPage.vue';
import LanguageIcon from '@/assets/icons/LanguageIcon.vue';
export default {
	components: { PageLayout, HeaderPage, LanguageButtonForModal },
	data() {
		return {
			LangIcon: LanguageIcon
		}
	}
};
</script>

<style lang="scss" scoped></style>
