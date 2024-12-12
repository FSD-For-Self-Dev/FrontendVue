<script lang="ts">
import { mapActions } from 'pinia';
import Button from '@/components/UI/button/Button.vue';
import Modal from '@/components/UI/modal/Modal.vue';
import { useGlobalActionsStore } from '@/store/global-ations';
import { useWindowScroll } from '@vueuse/core';

const { y } = useWindowScroll({ behavior: 'smooth' });

export default {
  components: { Button, Modal },
  emits: ["profileSettings", "appSettings"],
  data() {
    return {
      showProfileSettingsForm: true,
      showAppSettingsForm: false,
      showModal: false,
    };
  },
  methods: {
    ...mapActions(useGlobalActionsStore, ['global_clear']),
    handleClose() {
      this.showModal = false;
    },
    handleExit() {
      this.global_clear().finally(() => {
        this.$router.push('/');
      });
    },
    showProfileSettings() {
      this.showProfileSettingsForm = true;
      this.showAppSettingsForm = false;
      y.value = 0;
      this.$emit("profileSettings");
    },
    showAppSettings() {
      this.showAppSettingsForm = true;
      this.showProfileSettingsForm = false;
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
          :active="showProfileSettingsForm"
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
          :active="showAppSettingsForm"
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
          @click="showModal = true"
        />
      </li>
    </ul>
  </nav>
  <Modal
    v-if="showModal"
    :close-modal="handleClose"
    :title-modal="$t('title.deleteAccountConfirm')"
    icon="InfoIcon"
    modal-content="DeleteAccountForm"
    size="lg"
  />
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
