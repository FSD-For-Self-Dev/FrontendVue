<script lang="ts">
import { mapActions } from 'pinia';
import Button from '@/components/UI/button/Button.vue';
import Modal from '@/components/UI/modal/Modal.vue';
import { useGlobalActionsStore } from '@/store/global-ations';
export default {
  components: { Button, Modal },
  data() {
    return {
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
    gap: 16px;
  }
}
</style>
