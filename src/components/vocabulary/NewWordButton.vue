<script lang="ts">
import Button from '@/components/UI/button/Button.vue';
import Modal from '@/components/UI/modal/Modal.vue';
import NewWordForm from './NewWordForm.vue';
import { type PropType } from 'vue';

export default {
  data() {
    return {
      showModal: false,
      formModal: NewWordForm
    }
  },
  components: { Button, Modal },
  props: {
    extraToggleModal: {
      type: Function as PropType<Function | null>,
      default: null
    },
    extraShowModal: {
      type: Boolean as PropType<boolean | null>,
      default: null
    },
    buttonText: {
      type: String,
      required: true
    },
    buttonSize: {
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
  <Button @click.stop="handleOpen" :size="buttonSize" :text="buttonText" icon="AddIcon" />
  <Modal size="lg" v-if="showModal || extraShowModal" :close-modal="handleClose" title-modal="Новое слово"
    icon="AddIcon" :form="formModal" />
</template>