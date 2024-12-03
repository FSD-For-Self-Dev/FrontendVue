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
  box-shadow: $regular-shadow;
  background-color: $neutrals-100;
  min-width: 28.8rem;
  border-radius: 2rem;

  .word-tools__button {
    @include text-2;
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    gap: 1.2rem;
    cursor: pointer;
    width: 100%;
    padding: 1.6rem 2rem;

    &:nth-child(1) {
      border-radius: 2rem 2rem 0 0;
    }
    &:last-child {
      border-radius: 0 0 2rem 2rem;
    }

    &:hover {
      background-color: $primary-200;
    }

    &:active {
      background-color: $primary-300;
    }
  }
}
.click-wrapper {
  position: absolute;
  z-index: 1;
  top: 6rem;
  right: 2rem;
}
</style>
