<script lang="ts">
import IconButton from '../UI/button/IconButton.vue';
import { useLanguagesStore } from '@/store/languages';
import { mapActions, mapState } from 'pinia';
import PopupTip from '../UI/tip/PopupTip.vue';

export default {
  components: { IconButton, PopupTip },
  props: {
    translationText: {
      type: String,
      required: true,
    },
    translationLanguage: {
      type: String,
      required: true,
    },
    editable: {
      type: Boolean,
      default: true,
    },
    handleEdit: {
      type: Function,
      required: false,
    },
    handleDelete: {
      type: Function,
      required: false,
    },
    editIndex: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      showLanguageTip: false,
    };
  },
  computed: {
    ...mapState(useLanguagesStore, ['global_languages']),
    languageData() {
      return this.getLanguageByIsocode(this.translationLanguage);
    },
  },
  methods: {
    ...mapActions(useLanguagesStore, ['getFlagIcon', 'getLanguageByIsocode']),
  },
};
</script>

<template>
  <div class="translation-item" :class="{ editable: editable }">
    <div
      class="translation-item--language"
      :style="{ position: 'relative' }"
      @mouseover="showLanguageTip = true"
      @mouseleave="showLanguageTip = false"
    >
      <PopupTip
        :text="languageData ? `${languageData.name} (${languageData.country})` : ''"
        :icon-url="languageData?.flag_icon"
        :showTip="showLanguageTip"
        style="
          margin-bottom: 0;
          left: 0;
          top: 80%;
          transform: translate(0, 10%);
          max-width: 22.8rem;
          --text-line-clamp: 2;
        "
      />
      <img :src="getFlagIcon(translationLanguage)" alt="Icon" class="language-icon" />
    </div>
    <p class="translation-text">{{ translationText }}</p>
    <div class="translation-item--edit-actions" v-if="editable">
      <IconButton
        icon="DeleteIcon"
        variant="secondary"
        type="button"
        @click="() => (handleDelete ? handleDelete(editIndex) : {})"
      />
      <IconButton
        icon="EditIcon"
        variant="secondary"
        type="button"
        @click="
          () =>
            handleEdit ? handleEdit(translationText, translationLanguage, editIndex) : {}
        "
      />
    </div>
  </div>
</template>

<style lang="scss">
.translation-item {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 26rem;
  height: 12rem;
  padding: 2rem;
  border: 0.1rem solid $neutrals-400;
  border-radius: $radius-xl;
  background-color: $neutrals-100;
  @include subheading-4;
  color: $neutrals-900;

  .translation-text {
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 4.4rem;
    text-align: left;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    // Text wrap
    white-space: -moz-pre-wrap !important; /* Mozilla, since 1999 */
    white-space: -pre-wrap; /* Opera 4-6 */
    white-space: -o-pre-wrap; /* Opera 7 */
    white-space: pre-wrap; /* css-3 */
    word-wrap: break-word; /* Internet Explorer 5.5+ */
    white-space: -webkit-pre-wrap; /* Newer versions of Chrome/Safari*/
    word-break: break-all;
    white-space: normal;
  }

  &--language {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;

    .language-icon {
      width: 100%;
      height: 100%;
      border-color: transparent;
      outline-color: transparent;
    }
  }

  &--edit-actions {
    display: flex;
    flex-direction: row;
    gap: 1.2rem;
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    opacity: 0;
  }
}

.editable:hover {
  border: $neutrals-500 solid 0.1rem;

  .translation-item--edit-actions {
    opacity: 100%;
  }
}
</style>
