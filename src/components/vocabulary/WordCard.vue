<script lang="ts">
import type { WordDto } from '@/dto/vocabulary.dto';
import type { PropType } from 'vue';
import { useLanguagesStore } from '@/store/languages';
import { mapActions, mapState, mapWritableState } from 'pinia';
import WordTagCard from './WordTagCard.vue';
import { useNotificationsStore } from '@/store/notifications';
import { useVocabularyStore } from '@/store/vocabulary';
import { isAxiosError } from 'axios';
import WordTools from './WordTools.vue';
import { useModalStore } from '@/store/modal';
import { joinWithComma } from '@/utils/joinWithComma';
import PopupTip from '../UI/tip/PopupTip.vue';

export default {
  components: { WordTagCard, WordTools, PopupTip },
  props: {
    word: {
      type: Object as PropType<WordDto>,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      translationCurrentIndex: 0,
      showWordTools: false,
      showLanguageTip: false,
      joinWithComma,
    };
  },
  computed: {
    ...mapState(useLanguagesStore, ['global_languages']),
    ...mapWritableState(useVocabularyStore, [
      'favoriteWords',
      'favoriteCount',
      'vocabularyWords',
    ]),
    backgroundClasses() {
      return {
        grey: !this.word.image,
        ghost: this.word.image,
      };
    },
    counterBind() {
      return `${this.word.translations_count * 100}%`;
    },
    getTransform() {
      return `translateX(${-this.translationCurrentIndex * 100}%)`;
    },
    carouselIsDisabled() {
      return this.word.translations_count == 1;
    },
    getFontSize() {
      if (this.word.text.length > 12) return '2rem';
      else if (this.word.text.length > 32) return '1.6rem';
      else return '2.4rem';
    },
    getLineHeight() {
      if (this.word.text.length > 12) return '2.4rem';
      else if (this.word.text.length > 32) return '2rem';
      else return '2.8rem';
    },
    getFavOpacity() {
      return this.word.favorite ? 100 : 0;
    },
    languageData() {
      return this.getLanguageByIsocode(this.word.language);
    },
  },
  methods: {
    ...mapActions(useNotificationsStore, ['addNewMessage']),
    ...mapActions(useVocabularyStore, [
      'addWordToFavorite',
      'removeWordFromFavorite',
      'updateFavoriteWords',
    ]),
    ...mapActions(useModalStore, ['openModal']),
    ...mapActions(useLanguagesStore, ['getFlagIcon', 'getLanguageByIsocode']),
    goToNextTranslation() {
      if (this.translationCurrentIndex >= this.word.translations_count - 1) {
        this.translationCurrentIndex = 0;
      } else {
        this.translationCurrentIndex += 1;
      }
    },
    goToPrevTranslation() {
      if (this.translationCurrentIndex <= 0) {
        this.translationCurrentIndex = this.word.translations_count - 1;
      } else {
        this.translationCurrentIndex -= 1;
      }
    },
    async copyToClipboard(text: string) {
      navigator.clipboard.writeText(text);
      this.addNewMessage({
        type: 'info',
        text: `${this.$t('infoMessage.wordCopied')}: ${text.slice(0, 20)}`,
      });
    },
    async handleFavourite() {
      if (this.word.favorite) {
        const res = await this.removeWordFromFavorite(this.word.slug);
        if (isAxiosError(res)) {
          if (res.response?.status === 409) {
            this.addNewMessage({
              type: 'error',
              text: this.$t('errorMessage.wordAlreadyNotFavorite'),
            });
          } else {
            console.log(res.response?.data);
          }
        } else {
          this.word.favorite = false;
          this.updateFavoriteWords(false, this.word.id);
          this.addNewMessage({
            type: 'info',
            text: `${this.$t('infoMessage.wordRemovedFromFavorite')}: ${this.word.text}`,
          });
        }
      } else {
        const res = await this.addWordToFavorite(this.word.slug);
        if (isAxiosError(res)) {
          if (res.response?.status === 409) {
            this.addNewMessage({
              type: 'error',
              text: this.$t('errorMessage.wordAlreadyFavorite'),
            });
          } else {
            console.log(res.response?.data);
          }
        } else {
          this.word.favorite = true;
          this.updateFavoriteWords(true, this.word.id);
          this.addNewMessage({
            type: 'info',
            text: `${this.$t('infoMessage.wordAddedToFavorite')}: ${this.word.text}`,
          });
        }
      }
    },
  },
};
</script>

