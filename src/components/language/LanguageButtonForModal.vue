<script lang="ts">
import Button from '@/components/UI/button/Button.vue';
import ExercisesIcon from '@/assets/icons/ExercisesIcon.vue';
import AddIcon from '@/assets/icons/AddIcon.vue';
import Modal from '@/components/UI/modal/Modal.vue';
import LanguagesForm from './LanguagesForm.vue';
import { type PropType } from 'vue';

export default {
  data() {
    return {
      showModal: false,
      iconModal: ExercisesIcon,
      formModal: LanguagesForm
    }
  },
  components: { Button, Modal, AddIcon },
  props: {
    textButton: {
      type: String,
      required: true
    },
    extraToggleModal: {
      type: Function as PropType<Function | null>,
      default: null
    },
    extraShowModal: {
      type: Boolean as PropType<boolean | null>,
      default: null
    },
    sizeButton: {
      type: String as PropType<'normal' | 'medium' | 'small'>,
      default: 'small'
    }
  },
  methods: {
    handleOpen() {
      if (this.extraToggleModal !== null && this.extraShowModal !== null) {
        this.extraToggleModal(!this.extraShowModal);
      } else {
        this.showModal = true;
      }
    },
    handleClose() {
      if (this.extraToggleModal !== null && this.extraShowModal !== null) {
        this.extraToggleModal(!this.extraShowModal);;
      } else {
        this.showModal = false;
      }
    }
  }
}
</script>

<template>
  <Button @click.stop="handleOpen" :size="sizeButton" :text="textButton">
    <AddIcon size="16" />
  </Button>
  <Modal v-if="showModal || extraShowModal" :close-modal="handleClose" title-modal="Добавить изучаемые языки"
    :icon-modal="iconModal" :form="formModal" />
</template>