<script lang="ts">
import { useVocabularyStore } from '@/store/vocabulary';
import { mapActions, mapState } from 'pinia';
import { ref } from 'vue';
import type { PropType } from 'vue';
import { useLanguagesStore } from '@/store/languages';
import WordTagCard from '@/components/vocabulary/WordTagCard.vue';
import type { WordProfileDto, WordTagDto } from '@/dto/vocabulary.dto';
import { isAxiosError } from 'axios';
import IconButton from '../../button/IconButton.vue';
import Tab from '../../tab/Tab.vue';
import WordTranslationItem from '@/components/vocabulary/WordTranslationItem.vue';
import WordImageItem from '@/components/vocabulary/WordImageItem.vue';
import WordTools from '@/components/vocabulary/WordTools.vue';
import Modal from '../Modal.vue';
import { useNotificationsStore } from '@/store/notifications';

export default {
  components: { WordTagCard, IconButton, Tab, WordTranslationItem, WordImageItem, WordTools, Modal },
  emits: ["favoriteupdate", "deleteword", "editword"],
  props: {
    closeForm: {
      type: Function,
      required: true,
    },
    objectLookup: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      wordProfile: {} as WordProfileDto,
      translationCurrentIndex: 0,
      tab: 1,
      showWordTools: false,
    };
  },
  computed: {
    ...mapState(useLanguagesStore, ['global_languages']),
    counterBind() {
      return this.wordProfile.translations_count ? `${this.wordProfile.translations_count * 100}%` : '';
    },
    getTransform() {
      return `translateX(${-this.translationCurrentIndex * 100}%)`;
    },
    backgroundClasses() {
      if (this.wordProfile.image_associations && this.wordProfile.image_associations.length > 0) {
        return 'ghost'
      } else {
        return 'grey'
      };
    },
    buttonVariant() {
      if (this.wordProfile.image_associations && this.wordProfile.image_associations.length > 0) {
        return 'lucid'
      } else {
        return 'secondary'
      };
    },
    favoriteButtonVariant() {
      if (this.wordProfile.image_associations && this.wordProfile.image_associations.length > 0) {
        return 'favorite-lucid'
      } else {
        return 'favorite'
      };
    },
    paddingBind() {
      if (this.wordProfile.image_associations && this.wordProfile.image_associations.length > 0) {
        return '2rem 2rem 2.8rem 2rem'
      } else {
        return 0
      }
    }
  },
  methods: {
    ...mapActions(useVocabularyStore, ['getVocabulary', 'getWordProfile', 'addWordToFavorite', 'removeWordFromFavorite']),
    ...mapActions(useNotificationsStore, ['addNewMessage']),
    getFlagIcon(neededLang: string | undefined) {
      return this.global_languages.find((lang) => lang.name === neededLang)?.flag_icon;
    },
    joinTypes(word_types: string[]) {
      return word_types.join(', ');
    },
    goToNextTranslation() {
      if (this.wordProfile.translations_count && this.translationCurrentIndex >= this.wordProfile.translations_count - 1) {
        this.translationCurrentIndex = 0;
      } else {
        this.translationCurrentIndex += 1;
      }
    },
    goToPrevTranslation() {
      if (this.wordProfile.translations_count && this.translationCurrentIndex <= 0) {
        this.translationCurrentIndex = this.wordProfile.translations_count - 1;
      } else {
        this.translationCurrentIndex -= 1;
      }
    },
    changeTab(tab: number) {
      this.tab = tab;
    },
    async copyToClipboard(text: string) {
      navigator.clipboard.writeText(text);
      this.addNewMessage({
        type: 'info',
        text: `Слово скопировано: ${text.slice(0, 20)}`,
      });
    },
    async handleFavourite() {
      if (this.wordProfile.favorite && this.wordProfile.slug) {
        const res = await this.removeWordFromFavorite(this.wordProfile.slug);
        if (isAxiosError(res)) {
          if (res.response?.status === 409) {
            this.addNewMessage({
              type: 'error',
              text: 'Слово уже не находится в вашем избранном',
            });
          } else {
            console.log(res.response?.data);
          }
        } else {
          this.wordProfile.favorite = false;
          this.$emit("favoriteupdate", false);
          this.addNewMessage({
            type: 'info',
            text: `Слово удалено из избранного: ${this.wordProfile.text}`,
          });
        }
      } else if (this.wordProfile.slug) {
        const res = await this.addWordToFavorite(this.wordProfile.slug);
        if (isAxiosError(res)) {
          if (res.response?.status === 409) {
            this.addNewMessage({
              type: 'error',
              text: 'Слово уже находится в вашем избранном',
            });
          } else {
            console.log(res.response?.data);
          }
        } else {
          this.wordProfile.favorite = true;
          this.$emit("favoriteupdate", true);
          this.addNewMessage({
            type: 'info',
            text: `Слово добавлено в избранное: ${this.wordProfile.text}`,
          });
        }
      }
    },
    handleDelete() {
      this.showWordTools = false;
      this.$emit("deleteword");
      return;
    },
    handleEdit() {
      this.showWordTools = false;
      this.$emit("editword");
      return;
    },
  },
  mounted() {
    if (this.objectLookup) {
      Promise.all([this.getWordProfile(this.objectLookup)]).finally(() => {
        const { wordProfile } = useVocabularyStore();
        this.wordProfile = wordProfile;
      });
    }
  },
};
</script>