<template>
  <article
    class="card"
    :class="{ 'card-disabled': disabled }"
    v-bind="{ ...$attrs }"
    @click.stop="
      () => {
        if (!disabled) {
          openModal(
            'WordProfileModal',
            $t('title.wordProfile'),
            'WordsIcon',
            'lg',
            word.slug,
          );
        }
      }
    "
  >
    <div class="card__background" :class="{ 'with-image': word.image }">
      <div class="card__background--overlay" v-if="word.image" />
      <img :src="word.image" alt="Word image" v-if="word.image" />
    </div>
    <div class="card__header">
      <div class="card__header--status" :class="backgroundClasses">
        <svg-icon
          :name="`${word.activity_status}${word.activity_progress}StatusIcon`"
          size="md"
        />
        <p>{{ $t('activityStatus', { status: word.activity_status }) }}</p>
      </div>
      <div class="card__header--actions" :class="backgroundClasses">
        <div
          @click.stop="disabled ? () => {} : handleFavourite()"
          class="fav-icon"
          :class="{ 'fav-icon-disabled': disabled }"
        >
          <svg-icon
            name="FavouriteFilledIcon"
            size="lg"
            class="fav"
            color="var:danger-500"
            hoverColor="var:danger-400"
          />
          <svg-icon name="FavouriteIcon" size="lg" class="unfav" />
        </div>
        <div class="more-icon" :class="{ 'more-icon-disabled': disabled }">
          <svg-icon
            name="MoreFilledIcon"
            size="lg"
            color="var:primary-500"
            hoverColor="var:primary-400"
            @click.stop="() => (showWordTools = !showWordTools)"
            class="more-inactive"
            v-if="showWordTools"
          />
          <svg-icon
            name="MoreIcon"
            size="lg"
            :hoverColor="disabled ? 'var:neutrals-900' : 'var:primary-500'"
            @click.stop="
              () => {
                if (!disabled) showWordTools = !showWordTools;
              }
            "
            class="more-active"
            v-else
          />
        </div>
      </div>
    </div>
    <WordTools
      v-if="showWordTools"
      :handleClose="() => (showWordTools = false)"
      :word-slug="word.slug"
    />
    <div class="card__content" :class="backgroundClasses">
      <div
        class="card__content--language"
        @mouseover="showLanguageTip = true"
        @mouseleave="showLanguageTip = false"
      >
        <PopupTip
          :text="languageData ? `${languageData.name} (${languageData.country})` : ''"
          :icon-url="languageData?.flag_icon"
          :showTip="showLanguageTip"
          :style="{'margin-bottom': '140%'}"
        />
        <img :src="getFlagIcon(word.language)" alt="Icon" class="language-icon" />
      </div>
      <div class="card__content--word-info">
        <div class="card__content--word--types" v-if="word.types.length > 0">
          {{ joinWithComma(word.types) }}
        </div>
        <div class="card__content--word">
          <h4 class="word" ref="word" data-word>{{ word.text }}</h4>
          <svg-icon
            name="CopyIcon"
            size="md"
            color="var:neutrals-600"
            hoverColor="var:primary-700"
            @click.stop="copyToClipboard(word.text)"
            class="copy-icon"
          />
        </div>
      </div>
      <div class="card__content--word-tags" v-if="word.tags.length > 0">
        <WordTagCard :tag="tag" v-for="tag in word.tags" />
      </div>
    </div>
    <div
      class="card__footer translations-carousel"
      :class="backgroundClasses"
      v-if="word.translations_count > 0"
    >
      <div class="translations-carousel--inner">
        <div class="translations-carousel--item" v-for="translation in word.translations">
          {{ translation }}
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
          {{ translationCurrentIndex + 1 }}/{{ word.translations_count }}
        </span>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.ghost,
