<script lang="ts">
import { OnClickOutside } from '@vueuse/components';
import Modal from '../UI/modal/Modal.vue';

export default {
  components: {
    OnClickOutside,
    Modal,
  },
  props: {
    handleClose: {
      type: Function,
      required: true,
    },
    handleDelete: {
      type: Function,
      required: true,
    },
  },
};
</script>

<template>
  <OnClickOutside @trigger.stop="() => handleClose()" class="click-wrapper">
    <div class="language-tools">
      <button @click.stop="() => handleDelete()" class="language-tools__button">
        <p>{{ $t('action.delete') }}</p>
      </button>
    </div>
  </OnClickOutside>
</template>

<style lang="scss">
.language-tools {
  @include dropdown-list;

  .language-tools__button {
    @include dropdown-list-item;
  }
}
.click-wrapper {
  position: absolute;
  z-index: 1;
  top: 6.4rem;
  right: 0.4rem;
}
</style>
