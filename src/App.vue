<script lang="ts">
import { mapActions, mapState } from 'pinia';
import { useUserStore } from '@/store/user';
import Preloader from '@/components/UI/preloader/Preloader.vue';
import { useLanguagesStore } from './store/languages';
import HomePage from '@/views/HomePage.vue';
import { useGlobalActionsStore } from '@/store/global-actions';

export default {
  components: { HomePage, Preloader },
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    ...mapState(useUserStore, ['authStatus']),
  },
  methods: {
    ...mapActions(useUserStore, ['getUser']),
    ...mapActions(useLanguagesStore, ['getGlobalLanguages']),
    ...mapActions(useGlobalActionsStore, ['global_init', 'update_locale']),
  },
  mounted() {
    if (this.authStatus) {
      Promise.all([
        this.getUser(),
      ]).finally(async () => {
        const localeLocal = localStorage.getItem('locale');
        if (localeLocal) {
          this.$i18n.locale = localeLocal;
        } else {
          const { interface_language } = useUserStore();
          this.$i18n.locale = interface_language;
        };

        this.update_locale(this.$i18n.locale);
        await this.global_init();

        this.isLoading = false;
      });
    } else {
      const localeLocal = localStorage.getItem('locale');
      if (localeLocal) {
        this.$i18n.locale = localeLocal;
      };
      this.update_locale(this.$i18n.locale);
      Promise.all([
        this.getGlobalLanguages(),
      ]).finally(() => {
        this.isLoading = false;
      })
    };
  },
};
</script>

<template>
  <RouterView v-if="!isLoading" />
  <RouterView name="helper" v-if="!isLoading" />
  <div v-else class="preloader">
    <Preloader />
  </div>
</template>

<style scoped lang="scss">
.preloader {
  width: 100svw;
  height: 100svh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
