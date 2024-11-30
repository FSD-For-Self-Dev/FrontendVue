<script lang="ts">
import PageTitle from '@/components/UI/page-title/PageTitle.vue';
import PageLayout from '@/components/UI/page-layout/PageLayout.vue';
import SettingsForm from '@/components/settings/SettingsForm.vue';
import SettingsNavigation from '@/components/settings/SettingsNavigation.vue';

export default {
  components: {
    PageLayout,
    PageTitle,
    SettingsForm,
    SettingsNavigation
  },
}
</script>

<template>
  <PageLayout>
    <PageTitle settings-page text="Настройки" icon="SettingsIcon" />
    <div class="settings--container">
      <div></div>
      <SettingsNavigation />
      <SettingsForm />
    </div>
  </PageLayout>
</template>

<style lang="scss">
.settings--container {
  display: grid;
  grid-template-columns: 30rem auto;
  gap: 6rem;
  position: relative;
}
</style>
