<script lang="ts">
import Button from '@/components/UI/button/Button.vue';
import AddIcon from '@/assets/icons/AddIcon.vue';
import Modal from '@/components/UI/modal/Modal.vue';
import VocabularyForm from './VocabularyForm.vue';
import { type PropType } from 'vue';

export default {
  data() {
    return {
      showModal: false,
      iconModal: AddIcon,
      formModal: VocabularyForm
    }
  },
  components: { Button, AddIcon, Modal },
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
    <AddIcon size="24" />
  </Button>
  <Modal size="md" v-if="showModal || extraShowModal" :close-modal="handleClose" title-modal="Новое слово"
    :icon-modal="iconModal" :form="formModal" />
</template>