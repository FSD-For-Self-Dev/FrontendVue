<script lang="ts">
import { useWindowScroll } from '@vueuse/core';
import Header from '@/components/header/Header.vue';
import Footer from '@/components/footer/Footer.vue';
import IconButton from '@/components/UI/button/IconButton.vue';
import NotificationsList from '@/components/notifications/NotificationsList.vue';
import { mapActions, mapWritableState } from 'pinia';
import Preloader from '../preloader/Preloader.vue';
import { useUserStore } from '@/store/user';
import { ref } from 'vue';
import { useGlobalActionsStore } from '@/store/global-actions';

const { x, y } = useWindowScroll({ behavior: 'smooth' });

export default {
  components: { Header, Footer, IconButton, NotificationsList, Preloader },
  props: {
    landingPage: {
      type: Boolean,
      required: false,
      default: false
    },
    noFooterPage: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  data() {
    const hideFooter = ref(this.noFooterPage);

    return {
      y,
      isLoading: false,
      hideHeader: false,
      hideFooter,
    };
  },
  computed: {
    ...mapWritableState(useUserStore, ['authStatus']),
    isMainpage() {
      return this.$route.path === '/';
    },
  },
  methods: {
    ...mapActions(useGlobalActionsStore, ['global_init', 'update_locale']),
    handleUpdateLocale() {
      this.isLoading = true;
      localStorage.setItem('locale', this.$i18n.locale);
      if (this.authStatus) {
        this.update_locale(this.$i18n.locale);
        this.global_init();
      };
      this.isLoading = false;
    },
    async handleLoginProcceed() {
      this.hideHeader = true;
      this.hideFooter = true;
      this.isLoading = true;

      await this.global_init();

      this.authStatus = true;
      this.hideHeader = false;
      this.hideFooter = false;
      this.isLoading = false;
    },
    goBack() {
      if (history.state.back) {
        this.$router.go(-1);
      } else this.$router.push('/');
    },
    scrollToTop() {
      y.value = 0;
    },
  },
};
</script>

<template>
  <div class="layout">
    <Header
      @locale-updated="handleUpdateLocale"
      @login-procceed="handleLoginProcceed"
      v-if="!hideHeader"
    />
    <main class="main" v-if="!isLoading">
      <div :class="{ wrapper: !landingPage }">
        <IconButton
          v-if="!isMainpage"
          @click="goBack"
          class="back-button"
          icon="ArrowBackwardIcon"
          size="lg"
          iconSize="nm"
          variant="shadowed"
        >
          <span class="visually-hidden">{{ $t('buttons.previous') }}</span>
        </IconButton>
        <slot></slot>
        <Transition>
          <IconButton
            @click="scrollToTop"
            v-if="!landingPage && y > 50"
            class="up-button"
            icon="ArrowUpIcon"
            size="lg"
            iconSize="nm"
            variant="shadowed"
          >
            <span class="visually-hidden">Наверх</span>
          </IconButton>
        </Transition>
      </div>
    </main>
    <div v-else class="preloader">
      <Preloader />
    </div>
    <Footer v-if="!noFooterPage" />
    <NotificationsList />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  padding-top: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $neutrals-200;
}

.main {
  width: 100%;
  background-color: $neutrals-200;
}

.wrapper {
  max-width: 1600px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 4rem 10rem 40rem;
  margin: auto;
}

.back-button {
  position: fixed;
  top: 13.7rem;
  left: 1.6rem;
}

.up-button {
  position: fixed;
  bottom: 4rem;
  right: 1.6rem;
}

.v-enter-active,
.v-leave-active {
  transition:
    opacity 0.2s,
    transform 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(100px);
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
