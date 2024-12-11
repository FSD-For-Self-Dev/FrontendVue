<script lang="ts">
import { mapActions, mapState } from 'pinia';
import { useUserStore } from './store/user';
import Preloader from '@/components/UI/preloader/Preloader.vue';
import { useLanguagesStore } from './store/languages';
import HomePage from '@/views/HomePage.vue';
import { useGlobalActionsStore } from './store/global-ations';

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
    ...mapActions(useGlobalActionsStore, ['global_init']),
  },
  mounted() {
    if (this.authStatus) {
      Promise.all([
        this.getUser(),
      ]).finally(async () => {
        const { interface_language } = useUserStore();
        this.$i18n.locale = interface_language;

        await this.global_init(this.$i18n.locale);

        this.isLoading = false;
      });
    } else {
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
