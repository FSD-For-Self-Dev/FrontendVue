<script lang="ts">
import { useUserStore } from '@/store/user';
import { useLanguagesStore } from '@/store/languages';
import { useVocabularyStore } from '@/store/vocabulary';
import { OnClickOutside } from '@vueuse/components';
import { mapActions, mapState } from 'pinia';

export default {
  components: {
    OnClickOutside,
  },
  props: {
    handleClose: {
      type: Function,
      required: true,
    },
  },
  computed: {
    ...mapState(useUserStore, ['username']),
  },
  methods: {
    ...mapActions(useUserStore, ['logout']),
    ...mapActions(useVocabularyStore, ['clearDataVocabulary']),
    ...mapActions(useLanguagesStore, ['clearDataLanguages']),
    handleExit() {
      this.logout();
      this.clearDataVocabulary();
      this.clearDataLanguages();
      this.handleClose();
      this.$router.push('/');
    },
    handleSettings() {
      this.$router.push('/settings');
      this.handleClose();
    },
  },
};
</script>

<template>
  <OnClickOutside @trigger.stop="() => handleClose()">
    <div class="profile-tools">
      <button @click="handleSettings" class="profile-tools__button">
        <svg-icon name="SettingsIcon" size="nm" />
        {{ $t('title.settings') }}
      </button>
      <button @click="handleExit" class="profile-tools__button">
        <svg-icon name="ExitIcon" size="nm" />
        {{ $t('auth.logOut') }}
      </button>
    </div>
  </OnClickOutside>
</template>

<style lang="scss">
.profile-tools {
  position: fixed;
  top: 11rem;
  right: 2rem;
  @include dropdown-list;

  .profile-tools__button {
    @include dropdown-list-item;
  }
}
</style>
