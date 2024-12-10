<script lang="ts">
import IconButton from '../UI/button/IconButton.vue';
import { useLanguagesStore } from '@/store/languages';
import { mapState } from 'pinia';

export default {
  components: { IconButton },
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
  computed: {
    ...mapState(useLanguagesStore, ['global_languages']),
  },
  methods: {
    getFlagIcon(neededLang: string | undefined) {
      return this.global_languages.find((lang) => lang.name === neededLang)?.flag_icon;
    },
  },
};
</script>

<template>
  <div class="translation-item" :class="{ editable: editable }">
    <div class="translation-item--language">
      <img :src="getFlagIcon(translationLanguage)" alt="Icon" class="language-icon" />
    </div>
    <p>{{ translationText }}</p>
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

  p {
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 4.4rem;
    display: inline-block;
    text-overflow: ellipsis;
    text-align: left;
    overflow: hidden;

    // Text wrap
    white-space: -moz-pre-wrap !important;  /* Mozilla, since 1999 */
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    white-space: pre-wrap;       /* css-3 */
    word-wrap: break-word;       /* Internet Explorer 5.5+ */
    white-space: -webkit-pre-wrap; /* Newer versions of Chrome/Safari*/
    word-break: break-all;
    white-space: normal;
  }

  &--language {
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
