<script lang="ts">
import PageTitle from '@/components/UI/page-title/PageTitle.vue';
import PageLayout from '@/components/UI/page-layout/PageLayout.vue';
import ProfileSettingsForm from '@/components/settings/ProfileSettingsForm.vue';
import SettingsNavigation from '@/components/settings/SettingsNavigation.vue';
import AppSettingsForm from '@/components/settings/AppSettingsForm.vue';
import { useWindowScroll } from '@vueuse/core';
import { useUserStore } from '@/store/user';
import { mapActions, mapState } from 'pinia';
import { useGlobalActionsStore } from '../store/global-actions';

const { y } = useWindowScroll({ behavior: 'instant' });

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
      isLoading: false,
    }
  },
  setup() {
    y.value = 0;
  },
  computed: {
    ...mapState(useUserStore, ['authStatus']),
  },
  methods: {
    ...mapActions(useGlobalActionsStore, ['global_init', 'update_locale']),
    showProfileSettings() {
      this.showProfileSettingsForm = true;
      this.showAppSettingsForm = false;
    },
    showAppSettings() {
      this.showAppSettingsForm = true;
      this.showProfileSettingsForm = false;
    },
    handleUpdateLocale() {
      this.isLoading = true;
      if (this.authStatus) {
        this.update_locale(this.$i18n.locale);
        this.global_init().finally(async () => {});
      };
      this.isLoading = false;
    },
  },
}
</script>

<template>
  <PageLayout noFooterPage>
    <PageTitle :text="$t('title.settings')" icon="SettingsIcon" style="position: fixed;" />
    <div class="settings--container">
      <div></div>
      <SettingsNavigation
        @profileSettings="showProfileSettings"
        @appSettings="showAppSettings"
      />
      <ProfileSettingsForm v-if="showProfileSettingsForm" />
      <AppSettingsForm v-if="showAppSettingsForm" @locale-updated="handleUpdateLocale" />
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
