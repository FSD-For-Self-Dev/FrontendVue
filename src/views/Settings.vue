<template>
	<PageLayout>
		<HeaderPage text="Настройки" :icon="HeaderIcon" />
	</PageLayout>
</template>

<script lang="ts">
import HeaderPage from '@/components/UI/header-page/HeaderPage.vue';
import PageLayout from '@/components/UI/page-layout/PageLayout.vue';
import SettingsIcon from '@/assets/icons/common/SettingsIcon.vue';

export default {
  components: { PageLayout, HeaderPage },
  data() {
    return {
      HeaderIcon: SettingsIcon
    }
  }
}
</script>