.grey {
  border-radius: $radius-xl;
  border: 0.14rem solid $neutrals-300;
}
.ghost {
  background-color: rgba(255, 255, 255, 0.8);
}

.grey {
  background-color: $neutrals-200;
}

.with-image {
  box-shadow: $regular-shadow;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 29.5rem;
  height: 34rem;
  border-radius: $radius-xl;
  padding-block: 1.6rem;
  padding-inline: 2rem;
  box-shadow: $regular-shadow;
  cursor: pointer;

  // Text wrap
  white-space: -moz-pre-wrap !important; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  white-space: pre-wrap; /* css-3 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
  white-space: -webkit-pre-wrap; /* Newer versions of Chrome/Safari*/
  word-break: break-all;
  white-space: normal;

  &__background {
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
    background-color: $neutrals-100;
    border-radius: $radius-xl;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: $radius-xl;
    }

    &--overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: $neutrals-900;
      opacity: 10%;
      border-radius: $radius-xl;
    }
  }

  &__header {
    position: relative;
    display: flex;
    justify-content: space-between;

    &--status {
      @include subheading-5;
      padding: 0.4rem 1.2rem 0.4rem 0.8rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    &--actions {
      padding: 0.4rem 0.8rem;
      display: flex;
      align-items: center;
      height: 4rem;
    }
  }

  &__content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-block: 1.6rem;
    gap: 1.2rem;
    @include heading-4;

    &--language {
      position: absolute;
      top: 1.2rem;
      left: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.4rem;
      height: 2.4rem;
      padding: 0.1rem;
      cursor: default;

      .language-icon {
        width: 100%;
        height: 100%;
        @include text-3;
      }
    }

    &--word-info {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }

    &--word {
      display: flex;
      flex-direction: row;
      gap: 0.4rem;
      width: max-content;
      margin-left: 2.8rem;
      align-items: center;

      .word {
        max-width: 15.6rem;
        max-height: 6.8rem;
        text-align: center;
        font-size: v-bind(getFontSize);
        line-height: v-bind(getLineHeight);
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .copy-icon {
        cursor: pointer;
      }

      &--types {
        @include word-type;
      }
    }

    &--word-tags {
      @include word-tags-list-small;
      justify-content: center;
      padding-inline: 1.6rem;
    }
  }

  .translations-carousel {
    position: relative;
    width: 100%;
    overflow: hidden;
    height: max-content;
    padding: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    &--inner {
      display: flex;
      width: v-bind(counterBind);
    }

    &--item {
      @include text-2;
      flex: 1;
      text-align: center;
      transition: transform 0.5s;
      transform: v-bind(getTransform);
      padding-inline: 2rem;
      max-height: 5.4rem;
    }

    &--arrow {
      position: absolute;
      cursor: pointer;
      display: block;

      &.backward {
        margin: 1.2rem;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: calc(100% - 4.8rem);
      }

      &.forward {
        margin: 1.2rem;
        position: absolute;
        top: 0;
        left: calc(100% - 4.8rem);
        bottom: 0;
        right: 0;
      }
    }

    &--counter {
      @include tag-big;
      color: $neutrals-600;
      display: flex;
      width: 100%;
      justify-content: center;
    }
  }

  &-disabled {
    cursor: default;
  }

  &:hover:not(.card-disabled) {
    outline: $primary-400 solid 0.1rem;
  }

  &:hover:not(.card-disabled) > .card__background > .card__background--overlay {
    opacity: 0%;
  }

  &:active:not(.card-disabled) {
    outline: $primary-500 solid 0.1rem;
  }
}

.fav-icon {
  cursor: pointer;
  display: flex;

  .fav {
    position: absolute;
    opacity: v-bind(getFavOpacity);
  }

  &-disabled {
    cursor: default;
  }
}

.fav-icon:hover:not(.fav-icon-disabled) {
  .fav {
    opacity: 100%;
  }
}

.more-icon {
  cursor: pointer;
  display: flex;
  width: 3.2rem;
  padding: 0;

  .more-inactive {
    height: 100%;
  }

  .more-active {
    height: 100%;
  }

  &-disabled {
    cursor: default;
  }
}
</style>
