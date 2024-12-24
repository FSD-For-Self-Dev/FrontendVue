<script lang="ts">
import { useNotificationsStore } from '@/store/notifications';
import { useVocabularyStore } from '@/store/vocabulary';
import { mapActions, mapState, mapWritableState } from 'pinia';
import Button from '@/components/UI/button/Button.vue';
import type { PropType } from 'vue';
import { useLanguagesStore } from '@/store/languages';
import WordTagCard from '@/components/vocabulary/WordTagCard.vue';
import { isAxiosError } from 'axios';
import { useModalStore } from '@/store/modal';
import { joinWithComma } from '@/utils/joinWithComma';

export default {
  components: { Button, WordTagCard },
  data() {
    return {
      word: '',
      language: '',
      activity_status: '',
      activity_progress: 0 as number,
      tags: [] as string[],
      types: [] as string[],
      translations_count: 0,
      image_associations_count: 0,
      favorite: false,
      submitProcess: false,
      joinWithComma,
    };
  },
  computed: {
    ...mapState(useLanguagesStore, ['global_languages']),
    ...mapWritableState(useVocabularyStore, ['filterOptions']),
    ...mapWritableState(useModalStore, ['modalObjectLookup']),
  },
  methods: {
    ...mapActions(useVocabularyStore, [
      'getVocabulary',
      'getWordProfile',
      'deleteWord',
      'getFavoriteWords',
      'resetFilteredWords',
    ]),
    ...mapActions(useNotificationsStore, ['addNewMessage']),
    ...mapActions(useLanguagesStore, [
      'getLearningLanguages',
      'getLearningLanguageByIsocode',
      'getFlagIcon',
    ]),
    ...mapActions(useModalStore, ['closeModal']),
    async handleDelete() {
      this.submitProcess = true;
      if (this.modalObjectLookup) {
        const res = await this.deleteWord(this.modalObjectLookup);
        if (isAxiosError(res)) {
          console.log(res.response?.data);
        } else {
          this.filterOptions.language = '';
          this.filterOptions.activity_status = '';
          this.filterOptions.search = '';
          const successMsg = this.$t('infoMessage.deleteWord');
          await this.closeModal();
          await this.getVocabulary();
          if (this.favorite) await this.getFavoriteWords();
          this.resetFilteredWords();
          this.getLearningLanguages();
          this.addNewMessage({
            type: 'info',
            text: successMsg,
          });
        }
      }
      this.submitProcess = false;
    },
  },
  async mounted() {
    if (this.modalObjectLookup) {
      await this.getWordProfile(this.modalObjectLookup);
      const { wordProfile } = useVocabularyStore();
      this.word = wordProfile.text ? wordProfile.text : '';
      this.language = wordProfile.language ? wordProfile.language : '';
      this.activity_status = wordProfile.activity_status
        ? wordProfile.activity_status
        : '';
      this.activity_progress = wordProfile.activity_progress
        ? wordProfile.activity_progress
        : 0;
      this.types = wordProfile.types ? wordProfile.types : [];
      this.tags = wordProfile.tags ? wordProfile.tags : [];
      this.translations_count = wordProfile.translations_count
        ? wordProfile.translations_count
        : 0;
      this.image_associations_count = wordProfile.image_associations_count
        ? wordProfile.image_associations_count
        : 0;
      this.favorite = wordProfile.favorite ? wordProfile.favorite : this.favorite;
    }
  },
};
</script>

<template>
  <form @submit.prevent="handleDelete" class="delete-word-form">
    <div class="word-info--language">
      <div class="word-info--language-icon">
        <img :src="getFlagIcon(language)" alt="Icon" class="language-icon" />
      </div>
      <p>{{ getLearningLanguageByIsocode(language)?.language.name_local }}</p>
    </div>
    <div class="word-info">
      <div class="word-info--types" v-if="types.length > 0">
        <p>{{ joinWithComma(types) }}</p>
      </div>
      <p id="word">{{ word }}</p>
      <div class="word-info--tags" v-if="tags.length > 0">
        <WordTagCard :tag="tag" v-for="tag in tags" size="medium" />
      </div>
    </div>
    <div class="word-info--summary">
      <div class="word-info--summary-item">
        <p>{{ $t('title.translations') }}</p>
        <p>{{ translations_count }}</p>
      </div>
      <div class="word-info--summary-item">
        <p>{{ $t('title.associations') }}</p>
        <p>{{ image_associations_count }}</p>
      </div>
      <div class="word-info--summary-item">
        <p>{{ $t('title.status') }}</p>
        <div id="activity-status">
          <svg-icon
            :name="`${activity_status}${activity_progress}StatusIcon`"
            size="nm"
            v-if="activity_status"
          />
          <p>{{ activity_status }}</p>
        </div>
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
.delete-word-form {
  display: flex;
  flex-direction: column;
  gap: 4rem;

  .word-info {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    #word {
      @include subheading-2;
    }

    &--language {
      @include subheading-3;
      display: flex;
      flex-direction: row;
      gap: 1.2rem;
      align-items: center;
      width: max-content;
      height: max-content;
    }

    &--language-icon {
      width: 2.4rem;
      height: 2.4rem;
      display: flex;
      align-items: center;
      justify-content: center;

      .language-icon {
        width: 100%;
        height: 100%;
        border-color: transparent;
        outline-color: transparent;
      }
    }

    &--types {
      display: flex;
      flex-direction: row;
      @include word-type;

      p {
        width: 100%;
        text-align: left;
        @include tag-large;
      }
    }

    &--tags {
      @include word-tags-list-small;
    }

    &--summary {
      display: flex;
      flex-direction: column;
      gap: 0;

      &-item {
        @include text-2;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom: 0.1rem dashed $neutrals-400;
        padding-block: 2rem;
      }

      #activity-status {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.8rem;
      }
    }
  }

  .buttons {
    display: flex;
    gap: 1.6rem;
    justify-content: flex-end;
  }
}
</style>
