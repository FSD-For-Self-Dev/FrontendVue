<script lang="ts">
import { mapActions } from 'pinia';
import { useUserStore } from '@/store/user';
import { useLanguagesStore } from '@/store/languages';
import { useVocabularyStore } from '@/store/vocabulary';
import Button from '@/components/UI/button/Button.vue';
import Modal from '@/components/UI/modal/Modal.vue';
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
    ...mapActions(useUserStore, ['logout']),
    ...mapActions(useVocabularyStore, ['clearDataVocabulary']),
    ...mapActions(useLanguagesStore, ['clearDataLanguages']),
    handleClose() {
      this.showModal = false;
    },
    handleExit() {
      this.logout();
      this.clearDataVocabulary();
      this.clearDataLanguages();
      this.$router.push('/');
    },
    showProfileSettings() {
      this.showProfileSettingsForm = true;
      this.showAppSettingsForm = false;
      this.$emit("profileSettings");
    },
    showAppSettings() {
      this.showAppSettingsForm = true;
      this.showProfileSettingsForm = false;
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
          text="Профиль"
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
          text="Персонализация"
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
          text="Выйти из аккаунта"
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
          text="Удалить аккаунт"
          icon="DeleteIcon"
          @click="showModal = true"
        />
      </li>
    </ul>
  </nav>
  <Modal
    v-if="showModal"
    :close-modal="handleClose"
    title-modal="Вы уверены, что хотите удалить аккаунт?"
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