<template>
  <div class="word-profile">
    <div class="word-profile--word">
      <div class="word-profile--word-background" :class="{ 'with-image': wordProfile.image_associations }" v-if="wordProfile.image_associations && wordProfile.image_associations.length > 0">
        <div class="background-overlay" />
        <img :src="wordProfile.image_associations[0].image" alt="Word image" />
      </div>
      <div class="word-profile--word-header">
        <div class="word-profile--word-header-tags">
          <div class='author-tag' :class="backgroundClasses">
            <img :src="wordProfile.author?.image ? wordProfile.author.image : ''" class="avatar" />
            <p>{{ wordProfile.author?.first_name }}</p>
          </div>
          <div class="language-tag" :class="backgroundClasses">
            <img :src="getFlagIcon(wordProfile.language)" alt="Icon" class="language-icon" />
            <p>{{ wordProfile.language }}</p>
          </div>
          <div class="status-tag" :class="backgroundClasses">
            <svg-icon
              :name="`${wordProfile.activity_status}${wordProfile.activity_progress}StatusIcon`"
              size="nm"
              v-if="wordProfile.activity_status"
            />
            <p v-if="wordProfile.activity_status">
              {{ $t('activityStatus', { status: wordProfile.activity_status }) }}
            </p>
            <svg-icon name="InfoIcon" size="sm" color="var:neutrals-700" />
          </div>
        </div>
        <div class="word-profile--word-header-actions">
          <IconButton
            :icon="wordProfile.favorite ? 'FavouriteFilledIcon' : 'FavouriteIcon'"
            size="lg"
            :variant="favoriteButtonVariant"
            @click.stop="handleFavourite"
            :active="wordProfile.favorite"
          />
          <IconButton
            icon="MoreIcon"
            size="lg"
            :variant="buttonVariant"
            @click.stop="() => (showWordTools = !showWordTools)"
            :active="showWordTools"
          />
        </div>
        <WordTools
          :handleClose="() => (showWordTools = false)"
          v-if="showWordTools"
          :handle-delete="handleDelete"
          :handle-edit="handleEdit"
        />
      </div>
      <div class="word-profile--word-content" :class="backgroundClasses">
        <div class="word-profile--word-content-word-info">
          <div class="word-types" v-if="wordProfile.types && wordProfile.types.length > 0">
            <p>{{ joinTypes(wordProfile.types) }}</p>
          </div>
          <div id="word-info--word">
            <p>{{ wordProfile.text }}</p>
            <IconButton icon="CopyIcon" size="md" variant="secondary" @click.stop="copyToClipboard(wordProfile.text ? wordProfile.text : '')" />
          </div>
          <div class="word-tags" v-if="wordProfile.tags && wordProfile.tags.length > 0">
            <WordTagCard :tag="tag.name" v-for="tag in wordProfile.tags" size="medium" />
          </div>
        </div>
        <div
          class="translations-carousel"
          v-if="wordProfile.translations_count && wordProfile.translations_count > 0"
        >
          <div class="translations-carousel--inner">
            <div class="translations-carousel--item" v-for="translation in wordProfile.translations">
              {{ translation.text }}
            </div>
          </div>
          <svg-icon
            name="ArrowBackwardIcon"
            size="md"
            color="var:neutrals-600"
            hoverColor="var:primary-500"
            class="translations-carousel--arrow backward"
            @click.stop="goToPrevTranslation"
          />
          <svg-icon
            name="ArrowForwardIcon"
            size="md"
            color="var:neutrals-600"
            hoverColor="var:primary-500"
            class="translations-carousel--arrow forward"
            @click.stop="goToNextTranslation"
          />
          <div class="translations-carousel--counter">
            <span class="translations-counter">
              {{ translationCurrentIndex + 1 }}/{{ wordProfile.translations_count }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="word-profile--word-additions">
      <div class="word-profile--word-additions-tabs">
        <Tab :active="tab === 1" @click="() => changeTab(1)" title="Переводы" />
        <Tab :active="tab === 2" @click="() => changeTab(2)" title="Ассоциации" />
      </div>

      <div v-if="tab === 1" class="additions-list">
        <WordTranslationItem
          :translation-text="translation.text"
          :translation-language="translation.language"
          v-for="translation in wordProfile.translations"
          :editable=false
        />
        <p class="additions-list-empty-tip" v-if="wordProfile.translations?.length === 0">Нет переводов</p>
      </div>
      <div v-if="tab === 2" class="additions-list" style="max-height: 54.4rem;">
        <WordImageItem
          :image="image.image"
          v-for="image in wordProfile.image_associations"
          :editable=false
        />
        <p class="additions-list-empty-tip" v-if="wordProfile.image_associations?.length === 0">Нет ассоциаций</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.grey {
  background-color: $neutrals-200;
  border: 0.1rem solid $neutrals-400;
}

.ghost {
  background-color: $white-lucid;
}

.word-profile {
  display: flex;
  flex-direction: column;
  gap: 4rem;

  &--word {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: v-bind(paddingBind);
    width: 100%;
    height: max-content;

    &-background {
      position: absolute;
      width: 100%;
      height: 100%;
      inset: 0;
      background-color: $neutrals-100;
      border-radius: $radius-xl;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &-overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: $neutrals-900;
        opacity: 10%;
      }
    }

    &-header {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      &-tags {
        position: relative;
        display: flex;
        flex-direction: row;
        gap: 1.2rem;
        align-items: center;

        .author-tag {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 1.2rem;
          background-color: $white-lucid;
          border-radius: $radius-md;
          gap: 0.8rem;
          height: 4.8rem;
          @include text-2;

          .avatar {
            width: 2.4rem;
            min-width: 2.4rem;
            height: 2.4rem;
            min-height: 2.4rem;
            border-radius: $radius-full;
          }
        }

        .language-tag {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 1.2rem;
          background-color: $white-lucid;
          border-radius: $radius-md;
          gap: 0.8rem;
          height: 4.8rem;
          @include text-2;

          .language-icon {
            width: 2.4rem;
            height: 2.4rem;
            border-radius: $radius-full;
          }
        }

        .status-tag {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 1.2rem;
          background-color: $white-lucid;
          border-radius: $radius-md;
          gap: 0.4rem;
          height: 4.8rem;
          @include text-2;
        }
      }

      &-actions {
        display: flex;
        flex-direction: row;
        gap: 1.2rem;
      }
    }

    &-content {
      position: relative;
      display: flex;
      flex-direction: row;
      gap: 4rem;
      padding-inline: 4rem;
      padding-block: 3.2rem;
      border-radius: $radius-md;

      // Text wrap
      white-space: -moz-pre-wrap !important; /* Mozilla, since 1999 */
      white-space: -pre-wrap; /* Opera 4-6 */
      white-space: -o-pre-wrap; /* Opera 7 */
      white-space: pre-wrap; /* css-3 */
      word-wrap: break-word; /* Internet Explorer 5.5+ */
      white-space: -webkit-pre-wrap; /* Newer versions of Chrome/Safari*/
      word-break: break-all;
      white-space: normal;

      &-word-info {
        display: flex;
        flex-direction: column;
        gap: 1.6rem;
        width: 100%;

        .word-types {
          display: flex;
          flex-direction: row;
          @include word-type;

          p {
            width: 100%;
            text-align: left;
            @include tag-large;
          }
        } 

        .word-tags {
          @include word-tags-list-big;
        }

        #word-info--word {
          @include subheading-1;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 1.2rem;
        }
      }

      .translations-carousel {
        position: relative;
        width: 100%;
        overflow: hidden;
        height: max-content;
        padding-inline: 1.2rem;
        padding-block: 1.6rem;
        display: flex;
        flex-direction: column;
        gap: 1.6rem;
        background-color: $neutrals-100;
        border: 0.1rem solid $neutrals-400;
        border-radius: $radius-xl;
        max-width: 26rem;

        &--inner {
          display: flex;
          justify-content: center;
          align-items: center;
          width: v-bind(counterBind);
        }

        &--item {
          @include text-1;
          flex: 1;
          text-align: center;
          transition: transform 0.5s;
          transform: v-bind(getTransform);
          padding-inline: 2rem;
          max-height: 7.2rem;
          overflow: hidden;
        }

        &--arrow {
          position: absolute;
          cursor: pointer;
          display: block;

          &.backward {
            position: absolute;
            top: 36%;
            left: 0.8rem;
          }

          &.forward {
            position: absolute;
            top: 36%;
            right: 0.8rem;
          }
        }

        &--counter {
          @include tag-large;
          color: $neutrals-600;
          display: flex;
          width: 100%;
          justify-content: center;
        }
      }
    }

    &-additions {
      display: flex;
      flex-direction: column;
      gap: 3.6rem;

      &-tabs {
        display: flex;
        flex-direction: row;
        gap: 0.8rem;
      }

      .additions-list {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        max-height: 40rem;
        overflow-y: auto;
        @include scroll;

        &-empty-tip {
          @include text-2;
          color: $neutrals-600;
        }
      }
    }
  }
}
</style>
