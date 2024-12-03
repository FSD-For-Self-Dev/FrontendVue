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
    handleEdit: {
      type: Function,
      required: true,
    },
  },
};
</script>

<template>
  <OnClickOutside @trigger.stop="() => handleClose()" class="click-wrapper">
    <div class="word-tools">
      <button @click="() => handleEdit()" class="word-tools__button">
        <p>Редактировать</p>
      </button>
      <button @click="() => handleDelete()" class="word-tools__button">
        <p>Удалить</p>
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
