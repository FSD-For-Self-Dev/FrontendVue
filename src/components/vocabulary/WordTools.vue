<script lang="ts">
import { useModalStore } from '@/store/modal';
import { OnClickOutside } from '@vueuse/components';
import { mapActions } from 'pinia';

export default {
  components: {
    OnClickOutside,
  },
  props: {
    handleClose: {
      type: Function,
      required: true,
    },
    wordSlug: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions(useModalStore, ['openModal']),
  },
};
</script>

<template>
  <OnClickOutside @trigger.stop="() => handleClose()" class="click-wrapper">
    <div class="word-tools">
      <button
        @click.stop="() => {
          openModal(
            'NewWordForm',
            $t('title.editWord'),
            'EditIcon',
            'lg',
            wordSlug
          );
          handleClose();
        }"
        class="word-tools__button"
      >
        <p>{{ $t('action.edit') }}</p>
      </button>
      <button
        @click.stop="() => {
          openModal(
            'DeleteWordForm',
            $t('title.deleteWord'),
            'InfoIcon',
            'lg',
            wordSlug
          );
          handleClose();
        }"
        class="word-tools__button"
      >
        <p>{{ $t('action.delete') }}</p>
      </button>
    </div>
  </OnClickOutside>
</template>

<style lang="scss">
.word-tools {
  @include dropdown-list;

  .word-tools__button {
    @include dropdown-list-item;
  }
}
.click-wrapper {
  position: absolute;
  z-index: 1;
  top: 6rem;
  right: 2rem;
}
</style>
