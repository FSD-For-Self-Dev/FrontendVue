<script lang="ts">
import PageTitle from '@/components/UI/page-title/PageTitle.vue';
import PageLayout from '@/components/UI/page-layout/PageLayout.vue';
import ProfileSettingsForm from '@/components/settings/ProfileSettingsForm.vue';
import SettingsNavigation from '@/components/settings/SettingsNavigation.vue';
import AppSettingsForm from '@/components/settings/AppSettingsForm.vue';

export default {
  components: {
    PageLayout,
    PageTitle,
    ProfileSettingsForm,
    SettingsNavigation,
    AppSettingsForm,
  },
  data() {
    return {
      showProfileSettingsForm: true,
      showAppSettingsForm: false,
    }
  },
  methods: {
    showProfileSettings() {
      this.showProfileSettingsForm = true;
      this.showAppSettingsForm = false;
    },
    showAppSettings() {
      this.showAppSettingsForm = true;
      this.showProfileSettingsForm = false;
    },
  }
}
</script>

<template>
  <PageLayout noFooterPage>
    <PageTitle text="Настройки" icon="SettingsIcon" style="position: fixed;" />
    <div class="settings--container">
      <div></div>
      <SettingsNavigation
        @profileSettings="showProfileSettings"
        @appSettings="showAppSettings"
      />
      <ProfileSettingsForm v-if="showProfileSettingsForm" />
      <AppSettingsForm v-if="showAppSettingsForm" />
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
