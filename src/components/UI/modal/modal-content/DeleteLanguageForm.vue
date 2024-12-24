<script lang="ts">
import { useNotificationsStore } from '@/store/notifications';
import { useVocabularyStore } from '@/store/vocabulary';
import { mapActions, mapWritableState } from 'pinia';
import { isAxiosError } from 'axios';
import { ref } from 'vue';
import { useLanguagesStore } from '@/store/languages';
import Button from '@/components/UI/button/Button.vue';
import BooleanInput from '@/components/UI/input/BooleanInput.vue';
import WordTagCard from '@/components/vocabulary/WordTagCard.vue';
import { useModalStore } from '@/store/modal';

export default {
  components: { Button, WordTagCard, BooleanInput },
  data() {
    return {
      submitProcess: false,
    };
  },
  setup() {
    const delete_words = ref(false);
    return {
      delete_words,
    };
  },
  computed: {
    ...mapWritableState(useModalStore, ['modalObjectLookup']),
    languageObject() {
      return this.getLanguageObjectByIsocode(this.modalObjectLookup);
    },
  },
  methods: {
    ...mapActions(useNotificationsStore, ['addNewMessage']),
    ...mapActions(useLanguagesStore, [
      'getLearningLanguages',
      'deleteLanguage',
      'getAvailableLanguages',
      'getLanguageObjectByIsocode',
    ]),
    ...mapActions(useVocabularyStore, ['getVocabulary']),
    ...mapActions(useModalStore, ['closeModal']),
    async handleDelete() {
      this.submitProcess = true;
      if (this.modalObjectLookup) {
        const res = await this.deleteLanguage(this.modalObjectLookup, this.delete_words);
        if (isAxiosError(res)) {
          console.log(res.response?.data);
        } else {
          this.getLearningLanguages();
          this.getAvailableLanguages();
          if (this.delete_words) this.getVocabulary();
          this.closeModal();
          this.$router.push('/languages');
          this.addNewMessage({
            type: 'info',
            text: this.$t('infoMessage.deleteLanguage'),
          });
        };
      }
      this.submitProcess = false;
    }
  },
};
</script>

<template>
  <form @submit.prevent="handleDelete" class="delete-language-form">
    <div class="language-cover">
      <img class="cover-image" :src="languageObject?.cover" />
      <div class="language-cover-header">
        <div class="language-cover-header-title">
          <img
            :src="languageObject?.language.flag_icon"
            alt="Icon"
            class="language-icon"
          />
          <p>{{ languageObject?.language.name_local }}</p>
        </div>
      </div>
    </div>
    <div class="language-info--summary">
      <div class="language-info--summary-item">
        <div id="words-counter-common">
          <p>{{ $t('title.words') }}:</p>
          <p>{{ languageObject?.words_count }}</p>
        </div>
        <div class="words-counters-summary">
          <div class="words-counter-status">
            <svg-icon name="ActiveStatusIcon" size="nm" />
            <p>{{ languageObject?.active_words_count }}</p>
          </div>
          <div class="words-counter-status">
            <svg-icon name="Inactive0StatusIcon" size="nm" />
            <p>{{ languageObject?.inactive_words_count }}</p>
          </div>
          <div class="words-counter-status">
            <svg-icon name="MasteredStatusIcon" size="nm" />
            <p>{{ languageObject?.mastered_words_count }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="delete-words-checkbox">
      <BooleanInput
        :label="$t('action.deleteLanguageWords')"
        type="checkbox"
        size="medium"
        v-model="delete_words"
      />
      <div class="delete-words-checkbox-tip">
        <svg-icon
          name="InfoIcon"
          size="sm"
          color="var:neutrals-700"
          style="stroke-width: 0.02rem"
        />
        <p>{{ $t('tip.deleteLanguageWords') }}</p>
      </div>
    </div>
    <div class="buttons">
      <Button
        type="button"
        variant="secondary"
        @click="() => closeModal()"
        :text="$t('buttons.cancel')"
        size="medium"
      />
      <div>
        <Button
          v-if="!submitProcess"
          type="submit"
          variant="danger"
          :text="$t('buttons.confirm')"
          size="medium"
        />
        <Button
          v-else
          type="submit"
          :text="$t('tip.deleteProcceed')"
          size="medium"
          disabled
        />
      </div>
    </div>
  </form>
</template>

<style lang="scss">
.delete-language-form {
  display: flex;
  flex-direction: column;
  gap: 4rem;

  .language-cover {
    height: 19.4rem;
  }

  .language-cover-header-title {
    @include subheading-3;

    .language-icon {
      width: 2.4rem;
      height: 2.4rem;
    }
  }

  .language-info--summary {
    display: flex;
    flex-direction: column;
    gap: 0;

    &-item {
      @include text-1;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      border-bottom: 0.1rem dashed $neutrals-400;
      padding-block: 2rem;
    }

    .words-counters-summary {
      display: flex;
      gap: 1.6rem;
      align-items: center;

      .words-counter-status {
        display: flex;
        gap: 0.4rem;
        align-items: center;
      }
    }

    #words-counter-common {
      display: flex;
      gap: 1.2rem;
      align-items: center;
    }
  }

  .delete-words-checkbox {
    display: flex;
    gap: 1.6rem;
    align-items: center;

    &-tip {
      display: flex;
      gap: 0.4rem;
      align-items: center;
      color: $neutrals-700;
      @include text-3;
    }
  }

  .buttons {
    display: flex;
    gap: 1.6rem;
    justify-content: flex-end;
  }
}
</style>
