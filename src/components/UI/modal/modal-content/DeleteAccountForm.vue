<script>
import { useUserStore } from '@/store/user';
import { useNotificationsStore } from '@/store/notifications';
import { useVocabularyStore } from '@/store/vocabulary';
import { useLanguagesStore } from '@/store/languages';
import { mapActions } from 'pinia';
import Button from '@/components/UI/button/Button.vue';

export default {
  components: { Button },
  props: {
    closeForm: {
      type: Function,
      required: true,
    },
  },
  methods: {
    ...mapActions(useUserStore, ['deleteUser']),
    ...mapActions(useNotificationsStore, ['addNewMessage']),
    ...mapActions(useVocabularyStore, ['clearDataVocabulary']),
    ...mapActions(useLanguagesStore, ['clearDataLanguages']),
    handleDelete() {
      this.deleteUser();
      this.addNewMessage({
        type: 'info',
        text: 'Аккаунт успешно удален',
      });
      this.clearDataVocabulary();
      this.clearDataLanguages();
      this.closeForm();
      this.$router.push('/');
    },
  },
};
</script>

<template>
  <form @submit.prevent="handleDelete" class="delete-account-form">
    <Button
      type="button"
      variant="secondary"
      @click="() => closeForm()"
      text="Отменить"
    />
    <Button type="submit" variant="danger" text="Подтвердить" />
  </form>
</template>

<style lang="scss">
.delete-account-form {
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;
}
</style>
