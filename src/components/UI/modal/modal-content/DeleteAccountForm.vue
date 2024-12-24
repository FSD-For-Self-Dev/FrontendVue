<script lang="ts">
import { useUserStore } from '@/store/user';
import { useNotificationsStore } from '@/store/notifications';
import { useVocabularyStore } from '@/store/vocabulary';
import { useLanguagesStore } from '@/store/languages';
import { mapActions, mapState } from 'pinia';
import Button from '@/components/UI/button/Button.vue';
import { useModalStore } from '@/store/modal';

export default {
  components: { Button },
  computed: {
    ...mapState(useUserStore, ['username', 'first_name', 'image', 'native_languages']),
    ...mapState(useLanguagesStore, ['learning_languages', 'global_languages']),
  },
  methods: {
    ...mapActions(useUserStore, ['deleteUser']),
    ...mapActions(useNotificationsStore, ['addNewMessage']),
    ...mapActions(useVocabularyStore, ['clearDataVocabulary']),
    ...mapActions(useLanguagesStore, ['clearDataLanguages', 'getLanguageByIsocode']),
    ...mapActions(useModalStore, ['closeModal']),
    handleDelete() {
      this.deleteUser();
      this.addNewMessage({
        type: 'info',
        text: this.$t('infoMessage.deleteAccount'),
      });
      this.clearDataVocabulary();
      this.clearDataLanguages();
      this.closeModal();
      this.$router.push('/');
    },
    getFlagIcon(neededLang: string | undefined) {
      return this.global_languages.find((lang) => lang.isocode === neededLang)?.flag_icon;
    },
  },
};
</script>

<template>
  <form @submit.prevent="handleDelete" class="delete-account-form">
    <div class="user-info">
      <img :src="image" class="avatar" />
      <div class="info">
        <div class="name">
          <p id="first-name">{{ first_name }}</p>
          <p id="username">@{{ username }}</p>
        </div>
        <div class="languages">
          <p class="small-title">{{ $t('title.nativeLanguages') }}:</p>
          <div class="languages--item" v-for="language in native_languages">
            <img :src="getFlagIcon(language)" alt="Icon" class="language-icon" />
            <p>{{ getLanguageByIsocode(language)?.name_local }}</p>
          </div>
        </div>
        <div class="languages">
          <p class="small-title">{{ $t('title.vocabulary') }}:</p>
          <div class="languages--item" v-for="language in learning_languages">
            <img :src="getFlagIcon(language.language.isocode)" alt="Icon" class="language-icon" />
            <p>{{ language.words_count }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="buttons">
      <div class="tip" style="width: 100%;">
        <svg-icon name="InfoIcon" size="md" color="var:danger-600" style="stroke-width: 0.02rem;" />
        <p>{{ $t('tip.dangerAction') }}</p>
      </div>
      <Button
        type="button"
        variant="secondary"
        :text="$t('buttons.cancel')"
        size="medium"
        @click="() => closeModal()"
      />
      <Button
        type="submit"
        variant="danger"
        :text="$t('buttons.confirm')"
        size="medium"
      />
    </div>
  </form>
</template>

<style lang="scss">
.delete-account-form {
  display: flex;
  flex-direction: column;
  gap: 4rem;

  .user-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4rem;

    .avatar {
      width: 20rem;
      min-width: 20rem;
      height: 20rem;
      min-height: 20rem;
      border-radius: $radius-full;
      object-fit: cover;
    }

    .info {
      display: flex;
      flex-direction: column;
      gap: 2.4rem;
      width: 100%;

      .name {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1.2rem;

        #first-name {
          @include subheading-2;
        }

        #username {
          @include text-1;
          color: $neutrals-600;
        }
      }

      .languages {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1.6rem;
        @include text-1;
        
        &--item {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0.8rem;
          @include text-1;

          .language-icon {
            width: 2.4rem;
            height: 2.4rem;
          }
        }
      }
    }
  }

  .tip {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.8rem;
    color: $danger-600;
    @include text-2;
  }

  .buttons {
    display: flex;
    gap: 1.6rem;
    justify-content: flex-end;
  }
}
</style>
