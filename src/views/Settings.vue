<template>
<PageLayout>
  <HeaderPage text="Настройки" :icon="HeaderIcon" />
  <div class="settings--container">
    <SettingsNavigation />
    <SettingsForm />
  </div>

</PageLayout>
</template>

<script lang="ts">
import HeaderPage from '@/components/UI/header-page/HeaderPage.vue';
import PageLayout from '@/components/UI/page-layout/PageLayout.vue';
import SettingsIcon from '@/assets/icons/common/SettingsIcon.vue';
import SettingsForm from '@/components/settings/SettingsForm.vue';
import SettingsNavigation from '@/components/settings/SettingsNavigation.vue';

export default {
  components: {
    PageLayout,
    HeaderPage,
    SettingsForm,
    SettingsNavigation
  },
  data() {
    return {
      HeaderIcon: SettingsIcon,
    }
  }
}
</script>

<style lang="scss">
.settings--container {
  display: grid;
  grid-template-columns: 30rem auto;
  gap: 6rem;
}
</style>
