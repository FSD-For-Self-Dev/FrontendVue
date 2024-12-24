<script lang="ts">
import { mapActions } from 'pinia';
import Button from '@/components/UI/button/Button.vue';
import { useGlobalActionsStore } from '@/store/global-actions';
import { useWindowScroll } from '@vueuse/core';
import { useModalStore } from '@/store/modal';

const { y } = useWindowScroll({ behavior: 'smooth' });

export default {
  components: { Button },
  emits: ["profileSettings", "appSettings"],
  data() {
    return {
      tab: 'profile',
    };
  },
  methods: {
    ...mapActions(useGlobalActionsStore, ['global_clear']),
    ...mapActions(useModalStore, ['openModal']),
    handleExit() {
      this.global_clear().finally(() => {
        this.$router.push('/');
      });
    },
    showProfileSettings() {
      this.tab = 'profile';
      y.value = 0;
      this.$emit("profileSettings");
    },
    showAppSettings() {
      this.tab = 'app';
      y.value = 0;
      this.$emit("appSettings");
    },
  },
};
</script>

<template>
  <nav class="settings--navigation">
    <ul class="settings--list">
      <li>
        <Button
          :style="{
            width: '100%',
            justifyContent: 'start',
          }"
          size="medium"
          variant="secondary"
          :text="$t('title.profile')"
          icon="ProfileIcon"
          @click="showProfileSettings"
          :active="tab === 'profile'"
        />
      </li>
      <li>
        <Button
          :style="{
            width: '100%',
            justifyContent: 'start',
          }"
          size="medium"
          variant="secondary"
          :text="$t('title.personalization')"
          icon="StarIcon"
          @click="showAppSettings"
          :active="tab === 'app'"
        />
      </li>
    </ul>
    <ul class="settings--actions">
      <li>
        <Button
          :style="{
            width: '100%',
            justifyContent: 'start',
          }"
          size="medium"
          variant="secondary"
          :text="$t('auth.logOut')"
          icon="ExitIcon"
          @click="handleExit"
        />
      </li>
      <li>
        <Button
          :style="{
            width: '100%',
            justifyContent: 'start',
          }"
          size="medium"
          variant="danger"
          :text="$t('auth.deleteAccount')"
          icon="DeleteIcon"
          @click="() => {
            openModal(
              'DeleteAccountForm',
              $t('title.deleteAccountConfirm'),
              'InfoIcon',
              'lg',
            );
          }"
        />
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.settings--navigation {
  position: fixed;
  top: 20rem;

  .settings--list {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }

  .settings--actions {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    margin-top: 4rem;
  }
}
</style>
