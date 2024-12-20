<script lang="ts">
import Button from '@/components/UI/button/Button.vue';
import Modal from '@/components/UI/modal/Modal.vue';
import { type PropType } from 'vue';

export default {
  components: { Button, Modal },
  emits: ['wordCreated'],
  props: {
    buttonText: {
      type: String,
      required: true,
    },
    buttonSize: {
      type: String as PropType<'normal' | 'medium' | 'small'>,
      default: 'small',
    },
    chosenLanguage: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    handleOpen() {
      this.showModal = true;
    },
    handleClose() {
      this.showModal = false;
    },
  },
};
</script>

<template>
  <Button @click.stop="handleOpen" :size="buttonSize" :text="buttonText" icon="AddIcon" />
  <Modal
    size="lg"
    v-if="showModal"
    :close-modal="handleClose"
    :title-modal="$t('title.newWord')"
    icon="AddIcon"
    modalContent="NewWordForm"
    :chosenLanguage="chosenLanguage"
    @word-created="$emit('wordCreated')"
  />
</template>
